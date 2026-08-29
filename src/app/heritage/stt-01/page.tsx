<section id="identity" className="hero section-pad">
  <div className="hero-copy">
    <p className="eyebrow">01 — NHẬN DIỆN SẢN PHẨM</p>

    <h1>
      Dấu Ấn
      <br />
      <em>Thượng Triều Nguyễn</em>
    </h1>

    <p className="hero-lead">
      Hồ sơ nhận diện và truy xuất của sản phẩm được phát triển từ nguồn
      tư liệu mỹ thuật cung đình triều Nguyễn.
    </p>

    <div className="hero-meta">
      <span>
        <small>MÃ SẢN PHẨM</small>
        <b>STT-01</b>
      </span>

      <span>
        <small>PHIÊN BẢN</small>
        <b>01-01</b>
      </span>

      <span>
        <small>MÃ TRUY XUẤT</small>
        <b>STT-01-HERITAGE</b>
      </span>
    </div>

    <Note>Đã ghi nhận trên hệ thống truy xuất</Note>

    <div className="hero-actions">
      <a href="#verify" className="primary-button">
        Xác thực sản phẩm <ArrowDown size={15} />
      </a>
      <a href="#heritage">Xem nguồn văn hóa</a>
    </div>
  </div>

  <div className="hero-image">
    <span className="edition">
      STT<b>01</b>
    </span>

    <Image
      src={`${BASE}/heritage/product-studio.jpg`}
      alt="Sản phẩm Dấu Ấn Thượng Triều Nguyễn"
      width={1304}
      height={1206}
      priority
    />

    <div className="status-chip">
      <CheckCircle2 />
      <span>
        <small>TRẠNG THÁI HỒ SƠ</small>
        <b>Đã ghi nhận trên hệ thống truy xuất</b>
      </span>
    </div>
  </div>

  <div className="trust-strip">
    <div>
      <CheckCircle2 />
      <span>
        <small>XÁC THỰC</small>
        <b>Mã truy xuất hợp lệ</b>
      </span>
    </div>

    <div>
      <Landmark />
      <span>
        <small>BẢO CHỨNG</small>
        <b>Đã bảo chứng</b>
      </span>
    </div>

    <div>
      <FileBadge2 />
      <span>
        <small>QUYỀN TÁC GIẢ</small>
        <b>Đã được cấp chứng nhận quyền tác giả</b>
      </span>
    </div>
  </div>
</section>
