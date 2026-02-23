"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export default function UrheberrechtPage() {
  return (
    <>
      {/* Screen-only Navigation */}
      <div className="print:hidden bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Navigator
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/datenschutz"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Datenschutz-Info
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Drucken / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Printable Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 print:px-0 print:py-0 print:max-w-none">
        <article className="print:text-[11px] print:leading-[1.4]">
          {/* Header */}
          <header className="mb-8 print:mb-4">
            <div className="flex items-start gap-4 mb-4 print:mb-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 print:w-8 print:h-8">
                <svg className="w-7 h-7 text-white print:w-5 print:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 print:text-xl">
                  Urheberrecht beim KI-Einsatz an Schulen
                </h1>
                <p className="text-sm text-slate-500 mt-1 print:text-xs">
                  Information für Lehrpersonen | Kanton Zürich | Basierend auf dem URG und dem Fragekatalog Sek II
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 print:p-2 print:rounded-none">
              <p className="text-sm text-blue-800 print:text-[11px]">
                <strong>Dieses Dokument</strong> fasst die wichtigsten urheberrechtlichen Grundlagen zusammen,
                die Lehrpersonen beim Einsatz von KI-Tools beachten müssen. Es basiert auf dem Schweizer
                Urheberrechtsgesetz (URG) und den juristischen Bewertungen des Fragekatalogs Sek II.
                {" "}<strong>Es ersetzt keine Rechtsberatung.</strong>
              </p>
            </div>
          </header>

          {/* 1. Grundlagen */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              1. Was ist urheberrechtlich geschützt?
            </h2>
            <p className="text-sm text-slate-600 mb-3 print:text-[11px] print:mb-1.5">
              Das Urheberrecht schützt <strong>geistige Schöpfungen mit individuellem Charakter</strong> (Art. 2 URG).
              Der Schutz entsteht automatisch mit der Schöpfung – eine Registrierung ist nicht nötig.
            </p>
            <div className="grid grid-cols-2 gap-4 print:gap-2">
              <div className="p-3 border border-blue-200 rounded-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-blue-700 mb-2 print:text-[11px] print:mb-1">Geschützte Werke im Schulkontext</h3>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>• Schulbücher, Lehrmittel, Arbeitsblätter</li>
                  <li>• Zeitungsartikel, Fachartikel</li>
                  <li>• Theaterstücke, literarische Werke</li>
                  <li>• Musikstücke, Songtexte</li>
                  <li>• Fotos (50 Jahre geschützt), Filme</li>
                  <li>• Schülerarbeiten (SuS sind Urheber!)</li>
                  <li>• Software, Computerprogramme</li>
                </ul>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-slate-700 mb-2 print:text-[11px] print:mb-1">Nicht geschützt</h3>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>• Amtliche Dokumente (Gesetze, Verordnungen)</li>
                  <li>• Gemeinfreie Werke (70 Jahre nach Tod des Urhebers)</li>
                  <li>• Reine KI-Outputs (keine menschliche Schöpfung)</li>
                  <li>• Ideen, Konzepte, Methoden (nur die konkrete Form ist geschützt)</li>
                  <li>• Fakten, wissenschaftliche Erkenntnisse</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. KI-Handlungen */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              2. Urheberrechtlich relevante KI-Handlungen
            </h2>
            <table className="w-full text-sm border-collapse print:text-[10px]">
              <thead>
                <tr className="bg-blue-100">
                  <th className="text-left p-2 border border-blue-200 font-bold print:p-1">Handlung</th>
                  <th className="text-left p-2 border border-blue-200 font-bold print:p-1">Rechtliche Einordnung</th>
                  <th className="text-left p-2 border border-blue-200 font-bold print:p-1">Beispiel</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Hochladen</td>
                  <td className="p-2 border border-slate-200 print:p-1">Vervielfältigung (Art. 10 URG)</td>
                  <td className="p-2 border border-slate-200 print:p-1">Schulbuch in KI hochladen</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Zusammenfassen</td>
                  <td className="p-2 border border-slate-200 print:p-1">Bearbeitung (Art. 11 URG)</td>
                  <td className="p-2 border border-slate-200 print:p-1">KI erstellt Zusammenfassung eines Artikels</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Vereinfachen</td>
                  <td className="p-2 border border-slate-200 print:p-1">Änderung (Art. 11 URG)</td>
                  <td className="p-2 border border-slate-200 print:p-1">Theaterstück sprachlich vereinfachen</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Übungsaufgaben erstellen</td>
                  <td className="p-2 border border-slate-200 print:p-1">Bearbeitung oder freie Benutzung</td>
                  <td className="p-2 border border-slate-200 print:p-1">MC-Test aus Lehrmittel generieren</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Feedback geben</td>
                  <td className="p-2 border border-slate-200 print:p-1">Keine Bearbeitung</td>
                  <td className="p-2 border border-slate-200 print:p-1">KI gibt Feedback zu Schülerpräsentation</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 3. Eigengebrauchsschranken */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              3. Die Eigengebrauchsschranken (Art. 19 URG)
            </h2>

            <div className="space-y-3 print:space-y-1.5">
              {/* Schulintern */}
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-blue-700 mb-1 print:text-[11px]">
                  Schulinterner Gebrauch (Kontrolle bei der Lehrperson)
                </h3>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>✓ <strong>Vervielfältigung</strong> (Hochladen) erlaubt</li>
                  <li>✓ <strong>Bearbeitung und Änderung</strong> erlaubt</li>
                  <li>✓ Dritte dürfen <strong>Vervielfältigungen</strong> vornehmen (= KI-Anbieter als Dritter)</li>
                  <li>✗ Dritte dürfen <strong>keine Bearbeitungen</strong> vornehmen</li>
                  <li>→ Wichtigste Voraussetzung: Die LP hat <strong>alleinige Kontrolle</strong> über die Inhalte</li>
                </ul>
              </div>

              {/* Betriebsintern */}
              <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-amber-700 mb-1 print:text-[11px]">
                  Betriebsinterner Gebrauch (Schule involviert)
                </h3>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>✓ <strong>Vervielfältigung</strong> (Hochladen) erlaubt</li>
                  <li>✗ <strong>Keine Bearbeitung/Änderung</strong> ohne Zustimmung des Rechtsinhabers</li>
                  <li>→ Wenn die Schule Kontrolle/Einfluss hat, gilt diese einschränkendere Schranke</li>
                </ul>
              </div>

              {/* Gegenausnahme */}
              <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-red-700 mb-1 print:text-[11px]">
                  Gegenausnahme: Vollständige Werkexemplare
                </h3>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>✗ Keine (weitgehend) vollständige Vervielfältigung von im Handel erhältlichen Werkexemplaren</li>
                  <li>✗ Nicht das gesamte Schulbuch, Theaterstück oder Werksammlung hochladen</li>
                  <li>→ Einzelne Kapitel, Auszüge oder Arbeitsblätter sind möglich</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Bewertung nach KI-Modell-Typ */}
          <section className="mb-6 print:mb-3 print:break-before-page">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              4. Urheberrechtliche Bewertung nach KI-Modell-Typ
            </h2>
            <table className="w-full text-sm border-collapse print:text-[10px]">
              <thead>
                <tr className="bg-blue-100">
                  <th className="text-left p-2 border border-blue-200 font-bold print:p-1">Handlung</th>
                  <th className="text-left p-2 border border-blue-200 font-bold text-red-700 print:p-1">OKI</th>
                  <th className="text-left p-2 border border-blue-200 font-bold text-amber-700 print:p-1">GKImW</th>
                  <th className="text-left p-2 border border-blue-200 font-bold text-emerald-700 print:p-1">GKIoW</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Hochladen (Vervielfältigung)</td>
                  <td className="p-2 border border-slate-200 text-red-600 print:p-1">✗ Nicht zulässig</td>
                  <td className="p-2 border border-slate-200 text-amber-600 print:p-1">⚠ Eigengebrauch möglich</td>
                  <td className="p-2 border border-slate-200 text-emerald-600 print:p-1">✓ Zulässig</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Bearbeitung (z.B. Zusammenfassung)</td>
                  <td className="p-2 border border-slate-200 text-red-600 print:p-1">✗ Zustimmung nötig</td>
                  <td className="p-2 border border-slate-200 text-amber-600 print:p-1">⚠ Nur bei LP-Kontrolle</td>
                  <td className="p-2 border border-slate-200 text-emerald-600 print:p-1">✓ Bei LP-Kontrolle</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Freie Benutzung (z.B. Fragen erstellen)</td>
                  <td className="p-2 border border-slate-200 text-red-600 print:p-1">✗ Nicht zulässig (wg. Hochladen)</td>
                  <td className="p-2 border border-slate-200 text-emerald-600 print:p-1">✓ Zulässig</td>
                  <td className="p-2 border border-slate-200 text-emerald-600 print:p-1">✓ Zulässig</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Vollständiges Werkexemplar</td>
                  <td className="p-2 border border-slate-200 text-red-600 print:p-1">✗ Nie</td>
                  <td className="p-2 border border-slate-200 text-red-600 print:p-1">✗ Gegenausnahme greift</td>
                  <td className="p-2 border border-slate-200 text-red-600 print:p-1">✗ Gegenausnahme greift</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 5. Drei sichere Methoden */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              5. Drei sichere Methoden für die Arbeit mit KI
            </h2>

            <div className="space-y-3 print:space-y-1.5">
              {/* Methode 1 */}
              <div className="p-4 border-2 border-emerald-300 bg-emerald-50 rounded-lg print:p-2 print:rounded-none">
                <div className="flex items-center gap-2 mb-2 print:mb-1">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center print:w-5 print:h-5 print:text-[10px]">1</span>
                  <span className="text-sm font-bold text-emerald-700 print:text-[11px]">Eigene Notizen + KI</span>
                  <span className="text-xs bg-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-medium print:text-[9px] print:px-1">100% sicher</span>
                </div>
                <p className="text-sm text-slate-600 mb-2 print:text-[10px] print:mb-1">
                  Quellmaterial lesen → <strong>eigene Notizen in eigenen Worten</strong> erstellen → Notizen in KI hochladen.
                  Ihre Notizen sind Ihr eigenes Werk (Art. 2 URG). Faustregel: Maximal 10% wörtliche Übernahme.
                </p>
                <p className="text-xs text-emerald-600 italic print:text-[9px]">
                  Empfehlung: Für komplexe Themen und maximale pädagogische Qualität. Zeitaufwand: 15-20 Min.
                </p>
              </div>

              {/* Methode 2 */}
              <div className="p-4 border-2 border-blue-300 bg-blue-50 rounded-lg print:p-2 print:rounded-none">
                <div className="flex items-center gap-2 mb-2 print:mb-1">
                  <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center print:w-5 print:h-5 print:text-[10px]">2</span>
                  <span className="text-sm font-bold text-blue-700 print:text-[11px]">KI recherchiert selbstständig</span>
                  <span className="text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-medium print:text-[9px] print:px-1">~95% sicher</span>
                </div>
                <p className="text-sm text-slate-600 mb-2 print:text-[10px] print:mb-1">
                  Der KI ein <strong>Thema</strong> geben (nicht ein konkretes Werk). Die KI recherchiert und
                  synthetisiert aus verschiedenen Quellen = <strong>freie Benutzung</strong>, kein Werk zweiter Hand.
                </p>
                <div className="p-2 bg-white rounded border border-blue-200 print:p-1">
                  <p className="text-xs text-slate-500 font-mono print:text-[9px]">
                    Prompt: &quot;Recherchiere zum Thema [X] und erstelle eine Übersicht für [Stufe] mit Quellenangaben.&quot;
                  </p>
                </div>
                <p className="text-xs text-blue-600 italic mt-1 print:text-[9px]">
                  Empfehlung: Für Überblicksthemen und aktuelle Themen. Zeitaufwand: 5 Min.
                </p>
              </div>

              {/* Methode 3 */}
              <div className="p-4 border-2 border-amber-300 bg-amber-50 rounded-lg print:p-2 print:rounded-none">
                <div className="flex items-center gap-2 mb-2 print:mb-1">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center print:w-5 print:h-5 print:text-[10px]">3</span>
                  <span className="text-sm font-bold text-amber-700 print:text-[11px]">Konkretes Werk + KI</span>
                  <span className="text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-medium print:text-[9px] print:px-1">70-80% sicher</span>
                </div>
                <p className="text-sm text-slate-600 mb-2 print:text-[10px] print:mb-1">
                  Ein konkretes geschütztes Werk hochladen. Nur bei <strong>GKIoW</strong> im schulinternen Gebrauch mit
                  alleiniger Kontrolle der LP zulässig. Nie das vollständige Werkexemplar hochladen.
                </p>
                <p className="text-xs text-amber-600 italic print:text-[9px]">
                  Nur wenn nötig. OKI und GKImW: Zustimmung des Rechtsinhabers erforderlich.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Checkliste */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              6. Checkliste vor dem Hochladen in eine KI
            </h2>
            <div className="space-y-2 print:space-y-1">
              {[
                "Ist das Material urheberrechtlich geschützt? (Amtliche Dokumente/gemeinfreie Werke = frei)",
                "Ist der Urheber vor mehr als 70 Jahren gestorben? (→ gemeinfrei)",
                "Welcher KI-Modell-Typ? (OKI = Zustimmung nötig / GKI = Eigengebrauch prüfen)",
                "Wer hat die Kontrolle? (Nur LP → schulintern: breiteste Schranke / Schule → betriebsintern: eingeschränkt)",
                "Wird das gesamte Werkexemplar hochgeladen? (Ja → Gegenausnahme → Zustimmung nötig)",
                "Entsteht eine Bearbeitung? (Erkennbare Grundlage → Betriebsintern: Zustimmung nötig)",
                "Alternative: Eigene Notizen verwenden? (→ 100% sicher, kein Urheberrechtsrisiko)",
                "Alternative: KI thematisch recherchieren lassen? (→ ~95% sicher, freie Benutzung)",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 p-2 border border-slate-200 rounded print:p-1 print:rounded-none">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 print:w-4 print:h-4 print:text-[9px]">
                    {i + 1}
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-4 h-4 border-2 border-slate-300 rounded print:w-3 print:h-3 flex-shrink-0" />
                    <p className="text-sm text-slate-600 print:text-[10px]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. KI-generierte Inhalte */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              7. Urheberrecht an KI-generierten Inhalten
            </h2>
            <div className="grid grid-cols-2 gap-4 print:gap-2">
              <div className="p-3 border border-slate-200 rounded-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-slate-700 mb-2 print:text-[11px] print:mb-1">Kein Urheberrecht</h3>
                <p className="text-sm text-slate-600 print:text-[10px]">
                  Reine KI-Outputs sind <strong>nicht urheberrechtlich geschützt</strong>, da keine geistige
                  Schöpfung eines Menschen vorliegt (Art. 2 URG). Sie können frei verwendet werden.
                </p>
              </div>
              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50 print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-blue-700 mb-2 print:text-[11px] print:mb-1">Ausnahme: Menschliche Kreativität</h3>
                <p className="text-sm text-slate-600 print:text-[10px]">
                  Bei kreativem Prompting, Auswahl aus mehreren Outputs und Nachbearbeitung kann
                  <strong> möglicherweise</strong> ein Urheberrecht entstehen. Zurückhaltung ist geboten.
                </p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg print:p-2 print:mt-1.5 print:rounded-none">
              <p className="text-sm text-amber-700 print:text-[10px]">
                <strong>Wichtig:</strong> Vertragliche Vorgaben des KI-Anbieters beachten (Kennzeichnungspflichten,
                Verbote zur kommerziellen Verwertung). KI-generierte Outputs können unerkannt urheberrechtlich
                geschützte Inhalte enthalten – dies ist eine Verletzung der Zitatpflicht oder ein Plagiatsversuch.
              </p>
            </div>
          </section>

          {/* 8. Vergütung */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              8. Hinweise
            </h2>
            <div className="space-y-2 print:space-y-1">
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 print:p-2 print:rounded-none">
                <p className="text-sm text-slate-600 print:text-[10px]">
                  <strong>Vergütungspflicht:</strong> Der schul- und betriebsinterne Gebrauch ist teilweise
                  vergütungspflichtig (via ProLitteris/SUISA/SSA). Fragen zur Vergütung werden im
                  Fragekatalog nicht behandelt.
                </p>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 print:p-2 print:rounded-none">
                <p className="text-sm text-slate-600 print:text-[10px]">
                  <strong>Gesetzgebung im Fluss:</strong> Der Bundesrat prüft bis Ende 2026 konkrete Vorschläge
                  zu KI-Gesetzen. Das Immaterialgüterrecht (IGE) prüft notwendige Anpassungen am URG.
                  Neue Regelungen für den Bildungsbereich sind möglich.
                </p>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 print:p-2 print:rounded-none">
                <p className="text-sm text-slate-600 print:text-[10px]">
                  <strong>Weiterführende Ressource:</strong> ECRC42 (EduCopyrightCheck) bietet eine interaktive
                  Urheberrechts-Checkliste mit Creative-Commons-Lizenzen, Fallbeispielen und Zertifikatsystem.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-8 pt-4 border-t border-slate-300 print:mt-4 print:pt-2">
            <p className="text-xs text-slate-400 print:text-[9px]">
              Basierend auf dem Fragekatalog Sek II (FINAL) | Rechtliche Fragen zum KI-Einsatz an Schulen im
              Kanton Zürich | Erstellt von valfor | <strong>Diese Informationen stellen keine Rechtsberatung dar.</strong>
            </p>
            <p className="text-xs text-slate-400 mt-1 print:text-[9px]">
              Weiterführend: KI-Recht Navigator (ki-recht-navigator.vercel.app) | ECRC42 (EduCopyrightCheck) für interaktive Urheberrechts-Checklisten
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
