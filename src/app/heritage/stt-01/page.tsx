import type { Metadata } from "next";
import Image from "next/image";

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileBadge2,
  FileText,
  Fingerprint,
  Landmark,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import TraceHeader from "../../components/TraceHeader";
import AdvancedInfo from "../../components/AdvancedInfo";

export const metadata: Metadata = {
  title: "Dấu Ấn Thượng Triều Nguyễn · Hồ sơ truy xuất",
  description:
    "Thông tin truy xuất, nguồn văn hóa, bảo chứng và tài liệu xác thực của sản phẩm Dấu Ấn Thượng Triều Nguyễn, mã STT-01.",
};

const BASE = "/traceability";

const product = {
  name: "Dấu Ấn Thượng Triều Nguyễn",
  code: "STT-01",
  traceCode: "STT-01-HERITAGE",
  type: "Nam châm lưu niệm",
  size: "70 × 60 × 8 mm",
};

const verificationItems = [
  {
    label: "Mã truy xuất",
    value: "Hợp lệ",
    detail: product.traceCode,
    icon: Fingerprint,
  },
  {
    label: "Bảo chứng văn hóa",
    value: "Đã bảo chứng",
    detail: "Bảo tàng Lịch sử Quốc gia",
    icon: Landmark,
  },
  {
    label: "Quyền tác giả",
    value: "Đã được cấp chứng nhận",
    detail: "Số 8854/2026/QTG",
    icon: FileBadge2,
  },
] as const;

const heritageHighlights = [
  {
    title: "Dáng mũ",
    text:
      "Giữ đường nét nhận diện chính và bố cục đối xứng của hiện vật tham chiếu.",
  },
  {
    title: "Rồng và mây",
    text:
      "Giản lược thành các lớp chi tiết trang trí phù hợp với kích thước nhỏ.",
  },
  {
    title: "Màu sắc cung đình",
    text:
      "Chuyển hóa thành bảng màu đỏ, vàng và các điểm nhấn trang trí.",
  },
] as const;

const documents = [
  {
    title: "Chứng thư bảo chứng văn hóa",
    source: "Bảo tàng Lịch sử Quốc gia",
    meta: "Mã bảo chứng 01 · 29/08/2026",
  },
  {
    title: "Giấy chứng nhận đăng ký quyền tác giả",
    source: "Hồ sơ quyền tác giả của thiết kế",
    meta: "Số 8854/2026/QTG · 26/08/2026",
  },
] as const;

function Heading({
  n,
  kicker,
  title,
  intro,
  light = false,
}: {
  n: string;
  kicker: string;
  title: string;
  intro: string;
  light?: boolean;
}) {
  return (
    <header className={`section-heading ${light ? "light" : ""}`}>
      <span className="section-number">{n}</span>

      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
    </header>
  );
}

export default function HeritageProductPage() {
  return (
    <main className="trace-page">
      <TraceHeader />

      {/* =====================================================
          01 — TỔNG QUAN
      ===================================================== */}
      <section
        id="overview"
        className="hero section-pad chapter-wine"
      >
        <div className="hero-copy">
          <p className="eyebrow">01 — TỔNG QUAN</p>

          <h1>
            Dấu Ấn
            <br />
            <em>Thượng Triều Nguyễn</em>
          </h1>

          <p className="hero-lead">
            Sản phẩm lưu niệm lấy cảm hứng từ mỹ thuật cung đình
            triều Nguyễn, phát triển từ các yếu tố tạo hình của mũ
            Cửu Long Thông Thiên.
          </p>

          <div className="hero-meta">
            <span>
              <small>MÃ SẢN PHẨM</small>
              <b>{product.code}</b>
            </span>

            <span>
              <small>LOẠI SẢN PHẨM</small>
              <b>{product.type}</b>
            </span>

            <span>
              <small>MÃ TRUY XUẤT</small>
              <b>{product.traceCode}</b>
            </span>
          </div>

          <div className="hero-actions">
            <a
              href="#verification"
              className="primary-button"
            >
              Truy xuất sản phẩm
              <ArrowDown size={15} />
            </a>

            <a href="#heritage-story">
              Xem câu chuyện văn hóa
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="hero-image">
          <span className="edition">
            STT
            <b>01</b>
          </span>

          <Image
            src={`${BASE}/heritage/stt-01-product.webp`}
            alt="Sản phẩm Dấu Ấn Thượng Triều Nguyễn"
            width={1000}
            height={1000}
            sizes="(max-width: 760px) 92vw, 54vw"
            priority
          />

          <div className="status-chip">
            <CheckCircle2 />

            <span>
              <small>TRẠNG THÁI</small>
              <b>Mã truy xuất hợp lệ</b>
            </span>
          </div>
        </div>

        <nav
          className="quick-nav"
          aria-label="Điều hướng nhanh"
        >
          <p>
            <span>THÔNG TIN NHANH</span>
            Những nội dung người dùng thường quan tâm
          </p>

          <div>
            <a href="#verification">
              <i>02</i>
              <span>Xác thực</span>
              <ArrowDown size={13} />
            </a>

            <a href="#heritage-story">
              <i>03</i>
              <span>Câu chuyện</span>
              <ArrowDown size={13} />
            </a>

            <a href="#merch">
              <i>04</i>
              <span>VTC Merch</span>
              <ArrowDown size={13} />
            </a>

            <a href="#documents">
              <i>05</i>
              <span>Tài liệu</span>
              <ArrowDown size={13} />
            </a>
          </div>
        </nav>
      </section>

      {/* =====================================================
          02 — XÁC THỰC
      ===================================================== */}
      <section
        id="verification"
        className="content-section section-pad chapter-cream"
      >
        <Heading
          n="02"
          kicker="XÁC THỰC SẢN PHẨM"
          title="Những thông tin quan trọng nhất."
          intro="Người dùng có thể kiểm tra nhanh trạng thái mã truy xuất, bảo chứng văn hóa và quyền tác giả của sản phẩm."
        />

        <div className="verification-summary">
          {verificationItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="verification-summary-card"
                key={item.label}
              >
                <Icon />

                <small>{item.label}</small>

                <h3>{item.value}</h3>

                <p>{item.detail}</p>
              </article>
            );
          })}
        </div>

        <div className="verification-basic-grid">
          <article className="basic-product-info">
            <p className="eyebrow">
              THÔNG TIN CƠ BẢN
            </p>

            <dl>
              <div>
                <dt>Tên sản phẩm</dt>
                <dd>{product.name}</dd>
              </div>

              <div>
                <dt>Loại sản phẩm</dt>
                <dd>{product.type}</dd>
              </div>

              <div>
                <dt>Kích thước</dt>
                <dd>{product.size}</dd>
              </div>

              <div>
                <dt>Mã sản phẩm</dt>
                <dd>{product.code}</dd>
              </div>
            </dl>
          </article>

          <article className="basic-trace-result">
            <Fingerprint />

            <span className="valid">
              <Check />
              MÃ TRUY XUẤT HỢP LỆ
            </span>

            <h3>{product.traceCode}</h3>

            <p>
              Mã đang tồn tại trên hệ thống và được liên kết với
              hồ sơ sản phẩm {product.code}.
            </p>

            <a
              href="#advanced"
              className="advanced-link"
            >
              Xem thông tin nâng cao
              <ArrowDown size={15} />
            </a>
          </article>
        </div>
      </section>

      {/* =====================================================
          03 — CÂU CHUYỆN VĂN HÓA
      ===================================================== */}
      <section
        id="heritage-story"
        className="content-section section-pad chapter-wine"
      >
        <Heading
          light
          n="03"
          kicker="CÂU CHUYỆN VĂN HÓA"
          title="Từ mũ Cửu Long Thông Thiên đến sản phẩm lưu niệm."
          intro="Một cái nhìn ngắn gọn về nguồn cảm hứng và những yếu tố văn hóa được sử dụng trong thiết kế."
        />

        <div className="heritage-grid">
          <figure>
            <Image
              src={`${BASE}/heritage/heritage-hat-front.webp`}
              alt="Mũ Cửu Long Thông Thiên triều Nguyễn"
              width={820}
              height={810}
              sizes="(max-width: 760px) 100vw, 50vw"
            />

            <figcaption>
              TƯ LIỆU THAM CHIẾU · MŨ CỬU LONG THÔNG THIÊN
              TRIỀU NGUYỄN
            </figcaption>
          </figure>

          <div className="heritage-story">
            <p className="eyebrow">
              NGUỒN CẢM HỨNG
            </p>

            <blockquote>
              Thiết kế tập trung vào dáng mũ, bố cục đối xứng và
              các yếu tố trang trí đặc trưng của mỹ thuật cung
              đình triều Nguyễn.
            </blockquote>

            <p>
              Các yếu tố như dáng mũ vươn cao, hình tượng rồng,
              mây và hệ chi tiết trang trí được giản lược và tổ
              chức lại để phù hợp với kích thước và công năng của
              một sản phẩm lưu niệm.
            </p>

            <a
              href="#advanced"
              className="story-more-link"
            >
              Khám phá chi tiết nguồn văn hóa
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="heritage-depth">
          {heritageHighlights.map(
            (item, index) => (
              <article key={item.title}>
                <span>
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          04 — VTC MERCH
      ===================================================== */}
      <section
        id="merch"
        className="content-section section-pad chapter-cream"
      >
        <Heading
          n="04"
          kicker="VTC MERCH"
          title="Tiếp tục khám phá hệ sinh thái sản phẩm văn hóa."
          intro="Trang truy xuất đồng thời là điểm kết nối người dùng với các sản phẩm, câu chuyện và dịch vụ trong hệ sinh thái Merch."
        />

        <div className="merch-feature">
          <div className="merch-feature-copy">
            <p className="eyebrow">
              HỆ SINH THÁI VTC MERCH
            </p>

            <h3>
              Sản phẩm văn hóa được phát triển từ nguồn
              cảm hứng Việt Nam.
            </h3>

            <p>
              Khám phá các bộ sưu tập, sản phẩm mới,
              câu chuyện văn hóa và chương trình hợp tác
              dành cho bảo tàng, đơn vị văn hóa và nhà
              thiết kế.
            </p>

            <a
              href="#"
              className="primary-button"
            >
              Khám phá VTC Merch
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="merch-feature-visual">
            <Image
              src={`${BASE}/heritage/product-lifestyle.webp`}
              alt="Không gian giới thiệu sản phẩm VTC Merch"
              width={1200}
              height={900}
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="merch-cards">
          <article>
            <Sparkles />

            <small>SẢN PHẨM MỚI</small>

            <h3>Bộ sưu tập mới</h3>

            <p>
              Tiếp tục khám phá các sản phẩm phát triển
              từ nguồn cảm hứng văn hóa Việt Nam.
            </p>
          </article>

          <article>
            <Landmark />

            <small>CÂU CHUYỆN VĂN HÓA</small>

            <h3>Tìm hiểu nguồn cảm hứng</h3>

            <p>
              Mỗi sản phẩm được liên kết với câu chuyện
              và nguồn văn hóa cụ thể.
            </p>
          </article>

          <article>
            <PackageCheck />

            <small>HỢP TÁC</small>

            <h3>Phát triển sản phẩm</h3>

            <p>
              Kết nối bảo tàng, đơn vị văn hóa, nhà
              thiết kế và đối tác sản xuất.
            </p>
          </article>
        </div>
      </section>

      {/* =====================================================
          05 — TÀI LIỆU
      ===================================================== */}
      <section
        id="documents"
        className="records section-pad chapter-wine"
      >
        <div>
          <span className="section-number">
            05
          </span>

          <p className="eyebrow">
            TÀI LIỆU XÁC THỰC
          </p>

          <h2>
            Tài liệu chính để kiểm tra thông tin.
          </h2>

          <p>
            Người dùng phổ thông có thể tiếp cận nhanh
            những tài liệu quan trọng nhất. Các hồ sơ
            chuyên sâu được đặt trong mục Nâng cao.
          </p>
        </div>

        <div>
          {documents.map((document) => (
            <div
              className="record-row"
              key={document.title}
            >
              <FileText />

              <span>
                <b>{document.title}</b>
                <small>{document.source}</small>
                <small>{document.meta}</small>
              </span>

              <ShieldCheck />
            </div>
          ))}

          <a
            href="#advanced"
            className="records-advanced-link"
          >
            Xem toàn bộ hồ sơ nâng cao
            <ArrowDown size={15} />
          </a>
        </div>
      </section>

      {/* =====================================================
          06 — THÔNG TIN NÂNG CAO
          Component riêng
      ===================================================== */}
      <AdvancedInfo />

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-seal">
            ẤN
          </span>

          <span>
            <b>NỀN TẢNG TRUY XUẤT</b>
            <small>SẢN PHẨM VĂN HÓA</small>
          </span>
        </div>

        <div className="footer-info">
          <p>
            <b>Thông tin nền tảng</b>
          </p>

          <a href="#overview">
            Tổng quan
          </a>

          <a href="#verification">
            Xác thực
          </a>

          <a href="#heritage-story">
            Câu chuyện văn hóa
          </a>

          <a href="#merch">
            VTC Merch
          </a>

          <a href="#documents">
            Tài liệu
          </a>

          <a href="#advanced">
            Nâng cao
          </a>
        </div>

        <div className="footer-operator">
          <Image
            src={`${BASE}/heritage/vtc-logo.webp`}
            alt="VTC"
            width={500}
            height={270}
            sizes="105px"
          />

          <span>
            <small>
              NỀN TẢNG ĐƯỢC VẬN HÀNH BỞI
            </small>

            <b>VTC</b>

            <em>
              Tổng công ty Truyền thông Đa phương tiện
            </em>
          </span>
        </div>

        <a
          className="back-top"
          href="#overview"
        >
          Về đầu trang
          <ArrowUpRight size={14} />
        </a>

        <p className="footer-bottom">
          © 2026 Tổng công ty Truyền thông Đa phương tiện
          (VTC) · Hồ sơ truy xuất sản phẩm {product.code}.
        </p>
      </footer>
    </main>
  );
}
