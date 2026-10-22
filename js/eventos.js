/* eventos.js
   Manejo de clics y cambios (login, registro, estados, tarifas) e inicio de la app. */
document.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;const D=t.dataset;
if(D.go)return go(D.go);
if(D.pick){S.roomId=D.pick;S.svcs=[];return go("reserve")}
if(D.tab){S.tab=D.tab;return render()}
if(D.ci)return modal(D.ci,"ci");if(D.co)return modal(D.co,"co");
if(D.cancel){const r=db.res.find(x=>x.code===D.cancel);r.status="Cancelada";save();toast("Reserva cancelada");return render()}
if(D.q){const q=db.reqs.find(x=>x.id==D.q);q.status=q.status==="Pendiente"?"Atendida":"Pendiente";save();return render()}
if(D.del)return ask("¿Eliminar la reserva #"+D.del+"? Esta acción no se puede deshacer.",()=>{db.res=db.res.filter(x=>x.code!==D.del);save();toast("Reserva eliminada");render()});
if(D.edst!==undefined)return staffModal(+D.edst);
if(D.delst){const s=db.staff.find(x=>x.id==D.delst);if(s.role==="admin"&&admins()<=1)return toast("Debe quedar al menos un administrador");return ask("¿Eliminar a "+s.name+" del personal?",()=>{db.staff=db.staff.filter(x=>x.id!==s.id);save();toast("Personal eliminado");render()})}
const a=D.act;if(!a)return;
if(a==="confirm")confirmRes();
if(a==="open-mine"){S.lookup=S.last;go("mine")}
if(a==="lookup"){S.lookup=document.getElementById("lc").value.trim().toUpperCase().replace(/^#/,"");render()}
if(a==="svcreq"){const r=db.res.find(x=>x.code===S.lookup),d=document.getElementById("qd").value.trim();
if(d.length<3){document.getElementById("err").textContent="Indica el detalle de tu solicitud.";return}
db.reqs.push({id:db.reqSeq++,res:r.code,name:SERVICES.find(s=>s.id===document.getElementById("qs").value).name,detail:d,status:"Pendiente"});save();toast("Solicitud enviada");render()}
if(a==="login"){const u=document.getElementById("su").value,p=document.getElementById("sp").value;
const m=db.staff.find(x=>x.user===u.trim().toLowerCase()&&x.pass===p);if(m){S.staff=m.id;S.tab="res";S.err="";render()}else document.getElementById("err").textContent="Usuario o contraseña incorrectos."}
if(a==="showreg"){S.reg=true;render()}
if(a==="hidereg"){S.reg=false;render()}
if(a==="register"){const g=i=>document.getElementById(i).value.trim(),name=g("rn2"),user=g("ru").toLowerCase(),p1=document.getElementById("rp1").value,p2=document.getElementById("rp2").value,role=g("rr"),code=g("rcode"),f=m=>{document.getElementById("err").textContent=m};
if(name.length<3)return f("Escribe tu nombre completo.");
if(!/^[a-z0-9._-]{3,}$/.test(user))return f("El usuario necesita 3 o más letras o números, sin espacios.");
if(db.staff.some(x=>x.user===user))return f("Ese usuario ya existe. Elige otro.");
if(p1.length<6)return f("La contraseña debe tener al menos 6 caracteres.");
if(p1!==p2)return f("Las contraseñas no coinciden.");
if(code!==db.codes[role])return f("El código de autorización no es correcto para este rol.");
const id=db.staffSeq++;db.staff.push({id,name,user,pass:p1,role});save();S.staff=id;S.reg=false;S.tab="res";toast("Cuenta creada");render()}
if(a==="logout"){S.staff=null;S.reg=false;render()}});

document.addEventListener("change",e=>{const t=e.target,D=t.dataset;
if(t.id==="fin"){S.in=t.value;if(S.out<=S.in){const d=new Date(S.in);d.setDate(d.getDate()+1);S.out=iso(d)}render()}
else if(t.id==="fout"){S.out=t.value;render()}else if(t.id==="fgu"){S.guests=+t.value;render()}
else if(t.id==="sf"){S.filter=t.value;render()}
else if(D.svc){const i=S.svcs.indexOf(D.svc);i<0?S.svcs.push(D.svc):S.svcs.splice(i,1);
const keep=["rn","rc","rin","rout","rg","ro"].map(id=>document.getElementById(id).value);render();["rn","rc","rin","rout","rg","ro"].forEach((id,i)=>document.getElementById(id).value=keep[i])}
else if(D.cd){if(t.value.trim().length>=6){db.codes[D.cd]=t.value.trim();save();toast("Código guardado")}else{toast("El código necesita 6 o más caracteres");render()}}
else if(D.st){const r=db.res.find(x=>x.code===D.st);r.status=t.value;save();toast("Estado actualizado");render()}
else if(D.rn){const r=room(D.rn);if(t.value.trim()){r.name=t.value.trim();save();toast("Cambios guardados")}}
else if(D.rp||D.ru||D.rc){const r=room(D.rp||D.ru||D.rc),v=Math.max(0,+t.value||0);if(D.rp)r.price=v;if(D.ru)r.units=v;if(D.rc)r.cap=Math.max(1,v);save();toast("Cambios guardados")}});
render();
