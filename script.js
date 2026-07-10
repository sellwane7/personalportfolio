/* =============================================
   JOYCE SELLWANE MOSIA — PORTFOLIO JAVASCRIPT
   Full-Stack Developer & Cybersecurity Specialist
   ============================================= */

/* =============================================
   LIVE CODE CANVAS BACKGROUND
   ============================================= */
(function initCodeCanvas() {
  const canvas = document.getElementById('codeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const codeSnippets = [
    'import java.util.HashMap;',
    'public class SecureAuth {',
    'SELECT * FROM users WHERE',
    'const encrypt = (data) => {',
    'def analyze_data(df):',
    '  if (token.isValid()) {',
    '  return bcrypt.hash(pwd, 10)',
    'firewall.allow(port=443)',
    'git commit -m "security patch"',
    'import pandas as pd',
    'nmap -sV 192.168.1.1',
    'ssh-keygen -t ed25519',
    'SELECT role, COUNT(*) FROM',
    'try { authenticate(user); }',
    'catch (SecurityException e) {',
    'pip install cryptography',
    'chmod 600 ~/.ssh/config',
    'docker run --rm -p 8080:80',
    'curl -H "Authorization: Bearer"',
    'int[] arr = new int[256];',
    'for (int i=0; i<n; i++) {',
    'PreparedStatement stmt =',
    'ResultSet rs = stmt.executeQuery()',
    'df.groupby("category").mean()',
    'plt.figure(figsize=(12,6))',
    'response = requests.get(url)',
    'String hash = SHA256.hash(input)',
    'GRANT SELECT ON db.* TO user@host',
    'public interface Authenticator {',
    'private static final long JWT_TTL',
    '// TODO: add rate limiting',
    'validate_input(user_data)',
    'console.log("API call:", endpoint)',
    'env.ANTHROPIC_API_KEY',
    'model: "claude-sonnet-4"',
    'fetch("/api/generate", {method:"POST"})',
    'localStorage.setItem("token", jwt)',
    'document.querySelector(".dashboard")',
    'stream.on("data", chunk => {',
    'const [data, setData] = useState([])',
  ];

  let columns = [];
  let animId;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildColumns();
  }

  function buildColumns() {
    columns = [];
    const colWidth = 320;
    const count = Math.ceil(canvas.width / colWidth) + 1;
    for (let i = 0; i < count; i++) {
      columns.push({
        x: i * colWidth + Math.random() * 60,
        y: Math.random() * -canvas.height,
        speed: 0.4 + Math.random() * 0.5,
        gap: 22 + Math.random() * 8,
        lines: [],
        lineCount: 18 + Math.floor(Math.random() * 10),
      });
    }
    columns.forEach(col => {
      for (let j = 0; j < col.lineCount; j++) {
        col.lines.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '11px "DM Mono", "Courier New", monospace';

    columns.forEach(col => {
      col.lines.forEach((line, i) => {
        const y = col.y + i * col.gap;
        if (y < -20 || y > canvas.height + 20) return;

        // Fade based on position — brighter in middle
        const relY = y / canvas.height;
        const fade = Math.sin(relY * Math.PI) * 0.9 + 0.1;

        // Alternate teal / blue tones
        const hue = i % 3 === 0 ? '190,231,255' : i % 3 === 1 ? '147,210,255' : '186,230,253';
        ctx.fillStyle = `rgba(${hue}, ${fade.toFixed(2)})`;
        ctx.fillText(line, col.x, y);
      });

      col.y += col.speed;
      // Reset column when all lines scroll off screen
      const maxY = col.y + col.lineCount * col.gap;
      if (maxY < 0) {
        col.y = canvas.height + 40;
        col.lines = col.lines.map(() => codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
      }
      if (col.y > canvas.height + col.lineCount * col.gap) {
        col.y = -col.lineCount * col.gap;
      }
    });

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { cancelAnimationFrame(animId); resize(); draw(); });
  resize();
  draw();
})();

/* =============================================
   NAVBAR: active link on scroll + shadow
   ============================================= */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');
const navbar     = document.getElementById('navbar');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });

/* =============================================
   MOBILE HAMBURGER
   ============================================= */
const hamburger    = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
});
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});

/* =============================================
   UNIVERSAL SCROLL-REVEAL ENGINE
   ============================================= */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('is-visible'), Number(delay));
      io.unobserve(el);
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
}

/* =============================================
   SECTION TITLE LETTER-BY-LETTER ANIMATION
   ============================================= */
function initTitleAnimations() {
  document.querySelectorAll('.section-title').forEach(title => {
    title.childNodes.forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const text = node.textContent;
      const frag = document.createDocumentFragment();
      [...text].forEach((char, i) => {
        const s = document.createElement('span');
        s.className = 'title-char';
        s.style.animationDelay = `${i * 40}ms`;
        s.textContent = char === ' ' ? '\u00A0' : char;
        frag.appendChild(s);
      });
      node.replaceWith(frag);
    });
    title.querySelectorAll('.highlight').forEach(hl => {
      const text = hl.textContent;
      hl.textContent = '';
      [...text].forEach((char, i) => {
        const s = document.createElement('span');
        s.className = 'title-char highlight-char';
        s.style.animationDelay = `${(i + 4) * 40}ms`;
        s.textContent = char === ' ' ? '\u00A0' : char;
        hl.appendChild(s);
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.closest('.section-header').querySelectorAll('.title-char').forEach(c => {
            c.classList.add('char-visible');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(title);
  });
}

/* =============================================
   SECTION LINE GROW ANIMATION
   ============================================= */
function initSectionLines() {
  const lines = document.querySelectorAll('.section-line');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('line-grow'); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  lines.forEach(l => io.observe(l));
}

/* =============================================
   SKILLS TAB + BAR ANIMATION
   ============================================= */
const skillTabs   = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skills-panel');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'));
    skillPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(`tab-${tab.dataset.tab}`);
    if (panel) {
      panel.classList.add('active');
      animateBarsInPanel(panel);
      panel.querySelectorAll('.skill-tag').forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        setTimeout(() => {
          tag.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          tag.style.opacity = '1';
          tag.style.transform = 'translateY(0)';
        }, i * 45);
      });
    }
  });
});

function animateBarsInPanel(panel) {
  panel.querySelectorAll('.bar-fill').forEach((bar, i) => {
    const w = bar.getAttribute('data-width');
    if (w) {
      bar.style.width = '0';
      setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.width = w + '%'; }));
      }, i * 80);
    }
  });
}

const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activePanel = document.querySelector('.skills-panel.active');
      if (activePanel) animateBarsInPanel(activePanel);
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.2 });
if (skillsSection) skillsObserver.observe(skillsSection);

/* =============================================
   PROJECT CARD TILT ON HOVER
   ============================================= */
function initTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.25s ease';
    });
  });
}

/* =============================================
   HERO FLOATING BADGES PARALLAX
   ============================================= */
function initHeroParallax() {
  const badges = document.querySelectorAll('.hero-badge');
  const ring   = document.querySelector('.avatar-ring');
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    badges.forEach((b, i) => {
      const depth = i % 2 === 0 ? 18 : 12;
      b.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
      b.style.transition = 'transform 0.4s ease';
    });
    if (ring) {
      ring.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
      ring.style.transition = 'transform 0.5s ease';
    }
  });
}

/* =============================================
   CERT CARD HOVER LIFT
   ============================================= */
function initCertFlip() {
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.35s ease, box-shadow 0.25s ease, border-color 0.25s ease';
      card.style.transform  = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* =============================================
   CONTACT FORM INPUT FOCUS
   ============================================= */
function initFormEffects() {
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', () => field.closest('.form-group').classList.add('field-active'));
    field.addEventListener('blur',  () => field.closest('.form-group').classList.remove('field-active'));
  });
}

/* =============================================
   CONTACT FORM WITH EmailJS
   ============================================= */
(function () {
  try { emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); }
  catch (e) { console.warn('EmailJS not initialised.'); }
})();

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formStatus  = document.getElementById('formStatus');

function showFieldError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errorId);
  if (field) field.classList.add('error');
  if (err)   err.textContent = msg;
}
function clearErrors() {
  ['name','email','message'].forEach(id => {
    const f = document.getElementById(id);
    const e = document.getElementById(id + 'Error');
    if (f) f.classList.remove('error');
    if (e) e.textContent = '';
  });
  formStatus.className   = 'form-status';
  formStatus.textContent = '';
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let valid = true;
    if (!name)    { showFieldError('name','nameError','Please enter your name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError('email','emailError','Please enter a valid email address.'); valid = false;
    }
    if (!message) { showFieldError('message','messageError','Please write a message.'); valid = false; }
    if (!valid) return;

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';
    formStatus.className  = 'form-status sending';
    formStatus.textContent = 'Sending your message…';

    emailjs.send('YOUR_EMAILJS_SERVICE_ID','YOUR_EMAILJS_TEMPLATE_ID',
      { from_name: name, from_email: email, message }
    )
    .then(() => {
      formStatus.className   = 'form-status success';
      formStatus.textContent = '✓ Message sent! I will get back to you soon.';
      contactForm.reset();
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      const subject = encodeURIComponent('Portfolio Enquiry from ' + name);
      const body    = encodeURIComponent(message + '\n\nFrom: ' + name + '\nEmail: ' + email);
      window.location.href = `mailto:sellwanemosia708@gmail.com?subject=${subject}&body=${body}`;
      formStatus.className   = 'form-status success';
      formStatus.textContent = 'Opening your email client…';
    })
    .finally(() => {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    });
  });
}

/* =============================================
   SMOOTH SCROLL
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* =============================================
   REVEAL-LINE (about / exp cards)
   ============================================= */
function initRevealLines() {
  const items = document.querySelectorAll('.reveal-line');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* =============================================
   TAG REVEAL ELEMENTS
   ============================================= */
function tagRevealElements() {
  const selectors = [
    { sel: '.about-card',   dir: 'up' },
    { sel: '.exp-card',     dir: 'left' },
    { sel: '.edu-card',     dir: 'up' },
    { sel: '.skills-tabs',  dir: 'up' },
    { sel: '.project-card', dir: 'up' },
    { sel: '.cert-card',    dir: 'up' },
    { sel: '.contact-info', dir: 'left' },
    { sel: '.contact-form', dir: 'right' },
    { sel: '.section-sub',  dir: 'up' },
  ];
  selectors.forEach(({ sel, dir }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', dir);
        el.setAttribute('data-delay', i * 80);
      }
    });
  });
}

/* =============================================
   HERO TYPEWRITER
   ============================================= */
function initHeroTypewriter() {
  const plainEl = document.getElementById('heroTitlePlain');
  const nameEl = document.getElementById('heroTitleName');
  if (!plainEl || !nameEl) return;

  const plainText = plainEl.textContent;
  const nameText = nameEl.textContent;
  plainEl.textContent = '';
  nameEl.textContent = '';

  let i = 0;
  function typePlain() {
    if (i < plainText.length) {
      plainEl.textContent += plainText.charAt(i);
      i++;
      setTimeout(typePlain, 45);
    } else {
      let j = 0;
      function typeName() {
        if (j < nameText.length) {
          nameEl.textContent += nameText.charAt(j);
          j++;
          setTimeout(typeName, 45);
        }
      }
      typeName();
    }
  }
  typePlain();
}

/* =============================================
   BOOT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  tagRevealElements();
  initReveal();
  initRevealLines();
  initTitleAnimations();
  initSectionLines();
  initTilt();
  initHeroParallax();
  initCertFlip();
  initFormEffects();
  initHeroTypewriter();
});
