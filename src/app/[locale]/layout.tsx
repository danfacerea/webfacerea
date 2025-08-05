import "./globals.css";
import { Locale } from "@/i18n";
import { I18nProviderClient } from "@/locales/client";
import { Lora } from "next/font/google";
import NavBar from "@/app/_components/NavBar";
import Script from "next/script";

const font = Lora({ subsets: ["latin"] });
const TRACKING_ID = "G-79F3TZNR11";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={params.locale}>
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
}
