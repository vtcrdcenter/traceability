# Prompt chuyển giao dự án sang ChatGPT và GitHub mới

Hãy tải file ZIP này lên cuộc trò chuyện mới, giải nén nếu môi trường cho phép, rồi gửi nguyên văn prompt dưới đây.

---

Bạn là Senior Front-end Engineer kiêm UX Engineer. Tôi đang chuyển giao một website hồ sơ số sản phẩm văn hóa từ tài khoản ChatGPT và GitHub cũ sang tài khoản mới.

Tôi đã đính kèm toàn bộ mã nguồn hiện tại. Hãy coi mã nguồn trong file ZIP là nguồn sự thật chính. Trước khi sửa bất cứ thứ gì, hãy:

1. Giải nén và kiểm tra toàn bộ repository.
2. Đọc `README.md`, `package.json`, `next.config.ts`, `.github/workflows/pages.yml`, toàn bộ `src/app` và `public/heritage`.
3. Báo cáo ngắn cấu trúc hiện tại, các route, tài nguyên hình ảnh, cấu hình build và GitHub Pages.
4. Không tự ý thay logo, dấu ấn, ảnh sản phẩm, nội dung chứng thư hoặc tuyên bố pháp lý.
5. Không thêm backend, database, đăng nhập, trình đọc Web NFC hoặc chức năng NFC. Đây là website tĩnh; chip NFC chỉ mở URL của hồ sơ số.

## Mục tiêu hiện tại

Website là hồ sơ số public của một sản phẩm đã được sản xuất và bán ra thị trường, không phải prototype, bản nháp hoặc sản phẩm dự kiến.

Sản phẩm hiện tại:

- Tên: Dấu ấn Hoàng triều
- Mã sản phẩm: STT-01
- Loại sản phẩm: Miếng dán tủ lạnh nghệ thuật
- Mã hồ sơ số: STT-01-HERITAGE
- Nguồn cảm hứng: Mũ thượng triều triều Nguyễn và mỹ thuật cung đình Việt Nam
- Đơn vị bảo chứng giá trị văn hóa được thể hiện trên hồ sơ: Bảo tàng Lịch sử Quốc gia
- Tài liệu quyền tác giả được thể hiện: Giấy chứng nhận đăng ký quyền tác giả do Cục Bản quyền tác giả cấp
- Đơn vị vận hành nền tảng được thể hiện: VTC

Không dùng các từ hoặc cách diễn đạt như “dự kiến”, “sắp ra mắt”, “phiên bản minh họa”, “mẫu giấy”, “chưa phát hành”, “demo” hoặc các câu khiến người xem hiểu đây là hồ sơ chưa hoàn thiện. Không được tự bịa số văn bằng, chủ sở hữu, chữ ký, ngày cấp hoặc dữ liệu pháp lý chưa có trong tài liệu nguồn. Nếu thiếu dữ liệu xác thực, hãy ẩn trường đó và báo cho tôi thay vì tạo dữ liệu giả.

## Trạng thái thiết kế cần giữ

- Mobile-first, tiếng Việt hiển thị đúng dấu và dùng font mềm mại, trang trọng.
- Phong cách văn hóa Việt Nam, bảng màu đỏ son, vàng kim, xanh ngọc và nền giấy ngà.
- Trang sản phẩm chính: `/heritage/stt-01/`.
- Chứng thư giá trị văn hóa phải giữ bố cục nằm ngang.
- Trên điện thoại, toàn bộ chứng thư ngang phải tự co vừa đúng chiều rộng một khung hình, không kéo ngang, không bị cắt, không chuyển thành bố cục dọc.
- Logo Bảo tàng Lịch sử Quốc gia phải giữ nguyên file PNG hiện có.
- Dấu ấn đỏ trong chứng thư phải dùng file `museum-red-seal.png`, không thay dấu ấn này cho logo bảo tàng.
- Ảnh sản phẩm, bảng phát triển ý tưởng, chứng nhận quyền tác giả và logo VTC phải lấy từ `public/heritage`.
- Trang phải thể hiện rõ đây là hồ sơ số của sản phẩm đã phát hành, gồm câu chuyện, chất liệu, hành trình sản phẩm, truy xuất, chứng thư văn hóa, chứng nhận quyền tác giả và đơn vị vận hành.

## Công nghệ và triển khai

- Next.js App Router + TypeScript + Tailwind/PostCSS theo cấu hình hiện tại.
- Static export, không backend.
- GitHub Actions build và deploy GitHub Pages.
- Repository cũ dùng tên `trace`, vì vậy `next.config.ts` đang đặt `basePath` và `assetPrefix` là `/trace`.
- Khi tôi cung cấp tên repository GitHub mới, hãy cập nhật `basePath` và `assetPrefix` đúng tên repository mới. Nếu deploy ở domain gốc hoặc custom domain, hãy hướng dẫn bỏ hai giá trị này khi phù hợp.
- Không commit `.env`, `node_modules`, `.next`, `out` hoặc thông tin bí mật.

## Quy trình làm việc bắt buộc

Sau khi kiểm tra repository, hãy tiếp tục từ trạng thái hiện có, không dựng lại từ đầu. Mỗi lần chỉnh sửa phải:

1. Giữ nguyên những phần đúng và chỉ sửa phần liên quan.
2. Kiểm tra responsive trên iPhone và Android ở các chiều rộng khoảng 320, 375, 390 và 430 px.
3. Kiểm tra đặc biệt phần chứng thư nằm ngang: phải thấy toàn bộ bốn cạnh trong một khung, không có thanh cuộn ngang.
4. Chạy cài đặt dependency nếu cần, sau đó chạy typecheck, lint và production build.
5. Sửa toàn bộ lỗi phát hiện trước khi kết thúc.
6. Cung cấp commit summary và commit description bằng tiếng Việt cho mỗi đợt thay đổi.
7. Chỉ push lên GitHub mới sau khi tôi đã kết nối/cấp quyền và yêu cầu rõ ràng.

## Việc đầu tiên cần làm

Hãy kiểm tra file ZIP/repository được đính kèm, cho tôi biết nó có đầy đủ 22 file nguồn hay không, xác nhận workflow GitHub Pages tồn tại, rồi hướng dẫn tôi tạo repository GitHub mới và kết nối repository đó. Chưa thay đổi nội dung hoặc thiết kế cho đến khi hoàn tất báo cáo kiểm tra ban đầu.

---

## Gợi ý commit đầu tiên trên GitHub mới

Commit summary:

`Chuyển giao website hồ sơ số Dấu ấn Hoàng triều`

Commit description:

- Chuyển toàn bộ mã nguồn website tĩnh sang repository mới
- Giữ giao diện hồ sơ số sản phẩm STT-01 và các tài nguyên chứng thư
- Giữ cấu hình build và triển khai bằng GitHub Pages
- Không bao gồm dữ liệu môi trường, thư mục dependency hoặc build cache
