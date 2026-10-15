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

const checks=[], errors=[];
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text)});
async function go(hash=''){await c('Page.navigate',{url:pathToFileURL(path.join(here,'index.html')).href+hash});await wait(300)}
async function settle(){await js('Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))])');await wait(800)}
const overflow=()=>js('({viewport:document.documentElement.scrollWidth>innerWidth,view:[...document.querySelectorAll(".view")].filter(v=>!v.hidden).map(v=>({id:v.id,overflow:v.scrollWidth>v.clientWidth+1}))})');
try{
 await c('Page.enable');await c('Runtime.enable');
 await c('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await go();await js('finishIntro()');await settle();
 await capture('home-desktop');
 await js('void introduce(true)');await wait(500);await capture('intro-0500');await wait(500);await capture('intro-1000');await wait(600);await capture('intro-1600');await wait(900);await capture('intro-complete');
 checks.push({introFinished:await js('!introRunning && document.querySelector(".entrance").hidden')});
 await js('document.querySelector(".details").click()');await wait(280);await capture('game-transition');
 checks.push({duringTransition:await js('[...document.querySelectorAll(".view")].filter(v=>!v.hidden).map(v=>({id:v.id,inert:v.inert}))')});
 await wait(600);await capture('game-desktop');
 checks.push({game:await overflow(),gameFont:await js('getComputedStyle(document.querySelector(".world-info dd")).fontSize')});
 for(const name of ['company','press','contact','gameplay']){
  await js('location.hash="'+name+'"');await wait(850);await capture(name+'-desktop');checks.push({page:name,...await overflow()});
 }
 await js('location.hash="company"');await wait(80);await js('location.hash="press"');await wait(80);await js('location.hash="contact"');await wait(850);
 checks.push({rapidNavigation:await js('[...document.querySelectorAll(".view")].filter(v=>!v.hidden).map(v=>v.id)')});
 for(const width of [820,390,320]){
  await c('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
  for(const name of ['home','neuroshift','company','press','contact']){
   await js('location.hash="'+name+'"');await wait(800);await capture(name+'-'+width);checks.push({width,page:name,...await overflow()});
  }
 }
 await c('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await js('document.querySelector("#mode").value="3";document.querySelector("#mode").dispatchEvent(new Event("change"));location.hash="home"');await wait(1000);await capture('home-three');
 await js('document.querySelectorAll(".choose")[1].click()');await wait(1300);await capture('home-three-second');
 await js('document.querySelector("#mode").value="8";document.querySelector("#mode").dispatchEvent(new Event("change"));location.hash="games"');await wait(900);await capture('games-eight');
 await c('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await js('location.hash="neuroshift"');await wait(100);checks.push({reducedMotion:await js('!introRunning && document.querySelector("#neuroshift").classList.contains("world-paused") && document.querySelector(".motion-toggle").disabled')});
 checks.push({runtimeErrors:errors});
 await writeFile(path.join(here,'previews/checks.json'),JSON.stringify(checks,null,2));
 console.log(JSON.stringify(checks,null,2));
}finally{await call('Browser.close').catch(()=>{});ws.close();chrome.kill()}
