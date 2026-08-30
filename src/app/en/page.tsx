import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Languages,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "VTC Traceability Platform",

  description:
    "English entry page for the VTC cultural product traceability platform.",

  alternates: {
    canonical: "/en",
    languages: {
      "vi-VN": "/",
      "en-US": "/en",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    title:
      "VTC Traceability Platform",

    description:
      "Access traceability records for cultural products developed within the VTC ecosystem.",

    url:
      "https://vtcrdcenter.github.io/traceability/en/",
  },
};

/* =========================================================
   PAGE
========================================================= */

export default function EnglishHomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #671d22 0%, #4a1418 100%)",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "980px",
          border:
            "1px solid rgba(226, 189, 120, 0.45)",
          background:
            "rgba(38, 13, 15, 0.72)",
          padding:
            "clamp(30px, 6vw, 70px)",
          boxShadow:
            "0 28px 70px rgba(20, 5, 7, 0.28)",
        }}
      >
        {/* ===================================================
            BRAND
        =================================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "42px",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border:
                "1px solid #e2bd78",
              display: "grid",
              placeItems: "center",
              color: "#e2bd78",
              fontFamily:
                '"Playfair Display", serif',
              fontSize: "12px",
            }}
          >
            ẤN
          </span>

          <div>
            <strong
              style={{
                display: "block",
                fontSize: "13px",
                letterSpacing:
                  "0.08em",
                color: "#fff3df",
              }}
            >
              TRACEABILITY PLATFORM
            </strong>

            <span
              style={{
                display: "block",
                marginTop: "3px",
                fontSize: "9px",
                letterSpacing:
                  "0.12em",
                color: "#d8b77f",
              }}
            >
              CULTURAL PRODUCTS
            </span>
          </div>
        </div>

        {/* ===================================================
            INTRO
        =================================================== */}

        <p
          style={{
            margin: 0,
            color: "#e2bd78",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing:
              "0.16em",
            textTransform:
              "uppercase",
          }}
        >
          VTC · Product Traceability
        </p>

        <h1
          style={{
            maxWidth: "780px",
            margin:
              "18px 0 22px",
            fontFamily:
              '"Playfair Display", serif',
            fontSize:
              "clamp(44px, 7vw, 76px)",
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing:
              "-0.035em",
          }}
        >
          Cultural Product
          <br />

          <em
            style={{
              color: "#e2bd78",
              fontWeight: 500,
            }}
          >
            Traceability
          </em>
        </h1>

        <p
          style={{
            maxWidth: "700px",
            margin:
              "0 0 38px",
            color: "#decac0",
            fontSize: "16px",
            lineHeight: 1.8,
          }}
        >
          Access verified product
          information, cultural
          references, attestation
          records, copyright
          documentation and
          traceability data.
        </p>

        {/* ===================================================
            PRIMARY RECORD
        =================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) auto",
            gap: "24px",
            alignItems: "center",
            padding:
              "24px 26px",
            border:
              "1px solid rgba(255,255,255,0.14)",
            background:
              "rgba(255,255,255,0.045)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
                color: "#e2bd78",
              }}
            >
              <ShieldCheck
                size={18}
                aria-hidden="true"
              />

              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing:
                    "0.13em",
                  textTransform:
                    "uppercase",
                }}
              >
                Featured traceability
                record
              </span>
            </div>

            <h2
              style={{
                margin:
                  "0 0 8px",
                fontFamily:
                  '"Playfair Display", serif',
                fontSize:
                  "clamp(26px, 4vw, 38px)",
                fontWeight: 500,
                color: "#fff4df",
              }}
            >
              Nguyen Imperial Court
              Imprint
            </h2>

            <p
              style={{
                margin: 0,
                color: "#cdb9ac",
                fontSize: "12px",
                lineHeight: 1.7,
              }}
            >
              Product code STT-01 ·
              Traceability code
              VTC-STT-01
            </p>
          </div>

          <Link
            href="/en/heritage/stt-01/"
            style={{
              minHeight: "48px",
              display:
                "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding:
                "0 18px",
              background: "#c3964a",
              color: "#260d0f",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing:
                "0.06em",
              textTransform:
                "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            View record

            <ArrowRight
              size={15}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* ===================================================
            LANGUAGE
        =================================================== */}

        <div
          style={{
            marginTop: "28px",
            paddingTop: "22px",
            borderTop:
              "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: "#cdb9ac",
              fontSize: "11px",
            }}
          >
            <Languages
              size={16}
              aria-hidden="true"
            />

            <span>
              English version
            </span>
          </div>

          <Link
            href="/"
            style={{
              color: "#e2bd78",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing:
                "0.06em",
              textTransform:
                "uppercase",
            }}
          >
            Tiếng Việt →
          </Link>
        </div>
      </section>
    </main>
  );
}
