"use client";

import { useEffect } from "react";
import { initLenis } from "../lib/lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return <>{children}</>;
} 