/**
 * ORBYNIQ - Main Interactive Scripts
 * Handles: Theme Toggle, Hero Particle Canvas, ROI Calculator, Form Submissions, Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeroCanvas();
  initMobileNav();
  initStickyHeader();
  initRoiCalculator();
  initCounters();
  initContactForm();
});

/* ==========================================
   1. Theme Management (Dark / Light)
   ========================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const html = document.documentElement;
  
  // Default to dark mode for sleek tech aesthetic
  const savedTheme = localStorage.getItem('orbyniq_theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = html.classList.contains('light') ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('orbyniq_theme', newTheme);
    });
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
      updateThemeIcons('light');
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
      updateThemeIcons('dark');
    }
  }

  function updateThemeIcons(theme) {
    document.querySelectorAll('.sun-icon').forEach(icon => {
      icon.style.display = theme === 'light' ? 'none' : 'block';
    });
    document.querySelectorAll('.moon-icon').forEach(icon => {
      icon.style.display = theme === 'light' ? 'block' : 'none';
    });
  }
}

/* ==========================================
   2. Interactive Hero Particle Canvas
   ========================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    createParticles();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      // 25% of particles are Orbyniq Orange, rest are cyber silver
      this.isOrange = Math.random() < 0.25;
      this.color = this.isOrange ? '#FF5500' : 'rgba(255, 255, 255, 0.4)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 12000), 75);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].isOrange || particles[j].isOrange 
            ? `rgba(255, 85, 0, ${alpha * 1.5})` 
            : `rgba(255, 255, 255, ${alpha * 0.7})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  resize();
  animate();
}

/* ==========================================
   3. Mobile Navigation Drawer
   ========================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* ==========================================
   4. Sticky Header with Scroll Detection
   ========================================== */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('shadow-lg', 'bg-opacity-90', 'border-b', 'border-white/10');
    } else {
      header.classList.remove('shadow-lg', 'bg-opacity-90', 'border-b', 'border-white/10');
    }
  });
}

/* ==========================================
   5. Interactive AI & Automation ROI Calculator
   ========================================== */
function initRoiCalculator() {
  const teamSizeInput = document.getElementById('calcTeamSize');
  const hoursInput = document.getElementById('calcHours');
  const hourlyRateInput = document.getElementById('calcHourlyRate');
  const automationInput = document.getElementById('calcAutomationPct');

  const teamSizeVal = document.getElementById('calcTeamSizeVal');
  const hoursVal = document.getElementById('calcHoursVal');
  const hourlyRateVal = document.getElementById('calcHourlyRateVal');
  const automationVal = document.getElementById('calcAutomationPctVal');

  const annualSavingsEl = document.getElementById('calcAnnualSavings');
  const hoursSavedEl = document.getElementById('calcHoursSaved');
  const roiMultiplierEl = document.getElementById('calcRoiMultiplier');

  if (!teamSizeInput || !annualSavingsEl) return;

  function calculate() {
    const teamSize = parseInt(teamSizeInput.value) || 10;
    const hoursPerWeek = parseInt(hoursInput.value) || 15;
    const hourlyRate = parseInt(hourlyRateInput.value) || 45;
    const autoPct = parseInt(automationInput.value) || 60;

    // Display slider values
    if (teamSizeVal) teamSizeVal.textContent = teamSize;
    if (hoursVal) hoursVal.textContent = `${hoursPerWeek} hrs/week`;
    if (hourlyRateVal) hourlyRateVal.textContent = `$${hourlyRate}/hr`;
    if (automationVal) automationVal.textContent = `${autoPct}%`;

    // Calculations
    const annualWeeks = 50;
    const totalManualHoursPerYear = teamSize * hoursPerWeek * annualWeeks;
    const hoursSavedPerYear = Math.round(totalManualHoursPerYear * (autoPct / 100));
    const annualDollarSavings = Math.round(hoursSavedPerYear * hourlyRate);
    
    // Estimated ROI Multiple (based on typical Orbyniq project implementation)
    const estimatedCost = Math.max(15000, annualDollarSavings * 0.22);
    const roiMultiplier = ((annualDollarSavings - estimatedCost) / estimatedCost * 100) > 0 
      ? Math.round(annualDollarSavings / estimatedCost) 
      : 3;

    // Formatting
    annualSavingsEl.textContent = `$${annualDollarSavings.toLocaleString()}`;
    if (hoursSavedEl) hoursSavedEl.textContent = `${hoursSavedPerYear.toLocaleString()} hrs`;
    if (roiMultiplierEl) roiMultiplierEl.textContent = `${roiMultiplier}x ROI`;
  }

  [teamSizeInput, hoursInput, hourlyRateInput, automationInput].forEach(input => {
    if (input) {
      input.addEventListener('input', calculate);
    }
  });

  calculate();
}

/* ==========================================
   6. Animated Metric Counters
   ========================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const decimals = counter.getAttribute('data-decimals') ? parseInt(counter.getAttribute('data-decimals')) : 0;
          
          let current = 0;
          const duration = 1800;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = prefix + current.toFixed(decimals) + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-container');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================
   7. Contact & RFP Form Handler
   ========================================== */
function initContactForm() {
  const contactForm = document.getElementById('orbyniqContactForm');
  const modal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Visual button state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Processing Inquiry...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();
      
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      } else {
        alert("Thank you! Your project inquiry has been received by Orbyniq. We will reach out within 24 hours.");
      }
    }, 1200);
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }
}
