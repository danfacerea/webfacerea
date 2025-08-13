import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "THE RESURRECTION OF THE DEAD – Read online",
  description: "Read online the book “THE RESURRECTION OF THE DEAD IN A NEW CREATION”.",
  openGraph: {
    title: "THE RESURRECTION OF THE DEAD – Read online",
    description:
      "Read online the book “THE RESURRECTION OF THE DEAD IN A NEW CREATION”.",
    url: "https://facerea.ro/read-resurrection-en",
    siteName: "facerea.ro",
    type: "article",
  },
};

export default function ReadResurrectionEnPage() {
  const file = "/download/resurrection.pdf";

  // Varianta pe CDN (merge imediat, necesită permisiune CSP pentru unpkg.com)
  //const viewer = `https://unpkg.com/pdfjs-dist@3.11.174/web/viewer.html?file=${encodeURIComponent(
  //  file
  //)}#zoom=page-fit`;

  // Dacă vrei local: instalează pdfjs-dist și copiază /web și /build în /public/pdfjs
  // apoi comentează linia de mai sus și decomentează aceasta:
   const viewer = `/pdfjs/web/viewer.html?file=${encodeURIComponent(file)}#zoom=page-fit`;

  return (
    <div className="flex flex-col h-[100dvh]">
      {/* Header cu titlu și acțiuni */}
      <header className="w-full px-4 py-3 border-b bg-white flex items-center justify-between">
        <div className="font-semibold text-lg">
          THE RESURRECTION OF THE DEAD – Read online
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
          >
            Back
          </Link>
          <a
            href={file}
            download
            className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
          >
            Download PDF
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
