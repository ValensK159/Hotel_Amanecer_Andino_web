/* utilidades.js
   Disponibilidad, cálculo de totales, ilustraciones SVG, avisos y navegación. */
function free(r){const n=db.res.filter(x=>x.roomId===r.id&&ACTIVE.includes(x.status)&&x.in<S.out&&S.in<x.out).length;return r.units-n}
function calc(rid,a,b,ids){const r=room(rid),n=nights(a,b);const lines=[{l:r.name+" · "+n+(n===1?" noche":" noches"),v:n*r.price}];
ids.forEach(id=>{const s=SERVICES.find(x=>x.id===id);const q=s.perDay?n:1;lines.push({l:s.name+" · "+q+(s.perDay?(q===1?" día":" días"):" servicio"),v:q*s.price})});
return{lines,total:lines.reduce((t,x)=>t+x.v,0),n}}
function art(t,id){const P=[["#27327F","#F2A36B","#1B2566","#3A4AA8"],["#3B2F7A","#F7B267","#241B5C","#5A4BB0"],["#1E4C6B","#FFD08A","#12364E","#2F7FA8"],["#5A2D6B","#FF9E7A","#3A1B4A","#8A4FA0"]][t%4];
return `<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[0]}"/><stop offset="1" stop-color="${P[1]}"/></linearGradient></defs><rect width="300" height="150" fill="url(#g${id})"/><circle cx="${90+t*35}" cy="92" r="24" fill="#FFE3A8"/><path d="M0 150V95l50-35 45 38 55-55 60 60 40-30 50 40v37z" fill="${P[3]}"/><path d="M0 150V120l70-30 60 32 60-40 110 50v18z" fill="${P[2]}"/></svg>`}
const heroArt=`<svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><circle cx="880" cy="120" r="70" fill="#FFE3A8"/><path d="M0 300V170l140-90 130 80 170-120 190 150 150-100 220 130 200-70v250z" fill="#4A4FA0" opacity=".85"/><path d="M0 300V230l180-80 160 70 200-110 220 130 190-90 250 100v150z" fill="#27327F"/><path d="M0 300V260l260-60 200 50 250-70 250 60 240-40v100z" fill="#16204A"/></svg>`;
const logo=`<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect width="30" height="30" rx="8" fill="#27327F"/><circle cx="19" cy="12" r="5" fill="#F29E4C"/><path d="M3 26l8-10 5 6 4-4 7 8z" fill="#fff"/></svg>`;
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),2400)}
function go(v){S.view=v;S.err="";render();scrollTo(0,0)}
