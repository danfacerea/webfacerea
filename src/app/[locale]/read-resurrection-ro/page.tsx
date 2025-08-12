/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ÎNVIEREA MORȚILOR – Lectură online",
  description: "Citește online cartea „ÎNVIEREA MORȚILOR ÎNTR-O NOUĂ CREAȚIE”.",
  openGraph: {
    title: "ÎNVIEREA MORȚILOR – Lectură online",
    description: "Citește online cartea „ÎNVIEREA MORȚILOR ÎNTR-O NOUĂ CREAȚIE”.",
    url: "https://facerea.ro/read-resurrection-ro",
    siteName: "facerea.ro",
    type: "article",
  },
};

export default function ReadResurrectionPage() {
  const file = "/download/invierea.pdf";
  // PDF.js viewer pe CDN + zoom page-fit pentru UX OK
  const viewer = `https://unpkg.com/pdfjs-dist@3.11.174/web/viewer.html?file=${encodeURIComponent(file)}#zoom=page-fit`;

  //const viewer = `https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/web/viewer.html?file=${encodeURIComponent(
  //  file
  //)}#zoom=page-fit`;

  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="w-full px-4 py-3 border-b bg-white flex items-center justify-between">
        <div className="font-semibold text-lg">
          ÎNVIEREA MORȚILOR – Lectură online
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
          >
            Înapoi
          </Link>
          <a
            href={file}
            download
            className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
          >
            Descarcă PDF
          </a>
        </div>
      </header>

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
