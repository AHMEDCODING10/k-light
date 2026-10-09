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
    v1: { title: "Ithraa Film", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1205106284", type: "video", waText: "مرحباً، أود الاستفسار عن فيلم مشابه لـ Ithraa Film" },
    v2: { title: "Big time", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1197176977", type: "video", waText: "مرحباً، أود الاستفسار عن فيديو مشابه لـ Big time" },
    v3: { title: "EMKAN", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1197176976", type: "video", waText: "مرحباً، أود الاستفسار عن فيديو مشابه لـ EMKAN" },
    v4: { title: "AlNasser", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1197176974", type: "video", waText: "مرحباً، أود الاستفسار عن فيديو مشابه لـ AlNasser" },
    v5: { title: "بودكاست خذ وخل.", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1199522722", type: "video", waText: "مرحباً، أود الاستفسار عن تصوير بودكاست" },
    v6: { title: "SIF- RECAP", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1204273789", type: "video", waText: "مرحباً، أود الاستفسار عن فيديو مشابه لـ SIF- RECAP" },
    v7: { title: "Kudu SS - Film3 - Final", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1199535534", type: "video", waText: "مرحباً، أود الاستفسار عن فيديو إعلاني مشابه لـ Kudu" },
    v8: { title: "Kudu SS - Film2 - Final", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1199523919", type: "video", waText: "مرحباً، أود الاستفسار عن فيديو إعلاني مشابه لـ Kudu" },
    v9: { title: "sprots", client: "كي لايت", category: "إنتاج سينمائي", vimeoId: "1197176975", type: "video", waText: "مرحباً، أود الاستفسار عن فيديو رياضي" },
    img1: {
      title: "تصوير احترافي - 1",
      client: "أعمال كي لايت",
      category: "إعلانات",
      img: "images/studio/studio_img_1.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img2: {
      type: "image",
    },
    img3: {
      title: "تصوير احترافي - 3",
      client: "أعمال كي لايت",
      category: "فعاليات",
      img: "images/studio/studio_img_3.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img4: {
      title: "تصوير احترافي - 4",
      client: "أعمال كي لايت",
      category: "إعلانات",
      img: "images/studio/studio_img_4.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img5: {
      title: "تصوير احترافي - 5",
      client: "أعمال كي لايت",
      category: "منتجات",
      img: "images/studio/studio_img_5.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img6: {
      title: "تصوير احترافي - 6",
      client: "أعمال كي لايت",
      category: "فعاليات",
      img: "images/studio/studio_img_6.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img7: {
      title: "تصوير احترافي - 7",
      client: "أعمال كي لايت",
      category: "إعلانات",
      img: "images/studio/studio_img_7.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img8: {
      title: "تصوير احترافي - 8",
      client: "أعمال كي لايت",
      category: "منتجات",
      img: "images/studio/studio_img_8.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img9: {
      title: "تصوير احترافي - 9",
      client: "أعمال كي لايت",
      category: "فعاليات",
      img: "images/studio/studio_img_9.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img10: {
      title: "تصوير احترافي - 10",
      client: "أعمال كي لايت",
      category: "إعلانات",
      img: "images/studio/studio_img_10.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img11: {
      title: "تصوير احترافي - 11",
      client: "أعمال كي لايت",
      category: "منتجات",
      img: "images/studio/studio_img_11.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img12: {
      title: "تصوير احترافي - 12",
      client: "أعمال كي لايت",
      category: "فعاليات",
      img: "images/studio/studio_img_12.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img13: {
      title: "تصوير احترافي - 13",
      client: "أعمال كي لايت",
      category: "إعلانات",
      img: "images/studio/studio_img_13.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
    img14: {
      title: "تصوير احترافي - 14",
      client: "أعمال كي لايت",
      category: "منتجات",
      img: "images/studio/studio_img_14.webp",
      type: "image",
      waText: "مرحباً، نود طلب جلسة تصوير مشابهة."
    },
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
  const modalContactLink = document.getElementById('lightbox-contact-link');

  // Open Modal
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const data = portfolioData[id];
      if (!data) return;

      // Display Video or Image based on type
      if (data.type === 'video' && data.vimeoId) {
        modalTitle.textContent = data.title;
        modalClient.textContent = data.client;
        modalBadge.textContent = data.category;
        
        lightboxVideoWrapper.style.display = 'block';
        lightboxImageWrapper.style.display = 'none';
        // Vimeo iframe src with autoplay
        lightboxIframe.src = `https://player.vimeo.com/video/${data.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
      } else {
        const titleEl = card.querySelector('.card-title-text');
        const clientEl = card.querySelector('.card-client-tag');
        const badgeEl = card.querySelector('.glass-badge'); // first badge is category
        
        if (titleEl) modalTitle.textContent = titleEl.textContent;
        if (clientEl) modalClient.textContent = clientEl.textContent;
        if (badgeEl) modalBadge.textContent = badgeEl.textContent;

        lightboxVideoWrapper.style.display = 'none';
        lightboxImageWrapper.style.display = 'block';
        lightboxImg.src = card.querySelector('img').src;
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
  if (modalContactLink) {
    modalContactLink.addEventListener('click', () => {
      closeModal(); // Smooth scroll will be handled by the anchor href="#contact"
    });
  }
  
  modal.addEventListener('click', (e) => {
    // Close if clicking outside content
    if (e.target === modal || e.target.classList.contains('lightbox-dialog')) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}
