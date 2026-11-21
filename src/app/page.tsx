"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Shield,
  ClipboardCheck,
  MessageCircle,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
  Info,
  ArrowRight,
  Scale,
  FileText,
  Quote,
} from "lucide-react";
import {
  fragen,
  THEMENKATEGORIEN,
  MODELLE,
  QUELLE,
  ABGEGLICHEN_AM,
  datumLang,
  KATEGORIE_FARBEN,
  FARBE_OHNE_KATEGORIE,
  MODELL_ZEILE,
  unterscheidetModelle,
  erwaehnteFragen,
  type Frage,
} from "@/data/questions";

const kategorieIcons: Record<string, React.ReactNode> = {
  "Unterrichtsmaterialien & Urheberrecht": <BookOpen className="w-4 h-4" />,
  "Schüler:innendaten & Datenschutz": <Shield className="w-4 h-4" />,
  "Leistungsbewertung & Prüfungen": <ClipboardCheck className="w-4 h-4" />,
  "Kommunikation & Interaktion mit KI": <MessageCircle className="w-4 h-4" />,
  "Technische Infrastruktur & Verantwortlichkeiten": <Settings className="w-4 h-4" />,
};

/**
 * Zeigt die Antwort vollständig und unverändert. Zeilenumbrüche stammen aus dem Excel.
 * Zeilen, die im Excel mit «OKI:», «GKImW:» oder «GKIoW:» beginnen, werden nur optisch
 * abgesetzt – der Text selbst bleibt derselbe.
 */
function Antwort({ text }: { text: string }) {
  const zeilen = text.split("\n");
  return (
    <div className="space-y-2 text-sm text-slate-800 leading-relaxed">
      {zeilen.map((zeile, i) => {
        if (zeile.trim() === "") return null;
        const modell = zeile.match(MODELL_ZEILE);
        if (modell) {
          const kopf = modell[0];
          return (
            <p
              key={i}
              className="whitespace-pre-wrap pl-3 border-l-4 border-indigo-300 bg-indigo-50/50 rounded-r-md py-2 pr-2"
            >
              <strong className="text-indigo-800">{kopf}</strong>
              {zeile.slice(kopf.length)}
            </p>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {zeile}
          </p>
        );
      })}
    </div>
  );
}

function FrageKarte({
  frage,
  offen,
  onToggle,
  onFrageKlick,
}: {
  frage: Frage;
  offen: boolean;
  onToggle: () => void;
  onFrageKlick: (nr: number) => void;
}) {
  const farbe = frage.themenkategorie
    ? KATEGORIE_FARBEN[frage.themenkategorie] ?? FARBE_OHNE_KATEGORIE
    : FARBE_OHNE_KATEGORIE;
  const verweise = erwaehnteFragen(frage);

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md overflow-hidden"
      style={{ borderLeftWidth: "4px", borderLeftColor: farbe }}
    >
      <button
        onClick={onToggle}
        aria-expanded={offen}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-slate-50 cursor-pointer"
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5"
          style={{ backgroundColor: farbe }}
        >
          {frage.nr}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-800 leading-snug whitespace-pre-wrap">
            {frage.praxisfrage}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            {frage.themenkategorie ? (
              <>
                <span style={{ color: farbe }}>{kategorieIcons[frage.themenkategorie]}</span>
                {frage.themenkategorie}
              </>
            ) : (
              <em>Im Fragekatalog ohne Themenkategorie</em>
            )}
          </p>
        </div>
        <span className="flex-shrink-0 text-slate-400 mt-1">
          {offen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {offen && (
        <div className="border-t border-slate-100 px-5 py-4 space-y-4">
          {frage.juristischeFormulierung && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Scale className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  Juristische Formulierung
                </p>
                <p className="text-sm text-blue-900 whitespace-pre-wrap">
                  {frage.juristischeFormulierung}
                </p>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5" />
              Antwort (Wortlaut Fragekatalog)
            </p>
            <Antwort text={frage.antwort} />
          </div>

          {verweise.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                In der Antwort erwähnte Fragen
              </p>
              <div className="flex flex-wrap gap-2">
                {verweise.map((nr) => (
                  <button
                    key={nr}
                    onClick={() => onFrageKlick(nr)}
                    title={fragen.find((f) => f.nr === nr)?.praxisfrage}
                    className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-3 py-1 hover:bg-indigo-100 cursor-pointer"
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

function ModellLegende() {
  const [offen, setOffen] = useState(false);
  return (
    <div className="mb-6">
      <button
        onClick={() => setOffen(!offen)}
        aria-expanded={offen}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
      >
        <Info className="w-4 h-4" />
        {offen ? "Abkürzungen ausblenden" : "Was bedeuten OKI, GKI, GKImW und GKIoW?"}
        {offen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {offen && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODELLE.map((modell) => (
            <div
              key={modell.abkuerzung}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded text-white bg-indigo-600">
                  {modell.abkuerzung}
                </span>
                <span className="text-sm font-semibold text-slate-700">{modell.bezeichnung}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {modell.beschreibung}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [suche, setSuche] = useState("");
  const [kategorien, setKategorien] = useState<string[]>([]);
  const [nurModelle, setNurModelle] = useState(false);
  const [offeneNr, setOffeneNr] = useState<number | null>(null);

  const toggleKategorie = useCallback((name: string) => {
    setKategorien((bisher) =>
      bisher.includes(name) ? bisher.filter((k) => k !== name) : [...bisher, name]
    );
  }, []);

  const zuruecksetzen = useCallback(() => {
    setSuche("");
    setKategorien([]);
    setNurModelle(false);
  }, []);

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
      if (nurModelle && !unterscheidetModelle(f)) return false;
      return true;
    });
  }, [suche, kategorien, nurModelle]);

  const filterAktiv = suche !== "" || kategorien.length > 0 || nurModelle;
  const anzahlMitModellen = useMemo(() => fragen.filter(unterscheidetModelle).length, []);

  const zuFrage = useCallback((nr: number) => {
    setSuche("");
    setKategorien([]);
    setNurModelle(false);
    setOffeneNr(nr);
    setTimeout(() => {
      document.getElementById(`frage-${nr}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">KI-Recht Navigator</h1>
                <p className="text-xs text-slate-500">
                  Rechtliche Fragen zum KI-Einsatz an Schulen | Kanton Zürich
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/datenschutz"
                className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100"
              >
                <Shield className="w-3.5 h-3.5" />
                Datenschutz-Info
              </Link>
              <Link
                href="/urheberrecht"
                className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100"
              >
                <FileText className="w-3.5 h-3.5" />
                Urheberrecht-Info
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-start gap-2 p-3 mb-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-700">
          <Quote className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
          <p>
            Alle {fragen.length} Fragen und Antworten stehen hier im unveränderten Wortlaut des
            Fragekatalogs Sek II – ohne Kürzungen, Zusammenfassungen oder eigene Einstufungen.
          </p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            aria-label="Suche"
            placeholder="Suche nach Fragen, Stichworten oder Fragennummer..."
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder:text-slate-400"
          />
          {suche && (
            <button
              onClick={() => setSuche("")}
              aria-label="Suche löschen"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <ModellLegende />

        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Themenkategorie</h2>
            <div className="flex flex-wrap gap-2">
              {THEMENKATEGORIEN.map((name) => {
                const aktiv = kategorien.includes(name);
                const farbe = KATEGORIE_FARBEN[name] ?? FARBE_OHNE_KATEGORIE;
                const anzahl = fragen.filter((f) => f.themenkategorie === name).length;
                return (
                  <button
                    key={name}
                    onClick={() => toggleKategorie(name)}
                    aria-pressed={aktiv}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border cursor-pointer ${
                      aktiv
                        ? "text-white shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                    style={aktiv ? { backgroundColor: farbe, borderColor: farbe } : undefined}
                  >
                    <span style={aktiv ? undefined : { color: farbe }}>{kategorieIcons[name]}</span>
                    {name}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        aktiv ? "bg-white/30 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {anzahl}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={nurModelle}
              onChange={(e) => setNurModelle(e.target.checked)}
              className="w-4 h-4 accent-indigo-600"
            />
            Nur Antworten, die nach OKI, GKImW und GKIoW unterscheiden ({anzahlMitModellen})
          </label>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">{gefiltert.length}</span> von{" "}
            {fragen.length} Fragen
            {filterAktiv && " (gefiltert)"}
          </p>
          {filterAktiv && (
            <button
              onClick={zuruecksetzen}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Filter zurücksetzen
            </button>
          )}
        </div>

        <div className="space-y-3">
          {gefiltert.map((f) => (
            <div key={f.nr} id={`frage-${f.nr}`} className="scroll-mt-24">
              <FrageKarte
                frage={f}
                offen={offeneNr === f.nr}
                onToggle={() => setOffeneNr(offeneNr === f.nr ? null : f.nr)}
                onFrageKlick={zuFrage}
              />
            </div>
          ))}
        </div>

        {gefiltert.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">Keine Fragen gefunden</h3>
            <p className="text-sm text-slate-400 mb-4">
              Versuchen Sie andere Suchbegriffe oder passen Sie die Filter an.
            </p>
            <button
              onClick={zuruecksetzen}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/datenschutz"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-md hover:border-emerald-300"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-800">Datenschutz-Info</p>
              <p className="text-xs text-emerald-600">
                Eigene Zusammenfassung – nicht Teil des Fragekatalogs
              </p>
            </div>
          </Link>
          <Link
            href="/urheberrecht"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md hover:border-blue-300"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-800">Urheberrecht-Info</p>
              <p className="text-xs text-blue-600">
                Eigene Zusammenfassung – nicht Teil des Fragekatalogs
              </p>
            </div>
          </Link>
        </div>

        <footer className="mt-8 py-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            Quelle: Fragekatalog Sek II (FINAL), Spalte «{QUELLE.spalteAntwort}» | Rechtliche
            Fragen zum KI-Einsatz an Schulen im Kanton Zürich
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Antworten von valfor | Diese Informationen stellen keine Rechtsberatung dar.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Stand: {datumLang(ABGEGLICHEN_AM)} |{" "}
            <Link href="/impressum" className="underline hover:text-slate-700">
              Impressum und Entstehung
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
