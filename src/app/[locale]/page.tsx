/* eslint-disable @next/next/no-img-element */
import bannerEn from "@/assets/banner_en.jpg";
import bannerRo from "@/assets/banner_ro.jpg";
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import Link from "next/link";

const Page = async () => {
  const currentLocale = getCurrentLocale();
  const t = await getScopedI18n("Home");

  return (
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
          <span className="text-4xl font-bold">{t("title")}</span>
          <span className="text-2xl font-medium">{t("subtitle")}</span>
          <Link
            href="/read-book"
            className="text-2xl rounded-2xl p-5 border-2 border-slate-400 bg-slate-300 hover:bg-slate-200"
          >
            {t("read")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
