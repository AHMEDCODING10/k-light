import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCanvasEngine(lenis) {
  const canvas = document.getElementById('bg-cinema-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const totalFrames = 240;
  const images = [];
  const animObj = { frame: 0 };
  let currentDrawnIndex = -1;

  const getFramePath = (idx) => {
    const num = (idx + 1).toString().padStart(3, '0');
    // Using absolute path from root assuming fr is in public or root
    return `/fr/ffout${num}.webp`;
  };

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  const drawFrame = (frameIndex) => {
    const idx = Math.max(0, Math.min(Math.round(frameIndex), totalFrames - 1));
    let img = images[idx];
    
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let b = idx - 1; b >= 0; b--) {
        if (images[b] && images[b].complete && images[b].naturalWidth > 0) {
          img = images[b];
          break;
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let f = idx + 1; f < totalFrames; f++) {
          if (images[f] && images[f].complete && images[f].naturalWidth > 0) {
            img = images[f];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    ctx.fillStyle = '#1E0E28';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    
    let ratio, cx, cy;

    if (canvas.height > canvas.width) {
      ratio = Math.max(hRatio * 1.1, Math.min(vRatio * 0.72, hRatio * 1.35));
      cx = (canvas.width - img.width * ratio) / 2;
      cy = (canvas.height - img.height * ratio) * 0.45;
    } else {
      ratio = Math.max(hRatio, vRatio);
      cx = (canvas.width - img.width * ratio) / 2;
      cy = (canvas.height - img.height * ratio) / 2;
    }

    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    currentDrawnIndex = idx;
  };

  let isTicking = false;
  let targetFrameIndex = 0;

  const requestFrameDraw = (frameIndex) => {
    targetFrameIndex = Math.max(0, Math.min(Math.round(frameIndex), totalFrames - 1));
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(() => {
        drawFrame(targetFrameIndex);
        isTicking = false;
      });
    }
  };

  const updateFrameOnScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      requestFrameDraw(0);
      return;
    }
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
    const targetFrame = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
    requestFrameDraw(targetFrame);
  };

  // Performance improvement: Load first 15 frames immediately, then load the rest asynchronously
  const loadFrame = (i) => {
    const img = new Image();
    img.src = getFramePath(i);
    img.onload = () => {
      if (i === 0 && currentDrawnIndex === -1) requestFrameDraw(0);
    };
    images[i] = img;
  };

  for (let i = 0; i < Math.min(15, totalFrames); i++) loadFrame(i);
  
  // Defer loading remaining frames to avoid blocking initial render
  setTimeout(() => {
    for (let i = 15; i < totalFrames; i++) loadFrame(i);
  }, 1000);

  if (lenis) {
    lenis.on('scroll', updateFrameOnScroll);
  }

  gsap.to(animObj, {
    frame: totalFrames - 1,
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      scrub: 0.12,
      onUpdate: () => requestFrameDraw(animObj.frame)
    }
  });

  window.addEventListener('scroll', updateFrameOnScroll, { passive: true });
  window.addEventListener('resize', () => {
    resizeCanvas();
    requestFrameDraw(animObj.frame || 0);
    ScrollTrigger.refresh();
  });

  resizeCanvas();
  requestFrameDraw(0);
  setTimeout(() => {
    ScrollTrigger.refresh();
    updateFrameOnScroll();
  }, 350);
}
