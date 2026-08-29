"use client";

import { Menu, QrCode, X } from "lucide-react";
import { useEffect, useState } from "react";

const traceNav = [
  ["01", "Tổng quan", "overview"],
  ["02", "Sản phẩm", "product-info"],
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
     PROGRESS TOÀN TRANG
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
          ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100))
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
     ĐÓNG MOBILE MENU KHI RESIZE LÊN DESKTOP
  ========================================================= */
  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 980) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktop);

    return () => {
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  /* =========================================================
     KHÓA SCROLL KHI MOBILE MENU MỞ
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

  const handleMobileLink = () => {
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
          <span className="brand-seal" aria-hidden="true">
            ẤN
          </span>

          <span className="brand-copy">
            <b>NỀN TẢNG TRUY XUẤT</b>
            <small>SẢN PHẨM VĂN HÓA</small>
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
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
                aria-current={isActive ? "location" : undefined}
              >
                <i>{number}</i>
                <span>{title}</span>
              </a>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          <a
            className="header-cta"
            href="#verification"
            aria-label="Truy xuất sản phẩm"
          >
            <QrCode size={16} />
            <span>Truy xuất</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* PAGE PROGRESS */}
        <span
          className="header-progress"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "open" : ""}`}
        aria-label="Điều hướng hồ sơ sản phẩm trên thiết bị di động"
        aria-hidden={!open}
      >
        <div className="mobile-nav-heading">
          <small>HỒ SƠ SẢN PHẨM</small>
          <strong>Dấu Ấn Thượng Triều Nguyễn</strong>
        </div>

        <div className="mobile-nav-list">
          {traceNav.map(([number, title, id]) => {
            const isActive = active === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "location" : undefined}
                onClick={handleMobileLink}
              >
                <i>{number}</i>

                <span>{title}</span>

                <b aria-hidden="true">→</b>
              </a>
            );
          })}
        </div>

        <a
          className="mobile-cta"
          href="#verification"
          onClick={handleMobileLink}
        >
          <QrCode size={18} />
          <span>Truy xuất sản phẩm</span>
        </a>
      </nav>
    </>
  );
}
