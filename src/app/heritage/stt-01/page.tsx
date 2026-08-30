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
import {
  getStt01Content,
} from "../../data/stt-01";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Dấu Ấn Thượng Triều Nguyễn",

  description:
    "Hồ sơ truy xuất sản phẩm Dấu Ấn Thượng Triều Nguyễn, cung cấp thông tin xác thực, nguồn văn hóa, bảo chứng, quyền tác giả và dữ liệu truy xuất.",

  alternates: {
    canonical:
      "/heritage/stt-01",
  },

  openGraph: {
    title:
      "Dấu Ấn Thượng Triều Nguyễn · Nền tảng truy xuất VTC",

    description:
      "Tra cứu thông tin sản phẩm, xác thực, câu chuyện văn hóa, bảo chứng và quyền tác giả của Dấu Ấn Thượng Triều Nguyễn.",

    url:
      "https://vtcrdcenter.github.io/traceability/heritage/stt-01/",
  },
};

/* =========================================================
   BASE PATH
========================================================= */

const BASE = "/traceability";

/* =========================================================
   PAGE
========================================================= */

export default function Stt01Page() {
  const content =
    getStt01Content("vi");

  const {
    product,
    overview,
    verification,
    heritage,
    merch,
    documents,
    footer,
  } = content;

  /* =========================================================
     VERIFICATION ICONS
  ========================================================= */

  const verificationIcons = {
    trace: Fingerprint,
    attestation: Landmark,
    copyright: FileBadge2,
  };

  return (
    <main className="trace-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <TraceHeader />

      {/* =====================================================
          01 — OVERVIEW / HERO
      ===================================================== */}

      <section
        id="overview"
        className="hero section-pad chapter-wine"
      >
        {/* ===================================================
            HERO COPY
        =================================================== */}

        <div className="hero-copy">
          <p className="eyebrow">
            {overview.eyebrow}
          </p>

          <h1>
            {overview.titleLine1}
            <br />

            <em>
              {overview.titleLine2}
            </em>
          </h1>

          <p className="hero-lead">
            {overview.description}
          </p>

          {/* ===============================================
              PRODUCT META
          =============================================== */}

          <div className="hero-meta">
            <span>
              <small>
                {
                  overview.meta
                    .codeLabel
                }
              </small>

              <b>
                {product.code}
              </b>
            </span>

            <span>
              <small>
                {
                  overview.meta
                    .typeLabel
                }
              </small>

              <b>
                {product.type}
              </b>
            </span>

            <span>
              <small>
                {
                  overview.meta
                    .traceLabel
                }
              </small>

              <b>
                {product.traceCode}
              </b>
            </span>
          </div>

          {/* ===============================================
              HERO ACTIONS
          =============================================== */}

          <div className="hero-actions">
            <a
              className="primary-button"
              href="#verification"
            >
              <ShieldCheck
                size={15}
              />

              <span>
                {
                  overview
                    .primaryAction
                }
              </span>
            </a>

            <a href="#heritage-story">
              <span>
                {
                  overview
                    .secondaryAction
                }
              </span>

              <ArrowDown
                size={14}
              />
            </a>
          </div>
        </div>

        {/* ===================================================
            HERO IMAGE
        =================================================== */}

        <div className="hero-image">
          <Image
            src={`${BASE}/heritage/stt-01-product.webp`}
            alt={product.name}
            width={1200}
            height={1200}
            priority
          />

          <div
            className="edition"
            aria-hidden="true"
          >
            <span>
              STT
            </span>

            <b>
              01
            </b>
          </div>

          <div className="status-chip">
            <CheckCircle2
              size={22}
              aria-hidden="true"
            />

            <div>
              <small>
                {
                  overview.status
                    .label
                }
              </small>

              <b>
                {
                  overview.status
                    .value
                }
              </b>
            </div>
          </div>
        </div>

        {/* ===================================================
            QUICK NAVIGATION
        =================================================== */}

        <div className="quick-nav">
          <p>
            <span>
              {
                overview
                  .quickNavLabel
              }
            </span>

            {
              overview
                .quickNavDescription
            }
          </p>

          <div>
            {content.nav
              .filter((item) =>
                [
                  "verification",
                  "heritage-story",
                  "merch",
                  "documents",
                ].includes(item.id)
              )
              .map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                >
                  <i>
                    {item.number}
                  </i>

                  <span>
                    {item.label}
                  </span>

                  <ArrowDown
                    size={13}
                  />
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          02 — VERIFICATION
      ===================================================== */}

      <section
        id="verification"
        className="content-section section-pad chapter-cream"
      >
        {/* ===================================================
            SECTION HEADING
        =================================================== */}

        <div className="section-heading">
          <span className="section-number">
            {verification.number}
          </span>

          <div>
            <p className="eyebrow">
              {verification.eyebrow}
            </p>

            <h2>
              {verification.title}
            </h2>

            <p>
              {
                verification.description
              }
            </p>
          </div>
        </div>

        {/* ===================================================
            VERIFICATION CARDS
        =================================================== */}

        <div className="verification-summary">
          {verification.items.map(
            (item) => {
              const Icon =
                verificationIcons[
                  item.key
                ];

              return (
                <article
                  key={item.key}
                  className="verification-summary-card"
                >
                  <Icon
                    aria-hidden="true"
                  />

                  <small>
                    {item.eyebrow}
                  </small>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>
                </article>
              );
            }
          )}
        </div>

        {/* ===================================================
            BASIC INFORMATION + TRACE RESULT
        =================================================== */}

        <div className="verification-basic-grid">
          {/* ===============================================
              BASIC PRODUCT INFORMATION
          =============================================== */}

          <article className="basic-product-info">
            <p className="eyebrow">
              {
                verification
                  .productInfo
                  .eyebrow
              }
            </p>

            <h3>
              {
                verification
                  .productInfo
                  .title
              }
            </h3>

            <dl>
              {verification.productInfo.fields.map(
                (item) => (
                  <div
                    key={item.label}
                  >
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
          </article>

          {/* ===============================================
              TRACE RESULT
          =============================================== */}

          <article className="basic-trace-result">
            <Fingerprint
              size={30}
              aria-hidden="true"
            />

            <span className="valid">
              <Check
                size={13}
                aria-hidden="true"
              />

              {
                verification
                  .traceResult
                  .validLabel
              }
            </span>

            <p className="eyebrow">
              {
                verification
                  .traceResult
                  .eyebrow
              }
            </p>

            <h3>
              {
                verification
                  .traceResult
                  .codeLabel
              }
            </h3>

            <p>
              {
                verification
                  .traceResult
                  .description
              }
            </p>

            <a
              className="advanced-link"
              href="#advanced"
            >
              <span>
                {
                  verification
                    .traceResult
                    .advancedLink
                }
              </span>

              <ArrowDown
                size={14}
              />
            </a>
          </article>
        </div>
      </section>

      {/* =====================================================
          03 — HERITAGE STORY
      ===================================================== */}

      <section
        id="heritage-story"
        className="content-section section-pad chapter-wine"
      >
        {/* ===================================================
            SECTION HEADING
        =================================================== */}

        <div className="section-heading">
          <span className="section-number">
            {heritage.number}
          </span>

          <div>
            <p className="eyebrow">
              {heritage.eyebrow}
            </p>

            <h2>
              {heritage.title}
            </h2>

            <p>
              {
                heritage.description
              }
            </p>
          </div>
        </div>

        {/* ===================================================
            HERITAGE STORY
        =================================================== */}

        <div className="heritage-grid">
          <figure>
            <Image
              src={`${BASE}/heritage/heritage-hat-front.webp`}
              alt="Mũ Cửu Long Thông Thiên"
              width={1100}
              height={1100}
            />

            <figcaption>
              {
                heritage
                  .sourceCaption
              }
            </figcaption>
          </figure>

          <div className="heritage-story">
            <p className="eyebrow">
              {
                heritage
                  .storyEyebrow
              }
            </p>

            <blockquote>
              {
                heritage
                  .storyTitle
              }
            </blockquote>

            <p>
              {
                heritage
                  .storyDescription
              }
            </p>

            <a
              className="story-more-link"
              href="#advanced"
            >
              <span>
                {
                  heritage
                    .advancedLink
                }
              </span>

              <ArrowDown
                size={14}
              />
            </a>
          </div>
        </div>

        {/* ===================================================
            HERITAGE HIGHLIGHTS
        =================================================== */}

        <div className="heritage-depth">
          {heritage.highlights.map(
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
      </section>

      {/* =====================================================
          04 — VTC MERCH
      ===================================================== */}

      <section
        id="merch"
        className="content-section section-pad chapter-cream"
      >
        {/* ===================================================
            SECTION HEADING
        =================================================== */}

        <div className="section-heading">
          <span className="section-number">
            {merch.number}
          </span>

          <div>
            <p className="eyebrow">
              {merch.eyebrow}
            </p>

            <h2>
              {merch.title}
            </h2>

            <p>
              {
                merch.description
              }
            </p>
          </div>
        </div>

        {/* ===================================================
            FEATURE
        =================================================== */}

        <div className="merch-feature">
          <div className="merch-feature-copy">
            <p className="eyebrow">
              {
                merch.feature
                  .eyebrow
              }
            </p>

            <h3>
              {
                merch.feature
                  .title
              }
            </h3>

            <p>
              {
                merch.feature
                  .description
              }
            </p>

            <a
              className="primary-button"
              href="#"
            >
              <span>
                {
                  merch.feature
                    .cta
                }
              </span>

              <ArrowUpRight
                size={15}
              />
            </a>
          </div>

          <div className="merch-feature-visual">
            <Image
              src={`${BASE}/heritage/product-lifestyle.webp`}
              alt="VTC Merch"
              width={1400}
              height={1000}
            />
          </div>
        </div>

        {/* ===================================================
            MERCH CARDS
        =================================================== */}

        <div className="merch-cards">
          {merch.cards.map(
            (item, index) => {
              const icons = [
                PackageCheck,
                Sparkles,
                Landmark,
              ];

              const Icon =
                icons[index] ??
                Sparkles;

              return (
                <article
                  key={item.eyebrow}
                >
                  <Icon
                    aria-hidden="true"
                  />

                  <small>
                    {item.eyebrow}
                  </small>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {
                      item.description
                    }
                  </p>
                </article>
              );
            }
          )}
        </div>
      </section>

      {/* =====================================================
          05 — DOCUMENTS
      ===================================================== */}

      <section
        id="documents"
        className="records section-pad chapter-wine"
      >
        {/* ===================================================
            LEFT
        =================================================== */}

        <div>
          <span className="section-number">
            {documents.number}
          </span>

          <p className="eyebrow">
            {documents.eyebrow}
          </p>

          <h2>
            {documents.title}
          </h2>

          <p>
            {
              documents.description
            }
          </p>
        </div>

        {/* ===================================================
            RIGHT
        =================================================== */}

        <div>
          {documents.items.map(
            (item, index) => {
              const icons = [
                ShieldCheck,
                FileText,
              ];

              const Icon =
                icons[index] ??
                FileText;

              return (
                <div
                  key={item.title}
                  className="record-row"
                >
                  <Icon
                    size={20}
                    aria-hidden="true"
                  />

                  <div>
                    <b>
                      {item.title}
                    </b>

                    <small>
                      {item.subtitle}
                    </small>

                    <small>
                      {item.meta}
                    </small>
                  </div>

                  <CheckCircle2
                    size={18}
                    aria-hidden="true"
                  />
                </div>
              );
            }
          )}

          <a
            className="records-advanced-link"
            href="#advanced"
          >
            <span>
              {
                documents
                  .advancedLink
              }
            </span>

            <ArrowDown
              size={14}
            />
          </a>
        </div>
      </section>

      {/* =====================================================
          06 — ADVANCED INFORMATION
      ===================================================== */}

      <AdvancedInfo locale="vi" />

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="site-footer">
        {/* ===================================================
            PLATFORM
        =================================================== */}

        <div className="footer-brand">
          <span
            className="brand-seal"
            aria-hidden="true"
          >
            ẤN
          </span>

          <div>
            <b>
              {
                footer
                  .platformTitle
              }
            </b>

            <small>
              {
                footer
                  .platformSubtitle
              }
            </small>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <div className="footer-info">
          <p>
            {footer.navTitle}
          </p>

          {content.nav.map(
            (item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            )
          )}
        </div>

        {/* ===================================================
            OPERATOR
        =================================================== */}

        <div className="footer-operator">
          <Image
            src={`${BASE}/heritage/vtc-logo.webp`}
            alt="VTC"
            width={180}
            height={90}
          />

          <div>
            <small>
              {
                footer
                  .operatorLabel
              }
            </small>

            <b>
              {
                footer
                  .operatorName
              }
            </b>

            <em>
              {
                footer
                  .operatorDescription
              }
            </em>
          </div>
        </div>

        {/* ===================================================
            BACK TO TOP
        =================================================== */}

        <a
          className="back-top"
          href="#overview"
        >
          <span>
            {
              footer.backToTop
            }
          </span>

          <ArrowUpRight
            size={14}
          />
        </a>

        <p className="footer-bottom">
          {footer.copyright}
        </p>
      </footer>
    </main>
  );
}
