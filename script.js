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

  // Animate about sections
  const aboutSections = document.querySelectorAll('.about-text, .about-visual');
  aboutSections.forEach(section => {
    observer.observe(section);
  });

  // Animate value items
  const valueItems = document.querySelectorAll('.value-item');
  valueItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    observer.observe(item);
  });
});

// Form handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.consultation-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const area = formData.get('area');
      const message = formData.get('message');
      
      // Create WhatsApp message
      const whatsappMessage = `Olá Dr. Jacinto! Gostaria de agendar uma consulta.
      
*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}
*Área Jurídica:* ${area}
*Mensagem:* ${message}`;
      
      // Encode message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Open WhatsApp
      window.open(`https://wa.me/5599981269207?text=${encodedMessage}`, '_blank');
      
      // Show success message
      alert('Redirecionando para o WhatsApp...');
      
      // Reset form
      form.reset();
    });
  }
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-element');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.3 + (index * 0.1);
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
  'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg',
  'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
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
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    nav?.classList.remove('active');
    mobileMenuBtn?.classList.remove('active');
  }
});

// Add subtle hover effects to credential items
document.addEventListener('DOMContentLoaded', () => {
  const credentialItems = document.querySelectorAll('.credential-item');
  
  credentialItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(10px)';
      item.style.background = 'rgba(218, 165, 32, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
      item.style.background = 'rgba(218, 165, 32, 0.1)';
    });
  });
});

// Smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const elements = entry.target.querySelectorAll('.area-card, .value-item, .contact-item');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.practice-areas, .testimonials-section, .contact-section');
  sections.forEach(section => {
    // Initially hide elements
    const elements = section.querySelectorAll('.area-card, .value-item, .contact-item');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    sectionObserver.observe(section);
  });
});

// Add typing effect to hero title
document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.querySelector('.title-line');
  if (titleElement) {
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        titleElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 1000);
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
    
    // Log performance if needed
    if (performanceMetrics.fps < 30) {
      console.log('Performance: Consider optimizing animations');
    }
  }
  
  requestAnimationFrame(updatePerformanceMetrics);
}

// Start performance monitoring
updatePerformanceMetrics();