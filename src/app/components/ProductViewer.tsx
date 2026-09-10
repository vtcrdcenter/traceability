"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MODEL_URL =
  "/traceability/heritage/magnet-2.glb";

export default function ProductViewer() {
  const host = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState(
    "Đang tải mô hình 3D…"
  );

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
        import(
          "three/addons/controls/OrbitControls.js"
        ),
        import(
          "three/addons/loaders/GLTFLoader.js"
        ),
        import(
          "three/addons/environments/RoomEnvironment.js"
        ),
      ]);

      if (disposed) {
        return;
      }

      /* =====================================================
         RENDERER
      ===================================================== */

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });

      const maxDpr =
        window.innerWidth <= 768 ? 1.5 : 2;

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          maxDpr
        )
      );

      renderer.outputColorSpace =
        THREE.SRGBColorSpace;

      renderer.toneMapping =
        THREE.ACESFilmicToneMapping;

      renderer.toneMappingExposure = 1.05;

      renderer.setClearColor(
        0x000000,
        0
      );

      element.appendChild(
        renderer.domElement
      );

      renderer.domElement.style.width =
        "100%";

      renderer.domElement.style.height =
        "100%";

      renderer.domElement.style.display =
        "block";

      renderer.domElement.style.touchAction =
        "none";

      /* =====================================================
         SCENE
      ===================================================== */

      const scene =
        new THREE.Scene();

      /* =====================================================
         CAMERA
      ===================================================== */

      const camera =
        new THREE.PerspectiveCamera(
          38,
          1,
          0.01,
          100
        );

      camera.position.set(
        0,
        0.12,
        3.4
      );

      /* =====================================================
         CONTROLS
      ===================================================== */

      const controls =
        new OrbitControls(
          camera,
          renderer.domElement
        );

      controls.enablePan = false;

      controls.enableDamping = true;
      controls.dampingFactor = 0.06;

      controls.enableZoom = true;
      controls.zoomSpeed = 0.45;

      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.45;

      controls.minPolarAngle =
        Math.PI * 0.24;

      controls.maxPolarAngle =
        Math.PI * 0.76;

      controls.touches.ONE =
        THREE.TOUCH.ROTATE;

      controls.touches.TWO =
        THREE.TOUCH.DOLLY_ROTATE;

      controls.minDistance = 2.1;
      controls.maxDistance = 5;

      /* =====================================================
         ENVIRONMENT
      ===================================================== */

      const environment =
        new RoomEnvironment();

      const pmrem =
        new THREE.PMREMGenerator(
          renderer
        );

      const environmentTarget =
        pmrem.fromScene(
          environment,
          0.04
        );

      scene.environment =
        environmentTarget.texture;

      environment.dispose();
      pmrem.dispose();

      /* =====================================================
         LIGHTS
      ===================================================== */

      const ambientLight =
        new THREE.AmbientLight(
          0xffffff,
          0.55
        );

      scene.add(
        ambientLight
      );

      const keyLight =
        new THREE.DirectionalLight(
          0xfff2d3,
          1.8
        );

      keyLight.position.set(
        3,
        4,
        5
      );

      scene.add(
        keyLight
      );

      const fillLight =
        new THREE.DirectionalLight(
          0xffd48b,
          0.9
        );

      fillLight.position.set(
        -4,
        1,
        3
      );

      scene.add(
        fillLight
      );

      const rimLight =
        new THREE.DirectionalLight(
          0xffffff,
          0.65
        );

      rimLight.position.set(
        0,
        3,
        -4
      );

      scene.add(
        rimLight
      );

      /* =====================================================
         STATE
      ===================================================== */

      let model:
        | import("three").Object3D
        | null = null;

      let loaded = false;
      let visible = true;

      let animationFrameActive =
        true;

      let resumeTimer:
        | ReturnType<typeof setTimeout>
        | undefined;

      let returningHome = false;

      let returnStartTime = 0;

      const RETURN_DELAY = 2500;
      const RETURN_DURATION = 950;

      const tempVector =
        new THREE.Vector3();

      const homeTarget =
        new THREE.Vector3(
          0,
          0,
          0
        );

      const returnStartTarget =
        new THREE.Vector3();

      const returnStartSpherical =
        new THREE.Spherical();

      const homeSpherical =
        new THREE.Spherical();

      const currentSpherical =
        new THREE.Spherical();

      /* =====================================================
         HELPERS
      ===================================================== */

      function normalizeAngleDelta(
        angle: number
      ) {
        return Math.atan2(
          Math.sin(angle),
          Math.cos(angle)
        );
      }

      function easeInOutCubic(
        value: number
      ) {
        return value < 0.5
          ? 4 *
              value *
              value *
              value
          : 1 -
              Math.pow(
                -2 * value + 2,
                3
              ) /
                2;
      }

      function saveHomePosition() {
        tempVector
          .copy(camera.position)
          .sub(controls.target);

        homeSpherical.setFromVector3(
          tempVector
        );

        homeTarget.copy(
          controls.target
        );
      }

      /* =====================================================
         RETURN HOME
      ===================================================== */

      function beginReturnHome() {
        if (
          disposed ||
          !loaded
        ) {
          return;
        }

        controls.autoRotate = false;

        returningHome = true;

        returnStartTime =
          performance.now();

        returnStartTarget.copy(
          controls.target
        );

        tempVector
          .copy(camera.position)
          .sub(controls.target);

        returnStartSpherical.setFromVector3(
          tempVector
        );
      }

      /* =====================================================
         USER INTERACTION
      ===================================================== */

      function handleInteractionStart() {
        if (resumeTimer) {
          clearTimeout(
            resumeTimer
          );
        }

        returningHome = false;

        controls.autoRotate =
          false;
      }

      function handleInteractionEnd() {
        if (resumeTimer) {
          clearTimeout(
            resumeTimer
          );
        }

        resumeTimer = setTimeout(
          () => {
            beginReturnHome();
          },
          RETURN_DELAY
        );
      }

      controls.addEventListener(
        "start",
        handleInteractionStart
      );

      controls.addEventListener(
        "end",
        handleInteractionEnd
      );

      /* =====================================================
         RESIZE
      ===================================================== */

      function resize() {
        const width =
          element.clientWidth;

        const height =
          element.clientHeight;

        if (
          width <= 0 ||
          height <= 0
        ) {
          return;
        }

        camera.aspect =
          width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
          width,
          height,
          false
        );
      }

      const resizeObserver =
        new ResizeObserver(
          resize
        );

      resizeObserver.observe(
        element
      );

      resize();

      /* =====================================================
         VISIBILITY
      ===================================================== */

      const intersectionObserver =
        new IntersectionObserver(
          ([entry]) => {
            visible =
              entry.isIntersecting;
          },
          {
            rootMargin: "150px",
          }
        );

      intersectionObserver.observe(
        element
      );

      /* =====================================================
         CONTEXT LOST
      ===================================================== */

      function handleContextLost(
        event: Event
      ) {
        event.preventDefault();

        loaded = false;

        setReady(false);

        setStatus(
          "Không thể hiển thị mô hình 3D trên thiết bị này."
        );
      }

      renderer.domElement.addEventListener(
        "webglcontextlost",
        handleContextLost,
        false
      );

      /* =====================================================
         LOAD GLB
      ===================================================== */

      const loader =
        new GLTFLoader();

      const gltf =
        await loader.loadAsync(
          MODEL_URL
        );

      if (disposed) {
        return;
      }

      model = gltf.scene;

      /* =====================================================
         GIỮ MATERIAL GỐC CỦA GLB
      ===================================================== */

      model.traverse(
        (object) => {
          if (
            object instanceof THREE.Mesh
          ) {
            object.castShadow =
              false;

            object.receiveShadow =
              false;

            if (
              !object.geometry
                .attributes.normal
            ) {
              object.geometry.computeVertexNormals();
            }

            const materials =
              Array.isArray(
                object.material
              )
                ? object.material
                : [object.material];

            materials.forEach(
              (material) => {
                if (
                  material instanceof
                    THREE.MeshStandardMaterial ||
                  material instanceof
                    THREE.MeshPhysicalMaterial
                ) {
                  material.envMapIntensity =
                    1.15;

                  material.needsUpdate =
                    true;
                }
              }
            );
          }
        }
      );

      /* =====================================================
         NORMALIZE MODEL
      ===================================================== */

      let box =
        new THREE.Box3().setFromObject(
          model
        );

      const size =
        new THREE.Vector3();

      const center =
        new THREE.Vector3();

      box.getSize(
        size
      );

      box.getCenter(
        center
      );

      if (
        !Number.isFinite(
          size.x
        ) ||
        !Number.isFinite(
          size.y
        ) ||
        !Number.isFinite(
          size.z
        )
      ) {
        throw new Error(
          "Invalid GLB dimensions"
        );
      }

      model.position.sub(
        center
      );

      box =
        new THREE.Box3().setFromObject(
          model
        );

      box.getSize(
        size
      );

      const maxDimension =
        Math.max(
          size.x,
          size.y,
          size.z
        );

      if (
        !Number.isFinite(
          maxDimension
        ) ||
        maxDimension <= 0
      ) {
        throw new Error(
          "Invalid GLB size"
        );
      }

      /*
       * Scale nhỏ hơn bản cũ một chút
       * để model có khoảng thở hơn.
       */
      const targetSize = 1.75;

      const scale =
        targetSize /
        maxDimension;

      model.scale.setScalar(
        scale
      );

      /* =====================================================
         CENTER SAU SCALE
      ===================================================== */

      box =
        new THREE.Box3().setFromObject(
          model
        );

      box.getCenter(
        center
      );

      model.position.sub(
        center
      );

      scene.add(
        model
      );

      /* =====================================================
         CAMERA FIT
      ===================================================== */

      box =
        new THREE.Box3().setFromObject(
          model
        );

      box.getSize(
        size
      );

      const fittedDimension =
        Math.max(
          size.x,
          size.y,
          size.z
        );

      const verticalFov =
        THREE.MathUtils.degToRad(
          camera.fov
        );

      let distance =
        fittedDimension /
        (
          2 *
          Math.tan(
            verticalFov / 2
          )
        );

      /*
       * thêm khoảng thở
       */
      distance *= 1.55;

      distance =
        THREE.MathUtils.clamp(
          distance,
          2.65,
          4
        );

      camera.position.set(
        0,
        0.08,
        distance
      );

      controls.target.set(
        0,
        0,
        0
      );

      controls.minDistance =
        distance * 0.72;

      controls.maxDistance =
        distance * 1.35;

      controls.update();

      saveHomePosition();

      /* =====================================================
         READY
      ===================================================== */

      loaded = true;

      setReady(true);

      setStatus("");

      /* =====================================================
         ANIMATION LOOP
      ===================================================== */

      let lastTime =
        performance.now();

      renderer.setAnimationLoop(
        (now) => {
          if (
            disposed ||
            !animationFrameActive
          ) {
            return;
          }

          if (
            !loaded ||
            !visible ||
            document.hidden
          ) {
            lastTime = now;
            return;
          }

          const delta =
            Math.min(
              (now - lastTime) /
                1000,
              0.05
            );

          lastTime = now;

          /* =============================================
             RETURN HOME
          ============================================= */

          if (returningHome) {
            const elapsed =
              now -
              returnStartTime;

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

            currentSpherical.radius =
              THREE.MathUtils.lerp(
                returnStartSpherical.radius,
                homeSpherical.radius,
                eased
              );

            currentSpherical.phi =
              THREE.MathUtils.lerp(
                returnStartSpherical.phi,
                homeSpherical.phi,
                eased
              );

            currentSpherical.theta =
              returnStartSpherical.theta +
              thetaDifference *
                eased;

            tempVector.setFromSpherical(
              currentSpherical
            );

            controls.target.lerpVectors(
              returnStartTarget,
              homeTarget,
              eased
            );

            camera.position
              .copy(
                controls.target
              )
              .add(
                tempVector
              );

            camera.lookAt(
              controls.target
            );

            if (
              progress >= 1
            ) {
              returningHome =
                false;

              controls.target.copy(
                homeTarget
              );

              tempVector.setFromSpherical(
                homeSpherical
              );

              camera.position
                .copy(
                  homeTarget
                )
                .add(
                  tempVector
                );

              camera.lookAt(
                homeTarget
              );

              controls.autoRotate =
                true;
            }
          }

          controls.update(
            delta
          );

          renderer.render(
            scene,
            camera
          );
        }
      );

      /* =====================================================
         CLEANUP
      ===================================================== */

      cleanup = () => {
        animationFrameActive =
          false;

        if (resumeTimer) {
          clearTimeout(
            resumeTimer
          );
        }

        renderer.setAnimationLoop(
          null
        );

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

        if (model) {
          model.traverse(
            (object) => {
              if (
                object instanceof
                THREE.Mesh
              ) {
                object.geometry.dispose();

                const materials =
                  Array.isArray(
                    object.material
                  )
                    ? object.material
                    : [
                        object.material,
                      ];

                materials.forEach(
                  (material) => {
                    material.dispose();
                  }
                );
              }
            }
          );
        }

        environmentTarget.dispose();

        renderer.dispose();

        renderer.domElement.remove();
      };
    }

    init(
      hostElement
    ).catch(
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
