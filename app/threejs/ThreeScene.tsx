"use client"

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { getLenis } from '../lib/lenis';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    let geometry: THREE.PlaneGeometry;

    let material: THREE.ShaderMaterial;

    let size = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    let webglImages: {
      imageMesh: THREE.Mesh;
      imageMaterial: THREE.ShaderMaterial;
      image: Element;
    }[] = [];

    // init
    camera = new THREE.PerspectiveCamera(50, size.width / size.height, 100, 1000);
    camera.position.z = 500;
    camera.fov = (180 * (2 * Math.atan(window.innerHeight / 2 / 500))) / Math.PI;

    scene = new THREE.Scene();

    geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        time: { value: 0 }
      }
    });


    const setMediaSize = () => {

      const images = [...document.querySelectorAll('[data-webgl-media]')];

      const imageGeo = new THREE.PlaneGeometry(1, 1, 30, 30);

      webglImages = images.map((image, index) => {
        const { width, height, top, left } = (image as HTMLImageElement).getBoundingClientRect();

        (image as HTMLElement).style.opacity = "0";

        // 處理 Next.js Image 組件和普通 img 標籤
        const imageSrc = (image as HTMLImageElement).src;
        let originalSrc = imageSrc;

        // 如果是 Next.js Image 組件（包含 _next/image）
        if (imageSrc.includes('_next/image')) {
          const url = new URL(imageSrc);
          originalSrc = url.searchParams.get('url') || imageSrc;
        }

        // 移除域名部分，只保留路徑
        originalSrc = originalSrc.replace(/^https?:\/\/[^\/]+/, '');

        // 先創建一個空的 texture
        const texture = new THREE.Texture();

        const imageMaterial = new THREE.ShaderMaterial({
          vertexShader: vertex,
          fragmentShader: fragment,
          uniforms: {
            time: { value: 0 },
            uTexture: { value: texture },
          },
        });

        // 載入 texture 並更新材質
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(originalSrc, (loadedTexture) => {
          console.log('Texture loaded successfully:', originalSrc);
          imageMaterial.uniforms.uTexture.value = loadedTexture;
          imageMaterial.needsUpdate = true;
        });

        const imageMesh = new THREE.Mesh(imageGeo, imageMaterial);
        imageMesh.scale.set(width, height, 1);
        imageMesh.position.x = left - size.width / 2 + width / 2;
        imageMesh.position.y = -(top - size.height / 2) - height / 2;
        scene.add(imageMesh);

        return {
          imageMesh,
          imageMaterial,
          image,
        }
      })
    }

    setMediaSize();

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size.width, size.height);
    renderer.setAnimationLoop(animate);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current?.appendChild(renderer.domElement);


    window.addEventListener("resize", () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;
      renderer.setSize(size.width, size.height);
      camera.aspect = size.width / size.height;

      webglImages.forEach((object) => {
        const { width, height, top, left } = object.image.getBoundingClientRect();

        object.imageMesh.scale.set(width, height, 1);
        object.imageMesh.position.x = left - size.width / 2 + width / 2;
        object.imageMesh.position.y = -(top - size.height / 2) - height / 2;
      });
      camera.updateProjectionMatrix();
    });

    // 等待 Lenis 初始化完成後再註冊事件
    const setupLenisScroll = () => {
      const lenis = getLenis();
      console.log('Lenis instance:', lenis);

      if (lenis) {
        lenis.on('scroll', (e: any) => {
          console.log('Scroll position:', e.scroll);
          webglImages.forEach((object) => {
            const { top, height, width } = object.image.getBoundingClientRect();
            object.imageMesh.position.y = -(top - size.height / 2) - height / 2;
            object.imageMesh.scale.set(width, height, 1);
          });
        });
      }
    };

    // 延遲一點時間確保 Lenis 已經初始化
    setTimeout(setupLenisScroll, 10);

    camera.updateProjectionMatrix();

    function animate(time: number) {

      webglImages.forEach((object) => {
        object.imageMaterial.uniforms.time.value = time / 1000;

      });

      material.uniforms.time.value = time / 1000;

      renderer.render(scene, camera);
    }

  }, []);
  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
};
export default ThreeScene;