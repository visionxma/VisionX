// Digital Business Card Functionality

// VCard generation and download
function downloadVCard() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Jacinto Pereira
N:Pereira;Jacinto;;;
ORG:Advocacia
TITLE:Advogado
TEL;TYPE=WORK,VOICE:+5599981269207
TEL;TYPE=WORK,VOICE:+5599984413000
URL;TYPE=WORK:https://instagram.com/jacintopereira.adv
ADR;TYPE=WORK:;;Pedreiras;Maranhão;;Brasil
NOTE:OAB/MA 12.498 - Experiência, confiança e excelência jurídica
END:VCARD`;

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'jacinto-pereira-advogado.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  
  // Show success feedback
  showNotification('Contato salvo com sucesso!', 'success');
}

// Share functionality
function shareCard(platform) {
  const cardUrl = window.location.href;
  const shareText = 'Jacinto Pereira - Advogado OAB/MA 12.498\nExperiência, confiança e excelência jurídica\nContato: +55 99 8126-9207';
  
  switch(platform) {
    case 'whatsapp':
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + cardUrl)}`;
      window.open(whatsappUrl, '_blank');
      break;
      
    case 'copy':
      copyToClipboard(cardUrl);
      break;
      
    case 'email':
      const emailSubject = 'Cartão de Visita Digital - Jacinto Pereira';
      const emailBody = `${shareText}\n\nAcesse o cartão digital: ${cardUrl}`;
      const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = emailUrl;
      break;
  }
}

// Copy to clipboard functionality
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification('Link copiado para a área de transferência!', 'success');
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('Link copiado para a área de transferência!', 'success');
  }
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${type === 'success' ? '#10B981' : '#3B82F6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 300px;
    font-size: 0.9rem;
    font-weight: 500;
  `;
  
  const content = notification.querySelector('.notification-content');
  content.style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Add notification animations
const notificationStyles = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Contact interaction tracking
function trackContactInteraction(type, value) {
  // Analytics tracking could be implemented here
  console.log(`Contact interaction: ${type} - ${value}`);
}

// Add click tracking to contact items
document.addEventListener('DOMContentLoaded', () => {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const type = item.classList.contains('whatsapp') ? 'whatsapp' : 
                   item.classList.contains('phone') ? 'phone' : 
                   item.classList.contains('instagram') ? 'instagram' : 'other';
      const value = item.querySelector('.contact-value').textContent;
      
      trackContactInteraction(type, value);
      
      // Add visual feedback
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.transform = '';
      }, 150);
    });
  });
  
  // Add hover effects to action buttons
  const actionButtons = document.querySelectorAll('.action-btn');
  actionButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // ESC key to close any open modals or notifications
  if (e.key === 'Escape') {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => notification.remove());
  }
  
  // Enter key on focused elements
  if (e.key === 'Enter' && document.activeElement) {
    const focusedElement = document.activeElement;
    
    if (focusedElement.classList.contains('contact-item')) {
      focusedElement.click();
    }
    
    if (focusedElement.classList.contains('action-btn')) {
      focusedElement.click();
    }
    
    if (focusedElement.classList.contains('save-btn')) {
      downloadVCard();
    }
    
    if (focusedElement.classList.contains('share-btn')) {
      const shareType = focusedElement.getAttribute('data-share') || 'copy';
      shareCard(shareType);
    }
  }
});

// Add data attributes for share buttons
document.addEventListener('DOMContentLoaded', () => {
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach((button, index) => {
    const shareTypes = ['whatsapp', 'copy', 'email'];
    button.setAttribute('data-share', shareTypes[index]);
  });
});

// Performance monitoring
let performanceMetrics = {
  loadTime: 0,
  domReady: 0
};

document.addEventListener('DOMContentLoaded', () => {
  performanceMetrics.domReady = performance.now();
});

window.addEventListener('load', () => {
  performanceMetrics.loadTime = performance.now();
  
  // Log performance for optimization
  if (performanceMetrics.loadTime < 1000) {
    console.log('✅ Card loaded in under 1 second:', Math.round(performanceMetrics.loadTime), 'ms');
  }
});

// Lazy loading for any future images
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

// Add subtle animations on load
document.addEventListener('DOMContentLoaded', () => {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 + (index * 50));
  });
});

// Add touch feedback for mobile devices
if ('ontouchstart' in window) {
  document.addEventListener('touchstart', (e) => {
    const target = e.target.closest('.contact-item, .action-btn, .save-btn, .share-btn');
    if (target) {
      target.style.transform = 'scale(0.95)';
    }
  });
  
  document.addEventListener('touchend', (e) => {
    const target = e.target.closest('.contact-item, .action-btn, .save-btn, .share-btn');
    if (target) {
      setTimeout(() => {
        target.style.transform = '';
      }, 150);
    }
  });
}

// Error handling for external links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="http"], a[href^="tel:"], a[href^="mailto:"]');
  if (link) {
    // Add loading state for external links
    const originalText = link.innerHTML;
    if (link.href.includes('wa.me') || link.href.includes('instagram.com')) {
      link.style.opacity = '0.7';
      setTimeout(() => {
        link.style.opacity = '';
      }, 1000);
    }
  }
});

// Add meta tags for better sharing
function addMetaTags() {
  const metaTags = [
    { property: 'og:title', content: 'Jacinto Pereira - Advogado' },
    { property: 'og:description', content: 'OAB/MA 12.498 - Experiência, confiança e excelência jurídica. Contato: +55 99 8126-9207' },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: window.location.href },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Jacinto Pereira - Advogado' },
    { name: 'twitter:description', content: 'OAB/MA 12.498 - Experiência, confiança e excelência jurídica' }
  ];
  
  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    if (tag.property) meta.setAttribute('property', tag.property);
    if (tag.name) meta.setAttribute('name', tag.name);
    meta.setAttribute('content', tag.content);
    document.head.appendChild(meta);
  });
}

// Initialize meta tags
addMetaTags();

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker could be implemented for offline access
    console.log('Service Worker support detected');
  });
}