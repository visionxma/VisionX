// Advanced Particles System
class AdvancedParticlesSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;
    
    this.init();
    this.setupEventListeners();
    this.animate();
  }
  
  init() {
    this.resizeCanvas();
    this.createParticles();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    const numParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: this.getRandomColor(),
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  getRandomColor() {
    const colors = [
      'rgba(0, 255, 255, ',
      'rgba(0, 128, 255, ',
      'rgba(255, 255, 255, ',
      'rgba(128, 255, 255, '
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createParticles();
    });
    
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary collision
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1;
      }
      
      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      
      // Pulse effect
      particle.pulsePhase += particle.pulseSpeed;
      particle.currentOpacity = particle.opacity + Math.sin(particle.pulsePhase) * 0.3;
      particle.currentSize = particle.size + Math.sin(particle.pulsePhase) * 0.5;
      
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.01;
        particle.vy += (dy / distance) * force * 0.01;
      }
      
      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;
    });
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, particle.currentOpacity));
      this.ctx.fillStyle = particle.color + particle.currentOpacity + ')';
      
      // Draw particle with glow effect
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = particle.color + '0.8)';
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.currentSize, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.restore();
    });
  }
  
  drawConnections() {
    this.connections = [];
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.5;
          
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = 'rgba(0, 255, 255, ' + opacity + ')';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }
  
  draw() {
    // Clear canvas with gradient background
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(10, 10, 35, 0.1)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawConnections();
    this.drawParticles();
  }
  
  animate() {
    this.updateParticles();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Universe Background Animation
class UniverseBackground {
  constructor() {
    this.canvas = document.getElementById('universe-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.codeStrings = [];
    this.codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>/\\|`~+-*=';
    
    this.init();
    this.animate();
  }
  
  init() {
    this.resizeCanvas();
    this.createStars();
    this.createCodeStrings();
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createStars();
      this.createCodeStrings();
    });
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createStars() {
    this.stars = [];
    const numStars = Math.floor((this.canvas.width * this.canvas.height) / 8000);
    
    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }
  
  createCodeStrings() {
    this.codeStrings = [];
    const numStrings = Math.floor(this.canvas.width / 150);
    
    for (let i = 0; i < numStrings; i++) {
      this.codeStrings.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height - this.canvas.height,
        speed: Math.random() * 2 + 1,
        chars: this.generateCodeString(),
        opacity: Math.random() * 0.6 + 0.2,
        fontSize: Math.random() * 4 + 10
      });
    }
  }
  
  generateCodeString() {
    const length = Math.floor(Math.random() * 20) + 10;
    let str = '';
    for (let i = 0; i < length; i++) {
      str += this.codeChars[Math.floor(Math.random() * this.codeChars.length)];
    }
    return str;
  }
  
  drawStars() {
    this.stars.forEach(star => {
      // Twinkling effect
      star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.1;
      star.opacity = Math.max(0.1, Math.min(1, star.opacity));
      
      this.ctx.save();
      this.ctx.globalAlpha = star.opacity;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  drawCodeStrings() {
    this.codeStrings.forEach(codeString => {
      this.ctx.save();
      this.ctx.globalAlpha = codeString.opacity;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = `${codeString.fontSize}px 'JetBrains Mono', monospace`;
      
      // Draw each character with slight spacing
      for (let i = 0; i < codeString.chars.length; i++) {
        const char = codeString.chars[i];
        const charY = codeString.y + (i * (codeString.fontSize + 2));
        
        if (charY > -codeString.fontSize && charY < this.canvas.height + codeString.fontSize) {
          this.ctx.fillText(char, codeString.x, charY);
        }
      }
      
      this.ctx.restore();
      
      // Move code string down
      codeString.y += codeString.speed;
      
      // Reset when off screen
      if (codeString.y > this.canvas.height + (codeString.chars.length * codeString.fontSize)) {
        codeString.y = -codeString.chars.length * codeString.fontSize;
        codeString.x = Math.random() * this.canvas.width;
        codeString.chars = this.generateCodeString();
      }
    });
  }
  
  draw() {
    // Clear canvas with space-like background
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height)
    );
    gradient.addColorStop(0, '#000814');
    gradient.addColorStop(0.5, '#001d3d');
    gradient.addColorStop(1, '#000000');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawStars();
    this.drawCodeStrings();
  }
  
  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize background systems
document.addEventListener('DOMContentLoaded', () => {
  new UniverseBackground();
  new AdvancedParticlesSystem();
});

// App Carousel Functionality
class AppCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.carousel-indicators .indicator');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    this.setupEventListeners();
    this.startAutoPlay();
    this.setupTouchGestures();
  }
  
  setupEventListeners() {
    // Navigation buttons
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    
    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Pause on hover
    const carousel = document.querySelector('.app-carousel');
    carousel?.addEventListener('mouseenter', () => this.stopAutoPlay());
    carousel?.addEventListener('mouseleave', () => this.startAutoPlay());
  }
  
  goToSlide(index) {
    // Remove active class from current slide
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');
    
    // Update current slide
    this.currentSlide = index;
    
    // Add active class to new slide
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  setupTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.carousel-container');
    
    carousel?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    });
  }
  
  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
}

// Initialize App Carousel
document.addEventListener('DOMContentLoaded', () => {
  new AppCarousel();
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  // Animate service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate finagro project
  const finagroProject = document.querySelector('.finagro-project');
  if (finagroProject) {
    observer.observe(finagroProject);
  }

  // Animate contact items
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Animate about sections
  const aboutSections = document.querySelectorAll('.about-text, .about-visual');
  aboutSections.forEach(section => {
    observer.observe(section);
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

// Partners carousel functionality
class PartnersCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    this.indicators = document.querySelectorAll('.partners-carousel .indicator');
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.autoPlayInterval = null;
    
    this.init();
  }

  init() {
    this.setupIndicators();
    this.startAutoPlay();
    this.setupHoverPause();
  }

  setupIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const translateX = -this.currentSlide * (100 / this.totalSlides);
    this.track.style.transform = `translateX(${translateX}%)`;
    
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  setupHoverPause() {
    const carousel = document.querySelector('.partners-carousel');
    carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    carousel.addEventListener('mouseleave', () => this.startAutoPlay());
  }
}

// Initialize partners carousel
new PartnersCarousel();

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
    header.style.background = 'rgba(0, 0, 0, 0.98)';
    header.style.backdropFilter = 'blur(20px)';
  } else {
    header.style.background = 'rgba(0, 0, 0, 0.95)';
    header.style.backdropFilter = 'blur(20px)';
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

mobileMenuBtn?.addEventListener('click', () => {
  nav.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-element');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Scroll handling code here
}, 16); // ~60fps

// Preload critical images
const criticalImages = [
  'assets/visionx-logo.png',
  'assets/FInagro LOGO 3.png',
  'assets/logo-ifma.png',
  'assets/logo-licc.png'
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
  });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu if open
    nav?.classList.remove('active');
    mobileMenuBtn?.classList.remove('active');
  }
  
  // Carousel keyboard navigation
  const carousel = document.querySelector('.app-carousel');
  if (carousel && document.activeElement.closest('.app-carousel')) {
    const appCarousel = new AppCarousel();
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      appCarousel.prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      appCarousel.nextSlide();
    }
  }
});

// Enhanced mobile menu with smooth animations
document.addEventListener('DOMContentLoaded', () => {
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
});

// Add CSS for mobile menu animations
const mobileMenuStyles = `
  @media (max-width: 768px) {
    .nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.98);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: none;
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
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

// Add subtle hover effects to tech tags
document.addEventListener('DOMContentLoaded', () => {
  const techTags = document.querySelectorAll('.tech-tag');
  
  techTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-2px) scale(1.05)';
      tag.style.boxShadow = '0 5px 15px rgba(255, 255, 255, 0.1)';
    });
    
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'translateY(0) scale(1)';
      tag.style.boxShadow = 'none';
    });
  });
});

// Smooth reveal animation for featured project elements
const featuredProjectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const elements = entry.target.querySelectorAll('.project-description, .project-visual, .project-actions');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  const featuredCard = document.querySelector('.finagro-project');
  if (featuredCard) {
    // Initially hide elements
    const elements = featuredCard.querySelectorAll('.project-description, .project-visual, .project-actions');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    featuredProjectObserver.observe(featuredCard);
  }
});

// Performance monitoring
let performanceMetrics = {
  fps: 0,
  lastTime: performance.now(),
  frameCount: 0
};

function updatePerformanceMetrics() {
  const now = performance.now();
  performanceMetrics.frameCount++;
  
  if (now - performanceMetrics.lastTime >= 1000) {
    performanceMetrics.fps = performanceMetrics.frameCount;
    performanceMetrics.frameCount = 0;
    performanceMetrics.lastTime = now;
    
    // Adjust particle count based on performance
    if (performanceMetrics.fps < 30) {
      console.log('Low FPS detected, consider reducing particle count');
    }
  }
  
  requestAnimationFrame(updatePerformanceMetrics);
}

// Start performance monitoring
updatePerformanceMetrics();