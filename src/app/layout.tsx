import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vtcrdcenter.github.io/traceability/"),

  title: {
    default: "Nền tảng truy xuất · VTC",
    template: "%s · Nền tảng truy xuất VTC",
  },

  description:
    "Nền tảng truy xuất sản phẩm văn hóa, cung cấp thông tin sản phẩm, nguồn văn hóa, quá trình chuyển hóa thiết kế, bảo chứng, quyền tác giả và tài liệu xác thực.",

  keywords: [
    "VTC",
    "nền tảng truy xuất",
    "truy xuất sản phẩm",
    "sản phẩm văn hóa",
    "Dấu Ấn Thượng Triều Nguyễn",
    "STT-01",
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

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://vtcrdcenter.github.io/traceability/",
    siteName: "Nền tảng truy xuất VTC",
    title: "Nền tảng truy xuất sản phẩm văn hóa · VTC",
    description:
      "Tra cứu thông tin sản phẩm, nguồn văn hóa, bảo chứng, quyền tác giả và tài liệu xác thực.",
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
