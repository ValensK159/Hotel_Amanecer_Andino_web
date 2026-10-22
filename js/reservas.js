/* reservas.js
   Validación y creación de reservas (RF-02). */
function confirmRes(){const v=id=>document.getElementById(id).value.trim();const r=room(S.roomId);
const name=v("rn"),contact=v("rc"),a=v("rin"),b=v("rout"),g=+v("rg");S.in=a;S.out=b;S.guests=g;
const fail=m=>{document.getElementById("err").textContent=m};
if(name.length<3)return fail("Escribe tu nombre completo.");
if(!(/^\S+@\S+\.\S+$/.test(contact)||contact.replace(/\D/g,"").length>=7))return fail("Ingresa un correo válido o un teléfono de al menos 7 dígitos.");
if(!a||!b||nights(a,b)<1)return fail("La fecha de salida debe ser posterior a la de entrada.");
if(a<iso(new Date()))return fail("La fecha de entrada no puede ser anterior a hoy.");
if(free(r)<1)return fail("Esa habitación ya no está disponible en las fechas elegidas.");
if(db.res.some(x=>ACTIVE.includes(x.status)&&x.contact===contact&&x.roomId===r.id&&x.in===a&&x.out===b))return fail("Ya existe una reserva con estos datos. Consúltala en Mi reserva.");
const c=calc(r.id,a,b,S.svcs),code="RES-"+String(db.seq++).padStart(4,"0");
db.res.push({code,name,contact,roomId:r.id,in:a,out:b,guests:g,obs:v("ro"),svcs:S.svcs.slice(),total:c.total,status:"Confirmada"});save();S.last=code;S.svcs=[];go("done")}

