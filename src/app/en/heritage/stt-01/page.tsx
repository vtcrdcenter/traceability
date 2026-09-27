import type { Metadata } from "next";
import Image from "next/image";
import ProductGallery from "../../../components/ProductGallery";
import ProductViewer from "../../../components/ProductViewer";
import styles from "../../../heritage/stt-01/stt01.module.css";
import heroStyles from "../../../heritage/stt-01/heroStep1.module.css";

const BASE = "/traceability";
const A = `${BASE}/figma`;

export const metadata: Metadata = {
  title: "Long Vân Lưu Tín",
  description: "VTC Merch cultural product traceability record for Long Vân Lưu Tín.",
  icons: { icon: `${A}/vtc-merch-icon.png` },
  alternates: {
    canonical: "/en/heritage/stt-01/",
    languages: { "vi-VN": "/heritage/stt-01/", "en-US": "/en/heritage/stt-01/" },
  },
};

const facts = [
  ["Product name", "Long Vân Lưu Tín"],
  ["Product code", "893-110006-001-1"],
  ["Product type", "Refrigerator magnet"],
  ["Dimensions", "6.8 × 7.4 cm, 0.7 cm thick"],
  ["Materials", "Alloy, gold-plated edges, pearls"],
  ["Origin", "Vietnam"],
  ["Production date", "09/2026"],
  ["Manufacturer", "ENSA Gift Company"],
  ["Brand", "VTC Merchandise"],
];

const certificates = [
  {
    number: "01", logo: "museum.png", eyebrow: "CULTURAL ATTESTATION",
    title: "Vietnam National Museum of History",
    copy: "The institution that confirms the product's cultural references and attests to its interpretation of the Nguyen-dynasty imperial court hat, design records and Vietnamese court jewellery.",
    link: "Learn about the museum →", href: "https://baotanglichsu.vn/",
  },
  {
    number: "02", logo: "copyright.png", eyebrow: "COPYRIGHT REGISTRATION",
    title: "Copyright Office of Vietnam",
    copy: "The design titled ‘Dấu Ấn Thượng triều Nguyễn’ has been granted a copyright registration certificate.",
    link: "View certificate →", href: `${BASE}/heritage/copyright-certificate.png`,
  },
  {
    number: "03", logo: "vtc.png", eyebrow: "PLATFORM OPERATOR",
    title: "VTC Corporation",
    copy: "Vietnam Multimedia Corporation (VTC) operates the platform that stores and provides access to the product's digital record.",
    link: "Learn about VTC →", href: "https://vtc.org.vn/",
  },
];

function MuseumIcon() {
  return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18L24 7L42 18M9 18H39M12 21V36M20 21V36M28 21V36M36 21V36M8 39H40M5 43H43" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export default function Stt01EnglishPage() {
  return <main className={styles.landing}>
    <header className={styles.header}>
      <Image src={`${A}/raw-01.png`} alt="VTC Merch" width={118} height={30} priority />
      <nav aria-label="Language"><a href={`${BASE}/`}>VI</a><span>|</span><b>EN</b></nav>
    </header>

    <section className={`${styles.hero} ${heroStyles.hero}`}>
      <span aria-hidden="true" className={`${styles.ornament} ${styles.heroCloud}`} />
      <span aria-hidden="true" className={`${styles.ornament} ${styles.heroCloudLow}`} />
      <div className={`${styles.shell} ${heroStyles.heroGrid}`}>
        <div className={`${styles["hero-copy"]} ${heroStyles.heroCopy}`}>
          <span className={styles.kicker}>CULTURAL PRODUCT</span>
          <h1><span>Long Vân</span>Lưu Tín</h1>
          <p>This gift is a gentle reminder: the greatest heritage is sometimes close to home. It shines in everyday life whenever you reach out to touch it, preserving the connections you treasure most today.</p>
          <div className={heroStyles.attestation}>
            <div className={heroStyles.attestationIcon} aria-hidden="true"><MuseumIcon /></div>
            <div className={heroStyles.attestationText}><small>ATTESTED ON 29/08/2026 BY</small><strong>Vietnam National Museum of History</strong></div>
          </div>
        </div>
        <div className={heroStyles.heroImage}><Image src={`${A}/hero.png`} alt="Long Vân Lưu Tín in a living space" fill priority sizes="(max-width: 800px) 100vw, 71vw" /></div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.product}`} id="product-info">
      <div className={styles.shell}><h2>Product information</h2>
        <div className={styles["product-grid"]}>
          <ProductGallery language="en" />
          <dl className={styles.facts}>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.certificates}`} id="certificates">
      <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudLeft}`} />
      <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudRight}`} />
      <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudDivider}`} />
      <div className={styles.shell}><h2>Cultural value certification</h2>
        <div className={styles["card-grid"]}>{certificates.map(card => <article className={styles.card} key={card.number}>
          <span className={styles["card-number"]}>{card.number}</span>
          <div className={styles["card-logo"]}><Image src={`${A}/${card.logo}`} alt="" fill sizes="164px" /></div>
          <small>{card.eyebrow}</small><h3>{card.title}</h3><p>{card.copy}</p>
          <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}>{card.link}</a>
        </article>)}</div>
      </div>
    </section>

    <section className={styles.experience} id="experience">
      <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudTitleLeft}`} />
      <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudTitleRight}`} />
      <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudCornerLeft}`} />
      <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudCornerRight}`} />
      <div className={styles.shell}><h2>Explore the product from every angle</h2>
        <p>Rotate, zoom in and out, and discover the product&apos;s patterns and structure with the interactive 3D model.</p>
        <div className={styles["viewer-stage"]}><ProductViewer language="en" /></div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.story}`} id="story">
      <span aria-hidden="true" className={`${styles.ornament} ${styles.cloudRight}`} />
      <span aria-hidden="true" className={`${styles.ornament} ${styles.storyCloudBottom}`} />
      <div className={styles.shell}><h2>A sky of heritage in the modern home</h2>
        <div className={styles.source}><b>PRIMARY SOURCE OF INSPIRATION</b><p>The imperial court hat was worn by the emperor when holding court, deciding major national affairs, conducting state ceremonies or receiving foreign envoys. This rare palace artefact dates from the 19th–20th centuries and was exquisitely crafted with gold, gemstones, coral and gold thread.</p></div>
        <div className={styles["story-grid"]}>
          <div><b>THE PRODUCT STORY</b>
            <p>More than a century ago, beneath the vast sky and swirling clouds of the imperial capital, master goldsmiths poured their skill into every gold leaf and jewel to create a majestic court hat.</p>
            <p>The <strong>“Long Vân” design</strong> – dragons and phoenixes soaring among layers of clouds – symbolised supreme royal power and a vision of a vast, harmonious universe. Each carefully placed pearl, piece of coral and gemstone brought together the finest elements of nature.</p>
            <p>Today, <strong>“Long Vân Lưu Tín”</strong> brings that world of heritage into a small magnet on the refrigerator in your home. No longer carrying the weight of a royal crown, this miniature becomes a familiar keeper of family messages: a new recipe, a loving reminder or a photograph from a joyful trip.</p>
          </div>
          <div className={styles["story-image"]}><Image src={`${A}/story.png`} alt="Nguyen-dynasty imperial court hat" fill sizes="(max-width: 800px) 100vw, 560px" /></div>
        </div>
        <div className={styles["meaning-grid"]}>
          <article><Image src={`${A}/icon-cloud.png`} alt="" width={60} height={60} /><div><h3>Long Vân (Dragons and Clouds)</h3><p>Dragons and phoenixes weave through the clouds, representing ambition and freedom.</p></div></article>
          <article><Image src={`${A}/icon-note.png`} alt="" width={60} height={60} /><div><h3>Lưu Tín (Keeping Messages)</h3><p>The magnet holds notes, messages and familiar connections within the family.</p></div></article>
        </div>
      </div>
    </section>

    <footer className={styles.footer}>
      <Image src={`${A}/raw-01.png`} alt="VTC Merch" width={118} height={30} />
      <p>Platform operated by<br /><b>Vietnam Multimedia Corporation (VTC)</b></p>
      <small>© 2026 VTC Merch. All rights reserved.</small>
    </footer>
  </main>;
}
