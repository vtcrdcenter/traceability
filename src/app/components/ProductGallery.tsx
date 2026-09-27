"use client";

import Image from "next/image";
import {
  KeyboardEvent,
  useCallback,
  useState,
  useRef,
  useId,
} from "react";

import styles from "./ProductGallery.module.css";

const BASE = "/traceability/figma";

type GalleryItem = {
  src: string;
  alt: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: "product-front.png",
    alt: "Mặt trước sản phẩm Long Vân Lưu Tín",
  },
  {
    src: "product-back.png",
    alt: "Mặt sau sản phẩm Long Vân Lưu Tín",
  },
  {
    src: "product-life.png",
    alt: "Sản phẩm Long Vân Lưu Tín trong không gian sử dụng",
  },
  {
    src: "product-box.png",
    alt: "Bao bì sản phẩm Long Vân Lưu Tín",
  },
];

export default function ProductGallery() {
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = galleryItems[activeIndex];

  const selectImage = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLButtonElement>,
      index: number
    ) => {
      let nextIndex = index;

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();

        nextIndex =
          (index + 1) % galleryItems.length;
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        event.preventDefault();

        nextIndex =
          (index - 1 + galleryItems.length) %
          galleryItems.length;
      }

      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        nextIndex = event.key === "Home" ? 0 : galleryItems.length - 1;
      }

      if (nextIndex === index) {
        return;
      }

      setActiveIndex(nextIndex);

      buttons.current[nextIndex]?.focus();
    },
    []
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.main} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${activeIndex}`}>
        <Image
          key={activeItem.src}
          src={`${BASE}/${activeItem.src}`}
          alt={activeItem.alt}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 800px) 100vw, 620px"
        />
      </div>

      <div
        className={styles.thumbs}
        role="tablist"
        aria-label="Hình ảnh sản phẩm"
      >
        {galleryItems.map((item, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Xem hình ${index + 1}: ${item.alt}`}
              className={styles.thumb}
              id={`${id}-tab-${index}`}
              aria-controls={`${id}-panel`}
              tabIndex={active ? 0 : -1}
              ref={(element) => { buttons.current[index] = element; }}
              data-gallery-index={index}
              onClick={() => selectImage(index)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
            >
              <Image
                src={`${BASE}/${item.src}`}
                alt=""
                fill
                sizes="120px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
