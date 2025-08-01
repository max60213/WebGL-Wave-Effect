"use client"

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// 自定義 shader 代碼
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;

void main() {
    // 創建四角漸層效果
    vec3 color1 = vec3(0.0, 1.0, 0.0); // 綠色 (左上)
    vec3 color2 = vec3(1.0, 1.0, 0.0); // 黃色 (右上)
    vec3 color3 = vec3(0.0, 0.0, 0.0); // 黑色 (左下)
    vec3 color4 = vec3(1.0, 0.0, 0.0); // 紅色 (右下)
    
    // 使用 UV 座標進行插值
    vec3 topColor = mix(color1, color2, vUv.x);
    vec3 bottomColor = mix(color3, color4, vUv.x);
    vec3 finalColor = mix(topColor, bottomColor, vUv.y);
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let size = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      // 初始化場景
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
      camera.position.z = 2;

      // 創建自定義材質
      const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      // 創建平面幾何體
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // 創建渲染器
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(size.width, size.height);
      containerRef.current?.appendChild(renderer.domElement);

      // 渲染場景
      renderer.render(scene, camera);

      // 清理函數
      return () => {
        containerRef.current?.removeChild(renderer.domElement);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default ThreeScene;