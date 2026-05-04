/* script.js — Abiya Pardeshi Portfolio */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorTrail.style.left = e.clientX + 'px';
  cursorTrail.style.top = e.clientY + 'px';
});

// Hide cursor on touch devices
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorTrail.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ===== NAV SCROLL BEHAVIOR =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  const isDecimal = String(target).includes('.');
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isDecimal ? target.toFixed(1) : target;
  }
  requestAnimationFrame(update);
}

// Trigger counters on hero intersection
const statNums = document.querySelectorAll('.stat-num');
const heroSection = document.getElementById('hero');
let countersTriggered = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersTriggered) {
      countersTriggered = true;
      setTimeout(() => {
        statNums.forEach(el => {
          const target = parseFloat(el.dataset.target);
          animateCounter(el, target);
        });
      }, 600);
    }
  });
}, { threshold: 0.5 });

heroObserver.observe(heroSection);

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.section > *, .timeline-item, .skill-card, .work-card, .cert-item');
reveals.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 !== 0) {
    el.style.transitionDelay = `${(i % 3) * 0.08}s`;
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      setTimeout(() => {
        entry.target.style.width = width + '%';
      }, 200);
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));

// ===== HERO CANVAS — DATA VIZ DECORATION =====
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); drawViz(); });

  const ACCENT = 'rgba(240,168,76,';
  const ACCENT2 = 'rgba(229,93,58,';
  const BLUE = 'rgba(76,201,240,';

  // Simulated data
  const barData = [0.3, 0.55, 0.42, 0.78, 0.65, 0.9, 0.72, 0.88, 0.6, 0.95, 0.80, 0.70];
  const lineData = [0.2, 0.35, 0.3, 0.5, 0.48, 0.62, 0.58, 0.72, 0.68, 0.80, 0.78, 0.92];

  let animFrame = 0;

  function drawViz() {
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    animFrame += 0.008;

    // === BAR CHART (top area) ===
    const barCount = barData.length;
    const barAreaW = W * 0.7;
    const barAreaH = H * 0.3;
    const barAreaX = W * 0.15;
    const barAreaY = H * 0.08;
    const barW = (barAreaW / barCount) * 0.5;
    const barGap = barAreaW / barCount;

    barData.forEach((val, i) => {
      const x = barAreaX + i * barGap + barGap / 2 - barW / 2;
      const barH = barAreaH * val;
      const y = barAreaY + barAreaH - barH;

      // Animated shimmer on tallest bars
      const shimmer = i === 9 ? Math.sin(animFrame * 2) * 0.1 + 0.9 : 1;

      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, ACCENT + (0.8 * shimmer) + ')');
      grad.addColorStop(1, ACCENT + '0.1)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]);
      ctx.fill();
    });

    // Bar chart baseline
    ctx.strokeStyle = ACCENT + '0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(barAreaX - 10, barAreaY + barAreaH);
    ctx.lineTo(barAreaX + barAreaW + 10, barAreaY + barAreaH);
    ctx.stroke();

    // === LINE CHART (middle area) ===
    const lineAreaX = W * 0.1;
    const lineAreaY = H * 0.45;
    const lineAreaW = W * 0.8;
    const lineAreaH = H * 0.22;

    // Grid lines
    for (let r = 0; r <= 4; r++) {
      const y = lineAreaY + (r / 4) * lineAreaH;
      ctx.strokeStyle = ACCENT + '0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(lineAreaX, y);
      ctx.lineTo(lineAreaX + lineAreaW, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Animated wave offset
    const waveOffset = Math.sin(animFrame) * 0.04;

    // Area fill
    ctx.beginPath();
    lineData.forEach((val, i) => {
      const x = lineAreaX + (i / (lineData.length - 1)) * lineAreaW;
      const y = lineAreaY + lineAreaH - (val + waveOffset) * lineAreaH;
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prev = lineData[i - 1];
        const px = lineAreaX + ((i - 1) / (lineData.length - 1)) * lineAreaW;
        const py = lineAreaY + lineAreaH - (prev + waveOffset) * lineAreaH;
        const cx1 = px + (x - px) / 2;
        const cx2 = x - (x - px) / 2;
        ctx.bezierCurveTo(cx1, py, cx2, y, x, y);
      }
    });
    ctx.lineTo(lineAreaX + lineAreaW, lineAreaY + lineAreaH);
    ctx.lineTo(lineAreaX, lineAreaY + lineAreaH);
    ctx.closePath();
    const areaGrad = ctx.createLinearGradient(0, lineAreaY, 0, lineAreaY + lineAreaH);
    areaGrad.addColorStop(0, ACCENT2 + '0.15)');
    areaGrad.addColorStop(1, ACCENT2 + '0)');
    ctx.fillStyle = areaGrad;
    ctx.fill();

    // Line stroke
    ctx.beginPath();
    lineData.forEach((val, i) => {
      const x = lineAreaX + (i / (lineData.length - 1)) * lineAreaW;
      const y = lineAreaY + lineAreaH - (val + waveOffset) * lineAreaH;
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prev = lineData[i - 1];
        const px = lineAreaX + ((i - 1) / (lineData.length - 1)) * lineAreaW;
        const py = lineAreaY + lineAreaH - (prev + waveOffset) * lineAreaH;
        const cx1 = px + (x - px) / 2;
        const cx2 = x - (x - px) / 2;
        ctx.bezierCurveTo(cx1, py, cx2, y, x, y);
      }
    });
    ctx.strokeStyle = ACCENT2 + '0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    lineData.forEach((val, i) => {
      const x = lineAreaX + (i / (lineData.length - 1)) * lineAreaW;
      const y = lineAreaY + lineAreaH - (val + waveOffset) * lineAreaH;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT2 + '1)';
      ctx.fill();
    });

    // === SCATTER / METRICS (bottom area) ===
    const scatterY = H * 0.75;
    const metrics = [
      { x: 0.15, y: 0.08, r: 12, color: ACCENT },
      { x: 0.32, y: 0.05, r: 8, color: BLUE },
      { x: 0.50, y: 0.10, r: 16, color: ACCENT },
      { x: 0.65, y: 0.06, r: 10, color: ACCENT2 },
      { x: 0.80, y: 0.09, r: 14, color: BLUE },
      { x: 0.22, y: 0.16, r: 6, color: ACCENT2 },
      { x: 0.72, y: 0.14, r: 9, color: ACCENT },
      { x: 0.45, y: 0.18, r: 7, color: BLUE },
    ];

    metrics.forEach((m, i) => {
      const x = W * m.x;
      const y = scatterY + m.y * H * 0.2;
      const pulse = Math.sin(animFrame * 1.5 + i * 0.8) * 2;
      const r = m.r + pulse;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = m.color + '0.15)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = m.color + '0.5)';
      ctx.fill();
    });

    requestAnimationFrame(drawViz);
  }

  drawViz();
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#f0a84c';
    }
  });
});

// ===== TIMELINE — click to expand =====
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    timelineItems.forEach(ti => ti.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===== SMOOTH HOVER ON SKILL CARDS =====
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(ellipse at ${x}px ${y}px, rgba(240,168,76,0.06), var(--bg-card) 70%)`;
  });

  card.addEventListener('mouseleave', function() {
    card.style.background = '';
  });
});

