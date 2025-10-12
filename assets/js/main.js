// Main JS: toggles, simple scroll reveal, small helpers
document.addEventListener('DOMContentLoaded', function(){
  // Year in footer
  const yearEls = document.querySelectorAll('#year, #year2, #year3, #year4, #year5');
  yearEls.forEach(e => { if(e) e.textContent = new Date().getFullYear(); });

  // Mobile nav
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('navToggle');
  if(toggle){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
      // simple inline styles for mobile reveal
      if(nav.classList.contains('open')){
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '8px';
        nav.style.padding = '1rem';
      } else {
        nav.style.display = '';
      }
    });
  }

  // Scroll reveal — lightweight
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealOnScroll = () => {
    const offset = window.innerHeight * 0.9;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < offset){
        el.classList.add('revealed');
      }
    });
  };
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Smooth link scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const id = this.getAttribute('href'); if(id.length>1){
        e.preventDefault();
        const target = document.querySelector(id);
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});

document.getElementById('year2').textContent = new Date().getFullYear();

  const track = document.getElementById("track");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");

  next.addEventListener("click", () => {
    track.scrollBy({ left: 350, behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -350, behavior: "smooth" });
  });