/* MIERU · Page 2 listening campus. Generated 3D scenes and protected signal trays.
 * Rendering only: original data, callbacks, hover copy and cluster semantics retained.
 */
(()=>{'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;
const ease=t=>t*t*(3-2*t);
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return(h>>>0)/4294967295;};
const titles={site:'Takeda sites repeat work done elsewhere',ai:'Teams build AI tools Takeda already offers',hcp:'Each country re-learns how to educate doctors',diagnosis:'Slow diagnosis, mapped alone in each country',people:'Know-how leaves when people change roles'};
const labels=['TOWN HALL','PULSE SURVEY','LAUNCH RETROSPECTIVE','COMMUNITIES','PROJECT FORUM','SITE HUDDLE'];
// One hue per listening channel. After clustering the dots keep their channel colour,
// so a mixed-colour pod shows at a glance that one challenge spans every channel.
const channelHue=['#C23E64','#2179B8','#AE7119','#128875','#8052B4','#71872D'];
const hueRGB=['194,62,100','33,121,184','174,113,25','18,136,117','128,82,180','113,135,45'];
const sceneNames=['town-hall','pulse-survey','launch-retrospective','communities','project-forum','site-huddle'];
const sub=['Open questions to leadership','Scored survey free text','End-of-launch reviews','Practice networks','Delivery team threads','Shift-floor conversations'];
class Network {
 constructor(canvas,voices,clusters,channels,{onPick,onSource,onSignal}){
  this.el=canvas;this.wrap=canvas.parentElement;this.ctx=canvas.getContext('2d',{alpha:false});
  this.voices=voices;this.clusters=clusters;this.channels=channels;this.onPick=onPick;this.onSource=onSource;this.onSignal=onSignal;
  this.images=sceneNames.map(name=>{if(typeof Image==='undefined')return null;const img=new Image();img.onload=()=>this.w&&this.draw();img.src='./assets/listening/'+name+'.png';return img;});
  this.clustered=false;this.progress=0;this.goal=0;this.focus='site';this.hover=null;this.mouse={x:-1e3,y:-1e3};this.tick=0;this.running=false;this.reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  this.cIndex=Object.fromEntries(clusters.map((x,i)=>[x.id,i]));this.sIndex=Object.fromEntries(channels.map((x,i)=>[x,i]));
  const counts={},perSource={};this.dots=voices.map(v=>{const gi=this.cIndex[v.theme],ci=this.sIndex[v.channel],n=counts[v.theme]=(counts[v.theme]||0)+1,k=perSource[v.channel]=(perSource[v.channel]||0)+1;
   return {v,gi,ci,angle:n*2.399963+hash(v.id+'a')*.42,radius:Math.sqrt((n-.3)/(clusters[gi].count+1))*.88,seed:hash(v.id+'s'),
    sourceIndex:k-1,fromAngle:k*2.399963+hash(v.id+'b')*.9,fromR:.60+.42*hash(v.id+'r'),drift:.5+hash(v.id+'d')};});
  this.counts=channels.map(n=>voices.filter(v=>v.channel===n).length);
  this.resize=()=>this.setSize();this.observer=new ResizeObserver(this.resize);this.observer.observe(this.wrap);
  this.el.tabIndex=0;this.el.setAttribute('aria-label','300 synthetic signal dots. Hover or focus a dot to read the individual signal. Connect to see five enterprise challenges.');
  this.el.addEventListener('pointermove',e=>this.pointer(e));
  this.el.addEventListener('pointerleave',()=>{this.hover=null;this.mouse={x:-1e3,y:-1e3};this.tip(null);this.el.style.cursor='default';this.draw();});
  this.el.addEventListener('click',e=>{const hit=this.hit(e);if(!hit)return;if(hit.kind==='dot'){if(this.onSignal)this.onSignal(hit.d.v);else if(this.progress>.55)this.onPick(hit.d.v.theme);else this.onSource(hit.d.v.channel);return;}if(hit.kind==='cluster')this.onPick(hit.c.id);else this.onSource(hit.channel);});
  this.el.addEventListener('keydown',e=>{if(e.key==='Escape'){this.hover=null;this.tip(null);this.draw();}if(e.key==='Enter'||e.key===' '){e.preventDefault();if(this.hover?.kind==='dot'){if(this.onSignal)this.onSignal(this.hover.d.v);else if(this.progress>.55)this.onPick(this.hover.d.v.theme);else this.onSource(this.hover.d.v.channel);}else if(this.progress>.55)this.onPick(this.focus);else this.onSource(this.channels[0]);}});
  this.setSize();
 }
 setSize(){const w=Math.max(300,Math.floor(this.wrap.getBoundingClientRect().width));this.w=w;this.h=w<760?1040:760;
  this.dpr=Math.min(devicePixelRatio||1,2);this.el.width=Math.round(w*this.dpr);this.el.height=Math.round(this.h*this.dpr);this.el.style.width=w+'px';this.el.style.height=this.h+'px';this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);this.draw();}
 layout(){return this.w<760?{
  sources:[[.255,.207],[.745,.207],[.255,.504],[.745,.504],[.255,.801],[.745,.801]],
  targets:[[.26,.225],[.74,.225],[.26,.515],[.74,.515],[.5,.805]]
 }:{sources:[[.18,.30],[.5,.30],[.82,.30],[.18,.735],[.5,.735],[.82,.735]],targets:[[.185,.345],[.5,.345],[.815,.345],[.345,.73],[.655,.73]]};}
 point(a){return{x:a[0]*this.w,y:a[1]*this.h};}
 sourceRadius(){return this.w<760?49:70;}
 targetRadius(){return this.w<760?Math.min(65,this.w*.175):clamp(this.w*.071,54,80);}
 cardSize(){return{w:this.w<760?this.w*.46:this.w*.298,h:292};}
 sourcePosition(d){const s=this.point(this.layout().sources[d.ci]),card=this.cardSize(),cols=this.w<760?8:10;
  // Fixed, non-overlapping tray; illustration and text never share its coordinates.
  const index=d.sourceIndex,rows=Math.ceil(this.counts[d.ci]/cols);
  const left=s.x-card.w/2+17,top=s.y+card.h/2-54;
  return{x:left+(index%cols)*(card.w-34)/(cols-1),y:top+Math.floor(index/cols)*Math.min(9,36/Math.max(1,rows-1))};}
 position(d,p,t){const from=this.sourcePosition(d),g=this.point(this.layout().targets[d.gi]),q=this.targetRadius()*d.radius*.88;
  // Rooms disappear before voices travel; challenge headings enter after arrival.
  const travel=ease(clamp((p-.18)/.64,0,1));
  return{x:mix(from.x,g.x+Math.cos(d.angle)*q,travel),y:mix(from.y,g.y+Math.sin(d.angle)*q,travel)};}
 setClustered(yes){this.clustered=!!yes;this.goal=yes?1:0;if(this.reduce)this.progress=this.goal;this.start();}
 select(id){this.focus=id;this.draw();}
 replay(){this.clustered=true;this.progress=0;this.goal=1;this.start();}
 start(){if(this.reduce){this.progress=this.goal;this.draw();return;}if(this.running)return;this.running=true;let last=0;
  const frame=ms=>{if(!this.running)return;const dt=last?Math.min((ms-last)/1000,.05):.016;last=ms;this.tick+=dt;
   this.progress+=(this.goal-this.progress)*Math.min(1,dt*2.05);if(Math.abs(this.progress-this.goal)<.002)this.progress=this.goal;
   this.draw();if(document.hidden||!this.el.closest('.page.active')){this.running=false;return;}requestAnimationFrame(frame);};requestAnimationFrame(frame);}
 pointer(e){const rect=this.el.getBoundingClientRect();this.mouse={x:e.clientX-rect.left,y:e.clientY-rect.top};const hit=this.hit(e);this.hover=hit;
  this.el.style.cursor=hit?'pointer':'default';this.tip(hit,e);this.draw();}
 hit(e){const r=this.el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,p=ease(clamp(this.progress,0,1));
  // Dot hit-testing comes FIRST: individual voices must be readable in both phases.
  let best=null,distance=Infinity;for(const d of this.dots){const pt=this.position(d,p,this.tick),v=Math.hypot(pt.x-x,pt.y-y);if(v<distance){distance=v;best=d;}}
  if(best&&distance< (this.w<760?5:4.2))return{kind:'dot',d:best};
  const l=this.layout(),after=p>.57,centers=after?l.targets:l.sources,card=this.cardSize();
  const i=centers.findIndex(a=>after?Math.hypot(a[0]*this.w-x,a[1]*this.h-y)<this.targetRadius():Math.abs(a[0]*this.w-x)<card.w/2&&Math.abs(a[1]*this.h-y)<card.h/2);
  return i<0?null:(after?{kind:'cluster',c:this.clusters[i]}:{kind:'source',channel:this.channels[i]});
 }
 tip(hit,e){const tip=document.getElementById('voice-hover');if(!tip)return;if(!hit){tip.hidden=true;tip.replaceChildren();return;}
  tip.hidden=false;tip.replaceChildren();const over=document.createElement('small'),heading=document.createElement('strong'),detail=document.createElement('p'),footer=document.createElement('span');
  if(hit.kind==='dot'){
   const v=hit.d.v;over.textContent='ILLUSTRATIVE VOICE · '+v.id;heading.textContent=(v.function||'Employee')+' · '+(v.market||'Multi-market');detail.textContent=v.text;
   footer.textContent=(this.progress>.55?(v.channel+' → '+(titles[v.theme]||v.theme)):'SOURCE: '+v.channel)+' · '+(v.layer||'');
   if(tip.style&&tip.style.setProperty){tip.style.setProperty('--chan',channelHue[hit.d.ci]||'#CD1840');tip.style.setProperty('--chan-ink','#CD1840');}
  }else if(hit.kind==='source'){
   over.textContent='LISTENING CHANNEL';heading.textContent=hit.channel;detail.textContent='Open this channel to read the synthetic signals in full.';footer.textContent='Click to explore sample voices';
   if(tip.style&&tip.style.setProperty){tip.style.setProperty('--chan',channelHue[this.sIndex[hit.channel]]||'#CD1840');tip.style.setProperty('--chan-ink','#CD1840');}
  }else{
   over.textContent='ENTERPRISE CHALLENGE';heading.textContent=titles[hit.c.id]||hit.c.short;detail.textContent=hit.c.precedent==='documented'?'Related Takeda practice published; local applicability is unverified.':'An opportunity to investigate; fit is not yet evidenced.';
   footer.textContent='Click to inspect this challenge';
   if(tip.style&&tip.style.setProperty){tip.style.setProperty('--chan',hit.c.precedent==='documented'?'#2E9E77':'#CD1840');tip.style.setProperty('--chan-ink',hit.c.precedent==='documented'?'#1F7E5E':'#CD1840');}
  }
  tip.append(over,heading,detail,footer);
  if(e){const rect=this.wrap.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;
   const width=Math.min(344,rect.width-20);tip.style.maxWidth=width+'px';const tw=tip.offsetWidth||width,th=tip.offsetHeight||160;
   tip.style.left=clamp(x+19,10,Math.max(10,rect.width-tw-10))+'px';tip.style.top=clamp(y-th/2,50,Math.max(50,rect.height-th-12))+'px';}
 }
 path(points,stroke,weight=1,fill){const c=this.ctx;c.beginPath();points.forEach((pt,i)=>i?c.lineTo(pt[0],pt[1]):c.moveTo(pt[0],pt[1]));if(fill){c.fillStyle=fill;c.fill();}c.strokeStyle=stroke;c.lineWidth=weight;c.stroke();}
 dot(x,y,r,fill){const c=this.ctx;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=fill;c.fill();}
 // Rounded rectangle built from whitelisted primitives (no roundRect dependency).
 rrect(x,y,w,h,r){const c=this.ctx;c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);}
 panel(x,y,w,h,r,fill,stroke,weight=1){const c=this.ctx;this.rrect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=weight;c.stroke();}}
 // Text width estimate: measureText is avoided so the scene stays portable to the test canvas stub.
 textWidth(str,size,bold){return str.length*size*(bold?.60:.53);}
 chip(x,y,text,size,fg,bg,border){const c=this.ctx,padX=size*1.1,h=size*2.05;c.font=`800 ${size}px system-ui,sans-serif`;const m=typeof c.measureText==='function'?c.measureText(text):null;const w=(m&&m.width?m.width:this.textWidth(text,size,true))+padX*2;
  this.panel(x-w/2,y,w,h,h/2,bg,border,1);c.fillStyle=fg;c.textAlign='center';c.font=`800 ${size}px system-ui,sans-serif`;c.fillText(text,x,y+h*.68);return w;}
 ellipse(x,y,rx,ry,fill,stroke,weight){const c=this.ctx;c.save();c.translate(x,y);c.scale(1,ry/rx);c.beginPath();c.arc(0,0,rx,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=(weight||1)*(rx/ry);c.stroke();}c.restore();}
 glyph(i,pt,alpha,t,active){const c=this.ctx,img=this.images[i],card=this.cardSize(),size=Math.min(160,card.w-24);
  if(img&&img.complete&&img.naturalWidth&&typeof c.drawImage==='function'){
   c.save();c.globalAlpha*=alpha;c.drawImage(img,pt.x-size/2,pt.y-size/2,size,size);c.restore();
  }
 }
 draw(){const c=this.ctx,w=this.w,h=this.h,p=ease(clamp(this.progress,0,1)),t=this.tick,l=this.layout(),small=w<760;
  c.clearRect(0,0,w,h);c.fillStyle='#FBFCFD';c.fillRect(0,0,w,h);
  const card=this.cardSize(),hoveredDot=this.hover?.kind==='dot'?this.hover.d:null;
  const sourceAlpha=clamp(1-p/.16,0,1),targetAlpha=clamp((p-.82)/.18,0,1);
  // Six tangible listening places. All illustration/title pixels are above the dot tray.
  if(sourceAlpha)l.sources.forEach((coords,i)=>{const pt=this.point(coords),top=pt.y-card.h/2,left=pt.x-card.w/2;
   const active=(this.hover?.kind==='source'&&this.hover.channel===this.channels[i])||(hoveredDot&&hoveredDot.ci===i);
   c.save();c.globalAlpha=sourceAlpha;
   this.panel(left,top,card.w,card.h,17,'#FFFFFF',active?channelHue[i]:'#DEE6EC',active?1.6:1);
   this.panel(pt.x-13,top-1,26,3,1.5,channelHue[i],null);
   c.textAlign='center';c.fillStyle='#213449';c.font=`800 ${small?10:11.5}px system-ui,sans-serif`;
   c.fillText(labels[i],pt.x+3,top+27);
   c.fillStyle='#6B7D8D';c.font=`${small?8:9.5}px system-ui,sans-serif`;
   c.fillText(sub[i],pt.x+3,top+43);
   this.glyph(i,{x:pt.x,y:top+126},1,t,active);
   this.panel(left+9,top+215,card.w-18,68,9,`rgba(${hueRGB[i]},.055)`,null);
   c.textAlign='left';c.fillStyle=channelHue[i];c.font=`800 ${small?7.5:8}px system-ui,sans-serif`;
   c.fillText(`${this.counts[i]} VOICES`,left+17,top+226);
   c.restore();
  });
  // Travel takes place on the empty canvas, between the two stationary layouts.
  if(p>.18&&p<.82){c.globalAlpha=Math.sin((p-.18)/.64*Math.PI)*.15;c.strokeStyle='#63829B';c.lineWidth=.8;
   for(let i=0;i<this.dots.length;i+=8){const d=this.dots[i],start=this.sourcePosition(d),point=this.position(d,p,t);c.beginPath();c.moveTo(start.x,start.y);c.lineTo(point.x,point.y);c.stroke();}c.globalAlpha=1;}
  if(targetAlpha)l.targets.forEach((coords,i)=>{const cl=this.clusters[i],pt=this.point(coords),doc=cl.precedent==='documented',selected=this.focus===cl.id;
   const hoverPod=this.hover?.kind==='cluster'&&this.hover.c.id===cl.id,alpha=targetAlpha,r=this.targetRadius();
   c.globalAlpha=alpha;
   c.beginPath();c.arc(pt.x,pt.y,r,0,2*Math.PI);c.fillStyle=doc?'#ECF7F1':'#FCF1F4';c.fill();
   c.strokeStyle=doc?'#298A63':'#BD8092';c.lineWidth=selected||hoverPod?2:1;c.setLineDash(doc?[]:[3,6]);c.stroke();c.setLineDash([]);
   const name=titles[cl.id]||cl.short,lines=this.wrapWords(name,small?20:27).slice(0,2),fs=small?11:13.5;
   const top=pt.y-r-(lines.length*(fs+3))-26;
   c.textAlign='center';c.fillStyle='#213449';c.font=`800 ${fs}px system-ui,sans-serif`;
   lines.forEach((s,k)=>c.fillText(s,pt.x,top+18+k*(fs+3)));
   c.font=`700 ${small?8:9.5}px system-ui,sans-serif`;c.fillStyle='#61798D';
   c.fillText(`${cl.count} VOICES · ALL ${this.channels.length} CHANNELS`,pt.x,top+18+lines.length*(fs+3)+3);
   this.panel(pt.x-11,top-26,22,20,10,'#FFFFFF','#D2DEE6',1);
   c.fillStyle='#61798D';c.font=`800 ${small?9:10.5}px system-ui,sans-serif`;c.fillText(String(i+1).padStart(2,'0'),pt.x,top-12);
   const cs=small?8:9.5;
   if(doc)this.chip(pt.x,pt.y+r+16,small?(cl.proofMetric||'PUBLISHED').toUpperCase():(cl.proofMetric||'Published').toUpperCase()+' · PUBLISHED PRACTICE',cs,'#176044','#E2F3E9','#99C8AF');
   else this.chip(pt.x,pt.y+r+16,small?'TO INVESTIGATE':'NO VALIDATED PRACTICE YET',cs,'#9A3655','#FAECF0','#E4BCCA');
   c.globalAlpha=1;
  });
  // Retain channel identity and every original tooltip/click target.
  for(const d of this.dots){const a=this.position(d,p,t),on=hoveredDot===d,col=channelHue[d.ci];
   const related=this.hover?(this.hover.kind==='source'?this.hover.channel===d.v.channel:this.hover.kind==='cluster'?this.hover.c.id===d.v.theme:on):true;
   c.globalAlpha=related?1:.30;
   if(on){c.beginPath();c.arc(a.x,a.y,small?3.2:4,0,2*Math.PI);c.fillStyle='#FFF';c.fill();c.strokeStyle=col;c.lineWidth=1.5;c.stroke();}
   this.dot(a.x,a.y,small?2:2.35,col);c.globalAlpha=1;
  }
  if(p>.82){const fs=small?8:9,perRow=small?3:6,step=small?w/3.2:Math.min(155,w/6.5),rows=Math.ceil(6/perRow),keyY=h-60-(rows-1)*17,startX=w/2-step*(perRow-1)/2;
   c.globalAlpha=targetAlpha;c.textAlign='left';c.font=`700 ${fs}px system-ui,sans-serif`;
   this.channels.forEach((n,i)=>{const x=startX+(i%perRow)*step-step*.34,y=keyY+Math.floor(i/perRow)*17;
    this.dot(x,y-3,3,channelHue[i]);c.fillStyle='#52697D';c.fillText(small?n.split(' ')[0].toUpperCase():n.toUpperCase(),x+8,y);});c.globalAlpha=1;}
 }
 wrapWords(str,max){const words=str.split(' '),lines=[''];for(const word of words){let i=lines.length-1;if((lines[i]+' '+word).trim().length>max){lines.push(word);}else lines[i]=(lines[i]+' '+word).trim();}return lines;}
 destroy(){this.running=false;this.observer.disconnect();}
}
window.MieruConstellation=Network;
})();
