"use client";

import Image from "next/image";
import {
  KeyboardEvent,
  useCallback,
  useState,
} from "react";

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

      if (nextIndex === index) {
        return;
      }

      setActiveIndex(nextIndex);

      requestAnimationFrame(() => {
        document
          .querySelector<HTMLButtonElement>(
            `[data-gallery-index="${nextIndex}"]`
          )
          ?.focus();
      });
    },
    []
  );

  return (
    <div className="figma-gallery">
      <div className="figma-gallery-main">
        <Image
          key={activeItem.src}
          src={`${BASE}/${activeItem.src}`}
          alt={activeItem.alt}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 760px) 100vw, 48vw"
        />
      </div>

      <div
        className="figma-thumbs"
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
              className={active ? "active" : undefined}
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
