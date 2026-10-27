/* Browser adaptation of the ORIGINAL v7.2 domain.js. No business-logic changes. */
(()=>{
'use strict';
const {evidence:E,questions:Q,voices:V,challenges:C}=window.MIERU_DATA;
const byId=Object.fromEntries(E.evidence.map(x=>[x.id,x]));
const PRODUCTS={oveporexton:{name:'ORZEYFUL · oveporexton',short:'ORZEYFUL',terms:['oveporexton','orzeyful','tak-861'],evidence:['OCT_LAUNCH','O_TRIAL','O_JP','O_CN','O_US'],topic:'narcolepsy type 1',regulatory:{Japan:'Available · 15 Oct 2026',China:'Available · 15 Oct 2026',US:'FDA approved · availability pending DEA at 15 Oct',EU:'Global submissions underway · approval not established'},country:{Japan:'Adult NT1 indication; actual local label and reimbursement require review.',China:'Approved population includes adults and adolescents aged 16+; different label scope from Japan/U.S.',US:'FDA approved for adults; company anticipated availability after DEA scheduling.',EU:'No EU marketing authorization asserted by the current public dossier.'}},rusfertide:{name:'MIMRYLO · rusfertide',short:'MIMRYLO',terms:['rusfertide','mimrylo','polycythemia','hematocrit','pv'],evidence:['R_US','R_TRIAL'],topic:'polycythemia vera',regulatory:{Japan:'No Japan approval established',China:'No China approval established',US:'FDA approved · 28 Aug 2026',EU:'No EU approval established'},country:{Japan:'Check PMDA/MHLW scope independently; U.S. label cannot be copied.',China:'Do not infer approval or indication from U.S. release.',US:'U.S.-approved indication: erythrocytosis in adults with PV.',EU:'No public approval confirmation in this vetted dossier.'}},zasocitinib:{name:'Zasocitinib · TAK-279',short:'Zasocitinib',terms:['zasocitinib','tak-279','psoriasis','tyk2'],evidence:['Z_FDA','Z_TRIAL','Z_SCALP'],topic:'plaque psoriasis',regulatory:{Japan:'No Japan approval established',China:'No China approval established',US:'Investigational · FDA priority review, target Q1 2027',EU:'EMA MAA accepted · under review, not approved'},country:{Japan:'Investigational evidence does not establish a Japanese submission or authorization.',China:'Investigational evidence does not establish a Chinese authorization.',US:'Review before U.S. regulatory decision; no commercial promotional claims.',EU:'EMA has accepted an MAA for review; this is not EU marketing authorization.'}}};
const MARKETS=['Japan','China','US','EU'];
const CAPABILITIES=[['reg','Regulatory & local label','Legal + Regulatory'],['evidence','Clinical evidence backbone','Global Medical + local Medical'],['diagnosis','Diagnosis & referral','Medical + Patient Engagement'],['hcp','HCP scientific learning','Medical + Legal/Compliance'],['field','Field and digital enablement','Commercial + DD&T'],['access','Access & reimbursement','Market Access + Finance'],['supply','Supply and launch readiness','Supply/GSQ + Country Lead']];
const CAP={reg:{route:'LOCAL',sources:[],why:'Authorization, approved population, pharmacovigilance and claims are set by country; do not import another market’s label.',gate:'Regulatory/Legal validate latest authority record and approved wording.'},evidence:{route:'REUSE',sources:[],why:'The published product-specific global study is a scientific reference point, not a cleared commercial deck.',gate:'Medical validates final paper, limitations and applicable local claims.'},diagnosis:{route:'COLLABORATE',sources:['PEOPLE','ANNUAL'],why:'Patient-pathway collaboration exists as a Takeda method, but no transferable product-specific referral pathway has been established publicly.',gate:'Country Medical and Patient Engagement map current care bottlenecks and local partners.'},hcp:{route:'ADAPT',sources:['IMED','DX'],why:'Published clinical evidence and patient-aware HCP education approaches may inform a medical learning plan, but no cross-border field asset is approved for use here.',gate:'MLR reviews audience, local approved indication and independence boundaries.'},field:{route:'VERIFY FIRST',sources:['DX'],why:'A data-enabled HCP go-to-market approach is documented in Japan; actual channel assets, consent and implementation ownership are not public.',gate:'Commercial owner confirms approved asset, licensing, data and market suitability.'},access:{route:'VERIFY FIRST',sources:['ANNUAL'],why:'Takeda’s integrated access approach is documented, but country-specific payer, HTA and reimbursement data were not established in this dossier.',gate:'Local Market Access supplies current pricing, formulary and payer evidence.'},supply:{route:'VERIFY FIRST',sources:['DIGITAL','PLANT','BATCH'],why:'Takeda reports six One Day Batch Release pilot sites and cross-site manufacturing digitalization. These are precedents for process learning, not evidence of this specific medicine’s supply capacity or market readiness.',gate:'Quality, GSQ and country team verify actual readiness and regulatory release requirements.'}};

// Product-specific evidence and market-specific verification, rather than a
// single generic recommendation repeated across all 84 scenario elements.
const PRODUCT_LENS = {
 oveporexton:{
  reg:'Takeda reports ORZEYFUL availability in Japan and China; the United States has FDA approval but required DEA scheduling at the dossier cut-off. China includes patients aged 16+, unlike the U.S. adult indication.',
  evidence:'Use the published FirstLight and RadiantLight Phase 3 results as the scientific starting point. Reuse the study evidence, not another market\'s approved claims or launch materials.',
  diagnosis:'Takeda documents lengthy NT1 diagnosis journeys. The relevant unmet need is local symptom recognition and referral, not an assumed transferable patient pathway.',
  hcp:'Published NT1 study results can inform HCP scientific education. Medical and Legal must approve the local audience, wording and use; the studies do not authorize a reusable field presentation.',
  field:'Japan and China availability is documented. No validated reusable product-specific campaign, HCP consent list or sales-training pack is publicly evidenced.',
  access:'NT1 clinical and patient-reported outcomes can inform a local value case. This dossier establishes no country-specific price, payer coverage or reimbursement decision.',
  supply:'ORZEYFUL is an oral tablet. An approval or launch announcement does not confirm local inventory, packaging or distribution readiness. Batch-release pilots are process examples, not ORZEYFUL capacity evidence.'
 },
 rusfertide:{
  reg:'The U.S. FDA approved MIMRYLO for erythrocytosis in adults with polycythemia vera on 28 August 2026; the dossier establishes no other market authorizations.',
  evidence:'Use VERIFY Phase 3 as the scientific starting point: Takeda reports 76.9% clinical response during weeks 20-32. Reuse the study evidence, not U.S. promotional claims in other markets.',
  diagnosis:'Polycythemia vera care relies on hematocrit control, phlebotomy and specialist follow-up. No specific country referral protocol is established by the U.S. press release.',
  hcp:'The FDA-approved adult-PV indication informs U.S. scientific discussion. In other markets, any educational use must respect the absence of a verified local approval.',
  field:'MIMRYLO is U.S. FDA-approved, not a proven ready-to-import campaign in Japan, China or Europe. Local promotional status and field materials require independent approval.',
  access:'Hematocrit control and reduced phlebotomy burden can inform the PV value case. Local payer coverage, reimbursement, provider coding and cost offsets remain unverified.',
  supply:'MIMRYLO is a weekly subcutaneous injection. Product-specific release, storage, distribution and administration support need local verification. Unrelated batch-release pilots do not prove MIMRYLO readiness.'
 },
 zasocitinib:{
  reg:'Zasocitinib (TAK-279) remains investigational. The U.S. FDA accepted an NDA under Priority Review with a Q1 2027 action target; the EMA accepted an MAA for review, not approval.',
  evidence:'Use the published Phase 3 comparative and high-impact-site results as scientific evidence. Zasocitinib remains investigational; study findings are not approved promotional claims.',
  diagnosis:'Psoriasis severity can involve high-impact sites and quality-of-life burden, not just body surface area. Takeda published 2026 patient-context material; it is not a local referral playbook.',
  hcp:'Medical teams can review Phase 3 data for scientific context. Commercial training or product promotional use before local authorization cannot be inferred from press releases.',
  field:'No country can yet treat zasocitinib as an approved commercial launch in the reviewed dossier. Field enablement should remain pre-approval and non-promotional.',
  access:'Prepare a psoriasis value case from comparative trial and quality-of-life evidence. No local price or reimbursement decision is established in this dossier.',
  supply:'Zasocitinib is an investigational oral tablet. Prepare tablet supply, packaging and stability plans; commercial release still needs local authorization and product-specific quality approval.'
 }
};
// Gates that depend on the medicine as well as the market. Without these, one
// medicine's facts (ORZEYFUL's DEA scheduling or China age-16+ label) leaked into
// the other two medicines' rows.
const PRODUCT_MARKET_GATES={
 oveporexton:{US:{reg:'Check the current FDA label and whether DEA scheduling is complete before any U.S. launch activity.'}},
 rusfertide:{US:{reg:'Check the current MIMRYLO USPI, including administration and self-injection training requirements, before any U.S. activity.'},
  China:{evidence:'China Medical confirms whether the VERIFY data support any Chinese submission; no Chinese approval is established.'}},
 zasocitinib:{US:{reg:'Investigational: confirm the current FDA action status before commercial use. Non-promotional launch planning may continue under Regulatory and Medical review.',
  evidence:'U.S. Medical reviews the investigational Phase 3 population, endpoints and limitations; do not describe an FDA-approved indication or current approved label.',
  hcp:'U.S. Medical and Legal approve any non-promotional scientific exchange; no product promotion or sales claims before FDA authorization.'},
  China:{evidence:'China Medical confirms whether the Phase 3 programme supports a Chinese submission; no Chinese authorization is established.'}}
};
const MARKET_GATES = {
 Japan:{
  reg:'Check the current MHLW authorization and Japanese label; never import another country’s age range or claim.',
  evidence:'Japanese Medical verifies whether the study endpoint and population can support the locally approved or investigational statement.',
  diagnosis:'Japanese Medical and patient-engagement colleagues confirm the actual diagnostic pathway and relevant specialty societies.',
  hcp:'Confirm Japanese approved claims, medical-review controls, format, translation, channel and intended HCP audience.',
  field:'Japan Commercial and DD&T verify the method owner, content rights, HCP consent, privacy, security and system integration before any local deployment.',
  access:'Verify Japanese reimbursement listing, assessment and local patient affordability separately from authorization.',
  supply:'Quality confirms Japanese batch-release, import and distribution requirements and the medicine-specific site.'
 },
 China:{
  reg:'Check the NMPA label, patient-age scope, local pharmacovigilance and authorized product information.',
  evidence:'China Medical verifies study-population applicability, endpoints and local evidence requirements; confirm the medicine-specific age range rather than importing a foreign label.',
  diagnosis:'Validate province- and setting-specific patient pathways with Medical and local partners before scaling education.',
  hcp:'China Medical and Legal confirm authorization status, permitted scientific content, education independence and HCP-channel rules; do not import foreign claims.',
  field:'China Commercial and DD&T verify content approval, HCP consent, data-location and cross-border rules, security and system integration; do not copy Japan campaign files.',
  access:'Confirm local listing, access pathways and reimbursement evidence; public China launch does not establish province-level access.',
  supply:'China team verifies NMPA-related labeling, import/distribution and qualified batch-release arrangements.'
 },
 US:{
  reg:'U.S. Regulatory verifies current FDA authorization, labeling and any medicine-specific conditions before commercial use.',
  evidence:'U.S. Medical compares the study with the FDA-approved population and official current USPI, including limitations.',
  diagnosis:'U.S. Medical and patient teams validate U.S.-specific referral, care and specialty access barriers.',
  hcp:'U.S. MLR validates USPI alignment and separates independent education, scientific exchange and promotional field use.',
  field:'U.S. Commercial and DD&T verify approved content, HCP consent, privacy, security, system integration and channel ownership before deployment.',
  access:'U.S. Access/Finance verifies actual payer policy, specialty reimbursement, support eligibility and evidence—not hypothetical uptake.',
  supply:'U.S. Quality and Supply verify medicine-specific release, distribution and label-specified storage; unrelated sites do not establish U.S. readiness.'
 },
 EU:{
  reg:'EU Regulatory checks the authorization route and European Commission decision where applicable; EMA application acceptance is not approval. Confirm national launch conditions separately.',
  evidence:'EU Medical verifies study applicability and EU product information, where authorized; confirm requirements in each intended launch country.',
  diagnosis:'Local medical teams evaluate country-by-country care pathways; EU is not one clinical referral or access market.',
  hcp:'Until appropriate authorization, review non-promotional boundaries and separate EU medical material from a field pack.',
  field:'For each EU launch country, Commercial and DD&T verify authorization, GDPR, consent, content rights, security and system integration before deployment.',
  access:'Separate EMA status from national HTA/reimbursement; verify evidence requirements in each launch country.',
  supply:'Local quality and country leads confirm each national launch timeline, release rules and actual distributor readiness.'
 }
};

const stop = new Set('the and from with before which that this have does what where when into know many role your each has can our for its but would how about any can best already team takeda using should who work more are was new get now same across why they there their will than all one some'.split(' '));
function tokens(s){return (String(s||'').toLowerCase().match(/[a-z0-9]+/g)||[]).filter(t=>t.length>2&&!stop.has(t));}
const MARKET_NAMES={Japan:/\bjapan\b/i,China:/\bchina\b/i,US:{test:text=>/\b(?:usa|united states|america)\b|\bu\.s\.(?:a\.)?/i.test(text)||/\bUS\b/.test(text)||/\b(?:in|the|prior|previous)\s+us\b|\bus\s+(?:team|market|review|decision|already|has reviewed)\b/i.test(text)},EU:/\b(?:eu|europe|europa|european union)\b/i};
function productsIn(q){return Object.keys(PRODUCTS).filter(key=>PRODUCTS[key].terms.some(term=>new RegExp('\\b'+term+'\\b','i').test(q)));}
function names(q) { const text=String(q),products=productsIn(text),markets=MARKETS.filter(market=>MARKET_NAMES[market].test(text));return {product:products.length===1?products[0]:null,market:markets.length===1?markets[0]:markets.length===0&&/\bfda\b/i.test(text)?'US':null};}
function source(id){return byId[id]||null;}
function sources(ids){return [...new Set(ids)].map(source).filter(Boolean);}
function launch(product='oveporexton',market='US'){
 if(!PRODUCTS[product]||!MARKETS.includes(market))return null;
 const p=PRODUCTS[product];
 const localApprovalEstablished=product==='oveporexton'?market!=='EU':product==='rusfertide'&&market==='US';
 const regulatorySources=product==='oveporexton'?[{Japan:'O_JP',China:'O_CN',US:'O_US',EU:'OCT_LAUNCH'}[market],'OCT_LAUNCH']:[product==='rusfertide'?'R_US':'Z_FDA'];
 const clinicalSources=product==='oveporexton'?['O_TRIAL','O_EDU']:product==='rusfertide'?['R_US','R_TRIAL']:['ZASO_H2H','Z_SCALP'];
 const references={
  reg:regulatorySources,evidence:clinicalSources,
  diagnosis:[product==='oveporexton'?regulatorySources[0]:product==='rusfertide'?'R_US':'Z_SCALP',product==='oveporexton'?'PATIENT_NT1':product==='rusfertide'?'R_TRIAL':'PSO_QOL','AIR_ACCESS'],
  hcp:[...clinicalSources,...regulatorySources],field:['DX',...regulatorySources],
  access:[...clinicalSources,'PATIENT_DATA'],supply:[...regulatorySources,'BATCH']
 };
 const sourceScopes={
  reg:'Company announcements support this dated snapshot; current local authorization and labeling still require Regulatory confirmation.',
  evidence:'Published clinical evidence, not approved promotional material or permission to transfer a launch asset.',
  diagnosis:'Clinical and patient-context evidence, not a validated local referral pathway or proof of a scalable local service.',
  hcp:'Study evidence and reported regulatory status, not permission to reuse an HCP presentation or promotional claim.',
  field:'The Japan digital-method example is not a product campaign, consent list or validated platform for this market.',
  access:'Clinical and outcomes-method evidence only; no local pricing, payer coverage or reimbursement approval is established.',
  supply:'Product announcements and a separate batch-release example do not establish this medicine\'s local supply capacity or release readiness.'
 };
 let matrix=CAPABILITIES.map(([id,title,owner])=>{
  let route=CAP[id].route;
  if(id==='hcp'&&!localApprovalEstablished)route='VERIFY FIRST';
  if(id==='field'&&market==='Japan'&&product==='oveporexton')route='ADAPT';
  let why=id==='reg'?p.country[market]+' '+CAP.reg.why:PRODUCT_LENS[product][id];
  let gate=(PRODUCT_MARKET_GATES[product]&&PRODUCT_MARKET_GATES[product][market]&&PRODUCT_MARKET_GATES[product][market][id])||MARKET_GATES[market][id];
  if(!localApprovalEstablished&&['hcp','field'].includes(id))gate='Preparation only: no local authorization established in this dossier; keep work non-promotional. '+gate;
  if(id==='field')owner='Local Commercial + DD&T + Privacy/Legal';
  if(id==='supply'){
   gate+=' '+(product==='rusfertide'?'Verify injectable-product release and label-specified storage and administration support.':'Verify tablet manufacture, packaging and stability; sterile-filling training is not evidence of tablet readiness.');
   if(product==='oveporexton'&&market==='US')gate+=' Confirm DEA scheduling before commercial release.';
  }
  return {id,title,owner,route,why,gate,sources:[...new Set(references[id])],sourceScope:sourceScopes[id],label:route==='REUSE'?'Reuse study evidence (not a launch asset)':route};
 });
 return {product,market,productName:p.name,indication:p.topic,status:p.regulatory[market],countryNote:p.country[market],rows:matrix,asOf:E.asOf};
}
function matchCurated(q,interpretation={}){
 const tt=tokens(q),set=new Set(tt),scope=text=>JSON.stringify([productsIn(text),MARKETS.filter(market=>MARKET_NAMES[market].test(text))]),requestedScope=scope(q);let best=null,score=0;
 for(const x of Q.questions){const v=tokens(x.q),overlap=v.filter(w=>set.has(w)).length,sim=2*overlap/(v.length+tt.length||1);
  if(x.q.toLowerCase()===q.toLowerCase().trim())return {x,score:1};
  if(scope(x.q)!==requestedScope)continue;
  if(sim>score){score=sim;best=x;}
 }
 const semantic=Q.questions.find(row=>row.id===interpretation.questionId);
 if(semantic&&interpretation.questionScore>=0.68&&interpretation.questionMargin>=0.035&&scope(semantic.q)===requestedScope)return {x:semantic,score:interpretation.questionScore,semantic:true};
 return score>=0.61?{x:best,score}:null;
}
function rank(q,interpretation={}){
 const tt=tokens(q), target=names(q);
 return E.evidence.map(e=>{
  const ws=new Set(tokens(e.title+' '+e.fact+' '+e.tags.join(' ')));
  let score=tt.reduce((sum,w)=>sum+(ws.has(w)?2:0),0);
  const semantic=Number(interpretation.evidenceScores?.[e.id]);
  if(Number.isFinite(semantic)&&semantic>=0.4&&semantic<=1)score+=semantic*12;
  const evidenceProducts=productsIn(e.title+' '+e.fact+' '+e.tags.join(' '));
  if(target.product&&evidenceProducts.length&&!evidenceProducts.includes(target.product))return {e,score:0};
  if(target.product){const p=PRODUCTS[target.product];score+=p.terms.some(w=>e.tags.includes(w)||e.fact.toLowerCase().includes(w))?5:-6;}
  if(target.market && e.tags.includes(target.market.toLowerCase()))score+=3;
  if(e.confidence==='official_page_date_unconfirmed')score--;
  return {e,score};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||b.e.date.localeCompare(a.e.date)).slice(0,6);
}
const ELEMENT_WORDS={reg:['regulat','label','approval','authorization'],evidence:['clinical','study','trial','evidence','phase'],diagnosis:['diagnos','referral','pathway','patient'],hcp:['hcp','scientific learning','medical education','education','training'],field:['field','commercial','digital','sales'],access:['payer','access','reimburse','pricing','hta'],supply:['supply','plant','manufactur','quality','inventory']};
function elementsIn(q){const text=String(q).toLowerCase(),exact=CAPABILITIES.filter(([,title])=>text.includes(title.toLowerCase())).map(([id])=>id);if(exact.length)return exact;const specific=Object.entries(TOPIC_TERMS).filter(([,words])=>words.some(word=>text.includes(word))).map(([id])=>id);if(specific.length)return specific;return Object.entries(ELEMENT_WORDS).filter(([,words])=>words.some(word=>text.includes(word))).map(([id])=>id);}
// What a saved review actually hands the next team, and what it can never hand over.
function reuseValue(d,receiving){
 const row=receiving&&receiving.rows.find(x=>x.id===d.element);
 return {
  alreadyReviewed:[
   `Route already weighed: ${d.route} for ${d.elementTitle}.`,
  `Reviewing function entered: ${d.owner}. Rationale saved on ${String(d.createdAt).slice(0,10)}; this does not verify owner endorsement.`,
   `Applicability conditions written down: ${d.conditions}`,
  `${(d.sources||[]).length} dated public references attached at save time; relevance and currency still need review.`
  ],
  stillLocal:[row?row.gate:'Local functions must re-verify authorization, ownership and data before any use.',
   'A rehearsal review is not a Takeda approval, and never transfers a file, claim or permission.']
 };
}
function memoryMatch(q,decisions){
 const n=names(q);if(!n.product||!n.market)return [];
 const txt=q.toLowerCase();
 const covered=elementsIn(q);
 const generic=/\b(decid\w*|decisions?|remember|recall|recorded|saved|previous review|prior review)\b/.test(txt);
 return decisions.filter(d=>d.product===n.product&&d.market===n.market&&(covered.length?covered.includes(d.element):generic)).slice(-3).reverse();
}
// Transfer candidates must specify the medicine, the requested receiving market,
// a distinct source market and a concrete decision capability.  No fuzzy match
// on unrelated functions, and never silently treat an unapproved rehearsal as policy.
const TOPIC_TERMS={
 reg:['label','regulat','authorization','approval'],
 evidence:['trial','study','clinical evidence','phase 3','clinical data'],
 diagnosis:['diagnos','referral','patient pathway','nt1 awareness','recognition'],
 hcp:['hcp','scientific education','medical training','learning material','medical learning'],
 field:['field','sales rep','commercial campaign','omnichannel'],
 access:['payer','reimburs','formulary','hta','market access'],
 supply:['manufactur','supply','release','quality','batch']
};
function topicHits(q){return elementsIn(q);}
const source_=id=>source(id);
function transferCandidate(q,decisions,interpretation={}){
 const t=String(q).toLowerCase(), product=names(q).product;
 if(!product||!/\b(learn|adapt|apply|reuse|transfer|starting point|similar|precedent|build on|prior review|other market|cross.market)\b/i.test(q))return null;
 if(MARKETS.filter(market=>MARKET_NAMES[market].test(q)).length!==2)return null;
 const markets={US:'(?:us|u\\.?s\\.?a?\\.?|united states|america)',Japan:'japan',China:'china',EU:'(?:eu|europe|european union)'};
 const has=(p,expr)=>new RegExp(expr.replace(/\{M\}/g,markets[p]),'i').test(q);
 const completedReview='\\b{M}\\s+(?:(?:medical|launch|local)\\s+)?(?:team\\s+)?(?:(?:has|have|had)\\s+)?(?:(?:already|previously)\\s+)?(?:reviewed|recorded|saved|completed\\s+(?:(?:the|a|its)\\s+)?(?:review|assessment|decision))\\b';
 const origins=Object.keys(markets).filter(m=>has(m,'\\b(?:from|prior|previous|earlier|learning from|review (?:in|from))\\s+(?:the\\s+)?{M}(?![a-z])')||has(m,'\\b{M}\\s+(?:review|decision|learning)\\b')||has(m,completedReview));
 if(origins.length!==1)return null;
 const source=origins[0];
 const destinations=Object.keys(markets).filter(m=>m!==source&&(has(m,'\\b(?:for|in|to|our|receiving|target|next|planning in|team in)\\s+(?:the\\s+)?{M}(?![a-z])')||has(m,'\\b{M}\\s+(?:medical|team|market|launch|planning)\\b')));
 const recipient=destinations.length===1?destinations[0]:null;
 // A question like 'in Japan … prior US review' is unambiguous; if recipient
 // cannot be located, never guess an audience from mere country mentions.
 if(!source||!recipient||source===recipient)return null;
 const explicit=topicHits(q),hits=explicit.length?explicit:(interpretation.elements||[]).filter(id=>CAPABILITIES.some(([key])=>key===id));if(hits.length!==1)return null;
 const found=decisions.filter(d=>d.product===product&&d.market===source&&hits.includes(d.element)&&d.kind==='synthetic_pilot_rehearsal');
 if(!found.length)return null;
 const d=found[found.length-1],receiving=launch(product,recipient),element=receiving.rows.find(x=>x.id===d.element);
 if(!element)return null;
 const originating=launch(product,source);
 const populations=product==='oveporexton' && ((source==='China') !== (recipient==='China')) ?
  'China’s authorization includes people aged 16+; the U.S. and Japan approvals are for adults. ' : '';
 const differentiator=product==='oveporexton' ?
  populations+`Regulatory/availability status differs: ${source}: ${originating.status}; ${recipient}: ${receiving.status}. Country diagnostic routes, HCP permissions and MLR approvals must be mapped separately.` :
  `Regulatory scope differs: ${source}: ${originating.status}; ${recipient}: ${receiving.status}. ${receiving.countryNote} A source-country approach is never a local marketing authorization.`;
 const regRow=receiving.rows.find(x=>x.id==='reg');
 const points=[
  {text:`${source} recorded an unapproved ${d.route} rehearsal for ${d.elementTitle} on ${String(d.createdAt).slice(0,10)}; proposed reviewer: ${d.owner}. Reason: ${String(d.reason).replace(/\s+/g,' ').slice(0,220)}${String(d.reason).length>220?'…':''}`,saved:{market:source,date:String(d.createdAt).slice(0,10),route:d.route}},
  {text:`Status in ${recipient}: ${receiving.status}. ${receiving.countryNote}`,ref:regRow.sources[0],source:source_(regRow.sources[0])},
  // Third point must add something new: a different source from point 2, stated in its own words.
  (()=>{const pool=[...element.sources,...PRODUCTS[product].evidence];const alt=pool.find(x=>x!==regRow.sources[0]&&!(d.sources||[]).slice(0,1).includes(x))||pool.find(x=>x!==regRow.sources[0])||element.sources[0];const rec=source_(alt);const first=String(rec.fact).split(/(?<=\.)\s/)[0];return {text:`Also published for ${element.title}: ${first}`,ref:alt,source:rec};})()
 ];
 return {kind:'CROSS_MARKET_LEARNING_LEAD',approval:'NOT APPROVED',product,sourceMarket:source,targetMarket:recipient,points,
  element:d.element,elementTitle:d.elementTitle,origin:d,
  reusable:'The prior team’s documented decision rationale and evidence-review questions can serve as a starting checklist—not as permission to transfer a deck, HCP asset or local decision.',
  difference:differentiator,
  verification:element.gate,
  reviewingFunctions:element.owner,
  sourceScope:element.sourceScope,
  freshEvidence:sources([...d.sources,...regRow.sources,...element.sources,...points.filter(point=>point.ref).map(point=>point.ref)]),
  receivingStatus:receiving.status};
}
function requestsReuse(q){return /\b(reuse|re-use|adapt|build on|existing work|prior work|starting point|avoid duplicating|already available)\b/i.test(q);}
function discoverReuse(q,decisions,interpretation={}){
 const entity=names(q),mentioned=MARKETS.filter(market=>MARKET_NAMES[market].test(q));
 if(!entity.product||!entity.market||mentioned.length!==1)return null;
 const reuseIntent=requestsReuse(q);
 if(!reuseIntent&&interpretation.intent!=='reuse')return null;
 const explicit=elementsIn(q),elements=explicit.length?explicit:(interpretation.elements||[]).filter(id=>CAPABILITIES.some(([key])=>key===id));
 const receiving=launch(entity.product,entity.market),proposals=receiving.rows.filter(row=>!elements.length||elements.includes(row.id));
 const latest=new Map();
 for(const record of decisions){
  if(record.product!==entity.product||record.kind!=='synthetic_pilot_rehearsal'||!MARKETS.includes(record.market)||!proposals.some(row=>row.id===record.element))continue;
  const key=record.market+'/'+record.element,prior=latest.get(key);
  if(!prior||String(record.createdAt)>=String(prior.createdAt))latest.set(key,record);
 }
 const matches=[...latest.values()].map(record=>{
  const row=proposals.find(item=>item.id===record.element),same=record.market===entity.market;
  return {record,relationship:same?'same_market':'cross_market',score:Number(interpretation.scores?.[record.id])||0,
  matchReason:`${elements.length?'Same medicine and '+row.title.toLowerCase()+' topic.':'Saved '+row.title.toLowerCase()+' review for this medicine.'} ${same?'Recorded for the receiving market; currency and scope still need review.':record.market+' experience is a lead, not permission for '+entity.market+'.'}`,
   gate:row.gate,owner:row.owner,sourceScope:row.sourceScope};
 }).sort((left,right)=>right.score-left.score||Number(right.relationship==='same_market')-Number(left.relationship==='same_market')||String(right.record.createdAt).localeCompare(String(left.record.createdAt))||String(left.record.id).localeCompare(String(right.record.id)));
 return {product:entity.product,targetMarket:entity.market,elements:proposals.map(row=>row.id),matches:matches.slice(0,5),total:matches.length,proposals,status:receiving.status,asOf:receiving.asOf};
}
function answer(q,decisions=[],interpretation={}){
 q=String(q||'').trim().slice(0,400);if(!q)return {status:'empty'};
 const recall=/\b(decid\w*|decision|saved|recorded|remember|recall|previous review|prior review)\b/i.test(q);
 const direct=matchCurated(q,interpretation),ranked=rank(q,interpretation),entity=names(q),memory=recall||/\b(learn from|adapt|reuse|transfer|precedent)\b/i.test(q)?memoryMatch(q,decisions):[],transfer=transferCandidate(q,decisions,interpretation);
 if(transfer)return {status:'transfer_candidate',question:q,answer:`Consider ${transfer.sourceMarket}'s saved rehearsal (${transfer.origin.route}) as a starting point, then re-check applicability in ${transfer.targetMarket}.`,insight:`You inherit recorded reasoning, conditions and attached references, not verified approval or permission. ${transfer.difference}`,action:transfer.verification,points:transfer.points,pointsTitle:'SAVED REHEARSAL + PUBLISHED EVIDENCE',sourceIds:transfer.freshEvidence.map(x=>x.id),sourceRecords:transfer.freshEvidence,transfer,value:reuseValue(transfer.origin,launch(transfer.product,transfer.targetMarket)),memory:[],entity,mode:'transfer'};
 const discovery=direct?.score===1?null:discoverReuse(q,decisions,interpretation);
 if(discovery){
  const sourceIds=[...new Set([...discovery.matches.flatMap(match=>match.record.sources||[]),...discovery.proposals.flatMap(row=>row.sources)])];
  return {status:'reuse_discovery',question:q,answer:discovery.total?`Found ${discovery.total} matching saved review${discovery.total===1?'':'s'} for ${PRODUCTS[entity.product].short} planning in ${entity.market}.`:`No matching saved review was found for ${PRODUCTS[entity.product].short} in this pilot's memory.`,
   insight:discovery.total?'Use the recorded rationale, review questions and references as starting points. Local and cross-market records are distinguished; none grants permission to reuse an asset.':'Published evidence can still inform preparation. An empty pilot memory does not establish that no relevant work exists elsewhere in Takeda.',
   action:discovery.proposals.length===1?discovery.proposals[0].gate:'Review the relevant decision topics with the receiving-market functions; confirm current evidence, asset rights and local requirements before adoption.',
   discovery,sourceIds,sourceRecords:sources(sourceIds),memory:[],entity,mode:'reuse_discovery'};
 }
 if(!direct&&(requestsReuse(q)||interpretation.intent==='reuse')&&(!entity.product||!entity.market))return {status:'clarification',question:q,answer:'Clarify the scope before choosing saved work.',insight:'Saved reviews are specific to a medicine, market and decision. I will not choose a medicine or receiving market from an ambiguous request.',action:'Name one medicine and the receiving market. Add the decision topic to narrow the results; an originating market is optional for discovery.',sourceIds:[],sourceRecords:[],memory:[],entity,mode:'clarification'};
 if(memory.length&&recall){
  const d=memory[0];return {status:'decision_memory',question:q,answer:`The latest matching rehearsal recorded ${d.route} for ${d.elementTitle} in ${d.market}.`,insight:`Showing ${memory.length} most recent matching record${memory.length===1?'':'s'}, newest first, within the requested medicine and market scope. These are unapproved pilot rehearsals, not Takeda approvals.`,action:'Check the entered reviewer, applicability conditions and dated public sources before using the reasoning in a new situation.',sourceIds:d.sources,sourceRecords:sources(d.sources),value:reuseValue(d,launch(d.product,d.market)),memory,entity,mode:'decision_memory'};
 }
 // Naming a medicine, a market and a decision topic with nothing recorded is itself
 // an answer worth giving: say so, show today's evidence-based proposal, and point to
 // any review the same element already has in another market.
 if(entity.product&&entity.market&&!memory.length&&!transfer){
  const els=elementsIn(q);
  if(els.length===1&&(recall||/\b(precedent|memory)\b/i.test(q))){
   const el=els[0],view=launch(entity.product,entity.market),row=view.rows.find(x=>x.id===el);
   const elsewhere=decisions.filter(d=>d.product===entity.product&&d.element===el&&d.market!==entity.market);
   const near=elsewhere.length?elsewhere[elsewhere.length-1]:null;
   return {status:'no_decision_yet',question:q,
    answer:`No reviewed decision has been recorded for ${PRODUCTS[entity.product].short} · ${entity.market} · ${row.title}.`,
    insight:`MIERU does not invent one. Today's evidence-based proposal for this element is ${row.route}: ${row.why}`+(near?` A prior ${near.market} review of the same element exists and can be read as a lead, not as permission.`:' No other market has recorded this element either, so this team would be the first.'),
    action:row.gate,
    sourceIds:row.sources,sourceRecords:sources(row.sources),
    proposal:{element:el,elementTitle:row.title,route:row.route,owner:row.owner},
    nearest:near?{market:near.market,route:near.route,elementTitle:near.elementTitle,createdAt:near.createdAt,owner:near.owner}:null,
    memory:[],entity,mode:'no_decision_yet'};
  }
 }
 if(direct){const x=direct.x;return {status:'curated',question:q,answer:x.answer,insight:x.insight,action:x.action,points:(x.points||[]).map(p=>({text:p.t,ref:p.ref,source:source(p.ref)})),sourceIds:x.refs,sourceRecords:sources(x.refs),role:x.role,confidence:'Hand-reviewed, question-specific',matchedQuestion:direct.semantic?x.q:undefined,memory,entity,mode:'curated'};}
 if(!ranked.length||ranked[0].score<3)return {status:'no_match',question:q,answer:'No sufficiently relevant public evidence was found in the vetted local dossier.',insight:'Try a medicine, country or functional topic, or enable live public web search.',action:'Do not infer a Takeda capability or approval from a weak match.',sourceIds:[],sourceRecords:[],memory,entity,mode:'local'};
 const selected=ranked.slice(0,3).map(x=>x.e);
 return {status:'retrieved',question:q,answer:`Public evidence relevant to “${q}”`,insight:'These are relevant leads, not a confirmed synthesis answering every aspect of your question.',action:'Read the sources and confirm current local scope, or turn on live research.',facts:selected.map(x=>x.fact),sourceIds:selected.map(x=>x.id),sourceRecords:selected,memory,entity,mode:'local'};
}
function voiceOverview(){const counts={};for(const v of V.voices)counts[v.theme]=(counts[v.theme]||0)+1;return C.map(c=>({...c,count:counts[c.id],records:sources(c.sources),samples:V.voices.filter(v=>v.theme===c.id).slice(0,14)}));}
window.MieruDomain={E,Q,V,C,PRODUCTS,MARKETS,CAPABILITIES,source,sources,launch,names,matchCurated,rank,answer,memoryMatch,transferCandidate,voiceOverview,elementsIn,reuseValue,requestsReuse};

})();
