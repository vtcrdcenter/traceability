"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [["01","Nhận diện","identity"],["02","Xác thực","verification"],["03","Nguồn văn hóa","heritage"],["04","Bảo chứng","attestation"],["05","Hành trình","journey"],["06","Chi tiết","details"]] as const;

export default function TraceHeader(){
  const [active,setActive]=useState("identity");
  useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&setActive(e.target.id)),{rootMargin:"-35% 0px -55%"});nav.forEach(([, ,id])=>{const el=document.getElementById(id);if(el)observer.observe(el)});return()=>observer.disconnect()},[]);
  return <header className="site-header"><a className="brand" href="#identity"><span className="brand-seal">ẤN</span><span><b>NỀN TẢNG TRUY XUẤT</b><small>SẢN PHẨM DI SẢN VĂN HÓA</small></span></a><nav className="desktop-nav" aria-label="Điều hướng chính">{nav.map(([n,t,id])=><a className={active===id?"active":""} key={id} href={`#${id}`}><i>{n}</i>{t}</a>)}</nav><span className="language">VI</span><details className="mobile-menu"><summary aria-label="Mở menu"><Menu/></summary><nav>{nav.map(([n,t,id])=><a key={id} href={`#${id}`}><i>{n}</i>{t}</a>)}</nav></details></header>
}
