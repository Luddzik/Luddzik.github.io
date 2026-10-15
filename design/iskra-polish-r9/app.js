const $=s=>document.querySelector(s);let count=1;const titles=['NEUROSHIFT','WORLD STUDY 02','WORLD STUDY 03'];function activate(panel){document.querySelectorAll('.panel').forEach(p=>{p.classList.toggle('active',p===panel);p.querySelector('.choose').setAttribute('aria-pressed',p===panel);p.querySelector('.panel-copy').inert=p!==panel})}function render(){const featured=Math.min(count,3);$('.slashes').classList.toggle('solo',count===1);$('.slashes').innerHTML=Array.from({length:featured},(_,i)=>'<article class="panel '+(i===0?'active':'')+'" data-i="'+i+'"><div class="unskew"><div class="art art-'+i+'"></div>'+(i===0?'<img class="crew" src="../iskra-directions/assets/crew.png" alt="NeuroShift squad">':'')+'<div class="shade"></div></div><div class="panel-copy"><span class="kicker">'+(i===0?'IN DEVELOPMENT / PC':'LAYOUT SPECIMEN / NOT AN ANNOUNCEMENT')+'</span><h1>'+titles[i]+'</h1><p>'+(i===0?'Turn-based squad tactics.<br>Built from what you kill.':'An individual world. A shared Iskra identity.')+'</p>'+(i===0?'<a class="action details" href="#neuroshift">Discover NeuroShift <span>↗</span></a>':'<span class="specimen">Future game placement</span>')+'</div><button class="choose" aria-pressed="'+(i===0)+'" aria-label="Focus '+titles[i]+'"><span>0'+(i+1)+'</span><b>'+(i===0?'NEUROSHIFT':'FUTURE GAME')+'</b><em>/</em></button></article>').join('');document.querySelectorAll('.panel').forEach(p=>{p.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activate(p)});p.addEventListener('focusin',()=>activate(p));p.querySelector('.choose').onclick=()=>activate(p)});activate($('.panel'));$('.catalog').innerHTML=Array.from({length:count},(_,i)=>i===0?'<a class="game-card real" href="#neuroshift"><div class="card-art"><img src="../iskra-directions/assets/crew.png" alt="NeuroShift squad"></div><h2>NeuroShift <span>↗</span></h2><p>PC / IN DEVELOPMENT</p></a>':'<article class="game-card sample"><div class="card-art"><span>/</span></div><h2>Future game placement</h2><p>DESIGN SPECIMEN '+(i+1)+' · NOT ANNOUNCED</p></article>').join('');}

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const routeNames = ['home','games','company','press','contact','neuroshift','gameplay'];
let activeView = null, routeVersion = 0, routeAnimations = [], introAnimations = [];
let introVersion = 0, introRunning = false, pauseWorld = false;
const scrollPositions = new Map();
function resolveRoute(hash) {
 const name = hash.replace(/^#/,'') || 'home';
 return name.startsWith('press-') ? 'press' : routeNames.includes(name) ? name : 'home';
}
function animateElement(element, frames, options, collection) {
 const animation = element.animate(frames, options);
 collection.push(animation);
 return animation;
}
function textGroups(view) {
 if(view.id === 'home') return [...view.querySelectorAll('.panel.active .panel-copy,.choose,.edge-label')];
 if(view.id === 'neuroshift') return [...view.querySelectorAll('.world-info,.world-back,.motion-toggle')];
 return [...view.children];
}
function syncMotion() {
 const paused = pauseWorld || reduceMotion.matches || document.hidden || activeView?.id !== 'neuroshift';
 $('#neuroshift').classList.toggle('world-paused', paused);
 $('.motion-toggle').textContent = reduceMotion.matches ? 'Reduced motion enabled' : pauseWorld ? 'Play background' : 'Pause background';
 $('.motion-toggle').disabled = reduceMotion.matches;
 $('.motion-toggle').setAttribute('aria-pressed', String(pauseWorld || reduceMotion.matches));
}
async function route(initial = false) {
 const version = ++routeVersion;
 const hash = location.hash.slice(1), name = resolveRoute(location.hash), next = $('#'+name), previous = activeView;
 $('.menu').setAttribute('aria-expanded','false'); $('nav').classList.remove('open');
 document.querySelectorAll('video').forEach(video => video.pause());
 routeAnimations.forEach(animation => animation.cancel()); routeAnimations = [];
 if(previous) scrollPositions.set(previous.id, previous.scrollTop);
 document.querySelectorAll('.view').forEach(view => {
  view.hidden = view !== previous; view.inert = true; view.style.zIndex = '0';
 });
 const changed = previous !== next;
 next.hidden = false; next.inert = false; next.style.zIndex = '2';
 activeView = next; document.body.dataset.view = name;
 document.querySelectorAll('nav a').forEach(link => {
  const current = link.hash === '#'+name || (['neuroshift','gameplay'].includes(name) && link.hash === '#games');
  link.classList.toggle('current', current);
  if(current) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
 });
 document.title = 'Iskra / '+(name === 'neuroshift' ? 'NeuroShift' : name[0].toUpperCase()+name.slice(1));
 if(changed) next.scrollTop = scrollPositions.get(name) || 0;
 if(hash.startsWith('press-')) document.getElementById(hash)?.scrollIntoView({block:'start',behavior:'instant'});
 syncMotion();
 if(!initial) { next.setAttribute('tabindex','-1'); next.focus({preventScroll:true}); }
 if(changed && previous && !reduceMotion.matches && !initial) {
  previous.style.zIndex = '1';
  // Keep a fully painted scene under the new scene; fade text in separate groups.
  textGroups(previous).forEach(element => animateElement(element,[{opacity:1},{opacity:0}],{duration:130,fill:'both'},routeAnimations));
  animateElement(next,[{opacity:0},{opacity:1}],{duration:640,easing:'cubic-bezier(.4,0,.2,1)',fill:'both'},routeAnimations);
  textGroups(next).forEach(element => animateElement(element,[{opacity:0},{opacity:1}],{delay:170,duration:430,easing:'ease-out',fill:'both'},routeAnimations));
  await Promise.all(routeAnimations.map(animation => animation.finished.catch(()=>{})));
  if(version !== routeVersion) return;
 }
 document.querySelectorAll('.view').forEach(view => view.hidden = view !== next);
 routeAnimations.forEach(animation => animation.cancel()); routeAnimations = [];
}
function finishIntro() {
 ++introVersion;
 const hadFocus = $('.entrance').contains(document.activeElement);
 introAnimations.forEach(animation => animation.cancel()); introAnimations = [];
 introRunning = false;
 $('.entrance').hidden = true;
 document.body.classList.remove('introducing');
 document.querySelectorAll('header,main,footer').forEach(element => element.inert = false);
 if(hadFocus) $('.brand').focus();
}
async function introduce(force = false) {
 if(introRunning) finishIntro();
 let seen = false;
 try {seen = sessionStorage.getItem('iskra-r9-entered') === '1';sessionStorage.setItem('iskra-r9-entered','1')} catch {}
 if(reduceMotion.matches || (!force && (seen || (location.hash && location.hash !== '#home')))) return;
 if(activeView?.id !== 'home') return;
 const version = ++introVersion;
 introRunning = true;
 const overlay = $('.entrance'), logo = overlay.querySelector('img');
 overlay.hidden = false; document.body.classList.add('introducing');
 document.querySelectorAll('header,main,footer').forEach(element => element.inert = true);
 const target = $('.brand img').getBoundingClientRect();
 logo.style.width = target.width+'px';
 logo.style.left = target.left+'px';
 logo.style.top = (innerHeight*.45)+'px';
 const travel = target.top - innerHeight*.45;
 const mainBounds = $('main').getBoundingClientRect();
 const seamAngle = Math.atan(innerWidth*.2/mainBounds.height)*180/Math.PI;
 const cut = $('.intro-cut');
 cut.style.left = innerWidth*.6+'px'; cut.style.top=mainBounds.top+'px'; cut.style.height=mainBounds.height+'px'; cut.style.bottom='auto';
 const seamTransform='skewX(-'+seamAngle+'deg)';
 const opts = {fill:'both',easing:'cubic-bezier(.22,.61,.36,1)'};
 animateElement(logo,[{opacity:0,clipPath:'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0 0% 0 0)'}],{...opts,duration:650},introAnimations);
 animateElement(logo,[{transform:'translateY(0)',opacity:1},{transform:'translateY('+travel+'px)',opacity:1}],{...opts,delay:850,duration:1000},introAnimations);
 animateElement(logo,[{opacity:1},{opacity:0}],{...opts,delay:1800,duration:250},introAnimations);
 animateElement($('.intro-cut'),[{transform:seamTransform+' scaleY(0)',opacity:0},{transform:seamTransform+' scaleY(1)',opacity:.6},{transform:seamTransform+' scaleY(1)',opacity:0}],{...opts,duration:1250},introAnimations);
 animateElement($('#home'),[
  {clipPath:'polygon(60% 0%,60% 0%,60% 0%,60% 0%)',offset:0},
  {clipPath:'polygon(59% 0%,61% 0%,41% 100%,39% 100%)',offset:.28},
  {clipPath:'polygon(48% 0%,76% 0%,56% 100%,28% 100%)',offset:.60},
  {clipPath:'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',offset:1}
 ],{...opts,delay:300,duration:1900},introAnimations);
 [ $('header'), $('footer') ].forEach(element => animateElement(element,[{opacity:0},{opacity:1}],{...opts,delay:1650,duration:650},introAnimations));
 textGroups($('#home')).forEach(element => animateElement(element,[{opacity:0},{opacity:1}],{...opts,delay:1800,duration:600},introAnimations));
 await Promise.all(introAnimations.map(animation => animation.finished.catch(()=>{})));
 if(version === introVersion) finishIntro();
}
$('#mode').onchange = event => {count=Number(event.target.value);render()};
$('.menu').onclick = () => {const open=$('nav').classList.toggle('open');$('.menu').setAttribute('aria-expanded',String(open))};
$('.motion-toggle').onclick = () => {pauseWorld=!pauseWorld;syncMotion()};
$('.skip-intro').onclick = finishIntro;
$('.replay-intro').onclick = async () => {
 finishIntro();
 // Change URL without an extra hashchange transition; render home, then replay.
 history.pushState(null,'','#home');
 await route(true); introduce(true);
};
$('.skip').addEventListener('click',event => {event.preventDefault();activeView?.setAttribute('tabindex','-1');activeView?.focus()});
document.addEventListener('visibilitychange',() => {syncMotion();if(document.hidden){finishIntro();document.querySelectorAll('video').forEach(video=>video.pause())}});
reduceMotion.addEventListener('change',() => {finishIntro();route(true)});
addEventListener('hashchange',() => {finishIntro();route()});
addEventListener('resize',() => {if(introRunning) finishIntro()});
addEventListener('keydown',event => {
 if(event.key !== 'Escape') return;
 if(introRunning) {finishIntro();return}
 if($('nav').classList.contains('open')) {$('nav').classList.remove('open');$('.menu').setAttribute('aria-expanded','false');$('.menu').focus();return}
 if(activeView?.id === 'gameplay') location.hash='neuroshift';
 else if(activeView?.id === 'neuroshift') location.hash='home';
});
render();route(true);introduce();
