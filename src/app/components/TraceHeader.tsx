"use client";

import { Menu, QrCode, X } from "lucide-react";
import { useEffect, useState } from "react";

const traceNav = [
  ["01", "Tổng quan", "overview"],
  ["02", "Thông tin", "product-info"],
  ["03", "Nguồn văn hóa", "heritage"],
  ["04", "Chuyển hóa", "design-development"],
  ["05", "Bảo chứng", "attestation"],
  ["06", "Quyền tác giả", "copyright"],
  ["07", "Hành trình", "journey"],
  ["08", "Truy xuất", "verification"],
  ["09", "Tài liệu", "records"],
] as const;

export default function TraceHeader() {
  const [active, setActive] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  /* =========================================================
     XÁC ĐỊNH SECTION ĐANG ĐƯỢC XEM
  ========================================================= */
  useEffect(() => {
    const sections = traceNav
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );

        if (visibleSections.length > 0) {
          setActive(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-24% 0px -62% 0px",
        threshold: [0, 0.05, 0.15, 0.3],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     THANH TIẾN TRÌNH CUỘN TRANG
  ========================================================= */
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;

      const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const value =
        scrollable > 0
          ? Math.min(
              100,
              Math.max(0, (scrollTop / scrollable) * 100)
            )
          : 0;

      setProgress(value);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  /* =========================================================
     ĐÓNG MENU MOBILE KHI CHUYỂN SANG DESKTOP
  ========================================================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1180) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  /* =========================================================
     KHÓA SCROLL KHI MENU MOBILE MỞ
  ========================================================= */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

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
        {/* LOGO / TÊN NỀN TẢNG */}
        <a
          className="brand"
          href="#overview"
          aria-label="Nền tảng truy xuất — về đầu trang"
        >
          <span className="brand-seal" aria-hidden="true">
            ẤN
          </span>

          <span className="brand-copy">
            <b>NỀN TẢNG TRUY XUẤT</b>
            <small>SẢN PHẨM VĂN HÓA</small>
          </span>
        </a>

        {/* MENU DESKTOP */}
        <nav
          className="desktop-nav"
          aria-label="Điều hướng hồ sơ sản phẩm"
        >
          {traceNav.map(([number, title, id]) => {
            const isActive = active === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                className={isActive ? "active" : ""}
                aria-current={
                  isActive ? "location" : undefined
                }
              >
                <i>{number}</i>
                <span>{title}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA + MENU MOBILE */}
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
              open ? "Đóng menu" : "Mở menu"
            }
            onClick={() =>
              setOpen((value) => !value)
            }
          >
            {open ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>

        {/* PROGRESS */}
        <span
          className="header-progress"
          style={{
            width: `${progress}%`,
          }}
          aria-hidden="true"
        />
      </header>

      {/* =====================================================
          MENU MOBILE / TABLET
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
          <small>HỒ SƠ SẢN PHẨM</small>

          <strong>
            Dấu Ấn Thượng Triều Nguyễn
          </strong>

          <p>
            Chọn nội dung cần xem trong hồ sơ
            truy xuất.
          </p>
        </div>

        <div className="mobile-nav-list">
          {traceNav.map(
            ([number, title, id]) => {
              const isActive = active === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={
                    isActive ? "active" : ""
                  }
                  aria-current={
                    isActive
                      ? "location"
                      : undefined
                  }
                  onClick={closeMobileMenu}
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
          onClick={closeMobileMenu}
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
