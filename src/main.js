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
});
