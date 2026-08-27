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
