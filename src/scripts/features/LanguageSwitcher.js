import gsap from 'gsap';

// Dictionaries
import dictAr from '../../../dict_ar.json';
import dictEn from '../../../dict_en.json';

export function initLanguageSwitcher() {
  const langBtn = document.getElementById('lang-switch-btn');
  if (!langBtn) return;

  const currentLangText = langBtn.querySelector('.current-lang');
  const nextLangText = langBtn.querySelector('.next-lang');

  // Load saved lang from localStorage, default to 'ar'
  let currentLang = localStorage.getItem('klight-lang') || 'ar';
  
  // Initialize on load
  applyLanguage(currentLang, false);

  langBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('klight-lang', currentLang);
    
    // Cinematic Transition
    playCinematicTransition(() => {
      applyLanguage(currentLang, true);
    });
  });

  function applyLanguage(lang, animateContent) {
    const isEn = lang === 'en';
    const dict = isEn ? dictEn : dictAr;

    // Change Document attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';

    // Update button text
    currentLangText.textContent = isEn ? 'EN' : 'AR';
    nextLangText.textContent = isEn ? 'AR' : 'EN';
    
    // Adjust fonts and layout based on direction
    if (isEn) {
      document.body.style.fontFamily = "'Outfit', sans-serif";
    } else {
      document.body.style.fontFamily = "'Tajawal', sans-serif";
    }

    // Apply translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (dict[key]) {
        el.setAttribute('alt', dict[key]);
      }
    });

    if (animateContent) {
      // Small stagger animation on text to make it feel fresh
      gsap.from('[data-i18n]', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.005,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }
  }

  function playCinematicTransition(callback) {
    // Create an overlay div
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#050208'; // Solid dark instead of blur
    overlay.style.zIndex = '999999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    
    // Very minimal icon
    const icon = document.createElement('i');
    icon.className = 'fas fa-film';
    icon.style.color = '#C9B37E';
    icon.style.fontSize = '2.5rem';
    icon.style.opacity = '0';
    icon.style.transform = 'scale(0.8)';
    overlay.appendChild(icon);
    
    document.body.appendChild(overlay);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.removeChild(overlay);
      }
    });

    // Lightning fast fade
    tl.to(overlay, { opacity: 0.95, duration: 0.15, ease: 'power1.inOut' })
      .to(icon, { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' }, "-=0.05")
      .call(() => {
        // Change language instantly
        callback();
      })
      .to(icon, { opacity: 0, scale: 1.2, duration: 0.1, ease: 'power1.in' }, "+=0.05")
      .to(overlay, { opacity: 0, duration: 0.15, ease: 'power1.inOut' });
  }
}
