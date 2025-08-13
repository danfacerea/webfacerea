import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: { params: { locale: Locale } }): Promise<Metadata> {
  const isRo = params.locale === "ro";
  return {
    title: isRo
      ? "ÎNVIEREA MORȚILOR – Citește online"
      : "THE RESURRECTION OF THE DEAD – Read online",
    description: isRo
      ? "Citește online cartea „ÎNVIEREA MORȚILOR ÎNTR-O NOUĂ CREAȚIE”."
      : "Read online the book “THE RESURRECTION OF THE DEAD IN A NEW CREATION”.",
    openGraph: {
      title: isRo
        ? "ÎNVIEREA MORȚILOR – Citește online"
        : "THE RESURRECTION OF THE DEAD – Read online",
      description: isRo
        ? "Citește online cartea „ÎNVIEREA MORȚILOR ÎNTR-O NOUĂ CREAȚIE”."
        : "Read online the book “THE RESURRECTION OF THE DEAD IN A NEW CREATION”.",
      url: isRo
        ? "https://facerea.ro/ro/read-resurrection-ro"
        : "https://facerea.ro/en/read-resurrection-ro",
      siteName: "facerea.ro",
      type: "article",
      locale: isRo ? "ro_RO" : "en_US",
    },
  };
}

export default function ReadResurrectionRoPage({
  params,
}: { params: { locale: Locale } }) {
  const isRo = params.locale === "ro";
  const file = isRo ? "/download/invierea.pdf" : "/download/resurrection.pdf";

  // viewer local (ai /public/pdfjs/web & /public/pdfjs/build)
  const viewer = `/pdfjs/web/viewer.html?file=${encodeURIComponent(file)}#zoom=page-fit`;

  return (
    <div className="flex flex-col h-[100dvh]">
      {/* Header cu titlu și acțiuni */}
      <header className="w-full px-4 py-3 border-b bg-white flex items-center justify-between">
        <div className="font-semibold text-lg">
          {isRo
            ? "ÎNVIEREA MORȚILOR – Lectură online"
            : "THE RESURRECTION OF THE DEAD – Read online"}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/${params.locale}`}
            className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
          >
            {isRo ? "Înapoi" : "Back"}
          </Link>
          <a
            href={file}
            download
            className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
          >
            {isRo ? "Descarcă PDF" : "Download PDF"}
          </a>
        </div>
      </header>

      {/* Viewer PDF.js în iframe */}
      <div className="flex-1">
        <iframe
          title="PDF Viewer"
          src={viewer}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </div>
  );
}
