'use strict';
const CALENDAR={start:'2026-09-01',end:'2027-06-15',closures:[['Labor Day','2026-09-07'],['Columbus Day','2026-10-12'],['Election Day','2026-11-03'],['Veterans Day','2026-11-11'],['Thanksgiving','2026-11-26','2026-11-27'],['Winter Break','2026-12-24','2027-01-01'],['Martin Luther King Day','2027-01-18'],['Presidents Day','2027-02-15'],['February Vacation','2027-02-16'],['Good Friday','2027-03-26'],['Spring Break','2027-04-12','2027-04-16'],['Memorial Day','2027-05-31']]};
const KEY='derby-countdown-2026-snow';
const day=s=>Date.parse(s+'T00:00:00Z')/86400000;
const iso=n=>new Date(n*86400000).toISOString().slice(0,10);
const closed=n=>CALENDAR.closures.some(([,a,b=a])=>n>=day(a)&&n<=day(b));
const eligible=n=>![0,6].includes(new Date(n*86400000).getUTCDay())&&!closed(n);
function validSnow(value){if(value===null||!/^\d+$/.test(String(value)))return 0;const n=Number(value);return Number.isSafeInteger(n)&&n>=0&&n<=1000?n:0;}
function finalDay(snow){let n=day(CALENDAR.end);for(let i=0;i<snow;i++){do{n++;}while(!eligible(n));}return n;}
function schoolCount(a,b){let count=0;for(let n=Math.max(a,day(CALENDAR.start));n<=b;n++)if(eligible(n))count++;return count;}
function calculate(today,snow){const now=day(today),end=finalDay(snow);const event=now>end?null:CALENDAR.closures.find(([,a,b=a])=>day(b)>=now&&day(a)<=end);return {calendar:Math.max(0,end-now),school:schoolCount(now,end),end:iso(end),event,ongoing:!!event&&now>=day(event[1]),untilCalendar:event?Math.max(0,day(event[1])-now):0,untilSchool:event?schoolCount(now,day(event[1])-1):0,complete:now>end};}
function todayNY(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
if(typeof module!=='undefined')module.exports={CALENDAR,day,iso,eligible,validSnow,finalDay,schoolCount,calculate,todayNY};
if(typeof document!=='undefined'){
let snow=0,storageOK=true;try{snow=validSnow(localStorage.getItem(KEY));}catch{storageOK=false;}
const $=id=>document.getElementById(id);
const short=s=>new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(s+'T00:00:00Z'));
function render(){const today=todayNY(),v=calculate(today,snow);for(const id of ['calendar','school','untilCalendar','untilSchool'])$(id).textContent=v[id];$('snow').textContent=snow;$('holiday').textContent=v.complete?'School year complete':v.event?(v.ongoing?'NOW: ':'')+v.event[0]:'No more scheduled days off';const e=v.event;$('date').textContent=e?short(v.ongoing?today:e[1])+(e[2]&&e[2]!==today?'–'+short(e[2]):''):'';$('undo').disabled=snow===0;$('reset').disabled=snow===0;$('add').disabled=snow>=1000;$('status').textContent=storageOK?'':'Snow-day changes cannot be saved in this browser.';}
function change(n){snow=n;try{localStorage.setItem(KEY,String(snow));storageOK=true;}catch{storageOK=false;}render();}
$('add').onclick=()=>change(Math.min(1000,snow+1));$('undo').onclick=()=>change(Math.max(0,snow-1));$('reset').onclick=()=>{if(confirm('Reset all added snow days to zero?'))change(0);};
window.addEventListener('storage',e=>{if(e.key===KEY||e.key===null){snow=validSnow(e.newValue);render();}});window.addEventListener('focus',render);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});setInterval(render,1000);render();
}
