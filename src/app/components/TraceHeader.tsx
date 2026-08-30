"use client";

import { Menu, QrCode, X } from "lucide-react";
import { useEffect, useState } from "react";

const traceNav = [
  ["01", "Tổng quan", "overview"],
  ["02", "Xác thực", "verification"],
  ["03", "Câu chuyện", "heritage-story"],
  ["04", "VTC Merch", "merch"],
  ["05", "Tài liệu", "documents"],
  ["06", "Nâng cao", "advanced"],
] as const;

export default function TraceHeader() {
  const [active, setActive] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  /* =========================================================
     ACTIVE SECTION + SCROLL PROGRESS
  ========================================================= */
  useEffect(() => {
    let frame: number | null = null;

    const updateHeaderState = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        /* ---------------------------------------------
           PAGE PROGRESS
        --------------------------------------------- */
        const scrollTop =
          window.scrollY ||
          document.documentElement.scrollTop;

        const scrollable =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const progressValue =
          scrollable > 0
            ? Math.min(
                100,
                Math.max(
                  0,
                  (scrollTop / scrollable) * 100
                )
              )
            : 0;

        setProgress(progressValue);

        /* ---------------------------------------------
           FORCE OVERVIEW AT TOP
        --------------------------------------------- */
        if (scrollTop < 80) {
          setActive("overview");
          frame = null;
          return;
        }

        /* ---------------------------------------------
           VIRTUAL READING LINE

           Header: ~78px
           Reading line: khoảng 30% viewport
        --------------------------------------------- */
        const marker =
          Math.min(
            280,
            window.innerHeight * 0.3
          );

        let currentId =
          traceNav[0][2];

        for (const [, , id] of traceNav) {
          const section =
            document.getElementById(id);

          if (!section) continue;

          const rect =
            section.getBoundingClientRect();

          /*
           * Khi đầu section đã đi qua đường marker,
           * section đó trở thành active.
           */
          if (rect.top <= marker) {
            currentId = id;
          } else {
            break;
          }
        }

        /* ---------------------------------------------
           FORCE LAST SECTION NEAR PAGE BOTTOM
        --------------------------------------------- */
        const nearBottom =
          window.innerHeight +
            window.scrollY >=
          document.documentElement
            .scrollHeight -
            40;

        if (nearBottom) {
          currentId =
            traceNav[
              traceNav.length - 1
            ][2];
        }

        setActive(currentId);

        frame = null;
      });
    };

    updateHeaderState();

    window.addEventListener(
      "scroll",
      updateHeaderState,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateHeaderState
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateHeaderState
      );

      window.removeEventListener(
        "resize",
        updateHeaderState
      );

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  /* =========================================================
     CLOSE MOBILE MENU ON DESKTOP
  ========================================================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1180) {
        setOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =========================================================
     LOCK BODY SCROLL WHEN MENU IS OPEN
  ========================================================= */
  useEffect(() => {
    document.body.style.overflow =
      open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMobileMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="site-header">
        {/* BRAND */}
        <a
          className="brand"
          href="#overview"
          aria-label="Nền tảng truy xuất — về đầu trang"
        >
          <span
            className="brand-seal"
            aria-hidden="true"
          >
            ẤN
          </span>

          <span className="brand-copy">
            <b>NỀN TẢNG TRUY XUẤT</b>
            <small>
              SẢN PHẨM VĂN HÓA
            </small>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav
          className="desktop-nav"
          aria-label="Điều hướng hồ sơ sản phẩm"
        >
          {traceNav.map(
            ([number, title, id]) => {
              const isActive =
                active === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={
                    isActive
                      ? "active"
                      : ""
                  }
                  aria-current={
                    isActive
                      ? "location"
                      : undefined
                  }
                >
                  <i>{number}</i>
                  <span>{title}</span>
                </a>
              );
            }
          )}
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          <a
            className="header-cta"
            href="#verification"
            aria-label="Truy xuất sản phẩm"
          >
            <QrCode size={17} />
            <span>Truy xuất</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={
              open
                ? "Đóng menu"
                : "Mở menu"
            }
            onClick={() =>
              setOpen(
                (current) => !current
              )
            }
          >
            {open ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>

        {/* PROGRESS BAR */}
        <span
          className="header-progress"
          style={{
            width: `${progress}%`,
          }}
          aria-hidden="true"
        />
      </header>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${
          open ? "open" : ""
        }`}
        aria-label="Điều hướng hồ sơ sản phẩm trên thiết bị di động"
        aria-hidden={!open}
      >
        <div className="mobile-nav-heading">
          <small>
            HỒ SƠ SẢN PHẨM
          </small>

          <strong>
            Dấu Ấn Thượng Triều Nguyễn
          </strong>

          <p>
            Thông tin truy xuất, câu
            chuyện văn hóa và hồ sơ
            xác thực của sản phẩm.
          </p>
        </div>

        <div className="mobile-nav-list">
          {traceNav.map(
            ([number, title, id]) => {
              const isActive =
                active === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={
                    isActive
                      ? "active"
                      : ""
                  }
                  aria-current={
                    isActive
                      ? "location"
                      : undefined
                  }
                  onClick={
                    closeMobileMenu
                  }
                >
                  <i>{number}</i>

                  <span>{title}</span>

                  <b aria-hidden="true">
                    →
                  </b>
                </a>
              );
            }
          )}
        </div>

        <a
          className="mobile-cta"
          href="#verification"
          onClick={
            closeMobileMenu
          }
        >
          <QrCode size={18} />

          <span>
            Truy xuất sản phẩm
          </span>
        </a>
      </nav>
    </>
  );
}
