// Lightweight Particles System
class LegalParticlesSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    
    this.init();
    this.animate();
  }
  
  init() {
    this.resizeCanvas();
    this.createParticles();
    
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createParticles();
    });
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    const numParticles = Math.floor((this.canvas.width * this.canvas.height) / 20000);
    
    for (let i = 0; i < numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1;
      }
      
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = '#d4af37';
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  animate() {
    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize particles system
document.addEventListener('DOMContentLoaded', () => {
  new LegalParticlesSystem();
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Animate area cards
  const areaCards = document.querySelectorAll('.area-card');
  areaCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate contact items
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Animate credential items
  const credentialItems = document.querySelectorAll('.credential-item');
  credentialItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Counter animation for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-count'));
        animateCounter(target, finalValue);
        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
});

// Counter animation function
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 30);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.backdropFilter = 'blur(20px)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(20px)';
    header.style.boxShadow = 'none';
  }
  
  // Hide/show header on scroll
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollY = currentScrollY;
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
  mobileMenuBtn.addEventListener('click', () => {
    const isActive = nav.classList.contains('active');
    
    if (!isActive) {
      nav.classList.add('active');
      nav.style.display = 'block';
      setTimeout(() => {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
      }, 10);
    } else {
      nav.style.opacity = '0';
      nav.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        nav.classList.remove('active');
        nav.style.display = 'none';
      }, 300);
    }
    
    mobileMenuBtn.classList.toggle('active');
  });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    // Show success message
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Mensagem Enviada!</span>';
    submitBtn.style.background = '#4ade80';
    
    // Reset form
    setTimeout(() => {
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
    }, 3000);
    
    // Here you would typically send the data to your server
    console.log('Form data:', data);
  });
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      if (value.length <= 2) {
        value = value.replace(/(\d{0,2})/, '($1');
      } else if (value.length <= 7) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
    }
    
    e.target.value = value;
  });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu if open
    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuBtn?.classList.remove('active');
    }
  }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Preload critical images
const criticalImages = [
  'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600'
];

criticalImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// Add loading states
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    console.warn('Failed to load image:', this.src);
  });
});

// Add mobile menu styles dynamically
const mobileMenuStyles = `
  @media (max-width: 768px) {
    .nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: none;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .nav.active {
      display: block;
    }
    
    .nav-list {
      flex-direction: column;
      padding: 2rem;
      gap: 1rem;
    }
    
    .nav-link {
      padding: 1rem 0;
      border-bottom: 1px solid rgba(212, 175, 55, 0.1);
      font-size: 1.1rem;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Add subtle hover effects to form elements
document.addEventListener('DOMContentLoaded', () => {
  const formElements = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
  
  formElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.parentElement.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('blur', () => {
      element.parentElement.style.transform = 'translateY(0)';
    });
  });
});

// Smooth reveal animation for hero elements
const heroElements = document.querySelectorAll('.hero-text, .hero-image');
heroElements.forEach((element, index) => {
  element.style.animationDelay = `${index * 0.2}s`;
});

// Performance monitoring (lightweight)
let performanceMetrics = {
  loadTime: 0,
  domReady: 0
};

document.addEventListener('DOMContentLoaded', () => {
  performanceMetrics.domReady = performance.now();
});

window.addEventListener('load', () => {
  performanceMetrics.loadTime = performance.now();
  
  // Log performance if needed (remove in production)
  if (performanceMetrics.loadTime < 1000) {
    console.log('✅ Site loaded in under 1 second:', Math.round(performanceMetrics.loadTime), 'ms');
  }
});

// Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}