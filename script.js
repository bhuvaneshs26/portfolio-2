/* =========================
   PARTICLE BACKGROUND
   ========================= */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const COLORS = ['#22d3ee', '#a855f7', '#ec4899', '#06b6d4', '#8b5cf6'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 15000));
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.6 + 0.3,
    tw: Math.random() * 0.02 + 0.005,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      p.alpha += p.tw;
      if (p.alpha > 0.9 || p.alpha < 0.2) p.tw = -p.tw;

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* =========================
   NAVBAR (scroll + active link + mobile menu)
   ========================= */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');

  function onScroll() {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    let activeId = sections[0];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        activeId = id;
        break;
      }
    }
    links.forEach((l) => {
      const href = l.getAttribute('href').replace('#', '');
      l.classList.toggle('active', href === activeId);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });
  links.forEach((l) => l.addEventListener('click', () => navLinksEl.classList.remove('open')));
})();

/* =========================
   TYPING ANIMATION (Hero)
   ========================= */
(function initTyping() {
  const el = document.getElementById('typing');
  if (!el) return;
  const words = ['Frontend Developer', 'JavaScript Developer', 'React Enthusiast', 'UI/UX Lover'];
  let idx = 0, text = '', deleting = false;

  function tick() {
    const current = words[idx % words.length];
    if (!deleting && text === current) {
      setTimeout(() => { deleting = true; tick(); }, 1400);
      return;
    }
    if (deleting && text === '') {
      deleting = false;
      idx++;
      setTimeout(tick, 200);
      return;
    }
    text = deleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1);
    el.textContent = text;
    setTimeout(tick, deleting ? 50 : 90);
  }
  tick();
})();

/* =========================
   SKILL HOVER GLOW (set CSS var)
   ========================= */
(function initSkillGlow() {
  document.querySelectorAll('.skill').forEach((s) => {
    const c = s.getAttribute('data-color');
    if (c) s.style.setProperty('--c', c + '22'); // ~13% alpha
  });
})();

/* =========================
   CONTACT FORM (frontend-only)
   ========================= */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  if (!form || !toast) return;

  function showToast(title, msg) {
    toast.innerHTML = '<strong>' + title + '</strong>' + msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    if (!name || !email || !message) {
      showToast('Missing fields', 'Please fill in all fields.');
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Sending...</span>';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = original;
      showToast('Message sent!', "Thanks for reaching out. I'll get back to you soon.");
      form.reset();
    }, 900);
  });
})();

/* =========================
   FOOTER YEAR
   ========================= */
document.getElementById('year').textContent = new Date().getFullYear();
