"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProductViewer() {
  const host = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState("Đang tải mô hình 3D…");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;

    if (!element) return;

    let disposed = false;
    let cleanup = () => {};

    async function init() {
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

      if (disposed) return;

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
       * Giới hạn DPR để tránh GPU quá tải trên mobile,
       * đặc biệt Safari/iPhone.
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

      /**
       * Góc mặc định của sản phẩm.
       *
       * Đây chính là vị trí mà camera sẽ quay trở lại
       * sau 2–3 giây người dùng không tương tác.
       */
      camera.position.set(0, 0.18, 3.4);

      /**
       * =========================================================
       * ORBIT CONTROLS
       * =========================================================
       */

      const controls = new OrbitControls(
        camera,
        renderer.domElement
      );

      controls.enablePan = false;

      /**
       * Damping giúp thao tác kéo mượt hơn.
       */
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;

      /**
       * Auto rotate mặc định.
       */
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.55;

      /**
       * Zoom nhẹ.
       */
      controls.enableZoom = true;
      controls.zoomSpeed = 0.45;

      /**
       * Giới hạn góc nhìn dọc.
       *
       * Không cho người dùng lật sản phẩm ngược hoàn toàn.
       */
      controls.minPolarAngle = Math.PI * 0.23;
      controls.maxPolarAngle = Math.PI * 0.77;

      /**
       * Mobile:
       * - 1 ngón: rotate
       * - 2 ngón: pinch zoom + rotate
       */
      controls.touches.ONE = THREE.TOUCH.ROTATE;
      controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

      /**
       * Không cho camera tiến quá sát hoặc quá xa.
       * Giá trị sẽ tiếp tục được hiệu chỉnh khi resize.
       */
      controls.minDistance = 2;
      controls.maxDistance = 5;

      /**
       * =========================================================
       * LIGHTING / ENVIRONMENT
       * =========================================================
       */

      const environment = new RoomEnvironment();

      const pmrem = new THREE.PMREMGenerator(renderer);

      pmrem.compileEquirectangularShader();

      const environmentTarget = pmrem.fromScene(
        environment,
        0.04
      );

      scene.environment = environmentTarget.texture;

      environment.dispose();
      pmrem.dispose();

      /**
       * Bổ sung đèn để hoa văn trên bề mặt vàng rõ hơn.
       */
      const keyLight = new THREE.DirectionalLight(
        0xfff2cf,
        2.2
      );

      keyLight.position.set(3, 4, 5);

      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(
        0xffd27a,
        1.3
      );

      fillLight.position.set(-4, 1, 3);

      scene.add(fillLight);

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
       *
       * Trước mắt toàn bộ GLB được hiển thị vật liệu vàng
       * để kiểm thử 3D.
       */

      const goldMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D9AA48"),

        metalness: 0.82,

        /**
         * Không đặt quá thấp vì sẽ tạo cảm giác "chrome".
         */
        roughness: 0.28,

        envMapIntensity: 1.25,
      });

      /**
       * =========================================================
       * STATE CỦA VIEWER
       * =========================================================
       */

      let loaded = false;
      let visible = true;

      let resumeTimer:
        | ReturnType<typeof setTimeout>
        | undefined;

      /**
       * Trạng thái camera đang quay về góc mặc định.
       */
      let returningHome = false;

      let returnStartTime = 0;

      const RETURN_DURATION = 950;

      /**
       * Camera tại thời điểm bắt đầu quay về.
       */
      const returnStartSpherical =
        new THREE.Spherical();

      /**
       * Góc camera mặc định.
       */
      const homeSpherical =
        new THREE.Spherical();

      /**
       * Vector dùng tạm để tránh tạo object liên tục
       * trong animation loop.
       */
      const tempVector =
        new THREE.Vector3();

      /**
       * Target mặc định luôn nằm ở tâm model.
       */
      const homeTarget =
        new THREE.Vector3(0, 0, 0);

      /**
       * =========================================================
       * HELPER
       * =========================================================
       */

      const normalizeAngleDelta = (
        angle: number
      ) =>
        Math.atan2(
          Math.sin(angle),
          Math.cos(angle)
        );

      /**
       * Ease in-out mượt.
       */
      const easeInOutCubic = (
        value: number
      ) =>
        value < 0.5
          ? 4 * value * value * value
          : 1 -
            Math.pow(
              -2 * value + 2,
              3
            ) /
              2;

      /**
       * =========================================================
       * TRỞ VỀ VỊ TRÍ BAN ĐẦU
       * =========================================================
       */

      const beginReturnHome = () => {
        if (
          disposed ||
          !loaded
        )
          return;

        controls.autoRotate = false;

        returningHome = true;

        returnStartTime =
          performance.now();

        /**
         * Lấy vị trí hiện tại của camera
         * dưới dạng spherical coordinates.
         */
        tempVector
          .copy(camera.position)
          .sub(controls.target);

        returnStartSpherical.setFromVector3(
          tempVector
        );

        /**
         * Giữ khoảng cách zoom hiện tại ở mức hợp lý,
         * nhưng quay về đúng hướng presentation ban đầu.
         */
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

        /**
         * Nếu người dùng chạm vào trong lúc camera
         * đang quay về thì dừng return ngay.
         */
        returningHome = false;

        controls.autoRotate = false;
      };

      const handleInteractionEnd = () => {
        if (resumeTimer) {
          clearTimeout(resumeTimer);
        }

        /**
         * Sau 2.5 giây không thao tác:
         *
         * KHÔNG tiếp tục auto rotate từ hướng hiện tại.
         *
         * Camera sẽ quay mượt về vị trí mặc định trước.
         */
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
        const width =
          element.clientWidth;

        const height =
          element.clientHeight;

        if (
          width <= 0 ||
          height <= 0
        )
          return;

        camera.aspect =
          width / height;

        /**
         * FOV dọc = 38°.
         *
         * Tính khoảng cách để model không bị crop
         * ở màn hình hẹp/mobile.
         */
        const verticalFov =
          THREE.MathUtils.degToRad(
            camera.fov
          );

        const aspectFactor =
          Math.min(
            camera.aspect,
            1
          );

        const distance =
          1.18 /
          Math.sin(
            Math.atan(
              Math.tan(
                verticalFov / 2
              ) *
                aspectFactor
            )
          );

        /**
         * Không làm model quá nhỏ trên desktop.
         */
        const finalDistance =
          THREE.MathUtils.clamp(
            distance,
            2.7,
            4.3
          );

        /**
         * Khi resize ban đầu:
         * chỉ thay đổi bán kính,
         * không thay đổi hướng camera.
         */
        tempVector
          .copy(camera.position)
          .sub(controls.target)
          .normalize()
          .multiplyScalar(
            finalDistance
          );

        camera.position.copy(
          controls.target
        );

        camera.position.add(
          tempVector
        );

        controls.minDistance =
          finalDistance * 0.78;

        controls.maxDistance =
          finalDistance * 1.28;

        /**
         * Cập nhật radius home theo viewport mới.
         */
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
       * Sau resize lần đầu, lưu chính xác
       * hướng camera mặc định.
       */
      tempVector
        .copy(camera.position)
        .sub(controls.target);

      homeSpherical.setFromVector3(
        tempVector
      );

      /**
       * =========================================================
       * VISIBILITY OPTIMIZATION
       * =========================================================
       */

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

      /**
       * =========================================================
       * WEBGL CONTEXT
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

      const loader =
        new GLTFLoader();

      /**
       * GitHub Pages của repository đang chạy tại:
       *
       * /traceability/
       *
       * Vì vậy asset phải nằm ở:
       *
       * public/heritage/magnet-2.glb
       */
      const MODEL_URL =
        "/traceability/heritage/magnet-2.glb";

      const gltf =
        await loader.loadAsync(
          MODEL_URL
        );

      if (disposed) return;

      const model = gltf.scene;

      /**
       * =========================================================
       * CHUẨN HÓA MODEL
       * =========================================================
       */

      model.traverse(
        (object) => {
          if (
            object instanceof
            THREE.Mesh
          ) {
            /**
             * Giữ geometry của GLB,
             * nhưng áp vật liệu vàng thống nhất
             * trong giai đoạn kiểm thử.
             */
            object.material =
              goldMaterial;

            object.castShadow =
              false;

            object.receiveShadow =
              false;

            /**
             * Nếu GLB thiếu normal thì bổ sung.
             */
            if (
              !object.geometry
                .attributes.normal
            ) {
              object.geometry.computeVertexNormals();
            }
          }
        }
      );

      /**
       * Tìm bounding box thực tế.
       */
      let box =
        new THREE.Box3().setFromObject(
          model
        );

      let size =
        new THREE.Vector3();

      let center =
        new THREE.Vector3();

      box.getSize(size);
      box.getCenter(center);

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

      /**
       * Đưa tâm model về (0,0,0).
       */
      model.position.sub(center);

      /**
       * Sau khi center lại,
       * tính bounding box một lần nữa.
       */
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
        !Number.isFinite(
          maxDimension
        )
      ) {
        throw new Error(
          "Invalid model size"
        );
      }

      /**
       * Chuẩn hóa kích thước model.
       *
       * Largest dimension ≈ 2.
       */
      const scale =
        2 / maxDimension;

      model.scale.setScalar(
        scale
      );

      /**
       * Tính lại tâm chính xác sau scale.
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
       * MODEL READY
       * =========================================================
       */

      loaded = true;

      setReady(true);

      /**
       * Theo yêu cầu mới:
       * không hiển thị "Kéo để khám phá sản phẩm".
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
              (now -
                lastTime) /
                1000,
              0.05
            );

          lastTime = now;

          /**
           * ============================================
           * CAMERA RETURN ANIMATION
           * ============================================
           */

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

            /**
             * Theta cần đi theo đường ngắn nhất
             * để tránh camera quay gần 360°
             * chỉ để trở về góc mặc định.
             */
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
              returningHome =
                false;

              controls.target.copy(
                homeTarget
              );

              /**
               * Chỉ sau khi camera đã về đúng
               * presentation angle mới bật auto rotate.
               */
              controls.autoRotate =
                true;
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

        /**
         * Dispose geometry của GLB.
         */
        model.traverse(
          (object) => {
            if (
              object instanceof
              THREE.Mesh
            ) {
              object.geometry.dispose();
            }
          }
        );

        goldMaterial.dispose();

        environmentTarget.dispose();

        renderer.dispose();

        renderer.domElement.remove();
      };
    }

    init().catch(
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
          priority={false}
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
