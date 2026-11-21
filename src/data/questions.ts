// Die Texte in katalog.json stammen zeichengenau aus dem Excel «Fragekatalog Sek II».
// Sie werden NICHT von Hand gepflegt, sondern mit `python scripts/katalog.py` erzeugt
// und mit `python scripts/katalog.py --check` gegen das Excel abgeglichen.
// Diese Datei fügt keinen Inhalt hinzu: keine Kurzfassungen, keine Ampel, keine Bewertung.
import katalog from "./katalog.json";

export interface Frage {
  nr: number;
  /** Zeile im Excel */
  zeile: number;
  /** Spalte B «Praxisnahe Formulierung (LP)» */
  praxisfrage: string;
  /** Spalte C «Juristische Formulierung»; im Excel teils leer */
  juristischeFormulierung: string | null;
  /** Spalte D «Themenkategorie»; im Excel bei Frage 14 leer */
  themenkategorie: string | null;
  /** Spalte E «Antwort», vollständig */
  antwort: string;
}

export interface Modell {
  abkuerzung: string;
  bezeichnung: string;
  beschreibung: string;
}

export const QUELLE = katalog.quelle;
/** Datum (JJJJ-MM-TT), an dem die Daten zuletzt aus dem Excel erzeugt wurden. */
export const ABGEGLICHEN_AM: string = katalog.abgeglichenAm;

export function datumLang(iso: string): string {
  const monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const [jahr, monat, tag] = iso.split("-").map(Number);
  return `${tag}. ${monate[monat - 1]} ${jahr}`;
}
export const THEMENKATEGORIEN: string[] = katalog.themenkategorien;
export const MODELLE: Modell[] = katalog.modelle;
export const fragen: Frage[] = katalog.fragen;

/** Farben und Symbole sind reine Gestaltung; die Namen kommen aus dem Excel. */
export const KATEGORIE_FARBEN: Record<string, string> = {
  "Unterrichtsmaterialien & Urheberrecht": "#3B82F6",
  "Schüler:innendaten & Datenschutz": "#10B981",
  "Leistungsbewertung & Prüfungen": "#F59E0B",
  "Kommunikation & Interaktion mit KI": "#8B5CF6",
  "Technische Infrastruktur & Verantwortlichkeiten": "#EF4444",
};
export const FARBE_OHNE_KATEGORIE = "#94a3b8";

export type Modelltyp = "OKI" | "GKImW" | "GKIoW";
export const MODELLTYPEN: Modelltyp[] = ["OKI", "GKImW", "GKIoW"];

/** Zeilen der Antwort, die im Excel selbst mit «OKI:», «GKImW:» oder «GKIoW:» beginnen. */
export const MODELL_ZEILE = /^\s*(OKI|GKImW|GKIoW)\s*:/;

/**
 * Fragen zur Umsetzung: Die Praxisfrage beginnt mit «Darf», «Dürfen» oder «Kann».
 * Alle anderen (Haftung, Rechte am Ergebnis, Pflichten …) sind weitere Rechtsfragen.
 */
export function istUmsetzungsfrage(frage: Frage): boolean {
  return /^(Darf|Dürfen|Kann) /.test(frage.praxisfrage);
}

/**
 * Filter «Antwortanfang»: sortiert nach den ERSTEN WORTEN der Antwort bzw. der
 * Modell-Zeile – rein mechanisch, ohne eigene rechtliche Einstufung. Alles, was nicht
 * wörtlich so beginnt, landet unter «lesen».
 */
export type Einstieg = "ja" | "moeglich" | "nein" | "lesen";
export interface EinstiegInfo {
  gruppe: Einstieg;
  /** Die wörtlichen Anfangsworte, z. B. «Nicht zulässig»; leer bei «lesen». */
  wort: string;
}

const ANFAENGE: [Einstieg, RegExp][] = [
  ["nein", /^(Nein|Nicht zulässig|Grundsätzlich nein)(?![\wäöü])/i],
  ["ja", /^(Ja|Zulässig|Grundsätzlich ja)(?![\wäöü])/i],
  ["moeglich", /^(Möglich unter)(?![\wäöü])/i],
];

function einstieg(text: string): EinstiegInfo {
  const t = text.trim();
  for (const [gruppe, muster] of ANFAENGE) {
    const treffer = t.match(muster);
    if (treffer) return { gruppe, wort: treffer[1] };
  }
  return { gruppe: "lesen", wort: "" };
}

export type Umsetzbarkeit =
  | { art: "proModell"; proModell: Record<Modelltyp, EinstiegInfo> }
  | { art: "gesamt"; gesamt: EinstiegInfo };

/** Nur für Fragen zur Umsetzung; sonst null. */
export function umsetzbarkeit(frage: Frage): Umsetzbarkeit | null {
  if (!istUmsetzungsfrage(frage)) return null;
  const proModell: Partial<Record<Modelltyp, EinstiegInfo>> = {};
  for (const zeile of frage.antwort.split("\n")) {
    const kopf = zeile.match(MODELL_ZEILE);
    if (kopf) proModell[kopf[1] as Modelltyp] = einstieg(zeile.slice(kopf[0].length));
  }
  if (MODELLTYPEN.every((m) => proModell[m])) {
    return { art: "proModell", proModell: proModell as Record<Modelltyp, EinstiegInfo> };
  }
  return { art: "gesamt", gesamt: einstieg(frage.antwort) };
}

/** Nummern anderer Fragen, auf die der Antworttext ausdrücklich verweist («Frage 32»). */
export function erwaehnteFragen(frage: Frage): number[] {
  const nummern: number[] = [];
  for (const treffer of frage.antwort.matchAll(/Fragen?\s+([\d,\s]+(?:und\s+\d+)?)/gi)) {
    for (const zahl of treffer[1].matchAll(/\d+/g)) {
      const n = parseInt(zahl[0], 10);
      if (n >= 1 && n <= fragen.length && n !== frage.nr && !nummern.includes(n)) {
        nummern.push(n);
      }
    }
  }
  return nummern;
}
