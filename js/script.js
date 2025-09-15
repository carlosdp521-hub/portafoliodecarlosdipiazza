const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle?.addEventListener('click', ()=>navMenu.classList.toggle('active'));

document.querySelectorAll('.fade-in').forEach(el=>{
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  },{threshold:0.2});
  observer.observe(el);
});

document.getElementById('theme-toggle')?.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-theme');
});

document.querySelector('.contact-form')?.addEventListener('submit', e=>{
  e.preventDefault();
  alert('✅ Mensaje enviado (simulado)');
  e.target.reset();
});

const galleryGrid = document.querySelector('.gallery-grid');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');
let index=0;
const items = document.querySelectorAll('.gallery-item');
const total = items.length;

function showIndex(i){
  galleryGrid.style.transform = `translateX(-${i*270}px)`;
}

nextBtn?.addEventListener('click', ()=>{index=(index+1)%total; showIndex(index);});
prevBtn?.addEventListener('click', ()=>{index=(index-1+total)%total; showIndex(index);});
setInterval(()=>{index=(index+1)%total; showIndex(index);},5000);
