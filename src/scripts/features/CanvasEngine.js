import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCanvasEngine(lenis) {
  const canvas = document.getElementById('bg-cinema-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  const totalFrames = 240;
  const images = new Array(totalFrames).fill(null);
  const animObj = { frame: 0 };
  let currentDrawnIndex = -1;
  let dpr = window.devicePixelRatio || 1; // Full resolution (removed DPR cap)

  const getFramePath = (idx) => {
    const num = (idx + 1).toString().padStart(3, '0');
    return `/fr/ffout${num}.webp`;
  };

  const resizeCanvas = () => {
    dpr = window.devicePixelRatio || 1;
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      
      // Force high quality smoothing after resize
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }
  };

  const drawFrame = (frameIndex) => {
    const idx = Math.max(0, Math.min(Math.round(frameIndex), totalFrames - 1));
    let img = images[idx];
    
    // Fallback if current frame is not ready
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let b = idx - 1; b >= 0; b--) {
        if (images[b] && images[b].complete && images[b].naturalWidth > 0) { img = images[b]; break; }
      }
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let f = idx + 1; f < totalFrames; f++) {
          if (images[f] && images[f].complete && images[f].naturalWidth > 0) { img = images[f]; break; }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    // Draw background
    ctx.fillStyle = '#1E0E28';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    const hRatio = canvas.width / imgWidth;
    const vRatio = canvas.height / imgHeight;
    
    let ratio, cx, cy;

    if (canvas.height > canvas.width) {
      ratio = Math.max(hRatio * 1.1, Math.min(vRatio * 0.72, hRatio * 1.35));
      cx = (canvas.width - imgWidth * ratio) / 2;
      cy = (canvas.height - imgHeight * ratio) * 0.45;
    } else {
      ratio = Math.max(hRatio, vRatio);
      cx = (canvas.width - imgWidth * ratio) / 2;
      cy = (canvas.height - imgHeight * ratio) / 2;
    }

    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, cx, cy, imgWidth * ratio, imgHeight * ratio);
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

  // Safe, cross-browser high performance loading
  const loadFrame = (i) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = getFramePath(i);
      
      const onReady = () => {
        images[i] = img;
        if (i === 0 && currentDrawnIndex === -1) requestFrameDraw(0);
        resolve();
      };

      img.onload = () => {
        // Use async decoding if available (hardware acceleration off-thread)
        if (img.decode) {
          img.decode().then(onReady).catch(onReady);
        } else {
          onReady();
        }
      };
      
      img.onerror = () => {
        // Fallback or ignore
        resolve();
      };
    });
  };

  // Load priority frames (every 10th frame) for rapid rough scrolling
  const priorityLoad = async () => {
    const promises = [];
    for (let i = 0; i < totalFrames; i += 10) {
      promises.push(loadFrame(i));
    }
    await Promise.all(promises);
    
    // Load remaining frames
    for (let i = 0; i < totalFrames; i++) {
      if (!images[i]) loadFrame(i);
    }
  };

  priorityLoad();

  if (lenis) {
    lenis.on('scroll', updateFrameOnScroll);
  }

  gsap.to(animObj, {
    frame: totalFrames - 1,
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      scrub: 0.05, // Lower scrub value = tighter, faster response to scroll (more smoothness)
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
