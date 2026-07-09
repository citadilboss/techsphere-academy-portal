// TechSphere University - Interactions

// Loader
window.addEventListener('load', () => {
  const l = document.getElementById('loader');
  if (l) setTimeout(() => l.classList.add('hidden'), 350);
});

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks?.classList.remove('open')));

// Sticky shadow
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 10);
  document.querySelector('.scroll-top')?.classList.toggle('visible', window.scrollY > 400);
});

// Scroll to top
document.querySelector('.scroll-top')?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// Dark mode
const themeBtn = document.getElementById('themeToggle');
const setTheme = t => { document.documentElement.setAttribute('data-theme', t); localStorage.setItem('ts-theme', t); if(themeBtn) themeBtn.innerHTML = t==='dark'?'☀️':'🌙'; };
setTheme(localStorage.getItem('ts-theme') || 'light');
themeBtn?.addEventListener('click', () => setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur.toLocaleString() + suffix;
    }, 20);
    cio.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => cio.observe(c));

// Ripple
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = document.createElement('span');
    const size = Math.max(this.offsetWidth, this.offsetHeight);
    r.className = 'ripple';
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - this.getBoundingClientRect().left - size/2) + 'px';
    r.style.top = (e.clientY - this.getBoundingClientRect().top - size/2) + 'px';
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
});

// Toast helper
function toast(msg){
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}

// Forms
document.querySelectorAll('form[data-demo]').forEach(f => {
  f.addEventListener('submit', e => { e.preventDefault(); toast(f.dataset.demo || 'Submitted (demo).'); f.reset(); });
});
