import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://vtcrdcenter.github.io/traceability/"
  ),

  title: {
    default: "Nền tảng truy xuất · VTC",
    template: "%s · Nền tảng truy xuất VTC",
  },

  description:
    "Nền tảng truy xuất sản phẩm văn hóa của VTC, cung cấp thông tin xác thực, nguồn văn hóa, bảo chứng, quyền tác giả và kết nối với hệ sinh thái VTC Merch.",

  keywords: [
    "VTC",
    "nền tảng truy xuất",
    "truy xuất sản phẩm",
    "sản phẩm văn hóa",
    "VTC Merch",
    "Dấu Ấn Thượng Triều Nguyễn",
    "bảo chứng văn hóa",
    "quyền tác giả",
  ],

  authors: [
    {
      name: "Tổng công ty Truyền thông Đa phương tiện (VTC)",
    },
  ],

  creator: "VTC",
  publisher: "VTC",

  applicationName: "Nền tảng truy xuất VTC",

  openGraph: {
    type: "website",
    locale: "vi_VN",

    url: "https://vtcrdcenter.github.io/traceability/",

    siteName: "Nền tảng truy xuất VTC",

    title: "Nền tảng truy xuất sản phẩm văn hóa · VTC",

    description:
      "Tra cứu thông tin xác thực, câu chuyện văn hóa, bảo chứng, quyền tác giả và khám phá hệ sinh thái VTC Merch.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  themeColor: "#671d22",

  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
