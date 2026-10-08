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
    overlay.style.backgroundColor = '#0a050f';
    overlay.style.zIndex = '999999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.pointerEvents = 'none';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-film';
    icon.style.color = '#C9B37E';
    icon.style.fontSize = '3rem';
    icon.style.opacity = '0';
    icon.style.transform = 'scale(0.5)';
    overlay.appendChild(icon);
    
    document.body.appendChild(overlay);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.removeChild(overlay);
      }
    });

    // Wipe in
    tl.fromTo(overlay, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'expo.inOut' })
      .to(icon, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, "-=0.3")
      .call(() => {
        // Change language at the peak of the transition
        callback();
      })
      .to(icon, { opacity: 0, scale: 1.5, duration: 0.4, ease: 'power2.in' }, "+=0.2")
      .to(overlay, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' }, "-=0.2");
  }
}
