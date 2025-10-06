// ===========================
// Mobile Menu Toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===========================
// Header Scroll Effect
// ===========================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ===========================
// Animated Counter
// ===========================
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      
      // Trigger counter animation for stat numbers
      if (entry.target.classList.contains('stat-number')) {
        animateCounter(entry.target);
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
  observer.observe(element);
});

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(element => {
  observer.observe(element);
});

// ===========================
// Back to Top Button
// ===========================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showFormMessage('Por favor, preencha todos os campos.', 'error');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage('Por favor, insira um email válido.', 'error');
    return;
  }

  // Simulate form submission (in a real scenario, this would send data to a server)
  showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
  
  // Reset form
  contactForm.reset();

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
});

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
}

// ===========================
// Active Nav Link on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ===========================
// Parallax Effect for Hero Background
// ===========================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  if (hero) {
    hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
  }
});

// ===========================
// Console Message
// ===========================
console.log('%c🚀 Tutorial Landing Page', 'font-size: 24px; font-weight: bold; color: #c3073f;');
console.log('%cDesenvolvido por Gabriel Demetrios Lafis', 'font-size: 14px; color: #66fcf1;');
console.log('%cHTML5 • CSS3 • JavaScript', 'font-size: 12px; color: #c5c6c7;');

// ===========================
// Page Load Animation
// ===========================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===========================
// Prevent Default Form Actions
// ===========================
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});
