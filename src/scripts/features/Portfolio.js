export function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-item-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  const portfolioData = {
    cars: {
      title: "إعلان إطلاق فئة سيارات رياضية فاخرة",
      client: "شركة المحركات الملكية",
      category: "إعلان تجاري",
      camera: "RED V-Raptor 8K + Ronin 2",
      lens: "Zeiss Supreme Primes",
      grade: "High-Contrast Desert Gold",
      location: "طريق الرياض - صحراء العلا",
      img: "images/cars.webp",
      desc: "إعلان حركي عالي السرعة (High-Speed Car Commercial) يجمع بين انقضاض طائرات الدرون FPV وكاميرات التتبع المتحركة مع صوت هدير المحرك المحيطي.",
      waText: "مرحباً، نود استشارة حول إنتاج إعلان سيارات أو حملة تصوير حركية مع طاقم كي لايت"
    },
    watches: {
      title: "حملة الساعات الذكية والتيتانيوم المصقول",
      client: "علامة أورورا للتكنولوجيا الفاخرة",
      category: "تصوير منتجات",
      camera: "ARRI Alexa Mini LF",
      lens: "Cooke Anamorphic Macro",
      grade: "Chrono-Blue Deep Contrast",
      location: "استوديوهات كي لايت - الرياض",
      img: "images/watches.webp",
      desc: "إبراز دقة التصنيع وهندسة المعدن المصقول والشاشة الكريستالية للساعة الذكية عبر إضاءات Astera لاسلكية متحركة ومؤثرات ضوئية تخطف الأبصار.",
      waText: "مرحباً، أود الاستفسار عن حملة تصوير منتجات فاخرة وساعات مع كي لايت"
    },
    perfumes: {
      title: "إعلان عطري فخم (The Royal Fragrance)",
      client: "دار النخبة للعطور • الرياض",
      category: "إعلان تجاري",
      camera: "RED V-Raptor 8K VV",
      lens: "Cooke Anamorphic /i 50mm",
      grade: "DaVinci Resolve Studio (ACES)",
      location: "استوديوهات كي لايت - الرياض",
      img: "images/perfumes.webp",
      desc: "تم تنفيذ هذا الإعلان برؤية سينمائية ملكية، مع التركيز على لقطات الماكرو الحركية فائقة النعومة لتدفق رذاذ العطر مع توزيع ضوء دراماتيكي يعكس هيبة العلامة.",
      waText: "مرحباً أستاذ أيمن، أود الاستفسار عن تفاصيل وتكلفة إنتاج إعلان سينمائي فاخر للعطور والمنتجات"
    },
    perfume_majestic: {
      title: "عطور ماجستيك - الإطلاق الرسمي",
      client: "شركة ماجستيك للعطور",
      category: "تصوير منتجات",
      camera: "Sony FX9 Cinema Line",
      lens: "Laowa 24mm Macro Probe",
      grade: "Warm Gold & Deep Shadows",
      location: "استوديو كي لايت - الرياض",
      img: "images/perfume_majestic.webp",
      desc: "تصوير تفاصيل زجاجة العطر وتطاير الرذاذ بسرعات بطيئة جداً باستخدام أحدث كاميرات التصوير السينمائي وإضاءات احترافية تبرز فخامة المنتج.",
      waText: "مرحباً، أود طلب جلسة تصوير عطور فاخرة."
    },
    vimto: {
      title: "حملة مشروب فيمتو الرمضانية",
      client: "مشروبات فيمتو",
      category: "تصوير منتجات",
      camera: "RED Komodo 6K",
      lens: "Sigma Cine Primes",
      grade: "Vibrant Ramadan Theme",
      location: "استوديوهات التصوير - الرياض",
      img: "images/vimto.webp",
      desc: "إعلان مبهج يعكس روحانية وفرحة شهر رمضان المبارك، مع تصوير احترافي لصب المشروب وانعكاسات الضوء الكريستالية على الكأس.",
      waText: "مرحباً، لدينا حملة رمضانية للمشروبات والأغذية ونرغب في التعاون."
    },
    cream: {
      title: "تصوير منتجات العناية بالبشرة",
      client: "علامة تجميل عالمية",
      category: "تصوير منتجات",
      camera: "ARRI Alexa Mini LF",
      lens: "Zeiss Supreme Primes",
      grade: "Soft Beauty Look",
      location: "الرياض",
      img: "images/cream.webp",
      desc: "إبراز النعومة والملمس الفاخر لمنتجات العناية بالبشرة عبر إضاءة ناعمة وظلال دافئة لتعكس نقاء وجمال المنتج.",
      waText: "مرحباً، نود الاستفسار عن تصوير منتجات التجميل والعناية بالبشرة."
    },
    products: {
      title: "تغطية شاملة لمنتجات متنوعة",
      client: "علامات تجارية متعددة",
      category: "تصوير منتجات",
      camera: "Sony FX6",
      lens: "Sony G-Master",
      grade: "Commercial High Key",
      location: "استوديوهات كي لايت",
      img: "images/products.webp",
      desc: "استعراض تفصيلي لخطوط إنتاج متعددة بتنسيق احترافي يعكس جودة الخامات والتصنيع لاستخدامات المتاجر الإلكترونية.",
      waText: "مرحباً، نود طلب جلسة تصوير تجارية شاملة لمنتجاتنا."
    },
    portrait: {
      title: "تصوير بورتريه سينمائي احترافي",
      client: "شخصيات عامة وقيادات",
      category: "فعاليات", 
      camera: "RED V-Raptor 8K VV",
      lens: "Cooke Anamorphic /i 85mm",
      grade: "Moody Cinematic Portrait",
      location: "الرياض",
      img: "images/portrait.webp",
      desc: "جلسات تصوير بورتريه سينمائية تبرز ملامح الشخصية وقوتها عبر إضاءة دراماتيكية وخلفيات معزولة ببراعة.",
      waText: "مرحباً، أرغب في حجز جلسة تصوير بورتريه سينمائية خاصة."
    }
  };

  const modal = document.getElementById('portfolio-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClient = document.getElementById('modal-client');
  const modalBadge = document.getElementById('modal-badge');
  const modalCamera = document.getElementById('modal-camera');
  const modalLens = document.getElementById('modal-lens');
  const modalGrade = document.getElementById('modal-grade');
  const modalLocation = document.getElementById('modal-location');
  const modalDesc = document.getElementById('modal-desc');
  const modalWaLink = document.getElementById('modal-wa-link');

  const modalPlayBtn = document.getElementById('modal-play-btn');
  const modalPlayIcon = document.getElementById('modal-play-icon');
  const modalPlayerBar = document.getElementById('modal-player-bar');
  const modalTimecode = document.getElementById('modal-timecode');
  let playerInterval = null;
  let isPlayingSim = false;
  let simProgress = 25;

  const startSim = () => {
    isPlayingSim = true;
    modalPlayIcon.className = 'fas fa-pause';
    if (playerInterval) clearInterval(playerInterval);

    playerInterval = setInterval(() => {
      simProgress += 0.8;
      if (simProgress > 100) simProgress = 0;
      modalPlayerBar.style.width = `${simProgress}%`;
      const s = Math.floor((simProgress / 100) * 45);
      modalTimecode.textContent = `00:${s.toString().padStart(2, '0')} / 00:45`;
    }, 100);
  };

  const stopSim = () => {
    isPlayingSim = false;
    modalPlayIcon.className = 'fas fa-play';
    if (playerInterval) clearInterval(playerInterval);
  };

  if (modalPlayBtn) {
    modalPlayBtn.addEventListener('click', () => {
      if (isPlayingSim) stopSim();
      else startSim();
    });
  }

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const data = portfolioData[id];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalClient.textContent = data.client;
      modalBadge.textContent = data.category;
      modalCamera.textContent = data.camera;
      modalLens.textContent = data.lens;
      modalGrade.textContent = data.grade;
      modalLocation.textContent = data.location;
      modalDesc.textContent = data.desc;
      modalImg.src = `/${data.img}`;

      modalWaLink.href = `https://wa.me/966532772825?text=${encodeURIComponent(data.waText)}`;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      simProgress = 15;
      startSim();
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    stopSim();
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}
