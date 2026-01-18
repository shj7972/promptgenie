import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://promptgenie.kr"),
  title: "PromptGenie | AI Prompt Library",
  description: "Discover, create, and share the best AI prompts for ChatGPT, Claude, and Gemini.",
  openGraph: {
    title: 'PromptGenie | AI Prompt Library',
    description: 'Discover, create, and share the best AI prompts for ChatGPT, Claude, and Gemini.',
    url: 'https://promptgenie.kr',
    siteName: 'PromptGenie',
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    other: {
      'naver-site-verification': '257cd146d1ecd07bf159e250c7eecf75a80250f9',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '72px' }}>
          {children}
        </main>
        <Footer />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2947913248390883" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
