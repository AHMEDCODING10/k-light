// Import Styles
import './styles/main.css';

// Import Core and Features
import { initCoreEngine } from './scripts/core/App.js';
import { initPortfolio } from './scripts/features/Portfolio.js';
import { initNavigation } from './scripts/features/Navigation.js';
import { initReels } from './scripts/features/Reels.js';
import { initInteractions } from './scripts/features/Interactions.js';
import { initLanguageSwitcher } from './scripts/features/LanguageSwitcher.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Core Engine (Lenis & GSAP)
  const lenis = initCoreEngine();

  // Removed CanvasEngine logic

  // 3. Initialize Interactive Components
  initPortfolio();
  initNavigation();
  initReels();
  initInteractions();
  initLanguageSwitcher();
});
