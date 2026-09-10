"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ProductViewer.module.css";

const MODEL_URL = "/traceability/heritage/magnet-2.glb";

export default function ProductViewer() {
  const host = useRef<HTMLDivElement>(null);
  const reset = useRef<() => void>(() => {});
  const [status, setStatus] = useState("Đang tải mô hình 3D…");
  const [ready, setReady] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const abort = new AbortController();
    let disposed = false;
    let cleaned = false;
    const releases: (() => void)[] = [];
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      for (const release of releases.reverse()) release();
    };

    async function init() {
      const [THREE, { OrbitControls }, { GLTFLoader }, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/addons/controls/OrbitControls.js"),
        import("three/addons/loaders/GLTFLoader.js"),
        import("three/addons/environments/RoomEnvironment.js"),
      ]);
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      releases.push(() => { renderer.setAnimationLoop(null); renderer.dispose(); renderer.domElement.remove(); });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.85;
      element!.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
      const controls = new OrbitControls(camera, renderer.domElement);
      releases.push(() => controls.dispose());
      controls.enablePan = false;
      // No residual damping is carried into the programmed return-home animation.
      controls.enableDamping = false;
      controls.autoRotate = false;
      controls.autoRotateSpeed = 0.45;
      controls.zoomSpeed = 0.45;
      controls.minPolarAngle = Math.PI * 0.24;
      controls.maxPolarAngle = Math.PI * 0.76;
      controls.touches.ONE = THREE.TOUCH.ROTATE;
      controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const environment = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const lighting = pmrem.fromScene(environment, 0.04);
      releases.push(() => lighting.dispose());
      scene.environment = lighting.texture;
      environment.dispose();
      pmrem.dispose();
      scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 0.35));
      const key = new THREE.DirectionalLight(0xffffff, 0.8);
      key.position.set(3, 4, 5);
      scene.add(key);

      let loaded = false;
      let visible = true;
      let contextLost = false;
      let resume: ReturnType<typeof setTimeout> | undefined;
      let returning = false;
      let returnStart = 0;
      const home = new THREE.Spherical(4, Math.PI / 2 - 0.04, 0);
      const from = new THREE.Spherical();
      const current = new THREE.Spherical();
      const offset = new THREE.Vector3();
      const beginReturn = () => {
        if (!loaded || disposed || contextLost) return;
        clearTimeout(resume);
        controls.autoRotate = false;
        from.setFromVector3(camera.position.clone().sub(controls.target));
        returning = true;
        returnStart = performance.now();
      };
      reset.current = beginReturn;
      const onStart = () => { clearTimeout(resume); returning = false; controls.autoRotate = false; };
      const onEnd = () => { clearTimeout(resume); resume = setTimeout(beginReturn, 2500); };
      controls.addEventListener("start", onStart);
      controls.addEventListener("end", onEnd);
      releases.push(() => { clearTimeout(resume); reset.current = () => {}; });
      const onMotionChange = () => { controls.autoRotate = loaded && !returning && !reducedMotion.matches; };
      reducedMotion.addEventListener("change", onMotionChange);
      releases.push(() => reducedMotion.removeEventListener("change", onMotionChange));

      const resize = () => {
        const width = element!.clientWidth, height = element!.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        const halfFov = Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * Math.min(camera.aspect, 1));
        // Normalized model fits inside a unit sphere, including every rotation.
        const distance = 1.02 / Math.sin(halfFov);
        const ratio = home.radius ? camera.position.length() / home.radius : 1;
        home.radius = distance;
        controls.minDistance = distance * 0.72;
        controls.maxDistance = distance * 1.6;
        if (loaded) camera.position.setLength(THREE.MathUtils.clamp(distance * ratio, controls.minDistance, controls.maxDistance));
        else camera.position.setFromSpherical(home);
        returning = false;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        if (loaded && !controls.autoRotate) onEnd();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element!);
      releases.push(() => observer.disconnect());
      resize();
      const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "150px" });
      visibility.observe(element!);
      releases.push(() => visibility.disconnect());
      const onContextLost = (event: Event) => {
        event.preventDefault(); contextLost = true; loaded = false;
        clearTimeout(resume); setReady(false);
        setStatus("Không thể hiển thị mô hình 3D. Vui lòng thử lại.");
      };
      renderer.domElement.addEventListener("webglcontextlost", onContextLost);
      releases.push(() => renderer.domElement.removeEventListener("webglcontextlost", onContextLost));

      // Fetch is abortable; GLTFLoader preserves authored materials and textures.
      const response = await fetch(MODEL_URL, { signal: abort.signal });
      if (!response.ok) throw new Error(`GLB HTTP ${response.status}`);
      const data = await response.arrayBuffer();
      if (disposed) return;
      const gltf = await new GLTFLoader().parseAsync(data, MODEL_URL.slice(0, MODEL_URL.lastIndexOf("/") + 1));
      const model = gltf.scene;
      const disposeModel = () => {
        const geometries = new Set<import("three").BufferGeometry>();
        const materials = new Set<import("three").Material>();
        const textures = new Set<import("three").Texture>();
        model.traverse(object => {
          if (!(object instanceof THREE.Mesh)) return;
          geometries.add(object.geometry);
          for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
            materials.add(material);
            for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
          }
        });
        textures.forEach(texture => { texture.dispose(); if (typeof ImageBitmap !== "undefined" && texture.image instanceof ImageBitmap) texture.image.close(); });
        materials.forEach(material => material.dispose());
        geometries.forEach(geometry => geometry.dispose());
      };
      if (disposed || cleaned) { disposeModel(); return; }
      releases.push(disposeModel);
      model.traverse(object => {
        if (object instanceof THREE.Mesh && !object.geometry.attributes.normal) object.geometry.computeVertexNormals();
      });
      const box = new THREE.Box3().setFromObject(model);
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      if (!Number.isFinite(sphere.radius) || sphere.radius <= 0) throw new Error("Invalid GLB bounds");
      const pivot = new THREE.Group();
      model.position.sub(sphere.center);
      pivot.add(model);
      pivot.scale.setScalar(1 / sphere.radius);
      scene.add(pivot);
      controls.target.set(0, 0, 0);
      camera.position.setFromSpherical(home);
      controls.update();
      loaded = true;
      controls.autoRotate = !reducedMotion.matches;
      setReady(true);
      setStatus("");
      let last = performance.now();
      renderer.setAnimationLoop(now => {
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!loaded || !visible || document.hidden || disposed) return;
        if (returning) {
          const progress = reducedMotion.matches ? 1 : Math.min((now - returnStart) / 850, 1);
          const eased = progress * progress * (3 - 2 * progress);
          const angle = Math.atan2(Math.sin(home.theta - from.theta), Math.cos(home.theta - from.theta));
          current.set(THREE.MathUtils.lerp(from.radius, home.radius, eased), THREE.MathUtils.lerp(from.phi, home.phi, eased), from.theta + angle * eased);
          camera.position.copy(offset.setFromSpherical(current));
          camera.lookAt(controls.target);
          if (progress === 1) { returning = false; controls.autoRotate = !reducedMotion.matches; }
        } else controls.update(delta);
        renderer.render(scene, camera);
      });
    }
    init().catch(error => {
      cleanup();
      if (!disposed) {
        console.error("[ProductViewer]", error);
        setReady(false); setStatus("Không thể tải mô hình 3D. Vui lòng thử lại.");
      }
    });
    return () => { disposed = true; abort.abort(); cleanup(); };
  }, [retry]);

  return <div className={styles.viewer}>
    {!ready && <Image className={styles.fallback} src="/traceability/figma/product-front.png" alt="Long Vân Lưu Tín" fill sizes="(max-width: 800px) 90vw, 700px" />}
    <div ref={host} className={styles.canvas} aria-hidden={!ready} role="img" aria-label="Mô hình 3D Long Vân Lưu Tín. Kéo hoặc vuốt để xoay; cuộn chuột hoặc chụm hai ngón để thu phóng." />
    {ready && <button className={styles.home} onClick={() => reset.current()} aria-label="Đưa mô hình về góc nhìn ban đầu">↻ &nbsp; Xoay 360°</button>}
    {status && <p className={styles.label} role="status">{status}</p>}
    {!ready && status.startsWith("Không") && <button className={styles.retry} onClick={() => { setStatus("Đang tải mô hình 3D…"); setRetry(value => value + 1); }}>Thử lại</button>}
  </div>;
}
