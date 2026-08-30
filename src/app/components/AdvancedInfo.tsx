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

import {
  getStt01Content,
  type Locale,
} from "../data/stt-01";

/* =========================================================
   BASE PATH
========================================================= */

const BASE = "/traceability";

/* =========================================================
   PROPS
========================================================= */

type AdvancedInfoProps = {
  locale?: Locale;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function AdvancedInfo({
  locale = "vi",
}: AdvancedInfoProps) {
  const content =
    getStt01Content(locale);

  const advanced =
    content.advanced;

  const heritageSource =
    advanced.sections.heritageSource;

  const designTransformation =
    advanced.sections.designTransformation;

  const attestation =
    advanced.sections.attestation;

  const copyright =
    advanced.sections.copyright;

  const journey =
    advanced.sections.journey;

  const traceData =
    advanced.sections.traceData;

  /* =========================================================
     LOCAL TEXTS
  ========================================================= */

  const ui =
    locale === "vi"
      ? {
          sourceImageAlt:
            "Nguồn tham chiếu mũ Cửu Long Thông Thiên",

          conceptImageAlt:
            "Bảng phát triển thiết kế Dấu Ấn Thượng Triều Nguyễn",

          certificateAlt:
            "Giấy chứng nhận đăng ký quyền tác giả",

          museumLogoAlt:
            "Bảo tàng Lịch sử Quốc gia",

          sealAlt:
            "Dấu xác nhận",

          openSection:
            "Mở nội dung",

          traceStatus:
            "Trạng thái truy xuất",

          traceValid:
            "Hợp lệ",

          dataNote:
            "Thông tin hiển thị theo hồ sơ truy xuất của sản phẩm.",
        }
      : {
          sourceImageAlt:
            "Reference image of the Cuu Long Thong Thien imperial court hat",

          conceptImageAlt:
            "Design development board for Nguyen Imperial Court Imprint",

          certificateAlt:
            "Copyright registration certificate",

          museumLogoAlt:
            "Vietnam National Museum of History",

          sealAlt:
            "Verification seal",

          openSection:
            "Open section",

          traceStatus:
            "Traceability status",

          traceValid:
            "Valid",

          dataNote:
            "Information displayed according to the product traceability record.",
        };

  return (
    <section
      id="advanced"
      className="content-section section-pad advanced-section"
    >
      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <div className="section-heading">
        <span className="section-number">
          {advanced.number}
        </span>

        <div>
          <p className="eyebrow">
            {advanced.eyebrow}
          </p>

          <h2>
            {advanced.title}
          </h2>

          <p>
            {advanced.description}
          </p>
        </div>
      </div>

      {/* =====================================================
          01 — HERITAGE SOURCE
      ===================================================== */}

      <details className="advanced-accordion">
        <summary
          aria-label={`${ui.openSection}: ${heritageSource.title}`}
        >
          <span>
            {heritageSource.number}
          </span>

          <strong>
            {heritageSource.title}
          </strong>

          <b aria-hidden="true">
            +
          </b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-two-column">
            {/* TEXT */}

            <div>
              <p className="eyebrow">
                {heritageSource.eyebrow}
              </p>

              <h3>
                {heritageSource.heading}
              </h3>

              <p>
                {
                  heritageSource.description
                }
              </p>

              <dl className="advanced-meta-list">
                {heritageSource.meta.map(
                  (item) => (
                    <div key={item.label}>
                      <dt>
                        {item.label}
                      </dt>

                      <dd>
                        {item.value}
                      </dd>
                    </div>
                  )
                )}
              </dl>

              <p className="data-note">
                <Info size={14} />

                <span>
                  {ui.dataNote}
                </span>
              </p>
            </div>

            {/* IMAGE */}

            <Image
              src={`${BASE}/heritage/heritage-hat-front.webp`}
              alt={ui.sourceImageAlt}
              width={900}
              height={900}
            />
          </div>
        </div>
      </details>

      {/* =====================================================
          02 — DESIGN TRANSFORMATION
      ===================================================== */}

      <details className="advanced-accordion">
        <summary
          aria-label={`${ui.openSection}: ${designTransformation.title}`}
        >
          <span>
            {
              designTransformation.number
            }
          </span>

          <strong>
            {
              designTransformation.title
            }
          </strong>

          <b aria-hidden="true">
            +
          </b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-design-layout">
            {/* CONCEPT BOARD */}

            <div className="advanced-concept-image">
              <Image
                src={`${BASE}/heritage/stt-01-concept-board.webp`}
                alt={ui.conceptImageAlt}
                width={1000}
                height={1200}
              />

              <small>
                {
                  designTransformation.caption
                }
              </small>
            </div>

            {/* DESIGN MAPPING */}

            <div>
              <p className="eyebrow">
                {
                  designTransformation.eyebrow
                }
              </p>

              <div className="advanced-design-list">
                {designTransformation.mappings.map(
                  (item) => (
                    <article
                      key={item.number}
                    >
                      <span>
                        {item.number}
                      </span>

                      <div>
                        <h3>
                          {item.source}
                        </h3>

                        <p>
                          {
                            item.transformation
                          }
                        </p>
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>

          {/* PRINCIPLE */}

          <div className="advanced-principle">
            <p className="eyebrow">
              {
                designTransformation
                  .principle.label
              }
            </p>

            <p>
              {
                designTransformation
                  .principle.description
              }
            </p>
          </div>
        </div>
      </details>

      {/* =====================================================
          03 — CULTURAL ATTESTATION
      ===================================================== */}

      <details className="advanced-accordion">
        <summary
          aria-label={`${ui.openSection}: ${attestation.title}`}
        >
          <span>
            {attestation.number}
          </span>

          <strong>
            {attestation.title}
          </strong>

          <b aria-hidden="true">
            +
          </b>
        </summary>

        <div className="advanced-content">
          <p className="eyebrow">
            {attestation.eyebrow}
          </p>

          <p
            style={{
              maxWidth: "780px",
              marginTop: "14px",
              marginBottom: "28px",
              color: "var(--muted)",
              fontSize: "12px",
              lineHeight: 1.8,
            }}
          >
            {attestation.description}
          </p>

          {/* INFO CARDS */}

          <div className="advanced-card-grid">
            {attestation.cards.map(
              (item, index) => {
                const icons = [
                  Landmark,
                  CheckCircle2,
                  ShieldCheck,
                  FileText,
                ];

                const Icon =
                  icons[index] ??
                  ShieldCheck;

                return (
                  <article
                    key={item.label}
                  >
                    <Icon
                      aria-hidden="true"
                    />

                    <small>
                      {item.label}
                    </small>

                    <h3>
                      {item.value}
                    </h3>
                  </article>
                );
              }
            )}
          </div>

          {/* DOCUMENT PREVIEW */}

          <div className="advanced-document-preview">
            <div>
              <p className="eyebrow">
                {
                  attestation.document
                    .eyebrow
                }
              </p>

              <h3>
                {
                  attestation.document
                    .title
                }
              </h3>

              <p>
                {
                  attestation.document
                    .description
                }
              </p>

              <p className="data-note">
                <Info size={14} />

                <span>
                  {ui.dataNote}
                </span>
              </p>
            </div>

            <div className="advanced-attestation-art">
              <Image
                src={`${BASE}/heritage/museum-logo.webp`}
                alt={ui.museumLogoAlt}
                width={120}
                height={120}
              />

              <span>
                <small>
                  {
                    attestation.document
                      .certificateLabel
                  }
                </small>

                <b>
                  {
                    attestation.document
                      .certificateTitle
                  }
                </b>

                <em>
                  {
                    attestation.document
                      .certificateMeta
                  }
                </em>
              </span>

              <Image
                src={`${BASE}/heritage/museum-red-seal.webp`}
                alt={ui.sealAlt}
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
      </details>

      {/* =====================================================
          04 — COPYRIGHT
      ===================================================== */}

      <details className="advanced-accordion">
        <summary
          aria-label={`${ui.openSection}: ${copyright.title}`}
        >
          <span>
            {copyright.number}
          </span>

          <strong>
            {copyright.title}
          </strong>

          <b aria-hidden="true">
            +
          </b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-two-column">
            {/* TEXT */}

            <div>
              <p className="eyebrow">
                {copyright.eyebrow}
              </p>

              <h3>
                {copyright.heading}
              </h3>

              <p>
                {
                  copyright.description
                }
              </p>

              <dl className="advanced-meta-list">
                {copyright.meta.map(
                  (item) => (
                    <div key={item.label}>
                      <dt>
                        {item.label}
                      </dt>

                      <dd>
                        {item.value}
                      </dd>
                    </div>
                  )
                )}
              </dl>
            </div>

            {/* CERTIFICATE */}

            <Image
              src={`${BASE}/heritage/copyright-certificate.webp`}
              alt={ui.certificateAlt}
              width={1000}
              height={1400}
            />
          </div>
        </div>
      </details>

      {/* =====================================================
          05 — PRODUCT JOURNEY
      ===================================================== */}

      <details className="advanced-accordion">
        <summary
          aria-label={`${ui.openSection}: ${journey.title}`}
        >
          <span>
            {journey.number}
          </span>

          <strong>
            {journey.title}
          </strong>

          <b aria-hidden="true">
            +
          </b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-journey">
            {journey.items.map(
              (item) => (
                <article
                  key={item.number}
                >
                  <span>
                    {item.number}
                  </span>

                  <div>
                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {
                        item.description
                      }
                    </p>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </details>

      {/* =====================================================
          06 — TRACEABILITY DATA
      ===================================================== */}

      <details className="advanced-accordion">
        <summary
          aria-label={`${ui.openSection}: ${traceData.title}`}
        >
          <span>
            {traceData.number}
          </span>

          <strong>
            {traceData.title}
          </strong>

          <b aria-hidden="true">
            +
          </b>
        </summary>

        <div className="advanced-content">
          <div className="advanced-trace-grid">
            {traceData.fields.map(
              (item, index) => {
                const icons = [
                  Fingerprint,
                  PackageCheck,
                  QrCode,
                  Ruler,
                ];

                const Icon =
                  icons[index] ??
                  Fingerprint;

                return (
                  <article
                    key={item.label}
                  >
                    <Icon
                      aria-hidden="true"
                    />

                    <small>
                      {item.label}
                    </small>

                    <h3>
                      {item.value}
                    </h3>

                    {item.status && (
                      <p>
                        {item.status}
                      </p>
                    )}
                  </article>
                );
              }
            )}
          </div>

          {/* PRIVACY */}

          <div className="privacy-panel">
            <LockKeyhole
              size={22}
              aria-hidden="true"
            />

            <div>
              <b>
                {
                  traceData.privacy
                    .title
                }
              </b>

              <p>
                {
                  traceData.privacy
                    .description
                }
              </p>
            </div>
          </div>
        </div>
      </details>
    </section>
  );
}
