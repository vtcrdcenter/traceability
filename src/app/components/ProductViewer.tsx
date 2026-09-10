"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Object3D, Material, Texture } from "three";
import styles from "./ProductViewer.module.css";

export default function ProductViewer() {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Đang tải mô hình 3D…");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    const releases: (() => void)[] = [];
    // Register each resource immediately, including before asynchronous loading.
    const cleanup = () => {
      while (releases.length) releases.pop()?.();
    };

    async function init(element: HTMLDivElement) {
      const [THREE, { OrbitControls }, { GLTFLoader }, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/addons/controls/OrbitControls.js"),
        import("three/addons/loaders/GLTFLoader.js"),
        import("three/addons/environments/RoomEnvironment.js"),
      ]);
      if (disposed) return;

      const disposedMaterials = new Set<Material>();
      const disposedTextures = new Set<Texture>();
      const disposeMaterials = (materials: Set<Material>) => {
        const textures = new Set<Texture>();
        for (const material of materials) {
          if (disposedMaterials.has(material)) continue;
          disposedMaterials.add(material);
          for (const value of Object.values(material)) {
            if (value instanceof THREE.Texture) textures.add(value);
          }
          material.dispose();
        }
        for (const texture of textures) {
          if (!disposedTextures.has(texture)) { texture.dispose(); disposedTextures.add(texture); }
        }
      };
      const disposeModel = (root: Object3D) => {
        const geometries = new Set<import("three").BufferGeometry>();
        const materials = new Set<Material>();
        root.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            geometries.add(object.geometry);
            (Array.isArray(object.material) ? object.material : [object.material]).forEach((m) => materials.add(m));
          }
        });
        geometries.forEach((geometry) => geometry.dispose());
        disposeMaterials(materials);
      };

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      releases.push(() => { renderer.dispose(); renderer.domElement.remove(); });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.setClearColor(0x000000, 0);
      element.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
      camera.position.set(0, 0.18, 3.4);
      const controls = new OrbitControls(camera, renderer.domElement);
      releases.push(() => controls.dispose());
      controls.enablePan = false;
      controls.enableDamping = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.55;
      controls.zoomSpeed = 0.35;
      controls.minPolarAngle = Math.PI * 0.23;
      controls.maxPolarAngle = Math.PI * 0.77;
      controls.touches.ONE = THREE.TOUCH.ROTATE;
      controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

      let environmentTarget: import("three").WebGLRenderTarget | undefined;
      releases.push(() => environmentTarget?.dispose());
      const rebuildEnvironment = () => {
        const environment = new RoomEnvironment();
        const pmrem = new THREE.PMREMGenerator(renderer);
        try {
          const target = pmrem.fromScene(environment, 0.04);
          environmentTarget?.dispose();
          environmentTarget = target;
          scene.environment = target.texture;
        } finally {
          environment.dispose();
          pmrem.dispose();
        }
      };
      rebuildEnvironment();
      const key = new THREE.DirectionalLight(0xfff2cf, 2.2);
      key.position.set(3, 4, 5);
      const fill = new THREE.DirectionalLight(0xffd27a, 1.3);
      fill.position.set(-4, 1, 3);
      const rim = new THREE.DirectionalLight(0xffffff, 0.85);
      rim.position.set(0, 3, -4);
      scene.add(key, fill, rim);

      let loaded = false;
      let contextLost = false;
      let visible = false;
      let radius = 1;
      let returning = false;
      let returnStarted = 0;
      let resumeTimer: ReturnType<typeof setTimeout> | undefined;
      const home = new THREE.Spherical(3.4, Math.PI / 2 - 0.05, 0);
      const start = new THREE.Spherical();
      const current = new THREE.Spherical();
      const offset = new THREE.Vector3();
      let lastTime = 0;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      controls.autoRotate = !reducedMotion.matches;

      const interactionStart = () => {
        clearTimeout(resumeTimer);
        returning = false;
        controls.enableDamping = false;
        controls.autoRotate = false;
      };
      const interactionEnd = () => {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
          if (disposed || !loaded || contextLost) return;
          // Capture the current angle before interpolating camera coordinates.
          controls.enableDamping = false;
          controls.update(0);
          start.setFromVector3(offset.copy(camera.position).sub(controls.target));
          returnStarted = performance.now();
          returning = true;
        }, 2500);
      };
      controls.addEventListener("start", interactionStart);
      controls.addEventListener("end", interactionEnd);
      releases.push(() => {
        clearTimeout(resumeTimer);
        controls.removeEventListener("start", interactionStart);
        controls.removeEventListener("end", interactionEnd);
      });

      const resize = () => {
        const width = element.clientWidth;
        const height = element.clientHeight;
        if (!width || !height || contextLost) return;
        camera.aspect = width / height;
        const halfFov = Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * Math.min(camera.aspect, 1));
        const distance = radius * 1.15 / Math.sin(halfFov);
        const zoomRatio = camera.position.distanceTo(controls.target) / home.radius;
        home.radius = distance;
        controls.minDistance = distance * 0.78;
        controls.maxDistance = distance * 1.5;
        offset.copy(camera.position).sub(controls.target).normalize().multiplyScalar(distance * THREE.MathUtils.clamp(zoomRatio, 0.78, 1.5));
        camera.position.copy(controls.target).add(offset);
        camera.near = Math.max(0.01, distance / 100);
        camera.far = distance * 10;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        if (returning) {
          start.setFromVector3(offset);
          returnStarted = performance.now();
        }
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(element);
      releases.push(() => resizeObserver.disconnect());
      resize();

      const animate = (now: number) => {
        if (now - lastTime < 1000 / 30) return;
        const delta = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        if (returning) {
          const progress = reducedMotion.matches ? 1 : Math.min((now - returnStarted) / 950, 1);
          const eased = progress * progress * (3 - 2 * progress);
          const angle = Math.atan2(Math.sin(home.theta - start.theta), Math.cos(home.theta - start.theta));
          current.set(
            THREE.MathUtils.lerp(start.radius, home.radius, eased),
            THREE.MathUtils.lerp(start.phi, home.phi, eased),
            start.theta + angle * eased,
          );
          camera.position.copy(offset.setFromSpherical(current));
          controls.target.set(0, 0, 0);
          if (progress === 1) {
            returning = false;
            controls.enableDamping = false;
            controls.autoRotate = !reducedMotion.matches;
          }
        }
        controls.update(delta);
        renderer.render(scene, camera);
      };
      const syncLoop = () => {
        lastTime = performance.now();
        renderer.setAnimationLoop(loaded && visible && !document.hidden && !contextLost ? animate : null);
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncLoop();
      });
      observer.observe(element);
      releases.push(() => observer.disconnect());
      document.addEventListener("visibilitychange", syncLoop);
      releases.push(() => document.removeEventListener("visibilitychange", syncLoop));
      releases.push(() => renderer.setAnimationLoop(null));

      const onLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        clearTimeout(resumeTimer);
        returning = false;
        setReady(false);
        setStatus("Hiển thị 3D tạm gián đoạn. Đang chờ khôi phục…");
        syncLoop();
      };
      const onRestored = () => {
        if (disposed) return;
        // Render-target pixels are lost with the context and must be regenerated.
        try {
          rebuildEnvironment();
        } catch (error) {
          console.error("[ProductViewer]", error);
          cleanup();
          setReady(false);
          setStatus("Không thể khôi phục mô hình 3D. Vui lòng tải lại trang.");
          return;
        }
        contextLost = false;
        controls.enableDamping = false;
        controls.autoRotate = !reducedMotion.matches;
        resize();
        setReady(loaded);
        setStatus(loaded ? "" : "Đang tải mô hình 3D…");
        syncLoop();
      };
      renderer.domElement.addEventListener("webglcontextlost", onLost);
      renderer.domElement.addEventListener("webglcontextrestored", onRestored);
      releases.push(() => {
        renderer.domElement.removeEventListener("webglcontextlost", onLost);
        renderer.domElement.removeEventListener("webglcontextrestored", onRestored);
      });

      const gltf = await new GLTFLoader().loadAsync("/traceability/heritage/magnet-2.glb");
      if (disposed) {
        gltf.scenes.forEach(disposeModel);
        return;
      }
      releases.push(() => gltf.scenes.forEach(disposeModel));
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maximum = Math.max(size.x, size.y, size.z);
      if (!Number.isFinite(maximum) || maximum <= 0) throw new Error("Invalid GLB dimensions");

      // Preserve authored transforms; normalize and center using a parent group.
      const group = new THREE.Group();
      group.add(model);
      group.scale.setScalar(2 / maximum);
      box.setFromObject(group);
      group.position.sub(box.getCenter(new THREE.Vector3()));
      scene.add(group);
      radius = new THREE.Box3().setFromObject(group).getBoundingSphere(new THREE.Sphere()).radius;
      const gold = new THREE.MeshStandardMaterial({ color: "#D9AA48", metalness: 0.82, roughness: 0.28, envMapIntensity: 1.25 });
      releases.push(() => disposeMaterials(new Set([gold])));
      const originals = new Set<Material>();
      model.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((m) => originals.add(m));
          object.material = gold;
          object.castShadow = false;
          object.receiveShadow = false;
          if (!object.geometry.attributes.normal) object.geometry.computeVertexNormals();
        }
      });
      disposeMaterials(originals);
      resize();
      camera.position.setFromSpherical(home);
      controls.update(0);
      loaded = true;
      if (!contextLost) {
        // Only remove the fallback after the first successful render.
        renderer.render(scene, camera);
        setReady(true);
        setStatus("");
      }
      syncLoop();
    }

    init(element).catch((error) => {
      cleanup();
      if (!disposed) {
        console.error("[ProductViewer]", error);
        setReady(false);
        setStatus("Không thể tải mô hình 3D. Vui lòng tải lại trang.");
      }
    });
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className={styles.viewer}>
      {!ready && <Image className={styles.fallback} src="/traceability/figma/product-front.png" alt="Long Vân Lưu Tín" fill sizes="(max-width: 800px) 100vw, 760px" />}
      <div ref={host} className={styles.canvas} aria-hidden={!ready} role="img" aria-label="Mô hình 3D Long Vân Lưu Tín. Kéo hoặc vuốt để xoay; cuộn chuột hoặc chụm hai ngón để thu phóng." />
      {status && <p className={styles.label} role="status">{status}</p>}
    </div>
  );
}
