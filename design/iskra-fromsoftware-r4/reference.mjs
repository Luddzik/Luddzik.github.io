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
try{await c('Page.enable');await c('Runtime.enable');await c('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await c('Page.navigate',{url:'https://www.fromsoftware.jp/ww/?lng=en'});await wait(25000);await capture('reference');console.log(await js('document.documentElement.outerHTML'));}finally{await call('Browser.close').catch(()=>{});ws.close();chrome.kill()}