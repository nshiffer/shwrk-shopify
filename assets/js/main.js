/* ============================================
   SHWRK — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);

      // Animate hamburger to X
      const bars = menuBtn.querySelectorAll('span');
      if (bars.length === 3) {
        bars[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
        bars[1].style.opacity = isOpen ? '0' : '1';
        bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
      }
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        // Close others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    }
  });

  // --- Scroll-triggered fade-in ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });

  // --- Active nav link ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('./', '').replace('../', ''))) {
      link.classList.add('active');
    }
  });
});
