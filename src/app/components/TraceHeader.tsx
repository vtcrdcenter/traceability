"use client";

import { Menu, QrCode, X } from "lucide-react";
import { useEffect, useState } from "react";

const traceNav = [
  ["01", "Tổng quan", "overview"], ["02", "Sản phẩm", "product-info"],
  ["03", "Nguồn văn hóa", "heritage"], ["04", "Chuyển hóa", "design-development"],
  ["05", "Bảo chứng", "attestation"], ["06", "Quyền tác giả", "copyright"],
  ["07", "Hành trình", "journey"], ["08", "Truy xuất", "verification"],
  ["09", "Tài liệu", "records"],
] as const;

export default function TraceHeader() {
  const [active, setActive] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
      const marker = window.scrollY + window.innerHeight * .36;
      let current: string = traceNav[0][2];
      traceNav.forEach(([, , id]) => { const el = document.getElementById(id); if (el && el.offsetTop <= marker) current = id; });
      setActive(current);
    };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <header className="site-header">
    <a className="brand" href="#overview" aria-label="Nền tảng truy xuất — về đầu trang"><span className="brand-seal">ẤN</span><span><b>NỀN TẢNG TRUY XUẤT</b><small>SẢN PHẨM DI SẢN VĂN HÓA</small></span></a>
    <nav className="desktop-nav" aria-label="Điều hướng nội dung">{traceNav.map(([n,t,id]) => <a className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined} key={id} href={`#${id}`}><i>{n}</i>{t}</a>)}</nav>
    <a className="header-cta" href="#verification"><QrCode size={15}/> Quét mã</a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? "open" : ""}`} aria-label="Điều hướng di động">{traceNav.map(([n,t,id]) => <a className={active === id ? "active" : ""} key={id} href={`#${id}`} onClick={() => setOpen(false)}><i>{n}</i><span>{t}</span></a>)}<a className="mobile-cta" href="#verification" onClick={() => setOpen(false)}><QrCode size={17}/> Truy xuất sản phẩm</a></nav>
    <span className="header-progress" style={{ width: `${progress}%` }} aria-hidden="true"/>
  </header>;
}
