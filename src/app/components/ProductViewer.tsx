"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProductViewer() {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Đang tải mô hình 3D…");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current!;
    const abort = new AbortController();
    let disposed = false;
    let cleanup = () => {};

    async function init() {
      const [THREE, { OrbitControls }, { STLLoader }, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/addons/controls/OrbitControls.js"),
        import("three/addons/loaders/STLLoader.js"),
        import("three/addons/environments/RoomEnvironment.js"),
      ]);
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
      camera.position.set(0, 0.25, 3.5);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableDamping = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.65;
      controls.zoomSpeed = 0.45;
      controls.minPolarAngle = Math.PI * 0.2;
      controls.maxPolarAngle = Math.PI * 0.8;
      controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
      let resume: ReturnType<typeof setTimeout> | undefined;
      controls.addEventListener("start", () => {
        clearTimeout(resume);
        controls.autoRotate = false;
      });
      controls.addEventListener("end", () => {
        clearTimeout(resume);
        resume = setTimeout(() => { controls.autoRotate = true; }, 2500);
      });
      const environment = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const lighting = pmrem.fromScene(environment);
      scene.environment = lighting.texture;
      environment.dispose();
      pmrem.dispose();
      const material = new THREE.MeshStandardMaterial({ color: 0xd9aa48, metalness: 0.85, roughness: 0.3 });
      const resources: { geometry?: import("three").BufferGeometry } = {};
      let loaded = false;
      const resize = () => {
        const width = element.clientWidth;
        const height = element.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        // Fit the complete model at narrow mobile aspect ratios too.
        const distance = 1.2 / Math.sin(Math.atan(Math.tan(THREE.MathUtils.degToRad(19)) * Math.min(camera.aspect, 1)));
        camera.position.setLength(distance);
        controls.minDistance = distance * 0.8;
        controls.maxDistance = distance * 1.25;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      resize();
      let visible = true;
      const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      visibility.observe(element);
      let last = performance.now();
      renderer.setAnimationLoop((now) => {
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!loaded || !visible || document.hidden) return;
        controls.update(delta);
        renderer.render(scene, camera);
      });
      cleanup = () => {
        clearTimeout(resume);
        renderer.setAnimationLoop(null);
        observer.disconnect();
        visibility.disconnect();
        controls.dispose();
        resources.geometry?.dispose();
        material.dispose();
        lighting.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      const response = await fetch("/traceability/heritage/stt-01.stl.gz", { signal: abort.signal });
      if (!response.ok || !response.body) throw new Error("Model download failed");
      const data = await new Response(response.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
      if (disposed) return;
      const geometry = new STLLoader().parse(data);
      resources.geometry = geometry;
      // Source STL uses Z-up; OrbitControls uses Y-up.
      geometry.rotateX(-Math.PI / 2);
      geometry.center();
      geometry.computeBoundingSphere();
      const radius = geometry.boundingSphere!.radius;
      if (!Number.isFinite(radius) || radius <= 0) throw new Error("Invalid model");
      geometry.scale(1 / radius, 1 / radius, 1 / radius);
      scene.add(new THREE.Mesh(geometry, material));
      loaded = true;
      setReady(true);
      setStatus("Kéo để khám phá sản phẩm");
    }
    init().catch(() => {
      cleanup();
      if (!disposed) setStatus("Không thể tải mô hình 3D. Vui lòng tải lại trang.");
    });
    return () => { disposed = true; abort.abort(); cleanup(); };
  }, []);

  return <div className="product-viewer">
    {!ready && <Image className="product-viewer-fallback" src="/traceability/figma/product-front.png" alt="Long Vân Lưu Tín" fill sizes="(max-width: 768px) 100vw, 50vw" />}
    <div ref={host} className="product-viewer-canvas" role="img" aria-label="Mô hình 3D Long Vân Lưu Tín. Kéo để xoay, cuộn hoặc chụm hai ngón để thu phóng." />
    <p className="product-viewer-label" role="status">{status}</p>
  </div>;
}
