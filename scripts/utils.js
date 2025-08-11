// Utility functions for the portfolio website

class Utils {
  // Debounce function to limit function calls
  static debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Throttle function to limit function calls
  static throttle(func, limit) {
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

  // Smooth scroll to element
  static smoothScrollTo(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }

  // Check if element is in viewport
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Get scroll percentage
  static getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (scrollTop / scrollHeight) * 100;
  }

  // Format date
  static formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  // Validate email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Copy text to clipboard
  static async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  }

  // Generate unique ID
  static generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Deep clone object
  static deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // Get random number between min and max
  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Shuffle array
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Check if user prefers reduced motion
  static prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Get device type
  static getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  // Check if dark mode is preferred
  static prefersDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Convert rem to pixels
  static remToPx(rem) {
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return rem * fontSize;
  }

  // Convert pixels to rem
  static pxToRem(px) {
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return px / fontSize;
  }

  // Local storage utilities
  static storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('LocalStorage not available:', e);
      }
    },

    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn('Error getting from localStorage:', e);
        return defaultValue;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('Error removing from localStorage:', e);
      }
    },

    clear() {
      try {
        localStorage.clear();
      } catch (e) {
        console.warn('Error clearing localStorage:', e);
      }
    }
  };

  // URL utilities
  static url = {
    getParams() {
      return new URLSearchParams(window.location.search);
    },

    getParam(name) {
      return this.getParams().get(name);
    },

    setParam(name, value) {
      const params = this.getParams();
      params.set(name, value);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    },

    removeParam(name) {
      const params = this.getParams();
      params.delete(name);
      const newUrl = params.toString() ? 
        `${window.location.pathname}?${params.toString()}` : 
        window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  };

  // Animation utilities
  static animation = {
    fadeIn(element, duration = 300) {
      element.style.opacity = '0';
      element.style.display = 'block';
      
      const start = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          element.style.opacity = progress;
          requestAnimationFrame(animate);
        } else {
          element.style.opacity = '1';
        }
      };
      
      requestAnimationFrame(animate);
    },

    fadeOut(element, duration = 300, hideAfter = true) {
      const start = performance.now();
      const startOpacity = parseFloat(getComputedStyle(element).opacity);
      
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          element.style.opacity = startOpacity * (1 - progress);
          requestAnimationFrame(animate);
        } else {
          element.style.opacity = '0';
          if (hideAfter) {
            element.style.display = 'none';
          }
        }
      };
      
      requestAnimationFrame(animate);
    },

    slideDown(element, duration = 300) {
      element.style.display = 'block';
      element.style.height = '0';
      element.style.overflow = 'hidden';
      
      const targetHeight = element.scrollHeight;
      const start = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          element.style.height = `${targetHeight * progress}px`;
          requestAnimationFrame(animate);
        } else {
          element.style.height = '';
          element.style.overflow = '';
        }
      };
      
      requestAnimationFrame(animate);
    },

    slideUp(element, duration = 300, hideAfter = true) {
      const startHeight = element.offsetHeight;
      const start = performance.now();
      
      element.style.overflow = 'hidden';
      
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          element.style.height = `${startHeight * (1 - progress)}px`;
          requestAnimationFrame(animate);
        } else {
          element.style.height = '0';
          if (hideAfter) {
            element.style.display = 'none';
          }
          element.style.overflow = '';
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  // Performance utilities
  static performance = {
    // Measure function execution time
    measure(fn, name = 'Function') {
      const start = performance.now();
      const result = fn();
      const end = performance.now();
      console.log(`${name} took ${end - start} milliseconds`);
      return result;
    },

    // Create a performance observer
    observe(entryTypes = ['measure']) {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log(`${entry.name}: ${entry.duration}ms`);
          });
        });
        
        observer.observe({ entryTypes });
        return observer;
      }
    }
  };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
} else {
  window.Utils = Utils;
}
