import Image from "next/image";

import {
  CheckCircle2,
  FileText,
  Fingerprint,
  Info,
  Landmark,
  LockKeyhole,
  PackageCheck,
  QrCode,
  Ruler,
  ShieldCheck,
} from "lucide-react";

const BASE = "/traceability";

const product = {
  name: "Dấu Ấn Thượng Triều Nguyễn",
  code: "STT-01",
  traceCode: "STT-01-HERITAGE",
  version: "01-01",
  lot: "LOT-2026-08-001",
  serial: "00012345",
};

const designMappings = [
  {
    source: "Dáng mũ tổng thể",
    result:
      "Giữ đường bao chính và thu gọn tỷ lệ để phù hợp với kích thước của sản phẩm nam châm.",
  },
  {
    source: "Hai cánh mũ",
    result:
      "Giữ bố cục đối xứng và hướng vươn cao nhằm duy trì dấu hiệu nhận diện chính của hiện vật.",
  },
  {
    source: "Hình tượng rồng",
    result:
      "Giản lược chi tiết và tổ chức lại trên bề mặt sản phẩm để phù hợp với kích thước nhỏ.",
  },
  {
    source: "Họa tiết mây",
    result:
      "Chuyển thành các lớp trang trí đối xứng nhằm tạo chiều sâu cho cấu trúc nhiều lớp.",
  },
  {
    source: "Điểm nhấn trung tâm",
    result:
      "Tổ chức lại thành chi tiết màu đỏ tại tâm để cân bằng bố cục và tạo điểm nhìn chính.",
  },
  {
    source: "Chuỗi hạt và tua",
    result:
      "Tái cấu trúc thành hệ chi tiết trang trí ở phần dưới sản phẩm, giữ nhịp điệu của thiết kế gốc.",
  },
] as const;

const journey = [
  {
    number: "01",
    title: "Nghiên cứu nguồn văn hóa",
    detail:
      "Xác định hiện vật tham chiếu và các yếu tố tạo hình có thể khai thác.",
  },
  {
    number: "02",
    title: "Phát triển thiết kế",
    detail:
      "Lựa chọn và chuyển hóa các yếu tố văn hóa thành phương án sản phẩm.",
  },
  {
    number: "03",
    title: "Hoàn thiện phương án",
    detail: `Phiên bản ${product.version}`,
  },
  {
    number: "04",
    title: "Bảo chứng văn hóa",
    detail: "Mã bảo chứng 01 · 29/08/2026",
  },
  {
    number: "05",
    title: "Sản xuất và kiểm tra",
    detail: product.lot,
  },
  {
    number: "06",
    title: "Cấp mã truy xuất",
    detail: product.traceCode,
  },
] as const;

function Note({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`data-note ${dark ? "dark" : ""}`}>
      <Info size={14} />
      <span>{children}</span>
    </div>
  );
}

function AdvancedHeading() {
  return (
    <header className="section-heading">
      <span className="section-number">06</span>

      <div>
        <p className="eyebrow">THÔNG TIN NÂNG CAO</p>

        <h2>Dành cho người muốn tìm hiểu sâu hơn.</h2>

        <p>
          Khu vực này tập hợp các thông tin chuyên sâu về nguồn văn hóa,
          quá trình chuyển hóa thiết kế, bảo chứng, quyền tác giả, hành
          trình phát triển và dữ liệu truy xuất.
        </p>
      </div>
    </header>
  );
}

export default function AdvancedInfo() {
  return (
    <section
      id="advanced"
      className="content-section section-pad advanced-section"
    >
      <AdvancedHeading />

      {/* =====================================================
          01 — NGUỒN VĂN HÓA
      ===================================================== */}
      <details className="advanced-accordion">
        <summary>
          <span>01</span>

          <strong>Nguồn văn hóa chi tiết</strong>

          <b aria-hidden="true">+</b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-two-column">
            <div>
              <p className="eyebrow">HIỆN VẬT THAM CHIẾU</p>

              <h3>Mũ Cửu Long Thông Thiên triều Nguyễn</h3>

              <p>
                Hiện vật được sử dụng làm nguồn tham chiếu cho dáng tổng
                thể, bố cục đối xứng và hệ thống chi tiết trang trí của
                sản phẩm.
              </p>

              <dl className="advanced-meta-list">
                <div>
                  <dt>Loại hình tham chiếu</dt>
                  <dd>Hiện vật cung đình triều Nguyễn</dd>
                </div>

                <div>
                  <dt>Yếu tố khai thác</dt>
                  <dd>
                    Dáng mũ, cánh mũ, rồng, mây và hệ chi tiết trang trí
                  </dd>
                </div>

                <div>
                  <dt>Mục đích sử dụng</dt>
                  <dd>Tham chiếu phát triển thiết kế sản phẩm</dd>
                </div>
              </dl>

              <Note>
                Khi công bố chính thức, phần này cần liên kết trực tiếp
                tới tài liệu và hình ảnh do đơn vị lưu giữ hiện vật xác
                nhận.
              </Note>
            </div>

            <Image
              src={`${BASE}/heritage/heritage-hat-front.webp`}
              alt="Mũ Cửu Long Thông Thiên triều Nguyễn"
              width={820}
              height={810}
              sizes="(max-width: 760px) 100vw, 44vw"
            />
          </div>
        </div>
      </details>

      {/* =====================================================
          02 — CHUYỂN HÓA THIẾT KẾ
      ===================================================== */}
      <details className="advanced-accordion">
        <summary>
          <span>02</span>

          <strong>Chuyển hóa thiết kế</strong>

          <b aria-hidden="true">+</b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-design-layout">
            <div className="advanced-concept-image">
              <Image
                src={`${BASE}/heritage/stt-01-concept-board.webp`}
                alt="Hồ sơ phát triển thiết kế sản phẩm STT-01"
                width={1100}
                height={1020}
                sizes="(max-width: 760px) 100vw, 44vw"
              />

              <small>HỒ SƠ PHÁT TRIỂN · PHƯƠNG ÁN STT-01</small>
            </div>

            <div className="advanced-design-list">
              {designMappings.map((item, index) => (
                <article key={item.source}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{item.source}</h3>

                    <p>{item.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="advanced-principle">
            <p className="eyebrow">NGUYÊN TẮC CHUYỂN HÓA</p>

            <p>
              <b>
                Sản phẩm kế thừa các yếu tố tạo hình và biểu tượng,
                không phải bản sao nguyên trạng của hiện vật.
              </b>{" "}
              Các chi tiết được giản lược và bố cục lại để phù hợp với
              kích thước, vật liệu và công năng của sản phẩm lưu niệm.
            </p>
          </div>
        </div>
      </details>

      {/* =====================================================
          03 — BẢO CHỨNG
      ===================================================== */}
      <details className="advanced-accordion">
        <summary>
          <span>03</span>

          <strong>Bảo chứng văn hóa</strong>

          <b aria-hidden="true">+</b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-card-grid">
            <article>
              <Landmark />

              <small>ĐƠN VỊ BẢO CHỨNG</small>

              <h3>Bảo tàng Lịch sử Quốc gia</h3>
            </article>

            <article>
              <ShieldCheck />

              <small>TRẠNG THÁI</small>

              <h3>Đã bảo chứng</h3>
            </article>

            <article>
              <FileText />

              <small>MÃ BẢO CHỨNG</small>

              <h3>01</h3>
            </article>

            <article>
              <CheckCircle2 />

              <small>NGÀY BẢO CHỨNG</small>

              <h3>29/08/2026</h3>
            </article>
          </div>

          <div className="advanced-document-preview">
            <div>
              <p className="eyebrow">PHẠM VI HỒ SƠ</p>

              <h3>
                Bảo chứng các yếu tố văn hóa được khai thác trong phương
                án thiết kế.
              </h3>

              <p>
                Thông tin bảo chứng được liên kết với sản phẩm{" "}
                {product.code}, phiên bản {product.version}.
              </p>

              <Note>
                Phạm vi bảo chứng cụ thể cần được hiểu theo nội dung ghi
                trong chứng thư và tài liệu đối chiếu đi kèm.
              </Note>
            </div>

            <div className="advanced-attestation-art">
              <Image
                src={`${BASE}/heritage/museum-logo.webp`}
                alt="Biểu trưng Bảo tàng Lịch sử Quốc gia"
                width={240}
                height={240}
              />

              <span>
                <small>CHỨNG THƯ BẢO CHỨNG</small>
                <b>STT-01</b>
                <em>Mã bảo chứng 01</em>
              </span>

              <Image
                src={`${BASE}/heritage/museum-red-seal.webp`}
                alt="Dấu xác nhận trên hồ sơ bảo chứng"
                width={240}
                height={240}
              />
            </div>
          </div>
        </div>
      </details>

      {/* =====================================================
          04 — QUYỀN TÁC GIẢ
      ===================================================== */}
      <details className="advanced-accordion">
        <summary>
          <span>04</span>

          <strong>Quyền tác giả</strong>

          <b aria-hidden="true">+</b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-two-column">
            <div>
              <p className="eyebrow">GIẤY CHỨNG NHẬN</p>

              <h3>Giấy chứng nhận đăng ký quyền tác giả</h3>

              <dl className="advanced-meta-list">
                <div>
                  <dt>Tên tác phẩm</dt>
                  <dd>{product.name}</dd>
                </div>

                <div>
                  <dt>Loại hình</dt>
                  <dd>Mỹ thuật ứng dụng</dd>
                </div>

                <div>
                  <dt>Số giấy chứng nhận</dt>
                  <dd>8854/2026/QTG</dd>
                </div>

                <div>
                  <dt>Ngày cấp</dt>
                  <dd>26/08/2026</dd>
                </div>

                <div>
                  <dt>Chủ sở hữu quyền</dt>
                  <dd>Theo nội dung giấy chứng nhận</dd>
                </div>
              </dl>

              <Note>
                Tên tác giả và chủ sở hữu quyền cần được hiển thị chính
                xác theo bản giấy chứng nhận được liên kết với hệ thống.
              </Note>
            </div>

            <Image
              src={`${BASE}/heritage/copyright-certificate.webp`}
              alt="Giấy chứng nhận đăng ký quyền tác giả"
              width={700}
              height={934}
              sizes="(max-width: 760px) 90vw, 42vw"
            />
          </div>
        </div>
      </details>

      {/* =====================================================
          05 — HÀNH TRÌNH
      ===================================================== */}
      <details className="advanced-accordion">
        <summary>
          <span>05</span>

          <strong>Hành trình sản phẩm</strong>

          <b aria-hidden="true">+</b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-journey">
            {journey.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>

                <div>
                  <h3>{step.title}</h3>

                  <p>{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </details>

      {/* =====================================================
          06 — DỮ LIỆU TRUY XUẤT
      ===================================================== */}
      <details className="advanced-accordion">
        <summary>
          <span>06</span>

          <strong>Dữ liệu truy xuất</strong>

          <b aria-hidden="true">+</b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-trace-grid">
            <article>
              <Fingerprint />

              <small>MÃ TRUY XUẤT</small>

              <h3>{product.traceCode}</h3>
            </article>

            <article>
              <PackageCheck />

              <small>LÔ SẢN XUẤT</small>

              <h3>{product.lot}</h3>

              <p>Dữ liệu mẫu</p>
            </article>

            <article>
              <QrCode />

              <small>SỐ SERI</small>

              <h3>{product.serial}</h3>

              <p>Dữ liệu mẫu</p>
            </article>

            <article>
              <Ruler />

              <small>PHIÊN BẢN</small>

              <h3>{product.version}</h3>
            </article>
          </div>

          <div className="privacy-panel">
            <LockKeyhole />

            <div>
              <b>Quyền riêng tư khi truy xuất</b>

              <p>
                Trang công khai không hiển thị địa chỉ IP, tên thiết bị,
                trình duyệt hoặc thông tin nhận dạng cá nhân của người
                dùng đã kiểm tra mã trước đó.
              </p>
            </div>
          </div>
        </div>
      </details>
    </section>
  );
}
