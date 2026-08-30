export type Locale = "vi" | "en";

export type TraceNavItem = {
  number: string;
  label: string;
  id:
    | "overview"
    | "verification"
    | "heritage-story"
    | "merch"
    | "documents"
    | "advanced";
};

export type VerificationItem = {
  key: "trace" | "attestation" | "copyright";
  eyebrow: string;
  title: string;
  description: string;
};

export type HeritageHighlight = {
  number: string;
  title: string;
  description: string;
};

export type MerchCard = {
  eyebrow: string;
  title: string;
  description: string;
};

export type DocumentItem = {
  title: string;
  subtitle: string;
  meta: string;
};

export type DesignMappingItem = {
  number: string;
  source: string;
  transformation: string;
};

export type JourneyItem = {
  number: string;
  title: string;
  description: string;
};

export type ProductContent = {
  locale: Locale;

  language: {
    short: string;
    label: string;
  };

  nav: TraceNavItem[];

  brand: {
    title: string;
    subtitle: string;
  };

  product: {
    name: string;
    code: string;
    traceCode: string;
    type: string;
    size: string;
    version: string;
    lot: string;
    serial: string;
  };

  overview: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;

    meta: {
      codeLabel: string;
      typeLabel: string;
      traceLabel: string;
    };

    primaryAction: string;
    secondaryAction: string;

    status: {
      label: string;
      value: string;
    };

    quickNavLabel: string;
    quickNavDescription: string;
  };

  verification: {
    number: string;
    eyebrow: string;
    title: string;
    description: string;

    items: VerificationItem[];

    productInfo: {
      eyebrow: string;
      title: string;

      fields: {
        label: string;
        value: string;
      }[];
    };

    traceResult: {
      eyebrow: string;
      validLabel: string;
      codeLabel: string;
      description: string;
      advancedLink: string;
    };
  };

  heritage: {
    number: string;
    eyebrow: string;
    title: string;
    description: string;

    sourceCaption: string;

    storyEyebrow: string;
    storyTitle: string;
    storyDescription: string;
    advancedLink: string;

    highlights: HeritageHighlight[];
  };

  merch: {
    number: string;
    eyebrow: string;
    title: string;
    description: string;

    feature: {
      eyebrow: string;
      title: string;
      description: string;
      cta: string;
    };

    cards: MerchCard[];
  };

  documents: {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    advancedLink: string;

    items: DocumentItem[];
  };

  advanced: {
    number: string;
    eyebrow: string;
    title: string;
    description: string;

    sections: {
      heritageSource: {
        number: string;
        title: string;
        eyebrow: string;
        heading: string;
        description: string;

        meta: {
          label: string;
          value: string;
        }[];
      };

      designTransformation: {
        number: string;
        title: string;
        eyebrow: string;
        caption: string;

        mappings: DesignMappingItem[];

        principle: {
          label: string;
          description: string;
        };
      };

      attestation: {
        number: string;
        title: string;
        eyebrow: string;
        description: string;

        cards: {
          label: string;
          value: string;
        }[];

        document: {
          eyebrow: string;
          title: string;
          description: string;
          certificateLabel: string;
          certificateTitle: string;
          certificateMeta: string;
        };
      };

      copyright: {
        number: string;
        title: string;
        eyebrow: string;
        heading: string;
        description: string;

        meta: {
          label: string;
          value: string;
        }[];
      };

      journey: {
        number: string;
        title: string;
        items: JourneyItem[];
      };

      traceData: {
        number: string;
        title: string;

        fields: {
          label: string;
          value: string;
          status?: string;
        }[];

        privacy: {
          title: string;
          description: string;
        };
      };
    };
  };

  footer: {
    platformTitle: string;
    platformSubtitle: string;

    navTitle: string;

    operatorLabel: string;
    operatorName: string;
    operatorDescription: string;

    backToTop: string;

    copyright: string;
  };
};

/* =========================================================
   SHARED FACTUAL DATA
   Các giá trị này dùng chung cho VI / EN
========================================================= */

const sharedProduct = {
  code: "STT-01",
  traceCode: "VTC-STT-01",
  version: "01",
  lot: "STT-01-2026",
  serial: "000001",
};

const sharedAttestation = {
  organizationVi: "Bảo tàng Lịch sử Quốc gia",
  organizationEn: "Vietnam National Museum of History",
  statusVi: "Đã bảo chứng",
  statusEn: "Attested",
  code: "01",
  date: "29/08/2026",
};

const sharedCopyright = {
  number: "8854/2026/QTG",
  date: "26/08/2026",
};

/* =========================================================
   VIETNAMESE CONTENT
========================================================= */

const vi: ProductContent = {
  locale: "vi",

  language: {
    short: "VI",
    label: "Tiếng Việt",
  },

  nav: [
    {
      number: "01",
      label: "Tổng quan",
      id: "overview",
    },
    {
      number: "02",
      label: "Xác thực",
      id: "verification",
    },
    {
      number: "03",
      label: "Câu chuyện",
      id: "heritage-story",
    },
    {
      number: "04",
      label: "VTC Merch",
      id: "merch",
    },
    {
      number: "05",
      label: "Tài liệu",
      id: "documents",
    },
    {
      number: "06",
      label: "Nâng cao",
      id: "advanced",
    },
  ],

  brand: {
    title: "NỀN TẢNG TRUY XUẤT",
    subtitle: "SẢN PHẨM VĂN HÓA",
  },

  product: {
    name: "Dấu Ấn Thượng Triều Nguyễn",
    code: sharedProduct.code,
    traceCode: sharedProduct.traceCode,
    type: "Nam châm lưu niệm nhiều lớp",
    size: "Theo phương án thiết kế",
    version: sharedProduct.version,
    lot: sharedProduct.lot,
    serial: sharedProduct.serial,
  },

  overview: {
    eyebrow: "SẢN PHẨM VĂN HÓA · HỒ SƠ TRUY XUẤT",

    titleLine1: "Dấu Ấn",
    titleLine2: "Thượng Triều Nguyễn",

    description:
      "Sản phẩm lưu niệm lấy cảm hứng từ mỹ thuật cung đình triều Nguyễn, phát triển từ các yếu tố tạo hình của mũ Cửu Long Thông Thiên.",

    meta: {
      codeLabel: "Mã sản phẩm",
      typeLabel: "Loại sản phẩm",
      traceLabel: "Mã truy xuất",
    },

    primaryAction: "Xem xác thực",
    secondaryAction: "Câu chuyện văn hóa",

    status: {
      label: "Trạng thái truy xuất",
      value: "Mã truy xuất hợp lệ",
    },

    quickNavLabel: "XEM NHANH",
    quickNavDescription:
      "Các nội dung chính trong hồ sơ truy xuất sản phẩm.",
  },

  verification: {
    number: "02",
    eyebrow: "XÁC THỰC SẢN PHẨM",
    title: "Những thông tin quan trọng nhất.",
    description:
      "Các trạng thái xác thực chính được hiển thị trước để người dùng có thể kiểm tra nhanh sản phẩm.",

    items: [
      {
        key: "trace",
        eyebrow: "MÃ TRUY XUẤT",
        title: "Hợp lệ",
        description: sharedProduct.traceCode,
      },
      {
        key: "attestation",
        eyebrow: "BẢO CHỨNG VĂN HÓA",
        title: sharedAttestation.statusVi,
        description: sharedAttestation.organizationVi,
      },
      {
        key: "copyright",
        eyebrow: "QUYỀN TÁC GIẢ",
        title: "Đã được cấp chứng nhận",
        description: `Số ${sharedCopyright.number}`,
      },
    ],

    productInfo: {
      eyebrow: "THÔNG TIN CƠ BẢN",
      title: "Thông tin sản phẩm",

      fields: [
        {
          label: "Tên sản phẩm",
          value: "Dấu Ấn Thượng Triều Nguyễn",
        },
        {
          label: "Mã sản phẩm",
          value: sharedProduct.code,
        },
        {
          label: "Loại sản phẩm",
          value: "Nam châm lưu niệm nhiều lớp",
        },
        {
          label: "Kích thước",
          value: "Theo phương án thiết kế",
        },
      ],
    },

    traceResult: {
      eyebrow: "KẾT QUẢ TRUY XUẤT",
      validLabel: "Hợp lệ",
      codeLabel: sharedProduct.traceCode,
      description:
        "Mã truy xuất đang được ghi nhận là hợp lệ trong hồ sơ sản phẩm. Người dùng có thể xem thêm các thông tin về nguồn văn hóa, bảo chứng, quyền tác giả và quá trình phát triển ở phần nâng cao.",
      advancedLink: "Xem thông tin nâng cao",
    },
  },

  heritage: {
    number: "03",
    eyebrow: "CÂU CHUYỆN VĂN HÓA",
    title:
      "Từ mũ Cửu Long Thông Thiên đến sản phẩm lưu niệm.",
    description:
      "Thiết kế khai thác các dấu hiệu tạo hình đặc trưng của mỹ thuật cung đình triều Nguyễn và chuyển hóa thành một sản phẩm lưu niệm có khả năng nhận diện nhanh.",

    sourceCaption:
      "Nguồn tham chiếu tạo hình · Mũ Cửu Long Thông Thiên",

    storyEyebrow: "NGUỒN CẢM HỨNG",
    storyTitle:
      "Giữ lại dấu hiệu nhận diện, thay đổi cách thể hiện.",
    storyDescription:
      "Sản phẩm không tái hiện nguyên trạng hiện vật. Các yếu tố đặc trưng như dáng mũ, cánh mũ, hình tượng rồng, mây, điểm nhấn trung tâm và chuỗi hạt được giản lược, sắp xếp lại và chuyển thành cấu trúc nhiều lớp phù hợp với công năng của một sản phẩm lưu niệm.",

    advancedLink: "Tìm hiểu chi tiết",

    highlights: [
      {
        number: "01",
        title: "Dáng mũ",
        description:
          "Giữ đường nét nhận diện của hình dáng tổng thể để tạo liên hệ trực tiếp với nguồn cảm hứng.",
      },
      {
        number: "02",
        title: "Rồng và mây",
        description:
          "Các họa tiết được giản lược và tổ chức lại nhằm phù hợp với kích thước nhỏ của sản phẩm.",
      },
      {
        number: "03",
        title: "Màu sắc cung đình",
        description:
          "Tông đen, vàng và đỏ được sử dụng như những điểm nhận diện thị giác chính của thiết kế.",
      },
    ],
  },

  merch: {
    number: "04",
    eyebrow: "VTC MERCH",
    title:
      "Tiếp tục khám phá hệ sinh thái sản phẩm văn hóa.",
    description:
      "Không gian dành cho các sản phẩm mới, câu chuyện văn hóa, hoạt động hợp tác và các nội dung thuộc hệ sinh thái VTC Merch.",

    feature: {
      eyebrow: "HỆ SINH THÁI MERCH",
      title:
        "Đưa chất liệu văn hóa vào những sản phẩm gần gũi hơn với đời sống.",
      description:
        "VTC Merch hướng tới phát triển các sản phẩm có nguồn tham chiếu rõ ràng, có khả năng truy xuất và có câu chuyện văn hóa đi kèm.",
      cta: "Khám phá VTC Merch",
    },

    cards: [
      {
        eyebrow: "01",
        title: "Sản phẩm mới",
        description:
          "Cập nhật các sản phẩm văn hóa và bộ sưu tập đang được phát triển trong hệ sinh thái.",
      },
      {
        eyebrow: "02",
        title: "Câu chuyện văn hóa",
        description:
          "Tìm hiểu nguồn cảm hứng, hiện vật, họa tiết và nội dung văn hóa đứng sau từng thiết kế.",
      },
      {
        eyebrow: "03",
        title: "Hợp tác",
        description:
          "Kết nối bảo tàng, đơn vị văn hóa, nhà thiết kế và các đối tác phát triển sản phẩm.",
      },
    ],
  },

  documents: {
    number: "05",
    eyebrow: "TÀI LIỆU XÁC THỰC",
    title: "Hồ sơ chính của sản phẩm.",
    description:
      "Các tài liệu chính được sử dụng để đối chiếu thông tin bảo chứng và quyền tác giả của thiết kế.",
    advancedLink: "Xem toàn bộ thông tin nâng cao",

    items: [
      {
        title: "Chứng thư bảo chứng văn hóa",
        subtitle: sharedAttestation.organizationVi,
        meta: `Mã bảo chứng ${sharedAttestation.code} · ${sharedAttestation.date}`,
      },
      {
        title:
          "Giấy chứng nhận đăng ký quyền tác giả",
        subtitle:
          "Hồ sơ quyền tác giả của thiết kế",
        meta: `Số ${sharedCopyright.number} · ${sharedCopyright.date}`,
      },
    ],
  },

  advanced: {
    number: "06",
    eyebrow: "THÔNG TIN NÂNG CAO",
    title: "Dành cho người muốn tìm hiểu sâu hơn.",
    description:
      "Thông tin chi tiết về nguồn văn hóa, cách chuyển hóa thiết kế, bảo chứng, quyền tác giả, hành trình phát triển và dữ liệu truy xuất.",

    sections: {
      heritageSource: {
        number: "01",
        title: "Nguồn văn hóa chi tiết",
        eyebrow: "NGUỒN THAM CHIẾU",
        heading: "Mũ Cửu Long Thông Thiên",
        description:
          "Nguồn tham chiếu chính của thiết kế là hình dáng và các yếu tố tạo hình trên mũ Cửu Long Thông Thiên thuộc hệ mỹ thuật cung đình triều Nguyễn. Hồ sơ tập trung vào các dấu hiệu có khả năng nhận diện khi chuyển sang thiết kế sản phẩm lưu niệm.",

        meta: [
          {
            label: "Loại nguồn",
            value: "Hiện vật / nguồn văn hóa",
          },
          {
            label: "Giai đoạn",
            value: "Triều Nguyễn",
          },
          {
            label: "Yếu tố khai thác",
            value:
              "Dáng mũ, cánh mũ, rồng, mây, điểm nhấn trung tâm, chuỗi hạt và tua",
          },
        ],
      },

      designTransformation: {
        number: "02",
        title: "Chuyển hóa thiết kế",
        eyebrow: "TỪ NGUỒN VĂN HÓA ĐẾN SẢN PHẨM",
        caption:
          "Bảng phát triển và đối chiếu các yếu tố thiết kế",

        mappings: [
          {
            number: "01",
            source: "Dáng mũ tổng thể",
            transformation:
              "Giữ đường viền nhận diện chính và thu gọn tỷ lệ để phù hợp với sản phẩm nhỏ.",
          },
          {
            number: "02",
            source: "Hai cánh mũ",
            transformation:
              "Tổ chức đối xứng hai bên và điều chỉnh độ vươn để giữ cân bằng thị giác.",
          },
          {
            number: "03",
            source: "Hình tượng rồng",
            transformation:
              "Giản lược chi tiết, giữ các nét chính để đảm bảo khả năng nhận diện khi thu nhỏ.",
          },
          {
            number: "04",
            source: "Họa tiết mây",
            transformation:
              "Chuyển thành các lớp trang trí đối xứng, hỗ trợ chiều sâu cho cấu trúc sản phẩm.",
          },
          {
            number: "05",
            source: "Điểm nhấn trung tâm",
            transformation:
              "Sử dụng màu đỏ ở trung tâm để tạo điểm tập trung thị giác.",
          },
          {
            number: "06",
            source: "Chuỗi hạt và tua",
            transformation:
              "Được cách điệu thành chi tiết trang trí ở phần dưới của thiết kế.",
          },
        ],

        principle: {
          label: "Nguyên tắc chuyển hóa",
          description:
            "Giữ các dấu hiệu nhận diện quan trọng của nguồn văn hóa, đồng thời giản lược và bố cục lại để phù hợp với kích thước, vật liệu và công năng của sản phẩm lưu niệm.",
        },
      },

      attestation: {
        number: "03",
        title: "Bảo chứng văn hóa",
        eyebrow: "THÔNG TIN BẢO CHỨNG",
        description:
          "Thông tin bảo chứng được trình bày để người dùng có thể đối chiếu đơn vị xác nhận, trạng thái, mã và thời điểm bảo chứng của sản phẩm.",

        cards: [
          {
            label: "Đơn vị bảo chứng",
            value: sharedAttestation.organizationVi,
          },
          {
            label: "Trạng thái",
            value: sharedAttestation.statusVi,
          },
          {
            label: "Mã bảo chứng",
            value: sharedAttestation.code,
          },
          {
            label: "Ngày bảo chứng",
            value: sharedAttestation.date,
          },
        ],

        document: {
          eyebrow: "CHỨNG THƯ",
          title: "Chứng thư bảo chứng văn hóa",
          description:
            "Tài liệu xác nhận thông tin bảo chứng của sản phẩm theo hồ sơ được công bố trên nền tảng.",
          certificateLabel: "BẢO CHỨNG VĂN HÓA",
          certificateTitle:
            "Dấu Ấn Thượng Triều Nguyễn",
          certificateMeta: `Mã ${sharedAttestation.code} · ${sharedAttestation.date}`,
        },
      },

      copyright: {
        number: "04",
        title: "Quyền tác giả",
        eyebrow: "GIẤY CHỨNG NHẬN",
        heading:
          "Giấy chứng nhận đăng ký quyền tác giả",
        description:
          "Thông tin giấy chứng nhận được trình bày riêng để phân biệt với nội dung bảo chứng văn hóa.",

        meta: [
          {
            label: "Tên tác phẩm",
            value:
              "Thiết kế Dấu Ấn Thượng Triều Nguyễn",
          },
          {
            label: "Loại hình",
            value:
              "Theo nội dung giấy chứng nhận",
          },
          {
            label: "Số giấy chứng nhận",
            value: sharedCopyright.number,
          },
          {
            label: "Ngày cấp",
            value: sharedCopyright.date,
          },
          {
            label: "Chủ sở hữu",
            value:
              "Theo nội dung giấy chứng nhận",
          },
        ],
      },

      journey: {
        number: "05",
        title: "Hành trình sản phẩm",

        items: [
          {
            number: "01",
            title: "Nghiên cứu nguồn",
            description:
              "Xác định nguồn văn hóa và các yếu tố có thể khai thác cho thiết kế.",
          },
          {
            number: "02",
            title: "Phát triển thiết kế",
            description:
              "Chuyển hóa các yếu tố nhận diện thành cấu trúc phù hợp với sản phẩm.",
          },
          {
            number: "03",
            title: "Hoàn thiện phương án",
            description:
              "Điều chỉnh bố cục, lớp chi tiết, màu sắc và thông số thiết kế.",
          },
          {
            number: "04",
            title: "Bảo chứng văn hóa",
            description:
              "Đối chiếu và ghi nhận trạng thái bảo chứng của sản phẩm.",
          },
          {
            number: "05",
            title: "Sản xuất và kiểm tra",
            description:
              "Hoàn thiện mẫu, kiểm tra thông tin và chuẩn bị dữ liệu truy xuất.",
          },
          {
            number: "06",
            title: "Gắn mã truy xuất",
            description:
              "Mỗi sản phẩm được liên kết với hồ sơ truy xuất để người dùng tra cứu.",
          },
        ],
      },

      traceData: {
        number: "06",
        title: "Dữ liệu truy xuất",

        fields: [
          {
            label: "Mã truy xuất",
            value: sharedProduct.traceCode,
            status: "Hợp lệ",
          },
          {
            label: "Lô sản phẩm",
            value: sharedProduct.lot,
          },
          {
            label: "Số sê-ri",
            value: sharedProduct.serial,
          },
          {
            label: "Phiên bản hồ sơ",
            value: sharedProduct.version,
          },
        ],

        privacy: {
          title: "Phạm vi dữ liệu công khai",
          description:
            "Nền tảng chỉ hiển thị các thông tin cần thiết phục vụ truy xuất, xác thực và cung cấp câu chuyện sản phẩm. Các dữ liệu nội bộ không thuộc phạm vi công khai sẽ không được hiển thị.",
        },
      },
    },
  },

  footer: {
    platformTitle: "Nền tảng truy xuất",
    platformSubtitle: "Sản phẩm văn hóa",

    navTitle: "Nội dung",

    operatorLabel: "Nền tảng được vận hành bởi",
    operatorName: "VTC",
    operatorDescription:
      "Tổng công ty Truyền thông Đa phương tiện.",

    backToTop: "Về đầu trang",

    copyright:
      "© 2026 VTC. Thông tin trên nền tảng phục vụ mục đích truy xuất và đối chiếu hồ sơ sản phẩm.",
  },
};

/* =========================================================
   ENGLISH CONTENT
========================================================= */

const en: ProductContent = {
  locale: "en",

  language: {
    short: "EN",
    label: "English",
  },

  nav: [
    {
      number: "01",
      label: "Overview",
      id: "overview",
    },
    {
      number: "02",
      label: "Verification",
      id: "verification",
    },
    {
      number: "03",
      label: "Heritage Story",
      id: "heritage-story",
    },
    {
      number: "04",
      label: "VTC Merch",
      id: "merch",
    },
    {
      number: "05",
      label: "Documents",
      id: "documents",
    },
    {
      number: "06",
      label: "Advanced",
      id: "advanced",
    },
  ],

  brand: {
    title: "TRACEABILITY PLATFORM",
    subtitle: "CULTURAL PRODUCTS",
  },

  product: {
    name: "Nguyen Imperial Court Imprint",
    code: sharedProduct.code,
    traceCode: sharedProduct.traceCode,
    type: "Multi-layer souvenir magnet",
    size: "According to the design specification",
    version: sharedProduct.version,
    lot: sharedProduct.lot,
    serial: sharedProduct.serial,
  },

  overview: {
    eyebrow: "CULTURAL PRODUCT · TRACEABILITY RECORD",

    titleLine1: "Nguyen Imperial",
    titleLine2: "Court Imprint",

    description:
      "A cultural souvenir inspired by Nguyen-dynasty court aesthetics, developed from distinctive visual elements of the Cuu Long Thong Thien imperial court hat.",

    meta: {
      codeLabel: "Product code",
      typeLabel: "Product type",
      traceLabel: "Trace code",
    },

    primaryAction: "View verification",
    secondaryAction: "Heritage story",

    status: {
      label: "Traceability status",
      value: "Valid trace code",
    },

    quickNavLabel: "QUICK ACCESS",
    quickNavDescription:
      "Key information available in this product traceability record.",
  },

  verification: {
    number: "02",
    eyebrow: "PRODUCT VERIFICATION",
    title: "The most important information first.",
    description:
      "Key verification statuses are displayed upfront so users can quickly confirm essential product information.",

    items: [
      {
        key: "trace",
        eyebrow: "TRACE CODE",
        title: "Valid",
        description: sharedProduct.traceCode,
      },
      {
        key: "attestation",
        eyebrow: "CULTURAL ATTESTATION",
        title: sharedAttestation.statusEn,
        description: sharedAttestation.organizationEn,
      },
      {
        key: "copyright",
        eyebrow: "COPYRIGHT",
        title: "Registration certificate issued",
        description: `No. ${sharedCopyright.number}`,
      },
    ],

    productInfo: {
      eyebrow: "BASIC INFORMATION",
      title: "Product information",

      fields: [
        {
          label: "Product name",
          value: "Nguyen Imperial Court Imprint",
        },
        {
          label: "Product code",
          value: sharedProduct.code,
        },
        {
          label: "Product type",
          value: "Multi-layer souvenir magnet",
        },
        {
          label: "Dimensions",
          value: "According to the design specification",
        },
      ],
    },

    traceResult: {
      eyebrow: "TRACE RESULT",
      validLabel: "Valid",
      codeLabel: sharedProduct.traceCode,
      description:
        "The trace code is recorded as valid in the product record. Additional information about the cultural source, attestation, copyright and development process is available in the advanced section.",
      advancedLink: "View advanced information",
    },
  },

  heritage: {
    number: "03",
    eyebrow: "HERITAGE STORY",
    title:
      "From the Cuu Long Thong Thien hat to a cultural souvenir.",
    description:
      "The design draws on distinctive features of Nguyen-dynasty court aesthetics and translates them into a souvenir format with clear visual recognition.",

    sourceCaption:
      "Visual reference · Cuu Long Thong Thien imperial court hat",

    storyEyebrow: "SOURCE OF INSPIRATION",
    storyTitle:
      "Preserving recognisable features while changing the form of expression.",
    storyDescription:
      "The product does not reproduce the original artefact in full. Key features such as the overall hat silhouette, side wings, dragon and cloud motifs, central focal point, bead chains and tassels are simplified, reorganised and adapted into a multi-layer structure suitable for a souvenir product.",

    advancedLink: "Explore in detail",

    highlights: [
      {
        number: "01",
        title: "Hat silhouette",
        description:
          "The main outline is retained to maintain a direct visual connection with the cultural source.",
      },
      {
        number: "02",
        title: "Dragon and cloud motifs",
        description:
          "Decorative elements are simplified and reorganised to remain legible at a smaller product scale.",
      },
      {
        number: "03",
        title: "Court-inspired colours",
        description:
          "Black, gold and red serve as the main visual identifiers of the design.",
      },
    ],
  },

  merch: {
    number: "04",
    eyebrow: "VTC MERCH",
    title:
      "Continue exploring the cultural product ecosystem.",
    description:
      "A dedicated space for new products, cultural stories, collaborations and other content within the VTC Merch ecosystem.",

    feature: {
      eyebrow: "MERCH ECOSYSTEM",
      title:
        "Bringing cultural material into products that are closer to everyday life.",
      description:
        "VTC Merch aims to develop products with identifiable cultural references, traceable information and supporting cultural narratives.",
      cta: "Explore VTC Merch",
    },

    cards: [
      {
        eyebrow: "01",
        title: "New products",
        description:
          "Discover cultural products and collections currently being developed within the ecosystem.",
      },
      {
        eyebrow: "02",
        title: "Cultural stories",
        description:
          "Explore the artefacts, motifs and cultural references that inspire each design.",
      },
      {
        eyebrow: "03",
        title: "Collaboration",
        description:
          "Connect museums, cultural institutions, designers and product-development partners.",
      },
    ],
  },

  documents: {
    number: "05",
    eyebrow: "VERIFICATION DOCUMENTS",
    title: "Key product records.",
    description:
      "Primary documents used to verify cultural attestation and copyright information associated with the design.",
    advancedLink: "View all advanced information",

    items: [
      {
        title: "Cultural attestation certificate",
        subtitle: sharedAttestation.organizationEn,
        meta: `Attestation No. ${sharedAttestation.code} · ${sharedAttestation.date}`,
      },
      {
        title: "Copyright registration certificate",
        subtitle: "Copyright record for the design",
        meta: `No. ${sharedCopyright.number} · ${sharedCopyright.date}`,
      },
    ],
  },

  advanced: {
    number: "06",
    eyebrow: "ADVANCED INFORMATION",
    title: "For users who want to explore further.",
    description:
      "Detailed information on the cultural source, design transformation, attestation, copyright, product journey and traceability data.",

    sections: {
      heritageSource: {
        number: "01",
        title: "Detailed cultural source",
        eyebrow: "CULTURAL REFERENCE",
        heading: "Cuu Long Thong Thien imperial court hat",
        description:
          "The primary design reference is the form and visual language associated with the Cuu Long Thong Thien imperial court hat within Nguyen-dynasty court aesthetics. The record focuses on features that remain recognisable when translated into a souvenir design.",

        meta: [
          {
            label: "Source type",
            value: "Artefact / cultural reference",
          },
          {
            label: "Period",
            value: "Nguyen Dynasty",
          },
          {
            label: "Elements used",
            value:
              "Hat silhouette, side wings, dragon, clouds, central focal point, bead chains and tassels",
          },
        ],
      },

      designTransformation: {
        number: "02",
        title: "Design transformation",
        eyebrow: "FROM CULTURAL SOURCE TO PRODUCT",
        caption:
          "Design development and reference mapping board",

        mappings: [
          {
            number: "01",
            source: "Overall hat silhouette",
            transformation:
              "Retain the main recognisable outline and scale it down to suit the product format.",
          },
          {
            number: "02",
            source: "Side wings",
            transformation:
              "Arrange symmetrically on both sides and adjust their extension to maintain visual balance.",
          },
          {
            number: "03",
            source: "Dragon imagery",
            transformation:
              "Simplify fine details while preserving key visual characteristics at a smaller scale.",
          },
          {
            number: "04",
            source: "Cloud motifs",
            transformation:
              "Reorganise as symmetrical decorative layers to add depth to the product structure.",
          },
          {
            number: "05",
            source: "Central focal point",
            transformation:
              "Use a red central element to create a clear visual focus.",
          },
          {
            number: "06",
            source: "Bead chains and tassels",
            transformation:
              "Translate them into stylised decorative elements along the lower part of the design.",
          },
        ],

        principle: {
          label: "Transformation principle",
          description:
            "Preserve the most recognisable features of the cultural source while simplifying and reorganising them to suit the product's scale, material and intended use.",
        },
      },

      attestation: {
        number: "03",
        title: "Cultural attestation",
        eyebrow: "ATTESTATION INFORMATION",
        description:
          "Attestation information is presented so users can verify the confirming organisation, status, reference number and date recorded for the product.",

        cards: [
          {
            label: "Attesting organisation",
            value: sharedAttestation.organizationEn,
          },
          {
            label: "Status",
            value: sharedAttestation.statusEn,
          },
          {
            label: "Attestation number",
            value: sharedAttestation.code,
          },
          {
            label: "Attestation date",
            value: sharedAttestation.date,
          },
        ],

        document: {
          eyebrow: "CERTIFICATE",
          title: "Cultural attestation certificate",
          description:
            "A document confirming cultural attestation information associated with the product record published on the platform.",
          certificateLabel: "CULTURAL ATTESTATION",
          certificateTitle:
            "Nguyen Imperial Court Imprint",
          certificateMeta: `No. ${sharedAttestation.code} · ${sharedAttestation.date}`,
        },
      },

      copyright: {
        number: "04",
        title: "Copyright",
        eyebrow: "REGISTRATION CERTIFICATE",
        heading: "Copyright registration certificate",
        description:
          "Copyright registration information is displayed separately from cultural attestation to clearly distinguish the two types of records.",

        meta: [
          {
            label: "Work title",
            value:
              "Nguyen Imperial Court Imprint design",
          },
          {
            label: "Type of work",
            value:
              "As stated in the registration certificate",
          },
          {
            label: "Certificate number",
            value: sharedCopyright.number,
          },
          {
            label: "Issue date",
            value: sharedCopyright.date,
          },
          {
            label: "Copyright owner",
            value:
              "As stated in the registration certificate",
          },
        ],
      },

      journey: {
        number: "05",
        title: "Product journey",

        items: [
          {
            number: "01",
            title: "Source research",
            description:
              "Identify the cultural reference and design elements suitable for product development.",
          },
          {
            number: "02",
            title: "Design development",
            description:
              "Translate recognisable cultural features into a product-oriented visual structure.",
          },
          {
            number: "03",
            title: "Design finalisation",
            description:
              "Refine layout, layers, colour treatment and technical specifications.",
          },
          {
            number: "04",
            title: "Cultural attestation",
            description:
              "Review and record the cultural attestation status associated with the product.",
          },
          {
            number: "05",
            title: "Production and review",
            description:
              "Complete the sample, verify information and prepare traceability data.",
          },
          {
            number: "06",
            title: "Trace code assignment",
            description:
              "Link each product to a traceability record that users can access.",
          },
        ],
      },

      traceData: {
        number: "06",
        title: "Traceability data",

        fields: [
          {
            label: "Trace code",
            value: sharedProduct.traceCode,
            status: "Valid",
          },
          {
            label: "Product lot",
            value: sharedProduct.lot,
          },
          {
            label: "Serial number",
            value: sharedProduct.serial,
          },
          {
            label: "Record version",
            value: sharedProduct.version,
          },
        ],

        privacy: {
          title: "Public data scope",
          description:
            "The platform only displays information required for traceability, verification and product storytelling. Internal information outside the public scope is not displayed.",
        },
      },
    },
  },

  footer: {
    platformTitle: "Traceability Platform",
    platformSubtitle: "Cultural Products",

    navTitle: "Contents",

    operatorLabel: "Platform operated by",
    operatorName: "VTC",
    operatorDescription:
      "Vietnam Multimedia Corporation.",

    backToTop: "Back to top",

    copyright:
      "© 2026 VTC. Information on this platform is provided for product traceability and record verification purposes.",
  },
};

/* =========================================================
   EXPORTS
========================================================= */

export const stt01Content: Record<
  Locale,
  ProductContent
> = {
  vi,
  en,
};

export function getStt01Content(
  locale: Locale
): ProductContent {
  return stt01Content[locale];
}
