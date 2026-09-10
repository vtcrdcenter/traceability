import type { Metadata } from "next";
import Image from "next/image";

import ProductGallery from "../../components/ProductGallery";
import ProductViewer from "../../components/ProductViewer";

import styles from "./stt01.module.css";
import { stt01Content } from "../../data/stt-01";

const BASE = "/traceability";
const A = `${BASE}/figma`;

export const metadata: Metadata = {
  title: "Long Vân Lưu Tín",
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

export default function Stt01Page() {
  return (
    <main className={styles["landing"]}>
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

      <section className={styles["hero"]}>
        <div className={styles["shell"] + " " + styles["hero-grid"]}>
          <div className={styles["hero-copy"]}>
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

            <div className={styles["attestation"]}>
              <div>
                <small>
                  ĐƯỢC BẢO CHỨNG NGÀY 29/08/2026 BỞI
                </small>

                <strong>
                  Bảo tàng Lịch sử Quốc gia
                </strong>
              </div>
            </div>
          </div>

          <div className={styles["hero-image"]}>
            <Image
              src={`${A}/hero.png`}
              alt="Long Vân Lưu Tín trong không gian sống"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 620px"
            />
          </div>
        </div>
      </section>

      <section
        className={styles["section"] + " " + styles["product"]}
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

      <section
        className={styles["section"] + " " + styles["certificates"]}
        id="certificates"
      >
        <div className={styles["shell"]}>
          <h2>Chứng nhận giá trị văn hóa</h2>

          <div className={styles["card-grid"]}>
            {certificates.map((card) => (
              <article
                className={styles["card"]}
                key={card.number}
              >
                <span className={styles["card-number"]}>
                  {card.number}
                </span>

                {card.logo && (
                  <div className={styles["card-logo"]}>
                    <Image
                      src={`${A}/${card.logo}`}
                      alt=""
                      fill
                      sizes="164px"
                    />
                  </div>
                )}

                <small>{card.eyebrow}</small>

                <h3>{card.title}</h3>

                <p>{card.copy}</p>

                <a href={card.href}>
                  {card.link}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.experience}
        id="experience"
      >
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

      <section
        className={styles["section"] + " " + styles["story"]}
        id="story"
      >
        <div className={styles["shell"]}>
          <h2>
            Bầu trời di sản trong tổ ấm hiện đại
          </h2>

          <div className={styles["source"]}>
            <b>NGUỒN CẢM HỨNG CHÍNH</b>

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

          <div className={styles["story-grid"]}>
            <div>
              <b>CÂU CHUYỆN SẢN PHẨM</b>

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
                không chỉ biểu trưng cho vương quyền,
                mà còn gói trọn khát vọng về một vũ
                trụ khoáng đạt, thái hòa. Ngày nay,{" "}
                <strong>
                  “Long Vân Lưu Tín”
                </strong>{" "}
                thu nhỏ bầu trời di sản ấy trong một
                vật phẩm thân thuộc, gìn giữ những lời
                nhắn yêu thương của gia đình.
              </p>
            </div>

            <div className={styles["story-image"]}>
              <Image
                src={`${A}/story.png`}
                alt="Mũ thượng triều triều Nguyễn"
                fill
                sizes="(max-width: 800px) 100vw, 560px"
              />
            </div>
          </div>

          <div className={styles["meaning-grid"]}>
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
