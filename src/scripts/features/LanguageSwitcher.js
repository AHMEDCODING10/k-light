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
    overlay.style.backgroundColor = 'rgba(10, 5, 15, 0.3)'; // High transparency
    overlay.style.backdropFilter = 'blur(12px)';
    overlay.style.webkitBackdropFilter = 'blur(12px)';
    overlay.style.zIndex = '999999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-film';
    icon.style.color = 'rgba(201, 179, 126, 0.8)';
    icon.style.fontSize = '2.5rem';
    icon.style.opacity = '0';
    icon.style.transform = 'scale(0.8)';
    icon.style.filter = 'drop-shadow(0 0 10px rgba(201,179,126,0.5))';
    overlay.appendChild(icon);
    
    document.body.appendChild(overlay);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.removeChild(overlay);
      }
    });

    // Smooth, fast fade and scale
    tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      .to(icon, { opacity: 1, scale: 1.1, duration: 0.25, ease: 'back.out(2)' }, "-=0.15")
      .call(() => {
        // Change language at the peak of the transition
        callback();
      })
      .to(icon, { opacity: 0, scale: 1.3, duration: 0.2, ease: 'power2.in' }, "+=0.1")
      .to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.inOut' }, "-=0.1");
  }
}
