/**
 * Badge 8 - Foundational Javascript Controller
 * Configures the mobile menu, scroll-aware navigation states, intersection observers, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Accessibility & Motion Preferences Check
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = motionQuery.matches;

  motionQuery.addEventListener('change', (e) => {
    prefersReducedMotion = e.matches;
  });

  // 2. Mobile Navigation Toggle
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle states
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      body.classList.toggle('nav-menu-active');
    });

    // Close mobile menu when nav link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('open');
          body.classList.remove('nav-menu-active');
        }
      });
    });
  }

  // 3. Header Scroll State Controller (JS Fallback)
  // If CSS scroll-driven animations are supported, we let native CSS handle it.
  // Otherwise, we use this performant scroll listener to add the scrolled class.
  const hasCSSScrollTimeline = CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

  if (!hasCSSScrollTimeline && header) {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    // Throttle or debounce window scroll for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 16); // ~60fps evaluation throttle
      }
    }, { passive: true });

    // Initial check
    handleScroll();
  }

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    if (prefersReducedMotion) {
      // Instantly reveal all items if motion is reduced
      revealElements.forEach(el => el.classList.add('visible'));
    } else {
      const revealObserverOptions = {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% visible
        rootMargin: '0px 0px -80px 0px' // offset bottom trigger for subtle reveal lag
      };

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve once revealed to keep layout performant
            observer.unobserve(entry.target);
          }
        });
      }, revealObserverOptions);

      revealElements.forEach(el => revealObserver.observe(el));
    }
  }

  // 5. Active Link Highlight Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    const navObserverOptions = {
      root: null,
      threshold: 0.25, // Active when at least 25% is visible
      rootMargin: '-20% 0px -40% 0px' // Focused bounding box in middle screen
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));
  }
});
