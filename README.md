# Dấu ấn Hoàng triều · STT-01

Website tĩnh giới thiệu và truy xuất thông tin sản phẩm văn hóa STT-01. Dự án không sử dụng backend, API hay database.

## Chạy local

```bash
pnpm install
pnpm dev
```

Mở `http://localhost:3000/traceability/`.

## Build và deploy

```bash
pnpm build
```

Kết quả tĩnh nằm trong `out/`. Workflow `.github/workflows/pages.yml` tự build và deploy khi push lên `main`.

Trong GitHub, vào **Settings → Pages → Build and deployment → Source** và chọn **GitHub Actions**.

- Website: `https://vtcrdcenter.github.io/traceability/`
- Trang sản phẩm: `https://vtcrdcenter.github.io/traceability/heritage/stt-01/`

Đây là hồ sơ trình diễn. Phần chứng nhận không tự khẳng định xác nhận chính thức khi chưa có số hồ sơ hoặc văn bản do đơn vị có thẩm quyền cung cấp.

### Interactive product model

The Vietnamese product hero uses `src/app/components/ProductViewer.tsx` with Three.js and OrbitControls. It rotates automatically (about 92 seconds per revolution), pauses during interaction and resumes 2.5 seconds after release. One-finger drag rotates; wheel/two-finger pinch zooms within 80–125% of the fitted camera distance. Vertical angles are limited to 36–144 degrees. Rendering pauses outside the viewport and in hidden tabs.

`public/heritage/stt-01.stl.gz` is a lossless gzip of the supplied `Dấu Ấn Thượng Triều Nguyễn_01_STL_01-01.stl`. The original is 157,261,734 bytes / 3,145,233 triangles; compressed transfer is 60,773,358 bytes. Gzip keeps the asset below GitHub's per-file limit. The browser decompresses it before STLLoader parsing; this requires DecompressionStream and WebGL. The existing image and an error message remain available if loading fails. Geometry is converted from Z-up to Y-up, centered and uniformly scaled; no details are removed.

This is a full-detail motion prototype: parsing and GPU memory usage remain substantial on low-memory phones. A decimated delivery model should be prepared for a later production optimization. The English page is unchanged.

Validation: `pnpm build`, `pnpm lint`, `pnpm typecheck`. Browser checks cover model loading, gold rendering, desktop drag/wheel and mobile viewport layout; verify touch controls and delayed resume when replacing the asset. The current repository has no section titled “Trải nghiệm sản phẩm ở mọi góc nhìn”; the viewer replaces the existing Vietnamese hero product image.
