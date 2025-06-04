(()=>{
let record=false
let data=[]
let last=Date.now()
const ghost=document.createElement('div')
ghost.style.position='fixed'
ghost.style.width='10px'
ghost.style.height='10px'
ghost.style.borderRadius='50%'
ghost.style.background='red'
ghost.style.pointerEvents='none'
ghost.style.zIndex='9998'
document.body.appendChild(ghost)
const ui=document.createElement('div')
ui.style.position='fixed'
ui.style.right='10px'
ui.style.bottom='10px'
ui.style.zIndex='9999'
ui.innerHTML='<button id="rec">Record</button><button id="stop" disabled>Stop</button><button id="play" disabled>Play</button><button id="auto" disabled>Auto</button>'
document.body.appendChild(ui)
const recBtn=document.getElementById('rec')
const stopBtn=document.getElementById('stop')
const playBtn=document.getElementById('play')
const autoBtn=document.getElementById('auto')
recBtn.onclick=()=>{data=[];record=true;last=Date.now();recBtn.disabled=true;stopBtn.disabled=false}
stopBtn.onclick=()=>{record=false;train();stopBtn.disabled=true;playBtn.disabled=false;autoBtn.disabled=false}
playBtn.onclick=play
autoBtn.onclick=auto
function handler(e){if(!record)return;data.push({t:Date.now()-last,x:e.clientX,y:e.clientY,type:e.type,key:e.key})}
;['mousemove','mousedown','mouseup','keydown','keyup'].forEach(evt=>document.addEventListener(evt,handler))
function play(){let t=0;data.forEach(ev=>{t+=ev.t;setTimeout(()=>{if(ev.type.includes('mouse')){ghost.style.left=ev.x+'px';ghost.style.top=ev.y+'px'}},t)})}
let model={}
function train(){for(let i=0;i<data.length-1;i++){const a=data[i].type,b=data[i+1].type;if(!model[a])model[a]={};model[a][b]=(model[a][b]||0)+1}}
function predict(a){const next=model[a];if(!next)return null;return Object.keys(next).reduce((x,y)=>next[x]>next[y]?x:y)}
function auto(){let idx=0;let cur=data[0]&&data[0].type;function step(){if(idx>=data.length)return;const ev=data[idx];setTimeout(()=>{ghost.style.left=ev.x+'px';ghost.style.top=ev.y+'px';cur=predict(cur)||ev.type;idx++;step()},ev.t)}step()}
})();
