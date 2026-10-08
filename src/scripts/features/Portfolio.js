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
  // Note: Add real Vimeo IDs from vimeo.com/user220225516 here
  const portfolioData = {
    cars: {
      title: "إعلان إطلاق فئة سيارات رياضية فاخرة",
      client: "شركة المحركات الملكية",
      category: "إعلان تجاري",
      vimeoId: "76979871", // Placeholder - replace with real ID
      type: "video",
      waText: "مرحباً، نود استشارة حول إنتاج إعلان سيارات."
    },
    watches: {
      title: "حملة الساعات الذكية والتيتانيوم المصقول",
      client: "علامة أورورا للتكنولوجيا الفاخرة",
      category: "تصوير منتجات",
      vimeoId: "336812660", // Placeholder
      type: "video",
      waText: "مرحباً، أود الاستفسار عن حملة تصوير منتجات فاخرة وساعات مع كي لايت"
    },
    perfumes: {
      title: "إعلان عطري فخم (The Royal Fragrance)",
      client: "دار النخبة للعطور • الرياض",
      category: "إعلان تجاري",
      vimeoId: "253989945", // Placeholder
      type: "video",
      waText: "مرحباً أستاذ أيمن، أود الاستفسار عن تفاصيل وتكلفة إنتاج إعلان سينمائي فاخر للعطور والمنتجات"
    },
    perfume_majestic: {
      title: "عطور ماجستيك - الإطلاق الرسمي",
      client: "شركة ماجستيك للعطور",
      category: "تصوير منتجات",
      vimeoId: "317769532", // Placeholder
      type: "video",
      waText: "مرحباً، أود طلب جلسة تصوير عطور فاخرة."
    },
    vimto: {
      title: "حملة مشروب فيمتو الرمضانية",
      client: "مشروبات فيمتو",
      category: "تصوير منتجات",
      vimeoId: "336812660", // Placeholder
      type: "video",
      waText: "مرحباً، لدينا حملة رمضانية للمشروبات والأغذية ونرغب في التعاون."
    },
    cream: {
      title: "تصوير منتجات العناية بالبشرة",
      client: "علامة تجميل عالمية",
      category: "تصوير منتجات",
      vimeoId: "76979871", // Placeholder
      type: "video",
      waText: "مرحباً، نود الاستفسار عن تصوير منتجات التجميل والعناية بالبشرة."
    },
    products: {
      title: "تغطية شاملة لمنتجات متنوعة",
      client: "علامات تجارية متعددة",
      category: "تصوير منتجات",
      img: "images/products.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير تجارية شاملة لمنتجاتنا."
    },
    portrait: {
      title: "تصوير بورتريه سينمائي احترافي",
      client: "شخصيات عامة وقيادات",
      category: "فعاليات", 
      img: "images/portrait.webp",
      type: "image",
      waText: "مرحباً، أرغب في حجز جلسة تصوير بورتريه سينمائية خاصة."
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
