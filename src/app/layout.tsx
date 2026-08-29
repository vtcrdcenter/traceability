import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Dấu Ấn Thượng Triều Nguyễn", description: "Hồ sơ truy xuất sản phẩm văn hóa STT-01" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
