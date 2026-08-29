import type { Metadata } from "next";
import Image from "next/image";

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileBadge2,
  FileCheck2,
  FileText,
  Fingerprint,
  Info,
  Landmark,
  LockKeyhole,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import TraceHeader from "../../components/TraceHeader";

export const metadata: Metadata = {
  title: "Dấu Ấn Thượng Triều Nguyễn · Hồ sơ truy xuất",
  description:
    "Thông tin sản phẩm, nguồn văn hóa, bảo chứng, quyền tác giả và dữ liệu truy xuất của Dấu Ấn Thượng Triều Nguyễn, mã STT-01.",
};

const BASE = "/traceability";

const product = {
  name: "Dấu Ấn Thượng Triều Nguyễn",
  code: "STT-01",
  version: "01-01",
  traceCode: "STT-01-HERITAGE",
  lot: "LOT-2026-08-001",
  serial: "00012345",
};

const quickNav = [
  ["02", "Thông tin sản phẩm", "product-info"],
  ["03", "Nguồn văn hóa", "heritage"],
  ["04", "Chuyển hóa thiết kế", "design-development"],
  ["05", "Bảo chứng văn hóa", "attestation"],
  ["06", "Quyền tác giả", "copyright"],
  ["07", "Hành trình sản phẩm", "journey"],
  ["08", "Truy xuất sản phẩm", "verification"],
  ["09", "Tài liệu xác thực", "records"],
] as const;

const designMappings = [
  {
    number: "01",
    source: "Dáng mũ tổng thể",
    transformation:
      "Giữ đường bao nhận diện chính, thu gọn tỷ lệ để phù hợp với kích thước của sản phẩm nam châm.",
  },
  {
    number: "02",
    source: "Hai cánh mũ",
    transformation:
      "Giữ bố cục đối xứng và hướng vươn cao, tạo điểm nhận diện nổi bật cho toàn bộ thiết kế.",
  },
  {
    number: "03",
    source: "Hình tượng rồng",
    transformation:
      "Giản lược chi tiết và tổ chức lại trên hai cánh nhằm bảo đảm khả năng thể hiện ở kích thước nhỏ.",
  },
  {
    number: "04",
    source: "Họa tiết mây",
    transformation:
      "Chuyển thành các lớp trang trí đối xứng, tạo chiều sâu cho cấu trúc nhiều lớp của sản phẩm.",
  },
  {
    number: "05",
    source: "Điểm nhấn trung tâm",
    transformation:
      "Tổ chức lại thành chi tiết màu đỏ tại tâm, giúp cân bằng bố cục và tạo điểm nhìn chính.",
  },
  {
    number: "06",
    source: "Chuỗi hạt và chi tiết trang trí",
    transformation:
      "Tái cấu trúc thành hệ hạt và tua phía dưới, giữ nhịp trang trí nhưng giảm độ phức tạp.",
  },
] as const;

const journey = [
  {
    number: "01",
    title: "Nghiên cứu nguồn văn hóa",
    name: "Mũ Cửu Long Thông Thiên triều Nguyễn",
    status: "Xác định hiện vật và các yếu tố tạo hình tham chiếu",
  },
  {
    number: "02",
    title: "Phát triển thiết kế",
    name: "Phương án STT-01",
    status: "Lựa chọn và chuyển hóa các yếu tố văn hóa vào sản phẩm",
  },
  {
    number: "03",
    title: "Hoàn thiện phương án",
    name: "Phiên bản 01-01",
    status: "Hoàn thiện cấu trúc, tỷ lệ và phương án thể hiện",
  },
  {
    number: "04",
    title: "Bảo chứng văn hóa",
    name: "Mã bảo chứng 01",
    status: "Bảo tàng Lịch sử Quốc gia · 29/08/2026",
  },
  {
    number: "05",
    title: "Sản xuất và kiểm tra",
    name: product.lot,
    status: "Thông tin lô sản xuất đang được dùng cho phiên bản minh họa",
  },
  {
    number: "06",
    title: "Cấp mã truy xuất",
    name: product.traceCode,
    status: "Liên kết mã truy xuất với hồ sơ sản phẩm STT-01",
  },
] as const;

const records = [
  {
    title: "Chứng thư bảo chứng văn hóa",
    source: "Bảo tàng Lịch sử Quốc gia",
    meta: "Mã 01 · 29/08/2026",
  },
  {
    title: "Giấy chứng nhận đăng ký quyền tác giả",
    source: "Hồ sơ quyền tác giả của thiết kế",
    meta: "Số 8854/2026/QTG · 26/08/2026",
  },
  {
    title: "Tư liệu nguồn văn hóa",
    source: "Mũ Cửu Long Thông Thiên triều Nguyễn",
    meta: "Ảnh hiện vật và tài liệu tham chiếu",
  },
  {
    title: "Hồ sơ phát triển sản phẩm",
    source: "Phương án thiết kế STT-01",
    meta: "Phiên bản 01-01",
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

      {/* ======================================================
          01 — TỔNG QUAN
      ====================================================== */}
      <section id="overview" className="hero section-pad chapter-wine">
        <div className="hero-copy">
          <p className="eyebrow">01 — TỔNG QUAN</p>

          <h1>
            Dấu Ấn
            <br />
            <em>Thượng Triều Nguyễn</em>
          </h1>

          <p className="hero-lead">
            Dấu Ấn Thượng Triều Nguyễn là sản phẩm lưu niệm phát triển
            từ các yếu tố tạo hình của mũ Cửu Long Thông Thiên triều
            Nguyễn. Hồ sơ này cung cấp thông tin sản phẩm, nguồn văn hóa,
            quá trình chuyển hóa thiết kế, bảo chứng, quyền tác giả và dữ
            liệu truy xuất.
          </p>

          <div className="hero-meta">
            <span>
              <small>MÃ SẢN PHẨM</small>
              <b>{product.code}</b>
            </span>

            <span>
              <small>PHIÊN BẢN</small>
              <b>{product.version}</b>
            </span>

            <span>
              <small>MÃ TRUY XUẤT</small>
              <b>{product.traceCode}</b>
            </span>
          </div>

          <div className="hero-actions">
            <a href="#verification" className="primary-button">
              Truy xuất sản phẩm
              <ArrowDown size={15} />
            </a>

            <a href="#heritage">
              Xem nguồn văn hóa
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
              <small>TRẠNG THÁI MÃ</small>
              <b>Mã truy xuất hợp lệ</b>
            </span>
          </div>
        </div>

        <nav
          className="quick-nav"
          aria-label="Điều hướng nhanh hồ sơ sản phẩm"
        >
          <p>
            <span>KHÁM PHÁ HỒ SƠ SẢN PHẨM</span>
            Chọn nội dung cần xem
          </p>

          <div>
            {quickNav.map(([number, title, id]) => (
              <a href={`#${id}`} key={id}>
                <i>{number}</i>
                <span>{title}</span>
                <ArrowDown size={13} />
              </a>
            ))}
          </div>
        </nav>
      </section>

      {/* ======================================================
          02 — THÔNG TIN SẢN PHẨM
      ====================================================== */}
      <section
        id="product-info"
        className="content-section section-pad chapter-cream"
      >
        <Heading
          n="02"
          kicker="THÔNG TIN SẢN PHẨM"
          title="Thông tin nhận diện của sản phẩm."
          intro="Các thông tin dưới đây được sử dụng thống nhất trong toàn bộ hồ sơ truy xuất của phiên bản STT-01."
        />

        <div className="details-grid">
          <div className="product-gallery">
            <Image
              src={`${BASE}/heritage/product-lifestyle.webp`}
              alt="Dấu Ấn Thượng Triều Nguyễn trong bối cảnh sử dụng"
              width={1200}
              height={900}
              sizes="(max-width: 760px) 46vw, 28vw"
            />

            <Image
              src={`${BASE}/heritage/stt-01-product.webp`}
              alt="Chi tiết sản phẩm STT-01"
              width={1000}
              height={1000}
              sizes="(max-width: 760px) 46vw, 28vw"
            />
          </div>

          <div className="specs">
            <article>
              <PackageCheck />
              <small>LOẠI SẢN PHẨM</small>
              <b>Nam châm lưu niệm</b>
            </article>

            <article>
              <Ruler />
              <small>KÍCH THƯỚC</small>
              <b>70 × 60 × 8 mm</b>
            </article>

            <article>
              <Sparkles />
              <small>CHẤT LIỆU</small>
              <b>Kẽm hợp kim, hoàn thiện bề mặt và cấu trúc nhiều lớp</b>
            </article>

            <article>
              <Fingerprint />
              <small>MÃ / PHIÊN BẢN</small>
              <b>
                {product.code} / {product.version}
              </b>
            </article>

            <div className="missing-data">
              <p className="eyebrow">THÔNG TIN SẢN XUẤT</p>

              <p>
                Đơn vị sản xuất và thông số vật liệu chi tiết sẽ được cập
                nhật theo hồ sơ sản xuất chính thức của từng lô.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          03 — NGUỒN VĂN HÓA
      ====================================================== */}
      <section
        id="heritage"
        className="content-section section-pad chapter-wine"
      >
        <Heading
          light
          n="03"
          kicker="NGUỒN VĂN HÓA"
          title="Mũ Cửu Long Thông Thiên triều Nguyễn."
          intro="Hiện vật được sử dụng làm nguồn tham chiếu để xác định dáng tổng thể, bố cục và các yếu tố trang trí cho quá trình phát triển sản phẩm."
        />

        <div className="heritage-grid">
          <figure>
            <Image
              src={`${BASE}/heritage/heritage-hat-front.webp`}
              alt="Mũ Cửu Long Thông Thiên triều Nguyễn nhìn từ phía trước"
              width={820}
              height={810}
              sizes="(max-width: 760px) 100vw, 50vw"
            />

            <figcaption>
              TƯ LIỆU THAM CHIẾU · MŨ CỬU LONG THÔNG THIÊN TRIỀU NGUYỄN
            </figcaption>
          </figure>

          <div className="heritage-story">
            <p className="eyebrow">HIỆN VẬT THAM CHIẾU</p>

            <blockquote>
              Dáng mũ cao, bố cục đối xứng và hệ thống trang trí cung đình
              tạo nên những dấu hiệu nhận diện chính được khai thác trong
              thiết kế.
            </blockquote>

            <p>
              Mũ Cửu Long Thông Thiên thuộc hệ thống lễ phục cung đình
              triều Nguyễn. Thiết kế sản phẩm tập trung khai thác hình
              dáng tổng thể của mũ, hai cánh vươn cao, hình tượng rồng,
              mây và hệ thống chi tiết trang trí.
            </p>

            <Note dark>
              Hồ sơ nguồn cần liên kết trực tiếp với tài liệu và hình ảnh
              do đơn vị lưu giữ hiện vật xác nhận khi công bố chính thức.
            </Note>
          </div>
        </div>

        <div className="heritage-depth">
          <article>
            <span>01</span>

            <div>
              <h3>Dáng tổng thể</h3>

              <p>
                Hai cánh mũ vươn cao và bố cục cân đối hai bên là đặc
                điểm nhận diện được ưu tiên giữ lại khi phát triển sản
                phẩm.
              </p>
            </div>
          </article>

          <article>
            <span>02</span>

            <div>
              <h3>Hệ họa tiết cung đình</h3>

              <p>
                Rồng, mây và các chi tiết trang trí được lựa chọn làm
                nguồn tạo hình, sau đó giản lược để phù hợp với kích
                thước nhỏ.
              </p>
            </div>
          </article>

          <article>
            <span>03</span>

            <div>
              <h3>Giá trị khai thác thiết kế</h3>

              <p>
                Giá trị tham chiếu nằm ở hình dáng, biểu tượng, bố cục và
                câu chuyện văn hóa; sản phẩm không phải bản sao của hiện
                vật gốc.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ======================================================
          04 — CHUYỂN HÓA THIẾT KẾ
      ====================================================== */}
      <section
        id="design-development"
        className="content-section section-pad chapter-cream"
      >
        <Heading
          n="04"
          kicker="CHUYỂN HÓA THIẾT KẾ"
          title="Từ hiện vật tham chiếu đến sản phẩm."
          intro="Các yếu tố văn hóa được lựa chọn, giản lược và tổ chức lại để phù hợp với công năng, kích thước và phương pháp sản xuất của một sản phẩm lưu niệm đương đại."
        />

        <div className="design-grid">
          <div className="concept-board">
            <Image
              src={`${BASE}/heritage/stt-01-concept-board.webp`}
              alt="Bảng phát triển thiết kế sản phẩm STT-01"
              width={1100}
              height={1020}
              sizes="(max-width: 760px) 100vw, 50vw"
            />

            <span>HỒ SƠ PHÁT TRIỂN · PHƯƠNG ÁN STT-01</span>
          </div>

          <div className="design-notes">
            <p className="eyebrow">
              ĐỐI CHIẾU NGUỒN VĂN HÓA — THIẾT KẾ
            </p>

            {designMappings.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>

                <div>
                  <h3>{item.source}</h3>
                  <p>{item.transformation}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="material-disclosure">
          <p className="eyebrow">NGUYÊN TẮC CHUYỂN HÓA</p>

          <p>
            <b>
              Sản phẩm kế thừa yếu tố tạo hình và biểu tượng, không phải
              bản sao hiện vật.
            </b>{" "}
            Các chi tiết được giản lược và bố cục lại để phù hợp với vật
            liệu, kích thước và công năng của sản phẩm nam châm lưu niệm.
          </p>
        </div>
      </section>

      {/* ======================================================
          05 — BẢO CHỨNG VĂN HÓA
      ====================================================== */}
      <section
        id="attestation"
        className="content-section section-pad chapter-wine"
      >
        <Heading
          light
          n="05"
          kicker="BẢO CHỨNG VĂN HÓA"
          title="Xác nhận các yếu tố văn hóa được sử dụng trong thiết kế."
          intro="Thông tin bảo chứng được liên kết trực tiếp với sản phẩm STT-01 và tài liệu xác nhận của đơn vị bảo chứng."
        />

        <article className="single-certificate">
          <div className="certificate-copy">
            <Landmark />

            <p className="eyebrow">ĐƠN VỊ BẢO CHỨNG</p>

            <h3>Bảo tàng Lịch sử Quốc gia</h3>

            <span className="seal-label">ĐÃ BẢO CHỨNG</span>

            <dl>
              <div>
                <dt>Mã bảo chứng</dt>
                <dd>01</dd>
              </div>

              <div>
                <dt>Ngày bảo chứng</dt>
                <dd>29/08/2026</dd>
              </div>

              <div>
                <dt>Sản phẩm</dt>
                <dd>
                  {product.code} / {product.version}
                </dd>
              </div>

              <div>
                <dt>Trạng thái</dt>
                <dd>Đã bảo chứng</dd>
              </div>
            </dl>

            <Note>
              Phạm vi bảo chứng được xác định theo nội dung ghi trong
              chứng thư và tài liệu đối chiếu của sản phẩm.
            </Note>
          </div>

          <div className="certificate-art">
            <Image
              src={`${BASE}/heritage/museum-logo.webp`}
              alt="Biểu trưng Bảo tàng Lịch sử Quốc gia"
              width={240}
              height={240}
              sizes="100px"
            />

            <p>
              CHỨNG THƯ BẢO CHỨNG
              <br />
              <b>GIÁ TRỊ VĂN HÓA</b>
              <small>MÃ BẢO CHỨNG 01 · STT-01</small>
            </p>

            <Image
              src={`${BASE}/heritage/museum-red-seal.webp`}
              alt="Dấu xác nhận trên chứng thư bảo chứng"
              width={240}
              height={240}
              sizes="100px"
            />
          </div>
        </article>
      </section>

      {/* ======================================================
          06 — QUYỀN TÁC GIẢ
      ====================================================== */}
      <section
        id="copyright"
        className="content-section section-pad chapter-cream"
      >
        <Heading
          n="06"
          kicker="QUYỀN TÁC GIẢ"
          title="Thông tin pháp lý của phương án thiết kế."
          intro="Giấy chứng nhận đăng ký quyền tác giả được quản lý riêng với hồ sơ bảo chứng văn hóa và được liên kết tới cùng mã sản phẩm."
        />

        <div className="copyright-grid">
          <div>
            <FileBadge2 />

            <p className="eyebrow">GIẤY CHỨNG NHẬN</p>

            <h3>Giấy chứng nhận đăng ký quyền tác giả</h3>

            <span className="seal-label gold">
              ĐÃ ĐƯỢC CẤP CHỨNG NHẬN
            </span>

            <dl>
              <div>
                <dt>Tác phẩm</dt>
                <dd>Dấu Ấn Thượng Triều Nguyễn</dd>
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
                <dd>Theo nội dung Giấy chứng nhận</dd>
              </div>
            </dl>

            <Note>
              Tên tác giả và chủ sở hữu quyền cần hiển thị đúng theo bản
              Giấy chứng nhận đăng ký quyền tác giả khi hồ sơ chính thức
              được đưa lên hệ thống.
            </Note>
          </div>

          <Image
            src={`${BASE}/heritage/copyright-certificate.webp`}
            alt="Giấy chứng nhận đăng ký quyền tác giả"
            width={700}
            height={934}
            sizes="(max-width: 760px) 90vw, 48vw"
          />
        </div>
      </section>

      {/* ======================================================
          07 — HÀNH TRÌNH SẢN PHẨM
      ====================================================== */}
      <section
        id="journey"
        className="content-section section-pad chapter-wine"
      >
        <Heading
          light
          n="07"
          kicker="HÀNH TRÌNH SẢN PHẨM"
          title="Từ nguồn văn hóa đến mã truy xuất."
          intro="Quá trình phát triển được tổ chức thành các mốc chính để người dùng có thể theo dõi mối liên hệ giữa nguồn văn hóa, thiết kế, bảo chứng, sản xuất và phát hành."
        />

        <div className="journey">
          {journey.map((step) => (
            <article key={step.number}>
              <span className="step-number">{step.number}</span>

              <div className="step-line" />

              <div>
                <FileCheck2 />

                <small>{step.title}</small>

                <h3>{step.name}</h3>

                <p>{step.status}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======================================================
          08 — TRUY XUẤT SẢN PHẨM
      ====================================================== */}
      <section
        id="verification"
        className="content-section section-pad chapter-cream"
      >
        <Heading
          n="08"
          kicker="TRUY XUẤT SẢN PHẨM"
          title="Kiểm tra mã và hồ sơ được liên kết."
          intro="Kết quả truy xuất xác nhận mã đang tồn tại trên hệ thống và được liên kết với hồ sơ sản phẩm STT-01."
        />

        <div className="verification-grid">
          <article className="code-card">
            <Fingerprint />

            <span className="valid">
              <Check />
              MÃ TRUY XUẤT HỢP LỆ
            </span>

            <h3>{product.traceCode}</h3>

            <p>
              Mã được liên kết với {product.name}, mã sản phẩm{" "}
              {product.code}, phiên bản {product.version}.
            </p>

            <Note dark>
              Trạng thái “Mã truy xuất hợp lệ” xác nhận mã tồn tại trên
              hệ thống; không thay thế việc giám định vật lý sản phẩm.
            </Note>
          </article>

          <article className="info-card">
            <p className="eyebrow">ĐỊNH DANH SẢN PHẨM</p>

            <dl>
              <div>
                <dt>Tên sản phẩm</dt>
                <dd>{product.name}</dd>
              </div>

              <div>
                <dt>Mã sản phẩm</dt>
                <dd>{product.code}</dd>
              </div>

              <div>
                <dt>Phiên bản</dt>
                <dd>{product.version}</dd>
              </div>

              <div>
                <dt>Lô sản xuất</dt>
                <dd>
                  {product.lot}
                  <i> DỮ LIỆU MẪU</i>
                </dd>
              </div>

              <div>
                <dt>Số seri</dt>
                <dd>
                  {product.serial}
                  <i> DỮ LIỆU MẪU</i>
                </dd>
              </div>
            </dl>
          </article>
        </div>

        <div className="privacy-panel">
          <LockKeyhole />

          <div>
            <b>Thông tin truy xuất được giới hạn theo phạm vi cần thiết</b>

            <p>
              Trang công khai không hiển thị địa chỉ IP, tên thiết bị,
              trình duyệt hoặc thông tin nhận dạng của những người đã
              kiểm tra mã trước đó.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          09 — TÀI LIỆU XÁC THỰC
      ====================================================== */}
      <section
        id="records"
        className="records section-pad chapter-wine"
      >
        <div>
          <span className="section-number">09</span>

          <p className="eyebrow">TÀI LIỆU XÁC THỰC</p>

          <h2>Đối chiếu thông tin từ tài liệu gốc.</h2>

          <p>
            Các tài liệu dưới đây là căn cứ để đối chiếu các thông tin
            được trình bày trong hồ sơ sản phẩm.
          </p>
        </div>

        <div>
          {records.map((record) => (
            <div className="record-row" key={record.title}>
              <FileText />

              <span>
                <b>{record.title}</b>
                <small>{record.source}</small>
                <small>{record.meta}</small>
              </span>

              <ShieldCheck />
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-seal">ẤN</span>

          <span>
            <b>NỀN TẢNG TRUY XUẤT</b>
            <small>SẢN PHẨM VĂN HÓA</small>
          </span>
        </div>

        <div className="footer-info">
          <p>
            <b>Thông tin nền tảng</b>
          </p>

          <a href="#overview">Tổng quan</a>
          <a href="#heritage">Nguồn văn hóa</a>
          <a href="#verification">Truy xuất sản phẩm</a>
          <a href="#records">Tài liệu xác thực</a>
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
            <small>NỀN TẢNG ĐƯỢC VẬN HÀNH BỞI</small>
            <b>VTC</b>
            <em>
              Tổng công ty Truyền thông Đa phương tiện
            </em>
          </span>
        </div>

        <a className="back-top" href="#overview">
          Về đầu trang
          <ArrowUpRight size={14} />
        </a>

        <p className="footer-bottom">
          © 2026 Tổng công ty Truyền thông Đa phương tiện (VTC) · Hồ sơ
          truy xuất sản phẩm {product.code}.
        </p>
      </footer>
    </main>
  );
}
