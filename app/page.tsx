"use client";

import { useEffect } from "react";
import Gallery from "./home/Gallery";
import ThreeScene from "./threejs/ThreeScene";
import { initLenis } from "./lib/lenis";

const Home = () => {
  useEffect(() => {
    // 初始化 Lenis 平滑滾動
    const lenis = initLenis();
    
    // 清理函數
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <main>
      <ThreeScene />
      <Gallery />
    </main>
  );
};

export default Home;