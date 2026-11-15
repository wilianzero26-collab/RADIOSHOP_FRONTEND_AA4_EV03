document.addEventListener("DOMContentLoaded",()=> {
const play=document.getElementById("btnPlay"), vol=document.getElementById("volumen");
const eq=document.getElementById("ecualizador"), tipo=document.getElementById("tipoEcualizador");
const bars=document.querySelectorAll(".barras span"), follow=document.getElementById("btnSeguir");
const vote=document.getElementById("btnVotar"), result=document.getElementById("resultadoEncuesta");
const form=document.getElementById("formChat"), input=document.getElementById("mensajeInput"), messages=document.getElementById("mensajes");
const audio=new Audio(); audio.crossOrigin="anonymous"; audio.preload="none";
const RADIO_URL=""; // Pega aquí la URL real de tu emisora.
let playing=false, following=false, analyser=null, source=null, ctx=null, raf=null;

audio.volume=vol.value/100;
function button(){play.textContent=playing?"❚❚":"▶"}
function demo(){
 if(!playing)return;
 bars.forEach((b,i)=>b.style.height=(15+Math.random()*80)+"%");
 raf=requestAnimationFrame(demo);
}
play.onclick=async()=>{
 if(!RADIO_URL){
   playing=!playing; button();
   document.getElementById("cancionActual").textContent=playing?"Modo demostración":"Selecciona una transmisión";
   document.getElementById("artistaActual").textContent=playing?"Configura la URL de tu emisora":"RADIOSHOP LIVE";
   if(playing)demo(); else cancelAnimationFrame(raf);
   return;
 }
 try{
   if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)(); analyser=ctx.createAnalyser(); analyser.fftSize=64; source=ctx.createMediaElementSource(audio); source.connect(analyser); analyser.connect(ctx.destination)}
   if(ctx.state==="suspended")await ctx.resume();
   if(audio.paused){await audio.play();playing=true}else{audio.pause();playing=false}
   button(); draw();
 }catch(e){alert("No se pudo iniciar la transmisión. Revisa la URL del stream.");}
};
function draw(){
 if(!analyser||!playing)return;
 const data=new Uint8Array(analyser.frequencyBinCount); analyser.getByteFrequencyData(data);
 bars.forEach((b,i)=>b.style.height=Math.max(5,data[i%data.length]/255*100)+"%");
 requestAnimationFrame(draw);
}
vol.oninput=()=>audio.volume=vol.value/100;
tipo.onchange=()=>{eq.className="ecualizador";if(tipo.value!=="clasico")eq.classList.add(tipo.value)};
follow.onclick=()=>{following=!following;follow.textContent=following?"♥ Siguiendo":"♡ Seguir emisora"};

const votes={Reguetón:0,Electrónica:0,Rock:0,Salsa:0};
vote.onclick=()=>{
 const selected=document.querySelector('input[name="encuesta"]:checked');
 if(!selected){result.textContent="Selecciona una opción antes de votar.";return}
 votes[selected.value]++; const total=Object.values(votes).reduce((a,b)=>a+b,0); result.innerHTML="";
 Object.entries(votes).forEach(([name,n])=>{const p=Math.round(n/total*100);result.innerHTML+=`<div style="margin-top:8px;display:flex;justify-content:space-between"><span>${name}</span><span>${p}%</span></div><div style="height:5px;background:#292936;border-radius:5px;overflow:hidden"><div style="width:${p}%;height:100%;background:linear-gradient(90deg,#9b4dff,#ff3cac)"></div></div>`});
};
form.onsubmit=e=>{
 e.preventDefault();const text=input.value.trim();if(!text)return;
 const m=document.createElement("div");m.className="mensaje";m.innerHTML='<div class="avatar">TÚ</div><div><strong>Tu usuario</strong><p></p></div>';
 m.querySelector("p").textContent=text;messages.appendChild(m);messages.scrollTop=messages.scrollHeight;input.value="";
};
document.getElementById("btnAnterior").onclick=()=>document.getElementById("cancionActual").textContent="Canción anterior";
document.getElementById("btnSiguiente").onclick=()=>document.getElementById("cancionActual").textContent="Siguiente canción";
document.getElementById("videoDJ").addEventListener("loadeddata",e=>e.target.parentElement.classList.add("tiene-video"));
button();
});