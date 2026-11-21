import Link from "next/link";
import type { Einstieg, EinstiegInfo } from "@/data/questions";

/* Eine Akzentfarbe, sonst neutral. */
export const AKZENT = "#0076bd";
export const AKZENT_HELL = "#e6f2fa";
export const LINIE = "#e2e5e9";
export const GEDAEMPFT = "#5c6168";
export const FLAECHE = "#f4f6f8";

/** Marken und Filter zum Antwortanfang sind bewusst neutral gefärbt: Sie zitieren nur
 *  die ersten Worte einer Antwort und sagen nichts über die rechtlichen Voraussetzungen. */
export const MARKE = { bg: "#f1f3f5", fg: "#3a3e44" };

/** Die vier Gruppen des Filters «Antwortanfang». */
export const EINSTIEG_GRUPPEN: {
  gruppe: Einstieg;
  titel: string;
  beginnt: string;
}[] = [
  { gruppe: "ja", titel: "«Ja» / «Zulässig» …", beginnt: "«Ja», «Zulässig» oder «Grundsätzlich ja»" },
  { gruppe: "moeglich", titel: "«Möglich unter» …", beginnt: "«Möglich unter»" },
  {
    gruppe: "nein",
    titel: "«Nein» / «Nicht zulässig» …",
    beginnt: "«Nein», «Nicht zulässig» oder «Grundsätzlich nein»",
  },
  { gruppe: "lesen", titel: "Anderer Anfang", beginnt: "anderen Worten" },
];

export function einstiegText(info: EinstiegInfo): string {
  if (info.gruppe === "lesen") return "anderer Anfang";
  return `«${info.wort} …»`;
}

export function EinstiegChip({
  info,
  vorsatz,
  betont,
}: {
  info: EinstiegInfo;
  vorsatz?: string;
  betont?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px]"
      style={{
        backgroundColor: betont ? AKZENT_HELL : MARKE.bg,
        color: betont ? AKZENT : MARKE.fg,
        fontWeight: betont ? 650 : 500,
      }}
    >
      {vorsatz && <span className="font-semibold">{vorsatz}:</span>}
      {einstiegText(info)}
    </span>
  );
}

export function Etikett({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12.5px] font-semibold uppercase tracking-[.07em]" style={{ color: GEDAEMPFT }}>
      {children}
    </p>
  );
}

export function Seitentitel({
  etikett,
  titel,
  children,
}: {
  etikett: string;
  titel: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="pb-2 pt-10">
      <Etikett>{etikett}</Etikett>
      <h1 className="mb-4 mt-2 text-[clamp(1.75rem,5vw,2.4rem)] font-bold leading-[1.15] tracking-[-.01em]">
        {titel}
      </h1>
      {children && <div className="text-[18px] leading-[1.6]">{children}</div>}
    </div>
  );
}

export function Abschnitt({
  id,
  titel,
  children,
}: {
  id?: string;
  titel: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t pb-2 pt-8" style={{ borderColor: LINIE }}>
      <h2 className="mb-3 text-[clamp(1.25rem,3.4vw,1.55rem)] font-bold leading-tight">{titel}</h2>
      <div className="space-y-3.5 text-[16.5px] leading-[1.6]">{children}</div>
    </section>
  );
}

export function Box({
  etikett,
  betont,
  children,
}: {
  etikett: string;
  betont?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[10px] p-4"
      style={
        betont
          ? { backgroundColor: AKZENT_HELL, borderLeft: `4px solid ${AKZENT}` }
          : { backgroundColor: FLAECHE, border: `1px solid ${LINIE}` }
      }
    >
      <Etikett>{etikett}</Etikett>
      <div className="mt-1.5 space-y-2 text-[16px] leading-[1.55]">{children}</div>
    </div>
  );
}

export function WeiterLink({
  href,
  children,
  hell,
}: {
  href: string;
  children: React.ReactNode;
  hell?: boolean;
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-full border px-4 py-2 text-[15.5px] font-semibold"
      style={
        hell
          ? { borderColor: LINIE, color: AKZENT, backgroundColor: "#fff" }
          : { borderColor: AKZENT, color: "#fff", backgroundColor: AKZENT }
      }
    >
      {children}
    </Link>
  );
}
