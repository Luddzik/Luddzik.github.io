import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import os from 'node:os';
const here=path.dirname(fileURLToPath(import.meta.url));
await mkdir(path.join(here,'previews'),{recursive:true});
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--allow-file-access-from-files','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--hide-scrollbars','--user-data-dir='+path.join(os.tmpdir(),'iskra-review-'+Date.now()),'about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
const endpoint=await new Promise((resolve,reject)=>{let out='';const timer=setTimeout(()=>reject(Error('Chrome startup timeout')),20000);chrome.stderr.on('data',chunk=>{out+=chunk;const m=out.match(/DevTools listening on (\S+)/);if(m){clearTimeout(timer);resolve(m[1])}});chrome.on('error',reject)});
const ws=new WebSocket(endpoint);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});let serial=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const t=pending.get(m.id);pending.delete(m.id);m.error?t.reject(Error(m.error.message)):t.resolve(m.result)}};
const call=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params,sessionId}))});
const {targetId}=await call('Target.createTarget',{url:'about:blank'});const {sessionId}=await call('Target.attachToTarget',{targetId,flatten:true});const c=(method,params)=>call(method,params,sessionId);
const js=async expression=>{const r=await c('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};const wait=ms=>new Promise(r=>setTimeout(r,ms));
const capture=async(name,full=false)=>{const height=full?await js('document.documentElement.scrollHeight'):null;await writeFile(path.join(here,'previews',name+'.png'),Buffer.from((await c('Page.captureScreenshot',{format:'png',captureBeyondViewport:full,...(full?{clip:{x:0,y:0,width:await js('innerWidth'),height,scale:1}}:{})})).data,'base64'))};
const checks=[];
try{
await c('Page.enable');await c('Runtime.enable');
for(const width of [1440,820,390,320]){
await c('Emulation.setDeviceMetricsOverride',{width,height:1050,deviceScaleFactor:1,mobile:false});
await c('Page.navigate',{url:pathToFileURL(path.join(here,'index.html')).href});await wait(1000);
checks.push({width,...await js("({overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>i.getAttribute('src')&&(!i.complete||!i.naturalWidth)).map(i=>i.src),heroOverlap:document.querySelector('.hero .copy').getBoundingClientRect().bottom>document.querySelector('.crew').getBoundingClientRect().top && innerWidth<600})")});
await capture('site-'+width,true);
}
await c('Emulation.setDeviceMetricsOverride',{width:1440,height:1050,deviceScaleFactor:1,mobile:false});
await c('Page.navigate',{url:pathToFileURL(path.join(here,'index.html')).href});await wait(850);
checks.push({pause:await js("(()=>{const b=document.querySelector('.motion-toggle');b.click();return document.body.classList.contains('paused')&&b.getAttribute('aria-pressed')==='true'})()")});
checks.push({resume:await js("(()=>{document.querySelector('.motion-toggle').click();return !document.body.classList.contains('paused')})()")});
await js("document.querySelector('.image-link').click()");await wait(400);
checks.push({dialogOpen:await js("document.querySelector('dialog').open")});await capture('screenshot-viewer');
checks.push({nextImage:await js("(()=>{document.querySelector('.gallery-next').click();return document.querySelector('.gallery-caption').textContent.includes('2 of 2')})()")});
await c('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await c('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
checks.push({escapeCloses:await js("!document.querySelector('dialog').open")});
await c('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(150);
checks.push({reducedMotion:await js("document.querySelector('.motion-toggle').disabled&&document.body.classList.contains('paused')")});
await c('Emulation.setEmulatedMedia',{features:[]});
for(const name of ['identity','portfolio-test']){await c('Page.navigate',{url:pathToFileURL(path.join(here,name+'.html')).href});await wait(900);await capture(name,true);}
for(const size of [16,32,48,180,192,512]){
await c('Emulation.setDeviceMetricsOverride',{width:size,height:size,deviceScaleFactor:1,mobile:false});
await c('Page.navigate',{url:pathToFileURL(path.join(here,'brand/favicon.svg')).href});await wait(100);
await writeFile(path.join(here,'brand',size===180?'apple-touch-icon.png':size===192?'icon-192.png':size===512?'icon-512.png':'favicon-'+size+'.png'),Buffer.from((await c('Page.captureScreenshot',{format:'png'})).data,'base64'));
}
await writeFile(path.join(here,'previews/checks.json'),JSON.stringify(checks,null,2));console.log(JSON.stringify(checks,null,2));
}finally{await call('Browser.close').catch(()=>{});ws.close();chrome.kill()}
