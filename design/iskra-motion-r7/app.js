const $=s=>document.querySelector(s);let count=1;const titles=['NEUROSHIFT','WORLD STUDY 02','WORLD STUDY 03'];function activate(panel){document.querySelectorAll('.panel').forEach(p=>{p.classList.toggle('active',p===panel);p.querySelector('.choose').setAttribute('aria-pressed',p===panel);p.querySelector('.panel-copy').inert=p!==panel})}function render(){const featured=Math.min(count,3);$('.slashes').classList.toggle('solo',count===1);$('.slashes').innerHTML=Array.from({length:featured},(_,i)=>'<article class="panel '+(i===0?'active':'')+'" data-i="'+i+'"><div class="unskew"><div class="art art-'+i+'"></div>'+(i===0?'<img class="crew" src="../iskra-directions/assets/crew.png" alt="NeuroShift squad">':'')+'<div class="shade"></div></div><div class="panel-copy"><span class="kicker">'+(i===0?'IN DEVELOPMENT / PC':'LAYOUT SPECIMEN / NOT AN ANNOUNCEMENT')+'</span><h1>'+titles[i]+'</h1><p>'+(i===0?'Turn-based squad tactics. Built from what you kill.':'An individual world. A shared Iskra identity.')+'</p>'+(i===0?'<a class="action details" href="#neuroshift">Discover NeuroShift <span>↗</span></a>':'<span class="specimen">Future game placement</span>')+'</div><button class="choose" aria-pressed="'+(i===0)+'" aria-label="Focus '+titles[i]+'"><span>0'+(i+1)+'</span><b>'+(i===0?'NEUROSHIFT':'FUTURE GAME')+'</b><em>/</em></button></article>').join('');document.querySelectorAll('.panel').forEach(p=>{p.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activate(p)});p.addEventListener('focusin',()=>activate(p));p.querySelector('.choose').onclick=()=>activate(p)});activate($('.panel'));$('.catalog').innerHTML=Array.from({length:count},(_,i)=>i===0?'<a class="game-card real" href="#neuroshift"><div class="card-art"><img src="../iskra-directions/assets/crew.png" alt="NeuroShift squad"></div><h2>NeuroShift <span>↗</span></h2><p>PC / IN DEVELOPMENT</p></a>':'<article class="game-card sample"><div class="card-art"><span>/</span></div><h2>Future game placement</h2><p>DESIGN SPECIMEN '+(i+1)+' · NOT ANNOUNCED</p></article>').join('');}
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let activeView=null, routeVersion=0, viewAnimation=null, pauseWorld=false, introAnimation=null, introTimer=null;
const routeNames=['home','games','company','press','contact','neuroshift','gameplay'];
function resolveRoute(hash){const name=hash.replace(/^#/,'')||'home';return name.startsWith('press-')?'press':routeNames.includes(name)?name:'home'}
function syncMotion(){
 const paused=pauseWorld||reduceMotion.matches||document.hidden||activeView?.id!=='neuroshift';
 $('#neuroshift').classList.toggle('world-paused',paused);
 $('.motion-toggle').textContent=reduceMotion.matches?'Reduced motion enabled':pauseWorld?'Play background':'Pause background';
 $('.motion-toggle').disabled=reduceMotion.matches;
 $('.motion-toggle').setAttribute('aria-pressed',String(pauseWorld||reduceMotion.matches));
}
async function route(initial=false){
 const version=++routeVersion,hash=location.hash.slice(1),name=resolveRoute(location.hash),next=$('#'+name);
 $('nav').classList.remove('open');$('.menu').setAttribute('aria-expanded','false');
 document.querySelectorAll('video').forEach(video=>video.pause());
 viewAnimation?.cancel();
 if(activeView&&activeView!==next&&!reduceMotion.matches&&!initial){
  viewAnimation=activeView.animate([{opacity:1},{opacity:0}],{duration:180,easing:'ease-in',fill:'forwards'});
  await viewAnimation.finished.catch(()=>{});if(version!==routeVersion)return;
 }
 const changed=activeView!==next;
 document.querySelectorAll('.view').forEach(view=>{view.hidden=view!==next;view.inert=view!==next});
 viewAnimation?.cancel();viewAnimation=null;activeView=next;document.body.dataset.view=name;
 document.querySelectorAll('nav a').forEach(link=>{
  const current=link.hash==='#'+name||(['neuroshift','gameplay'].includes(name)&&link.hash==='#games');
  link.classList.toggle('current',current);if(current)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
 });
 document.title='Iskra / '+(name==='neuroshift'?'NeuroShift':name[0].toUpperCase()+name.slice(1));
 if(changed)next.scrollTop=0;
 if(hash.startsWith('press-'))document.getElementById(hash)?.scrollIntoView({block:'start',behavior:'instant'});
 syncMotion();
 if(!initial){next.setAttribute('tabindex','-1');next.focus({preventScroll:true})}
 if(changed&&!reduceMotion.matches&&!initial){
  viewAnimation=next.animate(name==='neuroshift'?[{opacity:0},{opacity:1}]:[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:580,easing:'cubic-bezier(.16,1,.3,1)'});
  await viewAnimation.finished.catch(()=>{});if(version===routeVersion)viewAnimation=null;
 }
}
$('#mode').onchange=event=>{count=Number(event.target.value);render()};
$('.menu').onclick=()=>{const open=$('nav').classList.toggle('open');$('.menu').setAttribute('aria-expanded',String(open))};
$('.motion-toggle').onclick=()=>{pauseWorld=!pauseWorld;syncMotion()};
document.addEventListener('visibilitychange',()=>{syncMotion();if(document.hidden)document.querySelectorAll('video').forEach(video=>video.pause())});
reduceMotion.addEventListener('change',()=>{viewAnimation?.cancel();finishIntro();syncMotion()});
addEventListener('hashchange',()=>{finishIntro();route()});
addEventListener('keydown',event=>{
 if(event.key!=='Escape')return;
 if(!$('.entrance').hidden){finishIntro();return}
 if($('nav').classList.contains('open')){$('nav').classList.remove('open');$('.menu').setAttribute('aria-expanded','false');$('.menu').focus();return}
 if(activeView?.id==='gameplay')location.hash='neuroshift';else if(activeView?.id==='neuroshift')location.hash='home';
});
function finishIntro(){
 clearTimeout(introTimer);const wasFocused=$('.entrance').contains(document.activeElement);introAnimation?.cancel();$('.entrance').hidden=true;
 document.querySelectorAll('header, main, footer').forEach(el=>el.inert=false);
 if(wasFocused)$('.brand').focus();
}
function introduce(){
 let seen=false;try{seen=sessionStorage.getItem('iskra-intro-seen')==='1';sessionStorage.setItem('iskra-intro-seen','1')}catch{}
 if(seen||reduceMotion.matches||(location.hash&&location.hash!=='#home'))return;
 $('.entrance').hidden=false;document.querySelectorAll('header, main, footer').forEach(el=>el.inert=true);
 introTimer=setTimeout(async()=>{
  introAnimation=$('.entrance').animate([{opacity:1},{opacity:0}],{duration:650,easing:'ease-in-out',fill:'forwards'});
  await introAnimation.finished.catch(()=>{});finishIntro();
 },800);
}
$('.skip-intro').onclick=finishIntro;
render();route(true);introduce();
