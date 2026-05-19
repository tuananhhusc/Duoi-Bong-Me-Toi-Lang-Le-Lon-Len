import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tuananhhusc.github.io/Duoi-Bong-Me-Toi-Lang-Le-Lon-Len"),
  title: "Dưới bóng Mẹ, tôi lặng lẽ lớn lên | Báo cáo Nghiên cứu Học thuật Chuyên sâu",
  description:
    "Phân tích hệ thống và đa chiều về tình mẫu tử cùng quá trình trưởng thành: Từ tâm lý học thuyết gắn bó, biểu tượng mẫu tính trong văn hóa nghệ thuật Á Đông, đến giải cấu trúc nữ quyền Phương Tây và xã hội học kỷ nguyên số.",
  keywords: [
    "tình mẫu tử",
    "sự trưởng thành",
    "thuyết gắn bó",
    "tâm lý học phát triển",
    "bao bọc quá mức",
    "văn chương nữ quyền",
    "văn hóa Việt Nam",
    "nghiên cứu học thuật",
    "chữa lành tâm lý",
  ],
  authors: [{ name: "Báo cáo Nghiên cứu Học thuật" }],
  creator: "Nhóm Nghiên cứu Khoa học Hành vi & Văn hóa",
  publisher: "Thư viện Học thuật Công giáo & Văn học",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Dưới bóng Mẹ, tôi lặng lẽ lớn lên - Báo cáo Nghiên cứu Chuyên sâu",
    description:
      "Phân tích học thuật đa chiều về tình mẫu tử và quá trình trưởng thành: Tâm lý học thuyết gắn bó, biểu tượng mẫu tính Á Đông, nữ quyền Phương Tây và gia đình thời số.",
    url: "https://tuananhhusc.github.io/Duoi-Bong-Me-Toi-Lang-Le-Lon-Len/",
    siteName: "Nghiên cứu Học thuật về Tình mẫu tử",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dưới bóng Mẹ, tôi lặng lẽ lớn lên - Báo cáo Nghiên cứu Học thuật",
      },
    ],
    type: "article",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dưới bóng Mẹ, tôi lặng lẽ lớn lên - Báo cáo Nghiên cứu Học thuật",
    description:
      "Phân tích học thuật đa chiều về tình mẫu tử và quá trình trưởng thành: Tâm lý học phát triển, biểu tượng nghệ thuật và biến thiên xã hội thời số.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tuananhhusc.github.io/Duoi-Bong-Me-Toi-Lang-Le-Lon-Len/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfairDisplay.variable} ${lora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
