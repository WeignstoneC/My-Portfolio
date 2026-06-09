const { useEffect, useState, useRef } = React;

const phrases = [
  'Software Engineer',
  'Web Developer',
  'Front-End Enthusiast',
  'React Developer',
  'Problem Solver'
];

const skillsData = [
  {
    lang: 'HTML',
    name: 'HTML',
    tag: 'Markup',
    desc: 'The backbone of the web. HTML (HyperText Markup Language) defines the structure and content of web pages. It provides semantic elements that organize text, images, links, and media into meaningful, accessible documents that browsers render.',
    width: '90%',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    )
  },
  {
    lang: 'CSS',
    name: 'CSS',
    tag: 'Styling',
    desc: 'The artist\'s brush of the web. CSS (Cascading Style Sheets) controls the visual presentation — colors, layouts, animations, and responsive design. It transforms raw HTML into stunning, polished interfaces that captivate and engage users across all devices.',
    width: '85%',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
      </svg>
    )
  },
  {
    lang: 'JS',
    name: 'JavaScript',
    tag: 'Language',
    desc: 'The engine that powers modern web interactivity. JavaScript enables dynamic content, real-time updates, and complex logic in browsers. From DOM manipulation to async APIs and event-driven programming, JS makes web applications feel alive and responsive.',
    width: '80%',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    )
  },
  {
    lang: 'React',
    name: 'React',
    tag: 'Framework',
    desc: 'A powerhouse JavaScript library by Meta for building component-based UIs. React\'s virtual DOM and declarative approach enable the creation of scalable, high-performance single-page applications. Its ecosystem and hooks model revolutionize how developers think about UI state.',
    width: '75%',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 15.5a3.5 3.5 0 1 0-3.5-3.5 3.505 3.505 0 0 0 3.5 3.5z" />
        <path d="M18.223 6.511c-.43-.833-1.113-1.25-1.965-1.25-.89 0-1.902.536-2.98 1.61-1.076 1.075-2.1 2.235-2.812 3.1-.71-.87-1.737-2.03-2.812-3.106-1.078-1.076-2.09-1.61-2.98-1.61-.85 0-1.536.418-1.967 1.252-.43.833-.42 1.92.03 3.137.493 1.357 1.466 2.874 2.77 4.278 1.71 1.71 3.8 2.93 5.96 2.93 2.14 0 4.23-1.22 5.94-2.93 1.307-1.304 2.28-2.92 2.77-4.28.45-1.218.46-2.305.03-3.138z" />
      </svg>
    )
  },
  {
    lang: 'Python',
    name: 'Python',
    tag: 'Language',
    desc: 'The Swiss Army knife of programming. Python\'s clean syntax and vast libraries make it ideal for web back-ends, data science, automation, and AI/ML development. With frameworks like Django and Flask, Python powers robust server-side applications with elegant, readable code.',
    width: '70%',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
      </svg>
    )
  }
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">&lt;WC /&gt;</div>
      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-status">
        <span className="status-dot"></span>
        <span className="status-text">ONLINE</span>
      </div>
    </nav>
  );
}

function Hero() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => setCursorOn(state => !state), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = deleting ? 55 : 90;

    if (!deleting && text === currentPhrase) {
      const pause = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(pause);
    }

    if (deleting && text === '') {
      const next = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((idx) => (idx + 1) % phrases.length);
      }, 400);
      return () => clearTimeout(next);
    }

    const nextText = deleting
      ? currentPhrase.slice(0, text.length - 1)
      : currentPhrase.slice(0, text.length + 1);

    const timer = setTimeout(() => setText(nextText), timeout);
    return () => clearTimeout(timer);
  }, [text, deleting, phraseIndex]);

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-tag">// INITIALIZING PORTFOLIO...</div>
        <h1 className="hero-name">
          <span className="glitch" data-text="Weignstone">Weignstone</span>
          <span className="glitch surname" data-text="Churchil">Churchil</span>
        </h1>
        <div className="hero-title">
          <span className="typed-text" id="typed">{text}</span>
          <span className="cursor">{cursorOn ? '_' : ' '}</span>
        </div>
        <p className="hero-sub">Student @ <span className="highlight">Mount Kenya University</span></p>
        <div className="hero-cta">
          <a href="#skills" className="btn-primary">View Skills <span>&gt;&gt;</span></a>
          <a href="#contact" className="btn-secondary">Contact Me</a>
        </div>
      </div>

      <div className="hero-graphic">
        <div className="hex-grid">
          <div className="hex"></div><div className="hex"></div><div className="hex"></div>
          <div className="hex"></div><div className="hex active"></div><div className="hex"></div>
          <div className="hex"></div><div className="hex"></div><div className="hex"></div>
        </div>
        <div className="terminal-box">
          <div className="term-header">
            <span className="term-dot red"></span>
            <span className="term-dot yellow"></span>
            <span className="term-dot green"></span>
            <span className="term-title">weignstone@mku:~$</span>
          </div>
          <div className="term-body">
            <p><span className="cmd">$ whoami</span></p>
            <p className="out">Weignstone Churchil</p>
            <p><span className="cmd">$ cat degree.txt</span></p>
            <p className="out">BSc. Software Engineering</p>
            <p><span className="cmd">$ cat specialization.txt</span></p>
            <p className="out">Web Development</p>
            <p><span className="cmd">$ echo $STATUS</span></p>
            <p className="out green-bright">BUILDING THE FUTURE...</p>
            <p className="blink-line"><span className="cmd">$ _</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="section-header">
        <span className="section-num">01.</span>
        <h2 className="section-title">About Me</h2>
        <div className="section-line"></div>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>
            I'm <strong>Weignstone Churchil</strong>, a passionate Software Engineering student at 
            <span className="highlight">Mount Kenya University</span>, specializing in Web Development. 
            I thrive on transforming ideas into digital realities — one line of code at a time.
          </p>
          <p>
            My focus spans both front-end design and back-end logic, building systems that are not 
            only functional but beautifully crafted. I believe great software is where art meets engineering.
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-num" data-target="5">0</span>+
              <span className="stat-label">Languages</span>
            </div>
            <div className="stat">
              <span className="stat-num" data-target="10">0</span>+
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-num" data-target="3">0</span>+
              <span className="stat-label">Years Learning</span>
            </div>
          </div>
        </div>
        <div className="about-badge">
          <div className="badge-ring">
            <div className="badge-inner">
              <span className="badge-initials">WC</span>
              <span className="badge-role">Dev</span>
            </div>
          </div>
          <div className="orbit orbit-1"></div>
          <div className="orbit orbit-2"></div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  return (
    <div className="skill-card" data-lang={skill.lang}>
      <div className="skill-card-top">
        <div className={`skill-icon ${skill.lang.toLowerCase()}-icon`}>
          {skill.icon}
        </div>
        <h3 className="skill-name">{skill.name}</h3>
        <span className="skill-tag">{skill.tag}</span>
      </div>
      <p className="skill-desc">{skill.desc}</p>
      <div className="skill-bar">
        <div className="skill-fill" data-width={skill.width}></div>
      </div>
      <span className="skill-percent">{skill.width}</span>
    </div>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section-header">
        <span className="section-num">02.</span>
        <h2 className="section-title">Professions &amp; Skills</h2>
        <div className="section-line"></div>
      </div>
      <p className="skills-intro">// Technologies I work with</p>
      <div className="skills-grid">
        {skillsData.map((skill) => <SkillCard key={skill.lang} skill={skill} />)}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-header">
        <span className="section-num">03.</span>
        <h2 className="section-title">Contact</h2>
        <div className="section-line"></div>
      </div>
      <div className="contact-inner">
        <p className="contact-msg">// Let's build something great together</p>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">University</span>
            <span className="contact-value">Mount Kenya University</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Field</span>
            <span className="contact-value">Software Engineering &amp; Web Dev</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Status</span>
            <span className="contact-value green-bright">Open to Opportunities</span>
          </div>
        </div>
        <a href="mailto:weignstone@example.com" className="btn-primary big-btn">
          Send Message <span>&gt;&gt;</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>&lt; Coded with <span className="heart">♥</span> by <span className="highlight">Weignstone Churchil</span> /&gt;</p>
      <p className="footer-sub">© 2025 — Mount Kenya University</p>
    </footer>
  );
}

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';

    let cols = 0;
    let drops = [];
    let width = 0;
    let height = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.floor(width / 16);
      drops = Array(cols).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = '14px "Share Tech Mono", monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;

        ctx.fillStyle = '#ffffff';
        ctx.fillText(char, x, y * 16);

        ctx.fillStyle = '#00ff41';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * 16);

        ctx.fillStyle = '#005c18';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 2) * 16);

        if (y * 16 > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    resize();
    window.addEventListener('resize', resize);
    const intervalId = setInterval(draw, 45);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="matrix-canvas" ref={canvasRef}></canvas>;
}

function BootOverlay() {
  useEffect(() => {
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
      p.style.cssText = 'margin: 0.3rem 0; opacity: 0; transition: opacity 0.3s;';
      lineContainer.appendChild(p);
      requestAnimationFrame(() => { p.style.opacity = '1'; });
      barFill.style.width = `${((idx + 1) / lines.length) * 100}%`;
      idx += 1;
      setTimeout(showLine, 420);
    }

    const startTimeout = setTimeout(showLine, 300);
    return () => {
      clearTimeout(startTimeout);
      overlay.remove();
      document.body.style.overflow = '';
    };
  }, []);

  return null;
}

function CursorTrail() {
  useEffect(() => {
    const trail = [];
    const TRAIL_LEN = 8;
    let mouseX = 0;
    let mouseY = 0;

    for (let i = 0; i < TRAIL_LEN; i += 1) {
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

    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    function animateTrail() {
      let px = mouseX;
      let py = mouseY;
      trail.forEach((point) => {
        point.x += (px - point.x) * 0.35;
        point.y += (py - point.y) * 0.35;
        point.el.style.left = `${point.x - 3}px`;
        point.el.style.top = `${point.y - 3}px`;
        px = point.x;
        py = point.y;
      });
      frameId = requestAnimationFrame(animateTrail);
    }

    document.addEventListener('mousemove', handleMouseMove);
    let frameId = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      trail.forEach((point) => point.el.remove());
    };
  }, []);

  return null;
}

function usePortfolioEffects() {
  useEffect(() => {
    const nums = document.querySelectorAll('.stat-num');
    const bars = document.querySelectorAll('.skill-fill');
    const targets = document.querySelectorAll('.skill-card, .about-text, .about-badge, .contact-info, .stat, .terminal-box');
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const counterObserver = new IntersectionObserver((entries, observer) => {
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

    nums.forEach((num) => counterObserver.observe(num));

    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const width = bar.dataset.width || '0%';
        const card = bar.closest('.skill-card');
        const index = Array.from(document.querySelectorAll('.skill-card')).indexOf(card);
        setTimeout(() => { bar.style.width = width; }, index * 120);
        observer.unobserve(bar);
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => barObserver.observe(bar));

    targets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const index = Array.from(targets).indexOf(el);
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, (index % 5) * 100);
        observer.unobserve(el);
      });
    }, { threshold: 0.1 });

    targets.forEach(el => revealObserver.observe(el));

    function onScroll() {
      const scrollY = window.scrollY;
      const nav = document.querySelector('.navbar');

      if (nav) {
        nav.style.padding = scrollY > 60 ? '0.7rem 5%' : '1.2rem 5%';
        nav.style.background = scrollY > 60 ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.85)';
      }

      let current = '';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.id;
        }
      });

      links.forEach((link) => {
        const target = link.getAttribute('href')?.replace('#', '');
        link.style.color = target === current ? 'var(--green)' : 'var(--text-dim)';
      });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    const hoverCards = document.querySelectorAll('.skill-card');
    hoverCards.forEach((card) => {
      function handleMouseEnter() {
        const name = card.querySelector('.skill-name');
        if (!name) return;
        name.style.textShadow = '0 0 15px var(--green), 2px 0 red, -2px 0 cyan';
        setTimeout(() => {
          name.style.textShadow = '0 0 10px rgba(255,255,255,0.3)';
        }, 300);
      }
      card.addEventListener('mouseenter', handleMouseEnter);
      card.__reactCleanup = handleMouseEnter;
    });

    const flickerTargets = document.querySelectorAll('.nav-logo, .badge-initials');

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

    flickerTargets.forEach(flicker);

    return () => {
      window.removeEventListener('scroll', onScroll);
      hoverCards.forEach((card) => {
        card.removeEventListener('mouseenter', card.__reactCleanup);
      });
    };
  }, []);
}

function App() {
  usePortfolioEffects();

  return (
    <>
      <MatrixRain />
      <div className="scanlines"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BootOverlay />
      <CursorTrail />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
