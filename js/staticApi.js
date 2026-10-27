/* MIERU GitHub Pages local service: all original four-page features except external live web research. */
(()=>{'use strict';
const D=window.MieruDomain, data=window.MIERU_DATA;
const KEY='mieru:enterprise:v7.2:decisions';
const ALLOWED=['LOCAL','REUSE','ADAPT','VERIFY FIRST','COLLABORATE'];
const seed=data.decisions;
let fallback=null;
const clone=x=>JSON.parse(JSON.stringify(x));
function all(){
 try{const raw=localStorage.getItem(KEY);if(raw===null){localStorage.setItem(KEY,JSON.stringify(seed));return clone(seed);}const val=JSON.parse(raw);if(Array.isArray(val))return val;}catch(e){if(fallback!==null)return clone(fallback);}
 return clone(seed);
}
function persist(decisions){fallback=clone(decisions);try{localStorage.setItem(KEY,JSON.stringify(decisions));}catch(e){throw new Error('This browser cannot save decisions permanently (storage blocked or full). Enable local storage and try again.');}}
function validate(input){
 const {product,market,element,route,reason,conditions,owner}=input||{};
 const scenario=D.launch(product,market),row=scenario?.rows.find(x=>x.id===element);
 if(!row||!ALLOWED.includes(route))throw new Error('Unknown medicine, market, launch element or route.');
 if(typeof reason!=='string'||reason.trim().length<12||reason.length>700)throw new Error('A reason of 12–700 characters is required.');
 if(typeof conditions!=='string'||conditions.trim().length<10||conditions.length>500)throw new Error('Applicability conditions of 10–500 characters are required.');
 if(typeof owner!=='string'||owner.trim().length<3||owner.length>100)throw new Error('A reviewing function of 3–100 characters is required.');
 return {product,market,element,elementTitle:row.title,route,reason:reason.trim(),conditions:conditions.trim(),owner:owner.trim(),sources:row.sources};
}
function newDecision(input){
 const row=validate(input),items=all();
 const rec={id:crypto.randomUUID?crypto.randomUUID():'local-'+Date.now()+'-'+Math.random().toString(36).slice(2),...row,createdAt:new Date().toISOString(),kind:'synthetic_pilot_rehearsal',approval:'NOT APPROVED',validated:false};
 items.push(rec);if(items.length>300)items.splice(0,items.length-300);persist(items);return rec;
}
function removeDecision(id){if(seed.some(x=>x.id===id))throw new Error('Bundled demonstration cases cannot be deleted; only newly saved/imported cases may be deleted.');const items=all(),next=items.filter(x=>x.id!==id);persist(next);return items.length!==next.length;}
const classification=v=>{const s=String(v.text||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();let winner=null,best=0;
 for(const c of D.C){let score=0;for(const phrase of c.lex){const f=phrase.toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();if(s.includes(f))score+=5+f.split(' ').length;}if(score>best){winner=c.id;best=score;}}
 return {...v,theme:winner,confidence:best>0?'lexical_phrase_match':'unclassified'};};
const assigned=data.voices.voices.map(classification);
const clustered={label:data.voices.label,voices:assigned,coverage:assigned.filter(x=>x.theme).length,total:assigned.length,method:'Deterministic lexical clustering on 300 designed synthetic voices; not a general-purpose AI validation',clusters:D.voiceOverview()};
function importDecisions(file){
 if(!Array.isArray(file)||file.length>300)throw new Error('Import must be a JSON array containing no more than 300 decision records.');
 const current=all(),ids=new Set(current.map(x=>x.id));let added=0;
 for(const item of file){if(!item||item.kind!=='synthetic_pilot_rehearsal'||typeof item.id!=='string'||item.id.length>120)throw new Error('Invalid decision import format.');
 const valid=validate(item);
 if(ids.has(item.id))continue;
 const date=String(item.createdAt||'');if(!/^\d{4}-\d\d-\d\dT/.test(date)||!Number.isFinite(Date.parse(date)))throw new Error('Decision import contains an invalid timestamp.');
 const rec={id:item.id,...valid,createdAt:date,kind:'synthetic_pilot_rehearsal',approval:'NOT APPROVED',validated:false};current.push(rec);ids.add(rec.id);added++;
 }
 if(current.length>300)throw new Error('The local memory supports up to 300 decisions. Export and archive older reviews before importing.');
 if(added)persist(current);return {added,total:current.length};
}
function makeAsk(q,web){if(typeof q!=='string'||!q.trim()||q.trim().length>400)throw new Error('Question must be 1–400 characters.');
 const answer=D.answer(q.trim(),all());return {...answer,retrieval:{method:'scoped_local',status:'browser_local',note:null},web:{status:'off',note:'Live OpenAI/web-agent research requires a secure server and is disabled in this GitHub Pages edition.'},asOf:D.E.asOf};}
async function request(url,opts={}){
 const parsed=new URL(url,location.protocol==='about:'?'https://mieru.local/':location.href),path=parsed.pathname;
 let b={};if(opts.body){try{b=JSON.parse(opts.body);}catch{throw new Error('Invalid JSON request.');}}
 if(path.endsWith('/api/bootstrap'))return {asOf:D.E.asOf,version:'7.2.0-static',questions:D.Q.questions,roles:D.Q.roles,challengeSummary:D.voiceOverview(),sourceCount:D.E.evidence.length,voiceCount:D.V.voices.length,products:Object.fromEntries(Object.entries(D.PRODUCTS).map(([id,p])=>[id,{name:p.name,topic:p.topic}])),markets:D.MARKETS,liveReady:false,memoryCount:all().length};
 if(path.endsWith('/api/evidence'))return D.E;
 if(path.endsWith('/api/voices'))return clustered;
 if(path.endsWith('/api/launch')){const v=D.launch(parsed.searchParams.get('product')||'oveporexton',parsed.searchParams.get('market')||'US');if(!v)throw new Error('Unknown medicine/market.');return v;}
 if(path.endsWith('/api/decisions'))return {decisions:all()};
 if(path.endsWith('/api/decision')&&opts.method==='POST')return {saved:newDecision(b)};
 if(path.includes('/api/decision/')&&opts.method==='DELETE')return {removed:removeDecision(path.split('/').pop())};
 if(path.endsWith('/api/ask')&&opts.method==='POST')return makeAsk(b.q,b.web);
 throw new Error('Unknown local route: '+path);
}
window.MieruStaticApi={request,getDecisions:all,saveDecision:newDecision,removeDecision,importDecisions,seedIds:new Set(seed.map(x=>x.id)),mode:'local-browser'};
})();
