
const $=selector=>document.querySelector(selector);let count=1;
const titles=['NEUROSHIFT','WORLD STUDY 02','WORLD STUDY 03'];
function activate(panel){document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p===panel))}
function render(){
 $('.slashes').classList.toggle('solo',count===1);
 $('.slashes').innerHTML=Array.from({length:Math.min(count,3)},(_,i)=>'<article class="panel '+(i===0?'active':'')+'"><div class="unskew"><div class="art art-'+i+'"></div>'+(i===0?'<img class="crew" src="../iskra-directions/assets/crew.png" alt="">':'')+'<div class="shade"></div></div>'+(i===0?'<a class="panel-link" href="#neuroshift" aria-label="Discover NeuroShift">':'<button class="panel-link sample-link" type="button" aria-label="Preview layout specimen '+(i+1)+'">')+'<span class="panel-title">'+titles[i]+'</span>'+(i===0?'</a>':'<span class="panel-note">LAYOUT SPECIMEN · NOT ANNOUNCED</span></button>')+'</article>').join('');
 document.querySelectorAll('.panel').forEach(panel=>{panel.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activate(panel)});panel.addEventListener('focusin',()=>activate(panel));panel.querySelector('.sample-link')?.addEventListener('click',()=>activate(panel))});
 $('.catalog').innerHTML=Array.from({length:count},(_,i)=>i===0?'<a class="game-card real" href="#neuroshift"><div class="card-art"><img src="../iskra-directions/assets/crew.png" alt="NeuroShift squad"></div><h2>NeuroShift <span>↗</span></h2><p>PC / IN DEVELOPMENT</p></a>':'<article class="game-card sample"><div class="card-art"><span>/</span></div><h2>Future game placement</h2><p>DESIGN SPECIMEN '+(i+1)+' · NOT ANNOUNCED</p></article>').join('');
}
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let activeView=null, routeVersion=0, viewAnimations=[], pauseWorld=false, introAnimation=null, introTimer=null;
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
 const version=++routeVersion,hash=location.hash.slice(1),name=resolveRoute(location.hash),next=$('#'+name),previous=activeView;
 $('nav').classList.remove('open');$('.menu').setAttribute('aria-expanded','false');
 document.querySelectorAll('video').forEach(video=>video.pause());
 viewAnimations.forEach(animation=>animation.cancel());viewAnimations=[];
 document.querySelectorAll('.view').forEach(view=>{view.hidden=view!==previous;view.inert=true;view.style.zIndex='0'});
 const changed=previous!==next;
 next.hidden=false;next.inert=false;next.style.zIndex='2';activeView=next;document.body.dataset.view=name;
 document.querySelectorAll('nav a').forEach(link=>{
  const current=link.hash==='#'+name||(['neuroshift','gameplay'].includes(name)&&link.hash==='#games');
  link.classList.toggle('current',current);if(current)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
 });
 document.title='Iskra / '+(name==='neuroshift'?'NeuroShift':name[0].toUpperCase()+name.slice(1));
 if(changed)next.scrollTop=0;
 if(hash.startsWith('press-'))document.getElementById(hash)?.scrollIntoView({block:'start',behavior:'instant'});
 syncMotion();
 if(!initial){next.setAttribute('tabindex','-1');next.focus({preventScroll:true})}
 if(changed&&previous&&!reduceMotion.matches&&!initial){
  previous.style.zIndex='1';
  viewAnimations=[next.animate([{opacity:0},{opacity:1}],{duration:520,easing:'cubic-bezier(.4,0,.2,1)',fill:'both'})];
  await Promise.all(viewAnimations.map(animation=>animation.finished.catch(()=>{})));
  if(version!==routeVersion)return;
 }
 document.querySelectorAll('.view').forEach(view=>view.hidden=view!==next);
 viewAnimations.forEach(animation=>animation.cancel());viewAnimations=[];
}
$('#mode').onchange=event=>{count=Number(event.target.value);render()};
$('.menu').onclick=()=>{const open=$('nav').classList.toggle('open');$('.menu').setAttribute('aria-expanded',String(open))};
$('.motion-toggle').onclick=()=>{pauseWorld=!pauseWorld;syncMotion()};
document.addEventListener('visibilitychange',()=>{syncMotion();if(document.hidden)document.querySelectorAll('video').forEach(video=>video.pause())});
reduceMotion.addEventListener('change',()=>{viewAnimations.forEach(a=>a.cancel());finishIntro();route(true)});
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
  introAnimation=$('.entrance').animate([{opacity:1},{opacity:0}],{duration:200,easing:'ease-in-out',fill:'forwards'});
  await introAnimation.finished.catch(()=>{});finishIntro();
 },2250);
}
$('.skip-intro').onclick=finishIntro;
render();route(true);introduce();
