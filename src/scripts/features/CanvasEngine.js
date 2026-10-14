import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCanvasEngine(lenis) {
  const canvas = document.getElementById('bg-cinema-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  const totalFrames = 240;
  const images = new Array(totalFrames).fill(null);
  const pendingLoads = new Set();
  const animObj = { frame: 0 };
  let currentDrawnIndex = -1;
  let dpr = window.devicePixelRatio || 1;

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
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }
  };

  const drawFrame = (frameIndex) => {
    const idx = Math.max(0, Math.min(Math.round(frameIndex), totalFrames - 1));
    let img = images[idx];
    
    // Fallback if current frame is not ready: find closest available loaded frame
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

  const loadFrame = (i) => {
    if (images[i] || pendingLoads.has(i)) return Promise.resolve();
    pendingLoads.add(i);

    return new Promise((resolve) => {
      const img = new Image();
      img.src = getFramePath(i);
      
      const onReady = () => {
        images[i] = img;
        pendingLoads.delete(i);
        if (i === 0 && currentDrawnIndex === -1) requestFrameDraw(0);
        resolve();
      };

      img.onload = () => {
        if (img.decode) {
          img.decode().then(onReady).catch(onReady);
        } else {
          onReady();
        }
      };
      img.onerror = () => {
        pendingLoads.delete(i);
        resolve();
      };
    });
  };

  // High performance windowed loading: only loads frames relevant to current scroll region
  const loadFrameWindow = (centerIdx) => {
    const start = Math.max(0, centerIdx - 2);
    const end = Math.min(totalFrames - 1, centerIdx + 6);
    for (let i = start; i <= end; i++) {
      if (!images[i] && !pendingLoads.has(i)) {
        loadFrame(i);
      }
    }
  };

  let isTicking = false;
  let targetFrameIndex = 0;

  const requestFrameDraw = (frameIndex) => {
    targetFrameIndex = Math.max(0, Math.min(Math.round(frameIndex), totalFrames - 1));
    loadFrameWindow(targetFrameIndex);
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(() => {
        drawFrame(targetFrameIndex);
        isTicking = false;
      });
    }
  };

  let cachedMaxScroll = 0;
  const updateMaxScroll = () => {
    cachedMaxScroll = (document.documentElement.scrollHeight || 0) - window.innerHeight;
  };

  const updateFrameOnScroll = () => {
    if (cachedMaxScroll <= 0) updateMaxScroll();
    if (cachedMaxScroll <= 0) {
      requestFrameDraw(0);
      return;
    }
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const progress = Math.max(0, Math.min(1, scrollY / cachedMaxScroll));
    const targetFrame = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
    requestFrameDraw(targetFrame);
  };

  // Preload sparse skeleton keyframes only during browser idle time (zero impact on initial load)
  const preloadSparseSkeleton = () => {
    const skeleton = [24, 48, 72, 96, 120, 144, 168, 192, 216, 239];
    let sIdx = 0;
    const loadNext = () => {
      if (sIdx >= skeleton.length) return;
      loadFrame(skeleton[sIdx++]).then(() => {
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(loadNext, { timeout: 1000 });
        } else {
          setTimeout(loadNext, 400);
        }
      });
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(loadNext, { timeout: 3000 });
    } else {
      setTimeout(loadNext, 3000);
    }
  };

  // 1. Immediately load frame 0 for instant visual banner
  loadFrame(0).then(() => {
    requestFrameDraw(0);
    setTimeout(preloadSparseSkeleton, 6000);
  });

  if (lenis) {
    lenis.on('scroll', () => {
      updateFrameOnScroll();
    });
  }

  gsap.to(animObj, {
    frame: totalFrames - 1,
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      scrub: 0.05,
      onUpdate: () => requestFrameDraw(animObj.frame)
    }
  });

  window.addEventListener('scroll', updateFrameOnScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateMaxScroll();
    resizeCanvas();
    requestFrameDraw(animObj.frame || 0);
    ScrollTrigger.refresh();
  }, { passive: true });

  resizeCanvas();
  requestFrameDraw(0);

  // Defer ScrollTrigger.refresh until after page load/idle to avoid forced reflow during critical rendering
  const onPageReady = () => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        updateMaxScroll();
        ScrollTrigger.refresh();
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        updateMaxScroll();
        ScrollTrigger.refresh();
      }, 1000);
    }
  };

  if (document.readyState === 'complete') {
    onPageReady();
  } else {
    window.addEventListener('load', onPageReady, { once: true });
  }
}
