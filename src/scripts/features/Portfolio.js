export function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-item-card');

  // Filter Logic
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

  // Updated Portfolio Data with Vimeo IDs
  const portfolioData = {
    item1: {
      title: "تصوير وثائقي احترافي",
      client: "مشروع وثائقي",
      category: "فعاليات",
      vimeoId: "1084537",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن تصوير فيلم وثائقي."
    },
    item2: {
      title: "إعلان سيارات فارهة 8K",
      client: "وكالة سيارات عالمية",
      category: "إعلان تجاري",
      vimeoId: "336812660",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن إنتاج إعلان سيارات سينمائي."
    },
    item3: {
      title: "إعلان عطور (The Royal Fragrance)",
      client: "دار النخبة للعطور",
      category: "إعلان تجاري",
      vimeoId: "317769532",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن تفاصيل إنتاج إعلان عطور."
    },
    item4: {
      title: "تصوير جوي درون للمشاريع الكبرى",
      client: "شركة عقارية رائدة",
      category: "إعلان تجاري",
      vimeoId: "279361661",
      type: "video",
      waText: "مرحباً، نود الاستفسار عن التصوير الجوي للمشاريع."
    },
    item5: {
      title: "تصوير أطعمة سينمائي",
      client: "سلسلة مطاعم عالمية",
      category: "تصوير منتجات",
      vimeoId: "141930263",
      type: "video",
      waText: "مرحباً، نود طلب جلسة تصوير سينمائي للأطعمة."
    },
    item6: {
      title: "تغطية مهرجانات وفعاليات ضخمة",
      client: "تغطية احترافية",
      category: "فعاليات",
      vimeoId: "63319047",
      type: "video",
      waText: "مرحباً، نرغب في تغطية فعالية قادمة بطاقم سينمائي."
    },
    item7: {
      title: "إعلان ساعات تيتانيوم مصقولة",
      client: "علامة أورورا للساعات",
      category: "تصوير منتجات",
      vimeoId: "76979871",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن تصوير منتجات وساعات."
    },
    item8: {
      title: "فيلم سياحي ترويجي",
      client: "حملة سياحية",
      category: "فعاليات",
      vimeoId: "325852509",
      type: "video",
      waText: "مرحباً، نرغب في إنتاج فيديو سياحي ترويجي."
    },
    item9: {
      title: "تصوير أزياء وبورتريه سينمائي",
      client: "دار أزياء محلية",
      category: "تصوير منتجات",
      vimeoId: "253989945",
      type: "video",
      waText: "مرحباً، أرغب في حجز جلسة تصوير أزياء سينمائية."
    }
  };

  const modal = document.getElementById('portfolio-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const lightboxVideoWrapper = document.getElementById('lightbox-video-wrapper');
  const lightboxImageWrapper = document.getElementById('lightbox-image-wrapper');
  const lightboxIframe = document.getElementById('lightbox-iframe');
  const lightboxImg = document.getElementById('lightbox-img');
  
  const modalTitle = document.getElementById('lightbox-title');
  const modalClient = document.getElementById('lightbox-client');
  const modalBadge = document.getElementById('lightbox-badge');
  const modalWaLink = document.getElementById('lightbox-wa-link');

  // Open Modal
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const data = portfolioData[id];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalClient.textContent = data.client;
      modalBadge.textContent = data.category;
      modalWaLink.href = `https://wa.me/966532772825?text=${encodeURIComponent(data.waText)}`;

      // Display Video or Image based on type
      if (data.type === 'video' && data.vimeoId) {
        lightboxVideoWrapper.style.display = 'block';
        lightboxImageWrapper.style.display = 'none';
        // Vimeo iframe src with autoplay
        lightboxIframe.src = `https://player.vimeo.com/video/${data.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
      } else {
        lightboxVideoWrapper.style.display = 'none';
        lightboxImageWrapper.style.display = 'block';
        lightboxImg.src = `/${data.img}`;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Close Modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Stop video playback by clearing iframe src
    setTimeout(() => {
      lightboxIframe.src = '';
    }, 300); // Wait for transition
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    // Close if clicking outside content
    if (e.target === modal || e.target.classList.contains('lightbox-dialog')) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}
