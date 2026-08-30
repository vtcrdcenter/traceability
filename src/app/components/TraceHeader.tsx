"use client";

import {
  Check,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getStt01Content,
  type Locale,
} from "../data/stt-01";

/* =========================================================
   CONFIG
========================================================= */

const BASE_PATH = "/traceability";

/* =========================================================
   TYPES
========================================================= */

type SectionId =
  | "overview"
  | "verification"
  | "heritage-story"
  | "merch"
  | "documents"
  | "advanced";

type LanguageOption = {
  code: Locale;
  short: string;
  label: string;
};

/* =========================================================
   LANGUAGE OPTIONS
========================================================= */

const languageOptions: LanguageOption[] = [
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
];

/* =========================================================
   PATH HELPERS
========================================================= */

function normalizePathname(
  pathname: string
) {
  if (
    pathname === BASE_PATH ||
    pathname === `${BASE_PATH}/`
  ) {
    return "/";
  }

  if (
    pathname.startsWith(
      `${BASE_PATH}/`
    )
  ) {
    const normalized =
      pathname.slice(
        BASE_PATH.length
      );

    return normalized || "/";
  }

  return pathname || "/";
}

/* =========================================================
   LOCALE
========================================================= */

function getLocaleFromPathname(
  pathname: string
): Locale {
  const normalized =
    normalizePathname(pathname);

  if (
    normalized === "/en" ||
    normalized === "/en/" ||
    normalized.startsWith("/en/")
  ) {
    return "en";
  }

  return "vi";
}

/* =========================================================
   LOCALIZED PATH
========================================================= */

function getLocalizedPath(
  pathname: string,
  locale: Locale
) {
  const normalized =
    normalizePathname(pathname);

  let contentPath =
    normalized.replace(
      /^\/en(?=\/|$)/,
      ""
    );

  if (!contentPath) {
    contentPath = "/";
  }

  if (
    contentPath !== "/" &&
    contentPath.endsWith("/")
  ) {
    contentPath =
      contentPath.slice(
        0,
        -1
      );
  }

  /* ---------------------------------------------------------
     EN
  --------------------------------------------------------- */

  if (locale === "en") {
    if (contentPath === "/") {
      return `${BASE_PATH}/en/`;
    }

    return `${BASE_PATH}/en${contentPath}/`;
  }

  /* ---------------------------------------------------------
     VI
  --------------------------------------------------------- */

  if (contentPath === "/") {
    return `${BASE_PATH}/`;
  }

  return `${BASE_PATH}${contentPath}/`;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function TraceHeader() {
  const pathname =
    usePathname();

  /* =========================================================
     LOCALE
  ========================================================= */

  const locale = useMemo(
    () =>
      getLocaleFromPathname(
        pathname
      ),
    [pathname]
  );

  /* =========================================================
     CONTENT
  ========================================================= */

  const content = useMemo(
    () =>
      getStt01Content(
        locale
      ),
    [locale]
  );

  const traceNav =
    content.nav;

  /* =========================================================
     STATES
  ========================================================= */

  const [
    active,
    setActive,
  ] = useState<SectionId>(
    "overview"
  );

  const [
    progress,
    setProgress,
  ] = useState(0);

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    languageOpen,
    setLanguageOpen,
  ] = useState(false);

  /* =========================================================
     REF
  ========================================================= */

  const languageRef =
    useRef<HTMLDivElement>(
      null
    );

  /* =========================================================
     CURRENT LANGUAGE
  ========================================================= */

  const selectedLanguage =
    languageOptions.find(
      (item) =>
        item.code === locale
    ) ??
    languageOptions[0];

  /* =========================================================
     UI TEXT
  ========================================================= */

  const headerText =
    locale === "vi"
      ? {
          productRecord:
            "HỒ SƠ SẢN PHẨM",

          description:
            "Thông tin truy xuất, câu chuyện văn hóa và hồ sơ xác thực của sản phẩm.",

          chooseLanguage:
            "Chọn ngôn ngữ",

          language:
            "NGÔN NGỮ",

          openMenu:
            "Mở menu",

          closeMenu:
            "Đóng menu",

          homeLabel:
            "Nền tảng truy xuất — về đầu trang",

          navLabel:
            "Điều hướng hồ sơ sản phẩm",

          mobileNavLabel:
            "Điều hướng hồ sơ sản phẩm trên thiết bị di động",
        }
      : {
          productRecord:
            "PRODUCT RECORD",

          description:
            "Traceability information, cultural story and verification records for this product.",

          chooseLanguage:
            "Choose language",

          language:
            "LANGUAGE",

          openMenu:
            "Open menu",

          closeMenu:
            "Close menu",

          homeLabel:
            "Traceability Platform — back to top",

          navLabel:
            "Product record navigation",

          mobileNavLabel:
            "Product record navigation on mobile devices",
        };

  /* =========================================================
     SCROLL STATE
  ========================================================= */

  useEffect(() => {
    let frame:
      | number
      | null = null;

    const updateHeaderState =
      () => {
        if (
          frame !== null
        ) {
          cancelAnimationFrame(
            frame
          );
        }

        frame =
          requestAnimationFrame(
            () => {
              const scrollTop =
                window.scrollY ||
                document
                  .documentElement
                  .scrollTop;

              const scrollable =
                document
                  .documentElement
                  .scrollHeight -
                window.innerHeight;

              /* ---------------------------------------------
                 PROGRESS
              --------------------------------------------- */

              const progressValue =
                scrollable > 0
                  ? Math.min(
                      100,
                      Math.max(
                        0,
                        (scrollTop /
                          scrollable) *
                          100
                      )
                    )
                  : 0;

              setProgress(
                progressValue
              );

              /* ---------------------------------------------
                 TOP
              --------------------------------------------- */

              if (
                scrollTop < 80
              ) {
                setActive(
                  "overview"
                );

                frame = null;

                return;
              }

              /* ---------------------------------------------
                 SECTION MARKER
              --------------------------------------------- */

              const marker =
                Math.min(
                  280,
                  window.innerHeight *
                    0.3
                );

              let currentId:
                SectionId =
                "overview";

              for (
                const item of
                traceNav
              ) {
                const id =
                  item.id as SectionId;

                const section =
                  document.getElementById(
                    id
                  );

                if (!section) {
                  continue;
                }

                const rect =
                  section.getBoundingClientRect();

                if (
                  rect.top <=
                  marker
                ) {
                  currentId =
                    id;
                } else {
                  break;
                }
              }

              /* ---------------------------------------------
                 PAGE BOTTOM
              --------------------------------------------- */

              const nearBottom =
                window.innerHeight +
                  window.scrollY >=
                document
                  .documentElement
                  .scrollHeight -
                  40;

              if (nearBottom) {
                currentId =
                  "advanced";
              }

              setActive(
                currentId
              );

              frame = null;
            }
          );
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

      if (
        frame !== null
      ) {
        cancelAnimationFrame(
          frame
        );
      }
    };
  }, [traceNav]);

  /* =========================================================
     CLOSE MOBILE MENU ON DESKTOP
  ========================================================= */

  useEffect(() => {
    const handleResize =
      () => {
        if (
          window.innerWidth >=
          1180
        ) {
          setMenuOpen(
            false
          );
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
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow =
      menuOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [menuOpen]);

  /* =========================================================
     CLICK OUTSIDE LANGUAGE MENU
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick =
      (
        event: MouseEvent
      ) => {
        const target =
          event.target as Node;

        if (
          languageRef.current &&
          !languageRef.current.contains(
            target
          )
        ) {
          setLanguageOpen(
            false
          );
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
     ESC
  ========================================================= */

  useEffect(() => {
    const handleKeyDown =
      (
        event: KeyboardEvent
      ) => {
        if (
          event.key ===
          "Escape"
        ) {
          setLanguageOpen(
            false
          );

          setMenuOpen(
            false
          );
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

  /* =========================================================
     LANGUAGE CHANGE
  ========================================================= */

  const selectLanguage =
    (
      nextLocale: Locale
    ) => {
      setLanguageOpen(
        false
      );

      setMenuOpen(
        false
      );

      if (
        nextLocale === locale
      ) {
        return;
      }

      const targetPath =
        getLocalizedPath(
          pathname,
          nextLocale
        );

      /*
       * Không dùng:
       *
       * window.location.href = targetPath
       *
       * vì ESLint React 19 coi đó là mutation.
       *
       * assign() thực hiện navigation mà không
       * gán trực tiếp vào object global.
       */
      window.location.assign(
        targetPath
      );
    };

  /* =========================================================
     NAV CLICK
  ========================================================= */

  const handleNavClick =
    (
      id: SectionId
    ) => {
      setActive(id);

      setMenuOpen(
        false
      );

      setLanguageOpen(
        false
      );
    };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="site-header">
        {/* ===================================================
            BRAND
        =================================================== */}

        <a
          className="brand"
          href="#overview"
          aria-label={
            headerText.homeLabel
          }
          onClick={() =>
            handleNavClick(
              "overview"
            )
          }
        >
          <span
            className="brand-seal"
            aria-hidden="true"
          >
            ẤN
          </span>

          <span className="brand-copy">
            <b>
              {
                content.brand
                  .title
              }
            </b>

            <small>
              {
                content.brand
                  .subtitle
              }
            </small>
          </span>
        </a>

        {/* ===================================================
            DESKTOP NAV
        =================================================== */}

        <nav
          className="desktop-nav"
          aria-label={
            headerText.navLabel
          }
        >
          {traceNav.map(
            (item) => {
              const id =
                item.id as SectionId;

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
                  onClick={() =>
                    handleNavClick(
                      id
                    )
                  }
                >
                  <i>
                    {
                      item.number
                    }
                  </i>

                  <span>
                    {
                      item.label
                    }
                  </span>
                </a>
              );
            }
          )}
        </nav>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div className="header-actions">
          {/* ===============================================
              LANGUAGE
          =============================================== */}

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
              aria-label={
                headerText.chooseLanguage
              }
              onClick={() =>
                setLanguageOpen(
                  (
                    current
                  ) =>
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

            {/* =============================================
                LANGUAGE MENU
            ============================================= */}

            <div
              id="language-options"
              className={`language-dropdown ${
                languageOpen
                  ? "open"
                  : ""
              }`}
              role="menu"
              aria-label={
                headerText.chooseLanguage
              }
            >
              {languageOptions.map(
                (item) => {
                  const isSelected =
                    item.code ===
                    locale;

                  return (
                    <button
                      key={
                        item.code
                      }
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
                          size={
                            15
                          }
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* ===============================================
              MOBILE BUTTON
          =============================================== */}

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={
              menuOpen
            }
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen
                ? headerText.closeMenu
                : headerText.openMenu
            }
            onClick={() => {
              setLanguageOpen(
                false
              );

              setMenuOpen(
                (
                  current
                ) =>
                  !current
              );
            }}
          >
            {menuOpen ? (
              <X
                size={23}
                aria-hidden="true"
              />
            ) : (
              <Menu
                size={23}
                aria-hidden="true"
              />
            )}
          </button>
        </div>

        {/* ===================================================
            PROGRESS
        =================================================== */}

        <span
          className="header-progress"
          style={{
            width:
              `${progress}%`,
          }}
          aria-hidden="true"
        />
      </header>

      {/* =====================================================
          MOBILE NAV
      ===================================================== */}

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${
          menuOpen
            ? "open"
            : ""
        }`}
        aria-label={
          headerText.mobileNavLabel
        }
        aria-hidden={
          !menuOpen
        }
      >
        {/* ===================================================
            PRODUCT
        =================================================== */}

        <div className="mobile-nav-heading">
          <small>
            {
              headerText.productRecord
            }
          </small>

          <strong>
            {
              content.product
                .name
            }
          </strong>

          <p>
            {
              headerText.description
            }
          </p>
        </div>

        {/* ===================================================
            MOBILE LINKS
        =================================================== */}

        <div className="mobile-nav-list">
          {traceNav.map(
            (item) => {
              const id =
                item.id as SectionId;

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
                  onClick={() =>
                    handleNavClick(
                      id
                    )
                  }
                >
                  <i>
                    {
                      item.number
                    }
                  </i>

                  <span>
                    {
                      item.label
                    }
                  </span>

                  <b aria-hidden="true">
                    →
                  </b>
                </a>
              );
            }
          )}
        </div>

        {/* ===================================================
            MOBILE LANGUAGE
        =================================================== */}

        <div className="mobile-language">
          <small>
            {
              headerText.language
            }
          </small>

          <div>
            {languageOptions.map(
              (item) => {
                const isSelected =
                  item.code ===
                  locale;

                return (
                  <button
                    key={
                      item.code
                    }
                    type="button"
                    className={
                      isSelected
                        ? "active"
                        : ""
                    }
                    aria-pressed={
                      isSelected
                    }
                    onClick={() =>
                      selectLanguage(
                        item.code
                      )
                    }
                  >
                    {
                      item.label
                    }
                  </button>
                );
              }
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
