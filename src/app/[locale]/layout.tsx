'use client';

import "./globals.css";
import { Locale } from "@/i18n";
import { I18nProviderClient } from "@/locales/client";
import { Lora } from "next/font/google";
import NavBar from "@/app/_components/NavBar";
import { useEffect } from "react";
import Head from 'next/head';
import Script from 'next/script';

const font = Lora({ subsets: ["latin"] });
const TRACKING_ID = "G-YRVLSBHNZ5"; // Replace with your tracking ID

const Layout = ({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) => {
  // Metadata for English and Romanian
  const metadata = {
    en: {
      title: "The Creation from Genesis to Revelation",
      description: "The Creation from Genesis to Revelation explained in detail",
      keywords: "Creation, Genesis, Revelation, Salvation, Scripture, Bible, faith, christian, world",
      ogTitle: "The Creation",
      ogDescription: "The Creation book",
      ogUrl: "https://facerea.ro",
      ogImage: "https://facerea.ro/public/imgen/1.jpg"
    },
    ro: {
      title: "Creația de la Geneza la Apocalipsa",
      description: "Creația de la Geneza la Apocalipsa explicată în detaliu",
      keywords: "Creația, Geneza, Apocalipsa, mântuire, scriptura, biblia, credință, creștin, lume",
      ogTitle: "Facerea",
      ogDescription: "Cartea Facerea",
      ogUrl: "https://facerea.ro",
      ogImage: "https://facerea.ro/public/imgro/1.jpg"
    }
  };

  const currentMetadata = metadata[params.locale] || metadata.en;

  return (
    <html lang={params.locale}>
      <Head>
        <title>{currentMetadata.title}</title>
        <meta name="description" content={currentMetadata.description} />
        <meta property="og:title" content={currentMetadata.ogTitle} />
        <meta property="og:description" content={currentMetadata.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentMetadata.ogUrl} />
        <meta property="og:image" content={currentMetadata.ogImage} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={currentMetadata.ogUrl} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${font.className} min-h-screen flex flex-col`}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${TRACKING_ID}');
          `}
        </Script>
        <I18nProviderClient locale={params.locale}>
          <NavBar />
          {children}
        </I18nProviderClient>
      </body>
    </html>
  );
};

export default Layout;
