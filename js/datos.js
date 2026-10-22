/* datos.js
   Datos iniciales, almacenamiento (localStorage) y estado de la aplicación. */
const KEY="aa_hotel_v1";
const SERVICES=[{id:"des",name:"Desayuno buffet",price:15,perDay:true},{id:"lav",name:"Lavandería",price:20,perDay:false},{id:"tra",name:"Traslado al aeropuerto",price:45,perDay:false},{id:"cun",name:"Cuna adicional",price:0,perDay:false}];
const seed=()=>({seq:246,reqSeq:1,
rooms:[
{id:"sim",name:"Habitación Simple",desc:"Una cama individual, baño privado, wifi",price:90,cap:1,units:4,t:0},
{id:"dob",name:"Habitación Doble",desc:"Dos camas o cama matrimonial, baño privado, wifi",price:130,cap:2,units:5,t:1},
{id:"fam",name:"Habitación Familiar",desc:"Capacidad para 4 personas, sala de estar",price:190,cap:4,units:3,t:2},
{id:"sui",name:"Suite Andina",desc:"Habitación superior con vista panorámica y jacuzzi",price:260,cap:3,units:2,t:3}],
res:[{code:"RES-0245",name:"María Quispe",contact:"maria@correo.pe",roomId:"dob",in:"2026-09-15",out:"2026-09-18",guests:2,obs:"Solicita cuna adicional.",svcs:["des"],total:435,status:"Confirmada"}],
reqs:[],staffSeq:3,staff:[{id:1,name:"Carlos Mendoza",user:"admin",pass:"admin123",role:"admin"},{id:2,name:"Rosa Huamán",user:"recepcion",pass:"recep123",role:"recepcion"}]});
let db;try{db=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!db||!db.rooms)db=seed();if(!db.staff){db.staff=seed().staff;db.staffSeq=3}if(!db.codes)db.codes={admin:"ADMIN-2026",recepcion:"RECEP-2026"};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const money=n=>"S/ "+Number(n).toFixed(2);
const iso=d=>d.toISOString().slice(0,10);
const addDays=n=>{const d=new Date();d.setDate(d.getDate()+n);return iso(d)};
const nights=(a,b)=>Math.round((new Date(b)-new Date(a))/864e5);
const dmy=s=>s?s.split("-").reverse().join("/"):"";
const room=id=>db.rooms.find(r=>r.id===id);
const S={view:"home",in:addDays(1),out:addDays(4),guests:2,roomId:null,svcs:[],last:"",lookup:null,staff:null,tab:"res",filter:"todas",err:""};
const ACTIVE=["Confirmada","Check-in"];
