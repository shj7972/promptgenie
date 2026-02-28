import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import PartnerBanners from "@/components/PartnerBanners";

export const metadata: Metadata = {
  metadataBase: new URL("https://promptgenie.kr"),
  title: {
    default: "프롬프트지니 | ChatGPT, Claude, Gemini AI 프롬프트 모음 & 생성기",
    template: "%s | 프롬프트지니",
  },
  description: "ChatGPT, Claude, Gemini용 검증된 AI 프롬프트 90+개를 무료로 탐색하고, 맞춤 프롬프트를 생성하세요. 프롬프트 엔지니어링 가이드와 실전 활용법까지 한곳에서.",
  keywords: ["프롬프트", "프롬프트 엔지니어링", "ChatGPT 프롬프트", "Claude 프롬프트", "Gemini 프롬프트", "AI 프롬프트", "프롬프트 모음", "프롬프트 생성기", "AI 활용법", "프롬프트지니"],
  openGraph: {
    title: '프롬프트지니 | ChatGPT, Claude, Gemini AI 프롬프트 모음 & 생성기',
    description: 'ChatGPT, Claude, Gemini용 검증된 AI 프롬프트 90+개를 무료로 탐색하고, 맞춤 프롬프트를 생성하세요.',
    url: 'https://promptgenie.kr',
    siteName: '프롬프트지니 (PromptGenie)',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '프롬프트지니 | AI 프롬프트 모음 & 생성기',
    description: 'ChatGPT, Claude, Gemini용 검증된 AI 프롬프트를 무료로 탐색하고 생성하세요.',
  },
  alternates: {
    canonical: 'https://promptgenie.kr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      <head>
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '72px' }}>
          {children}
        </main>
        <PartnerBanners />
        <Footer />

        {/* AdSense - lazyOnload for better LCP */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2947913248390883"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J9SNWK1HKH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-J9SNWK1HKH');
          `}
        </Script>
      </body>
    </html>
  );
}
