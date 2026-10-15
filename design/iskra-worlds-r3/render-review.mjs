import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import os from 'node:os';
const here=path.dirname(fileURLToPath(import.meta.url));
await mkdir(path.join(here,'previews'),{recursive:true});
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--allow-file-access-from-files','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--hide-scrollbars','--user-data-dir='+path.join(os.tmpdir(),'iskra-r3-' +Date.now()),'about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
const endpoint=await new Promise((resolve,reject)=>{let out='';const timer=setTimeout(()=>reject(Error('Chrome startup timeout')),20000);chrome.stderr.on('data',chunk=>{out+=chunk;const m=out.match(/DevTools listening on (\S+)/);if(m){clearTimeout(timer);resolve(m[1])}});chrome.on('error',reject)});
const ws=new WebSocket(endpoint);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});let serial=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const t=pending.get(m.id);pending.delete(m.id);m.error?t.reject(Error(m.error.message)):t.resolve(m.result)}};
const call=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params,sessionId}))});
const {targetId}=await call('Target.createTarget',{url:'about:blank'});const {sessionId}=await call('Target.attachToTarget',{targetId,flatten:true});const c=(method,params)=>call(method,params,sessionId);
const js=async expression=>{const r=await c('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};const wait=ms=>new Promise(r=>setTimeout(r,ms));
const capture=async(name,full=false)=>{const height=full?await js('document.documentElement.scrollHeight'):null;await writeFile(path.join(here,'previews',name+'.png'),Buffer.from((await c('Page.captureScreenshot',{format:'png',captureBeyondViewport:full,...(full?{clip:{x:0,y:0,width:await js('innerWidth'),height,scale:1}}:{})})).data,'base64'))};
const checks=[];
async function go(name='index'){await c('Page.navigate',{url:pathToFileURL(path.join(here,name+'.html')).href});await wait(600);}
async function scene(i,p){await js('ISKRA_REVIEW.scrollTo('+i+','+p+')');await wait(120);}
try{await c('Page.enable');await c('Runtime.enable');
for(const width of [1440,820,390,320]){
await c('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});await go();
checks.push({width,hero:await js('({overflow:document.documentElement.scrollWidth>innerWidth,counts:ISKRA_REVIEW.getCounts()})')});await capture('hero-'+width);
await scene(0,.3);await capture('scene-'+width);
checks.push({width,scene:await js("({overflow:document.documentElement.scrollWidth>innerWidth,contentInView:document.querySelector('.world-actions').getBoundingClientRect().bottom<innerHeight,clip:getComputedStyle(document.querySelector('.world-frame')).clipPath})")});
}
await c('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});await go();await scene(0,0);const start=await js("getComputedStyle(document.querySelector('.world-frame')).clipPath");await scene(0,.35);const end=await js("getComputedStyle(document.querySelector('.world-frame')).clipPath");checks.push({scrollChangesAperture:start!==end,start,end});await capture('scene-neuroshift');
await scene(0,.78);await wait(600);await capture('scene-gameplay');checks.push({gameplay:await js("(()=>{const v=document.querySelector('.footage');return {visible:Number(v.style.opacity)>.9,loaded:v.readyState>=2,playing:!v.paused}})()")});
await scene(1,.45);await capture('scene-valley');await scene(2,.45);await capture('scene-orbit');
for(const count of [1,3,8,24]){await js('ISKRA_REVIEW.setCount('+count+')');await wait(100);checks.push({catalogMode:count,...await js('ISKRA_REVIEW.getCounts()')});}
await js("document.querySelector('#load-more').click();document.querySelector('#load-more').click()");checks.push({all24Visible:await js("document.querySelectorAll('.game-card').length===24")});
await js("document.querySelector('[data-filter=real]').click()");checks.push({realFilter:await js("document.querySelectorAll('.game-card').length===1")});
await js("document.querySelector('[data-filter=all]').click();const input=document.querySelector('#search');input.value='World study 17';input.dispatchEvent(new Event('input'))");checks.push({search:await js("document.querySelectorAll('.game-card').length===1&&document.querySelector('.card-title').textContent.includes('17')")});
await js("document.querySelector('#search').value='unmatched-test';document.querySelector('#search').dispatchEvent(new Event('input'))");checks.push({emptySearch:await js("!document.querySelector('#empty-state').hidden")});
await js('ISKRA_REVIEW.setCount(8);document.querySelector("#directory").scrollIntoView({behavior:"instant"})');await wait(350);await capture('directory-8');
await js('ISKRA_REVIEW.setCount(3)');await scene(0,.3);await js("document.querySelector('.open-trailer').click()");await wait(150);checks.push({trailerOpen:await js('document.querySelector("dialog").open')});await c('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await c('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});checks.push({escapeCloses:await js('!document.querySelector("dialog").open')});
await c('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(150);checks.push({reducedMotion:await js("document.body.classList.contains('simple')&&getComputedStyle(document.querySelector('.stage')).position==='relative'&&document.querySelector('.footage').paused")});await c('Emulation.setEmulatedMedia',{features:[]});
for(const name of ['identity','research']){await go(name);await capture(name,true);}
await go();await js('window.scrollTo({top:0,behavior:"instant"})');await capture('hero');
await mkdir(path.join(here,'previews/frames'),{recursive:true});
const points=await js("[0,document.querySelector('#scene-neuroshift').offsetTop,document.querySelector('#scene-neuroshift').offsetTop+(document.querySelector('#scene-neuroshift').offsetHeight-innerHeight)*.83,document.querySelector('#scene-demo-valley').offsetTop,document.querySelector('#scene-demo-valley').offsetTop+(document.querySelector('#scene-demo-valley').offsetHeight-innerHeight)*.8,document.querySelector('#scene-demo-orbit').offsetTop,document.querySelector('#scene-demo-orbit').offsetTop+(document.querySelector('#scene-demo-orbit').offsetHeight-innerHeight)*.8,document.querySelector('#directory').offsetTop]");
await c('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
let n=0;
for(let segment=0;segment<points.length-1;segment++){for(let step=0;step<48;step++){const t=step/47;const eased=t*t*(3-2*t);const y=points[segment]+(points[segment+1]-points[segment])*eased;await js('window.scrollTo({top:'+y+',behavior:"instant"})');await wait(35);await capture('frames/frame-'+String(n++).padStart(4,'0'));}}
await writeFile(path.join(here,'previews/checks.json'),JSON.stringify(checks,null,2));console.log(JSON.stringify({checks,frames:n},null,2));
}finally{await call('Browser.close').catch(()=>{});ws.close();chrome.kill()}
