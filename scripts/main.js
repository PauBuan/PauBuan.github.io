// Main Application JavaScript
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.initTheme();
    this.handlePageLoad();
  }

  setupEventListeners() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.initNavigation();
      this.initScrollEffects();
      this.initAnimations();
      this.initPortfolioFilter();
      this.initContactForm();
      this.initProjectModals();
      this.initThemeToggle();
    });

    // Window events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 100));
  }

  initializeComponents() {
    // Initialize component modules
    this.navigation = new Navigation();
    this.portfolio = new Portfolio();
    this.animations = new Animations();
    this.theme = new ThemeManager();
  }

  initTheme() {
    // Initialize theme based on saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPreference;
    
    document.documentElement.setAttribute('data-theme', initialTheme);
  }

  initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    // Update icons based on current theme
    this.updateThemeIcons();
    
    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    this.updateThemeIcons();
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  updateThemeIcons() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  handlePageLoad() {
    // Remove loading state and trigger entrance animations
    setTimeout(() => {
      document.body.classList.add('loaded');
      this.triggerEntranceAnimations();
    }, 100);
  }

  initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.navbar__link, .mobile-menu__link');

    // Mobile menu toggle
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked'); // Debug log
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Update aria-expanded for accessibility
        const isExpanded = mobileMenu.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenuToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Close mobile menu if open
          mobileMenuToggle?.classList.remove('active');
          mobileMenu?.classList.remove('active');
          document.body.classList.remove('menu-open');
          
          // Smooth scroll to target
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update active nav link
          this.updateActiveNavLink(targetId);
        }
      });
    });
  }

  initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Update active navigation
          const sectionId = '#' + entry.target.id;
          this.updateActiveNavLink(sectionId);
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
  }

  initAnimations() {
    // Stagger animations for elements
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    
    animatedElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
    });
  }

  initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          const categories = card.dataset.category?.split(',') || [];
          
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  initContactForm() {
    // Future implementation for contact form
    console.log('Contact form initialized');
  }

  initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger on button clicks
        if (e.target.closest('a') || e.target.closest('button')) return;
        
        // Future modal implementation
        console.log('Project modal would open here');
      });
    });
  }

  handleScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    // Add scrolled class to navbar
    if (scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    
    // Parallax effects
    this.handleParallax(scrollY);
  }

  handleParallax(scrollY) {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  handleResize() {
    // Handle window resize events
    console.log('Window resized');
  }

  updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.navbar__link, .mobile-menu__link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }

  triggerEntranceAnimations() {
    // Trigger staggered entrance animations
    const elements = document.querySelectorAll('.animate-on-load');
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 100);
    });
  }

  // Utility function for throttling
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
}

// Navigation Component
class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.logo = document.querySelector('.navbar__logo');
    this.init();
  }

  init() {
    this.addLogoAnimation();
  }

  addLogoAnimation() {
    if (this.logo) {
      setTimeout(() => {
        this.logo.classList.add('visible');
      }, 200);
    }
  }
}

// Portfolio Component
class Portfolio {
  constructor() {
    this.projects = [];
    this.init();
  }

  init() {
    this.loadProjects();
  }

  loadProjects() {
    // Project data would normally come from an API or CMS
    this.projects = [
      {
        id: 1,
        title: "4 Pictures 1 Word",
        description: "A fun word guessing game built with C# and game development frameworks.",
        image: "./assets/4p.png",
        category: ["game", "csharp"],
        status: "completed",
        links: {
          demo: "https://drive.google.com/file/d/1VPiqLuKEfBSsX31exRcd7ezJM-cajD2O/view?usp=sharing"
        }
      },
      {
        id: 2,
        title: "Neon Sprint",
        description: "A fast-paced neon-styled racing game with dynamic lighting effects.",
        image: "./assets/neonsprint.png",
        category: ["game", "csharp"],
        status: "completed",
        links: {
          demo: "https://drive.google.com/file/d/165JfdJZa-MlV4eaFCqEgkILlwo78IwwA/view?usp=sharing"
        }
      },
      {
        id: 3,
        title: "MerchQuest",
        description: "A prototype e-commerce game combining shopping with adventure elements.",
        image: "./assets/mqicon.png",
        category: ["game", "prototype"],
        status: "prototype",
        links: {
          demo: "https://drive.google.com/file/d/1a3RdX8w_OlI-ufOwliU7yDMozlWPpCe2/view?usp=sharing"
        }
      },
      {
        id: 4,
        title: "ParkPeek Parking Management System",
        description: "A comprehensive parking management system with three integrated applications.",
        image: "./assets/caricon.png",
        category: ["mobile", "web", "system"],
        status: "completed",
        links: {
          admin: "https://github.com/dsmbrnLois/ParkPeek_Admin-V",
          user: "https://github.com/PauBuan/ParkPeekApp/tree/branch-2",
          guard: "https://github.com/ejellana/ParkPeek-Guard"
        }
      },
      {
        id: 5,
        title: "Heart Disease Prediction System",
        description: "A comprehensive health prediction system with ML capabilities for web and Android.",
        image: "./assets/dataset-cover.jpg",
        category: ["mobile", "web", "ai", "health"],
        status: "completed",
        links: {
          ktor: "https://github.com/PauBuan/heartriskdetectionandroidapi",
          android: "https://github.com/PauBuan/heartdiseasepredictionandroid",
          flask: "https://github.com/ejellana/Heart-RiskDetection/tree/dm"
        }
      }
    ];
  }
}

// Animations Component
class Animations {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, options);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right').forEach(el => {
      observer.observe(el);
    });
  }
}

// Easter Egg Function (keeping the original fun element)
function playSurprise() {
  const button = document.querySelector('.navbar__special-btn');
  if (button) {
    button.textContent = "You found it! 🎉";
    button.disabled = true;
    
    // Play sound if available
    const audio = document.getElementById('surpriseAudio');
    if (audio) {
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Show gif animation
    const surpriseContainer = document.getElementById('surpriseContainer');
    if (surpriseContainer) {
      surpriseContainer.classList.remove('hidden');
      setTimeout(() => {
        surpriseContainer.classList.add('hidden');
        button.textContent = "Don't Click! 🎉";
        button.disabled = false;
      }, 5000);
    }
  }
}

// Theme Manager Class
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.loadTheme();
    this.setupSystemThemeListener();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Use system preference
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', systemPreference);
    }
  }

  setupSystemThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        // Only follow system if user hasn't set a preference
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    return newTheme;
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }
}

// Initialize the portfolio app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

function createConfetti() {
  const colors = ['#DC143C', '#FF69B4', '#FFD700', '#32CD32', '#87CEEB'];
  const confettiContainer = document.createElement('div');
  confettiContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}%;
        animation: confettiFall 3s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      confettiContainer.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }, i * 50);
  }
  
  setTimeout(() => confettiContainer.remove(), 4000);
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Expose functions globally for HTML onclick handlers
window.playSurprise = playSurprise;
