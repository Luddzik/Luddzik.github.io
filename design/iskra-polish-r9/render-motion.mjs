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

try{await c('Page.enable');await c('Runtime.enable');await c('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});await c('Page.navigate',{url:pathToFileURL(path.join(here,'index.html')).href});await js('new Promise((resolve,reject)=>{let attempts=0;const timer=setInterval(()=>{if(typeof finishIntro==="function"){clearInterval(timer);resolve()}else if(++attempts>200){clearInterval(timer);reject(Error("Page did not initialize"))}},50)})');await js('finishIntro()');await js('document.fonts.ready');await js('void introduce(true)');await js('introAnimations.forEach(a=>a.pause())');for(const time of [0,350,700,1100,1500,1900,2200]){await js('introAnimations.forEach(a=>a.currentTime='+time+')');await capture('intro-t'+time)}await js('finishIntro()');await capture('intro-final');await js('location.hash="neuroshift"');await wait(900);await c('Emulation.setDeviceMetricsOverride',{width:1440,height:700,deviceScaleFactor:1,mobile:false});await capture('game-short');await c('Emulation.setDeviceMetricsOverride',{width:390,height:740,deviceScaleFactor:1,mobile:false});await js('location.hash="home"');await wait(800);await js('document.querySelector(".menu").click()');await capture('menu-mobile');console.log(await js('({menu:document.querySelector(".menu").getAttribute("aria-expanded"),visibleLinks:[...document.querySelectorAll("nav a")].map(a=>a.textContent)})'));await js('document.querySelectorAll("nav a")[2].click()');await wait(850);console.log(await js('({page:activeView.id,menuClosed:!document.querySelector("nav").classList.contains("open")})'));
if(process.argv.includes('--film')){
 await c('Emulation.setDeviceMetricsOverride',{width:1280,height:800,deviceScaleFactor:1,mobile:false});
 await js('history.replaceState(null,"","#home");void route(true)');await wait(100);
 await mkdir(path.join(here,'previews/motion-frames'),{recursive:true});
 let frameNumber=0;
 const frame=async()=>{const shot=await c('Page.captureScreenshot',{format:'jpeg',quality:88});await writeFile(path.join(here,'previews/motion-frames',String(frameNumber++).padStart(4,'0')+'.jpg'),Buffer.from(shot.data,'base64'))};
 const hold=async(seconds)=>{for(let i=0;i<Math.round(seconds*24);i++)await frame()};
 await js('void introduce(true)');await js('introAnimations.forEach(a=>a.pause())');
 for(let t=0;t<2400;t+=1000/24){await js('introAnimations.forEach(a=>a.currentTime='+t+')');await frame()}
 await js('finishIntro()');await hold(.8);
 for(const name of ['neuroshift','company','press']){
  await js('history.pushState(null,"","#'+name+'");void route()');await js('routeAnimations.forEach(a=>a.pause())');
  for(let t=0;t<640;t+=1000/24){await js('routeAnimations.forEach(a=>a.currentTime='+t+')');await frame()}
  await js('routeAnimations.forEach(a=>a.currentTime=1000)');await wait(20);await hold(1);
 }
 console.log('Film frames: '+frameNumber);
}
}finally{await call('Browser.close').catch(()=>{});ws.close();chrome.kill()}