// VisionX - Modern Professional Website JavaScript

// Performance optimized script with enhanced functionality
class VisionXWebsite {
  constructor() {
    this.isLoaded = false;
    this.particles = null;
    this.universe = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleLoading();
  }

  setupEventListeners() {
    // DOM Content Loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }

    // Window Load
    window.addEventListener('load', () => this.onWindowLoad());

    // Scroll Events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16), { passive: true });

    // Resize Events
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));

    // Visibility Change
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  onDOMReady() {
    this.initMobileMenu();
    this.initSmoothScrolling();
    this.initFAQ();
    this.initContactForm();
    this.initAnimations();
    this.initPortfolioVisibility();
  }

  onWindowLoad() {
    this.hideLoadingScreen();
    this.initBackgroundEffects();
    this.initCounters();
    this.initPartnersCarousel();
    this.isLoaded = true;
  }

  // Loading Screen
  handleLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      this.initLoadingAnimation();
      // Minimum loading time for better UX
      setTimeout(() => {
        if (this.isLoaded) {
          this.hideLoadingScreen();
        }
      }, 3000);
    }
  }

  initLoadingAnimation() {
    this.createCodeLines();
    this.createFloatingParticles();
    this.startLoadingMessages();
  }

  createCodeLines() {
    const codeLines = document.getElementById('code-lines');
    if (!codeLines) return;

    const codes = [
      { type: 'comment', text: '// Inicializando VisionX...' },
      { type: 'keyword', text: 'import React from "react";' },
      { type: 'keyword', text: 'const VisionX = () => {' },
      { type: 'string', text: '  return "Experiência incrível";' },
      { type: 'keyword', text: '};' },
      { type: 'comment', text: '// Carregando recursos...' },
      { type: 'keyword', text: 'export default VisionX;' }
    ];

    codes.forEach((code, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `code-line ${code.type}`;
        line.textContent = code.text;
        codeLines.appendChild(line);
      }, index * 300);
    });
  }

  createFloatingParticles() {
    const particlesContainer = document.getElementById('code-particles');
    if (!particlesContainer) return;

    const particles = [
      '{ }', '< >', '[ ]', '( )', '=>', '&&', '||', '++', '--', '===',
      'var', 'let', 'const', 'function', 'class', 'import', 'export',
      '0', '1', 'true', 'false', 'null', 'undefined', 'async', 'await'
    ];

    // Create 15 floating particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Random color (blue or green)
        particle.style.color = Math.random() > 0.5 ? '#00d4ff' : '#00ff88';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, 8000);
      }, i * 200);
    }
  }

  startLoadingMessages() {
    const messageElement = document.querySelector('.loading-message');
    const subMessageElement = document.querySelector('.loading-submessage');
    
    if (!messageElement || !subMessageElement) return;

    const messages = [
      {
        main: 'Preparando uma nova experiência para você',
        sub: 'Inicializando componentes...'
      },
      {
        main: 'Carregando recursos avançados',
        sub: 'Otimizando performance...'
      },
      {
        main: 'Finalizando configurações',
        sub: 'Quase pronto!'
      }
    ];

    let currentIndex = 0;
    
    const updateMessage = () => {
      if (currentIndex < messages.length) {
        messageElement.textContent = messages[currentIndex].main;
        subMessageElement.textContent = messages[currentIndex].sub;
        currentIndex++;
        setTimeout(updateMessage, 1000);
      }
    };
    
    updateMessage();
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }

  // Mobile Menu
  initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && nav) {
      mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      });

      // Close menu when clicking on links
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          nav.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        }
      });
    }
  }

  // Smooth Scrolling
  initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Show portfolio section if it's hidden
          if (targetId === '#portfolio') {
            this.showPortfolioSection();
          }
          
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update active nav link
          this.updateActiveNavLink(targetId);
        }
      });
    });
    
    // Handle "Ver Projetos" buttons specifically
    this.initPortfolioNavigation();
  }

  initPortfolioNavigation() {
    // Encontrar todos os botões que devem mostrar o portfólio
    const portfolioTriggers = document.querySelectorAll(
      'a[href="#portfolio"], .cta-button.secondary, .nav-link[href="#portfolio"]'
    );
    
    portfolioTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPortfolioSection();
      });
    });
  }

  showPortfolioSection() {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      // Mostrar a seção
      portfolioSection.style.display = 'block';
      portfolioSection.style.visibility = 'visible';
      
      // Forçar reflow
      portfolioSection.offsetHeight;
      
      // Adicionar classe para animação
      setTimeout(() => {
        portfolioSection.classList.add('show');
      }, 10);
      
      // Animar os cards do portfólio
      const portfolioCards = portfolioSection.querySelectorAll('.project-card');
      portfolioCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('aos-animate');
        }, index * 100 + 200);
      });
      
      // Scroll para a seção após mostrar
      setTimeout(() => {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = portfolioSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Atualizar link ativo no menu
        this.updateActiveNavLink('#portfolio');
      }, 100);
    }
  }

  hidePortfolioSection() {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.classList.remove('show');
      setTimeout(() => {
        portfolioSection.style.display = 'none';
        portfolioSection.style.visibility = 'hidden';
      }, 500);
    }
  }

  // Update the existing showPortfolioSection method
  initPortfolioVisibility() {
    // Garantir que a seção de portfólio fique oculta inicialmente
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.style.display = 'none';
      portfolioSection.style.visibility = 'hidden';
      portfolioSection.classList.remove('show');
    }
    
    // Adicionar handlers para todos os botões que devem mostrar o portfólio
    const portfolioTriggers = document.querySelectorAll(
      'a[href="#portfolio"], .cta-button.secondary, .nav-link[href="#portfolio"]'
    );
    
    portfolioTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPortfolioSection();
      });
    });
  }

  updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }

  // Scroll Handler
  handleScroll() {
    const scrollY = window.scrollY;
    const header = document.getElementById('header');
    
    // Header scroll effect
    if (header) {
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Update active section in navigation
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY;
    const headerHeight = document.querySelector('.header').offsetHeight;

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // FAQ Functionality
  initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
      });
    });
  }

  // Contact Form
  initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
      
      // Real-time validation
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    }
  }

async handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Validate form
    if (!this.validateForm(form)) {
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
    
    // Captura os dados do formulário
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const projectType = formData.get('project-type');
    const budget = formData.get('budget');
    const message = formData.get('message');

    // Cria a mensagem personalizada
    const whatsappMessage = `Olá, meu nome é *${name}*.\nMeu e-mail é *${email}*.\nMeu telefone é *${phone}*.\nEstou interessado em um projeto do tipo: *${projectType}*.\nMeu orçamento estimado é: *${budget}*.\nMensagem: *${message}*`;

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Cria o link do WhatsApp
    const whatsappLink = `https://wa.me/5599984680391?text=${encodedMessage}`;

    // Redireciona para o WhatsApp
    window.open(whatsappLink, '_blank');

    // Reset do formulário
    form.reset();
    
    // Sucesso
    this.showFormSuccess();
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Enviar Mensagem</span><i class="fas fa-paper-plane"></i>';
}

  async submitForm(formData) {
    // Convert FormData to object
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    // Here you would typically send to your backend
    // For now, we'll simulate with a delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% of the time)
        if (Math.random() > 0.1) {
          resolve(data);
        } else {
          reject(new Error('Simulated error'));
        }
      }, 2000);
    });
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error
    this.clearFieldError(field);
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
      this.showFieldError(field, 'Este campo é obrigatório');
      return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Digite um e-mail válido');
        return false;
      }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
      const phoneRegex = /^[\d\s\-\(\)\+]+$/;
      if (!phoneRegex.test(value) || value.length < 10) {
        this.showFieldError(field, 'Digite um telefone válido');
        return false;
      }
    }
    
    return true;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff4444';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  showFormSuccess() {
    this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
  }

  showFormError(message) {
    this.showNotification(message, 'error');
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#00d4ff' : '#ff4444'};
      color: ${type === 'success' ? '#000' : '#fff'};
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }

  // Animations
  initAnimations() {
    // Simple AOS-like functionality
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Counter Animation
  initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current >= target) {
        element.textContent = target;
      } else {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }

  // Background Effects
  initBackgroundEffects() {
    // Only initialize if not on mobile for performance
    if (window.innerWidth > 768) {
      this.initUniverseBackground();
      this.initParticleSystem();
    }
  }

  initUniverseBackground() {
    const canvas = document.getElementById('universe-canvas');
    if (!canvas) return;

    this.universe = new UniverseBackground(canvas);
  }

  initParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    this.particles = new ParticleSystem(canvas);
  }

  // Utility Functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
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

  handleResize() {
    // Reinitialize background effects on resize
    if (this.universe) {
      this.universe.handleResize();
    }
    if (this.particles) {
      this.particles.handleResize();
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      // Pause animations when tab is not visible
      if (this.universe) this.universe.pause();
      if (this.particles) this.particles.pause();
      this.pausePartnersCarousel();
    } else {
      // Resume animations when tab becomes visible
      if (this.universe) this.universe.resume();
      if (this.particles) this.particles.resume();
      this.resumePartnersCarousel();
    }
  }

  // Partners Carousel
  initPartnersCarousel() {
    const track = document.getElementById('partners-track');
    if (!track) return;

    // Clone slides for infinite scroll effect
    const slides = track.querySelectorAll('.partner-slide');
    if (slides.length > 0) {
      // The slides are already duplicated in HTML for infinite effect
      
      // Add hover pause functionality
      const container = document.querySelector('.partners-carousel-container');
      if (container) {
        container.addEventListener('mouseenter', () => {
          track.style.animationPlayState = 'paused';
        });
        
        container.addEventListener('mouseleave', () => {
          track.style.animationPlayState = 'running';
        });
      }
    }
  }

  pausePartnersCarousel() {
    const track = document.getElementById('partners-track');
    if (track) {
      track.style.animationPlayState = 'paused';
    }
  }

  resumePartnersCarousel() {
    const track = document.getElementById('partners-track');
    if (track) {
      track.style.animationPlayState = 'running';
    }
  }
}

// Universe Background Class
class UniverseBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.isRunning = true;
    
    this.init();
    this.animate();
  }

  init() {
    this.handleResize();
    this.createStars();
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars() {
    this.stars = [];
    const numStars = Math.min(100, Math.floor((this.canvas.width * this.canvas.height) / 10000));
    
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

  draw() {
    // Clear canvas with gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#1a1a1a');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw stars
    this.stars.forEach(star => {
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

  animate() {
    if (this.isRunning) {
      this.draw();
    }
    requestAnimationFrame(() => this.animate());
  }

  pause() {
    this.isRunning = false;
  }

  resume() {
    this.isRunning = true;
  }
}

// Particle System Class
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.isRunning = true;
    this.mouse = { x: 0, y: 0 };
    
    this.init();
    this.setupEvents();
    this.animate();
  }

  init() {
    this.handleResize();
    this.createParticles();
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createParticles();
  }

  setupEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  createParticles() {
    this.particles = [];
    const numParticles = Math.min(50, Math.floor((this.canvas.width * this.canvas.height) / 20000));
    
    for (let i = 0; i < numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: `hsl(${190 + Math.random() * 20}, 100%, 50%)`
      });
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary collision
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Keep in bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      
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
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.3;
          
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = '#00d4ff';
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
    // Clear with fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawConnections();
    this.drawParticles();
  }

  animate() {
    if (this.isRunning) {
      this.updateParticles();
      this.draw();
    }
    requestAnimationFrame(() => this.animate());
  }

  pause() {
    this.isRunning = false;
  }

  resume() {
    this.isRunning = true;
  }
}

// Initialize the website
const visionxWebsite = new VisionXWebsite();