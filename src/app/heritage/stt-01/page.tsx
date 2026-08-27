import type { Metadata } from "next";
import Image from "next/image";
import { Award, Check, ChevronDown, Diamond, Fingerprint, Landmark, MapPin, PackageCheck, QrCode, ScrollText, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "Dấu ấn Hoàng triều · STT-01", description: "Hồ sơ số của sản phẩm văn hóa Dấu ấn Hoàng triều đã phát hành trên thị trường." };
const BASE = "/traceability";
const details = [
  ["01", "Nền mũ", "Sắc đen huyền, viền kim loại ánh vàng."],
  ["02", "Cánh chuồn", "Hình rồng, mây cách điệu và chuỗi hạt."],
  ["03", "Tâm điểm", "Mặt trời đỏ, mây ngũ sắc và tua son."],
];
const traceSteps = [
  ["01.08.2026", "Nghiên cứu di sản", "Hà Nội", "Đối chiếu hình thái mũ thượng triều cùng hệ biểu tượng rồng, mây, mặt trời và chuỗi hạt."],
  ["05.08.2026", "Phát triển thiết kế", "Xưởng sáng tạo", "Chuyển hóa ngôn ngữ cung đình thành vật phẩm lưu niệm ba lớp, phù hợp đời sống đương đại."],
  ["12.08.2026", "Chế tác thủ công", "Xưởng hoàn thiện", "Tạo hình, phủ màu, mạ viền, đính chi tiết trang trí và lắp nam châm."],
  ["15.08.2026", "Kiểm tra chất lượng", "Bộ phận QC", "Kiểm tra bề mặt, màu sắc, độ chắc của chi tiết, lực bám và quy cách đóng gói."],
];

export default function HeritageProductPage() {
  return <main className="heritage-page">
    <header className="site-header"><div className="page-shell header-inner">
      <a href="#top" className="brand"><span className="brand-seal"><Landmark size={18}/></span><span><b>Dấu Ấn</b><small>Di sản Việt</small></span></a>
      <a href="#certificate" className="header-status"><ShieldCheck size={16}/> Hồ sơ sản phẩm</a>
    </div></header>

    <section id="top" className="hero"><div className="hero-pattern"/><div className="page-shell hero-grid">
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={15}/> Tuyển phẩm văn hóa cung đình</p>
        <h1>Dấu ấn<br/><em>Hoàng triều</em></h1>
        <p className="hero-lead">Một lát cắt di sản triều Nguyễn được kể lại qua ngôn ngữ thủ công đương đại.</p>
        <div className="hero-meta"><span><small>Mã sản phẩm</small><strong>STT-01</strong></span><i/><span><small>Phiên bản</small><strong>Di sản Việt</strong></span></div>
        <a href="#story" className="discover-link">Khám phá câu chuyện <ChevronDown size={18}/></a>
      </div>
      <div className="hero-visual">
        <div className="edition-stamp"><span>STT</span><b>01</b></div>
        <div className="hero-image-frame"><Image src={`${BASE}/heritage/stt-01-product.png`} alt="Miếng dán tủ lạnh Dấu ấn Hoàng triều" width={1300} height={1217} priority sizes="(max-width: 900px) 100vw, 56vw"/></div>
        <div className="verified-chip"><span><Check size={15}/></span><p><small>Hồ sơ đã ghi nhận</small><b>Bảo chứng giá trị văn hóa</b></p></div>
      </div>
    </div></section>

    <section className="quick-facts"><div className="page-shell facts-grid">
      <div><Diamond/><span><small>Kích thước sản phẩm</small><b>70 × 60 × 8 mm</b></span></div>
      <div><PackageCheck/><span><small>Công năng</small><b>Vật phẩm nam châm</b></span></div>
      <div><Fingerprint/><span><small>Mã truy xuất</small><b>STT-01-HERITAGE</b></span></div>
    </div></section>

    <section id="story" className="story-section page-shell">
      <div className="section-heading"><p className="eyebrow dark">Câu chuyện thiết kế</p><h2>Từ bảo vật cung đình<br/>đến ký ức mang về</h2><p>Hình tượng chiếc mũ thượng triều được chắt lọc thành một vật phẩm nhỏ gọn—giữ tinh thần trang nghiêm, giàu biểu tượng nhưng gần gũi với đời sống hôm nay.</p></div>
      <div className="story-layout">
        <div className="detail-image"><Image src={`${BASE}/heritage/stt-01-product.png`} alt="Chi tiết họa tiết rồng và mây" width={1300} height={1217} sizes="(max-width: 900px) 100vw, 48vw"/><span>Chi tiết tạo hình sản phẩm</span></div>
        <div className="details-panel"><p className="panel-kicker">Ngôn ngữ tạo hình</p>
          {details.map(([number,title,copy])=><article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          <blockquote>“Giữ hồn cốt di sản, kể bằng một hình thức mới.”</blockquote>
        </div>
      </div>
    </section>

    <section className="materials-section"><div className="page-shell materials-grid">
      <div className="materials-intro"><p className="eyebrow gold">Chất liệu & hoàn thiện</p><h2>Sắc son.<br/>Ánh kim.<br/>Nét ngọc.</h2><p>Bảng màu gợi nhắc mỹ thuật cung đình, tạo chiều sâu thị giác và vẻ trang trọng cho một vật phẩm lưu niệm nhỏ.</p></div>
      <div className="material-cards">
        <article><span className="swatch black"/><small>01</small><h3>Đen huyền</h3><p>Làm nền, tôn đường nét ánh kim.</p></article>
        <article><span className="swatch gold"/><small>02</small><h3>Vàng thếp</h3><p>Gợi vẻ uy nghi của mỹ thuật cung đình.</p></article>
        <article><span className="swatch jade"/><small>03</small><h3>Xanh ngọc</h3><p>Cân bằng sắc độ, tạo vẻ thanh nhã.</p></article>
        <article><span className="swatch vermilion"/><small>04</small><h3>Đỏ son</h3><p>Tạo điểm nhấn ở tâm và tua trang trí.</p></article>
      </div>
    </div></section>

    <section className="concept-section"><div className="page-shell">
      <div className="concept-heading"><div><p className="eyebrow dark">Tư liệu sản phẩm</p><h2>Từ ý tưởng đến vật phẩm</h2></div><p>Bảng phát triển ý tưởng STT-01<br/><span>Vuốt ngang để xem trên điện thoại</span></p></div>
      <div className="concept-scroll"><Image src={`${BASE}/heritage/stt-01-concept-board.png`} alt="Bảng ý tưởng thiết kế STT-01" width={3000} height={1688} sizes="(max-width: 768px) 860px, 100vw"/></div>
    </div></section>

    <section id="trace" className="trace-section page-shell">
      <div className="trace-heading"><p className="eyebrow dark">Hành trình sản phẩm</p><h2>Mỗi công đoạn,<br/>một dấu xác thực</h2><div className="trace-code"><Fingerprint/><span><small>Mã hồ sơ</small><b>STT-01-HERITAGE</b></span></div></div>
      <div className="timeline">{traceSteps.map(([date,title,place,copy],index)=><article key={title}><div className="timeline-mark"><span>{String(index+1).padStart(2,"0")}</span></div><div className="timeline-copy"><time>{date}</time><h3>{title}</h3><p>{copy}</p><small><MapPin size={13}/>{place}</small></div></article>)}</div>
    </section>

    <section id="certificate" className="certificate-section"><div className="page-shell">
      <div className="assurance-heading"><p className="eyebrow dark">Certificate · Hồ sơ xác nhận</p><h2>Ba lớp bảo chứng<br/>cho một giá trị văn hóa</h2><p>Thông tin về giá trị văn hóa, quyền tác giả và đơn vị vận hành được thể hiện minh bạch trên cùng hồ sơ sản phẩm.</p></div>
      <div className="assurance-grid">
        <article className="assurance-card museum-card">
          <div className="assurance-logo museum-logo"><Image src={`${BASE}/heritage/museum-logo.png`} alt="Biểu trưng Bảo tàng Lịch sử Quốc gia" width={338} height={338}/></div>
          <div className="assurance-index">01</div><p className="assurance-label">Bảo chứng giá trị văn hóa</p><h3>Bảo tàng Lịch sử Quốc gia</h3>
          <p className="assurance-copy">Bảo chứng nội dung khai thác giá trị văn hóa từ hình tượng mũ thượng triều thời Nguyễn, hệ họa tiết rồng, mây, mặt trời và nghệ thuật trang sức cung đình Việt Nam.</p>
          <div className="assurance-state"><ShieldCheck/><span><small>Trạng thái</small><b>Đã bảo chứng</b></span></div>
        </article>
        <article className="assurance-card copyright-card">
          <div className="assurance-logo copyright-logo"><Image src={`${BASE}/heritage/copyright-office-logo.png`} alt="Biểu trưng Cục Bản quyền tác giả" width={4000} height={4000}/></div>
          <div className="assurance-index">02</div><p className="assurance-label">Chứng nhận quyền tác giả</p><h3>Cục Bản quyền tác giả</h3>
          <p className="assurance-copy">Thiết kế mỹ thuật ứng dụng “Dấu ấn Hoàng triều – STT-01” có Giấy chứng nhận đăng ký quyền tác giả do Cục Bản quyền tác giả cấp.</p>
          <div className="assurance-state"><ScrollText/><span><small>Loại hình tác phẩm</small><b>Mỹ thuật ứng dụng</b></span></div>
        </article>
        <article className="assurance-card operator-card">
          <div className="assurance-logo vtc-logo"><Image src={`${BASE}/heritage/vtc-logo.png`} alt="Biểu trưng VTC" width={4000} height={2160}/></div>
          <div className="assurance-index">03</div><p className="assurance-label">Đơn vị vận hành nền tảng</p><h3>VTC</h3>
          <p className="assurance-copy">VTC là đơn vị vận hành nền tảng lưu trữ, công bố và hỗ trợ tra cứu hồ sơ số của sản phẩm.</p>
          <div className="assurance-state"><Fingerprint/><span><small>Vai trò</small><b>Vận hành nền tảng</b></span></div>
        </article>
      </div>
      <div className="museum-document-card">
        <div className="museum-document-copy">
          <div className="certificate-emblem"><Landmark size={32}/></div>
          <p className="eyebrow gold">Chứng thư xác thực</p>
          <h2>Chứng nhận<br/>giá trị văn hóa</h2>
          <p>Chứng thư ghi nhận sản phẩm khai thác và chuyển hóa giá trị văn hóa từ di sản Việt Nam, được Bảo tàng Lịch sử Quốc gia bảo chứng về nội dung văn hóa.</p>
          <dl><div><dt>Đơn vị bảo chứng</dt><dd>Bảo tàng Lịch sử Quốc gia</dd></div><div><dt>Sản phẩm</dt><dd>Dấu ấn Hoàng triều – STT-01</dd></div><div><dt>Giá trị tham chiếu</dt><dd>Mỹ thuật cung đình triều Nguyễn</dd></div></dl>
          <small>* Bản gốc được lưu cùng hồ sơ và bàn giao kèm vật phẩm.</small>
        </div>
        <div className="museum-document-preview">
          <span>Certificate of Cultural Value</span>
          <div className="cultural-certificate" role="img" aria-label="Chứng thư bảo chứng giá trị văn hóa cho sản phẩm Dấu ấn Hoàng triều">
            <div className="certificate-border">
              <div className="certificate-head">
                <div className="certificate-museum"><Image src={`${BASE}/heritage/museum-logo.png`} alt="" width={338} height={338}/><div><b>BẢO TÀNG LỊCH SỬ QUỐC GIA</b><small>NATIONAL MUSEUM OF HISTORY</small></div></div>
                <div className="certificate-serial"><small>MÃ HỒ SƠ / RECORD NO.</small><b>STT-01-HERITAGE</b></div>
              </div>
              <div className="certificate-rule"/>
              <div className="certificate-main">
                <div className="certificate-info">
                  <div className="certificate-product"><small>TÊN SẢN PHẨM / PRODUCT NAME</small><h3>DẤU ẤN HOÀNG TRIỀU</h3><p>Miếng dán tủ lạnh nghệ thuật · STT-01</p></div>
                  <div className="certificate-significance"><small>THÔNG ĐIỆP & GIÁ TRỊ VĂN HÓA / CULTURAL SIGNIFICANCE</small><p>Sản phẩm lấy cảm hứng từ mũ thượng triều thời Nguyễn, chắt lọc hình tượng rồng, mây, mặt trời và chuỗi hạt cung đình. Thiết kế chuyển hóa tinh thần mỹ thuật truyền thống thành vật phẩm lưu niệm đương đại, góp phần lan tỏa giá trị di sản văn hóa Việt Nam.</p></div>
                  <div className="certificate-specs">
                    <div><small>CHẤT LIỆU / MATERIAL</small><b>Kim loại, kính, chi tiết giả ngọc trai, nam châm</b></div>
                    <div><small>KỸ THUẬT / TECHNIQUE</small><b>Tạo hình, phủ màu, mạ viền, đính chi tiết và lắp ráp</b></div>
                    <div><small>KÍCH THƯỚC / DIMENSIONS</small><b>70 × 60 × 8 mm</b></div>
                    <div><small>NGUỒN CẢM HỨNG / HERITAGE REFERENCE</small><b>Mũ thượng triều triều Nguyễn, thế kỷ XIX–XX</b></div>
                  </div>
                </div>
                <div className="certificate-side">
                  <div className="certificate-product-image"><Image src={`${BASE}/heritage/stt-01-product.png`} alt="Sản phẩm STT-01" width={1300} height={1217}/></div>
                  <div className="certificate-qr"><QrCode/><small>HỒ SƠ SỐ<br/>DIGITAL RECORD</small></div>
                </div>
              </div>
              <div className="certificate-rule"/>
              <div className="certificate-foot">
                <div><p>Ngày cấp / Issue date: 20/08/2026</p><p>Hồ sơ văn hóa sản phẩm STT-01</p></div>
                <div className="certificate-approval"><Image src={`${BASE}/heritage/museum-red-seal.png`} alt="Dấu ấn xác nhận" width={480} height={480}/><span><small>BẢO CHỨNG GIÁ TRỊ VĂN HÓA</small><b>ĐẠI DIỆN XÁC NHẬN</b></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="document-card">
        <div className="document-preview"><Image src={`${BASE}/heritage/copyright-certificate.png`} alt="Giấy chứng nhận đăng ký quyền tác giả" width={768} height={1024}/></div>
        <div className="document-copy"><div className="certificate-emblem"><Award size={32}/></div><p className="eyebrow dark">Tài liệu pháp lý</p><h2>Giấy chứng nhận đăng ký quyền tác giả</h2><p>Văn bằng do Cục Bản quyền tác giả – Bộ Văn hóa, Thể thao và Du lịch cấp, ghi nhận quyền tác giả đối với thiết kế sản phẩm đã phát hành.</p><dl><div><dt>Tên tác phẩm</dt><dd>Dấu ấn Hoàng triều – STT-01</dd></div><div><dt>Loại hình</dt><dd>Tác phẩm mỹ thuật ứng dụng</dd></div><div><dt>Cơ quan cấp</dt><dd>Cục Bản quyền tác giả</dd></div><div><dt>Trạng thái hồ sơ</dt><dd>Đã được cấp chứng nhận</dd></div></dl></div>
      </div>
    </div></section>

    <footer className="footer"><div className="page-shell footer-inner"><div className="brand inverse"><span className="brand-seal"><Landmark size={18}/></span><span><b>Dấu Ấn</b><small>Di sản Việt</small></span></div><div className="footer-operator"><Image src={`${BASE}/heritage/vtc-logo.png`} alt="VTC" width={4000} height={2160}/><span><small>Nền tảng được vận hành bởi</small><b>VTC</b></span></div><p>Hồ sơ sản phẩm STT-01<br/>Cập nhật 20.08.2026</p></div></footer>
    <nav className="mobile-nav"><a href="#trace"><Fingerprint/>Truy xuất</a><a href="#certificate"><Award/>Hồ sơ</a></nav>
  </main>;
}
