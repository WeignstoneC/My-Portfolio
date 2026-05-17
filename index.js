/* =====================================================
   Weignstone Churchil — Portfolio JavaScript
   index.js
===================================================== */

// ─────────────────────────────────────────
// 1. MATRIX RAIN
// ─────────────────────────────────────────
(function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  let W, H, cols, drops;

  const chars =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / 16);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, W, H);

    ctx.font = '14px "Share Tech Mono", monospace';

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 16;

      // Bright head
      ctx.fillStyle = '#ffffff';
      ctx.fillText(char, x, y * 16);

      // Green trail
      ctx.fillStyle = '#00ff41';
      const trailChar = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(trailChar, x, (y - 1) * 16);

      // Dim trail
      ctx.fillStyle = '#005c18';
      const dimChar = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(dimChar, x, (y - 2) * 16);

      if (y * 16 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 45);
})();


// ─────────────────────────────────────────
// 2. TYPED TEXT EFFECT
// ─────────────────────────────────────────
(function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Software Engineer',
    'Web Developer',
    'Front-End Enthusiast',
    'React Developer',
    'Problem Solver'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseCounter = 0;

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
    }

    setTimeout(type, deleting ? 55 : 90);
  }

  setTimeout(type, 1200);
})();


// ─────────────────────────────────────────
// 3. ANIMATED COUNTERS
// ─────────────────────────────────────────
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 50);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
})();


// ─────────────────────────────────────────
// 4. SKILL BAR ANIMATION
// ─────────────────────────────────────────
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const width = bar.dataset.width || '0%';
      // Small delay for staggered effect
      const card = bar.closest('.skill-card');
      const idx = Array.from(document.querySelectorAll('.skill-card')).indexOf(card);
      setTimeout(() => {
        bar.style.width = width;
      }, idx * 120);
      observer.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
})();


// ─────────────────────────────────────────
// 5. SCROLL REVEAL
// ─────────────────────────────────────────
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.skill-card, .about-text, .about-badge, .contact-info, .stat, .terminal-box'
  );

  // Initial hidden state
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const idx = Array.from(targets).indexOf(el);
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, (idx % 5) * 100);
      observer.unobserve(el);
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
})();


// ─────────────────────────────────────────
// 6. NAVBAR ACTIVE STATE / SCROLL SHRINK
// ─────────────────────────────────────────
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Shrink nav on scroll
    if (window.scrollY > 60) {
      navbar.style.padding = '0.7rem 5%';
      navbar.style.background = 'rgba(0,0,0,0.95)';
    } else {
      navbar.style.padding = '1.2rem 5%';
      navbar.style.background = 'rgba(0,0,0,0.85)';
    }

    // Active section highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--green)'
        : 'var(--text-dim)';
    });
  });
})();


// ─────────────────────────────────────────
// 7. SKILL CARD GLITCH ON HOVER
// ─────────────────────────────────────────
(function initCardHover() {
  const cards = document.querySelectorAll('.skill-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const name = card.querySelector('.skill-name');
      if (!name) return;
      name.style.textShadow = '0 0 15px var(--green), 2px 0 red, -2px 0 cyan';
      setTimeout(() => {
        name.style.textShadow = '0 0 10px rgba(255,255,255,0.3)';
      }, 300);
    });
  });
})();


// ─────────────────────────────────────────
// 8. RANDOM FLICKER ON GLOW ELEMENTS
// ─────────────────────────────────────────
(function initFlicker() {
  const glowEls = document.querySelectorAll('.nav-logo, .badge-initials');

  function flicker(el) {
    const delay = Math.random() * 8000 + 3000;
    setTimeout(() => {
      el.style.opacity = '0.5';
      setTimeout(() => { el.style.opacity = '1'; }, 60);
      setTimeout(() => { el.style.opacity = '0.7'; }, 120);
      setTimeout(() => { el.style.opacity = '1'; }, 200);
      flicker(el);
    }, delay);
  }

  glowEls.forEach(flicker);
})();


// ─────────────────────────────────────────
// 9. CUSTOM CURSOR TRAIL
// ─────────────────────────────────────────
(function initCursorTrail() {
  const trail = [];
  const TRAIL_LEN = 8;

  for (let i = 0; i < TRAIL_LEN; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed; width: ${6 - i * 0.5}px; height: ${6 - i * 0.5}px;
      border-radius: 50%; pointer-events: none; z-index: 9999;
      background: #00ff41; opacity: ${(1 - i / TRAIL_LEN) * 0.6};
      box-shadow: 0 0 ${4 + i}px #00ff41;
      transition: transform 0.05s; mix-blend-mode: screen;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let px = mouseX, py = mouseY;
    trail.forEach((t, i) => {
      t.x += (px - t.x) * 0.35;
      t.y += (py - t.y) * 0.35;
      t.el.style.left = (t.x - 3) + 'px';
      t.el.style.top = (t.y - 3) + 'px';
      px = t.x; py = t.y;
    });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
})();


// ─────────────────────────────────────────
// 10. BOOT SEQUENCE OVERLAY
// ─────────────────────────────────────────
(function initBootSequence() {
  const overlay = document.createElement('div');
  overlay.id = 'boot-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; background: #000; z-index: 9998;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: 'Share Tech Mono', monospace; color: #00ff41;
    font-size: clamp(0.75rem, 2vw, 1rem);
    transition: opacity 0.8s ease;
  `;

  const lines = [
    'INITIALIZING SYSTEM...',
    'LOADING PORTFOLIO v2.0...',
    'CONNECTING TO MATRIX...',
    '&gt; WEIGNSTONE CHURCHIL :: MKU',
    'BOOT COMPLETE. WELCOME.'
  ];

  const lineContainer = document.createElement('div');
  lineContainer.style.cssText = 'width: 360px; max-width: 90vw;';
  overlay.appendChild(lineContainer);

  const bar = document.createElement('div');
  bar.style.cssText = `
    width: 360px; max-width: 90vw; height: 2px; background: #00ff4130;
    margin-top: 1.5rem; position: relative; overflow: hidden;
  `;
  const barFill = document.createElement('div');
  barFill.style.cssText = `
    position: absolute; left: 0; top: 0; height: 100%;
    background: #00ff41; width: 0; transition: width 0.4s ease;
    box-shadow: 0 0 8px #00ff41;
  `;
  bar.appendChild(barFill);
  overlay.appendChild(bar);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  let idx = 0;
  function showLine() {
    if (idx >= lines.length) {
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = '';
        }, 800);
      }, 400);
      return;
    }

    const p = document.createElement('p');
    p.innerHTML = lines[idx];
    p.style.cssText = `margin: 0.3rem 0; opacity: 0; transition: opacity 0.3s;`;
    lineContainer.appendChild(p);
    requestAnimationFrame(() => { p.style.opacity = '1'; });

    barFill.style.width = ((idx + 1) / lines.length * 100) + '%';

    idx++;
    setTimeout(showLine, 420);
  }

  setTimeout(showLine, 300);
})();
