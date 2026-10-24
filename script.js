/* NKTechVision agency interactions. Replace the demo number below with your full WhatsApp number including country code, digits only. */
const WHATSAPP_NUMBER = "919322282466";
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const langToggle = document.getElementById('langToggle');
const toast = document.getElementById('toast');
let language = 'en';
menuToggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded','false'); }));
function showToast(message){ toast.textContent = message; toast.classList.add('show'); window.setTimeout(()=>toast.classList.remove('show'),3000); }
function setLanguage(next){ language = next; document.documentElement.lang = next === 'mr' ? 'mr' : 'en'; document.querySelectorAll('[data-en][data-mr]').forEach(el=>{ const value=el.dataset[next]; if(value!==undefined) el.innerHTML=value; }); langToggle.innerHTML = next === 'en' ? '<strong>EN</strong> <span>/</span> मराठी' : 'EN <span>/</span> <strong>मराठी</strong>'; }
langToggle?.addEventListener('click',()=>setLanguage(language==='en'?'mr':'en'));
// Accessible lightweight scroll reveal; content remains visible when reduced motion is enabled.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){ const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12}); revealItems.forEach(el=>observer.observe(el)); } else revealItems.forEach(el=>el.classList.add('visible'));
// Subtle desktop 3D tilt; disabled on touch/coarse pointers and reduced-motion preference.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){ document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width;const y=(e.clientY-r.top)/r.height;card.style.transform=`perspective(800px) rotateX(${(0.5-y)*5}deg) rotateY(${(x-0.5)*6}deg) translateY(-2px)`});card.addEventListener('pointerleave',()=>{card.style.transform=''});}); }
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.getElementById('progress').style.width=(max>0?window.scrollY/max*100:0)+'%';},{passive:true});
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-plan]').forEach(link=>link.addEventListener('click',()=>{const select=document.getElementById('service');if(link.dataset.plan.toLowerCase().includes('one-page'))select.value='Landing page';else if(link.dataset.plan.toLowerCase().includes('business'))select.value='Business website';else select.value='Other / not sure yet';}));
document.getElementById('contactForm')?.addEventListener('submit',e=>{e.preventDefault();const form=new FormData(e.currentTarget);const name=(form.get('name')||'').toString().trim();const business=(form.get('business')||'').toString().trim();const service=(form.get('service')||'').toString();const message=(form.get('message')||'').toString().trim();if(!name||!business){showToast(language==='mr'?'कृपया नाव आणि प्रोजेक्ट भरा.':'Please enter your name and project.');return;}if(WHATSAPP_NUMBER==='919999999999'){showToast(language==='mr'?'script.js मध्ये तुमचा WhatsApp नंबर टाकून पुन्हा प्रयत्न करा.':'Setup needed: add your WhatsApp number in script.js first.');return;}const text=`Hello NKTechVision!\n\nName: ${name}\nBusiness / project: ${business}\nService: ${service}\nDetails: ${message||'Not provided'}\n\nI found you through your website.`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');});

// ---- 3D hero: rotating NKTechVision medallion with tricolor orbit rings ----
(function(){
  const cv=document.getElementById('heroCanvas');
  if(!cv||typeof THREE==='undefined'){document.body.classList.add('no3d');return;}
  let r; try{r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});}catch(e){document.body.classList.add('no3d');return;}
  r.setPixelRatio(Math.min(devicePixelRatio||1,2)); r.outputEncoding=THREE.sRGBEncoding;
  const sc=new THREE.Scene(), cam=new THREE.PerspectiveCamera(40,1,.1,100); cam.position.set(0,0,9.5);
  sc.add(new THREE.AmbientLight(0xffffff,.95));
  const key=new THREE.DirectionalLight(0xffffff,.9); key.position.set(3,4,6); sc.add(key);
  const pl=new THREE.PointLight(0xff9933,1.6,22); pl.position.set(-4,2,4); sc.add(pl);
  const pg=new THREE.PointLight(0x2ecc71,1.4,22); pg.position.set(4,-3,4); sc.add(pg);
  const tex=new THREE.TextureLoader().load(window.NK_LOGO||'logo.jpg',()=>{},undefined,()=>document.body.classList.add('no3d'));
  tex.encoding=THREE.sRGBEncoding; tex.anisotropy=8;
  const g=new THREE.Group(); sc.add(g);
  const face=new THREE.MeshStandardMaterial({map:tex,metalness:.15,roughness:.45});
  const front=new THREE.Mesh(new THREE.CircleGeometry(1.5,96),face); front.position.z=.09; g.add(front);
  const back=new THREE.Mesh(new THREE.CircleGeometry(1.5,96),face); back.rotation.y=Math.PI; back.position.z=-.09; g.add(back);
  const rim=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,.18,96,1,true),new THREE.MeshStandardMaterial({color:0xffb04d,metalness:.85,roughness:.28,side:THREE.DoubleSide}));
  rim.rotation.x=Math.PI/2; g.add(rim);
  const bz=new THREE.Mesh(new THREE.TorusGeometry(1.5,.045,24,120),new THREE.MeshStandardMaterial({color:0xffffff,metalness:.7,roughness:.25}));
  bz.position.z=.09; g.add(bz); const bz2=bz.clone(); bz2.position.z=-.09; g.add(bz2);
  const pivots=[];
  [0xff9933,0xffffff,0x1fae3a].forEach((c,i)=>{
    const o=new THREE.Group(), R=2.15+i*.4, pv=new THREE.Group();
    o.add(new THREE.Mesh(new THREE.TorusGeometry(R,.022,12,160),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.75})));
    const bead=new THREE.Mesh(new THREE.SphereGeometry(.1,24,24),new THREE.MeshBasicMaterial({color:c})); bead.position.x=R; pv.add(bead); o.add(pv);
    o.rotation.x=1.15+i*.35; o.rotation.y=.4*i-.3; g.add(o); pivots.push([pv,.55-i*.12]);
  });
  const N=150,pos=new Float32Array(N*3);
  for(let i=0;i<N*3;i+=3){const a=Math.random()*6.283,b=Math.acos(2*Math.random()-1),d=3.6+Math.random()*2.4;pos[i]=d*Math.sin(b)*Math.cos(a);pos[i+1]=d*Math.sin(b)*Math.sin(a);pos[i+2]=d*Math.cos(b);}
  const pgeo=new THREE.BufferGeometry(); pgeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const pts=new THREE.Points(pgeo,new THREE.PointsMaterial({color:0xffd9a8,size:.05,transparent:true,opacity:.8})); sc.add(pts);
  let tx=0,ty=0; addEventListener('pointermove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;},{passive:true});
  const box=cv.parentElement;
  function size(){const w=box.clientWidth||400,h=box.clientHeight||460;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
  addEventListener('resize',size); size();
  let vis=true; if('IntersectionObserver' in window) new IntersectionObserver(e=>{vis=e[0].isIntersecting;}).observe(cv);
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches; let last=0;
  g.rotation.set(-.08,.35,0);
  (function loop(ms){
    requestAnimationFrame(loop); if(!vis) return; const t=ms/1000, dt=Math.min(t-last,.05); last=t;
    if(!still){
      g.rotation.y+=((tx*1.1+Math.sin(t*.6)*.5)-g.rotation.y)*.06;
      g.rotation.x+=((ty*.6-.08)-g.rotation.x)*.06;
      g.position.y=Math.sin(t*1.2)*.08; pts.rotation.y=t*.03;
      pivots.forEach(p=>{p[0].rotation.z+=p[1]*dt*2;});
    }
    r.render(sc,cam);
  })(0);
})();
