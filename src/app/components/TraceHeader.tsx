"use client";

import {
  Check,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

const traceNav = [
  ["01", "Tổng quan", "overview"],
  ["02", "Xác thực", "verification"],
  ["03", "Câu chuyện", "heritage-story"],
  ["04", "VTC Merch", "merch"],
  ["05", "Tài liệu", "documents"],
  ["06", "Nâng cao", "advanced"],
] as const;

type SectionId = (typeof traceNav)[number][2];

type LanguageCode = "vi" | "en";

const languages = [
  {
    code: "vi",
    short: "VI",
    label: "Tiếng Việt",
  },
  {
    code: "en",
    short: "EN",
    label: "English",
  },
] as const;

export default function TraceHeader() {
  const [active, setActive] =
    useState<SectionId>("overview");

  const [progress, setProgress] =
    useState(0);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [language, setLanguage] =
    useState<LanguageCode>("vi");

  const languageRef =
    useRef<HTMLDivElement>(null);

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
        const scrollTop =
          window.scrollY ||
          document.documentElement.scrollTop;

        const scrollable =
          document.documentElement.scrollHeight -
          window.innerHeight;

        /* PAGE PROGRESS */

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

        /* ĐẦU TRANG */

        if (scrollTop < 80) {
          setActive("overview");

          frame = null;
          return;
        }

        /* ĐƯỜNG ĐỌC ẢO */

        const marker = Math.min(
          280,
          window.innerHeight * 0.3
        );

        let currentId: SectionId =
          traceNav[0][2];

        for (const [, , id] of traceNav) {
          const section =
            document.getElementById(id);

          if (!section) {
            continue;
          }

          const rect =
            section.getBoundingClientRect();

          if (rect.top <= marker) {
            currentId = id;
          } else {
            break;
          }
        }

        /* CUỐI TRANG */

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
     ĐÓNG MOBILE MENU KHI LÊN DESKTOP
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1180) {
        setMenuOpen(false);
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
     KHÓA SCROLL KHI MOBILE MENU MỞ
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =========================================================
     ĐÓNG LANGUAGE DROPDOWN KHI CLICK RA NGOÀI
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(
          event.target as Node
        )
      ) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================================================
     ĐÓNG DROPDOWN BẰNG ESC
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  const selectLanguage = (
    code: LanguageCode
  ) => {
    setLanguage(code);

    setLanguageOpen(false);

    /*
      Hiện tại chỉ thay đổi trạng thái hiển thị.

      Sau này khi có bản tiếng Anh, có thể đổi thành:
      router.push("/en/...")
      hoặc dùng hệ thống i18n.
    */
  };

  const selectedLanguage =
    languages.find(
      (item) => item.code === language
    ) ?? languages[0];

  return (
    <>
      <header className="site-header">
        {/* ===================================================
            BRAND
        =================================================== */}

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
            <b>
              NỀN TẢNG TRUY XUẤT
            </b>

            <small>
              SẢN PHẨM VĂN HÓA
            </small>
          </span>
        </a>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

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

        {/* ===================================================
            HEADER ACTIONS
        =================================================== */}

        <div className="header-actions">
          {/* LANGUAGE */}

          <div
            className="language-menu"
            ref={languageRef}
          >
            <button
              className={`language-trigger ${
                languageOpen
                  ? "open"
                  : ""
              }`}
              type="button"
              aria-haspopup="menu"
              aria-expanded={
                languageOpen
              }
              aria-controls="language-options"
              onClick={() =>
                setLanguageOpen(
                  (current) =>
                    !current
                )
              }
            >
              <span>
                {
                  selectedLanguage.short
                }
              </span>

              <ChevronDown
                size={15}
                aria-hidden="true"
              />
            </button>

            <div
              id="language-options"
              className={`language-dropdown ${
                languageOpen
                  ? "open"
                  : ""
              }`}
              role="menu"
              aria-label="Chọn ngôn ngữ"
            >
              {languages.map(
                (item) => {
                  const isSelected =
                    item.code ===
                    language;

                  return (
                    <button
                      key={item.code}
                      type="button"
                      role="menuitem"
                      className={
                        isSelected
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        selectLanguage(
                          item.code
                        )
                      }
                    >
                      <span className="language-code">
                        {
                          item.short
                        }
                      </span>

                      <span className="language-name">
                        {
                          item.label
                        }
                      </span>

                      {isSelected && (
                        <Check
                          size={15}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen
                ? "Đóng menu"
                : "Mở menu"
            }
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current
              )
            }
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>

        {/* ===================================================
            SCROLL PROGRESS
        =================================================== */}

        <span
          className="header-progress"
          style={{
            width: `${progress}%`,
          }}
          aria-hidden="true"
        />
      </header>

      {/* =====================================================
          MOBILE / TABLET NAVIGATION
      ===================================================== */}

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${
          menuOpen ? "open" : ""
        }`}
        aria-label="Điều hướng hồ sơ sản phẩm trên thiết bị di động"
        aria-hidden={!menuOpen}
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

        {/* LANGUAGE TRÊN MOBILE */}

        <div className="mobile-language">
          <small>NGÔN NGỮ</small>

          <div>
            {languages.map(
              (item) => (
                <button
                  key={item.code}
                  type="button"
                  className={
                    language ===
                    item.code
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    selectLanguage(
                      item.code
                    );

                    closeMobileMenu();
                  }}
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
