document.addEventListener('DOMContentLoaded',()=>{
  const navToggle=document.querySelector('.nav-toggle');
  const navMenu=document.getElementById('nav-menu');
  if(navToggle&&navMenu){
    navToggle.addEventListener('click',()=>{
      const isOpen=navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded',String(isOpen));
    });
    navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }));
  }

  const yearEl=document.getElementById('year');
  if(yearEl){yearEl.textContent=new Date().getFullYear();}

  const io=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.16,rootMargin:'0px 0px -40px'});
  document.querySelectorAll('.reveal-up').forEach((el)=>io.observe(el));

  // Glow cursor follower (respect reduced motion)
  const glow=document.querySelector('.cursor-glow');
  const motionOk=window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if(glow&&motionOk){
    window.addEventListener('pointermove',(e)=>{
      glow.style.left=e.clientX+'px';
      glow.style.top=e.clientY+'px';
    });
  }

  // Subtle parallax on hero image
  const heroImg=document.querySelector('.hero-card img');
  if(heroImg&&motionOk){
    const onMove=(e)=>{
      const rect=heroImg.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-0.5;
      const y=(e.clientY-rect.top)/rect.height-0.5;
      heroImg.style.transform=`scale(1.05) translate(${x*6}px, ${y*6}px)`;
    };
    const onLeave=()=>{heroImg.style.transform='';};
    heroImg.addEventListener('pointermove',onMove);
    heroImg.addEventListener('pointerleave',onLeave);
  }
});
