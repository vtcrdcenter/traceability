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

  const [ready, setReady] =
    useState(false);

  useEffect(() => {
    const element = host.current;

    if (!element) {
      return;
    }

    let disposed = false;

    let cleanup = () => {};

    async function init(
      hostElement: HTMLDivElement
    ) {
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

      const renderer =
        new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference:
            "high-performance",
        });

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          window.innerWidth <= 768
            ? 1.4
            : 1.8
        )
      );

      renderer.outputColorSpace =
        THREE.SRGBColorSpace;

      /*
       * Giữ ACES nhưng giảm exposure mạnh
       * để vàng / xanh / đỏ không bị cháy thành trắng.
       */
      renderer.toneMapping =
        THREE.ACESFilmicToneMapping;

      renderer.toneMappingExposure =
        0.78;

      renderer.setClearColor(
        0x000000,
        0
      );

      renderer.domElement.style.width =
        "100%";

      renderer.domElement.style.height =
        "100%";

      renderer.domElement.style.display =
        "block";

      renderer.domElement.style.touchAction =
        "none";

      hostElement.appendChild(
        renderer.domElement
      );

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
        0.08,
        3.2
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
      controls.zoomSpeed = 0.4;

      /*
       * Tự xoay nhẹ.
       */
      controls.autoRotate = true;

      controls.autoRotateSpeed =
        0.42;

      /*
       * Không cho lật ngược model.
       */
      controls.minPolarAngle =
        Math.PI * 0.24;

      controls.maxPolarAngle =
        Math.PI * 0.76;

      /*
       * Mobile:
       * 1 ngón = xoay
       * 2 ngón = zoom + xoay
       */
      controls.touches.ONE =
        THREE.TOUCH.ROTATE;

      controls.touches.TWO =
        THREE.TOUCH.DOLLY_ROTATE;

      /* =====================================================
         ENVIRONMENT LIGHTING
      ===================================================== */

      /*
       * Environment là nguồn sáng chính.
       * Không dùng AmbientLight mạnh nữa.
       */
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
         LIGHTING
      ===================================================== */

      /*
       * Chỉ bổ sung một nguồn sáng chính nhẹ.
       * Không dùng 3 đèn mạnh như bản cũ.
       */
      const keyLight =
        new THREE.DirectionalLight(
          0xfff4e5,
          0.52
        );

      keyLight.position.set(
        3,
        4,
        5
      );

      scene.add(
        keyLight
      );

      /*
       * Fill rất nhẹ để mặt tối không mất chi tiết.
       */
      const fillLight =
        new THREE.DirectionalLight(
          0xffe3ba,
          0.16
        );

      fillLight.position.set(
        -4,
        1,
        3
      );

      scene.add(
        fillLight
      );

      /* =====================================================
         STATE
      ===================================================== */

      let model:
        | import("three").Object3D
        | null = null;

      let loaded = false;

      let visible = true;

      let resumeTimer:
        | ReturnType<
            typeof setTimeout
          >
        | undefined;

      let returningHome = false;

      let returnStartTime = 0;

      const RETURN_DELAY =
        2500;

      const RETURN_DURATION =
        950;

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

      const homeSpherical =
        new THREE.Spherical();

      const returnStartSpherical =
        new THREE.Spherical();

      const currentSpherical =
        new THREE.Spherical();

      /* =====================================================
         HELPERS
      ===================================================== */

      const normalizeAngleDelta = (
        angle: number
      ) =>
        Math.atan2(
          Math.sin(angle),
          Math.cos(angle)
        );

      const easeInOutCubic = (
        value: number
      ) =>
        value < 0.5
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
         INTERACTION
      ===================================================== */

      function beginReturnHome() {
        if (
          disposed ||
          !loaded
        ) {
          return;
        }

        controls.autoRotate =
          false;

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

      function handleInteractionStart() {
        if (resumeTimer) {
          clearTimeout(
            resumeTimer
          );
        }

        returningHome =
          false;

        controls.autoRotate =
          false;
      }

      function handleInteractionEnd() {
        if (resumeTimer) {
          clearTimeout(
            resumeTimer
          );
        }

        resumeTimer =
          setTimeout(
            beginReturnHome,
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
          hostElement.clientWidth;

        const height =
          hostElement.clientHeight;

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
        hostElement
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
            rootMargin:
              "150px",
          }
        );

      intersectionObserver.observe(
        hostElement
      );

      /* =====================================================
         WEBGL CONTEXT LOST
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

      model =
        gltf.scene;

      /* =====================================================
         GIỮ NGUYÊN MATERIAL GỐC
      ===================================================== */

      model.traverse(
        (object) => {
          if (
            !(object instanceof
              THREE.Mesh)
          ) {
            return;
          }

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
              : [
                  object.material,
                ];

          materials.forEach(
            (material) => {
              /*
               * KHÔNG thay màu.
               * KHÔNG thay material.
               *
               * Chỉ giảm cường độ phản xạ environment
               * để tránh cháy sáng.
               */
              if (
                material instanceof
                  THREE.MeshStandardMaterial ||
                material instanceof
                  THREE.MeshPhysicalMaterial
              ) {
                material.envMapIntensity =
                  0.65;

                material.needsUpdate =
                  true;
              }
            }
          );
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

      /*
       * Đưa model về tâm.
       */
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
        maxDimension <= 0 ||
        !Number.isFinite(
          maxDimension
        )
      ) {
        throw new Error(
          "Invalid GLB size"
        );
      }

      /*
       * Scale model.
       */
      const TARGET_SIZE =
        1.75;

      const scale =
        TARGET_SIZE /
        maxDimension;

      model.scale.setScalar(
        scale
      );

      /*
       * Center lại sau scale.
       */
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

      let cameraDistance =
        fittedDimension /
        (
          2 *
          Math.tan(
            verticalFov / 2
          )
        );

      /*
       * Khoảng thở quanh model.
       */
      cameraDistance *=
        1.55;

      cameraDistance =
        THREE.MathUtils.clamp(
          cameraDistance,
          2.6,
          4
        );

      camera.position.set(
        0,
        0.08,
        cameraDistance
      );

      controls.target.set(
        0,
        0,
        0
      );

      controls.minDistance =
        cameraDistance *
        0.72;

      controls.maxDistance =
        cameraDistance *
        1.35;

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
            disposed
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
              (now -
                lastTime) /
                1000,
              0.05
            );

          lastTime = now;

          /* =============================================
             RETURN HOME
          ============================================= */

          if (
            returningHome
          ) {
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

            const thetaDelta =
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
              thetaDelta *
                eased;

            controls.target.lerpVectors(
              returnStartTarget,
              homeTarget,
              eased
            );

            tempVector.setFromSpherical(
              currentSpherical
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
                !(
                  object instanceof
                  THREE.Mesh
                )
              ) {
                return;
              }

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
          );
        }

        environmentTarget.dispose();

        renderer.dispose();

        if (
          renderer.domElement
            .parentElement
        ) {
          renderer.domElement.remove();
        }
      };
    }

    init(
      element
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
