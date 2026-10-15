(() => {
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const escape=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const base=window.ISKRA_GAMES;
let catalog=[], filter='all', query='', limit=8, chapters=[], frame=0;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let motion=true;
try { motion=localStorage.getItem('iskra-worlds-motion')!=='off'; } catch {}
const enabled=()=>motion&&!reduce.matches;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const smooth=(v,a,b)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
function makeCatalog(count){
  const list=base.slice(0,count).map(x=>({...x}));
  for(let i=list.length;i<count;i++){const source=base[i%2+1];list.push({...source,id:'study-'+(i+1),title:'World study '+String(i+1).padStart(2,'0')});}
  return list;
}
function drawChapters(){
  const featured=catalog.slice(0,3);
  $('#world-links').innerHTML=featured.map((g,i)=>'<a class="world-link" href="#scene-'+g.id+'"><img src="'+g.backdrop+'" alt=""><div><span>'+String(i+1).padStart(2,'0')+(g.real?' / IN DEVELOPMENT':' / DESIGN SPECIMEN')+'</span>'+escape(g.title)+'</div></a>').join('');
  $('#chapters').innerHTML=featured.map((g,i)=>'<section class="chapter '+g.theme+'" id="scene-'+g.id+'" aria-labelledby="title-'+g.id+'" style="--accent:'+g.accent+'"><div class="stage"><div class="world-frame"><img class="world-backdrop" src="'+g.backdrop+'" alt="'+(g.real?'NeuroShift world artwork':'Abstract design specimen; not an announced game')+'"><div class="game-watermark" aria-hidden="true">'+escape(g.real?'NEUROSHIFT':'ISKRA / '+String(i+1).padStart(2,'0'))+'</div><div class="world-shade"></div>'+(g.foreground?'<img class="world-foreground" src="'+g.foreground+'" alt="NeuroShift squad of modular fighters">':'<div class="orbital-rings" aria-hidden="true"></div>')+(g.video?'<video class="footage" muted loop playsinline preload="none" poster="'+g.poster+'" data-src="'+g.video+'" aria-hidden="true"></video><div class="footage-shade"></div>':'')+'</div><div class="world-caption"><span>'+String(i+1).padStart(2,'0')+' / '+escape(g.title)+' &nbsp; · &nbsp; '+escape(g.status)+'</span><img class="logo-small" src="brand/logo.svg" alt="Iskra"></div><div class="world-content"><p class="eyebrow">'+escape(g.genre)+'</p><h2 id="title-'+g.id+'">'+g.lines.map(line=>'<span>'+escape(line)+'</span>').join('')+'</h2><p class="world-hook">'+escape(g.hook)+'</p><p class="world-description">'+escape(g.description)+'</p><div class="world-actions">'+(g.real?'<a class="game-button" href="'+g.link+'" target="_blank" rel="noopener">'+g.cta+' <span>↗</span></a><button class="quiet-button open-trailer">Watch gameplay ▷</button>':'<a class="game-button" href="#directory">Explore the collection <span>↓</span></a>')+'</div>'+(!g.real?'<p class="specimen-label">DESIGN SPECIMEN · NOT A GAME ANNOUNCEMENT</p>':'')+'</div><div class="world-footer"><span class="meta">'+escape(g.platform)+' / '+(g.real?'OFFLINE · SINGLE PLAYER':'ILLUSTRATIVE WORLD ONLY')+'</span><span class="scene-progress"><span class="phase-label">SCROLL TO ENTER</span><span class="progress-track"><i></i></span></span></div></div></section>').join('');
  chapters=$$('.chapter').map(el=>({el,frame:el.querySelector('.world-frame'),bg:el.querySelector('.world-backdrop'),fg:el.querySelector('.world-foreground'),content:el.querySelector('.world-content'),video:el.querySelector('video'),shade:el.querySelector('.footage-shade'),ring:el.querySelector('.orbital-rings'),bar:el.querySelector('.progress-track i'),label:el.querySelector('.phase-label')}));
  $$('.open-trailer').forEach(b=>b.addEventListener('click',openTrailer));
}
function drawGrid(){
  const list=catalog.filter(g=>(filter==='all'||(filter==='real'?g.real:!g.real))&&((g.title+' '+g.genre).toLowerCase().includes(query)));
  $('#game-grid').innerHTML=list.slice(0,limit).map(g=>{
    const featured=catalog.indexOf(g)<3;
    const href=featured?'#scene-'+g.id:g.backdrop;
    return '<article class="game-card"><a class="card-art" href="'+href+'" '+(!featured?'target="_blank" rel="noopener"':'')+' aria-label="'+escape(g.title)+' — '+(featured?'enter world':'view illustrative art')+'"><img loading="lazy" src="'+(g.real?'assets/neuroshift-cover.png':g.backdrop)+'" alt="'+escape(g.real?'NeuroShift gameplay':'Abstract art for a design specimen')+'"><span class="card-badge">'+escape(g.status)+'</span><span class="card-arrow" aria-hidden="true">↗</span></a><div class="card-title"><h3>'+escape(g.title)+'</h3><span>'+escape(g.platform)+'</span></div><p>'+escape(g.genre)+(g.real?'':' · Not an announced game')+'</p></article>';
  }).join('');
  $('#empty-state').hidden=list.length!==0;
  $('#load-more').hidden=list.length<=limit;
  $('#results').textContent='Showing '+Math.min(limit,list.length)+' of '+list.length+(list.length===1?' entry':' entries');
  $('#catalog-summary').textContent=catalog.length===1?'Our current project.':catalog.length+' entries in this layout test. Only NeuroShift is a real game.';
}
function setCount(count){
  chapters.forEach(s=>s.video?.pause());
  catalog=makeCatalog(count);$('#portfolio-size').value=String(count);limit=8;filter='all';query='';$('#search').value='';
  $$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='all')));
  $('[data-filter="demo"]').hidden=count===1;
  $('#preview-disclosure').textContent=count===1?' · Real project only':' · 1 real game + '+(count-1)+' demo worlds';
  drawChapters();drawGrid();syncMotion();
}
function update(){
  frame=0;
  const vh=innerHeight;
  chapters.forEach(s=>{
    const r=s.el.getBoundingClientRect(), active=r.top<vh&&r.bottom>0;
    if(!enabled()){s.video?.pause();return;}
    if(!active){s.video?.pause();return;}
    const p=clamp(-r.top/(r.height-vh));
    const enter=smooth(p,0,.28), play=smooth(p,.48,.7);
    s.el.dataset.progress=p.toFixed(3);
    s.frame.style.clipPath='inset('+(8*(1-enter))+'% '+(5*(1-enter))+'% round '+(24*(1-enter))+'px)';
    s.frame.style.transform='scale('+(0.96+.04*enter)+')';
    s.bg.style.transform='scale('+(1.16-.16*p)+') translateY('+(-20*p)+'px)';
    if(s.fg){s.fg.style.transform='translate('+((1-enter)*80+play*65)+'px,'+((1-enter)*50-play*25)+'px) scale('+(.77+.27*enter)+')';s.fg.style.opacity=String(1-play);}
    s.content.style.transform='translateY('+((1-enter)*30-play*30)+'px)';
    s.content.style.opacity=String(.55+.45*enter);
    s.bar.style.transform='scaleX('+p+')';
    s.label.textContent=p<.2?'SCROLL TO ENTER':p<.5?'STEP INSIDE':s.video?'INTO THE GAME':'STAY CURIOUS';
    if(s.ring)s.ring.style.transform='rotate('+(-30+p*50)+'deg) scale('+(.8+p*.5)+')';
    if(s.video){
      s.video.style.opacity=String(play);s.shade.style.opacity=String(play);
      if(p>.48&&p<.99&&!document.hidden){if(!s.video.src)s.video.src=s.video.dataset.src;if(s.video.paused)s.video.play().catch(()=>{});}else s.video.pause();
    }
  });
  const hero=$('.hero'), sculpt=$('.sculpture>img');
  if(hero&&sculpt&&enabled()){const p=clamp(-hero.getBoundingClientRect().top/hero.offsetHeight);sculpt.style.transform='translateY('+(-p*85)+'px) rotate('+(-15+p*25)+'deg) rotateY(-15deg) scale('+(1+p*.12)+')';}
}
function schedule(){if(!frame)frame=requestAnimationFrame(update)}
function syncMotion(){
  document.body.classList.toggle('simple',!enabled());
  $('#motion-toggle').textContent=reduce.matches?'Reduced motion':motion?'Motion on':'Motion off';
  $('#motion-toggle').disabled=reduce.matches;
  $('#motion-toggle').setAttribute('aria-pressed',String(!enabled()));
  if(!enabled()){chapters.forEach(s=>{s.video?.pause();if(s.fg)s.fg.style.opacity='1';});const sculpt=$('.sculpture>img');if(sculpt)sculpt.style.removeProperty('transform');}
  schedule();
}
const dialog=$('#trailer-dialog');
function openTrailer(){dialog.showModal();dialog.querySelector('video').play().catch(()=>{});}
$('#close-video').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>dialog.querySelector('video').pause());
$('#portfolio-size').addEventListener('change',e=>setCount(Number(e.target.value)));
$('#motion-toggle').addEventListener('click',()=>{motion=!motion;try{localStorage.setItem('iskra-worlds-motion',motion?'on':'off')}catch{}syncMotion()});
reduce.addEventListener('change',syncMotion);
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;limit=8;$$('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));drawGrid()}));
$('#search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();limit=8;drawGrid()});
$('#load-more').addEventListener('click',()=>{limit+=8;drawGrid()});
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
document.addEventListener('visibilitychange',()=>{if(document.hidden)chapters.forEach(s=>s.video?.pause());else schedule()});
setCount(3);
window.ISKRA_REVIEW={setCount,scrollTo:(index,progress)=>{const s=chapters[index];if(s)window.scrollTo({top:s.el.offsetTop+clamp(progress)*(s.el.offsetHeight-innerHeight),behavior:'instant'})},getCounts:()=>({catalog:catalog.length,chapters:chapters.length,cards:$$('.game-card').length})};
})();