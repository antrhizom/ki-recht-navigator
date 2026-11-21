import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Register from "@/components/Register";
import { ABGEGLICHEN_AM, datumLang } from "@/data/questions";

export const metadata: Metadata = {
  title: "KI-Recht Navigator | Welche Usecases darf ich mit KI umsetzen?",
  description:
    "Die rechtliche Abklärung zu 71 Usecases aus dem Schulalltag zum KI-Einsatz an Schulen im Kanton Zürich, im Wortlaut des geprüften Fragekatalogs Sek II. Herausgegeben vom DLH Digital Learning Hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-white text-[#1b1c1e] antialiased">
        <Register />
        <main className="mx-auto max-w-[860px] px-4 pb-16">{children}</main>
        <footer className="mx-auto max-w-[860px] px-4 pb-10">
          <div className="border-t border-[#e2e5e9] pt-6 text-[14px] leading-[1.6] text-[#5c6168]">
            <p>
              Herausgeber: DLH Digital Learning Hub. Quelle: Fragekatalog Sek II (FINAL), geprüft
              durch den Rechtsdienst MBA. Stand: {datumLang(ABGEGLICHEN_AM)}.
            </p>
            <p className="mt-1">
              Diese Informationen stellen keine Rechtsberatung dar.{" "}
              <Link href="/impressum" className="underline">
                Impressum und Entstehung
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
