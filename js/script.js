// NAVBAR TOGGLE
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
if(navToggle){
  navToggle.addEventListener("click",()=>{ navMenu.classList.toggle("active"); });
}
document.querySelectorAll(".nav-link").forEach(link=>{
  link.addEventListener("click",()=>{ navMenu.classList.remove("active"); });
});

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",function(e){
    const target=document.getElementById(this.getAttribute("href").substring(1));
    if(target){ e.preventDefault(); window.scrollTo({ top:target.offsetTop-60, behavior:"smooth" }); }
  });
});

// ANIMACIONES SCROLL
const fadeElements=document.querySelectorAll(".fade-in");
const appearOnScroll=new IntersectionObserver((entries,observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target);}
  });
},{ threshold:0.2 });
fadeElements.forEach(el=>appearOnScroll.observe(el));

// EMAILJS
document.querySelector(".contact-form").addEventListener("submit",function(e){
  e.preventDefault();
  emailjs.sendForm("TU_SERVICE_ID","TU_TEMPLATE_ID",this)
  .then(()=>{ alert("✅ Mensaje enviado con éxito!"); this.reset(); },
  (error)=>{ alert("❌ Error al enviar: "+JSON.stringify(error)); });
});

// MODO OSCURO
const themeBtn=document.getElementById("theme-toggle");
const prefersDarkScheme=window.matchMedia("(prefers-color-scheme: dark)");
function applyTheme(theme){
  document.body.classList.remove("dark-theme","light-theme");
  document.body.classList.add(theme);
}
applyTheme(prefersDarkScheme.matches?"dark-theme":"light-theme");
themeBtn.addEventListener("click",()=>{
  if(document.body.classList.contains("dark-theme")) applyTheme("light-theme");
  else applyTheme("dark-theme");
});
