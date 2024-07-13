/* eslint-disable @next/next/no-img-element */
import React from 'react';  // Ensure React is imported
import bannerEn from "@/assets/banner_en.jpg";
import bannerRo from "@/assets/banner_ro.jpg";
import Link from "next/link";
import Head from 'next/head';
import { getCurrentLocale, getScopedI18n } from "@/locales/server";


const Page = () => {
	const currentLocale = getCurrentLocale();
 
  const metadata = {
    en: {
      title: "The Creation from Genesis to Revelation",
      description: "The Creation from Genesis to Revelation explained in detail",
      keywords: "Creation, Genesis, Revelation",
      ogTitle: "Open Graph Title in English",
      ogDescription: "Open Graph Description in English",
      ogUrl: "https://facerea.ro",
      ogImage: "https://yourwebsite.com/image-en.jpg"
    },
    ro: {
      title: "Creația de la Geneza la Apocalipsa",
      description: "Creația de la Geneza la Apocalipsa explicată în detaliu",
      keywords: "Creația, Geneza, Apocalipsa",
      ogTitle: "Titlul Open Graph în Română",
     ogDescription: "Descrierea Open Graph în Română",
      ogUrl: "https://facerea.ro",
      ogImage: "https://yourwebsite.com/image-ro.jpg"
    }
  };

  const currentMetadata = metadata[currentLocale];

  return (
    <>
      <Head>
        <title>{currentMetadata.title}</title>
        <meta name="description" content={currentMetadata.description} />
        <meta name="keywords" content={currentMetadata.keywords} />
        <meta property="og:title" content={currentMetadata.ogTitle} />
        <meta property="og:description" content={currentMetadata.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentMetadata.ogUrl} />
        <meta property="og:image" content={currentMetadata.ogImage} />
      </Head>

      <div className="flex flex-col">
        <div className="w-full">
          <img
            alt="Banner"
            className="w-full h-auto"
            src={currentLocale === "en" ? bannerEn.src : bannerRo.src}
          />
        </div>
        <div className="w-full px-8 md:px-4 py-6 bg-gray-300 border-y-2 border-gray-400 flex flex-col md:flex-row place-content-evenly gap-4">
          <div className="flex justify-center">
            <img
              alt="book"
              className="h-full max-h-96 w-auto"
              src={`https://facerea.ro/img${currentLocale}/Coperta.jpg`}
            />
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <span className="text-4xl font-bold">{currentLocale === 'en' ? "The Creation" : "Facerea"}</span>
            <span className="text-2xl font-medium">{currentLocale === 'en' ? "from Genesis to Revelation?" : "de la Geneza la Apocalipsa?"}</span>
            <Link
              href="/read-book"
              className="text-2xl rounded-2xl p-5 border-2 border-slate-500 bg-slate-300 hover:bg-slate-200"
            >
              {currentLocale === 'en' ? "Read More" : "Citește mai mult"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
