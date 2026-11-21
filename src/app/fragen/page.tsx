"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";
import {
  fragen,
  THEMENKATEGORIEN,
  MODELLE,
  MODELLTYPEN,
  MODELL_ZEILE,
  istUmsetzungsfrage,
  umsetzbarkeit,
  erwaehnteFragen,
  type Frage,
  type Modelltyp,
  type Einstieg,
} from "@/data/questions";
import {
  AKZENT,
  AKZENT_HELL,
  EINSTIEG_GRUPPEN,
  MARKE,
  EinstiegChip,
  Etikett,
  FLAECHE,
  GEDAEMPFT,
  LINIE,
  Seitentitel,
} from "@/components/ui";

/* ---------- Antwort im Wortlaut ---------- */

/**
 * Zeigt die Antwort vollständig und unverändert. Zeilenumbrüche stammen aus dem Excel.
 * Zeilen, die dort mit «OKI:», «GKImW:» oder «GKIoW:» beginnen, werden nur optisch
 * abgesetzt; die Zeile des gewählten KI-Tool-Typs wird hervorgehoben.
 */
function Antwort({ text, modell }: { text: string; modell: Modelltyp | null }) {
  return (
    <div className="space-y-2.5 text-[16px] leading-[1.6]">
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
              backgroundColor: gewaehlt ? AKZENT_HELL : FLAECHE,
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
    <div className="rounded-[10px] border bg-white" style={{ borderColor: LINIE }}>
      <button
        onClick={onToggle}
        aria-expanded={offen}
        className="flex w-full cursor-pointer items-start gap-3 p-4 text-left hover:bg-[#fafbfc] sm:p-5"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[13px]" style={{ color: GEDAEMPFT }}>
            Frage {frage.nr}
            {" · "}
            {frage.themenkategorie ?? <em>im Fragekatalog ohne Themenkategorie</em>}
          </p>
          <h3 className="mt-1 whitespace-pre-wrap text-[17px] font-semibold leading-snug">
            {frage.praxisfrage}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {u !== null && (
              <span className="text-[13px]" style={{ color: GEDAEMPFT }}>
                Antwortanfang:
              </span>
            )}
            {u === null && (
              <span
                className="rounded-full px-2.5 py-0.5 text-[13px]"
                style={{ backgroundColor: "#f1f3f5", color: "#4b5158" }}
              >
                Weitere Rechtsfrage
              </span>
            )}
            {u?.art === "proModell" &&
              MODELLTYPEN.map((m) => (
                <EinstiegChip key={m} info={u.proModell[m]} vorsatz={m} betont={m === modell} />
              ))}
            {u?.art === "gesamt" && <EinstiegChip info={u.gesamt} />}
            {u?.art === "gesamt" && modell !== null && (
              <span className="text-[13px]" style={{ color: GEDAEMPFT }}>
                (nicht nach Typ unterschieden)
              </span>
            )}
          </div>
        </div>
        <span className="mt-1 flex-shrink-0" style={{ color: GEDAEMPFT }}>
          {offen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      {offen && (
        <div className="space-y-5 border-t p-4 sm:p-5" style={{ borderColor: LINIE }}>
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
                    className="cursor-pointer rounded-full border px-3 py-1 text-[14px] hover:border-[#0076bd]"
                    style={{ borderColor: LINIE, color: AKZENT }}
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
      className="cursor-pointer rounded-full border px-3 py-1 text-[14.5px]"
      style={
        aktiv
          ? { backgroundColor: AKZENT, borderColor: AKZENT, color: "#fff", fontWeight: 600 }
          : { backgroundColor: "#fff", borderColor: LINIE }
      }
    >
      {children}
    </button>
  );
}

function FilterZeile({
  titel,
  hilfe,
  children,
}: {
  titel: string;
  hilfe: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t py-4 first:border-t-0 first:pt-0 last:pb-0" style={{ borderColor: LINIE }}>
      <p className="text-[15.5px] font-semibold">{titel}</p>
      <p className="mb-2.5 mt-0.5 text-[14px] leading-[1.5]" style={{ color: GEDAEMPFT }}>
        {hilfe}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

type Art = "alle" | "umsetzung" | "weitere";

const umschalten =
  <T,>(wert: T) =>
  (bisher: T[]) =>
    bisher.includes(wert) ? bisher.filter((x) => x !== wert) : [...bisher, wert];

/* ---------- Seite ---------- */

export default function FragenFiltern() {
  const [suche, setSuche] = useState("");
  const [kategorien, setKategorien] = useState<string[]>([]);
  const [modell, setModell] = useState<Modelltyp | null>(null);
  const [einstiege, setEinstiege] = useState<Einstieg[]>([]);
  const [art, setArt] = useState<Art>("alle");
  const [offeneNr, setOffeneNr] = useState<number | null>(null);

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
      return modell ? [u.proModell[modell].gruppe] : MODELLTYPEN.map((m) => u.proModell[m].gruppe);
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

  const zuFrage = useCallback((nr: number) => {
    setSuche("");
    setKategorien([]);
    setEinstiege([]);
    setArt("alle");
    setOffeneNr(nr);
    setTimeout(() => {
      document.getElementById(`frage-${nr}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  return (
    <>
      <Seitentitel etikett="Register 3" titel="Fragen filtern">
        <p>
          Grenzen Sie die {fragen.length} Usecases ein und öffnen Sie die Antwort im Wortlaut. Die
          Filter verändern keinen Text; sie bestimmen nur, welche Fragen angezeigt werden. Was die
          Typen und Marken bedeuten, steht unter{" "}
          <Link href="/organisation" className="underline" style={{ color: AKZENT }}>
            Organisation der Usecases
          </Link>
          .
        </p>
      </Seitentitel>

      <div className="mt-4 rounded-[10px] border p-4 sm:p-5" style={{ borderColor: LINIE }}>
        <FilterZeile
          titel="Typ Ihres KI-Tools"
          hilfe="Hebt in jeder Antwort die passende Zeile hervor und gilt für den Filter «Antwortanfang»."
        >
          {MODELLTYPEN.map((m) => (
            <Wahlknopf key={m} aktiv={modell === m} onClick={() => setModell(modell === m ? null : m)}>
              {m} – {MODELLE.find((x) => x.abkuerzung.trim() === m)?.bezeichnung ?? ""}
            </Wahlknopf>
          ))}
        </FilterZeile>

        <FilterZeile
          titel="Antwortanfang"
          hilfe={
            <>
              Ordnet die {anzahlUmsetzung} Fragen zur Umsetzung nur nach den ersten Worten der
              Antwort. Das ist keine Aussage darüber, ob ein Usecase erlaubt ist: Bedingungen,
              Ausnahmen und Einschränkungen stehen erst im Wortlaut.
              {modell === null
                ? " Ohne gewählten Tool-Typ zählt jede der drei Zeilen."
                : " Antworten ohne eigene Zeile pro Typ erscheinen unabhängig vom gewählten Typ."}
            </>
          }
        >
          {EINSTIEG_GRUPPEN.map(({ gruppe, titel }) => {
            const aktiv = einstiege.includes(gruppe);
            return (
              <button
                key={gruppe}
                onClick={() => setEinstiege(umschalten(gruppe))}
                aria-pressed={aktiv}
                className="cursor-pointer rounded-full border px-3 py-1 text-[14.5px]"
                style={{
                  backgroundColor: aktiv ? AKZENT : MARKE.bg,
                  borderColor: aktiv ? AKZENT : "transparent",
                  color: aktiv ? "#fff" : MARKE.fg,
                  fontWeight: aktiv ? 600 : 500,
                }}
              >
                {titel} <span className="opacity-80">({anzahlProGruppe[gruppe]})</span>
              </button>
            );
          })}
        </FilterZeile>

        <FilterZeile titel="Art der Frage" hilfe="«Darf ich …?» oder Fragen zu Haftung, Rechten und Pflichten.">
          <Wahlknopf aktiv={art === "alle"} onClick={() => setArt("alle")}>
            Alle ({fragen.length})
          </Wahlknopf>
          <Wahlknopf aktiv={art === "umsetzung"} onClick={() => setArt("umsetzung")}>
            Fragen zur Umsetzung ({anzahlUmsetzung})
          </Wahlknopf>
          <Wahlknopf aktiv={art === "weitere"} onClick={() => setArt("weitere")}>
            Weitere Rechtsfragen ({fragen.length - anzahlUmsetzung})
          </Wahlknopf>
        </FilterZeile>

        <FilterZeile titel="Thema" hilfe="Mehrere Kategorien lassen sich gleichzeitig wählen.">
          {THEMENKATEGORIEN.map((name) => (
            <Wahlknopf
              key={name}
              aktiv={kategorien.includes(name)}
              onClick={() => setKategorien(umschalten(name))}
            >
              {name} ({fragen.filter((f) => f.themenkategorie === name).length})
            </Wahlknopf>
          ))}
        </FilterZeile>

        <FilterZeile titel="Suche" hilfe="Durchsucht Fragen und Antworten; eine Zahl führt zur Frage mit dieser Nummer.">
          <div className="relative w-full">
            <Search
              className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2"
              style={{ color: GEDAEMPFT }}
            />
            <input
              type="text"
              aria-label="Suche"
              placeholder="z. B. Elternbrief, Plagiat, 32"
              value={suche}
              onChange={(e) => setSuche(e.target.value)}
              className="w-full rounded-[10px] border bg-white py-2.5 pl-10 pr-10 text-[16px] placeholder:text-[#8b9097] focus:border-[#0076bd] focus:outline-none"
              style={{ borderColor: LINIE }}
            />
            {suche && (
              <button
                onClick={() => setSuche("")}
                aria-label="Suche löschen"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: GEDAEMPFT }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </FilterZeile>
      </div>

      <div className="mb-3 mt-8 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[clamp(1.25rem,3.4vw,1.55rem)] font-bold leading-tight">
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
          <div key={f.nr} id={`frage-${f.nr}`} className="scroll-mt-28">
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
        <div className="rounded-[10px] border p-6 text-center" style={{ borderColor: LINIE, backgroundColor: FLAECHE }}>
          <p className="text-[17px] font-semibold">Keine Frage passt zu dieser Auswahl.</p>
          <p className="mt-1 text-[15px]" style={{ color: GEDAEMPFT }}>
            Nehmen Sie einen Filter zurück oder versuchen Sie ein anderes Stichwort.
          </p>
        </div>
      )}
    </>
  );
}
