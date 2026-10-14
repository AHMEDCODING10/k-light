// Import Styles
import './styles/main.css';

// Import Core and Features
import { initCoreEngine } from './scripts/core/App.js';
import { initCanvasEngine } from './scripts/features/CanvasEngine.js';
import { initPortfolio } from './scripts/features/Portfolio.js';
import { initNavigation } from './scripts/features/Navigation.js';
import { initInteractions } from './scripts/features/Interactions.js';
import { initLanguageSwitcher } from './scripts/features/LanguageSwitcher.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Core Engine (Lenis & GSAP)
  const lenis = initCoreEngine();

  // 2. Initialize Cinematic Background (Canvas Sequence)
  initCanvasEngine(lenis);

  // 3. Initialize Interactive Components
  initPortfolio();
  initNavigation();
  initInteractions();
  initLanguageSwitcher();

  // 4. Defer non-critical external icon fonts to keep initial mobile payload under 170KB
  const loadFontAwesome = () => {
    if (document.getElementById('fa-cdn-css')) return;
    const l = document.createElement('link');
    l.id = 'fa-cdn-css';
    l.rel = 'stylesheet';
    l.href = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css';
    document.head.appendChild(l);
  };
  window.addEventListener('scroll', loadFontAwesome, { once: true, passive: true });
  window.addEventListener('touchstart', loadFontAwesome, { once: true, passive: true });
  window.addEventListener('pointerdown', loadFontAwesome, { once: true, passive: true });
  setTimeout(loadFontAwesome, 4500);
});

