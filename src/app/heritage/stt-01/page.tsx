import type { Metadata } from "next";
import Image from "next/image";

import ProductGallery from "../../components/ProductGallery";
import ProductViewer from "../../components/ProductViewer";

import { stt01Content } from "../../data/stt-01";

import styles from "./stt01.module.css";
import heroStyles from "./heroStep1.module.css";

const BASE = "/traceability";
const A = `${BASE}/figma`;

export const metadata: Metadata = {
  title: "Long Vân Lưu Tín",
  icons: {
    icon: `${A}/icon-cloud.png`,
  },
  description:
    "Hồ sơ truy xuất sản phẩm văn hóa Long Vân Lưu Tín của VTC Merch.",
};

const facts = [
  ["Tên sản phẩm", "Long Vân Lưu Tín"],
  ["Mã sản phẩm", "893-110006-001-1"],
  ["Loại sản phẩm", "Miếng dán tủ lạnh"],
  ["Kích thước", stt01Content.vi.product.size],
  ["Chất liệu", "Hợp kim, mạ viền vàng, ngọc trai"],
  ["Xuất xứ", "Việt Nam"],
  ["Thời gian sản xuất", "09/2026"],
  ["Đơn vị sản xuất", "Công ty Quà tặng ENSA"],
  ["Thương hiệu", "VTC Merchandise"],
];

const certificates = [
  {
    number: "01",
    logo: "museum.png",
    eyebrow: "ĐƠN VỊ BẢO CHỨNG",
    title: "Bảo tàng Lịch sử Quốc gia",
    copy:
      "Đơn vị xác nhận nguồn tham chiếu văn hóa của sản phẩm, bảo chứng nội dung khai thác giá trị văn hóa từ hình tượng mũ thượng triều thời Nguyễn, hồ sơ thiết kế và nghệ thuật trang sức cung đình Việt Nam.",
    link: "Tìm hiểu về BTLSQG →",
    href: "https://baotanglichsu.vn/",
  },
  {
    number: "02",
    logo: "copyright.png",
    eyebrow: "CHỨNG NHẬN QUYỀN TÁC GIẢ",
    title: "Cục Bản quyền tác giả",
    copy:
      "Thiết kế của sản phẩm “Dấu Ấn Thượng triều Nguyễn” đã được cấp Giấy chứng nhận đăng ký quyền tác giả.",
    link: "Xem giấy chứng nhận →",
    href: `${BASE}/heritage/copyright-certificate.png`,
  },
  {
    number: "03",
    logo: "vtc.png",
    eyebrow: "ĐƠN VỊ VẬN HÀNH NỀN TẢNG",
    title: "Tổng công ty VTC",
    copy:
      "Tổng công ty Truyền thông Đa phương tiện VTC là đơn vị vận hành nền tảng lưu trữ và hỗ trợ tra cứu hồ sơ số của sản phẩm.",
    link: "Tìm hiểu về VTC →",
    href: "https://vtc.org.vn/",
  },
];

/* =========================================================
   MUSEUM ICON
   Chỉ là biểu tượng kiến trúc, không phải logo BTLSQG
========================================================= */

function MuseumIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L24 7L42 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9 18H39"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <path
        d="M12 21V36"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <path
        d="M20 21V36"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <path
        d="M28 21V36"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <path
        d="M36 21V36"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <path
        d="M8 39H40"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <path
        d="M5 43H43"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Stt01Page() {
  return (
    <main className={styles["landing"]}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className={styles["header"]}>
        <Image
          src={`${A}/raw-01.png`}
          alt="VTC Merch"
          width={118}
          height={30}
          priority
        />

        <nav aria-label="Ngôn ngữ">
          <b>VI</b>

          <span>|</span>

          <a href={`${BASE}/en/heritage/stt-01/`}>
            EN
          </a>
        </nav>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className={`${styles["hero"]} ${heroStyles.hero}`}
      >
        <span aria-hidden="true" className={`${styles.ornament} ${styles.heroCloud}`} />
        <span aria-hidden="true" className={`${styles.ornament} ${styles.heroCloudLow}`} />
        <div
          className={[
            styles["shell"],
            heroStyles.heroGrid,
          ].join(" ")}
        >
          {/* HERO COPY */}

          <div
            className={[
              styles["hero-copy"],
              heroStyles.heroCopy,
            ].join(" ")}
          >
            <span className={styles["kicker"]}>
              SẢN PHẨM VĂN HÓA
            </span>

            <h1>
              <span>Long Vân</span>
              Lưu Tín
            </h1>

            <p>
              Món quà này là một lời nhắc nhớ tinh tế:
              Những di sản vĩ đại nhất đôi khi không nằm
              ở đâu xa xôi, mà hiện diện ngay trong nếp
              nhà, lấp lánh tỏa sáng mỗi khi bạn chạm tay
              vào, gìn giữ cho bạn những kết nối trân quý
              nhất của hiện tại.
            </p>

            {/* =============================================
                ATTESTATION
            ============================================= */}

            <div
              className={heroStyles.attestation}
            >
              <div
                className={heroStyles.attestationIcon}
                aria-hidden="true"
              >
                <MuseumIcon />
              </div>

              <div
                className={heroStyles.attestationText}
              >
                <small>
                  ĐƯỢC BẢO CHỨNG NGÀY 29/08/2026 BỞI
                </small>

                <strong>
                  Bảo tàng Lịch sử Quốc gia
                </strong>
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}

          <div
            className={heroStyles.heroImage}
          >
            <Image
              src={`${A}/hero.png`}
              alt="Long Vân Lưu Tín trong không gian sống"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 71vw"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <section
        className={[
          styles["section"],
          styles["product"],
        ].join(" ")}
        id="product-info"
      >
        <div className={styles["shell"]}>
          <h2>Thông tin sản phẩm</h2>

          <div className={styles["product-grid"]}>
            <ProductGallery />

            <dl className={styles["facts"]}>
              {facts.map(([dt, dd]) => (
                <div key={dt}>
                  <dt>{dt}</dt>

                  <dd>{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* =====================================================
          CERTIFICATES
      ===================================================== */}

      <section
        className={[
          styles["section"],
          styles["certificates"],
        ].join(" ")}
        id="certificates"
      >
        <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudLeft}`} />
        <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudRight}`} />
        <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudDivider}`} />
        <div className={styles["shell"]}>
          <h2>
            Chứng nhận giá trị văn hóa
          </h2>

          <div className={styles["card-grid"]}>
            {certificates.map((card) => (
              <article
                className={styles["card"]}
                key={card.number}
              >
                <span
                  className={styles["card-number"]}
                >
                  {card.number}
                </span>

                {card.logo && (
                  <div
                    className={styles["card-logo"]}
                  >
                    <Image
                      src={`${A}/${card.logo}`}
                      alt=""
                      fill
                      sizes="164px"
                    />
                  </div>
                )}

                <small>
                  {card.eyebrow}
                </small>

                <h3>
                  {card.title}
                </h3>

                <p>
                  {card.copy}
                </p>

                <a
                  href={card.href}
                  target={
                    card.href.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    card.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {card.link}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          3D EXPERIENCE
      ===================================================== */}

      <section
        className={styles["experience"]}
        id="experience"
      >
        <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudTitleLeft}`} />
        <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudTitleRight}`} />
        <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudCornerLeft}`} />
        <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudCornerRight}`} />
        <div className={styles["shell"]}>
          <h2>
            Trải nghiệm sản phẩm ở mọi góc nhìn
          </h2>

          <p>
            Xoay, phóng to, thu nhỏ và khám phá các
            chi tiết họa tiết, cấu trúc của sản phẩm
            với mô hình 3D tương tác.
          </p>

          <div className={styles["viewer-stage"]}>
            <ProductViewer />
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY
      ===================================================== */}

      <section
        className={[
          styles["section"],
          styles["story"],
        ].join(" ")}
        id="story"
      >
        <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudRight}`} />
        <span aria-hidden="true" className={`${styles.ornament} ${styles.storyCloudBottom}`} />
        <div className={styles["shell"]}>
          <h2>
            Bầu trời di sản trong tổ ấm hiện đại
          </h2>

          {/* SOURCE */}

          <div className={styles["source"]}>
            <b>
              NGUỒN CẢM HỨNG CHÍNH
            </b>

            <p>
              Mũ thượng triều được nhà vua sử dụng
              mỗi khi thiết triều, giải quyết các vấn
              đề lớn của quốc gia, thực hiện các nghi
              lễ khánh tiết của Nhà nước, hoặc yết kiến
              sứ giả các nước bang giao. Đây là bảo vật
              hoàng cung quý hiếm có niên đại thế kỷ
              XIX–XX, được chế tác tinh xảo từ vàng,
              đá quý, san hô và kim sa.
            </p>
          </div>

          {/* STORY BODY */}

          <div className={styles["story-grid"]}>
            <div>
              <b>
                CÂU CHUYỆN SẢN PHẨM
              </b>

              <p>
                Hơn một thế kỷ trước, dưới bầu trời
                bát ngát và những áng mây cuộn dâng
                của chốn kinh thành, những nghệ nhân
                kim hoàn bậc thầy đã thả hồn mình vào
                từng lá vàng, hạt ngọc để kiến tạo nên
                chiếc Mũ Thượng triều uy nghi nhất.
              </p>

              <p>
                <strong>
                  Đồ án “Long Vân”
                </strong>{" "}
                – rồng phượng tung cánh giữa trùng điệp mây trời –
                không chỉ biểu trưng cho vương quyền tột đỉnh,
                mà còn gói trọn khát vọng về một vũ trụ khoáng đạt,
                thái hòa. Mỗi viên ngọc trai, san hô hay đá quý được
                đính kết tỉ mỉ chính là tinh hoa của đất trời tụ hội.
              </p>

              <p>
                Ngày nay,{" "}
                <strong>
                  “Long Vân Lưu Tín”
                </strong>{" "}
                thu nhỏ trọn vẹn cả một bầu trời di sản ấy, đặt khiêm nhường
                nhưng kiêu hãnh trên cánh cửa tủ lạnh trong căn bếp hiền hòa
                của bạn. Không còn mang sức nặng của vương miện chốn vương triều,
                phiên bản thu nhỏ này trở thành một “người cận vệ” thân thiết,
                ngày ngày nâng niu và gìn giữ những thông điệp yêu thương của
                gia đình: một công thức nấu ăn mới, một lời nhắc nhở đầy yêu
                thương, hay một bức ảnh kỷ niệm chuyến đi đầy ắp tiếng cười…
              </p>
            </div>

            <div
              className={styles["story-image"]}
            >
              <Image
                src={`${A}/story.png`}
                alt="Mũ thượng triều triều Nguyễn"
                fill
                sizes="(max-width: 800px) 100vw, 560px"
              />
            </div>
          </div>

          {/* =================================================
              MEANING
          ================================================= */}

          <div
            className={styles["meaning-grid"]}
          >
            <article>
              <Image
                src={`${A}/icon-cloud.png`}
                alt=""
                width={60}
                height={60}
              />

              <div>
                <h3>
                  Long Vân (Rồng và Mây)
                </h3>

                <p>
                  Họa tiết rồng phượng uốn lượn giữa
                  những tầng mây, đại diện cho chí lớn
                  và sự tự do.
                </p>
              </div>
            </article>

            <article>
              <Image
                src={`${A}/icon-note.png`}
                alt=""
                width={60}
                height={60}
              />

              <div>
                <h3>
                  Lưu Tín (Lưu giữ thông điệp)
                </h3>

                <p>
                  Chiếc nam châm lưu giữ giấy nhớ,
                  lời nhắn và những kết nối thân thuộc
                  trong gia đình.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className={styles["footer"]}>
        <Image
          src={`${A}/raw-01.png`}
          alt="VTC Merch"
          width={118}
          height={30}
        />

        <p>
          Nền tảng được vận hành bởi
          <br />

          <b>
            Tổng công ty Truyền thông Đa phương tiện VTC
          </b>
        </p>

        <small>
          © 2026 VTC Merch. All rights reserved.
        </small>
      </footer>
    </main>
  );
}
