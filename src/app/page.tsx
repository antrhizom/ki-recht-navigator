"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";
import {
  fragen,
  THEMENKATEGORIEN,
  MODELLE,
  MODELLTYPEN,
  ABGEGLICHEN_AM,
  datumLang,
  MODELL_ZEILE,
  istUmsetzungsfrage,
  umsetzbarkeit,
  erwaehnteFragen,
  type Frage,
  type Modelltyp,
  type Einstieg,
  type EinstiegInfo,
} from "@/data/questions";

/* ---------- Gestaltung: eine Akzentfarbe, sonst neutral ---------- */

const AKZENT = "#0076bd";
const AKZENT_HELL = "#e6f2fa";

const EINSTIEG_STIL: Record<Einstieg, { bg: string; fg: string }> = {
  ja: { bg: "#e5f5ec", fg: "#1a7f4b" },
  moeglich: { bg: "#fbf2e1", fg: "#8a5a00" },
  nein: { bg: "#fdecea", fg: "#b3261e" },
  lesen: { bg: "#f1f3f5", fg: "#4b5158" },
};

/** Beschriftung der vier Gruppen im Filter. */
const EINSTIEG_FILTER: { gruppe: Einstieg; titel: string; hilfe: string }[] = [
  { gruppe: "ja", titel: "«Ja» / «Zulässig»", hilfe: "Antwort beginnt mit Ja oder Zulässig" },
  { gruppe: "moeglich", titel: "«Möglich unter …»", hilfe: "Antwort beginnt mit «Möglich unter»" },
  {
    gruppe: "nein",
    titel: "«Nein» / «Nicht zulässig»",
    hilfe: "Antwort beginnt mit Nein oder Nicht zulässig",
  },
  {
    gruppe: "lesen",
    titel: "Differenziert – Wortlaut lesen",
    hilfe: "Antwort beginnt nicht mit Ja oder Nein",
  },
];

function einstiegText(info: EinstiegInfo): string {
  if (info.gruppe === "lesen") return "differenziert";
  return `«${info.wort}${info.gruppe === "moeglich" ? " …" : ""}»`;
}

function EinstiegChip({
  info,
  vorsatz,
  betont,
}: {
  info: EinstiegInfo;
  vorsatz?: string;
  betont?: boolean;
}) {
  const stil = EINSTIEG_STIL[info.gruppe];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px]"
      style={{
        backgroundColor: stil.bg,
        color: stil.fg,
        outline: betont ? `2px solid ${stil.fg}` : undefined,
        fontWeight: betont ? 650 : 500,
      }}
    >
      {vorsatz && <span className="font-semibold">{vorsatz}:</span>}
      {einstiegText(info)}
    </span>
  );
}

function Etikett({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12.5px] font-semibold uppercase tracking-[.07em] text-[#5c6168]">
      {children}
    </p>
  );
}

/* ---------- Antwort im Wortlaut ---------- */

/**
 * Zeigt die Antwort vollständig und unverändert. Zeilenumbrüche stammen aus dem Excel.
 * Zeilen, die dort mit «OKI:», «GKImW:» oder «GKIoW:» beginnen, werden nur optisch
 * abgesetzt; die Zeile des gewählten KI-Tool-Typs wird hervorgehoben.
 */
function Antwort({ text, modell }: { text: string; modell: Modelltyp | null }) {
  return (
    <div className="space-y-2.5 text-[16px] leading-[1.6] text-[#1b1c1e]">
      {text.split("\n").map((zeile, i) => {
        if (zeile.trim() === "") return null;
        const kopf = zeile.match(MODELL_ZEILE);
        if (!kopf) {
          return (
            <p key={i} className="whitespace-pre-wrap">
              {zeile}
            </p>
          );
        }
        const gewaehlt = modell !== null && kopf[1] === modell;
        return (
          <p
            key={i}
            className="whitespace-pre-wrap rounded-r-md border-l-4 py-2 pl-3 pr-2"
            style={{
              borderColor: gewaehlt ? AKZENT : "#cfd4da",
              backgroundColor: gewaehlt ? AKZENT_HELL : "#f4f6f8",
            }}
          >
            <strong style={{ color: gewaehlt ? AKZENT : undefined }}>{kopf[0]}</strong>
            {zeile.slice(kopf[0].length)}
          </p>
        );
      })}
    </div>
  );
}

/* ---------- Eine Frage ---------- */

function FrageKarte({
  frage,
  modell,
  offen,
  onToggle,
  onFrageKlick,
}: {
  frage: Frage;
  modell: Modelltyp | null;
  offen: boolean;
  onToggle: () => void;
  onFrageKlick: (nr: number) => void;
}) {
  const u = umsetzbarkeit(frage);
  const verweise = erwaehnteFragen(frage);

  return (
    <div className="rounded-[10px] border border-[#e2e5e9] bg-white">
      <button
        onClick={onToggle}
        aria-expanded={offen}
        className="flex w-full cursor-pointer items-start gap-3 p-4 text-left hover:bg-[#fafbfc] sm:p-5"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-[#5c6168]">
            Frage {frage.nr}
            {" · "}
            {frage.themenkategorie ?? <em>im Fragekatalog ohne Themenkategorie</em>}
          </p>
          <h3 className="mt-1 whitespace-pre-wrap text-[17px] font-semibold leading-snug text-[#1b1c1e]">
            {frage.praxisfrage}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {u === null && (
              <span className="rounded-full bg-[#f1f3f5] px-2.5 py-0.5 text-[13px] text-[#4b5158]">
                Weitere Rechtsfrage
              </span>
            )}
            {u?.art === "proModell" &&
              MODELLTYPEN.map((m) => (
                <EinstiegChip key={m} info={u.proModell[m]} vorsatz={m} betont={m === modell} />
              ))}
            {u?.art === "gesamt" && <EinstiegChip info={u.gesamt} vorsatz="Antwort" />}
          </div>
        </div>
        <span className="mt-1 flex-shrink-0 text-[#5c6168]">
          {offen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      {offen && (
        <div className="space-y-5 border-t border-[#e2e5e9] p-4 sm:p-5">
          {frage.juristischeFormulierung && (
            <div>
              <Etikett>Juristische Formulierung</Etikett>
              <p className="mt-1 whitespace-pre-wrap text-[15.5px] leading-[1.55] text-[#3a3e44]">
                {frage.juristischeFormulierung}
              </p>
            </div>
          )}
          <div>
            <Etikett>Antwort – Wortlaut der rechtlichen Abklärung</Etikett>
            <div className="mt-2">
              <Antwort text={frage.antwort} modell={modell} />
            </div>
          </div>
          {verweise.length > 0 && (
            <div>
              <Etikett>In der Antwort erwähnte Fragen</Etikett>
              <div className="mt-2 flex flex-wrap gap-2">
                {verweise.map((nr) => (
                  <button
                    key={nr}
                    onClick={() => onFrageKlick(nr)}
                    title={fragen.find((f) => f.nr === nr)?.praxisfrage}
                    className="cursor-pointer rounded-full border border-[#e2e5e9] px-3 py-1 text-[14px] hover:border-[#0076bd]"
                    style={{ color: AKZENT }}
                  >
                    Frage {nr}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Filter-Bausteine ---------- */

function Wahlknopf({
  aktiv,
  onClick,
  children,
  title,
}: {
  aktiv: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={aktiv}
      title={title}
      className="cursor-pointer rounded-full border px-3.5 py-1.5 text-[15px]"
      style={
        aktiv
          ? { backgroundColor: AKZENT, borderColor: AKZENT, color: "#fff", fontWeight: 600 }
          : { backgroundColor: "#fff", borderColor: "#e2e5e9", color: "#1b1c1e" }
      }
    >
      {children}
    </button>
  );
}

function FilterBlock({
  nummer,
  titel,
  hilfe,
  children,
}: {
  nummer: number;
  titel: string;
  hilfe: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[#e2e5e9] py-5 first:border-t-0 first:pt-0 last:pb-0">
      <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[#1b1c1e]">
        <span
          className="inline-grid h-[1.7em] w-[1.7em] flex-shrink-0 place-items-center rounded-full text-[13px] text-white"
          style={{ backgroundColor: AKZENT }}
        >
          {nummer}
        </span>
        {titel}
      </h3>
      <p className="mb-3 mt-1.5 text-[15px] leading-[1.55] text-[#5c6168]">{hilfe}</p>
      {children}
    </div>
  );
}

type Art = "alle" | "umsetzung" | "weitere";

/* ---------- Seite ---------- */

export default function Home() {
  const [suche, setSuche] = useState("");
  const [kategorien, setKategorien] = useState<string[]>([]);
  const [modell, setModell] = useState<Modelltyp | null>(null);
  const [einstiege, setEinstiege] = useState<Einstieg[]>([]);
  const [art, setArt] = useState<Art>("alle");
  const [offeneNr, setOffeneNr] = useState<number | null>(null);

  const umschalten = <T,>(wert: T) => (bisher: T[]) =>
    bisher.includes(wert) ? bisher.filter((x) => x !== wert) : [...bisher, wert];

  const zuruecksetzen = useCallback(() => {
    setSuche("");
    setKategorien([]);
    setModell(null);
    setEinstiege([]);
    setArt("alle");
  }, []);

  /** Gruppen einer Frage für den gewählten KI-Tool-Typ (ohne Wahl: alle drei Zeilen). */
  const gruppenVon = useCallback(
    (f: Frage): Einstieg[] => {
      const u = umsetzbarkeit(f);
      if (!u) return [];
      if (u.art === "gesamt") return [u.gesamt.gruppe];
      return modell
        ? [u.proModell[modell].gruppe]
        : MODELLTYPEN.map((m) => u.proModell[m].gruppe);
    },
    [modell]
  );

  const gefiltert = useMemo(() => {
    const begriff = suche.trim().toLowerCase();
    return fragen.filter((f) => {
      if (begriff) {
        const treffer =
          f.praxisfrage.toLowerCase().includes(begriff) ||
          (f.juristischeFormulierung ?? "").toLowerCase().includes(begriff) ||
          f.antwort.toLowerCase().includes(begriff) ||
          f.nr.toString() === begriff;
        if (!treffer) return false;
      }
      if (kategorien.length > 0 && !(f.themenkategorie && kategorien.includes(f.themenkategorie))) {
        return false;
      }
      if (art === "umsetzung" && !istUmsetzungsfrage(f)) return false;
      if (art === "weitere" && istUmsetzungsfrage(f)) return false;
      if (einstiege.length > 0 && !gruppenVon(f).some((g) => einstiege.includes(g))) return false;
      return true;
    });
  }, [suche, kategorien, art, einstiege, gruppenVon]);

  const anzahlProGruppe = useMemo(() => {
    const zaehler: Record<Einstieg, number> = { ja: 0, moeglich: 0, nein: 0, lesen: 0 };
    for (const f of fragen) for (const g of new Set(gruppenVon(f))) zaehler[g]++;
    return zaehler;
  }, [gruppenVon]);

  const anzahlUmsetzung = useMemo(() => fragen.filter(istUmsetzungsfrage).length, []);
  const filterAktiv =
    suche !== "" || kategorien.length > 0 || modell !== null || einstiege.length > 0 || art !== "alle";

  const zuFrage = useCallback(
    (nr: number) => {
      setSuche("");
      setKategorien([]);
      setEinstiege([]);
      setArt("alle");
      setOffeneNr(nr);
      setTimeout(() => {
        document
          .getElementById(`frage-${nr}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    },
    []
  );

  const waehlbar = (abk: string): abk is Modelltyp =>
    (MODELLTYPEN as string[]).includes(abk);

  return (
    <div className="min-h-screen bg-white text-[#1b1c1e]">
      <header className="border-b border-[#e2e5e9]">
        <div className="mx-auto flex max-w-[860px] items-center justify-between gap-4 px-4 py-3 text-[14.5px]">
          <span className="font-semibold">KI-Recht Navigator</span>
          <nav className="flex gap-4 text-[#5c6168]">
            <a href="#filter" className="hover:text-[#1b1c1e]">
              Filter
            </a>
            <a href="#fragen" className="hover:text-[#1b1c1e]">
              Fragen
            </a>
            <Link href="/impressum" className="hover:text-[#1b1c1e]">
              Impressum
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[860px] px-4 pb-20">
        {/* ---------- Zweck und Ziel ---------- */}
        <section className="pb-4 pt-10">
          <Etikett>DLH Digital Learning Hub · Sekundarstufe II · Kanton Zürich</Etikett>
          <h1 className="mb-4 mt-2 text-[clamp(1.85rem,5.2vw,2.6rem)] font-bold leading-[1.15] tracking-[-.01em]">
            Welche Usecases darf ich mit KI umsetzen?
          </h1>
          <p className="mb-4 text-[18.5px] leading-[1.6]">
            Darf ich ein Schulbuch in eine KI hochladen? Prüfungen mit KI korrigieren lassen?
            Meine Lernenden direkt mit ChatGPT arbeiten lassen? Zu {fragen.length} solchen Fragen
            aus dem Schulalltag liegt eine rechtliche Abklärung vor. Der DLH Digital Learning Hub
            stellt sie auf dieser Seite so einfach wie möglich dar.
          </p>

          <div className="my-6 grid gap-3.5 sm:grid-cols-2">
            <div className="rounded-[10px] border border-[#e2e5e9] bg-[#f4f6f8] p-4">
              <Etikett>Ziel dieser Seite</Etikett>
              <p className="mt-1.5 text-[16px] leading-[1.55]">
                Sie finden rasch heraus, <strong>ob Sie einen Usecase mit Ihrem KI-Tool umsetzen
                dürfen</strong> – und unter welchen Bedingungen. Dazu wählen Sie den Typ Ihres
                KI-Tools und filtern die Fragen nach Umsetzbarkeit und Thema.
              </p>
            </div>
            <div
              className="rounded-[10px] p-4"
              style={{ backgroundColor: AKZENT_HELL, borderLeft: `4px solid ${AKZENT}` }}
            >
              <Etikett>1:1-Fassung der rechtlichen Abklärung</Etikett>
              <p className="mt-1.5 text-[16px] leading-[1.55]">
                Alle Fragen und Antworten stehen im <strong>unveränderten Wortlaut</strong> des
                Fragekatalogs Sek II, geprüft durch den Rechtsdienst MBA. Es wurde nichts gekürzt,
                zusammengefasst oder umformuliert.
              </p>
            </div>
          </div>

          <p className="text-[15px] leading-[1.55] text-[#5c6168]">
            Stand: {datumLang(ABGEGLICHEN_AM)}. Die Seite ersetzt keine Rechtsberatung; massgebend
            ist immer der ganze Wortlaut einer Antwort. Wie die Seite entstanden ist, steht im{" "}
            <Link href="/impressum" className="underline" style={{ color: AKZENT }}>
              Impressum
            </Link>
            .
          </p>
        </section>

        {/* ---------- Filter ---------- */}
        <section id="filter" className="scroll-mt-4 border-t border-[#e2e5e9] pb-4 pt-10">
          <Etikett>So nutzen Sie die Seite</Etikett>
          <h2 className="mb-3 mt-1.5 text-[clamp(1.4rem,3.8vw,1.8rem)] font-bold leading-tight">
            In vier Schritten zur Antwort
          </h2>
          <p className="mb-6 text-[17px] leading-[1.6]">
            Jeder Schritt grenzt die {fragen.length} Fragen weiter ein. Sie können Schritte
            auslassen oder kombinieren. Die Filter verändern keinen Text – sie bestimmen nur,
            welche Fragen angezeigt werden.
          </p>

          <div className="rounded-[10px] border border-[#e2e5e9] p-4 sm:p-6">
            <FilterBlock
              nummer={1}
              titel="Typ Ihres KI-Tools wählen"
              hilfe={
                <>
                  Viele Antworten hängen davon ab, was mit den eingegebenen Daten geschieht. Die
                  Abklärung unterscheidet dafür drei Typen. Ihre Wahl hebt in jeder Antwort die
                  passende Zeile hervor und gilt für den Filter «Umsetzbarkeit» in Schritt 2.
                </>
              }
            >
              <div className="flex flex-wrap gap-2">
                {MODELLTYPEN.map((m) => (
                  <Wahlknopf
                    key={m}
                    aktiv={modell === m}
                    onClick={() => setModell(modell === m ? null : m)}
                  >
                    {m} –{" "}
                    {MODELLE.find((x) => x.abkuerzung.trim() === m)?.bezeichnung ?? ""}
                  </Wahlknopf>
                ))}
              </div>
              <details className="mt-4 rounded-[10px] border border-[#e2e5e9]" open>
                <summary
                  className="cursor-pointer px-4 py-2.5 text-[15.5px] font-semibold"
                  style={{ color: AKZENT }}
                >
                  Was bedeuten die Typen? (Wortlaut der Abklärung)
                </summary>
                <div className="grid gap-3 border-t border-[#e2e5e9] p-4 sm:grid-cols-2">
                  {MODELLE.map((m) => {
                    const abk = m.abkuerzung.trim();
                    const gewaehlt = abk === modell;
                    return (
                      <div
                        key={abk}
                        className="rounded-[10px] border p-3.5"
                        style={{
                          borderColor: gewaehlt ? AKZENT : "#e2e5e9",
                          backgroundColor: gewaehlt ? AKZENT_HELL : "#f4f6f8",
                        }}
                      >
                        <p className="text-[16px] font-semibold">
                          {m.abkuerzung}
                          <span className="font-normal text-[#5c6168]"> · {m.bezeichnung}</span>
                        </p>
                        <p className="mt-1.5 whitespace-pre-line text-[14.5px] leading-[1.55] text-[#3a3e44]">
                          {m.beschreibung}
                        </p>
                        {!waehlbar(abk) && (
                          <p className="mt-2 text-[13.5px] text-[#5c6168]">
                            Oberbegriff für GKImW und GKIoW; nicht einzeln wählbar.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </details>
            </FilterBlock>

            <FilterBlock
              nummer={2}
              titel="Nach Umsetzbarkeit filtern"
              hilfe={
                <>
                  {anzahlUmsetzung} der {fragen.length} Fragen fragen direkt nach der Umsetzung
                  («Darf ich …?», «Kann ich …?»). Die Seite ordnet sie danach, <strong>mit welchen
                  Worten die Antwort beginnt</strong>. Das ist eine Lesehilfe und keine eigene
                  rechtliche Einstufung: Auch ein «Ja» ist oft an Bedingungen geknüpft, und viele
                  Antworten sind differenziert. Lesen Sie deshalb immer den ganzen Wortlaut.
                  {modell === null && (
                    <>
                      {" "}
                      Ohne Wahl in Schritt 1 zählt eine Frage, sobald die Antwort für einen der
                      drei Typen so beginnt.
                    </>
                  )}
                </>
              }
            >
              <div className="flex flex-wrap gap-2">
                {EINSTIEG_FILTER.map(({ gruppe, titel, hilfe }) => {
                  const aktiv = einstiege.includes(gruppe);
                  const stil = EINSTIEG_STIL[gruppe];
                  return (
                    <button
                      key={gruppe}
                      onClick={() => setEinstiege(umschalten(gruppe))}
                      aria-pressed={aktiv}
                      title={hilfe}
                      className="cursor-pointer rounded-full border px-3.5 py-1.5 text-[15px]"
                      style={{
                        backgroundColor: aktiv ? stil.fg : stil.bg,
                        borderColor: aktiv ? stil.fg : "transparent",
                        color: aktiv ? "#fff" : stil.fg,
                        fontWeight: aktiv ? 600 : 500,
                      }}
                    >
                      {titel} <span className="opacity-80">({anzahlProGruppe[gruppe]})</span>
                    </button>
                  );
                })}
              </div>
              <p className="mb-2 mt-4 text-[15px] text-[#5c6168]">Art der Frage:</p>
              <div className="flex flex-wrap gap-2">
                <Wahlknopf aktiv={art === "alle"} onClick={() => setArt("alle")}>
                  Alle ({fragen.length})
                </Wahlknopf>
                <Wahlknopf
                  aktiv={art === "umsetzung"}
                  onClick={() => setArt("umsetzung")}
                  title="Praxisfrage beginnt mit «Darf», «Dürfen» oder «Kann»"
                >
                  Fragen zur Umsetzung ({anzahlUmsetzung})
                </Wahlknopf>
                <Wahlknopf
                  aktiv={art === "weitere"}
                  onClick={() => setArt("weitere")}
                  title="Zum Beispiel Haftung, Rechte am Ergebnis, Informationspflichten"
                >
                  Weitere Rechtsfragen ({fragen.length - anzahlUmsetzung})
                </Wahlknopf>
              </div>
            </FilterBlock>

            <FilterBlock
              nummer={3}
              titel="Thema eingrenzen oder suchen"
              hilfe={
                <>
                  Die fünf Themenkategorien stammen aus dem Fragekatalog. Mehrere lassen sich
                  gleichzeitig wählen. Die Suche durchsucht Fragen, juristische Formulierungen
                  und Antworten; eine Zahl führt direkt zur Frage mit dieser Nummer.
                </>
              }
            >
              <div className="flex flex-wrap gap-2">
                {THEMENKATEGORIEN.map((name) => (
                  <Wahlknopf
                    key={name}
                    aktiv={kategorien.includes(name)}
                    onClick={() => setKategorien(umschalten(name))}
                  >
                    {name} ({fragen.filter((f) => f.themenkategorie === name).length})
                  </Wahlknopf>
                ))}
              </div>
              <div className="relative mt-3">
                <Search className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#5c6168]" />
                <input
                  type="text"
                  aria-label="Suche"
                  placeholder="Stichwort oder Fragennummer, z. B. Elternbrief, Plagiat, 32"
                  value={suche}
                  onChange={(e) => setSuche(e.target.value)}
                  className="w-full rounded-[10px] border border-[#e2e5e9] bg-white py-2.5 pl-10 pr-10 text-[16px] placeholder:text-[#8b9097] focus:border-[#0076bd] focus:outline-none"
                />
                {suche && (
                  <button
                    onClick={() => setSuche("")}
                    aria-label="Suche löschen"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#5c6168]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </FilterBlock>

            <FilterBlock
              nummer={4}
              titel="Antwort im Wortlaut lesen"
              hilfe={
                <>
                  Ein Klick auf eine Frage öffnet die juristische Formulierung und die vollständige
                  Antwort. Die farbigen Marken unter jeder Frage zitieren nur die ersten Worte der
                  Antwort; «differenziert» heisst, dass sie nicht mit Ja oder Nein beginnt.
                </>
              }
            >
              <a
                href="#fragen"
                className="inline-block rounded-full px-4 py-1.5 text-[15px] font-semibold text-white"
                style={{ backgroundColor: AKZENT }}
              >
                Zu den {gefiltert.length} angezeigten Fragen
              </a>
            </FilterBlock>
          </div>
        </section>

        {/* ---------- Fragen ---------- */}
        <section id="fragen" className="scroll-mt-4 border-t border-[#e2e5e9] pt-10">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[clamp(1.4rem,3.8vw,1.8rem)] font-bold leading-tight">
              {gefiltert.length} von {fragen.length} Fragen
            </h2>
            {filterAktiv && (
              <button
                onClick={zuruecksetzen}
                className="flex cursor-pointer items-center gap-1 text-[15px] underline"
                style={{ color: AKZENT }}
              >
                <X className="h-4 w-4" />
                Alle Filter zurücksetzen
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {gefiltert.map((f) => (
              <div key={f.nr} id={`frage-${f.nr}`} className="scroll-mt-4">
                <FrageKarte
                  frage={f}
                  modell={modell}
                  offen={offeneNr === f.nr}
                  onToggle={() => setOffeneNr(offeneNr === f.nr ? null : f.nr)}
                  onFrageKlick={zuFrage}
                />
              </div>
            ))}
          </div>

          {gefiltert.length === 0 && (
            <div className="rounded-[10px] border border-[#e2e5e9] bg-[#f4f6f8] p-6 text-center">
              <p className="text-[17px] font-semibold">Keine Frage passt zu dieser Auswahl.</p>
              <p className="mt-1 text-[15px] text-[#5c6168]">
                Nehmen Sie einen Filter zurück oder versuchen Sie ein anderes Stichwort.
              </p>
            </div>
          )}
        </section>

        {/* ---------- Ergänzend ---------- */}
        <section className="mt-12 border-t border-[#e2e5e9] pt-8">
          <Etikett>Ergänzend</Etikett>
          <p className="mb-3 mt-1.5 text-[16px] leading-[1.55]">
            Zwei ausdruckbare Merkblätter für Lehrpersonen. Sie sind eigene Zusammenfassungen und
            nicht Teil der geprüften Abklärung.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/datenschutz"
              className="rounded-full border border-[#e2e5e9] px-4 py-1.5 text-[15px] hover:border-[#0076bd]"
              style={{ color: AKZENT }}
            >
              Datenschutz-Info
            </Link>
            <Link
              href="/urheberrecht"
              className="rounded-full border border-[#e2e5e9] px-4 py-1.5 text-[15px] hover:border-[#0076bd]"
              style={{ color: AKZENT }}
            >
              Urheberrecht-Info
            </Link>
          </div>
        </section>

        <footer className="mt-12 border-t border-[#e2e5e9] pt-6 text-[14px] leading-[1.6] text-[#5c6168]">
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
        </footer>
      </main>
    </div>
  );
}
