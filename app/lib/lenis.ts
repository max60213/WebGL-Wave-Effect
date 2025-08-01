import Lenis from 'lenis';

let lenis: Lenis | null = null;
let isInitializing = false;

export const initLenis = () => {
  if (typeof window === 'undefined') return null;
  if (lenis) return lenis; // 如果已經初始化，直接返回
  if (isInitializing) return null; // 如果正在初始化，返回 null

  isInitializing = true;

  // 初始化 Lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  // 使用 requestAnimationFrame 來更新滾動
  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  isInitializing = false;
  console.log('Lenis initialized successfully');
  return lenis;
};

export const getLenis = () => lenis;

export const destroyLenis = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  isInitializing = false;
}; 