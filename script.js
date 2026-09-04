/* ===== South Grant — Interactivity ===== */

(function () {
  'use strict';

  // ---- Current year ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Live clock ----
  var timeEl = document.getElementById('time');
  function tick() {
    if (!timeEl) return;
    timeEl.textContent = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
  tick();
  setInterval(tick, 1000);

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  var navLinks = menu ? menu.querySelectorAll('a') : [];

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
  }

  // ---- Active nav link on scroll ----
  var sections = document.querySelectorAll('section[id]');
  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + section.id
          );
        });
      }
    });
  }

  // ---- Animated stat counter ----
  function animateStats() {
    var counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-count'), 10);
      var suffix = /\D/.test(counter.textContent.trim()) ? '%' : '';
      var duration = 900;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        counter.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // Only run scroll-related work if the browser supports it
  if ('IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateStats();
            statObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    var statsSection = document.querySelector('.stats');
    if (statsSection) statObserver.observe(statsSection);
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // ---- Contact form validation (demo) ----
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      status.textContent = '';
      status.className = 'form-status';

      if (!name) {
        status.textContent = 'Please enter your name.';
        status.classList.add('error');
        form.name.focus();
        return;
      }
      if (!email || !emailOk) {
        status.textContent = 'Please enter a valid email address.';
        status.classList.add('error');
        form.email.focus();
        return;
      }
      if (!message) {
        status.textContent = 'Please write a message.';
        status.classList.add('error');
        form.message.focus();
        return;
      }

      // Demo success — no backend attached.
      status.textContent = 'Thanks, ' + name + '! Your message was sent (demo).';
      status.classList.add('success');
      form.reset();
    });
  }
})();
