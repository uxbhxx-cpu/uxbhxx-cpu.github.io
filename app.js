const $=id=>document.getElementById(id);
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function showDays(){
  const d=load('date',null); if(!d)return;
  $('date').value=d;
  const n=Math.floor((Date.now()-new Date(d))/864e5);
  $('days').textContent=n+' kun 💕';
}
$('date').onchange=e=>{save('date',e.target.value);showDays()};
let items=load('items',[]);
function render(){
  $('list').innerHTML='';
  items.forEach((it,i)=>{
    const li=document.createElement('li');
    li.textContent=it.t;
    if(it.done)li.className='done';
    li.onclick=()=>{it.done=!it.done;save('items',items);render()};
    const x=document.createElement('span');
    x.textContent='✕';
    x.onclick=e=>{e.stopPropagation();items.splice(i,1);save('items',items);render()};
    li.append(x);
    $('list').append(li);
  });
}
$('add').onclick=()=>{
  const t=$('item').value.trim(); if(!t)return;
  items.push({t,done:false}); $('item').value='';
  save('items',items); render();
};
let c=load('miss',0);
const showCount=()=>{$('count').textContent=c?c+' marta bosildi':''};
$('miss').onclick=()=>{c++;save('miss',c);showCount();if(navigator.vibrate)navigator.vibrate(100)};
showDays();render();showCount();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
