import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCoreEngine() {
  // 1. Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Header State
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. ScrollSpy & Smooth Anchor Navigation
  const navAnchorLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  let isAutoScrolling = false;

  const updateActiveNavLink = () => {
    if (isAutoScrolling) return;
    
    let currentId = '';
    // Define the trigger line as 40% down from the top of the screen
    const triggerPoint = window.innerHeight * 0.4; 

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      // If the section crosses the trigger point, it's the active one
      if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
        currentId = sec.getAttribute('id');
      }
    });

    // Fallback: If user scrolled to the absolute bottom of the page, force the last section
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
      const lastSec = sections[sections.length - 1];
      if (lastSec) currentId = lastSec.getAttribute('id');
    }

    if (currentId) {
      let targetId = currentId;
      // Since video reels is part of portfolio, keep portfolio active
      if (targetId === 'reels') targetId = 'portfolio';

      const hasMatchingLink = Array.from(navAnchorLinks).some(link => link.getAttribute('href') === `#${targetId}`);
      
      if (hasMatchingLink) {
        navAnchorLinks.forEach(link => link.classList.remove('active'));
        navAnchorLinks.forEach(link => {
          if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
          }
        });
      }
    }
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        
        // Manually set active state immediately to avoid jumping
        navAnchorLinks.forEach(link => link.classList.remove('active'));
        if (this.classList.contains('mobile-item')) {
           // If it's mobile item, we might need to find the desktop counterpart to activate, or just let it be.
           navAnchorLinks.forEach(link => {
             if (link.getAttribute('href') === targetId) link.classList.add('active');
           });
        } else {
           this.classList.add('active');
        }

        isAutoScrolling = true;
        
        const headerH = header ? (header.offsetHeight || 75) : 75;
        const targetOffset = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH - 30;
        
        lenis.scrollTo(targetOffset, { 
          duration: 1.1,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }
    });
  });

  const scrollHint = document.querySelector('.scroll-hint-wrapper');
  if (scrollHint) {
    scrollHint.style.cursor = 'pointer';
    scrollHint.addEventListener('click', () => {
      const aboutSec = document.getElementById('about');
      if (aboutSec) {
        const headerH = header ? header.offsetHeight : 70;
        const targetOffset = aboutSec.getBoundingClientRect().top + window.pageYOffset - headerH - 15;
        lenis.scrollTo(targetOffset, { duration: 1.1 });
      }
    });
  }
  
  return lenis;
}
