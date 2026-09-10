"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProductViewer() {
  const host = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState("Đang tải mô hình 3D…");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hostElement = host.current;

    if (!hostElement) {
      return;
    }

    let disposed = false;
    let cleanup = () => {};

    async function init(element: HTMLDivElement) {
      const [
        THREE,
        { OrbitControls },
        { GLTFLoader },
        { RoomEnvironment },
      ] = await Promise.all([
        import("three"),
        import("three/addons/controls/OrbitControls.js"),
        import("three/addons/loaders/GLTFLoader.js"),
        import("three/addons/environments/RoomEnvironment.js"),
      ]);

      if (disposed) {
        return;
      }

      /**
       * =========================================================
       * RENDERER
       * =========================================================
       */

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });

      /**
       * Giới hạn DPR để giảm tải GPU,
       * đặc biệt trên mobile / Safari.
       */
      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          window.innerWidth <= 768 ? 1.5 : 2
        )
      );

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.setClearColor(0x000000, 0);

      element.appendChild(renderer.domElement);

      /**
       * =========================================================
       * SCENE
       * =========================================================
       */

      const scene = new THREE.Scene();

      /**
       * =========================================================
       * CAMERA
       * =========================================================
       */

      const camera = new THREE.PerspectiveCamera(
        38,
        1,
        0.01,
        100
      );

      camera.position.set(0, 0.18, 3.4);

      /**
       * =========================================================
       * CONTROLS
       * =========================================================
       */

      const controls = new OrbitControls(
        camera,
        renderer.domElement
      );

      controls.enablePan = false;

      controls.enableDamping = true;
      controls.dampingFactor = 0.06;

      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.55;

      controls.enableZoom = true;
      controls.zoomSpeed = 0.45;

      /**
       * Giới hạn góc nhìn dọc để không lật ngược sản phẩm.
       */
      controls.minPolarAngle = Math.PI * 0.23;
      controls.maxPolarAngle = Math.PI * 0.77;

      /**
       * Mobile:
       * 1 ngón = xoay
       * 2 ngón = zoom + xoay
       */
      controls.touches.ONE = THREE.TOUCH.ROTATE;
      controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

      controls.minDistance = 2;
      controls.maxDistance = 5;

      /**
       * =========================================================
       * ENVIRONMENT / LIGHTING
       * =========================================================
       */

      const environment = new RoomEnvironment();

      const pmrem = new THREE.PMREMGenerator(renderer);

      const environmentTarget = pmrem.fromScene(
        environment,
        0.04
      );

      scene.environment = environmentTarget.texture;

      environment.dispose();
      pmrem.dispose();

      /**
       * Đèn chính.
       */
      const keyLight = new THREE.DirectionalLight(
        0xfff2cf,
        2.2
      );

      keyLight.position.set(3, 4, 5);

      scene.add(keyLight);

      /**
       * Đèn bù.
       */
      const fillLight = new THREE.DirectionalLight(
        0xffd27a,
        1.3
      );

      fillLight.position.set(-4, 1, 3);

      scene.add(fillLight);

      /**
       * Đèn viền.
       */
      const rimLight = new THREE.DirectionalLight(
        0xffffff,
        0.85
      );

      rimLight.position.set(0, 3, -4);

      scene.add(rimLight);

      /**
       * =========================================================
       * GOLD MATERIAL
       * =========================================================
       */

      const goldMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D9AA48"),
        metalness: 0.82,
        roughness: 0.28,
        envMapIntensity: 1.25,
      });

      /**
       * =========================================================
       * VIEWER STATE
       * =========================================================
       */

      let loaded = false;
      let visible = true;

      let resumeTimer:
        | ReturnType<typeof setTimeout>
        | undefined;

      let returningHome = false;
      let returnStartTime = 0;

      const RETURN_DURATION = 950;

      const returnStartSpherical =
        new THREE.Spherical();

      const homeSpherical =
        new THREE.Spherical();

      const tempVector =
        new THREE.Vector3();

      const homeTarget =
        new THREE.Vector3(0, 0, 0);

      /**
       * =========================================================
       * HELPERS
       * =========================================================
       */

      const normalizeAngleDelta = (angle: number) => {
        return Math.atan2(
          Math.sin(angle),
          Math.cos(angle)
        );
      };

      const easeInOutCubic = (value: number) => {
        return value < 0.5
          ? 4 * value * value * value
          : 1 -
              Math.pow(
                -2 * value + 2,
                3
              ) /
                2;
      };

      /**
       * =========================================================
       * RETURN HOME
       * =========================================================
       */

      const beginReturnHome = () => {
        if (disposed || !loaded) {
          return;
        }

        controls.autoRotate = false;

        returningHome = true;
        returnStartTime = performance.now();

        tempVector
          .copy(camera.position)
          .sub(controls.target);

        returnStartSpherical.setFromVector3(
          tempVector
        );

        homeSpherical.radius =
          THREE.MathUtils.clamp(
            returnStartSpherical.radius,
            controls.minDistance,
            controls.maxDistance
          );
      };

      /**
       * =========================================================
       * USER INTERACTION
       * =========================================================
       */

      const handleInteractionStart = () => {
        if (resumeTimer) {
          clearTimeout(resumeTimer);
        }

        returningHome = false;
        controls.autoRotate = false;
      };

      const handleInteractionEnd = () => {
        if (resumeTimer) {
          clearTimeout(resumeTimer);
        }

        resumeTimer = setTimeout(() => {
          beginReturnHome();
        }, 2500);
      };

      controls.addEventListener(
        "start",
        handleInteractionStart
      );

      controls.addEventListener(
        "end",
        handleInteractionEnd
      );

      /**
       * =========================================================
       * RESIZE
       * =========================================================
       */

      const resize = () => {
        const width = element.clientWidth;
        const height = element.clientHeight;

        if (width <= 0 || height <= 0) {
          return;
        }

        camera.aspect = width / height;

        const verticalFov =
          THREE.MathUtils.degToRad(
            camera.fov
          );

        const aspectFactor =
          Math.min(camera.aspect, 1);

        const distance =
          1.18 /
          Math.sin(
            Math.atan(
              Math.tan(
                verticalFov / 2
              ) * aspectFactor
            )
          );

        const finalDistance =
          THREE.MathUtils.clamp(
            distance,
            2.7,
            4.3
          );

        tempVector
          .copy(camera.position)
          .sub(controls.target);

        if (tempVector.lengthSq() === 0) {
          tempVector.set(0, 0, 1);
        }

        tempVector
          .normalize()
          .multiplyScalar(finalDistance);

        camera.position
          .copy(controls.target)
          .add(tempVector);

        controls.minDistance =
          finalDistance * 0.78;

        controls.maxDistance =
          finalDistance * 1.28;

        homeSpherical.radius =
          finalDistance;

        camera.updateProjectionMatrix();

        renderer.setSize(
          width,
          height,
          false
        );
      };

      const resizeObserver =
        new ResizeObserver(resize);

      resizeObserver.observe(element);

      resize();

      /**
       * Lưu góc camera mặc định sau lần resize đầu tiên.
       */
      tempVector
        .copy(camera.position)
        .sub(controls.target);

      homeSpherical.setFromVector3(
        tempVector
      );

      /**
       * =========================================================
       * INTERSECTION OBSERVER
       * =========================================================
       */

      const intersectionObserver =
        new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          {
            rootMargin: "150px",
          }
        );

      intersectionObserver.observe(element);

      /**
       * =========================================================
       * WEBGL CONTEXT LOST
       * =========================================================
       */

      const handleContextLost = (
        event: Event
      ) => {
        event.preventDefault();

        loaded = false;

        setReady(false);

        setStatus(
          "Không thể hiển thị mô hình 3D trên thiết bị này."
        );
      };

      renderer.domElement.addEventListener(
        "webglcontextlost",
        handleContextLost,
        false
      );

      /**
       * =========================================================
       * LOAD GLB
       * =========================================================
       */

      const loader = new GLTFLoader();

      const MODEL_URL =
        "/traceability/heritage/magnet-2.glb";

      const gltf =
        await loader.loadAsync(
          MODEL_URL
        );

      if (disposed) {
        return;
      }

      const model = gltf.scene;

      /**
       * =========================================================
       * APPLY GOLD MATERIAL
       * =========================================================
       */

      model.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.material = goldMaterial;

          object.castShadow = false;
          object.receiveShadow = false;

          if (
            !object.geometry.attributes.normal
          ) {
            object.geometry.computeVertexNormals();
          }
        }
      });

      /**
       * =========================================================
       * NORMALIZE MODEL SIZE
       * =========================================================
       */

      let box =
        new THREE.Box3().setFromObject(
          model
        );

      const size =
        new THREE.Vector3();

      const center =
        new THREE.Vector3();

      box.getSize(size);
      box.getCenter(center);

      if (
        !Number.isFinite(size.x) ||
        !Number.isFinite(size.y) ||
        !Number.isFinite(size.z)
      ) {
        throw new Error(
          "Invalid GLB dimensions"
        );
      }

      /**
       * Đưa model về tâm.
       */
      model.position.sub(center);

      box =
        new THREE.Box3().setFromObject(
          model
        );

      box.getSize(size);

      const maxDimension =
        Math.max(
          size.x,
          size.y,
          size.z
        );

      if (
        maxDimension <= 0 ||
        !Number.isFinite(maxDimension)
      ) {
        throw new Error(
          "Invalid model size"
        );
      }

      /**
       * Chuẩn hóa kích thước.
       */
      const scale =
        2 / maxDimension;

      model.scale.setScalar(scale);

      /**
       * Tính lại tâm sau scale.
       */
      box =
        new THREE.Box3().setFromObject(
          model
        );

      box.getCenter(center);

      model.position.sub(center);

      scene.add(model);

      /**
       * =========================================================
       * READY
       * =========================================================
       */

      loaded = true;

      setReady(true);

      /**
       * Theo yêu cầu:
       * không hiển thị text "Kéo để khám phá sản phẩm".
       */
      setStatus("");

      /**
       * =========================================================
       * ANIMATION LOOP
       * =========================================================
       */

      let lastTime =
        performance.now();

      renderer.setAnimationLoop(
        (now) => {
          if (
            disposed ||
            !loaded ||
            !visible ||
            document.hidden
          ) {
            lastTime = now;
            return;
          }

          const delta =
            Math.min(
              (now - lastTime) / 1000,
              0.05
            );

          lastTime = now;

          /**
           * =============================================
           * RETURN TO HOME ANIMATION
           * =============================================
           */

          if (returningHome) {
            const elapsed =
              now - returnStartTime;

            const progress =
              THREE.MathUtils.clamp(
                elapsed /
                  RETURN_DURATION,
                0,
                1
              );

            const eased =
              easeInOutCubic(
                progress
              );

            const thetaDifference =
              normalizeAngleDelta(
                homeSpherical.theta -
                  returnStartSpherical.theta
              );

            const theta =
              returnStartSpherical.theta +
              thetaDifference *
                eased;

            const phi =
              THREE.MathUtils.lerp(
                returnStartSpherical.phi,
                homeSpherical.phi,
                eased
              );

            const radius =
              THREE.MathUtils.lerp(
                returnStartSpherical.radius,
                homeSpherical.radius,
                eased
              );

            const spherical =
              new THREE.Spherical(
                radius,
                phi,
                theta
              );

            tempVector.setFromSpherical(
              spherical
            );

            camera.position
              .copy(homeTarget)
              .add(tempVector);

            controls.target.lerp(
              homeTarget,
              eased
            );

            camera.lookAt(
              controls.target
            );

            if (progress >= 1) {
              returningHome = false;

              controls.target.copy(
                homeTarget
              );

              controls.autoRotate = true;
            }
          }

          controls.update(delta);

          renderer.render(
            scene,
            camera
          );
        }
      );

      /**
       * =========================================================
       * CLEANUP
       * =========================================================
       */

      cleanup = () => {
        if (resumeTimer) {
          clearTimeout(resumeTimer);
        }

        renderer.setAnimationLoop(null);

        resizeObserver.disconnect();

        intersectionObserver.disconnect();

        controls.removeEventListener(
          "start",
          handleInteractionStart
        );

        controls.removeEventListener(
          "end",
          handleInteractionEnd
        );

        controls.dispose();

        renderer.domElement.removeEventListener(
          "webglcontextlost",
          handleContextLost
        );

        model.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
          }
        });

        goldMaterial.dispose();

        environmentTarget.dispose();

        renderer.dispose();

        renderer.domElement.remove();
      };
    }

    init(hostElement).catch(
      (error) => {
        console.error(
          "[ProductViewer]",
          error
        );

        cleanup();

        if (!disposed) {
          setReady(false);

          setStatus(
            "Không thể tải mô hình 3D. Vui lòng tải lại trang."
          );
        }
      }
    );

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="product-viewer">
      {!ready && (
        <Image
          className="product-viewer-fallback"
          src="/traceability/figma/product-front.png"
          alt="Long Vân Lưu Tín"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      <div
        ref={host}
        className="product-viewer-canvas"
        role="img"
        aria-label="Mô hình 3D Long Vân Lưu Tín. Kéo hoặc vuốt để xoay sản phẩm; cuộn chuột hoặc chụm hai ngón để thu phóng."
      />

      {status && (
        <p
          className="product-viewer-label"
          role="status"
        >
          {status}
        </p>
      )}
    </div>
  );
}
