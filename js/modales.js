/* modales.js
   Ventanas emergentes: check-in/check-out, confirmaciones y registro de personal (admin). */
function nowLocal(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)}
function modal(code,kind){const r=db.res.find(x=>x.code===code),ci=kind==="ci";const d=document.getElementById("dlg");
d.innerHTML=`<h3>${ci?"Registrar check-in":"Registrar check-out"}</h3><div class="fld"><label>Reserva<input value="#${r.code}" readonly></label><label>Huésped<input value="${esc(r.name)}" readonly></label>
<label>Documento de identidad<input id="md" value="${esc(r.doc||"")}" ${ci?"":"readonly"}></label><label>Fecha y hora<input type="datetime-local" id="mt" value="${nowLocal()}"></label><label>Observaciones<textarea id="mo" rows="2">${esc(r.obs||"")}</textarea></label></div>
<p class="err" id="merr"></p><div class="row"><button class="btn" id="mok">Confirmar</button><button class="btn ghost" id="mx">Cancelar</button></div>`;
d.showModal();document.getElementById("mx").onclick=()=>d.close();
document.getElementById("mok").onclick=()=>{const doc=document.getElementById("md").value.trim();if(ci&&doc.length<6){document.getElementById("merr").textContent="Ingresa un documento de identidad válido (mínimo 6 caracteres).";return}
const t=document.getElementById("mt").value;r.obs=document.getElementById("mo").value;
const who=(db.staff.find(x=>x.id===S.staff)||{}).name;if(ci){r.doc=doc;r.cin=t;r.cinBy=who;r.status="Check-in"}else{r.cout=t;r.coutBy=who;r.status="Check-out"}save();d.close();toast(ci?"Check-in registrado":"Check-out registrado");render()}}

function ask(msg,fn){const d=document.getElementById("dlg");d.innerHTML=`<h3>Confirmar acción</h3><p class="muted">${esc(msg)}</p><div class="row"><button class="btn bad" id="ay">Sí, continuar</button><button class="btn ghost" id="an">Cancelar</button></div>`;d.showModal();document.getElementById("an").onclick=()=>d.close();document.getElementById("ay").onclick=()=>{d.close();fn()}}
const admins=()=>db.staff.filter(s=>s.role==="admin").length;
function staffModal(id){const s=id?db.staff.find(x=>x.id===id):{name:"",user:"",pass:"",role:"recepcion"};const d=document.getElementById("dlg");
d.innerHTML=`<h3>${id?"Editar personal":"Registrar personal"}</h3><div class="fld"><label>Nombre completo<input id="sn" value="${esc(s.name)}"></label><label>Usuario<input id="su2" value="${esc(s.user)}" autocapitalize="none"></label><label>Contraseña (mínimo 6 caracteres)<input id="sp2" value="${esc(s.pass)}"></label><label>Rol<select id="sr"><option value="recepcion" ${s.role==="recepcion"?"selected":""}>Recepción</option><option value="admin" ${s.role==="admin"?"selected":""}>Administrador</option></select></label></div><p class="err" id="merr"></p><div class="row"><button class="btn" id="mok">Guardar</button><button class="btn ghost" id="mx">Cancelar</button></div>`;
d.showModal();document.getElementById("mx").onclick=()=>d.close();
document.getElementById("mok").onclick=()=>{const g=i=>document.getElementById(i).value.trim(),name=g("sn"),user=g("su2").toLowerCase(),pass=g("sp2"),role=g("sr"),f=m=>{document.getElementById("merr").textContent=m};
if(name.length<3)return f("Escribe el nombre completo.");if(!/^[a-z0-9._-]{3,}$/.test(user))return f("El usuario necesita 3 o más letras o números, sin espacios.");
if(pass.length<6)return f("La contraseña debe tener al menos 6 caracteres.");
if(db.staff.some(x=>x.user===user&&x.id!==id))return f("Ese usuario ya existe. Elige otro.");
if(id&&s.role==="admin"&&role!=="admin"&&admins()<=1)return f("Debe quedar al menos un administrador.");
if(id)Object.assign(s,{name,user,pass,role});else db.staff.push({id:db.staffSeq++,name,user,pass,role});
save();d.close();toast("Personal guardado");render()}}
