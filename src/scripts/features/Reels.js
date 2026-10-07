
export function initReels() {
  const reelCards = document.querySelectorAll('.reel-card');
  const videoModal = document.getElementById('video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const player = document.getElementById('modal-video-player');

  if (!videoModal || !player) return;

  reelCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-video');
      if (src) {
        player.src = src;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        player.play().catch(e => console.log('Autoplay prevented', e));
      }
    });
  });

  const closeModal = () => {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    player.pause();
    player.src = '';
  };

  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeModal);
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) closeModal();
  });
}
