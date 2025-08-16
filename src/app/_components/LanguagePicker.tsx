/* eslint-disable @next/next/no-img-element */
"use client";

import { useChangeLocale, useCurrentLocale, useScopedI18n } from "@/locales/client";
import { Menu } from "@headlessui/react";

const langs = {
  en: {
    flag: "/en.svg",
    key: "english",
  },
  ro: {
    flag: "/ro.svg",
    key: "romanian",
  },
} as const;

interface LanguagePickerProps {
  currentLanguage: keyof typeof langs;
  className?: string;
}

export const LanguagePicker = (props: LanguagePickerProps) => {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const t = useScopedI18n("Navbar");

  const setLocale = (code: keyof typeof langs) => {
    // 1) schimbă limba în aplicație (next-international)
    changeLocale(code);
    // 2) persistă preferința utilizatorului ca să nu mai fie suprascrisă la prima vizită
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  };

  return (
    <>
      {/* Desktop */}
      <Menu as="div" className={"relative hidden md:inline-block text-left " + (props.className ?? "")}>
        <Menu.Button
          as="button"
          aria-label={t("language")}
          className="flex gap-2 items-center rounded-md p-2 w-full text-gray-400 bg-gray-700/50 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <img alt={langs[currentLocale].key} src={langs[currentLocale].flag} width="20" height="20" />
          {t("language")}
        </Menu.Button>
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-gray-900 flex flex-col gap-2 p-2">
          {Object.entries(langs).map(([code, lang]) => (
            <Menu.Item
              as="button"
              onClick={() => setLocale(code as keyof typeof langs)}
              key={code}
              className="flex-1 flex gap-2 items-center rounded-md px-2 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <img alt={lang.key} src={lang.flag} width="20" height="20" />
              {t(lang.key)}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>

      {/* Mobile */}
      <div className="flex gap-2 md:hidden">
        {Object.entries(langs).map(([code, lang]) => (
          <button
            onClick={() => setLocale(code as keyof typeof langs)}
            key={code}
            className={`flex-1 text-center md:text-left flex gap-2 items-center justify-center rounded-md px-2 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${
              currentLocale === code ? "bg-gray-700" : ""
            }`}
            aria-pressed={currentLocale === code}
          >
            <img alt={lang.key} src={lang.flag} width="20" height="20" />
            {t(lang.key)}
          </button>
        ))}
      </div>
    </>
  );
};
