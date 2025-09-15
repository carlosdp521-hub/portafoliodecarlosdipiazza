// ====================== DARK MODE ======================
const themeToggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.classList.add(prefersDark ? "dark-theme" : "light-theme");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// ====================== NAVBAR ======================
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
if(navToggle) navToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => navMenu.classList.remove("active")));

// ====================== SCROLL SUAVE ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.getElementById(this.getAttribute("href").substring(1));
    if(target){
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
    }
  });
});

// ====================== FADE-IN ======================
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible"); obs.unobserve(entry.target);}});
},{threshold:0.2});
fadeElements.forEach(el=>observer.observe(el));

// ====================== EMAILJS ======================
document.querySelector(".contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  emailjs.sendForm("TU_SERVICE_ID", "TU_TEMPLATE_ID", this)
    .then(()=>{alert("✅ Mensaje enviado!"); this.reset();}, (err)=>{alert("❌ Error: "+JSON.stringify(err));});
});

// ====================== CARRUSEL CONTINUO CON HOVER Y TOUCH ======================
const galleryGrid = document.getElementById("gallery-grid");
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const prevBtn = document.querySelector(".gallery-prev");
const nextBtn = document.querySelector(".gallery-next");

let itemWidth = galleryItems[0].offsetWidth + 20;
galleryItems.forEach(item=>galleryGrid.appendChild(item.cloneNode(true)));
let totalItems = galleryGrid.children.length;
let posX = 0;
let speed = 1, normalSpeed=1, slowSpeed=0.2;

// Animación
function animateGallery(){
  posX += speed;
  if(posX >= (totalItems/2)*itemWidth) posX=0;
  galleryGrid.style.transform = `translateX(-${posX}px)`;
  requestAnimationFrame(animateGallery);
}
requestAnimationFrame(animateGallery);

// Botones
prevBtn.addEventListener("click", ()=>{ posX -= itemWidth; if(posX<0) posX=((totalItems/2)-1)*itemWidth; });
nextBtn.addEventListener("click", ()=>{ posX += itemWidth; if(posX>=(totalItems/2)*itemWidth) posX=0; });

// Hover slowdown
const galleryContainer = document.querySelector(".gallery-container");
galleryContainer.addEventListener("mouseenter", ()=>speed=slowSpeed);
galleryContainer.addEventListener("mouseleave", ()=>speed=normalSpeed);

// Touch support
let isDragging=false, startX=0, scrollStart=0;
galleryGrid.addEventListener("touchstart",(e)=>{isDragging=true; startX=e.touches[0].clientX; scrollStart=posX;});
galleryGrid.addEventListener("touchmove",(e)=>{if(!isDragging)return; const deltaX=startX - e.touches[0].clientX; posX=scrollStart + deltaX; if(posX<0) posX=0; if(posX>=(totalItems/2)*itemWidth) posX=0; galleryGrid.style.transform=`translateX(-${posX}px)`;});
galleryGrid.addEventListener("touchend",()=>{isDragging=false;});

// Ajuste responsive
window.addEventListener("resize",()=>{ itemWidth=galleryItems[0].offsetWidth + 20; });
