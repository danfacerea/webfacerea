import { Metadata } from "next";
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const currentLocale = getCurrentLocale();
  const metadataBase = new URL("https://facerea.ro");
  if (currentLocale === "ro") {
    return {
      metadataBase,
      title: "CREAȚIA – DE LA GENEZA LA APOCALIPSA",
      description: "Citește CREAȚIA, o carte care explorează povestea de la Geneza la Apocalipsa. Descarcă PDF-ul sau citește online.",
      openGraph: {
        title: "CREAȚIA – DE LA GENEZA LA APOCALIPSA",
        description: "Citește CREAȚIA, o carte care explorează povestea de la Geneza la Apocalipsa. Descarcă PDF-ul sau citește online.",
        url: "https://facerea.ro",
        siteName: "CREAȚIA",
        images: [
          {
            url: "/banner_ro.jpg",
            width: 1200,
            height: 630,
            alt: "CREAȚIA – DE LA GENEZA LA APOCALIPSA",
          },
        ],
        locale: "ro_RO",
        type: "website",
      },
    };
  }
  return {
    metadataBase,
    title: "THE CREATION – FROM GENESIS TO REVELATION",
    description: "Read THE CREATION, a book exploring the story from Genesis to Revelation. Download the PDF or read online.",
    openGraph: {
      title: "THE CREATION – FROM GENESIS TO REVELATION",
      description: "Read THE CREATION, a book exploring the story from Genesis to Revelation. Download the PDF or read online.",
      url: "https://facerea.ro",
      siteName: "THE CREATION",
      images: [
        {
          url: "/banner_en.jpg",
          width: 1200,
          height: 630,
          alt: "THE CREATION – FROM GENESIS TO REVELATION",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

/* eslint-disable @next/next/no-img-element */
const Page = async () => {
  const currentLocale = getCurrentLocale();
  const t = await getScopedI18n("Home");

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <img
          alt="Banner"
          className="w-full h-auto"
          src={currentLocale === "en" ? "/banner_en.jpg" : "/banner_ro.jpg"}
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
          <span className="text-4xl font-bold">{t("title")}</span>
          <span className="text-2xl font-medium">{t("subtitle")}</span>
          <Link
            href="/read-book"
            className="text-2xl rounded-2xl p-5 border-2 border-slate-500 bg-slate-300 hover:bg-slate-200"
          >
          {t("read")}
        </Link>
        <a
          href={currentLocale === "ro" ? "/DownloadRomanian/Facerea.pdf" : "/DownloadEnglish/TheCreation.pdf"}
          download
          className="text-blue-600 underline text-lg hover:text-blue-800 mt-2"
        >
          {t("download")}
        </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
