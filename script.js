// ============================================================
// MOBILE MENU
// ============================================================
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

menuBtn.addEventListener('click', function() {
  const expanded = this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
  this.setAttribute('aria-expanded', expanded);
  this.classList.toggle('active');
  mobileNav.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
  link.addEventListener('click', function() {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ============================================================
// TYPING EFFECT
// ============================================================
var roles = ["Science Student", "AI & Tech Explorer"];
var roleIndex = 0;
var charIndex = 0;
var isDeleting = false;
var roleEl = document.getElementById('roleText');

function typeRole() {
  var current = roles[roleIndex];
  if (isDeleting) {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeRole, 1500);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 300);
    return;
  }
  setTimeout(typeRole, isDeleting ? 25 : 45);
}
typeRole();

// ============================================================
// ACTIVE NAV
// ============================================================
var sections = document.querySelectorAll('.section');
var navLinks = document.querySelectorAll('.nav-link');
var mobileLinks = document.querySelectorAll('.mobile-nav-link');

function setActive(id) {
  navLinks.forEach(function(link) {
    link.classList.toggle('active', link.dataset.section === id);
  });
  mobileLinks.forEach(function(link) {
    link.classList.toggle('active', link.dataset.section === id);
  });
  navLinks.forEach(function(link) {
    link.toggleAttribute('aria-current', link.dataset.section === id);
  });
  mobileLinks.forEach(function(link) {
    link.toggleAttribute('aria-current', link.dataset.section === id);
  });
}

window.addEventListener('scroll', function() {
  var current = '';
  sections.forEach(function(section) {
    var top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });
  if (current) {
    setActive(current);
  }
});

// ============================================================
// BACK TO TOP
// ============================================================
var backTop = document.getElementById('backTop');

window.addEventListener('scroll', function() {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

backTop.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// SMOOTH SCROLL
// ============================================================
function smoothScroll(target, duration) {
  duration = duration || 400;
  var start = window.scrollY;
  var end = target.getBoundingClientRect().top + start;
  var startTime = performance.now();

  function animateScroll(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    window.scrollTo(0, start + (end - start) * ease);
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}

document.querySelectorAll('.nav-link, .mobile-nav-link, .btn-primary, .btn-secondary').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href && href.startsWith('#') && !this.hasAttribute('download')) {
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        requestAnimationFrame(function() {
          smoothScroll(target, 400);
        });
      }
    }
  });
});

// ============================================================
// PROJECT FILTER
// ============================================================
(function() {
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  function matchesFilter(card, filter) {
    if (filter === 'all') return true;
    var tags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
    if (filter === 'python-flask') {
      return tags.some(function(t) { return t === 'python' || t === 'flask'; });
    }
    if (filter === 'javascript') {
      return tags.some(function(t) { return t === 'js' || t === 'javascript'; });
    }
    if (filter === 'html-css') {
      return tags.some(function(t) { return t === 'html' || t === 'css'; });
    }
    return true;
  }

  function applyFilter(filter) {
    projectCards.forEach(function(card) {
      var show = matchesFilter(card, filter);
      if (show) {
        card.style.display = 'flex';
        requestAnimationFrame(function() {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(function() {
          card.style.display = 'none';
        }, 250);
      }
    });
  }

  filterButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterButtons.forEach(function(b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      applyFilter(this.dataset.filter);
    });
  });

  projectCards.forEach(function(card) {
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
  });
})();

// ============================================================
// SCROLL INDICATOR AUTO-HIDE
// ============================================================
var scrollIndicator = document.getElementById('scrollIndicator');

setTimeout(function() {
  if (scrollIndicator) {
    scrollIndicator.classList.add('fade-out');
  }
}, 4000);

window.addEventListener('scroll', function() {
  if (scrollIndicator && window.scrollY > 50) {
    scrollIndicator.classList.add('fade-out');
  }
});

// ============================================================
// FAQ TOGGLE
// ============================================================
document.querySelectorAll('.faq-question-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    var expanded = this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
    this.setAttribute('aria-expanded', expanded);
    var answer = this.nextElementSibling;
    var icon = this.querySelector('.faq-icon i');

    if (expanded === 'true') {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.opacity = '1';
      answer.style.padding = '0 22px 18px';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    } else {
      answer.style.maxHeight = '0';
      answer.style.opacity = '0';
      answer.style.padding = '0 22px';
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    }
  });
});

document.querySelectorAll('.faq-answer').forEach(function(answer) {
  answer.style.maxHeight = '0';
  answer.style.opacity = '0';
  answer.style.padding = '0 22px';
  answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
  answer.style.overflow = 'hidden';
});

// ============================================================
// CONTACT FORM
// ============================================================
(function() {
  var contactForm = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var btnText = document.getElementById('btnText');
  var btnSpinner = document.getElementById('btnSpinner');
  var formStatus = document.getElementById('formStatus');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline';
    formStatus.style.display = 'none';

    var formData = new FormData(this);

    try {
      var response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Your message has been sent successfully! I will get back to you soon.';
        formStatus.style.display = 'block';
        this.reset();
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Failed to send message. Please try again later.';
      formStatus.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnSpinner.style.display = 'none';
      setTimeout(function() {
        formStatus.style.display = 'none';
      }, 5000);
    }
  });
})();