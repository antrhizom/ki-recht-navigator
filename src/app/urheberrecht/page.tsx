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
              3. Die Eigengebrauchsschranken (Art. 19 URG) – enger als oft angenommen
            </h2>

            <div className="p-3 bg-red-50 border border-red-300 rounded-lg mb-3 print:p-2 print:mb-2 print:rounded-none">
              <p className="text-sm text-red-700 font-semibold print:text-[10px]">
                Wichtig: Die Eigengebrauchsschranken sind <strong>keine Generalerlaubnis</strong>. Sie erlauben nur eng umschriebene Handlungen
                unter bestimmten Voraussetzungen. Bei KI-Einsatz gelten zusätzliche Einschränkungen, da der KI-Anbieter als «Dritter» handelt und
                Dritte nur Vervielfältigungen – <strong>keine Bearbeitungen</strong> – vornehmen dürfen.
              </p>
            </div>

            <div className="space-y-3 print:space-y-1.5">
              {/* Schulintern */}
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-blue-700 mb-1 print:text-[11px]">
                  Schulinterner Gebrauch (alleinige Kontrolle bei der LP)
                </h3>
                <p className="text-xs text-blue-600 italic mb-2 print:text-[10px] print:mb-1">
                  Breiteste Schranke – greift nur, wenn die LP die alleinige Kontrolle behält und keine schulische Stelle involviert ist
                </p>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>✓ <strong>Vervielfältigung</strong> (Hochladen) erlaubt – aber nur Auszüge, keine vollständigen Werkexemplare</li>
                  <li>✓ <strong>Bearbeitung und Änderung</strong> durch die LP selbst erlaubt</li>
                  <li>✓ Dritte (= KI-Anbieter) dürfen <strong>Vervielfältigungen</strong> vornehmen</li>
                  <li>✗ Dritte dürfen <strong>keine Bearbeitungen</strong> vornehmen – dies ist eine häufig übersehene Einschränkung</li>
                  <li>✗ <strong>Gilt nicht bei OKI</strong> – keine Kontrolle über Datenverwendung durch Anbieter</li>
                </ul>
              </div>

              {/* Betriebsintern */}
              <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-amber-700 mb-1 print:text-[11px]">
                  Betriebsinterner Gebrauch (Schule involviert) – eingeschränkter
                </h3>
                <p className="text-xs text-amber-600 italic mb-2 print:text-[10px] print:mb-1">
                  Greift, sobald die Schule (Schulleitung, Fachschaft, etc.) Einfluss oder Kontrolle hat
                </p>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>✓ <strong>Vervielfältigung</strong> (Hochladen) erlaubt – aber nur Auszüge</li>
                  <li>✗ <strong>Keine Bearbeitung/Änderung</strong> ohne Zustimmung des Rechtsinhabers</li>
                  <li>✗ <strong>Keine Bearbeitungen durch Dritte</strong> (= KI-Anbieter)</li>
                  <li>→ In der Praxis bedeutet das: KI darf nur als «Kopierer» dienen, nicht als «Bearbeiter»</li>
                </ul>
              </div>

              {/* Gegenausnahme */}
              <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-red-700 mb-1 print:text-[11px]">
                  Gegenausnahme: Vollständige Werkexemplare (Art. 19 Abs. 3 URG)
                </h3>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>✗ <strong>Nie</strong> (weitgehend) vollständige Vervielfältigung von im Handel erhältlichen Werkexemplaren</li>
                  <li>✗ Kein gesamtes Schulbuch, Theaterstück, Werksammlung oder Musikstück hochladen</li>
                  <li>✗ Auch nicht auszugsweise, wenn die Auszüge zusammen das Werk «weitgehend» abbilden</li>
                  <li>→ Gilt für <strong>alle KI-Modell-Typen</strong> – auch bei GKIoW</li>
                </ul>
              </div>

              {/* GT7 / Digitale Nutzung / Lehrmittelschranke */}
              <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-indigo-700 mb-1 print:text-[11px]">
                  Digitale Nutzung im Schulnetz und die Lehrmittelschranke (GT 7 / Art. 19 Abs. 1 lit. b URG)
                </h3>
                <p className="text-xs text-indigo-600 italic mb-2 print:text-[10px] print:mb-1">
                  Der Gemeinsame Tarif 7 (GT 7) regelt die Vergütung für schulische Vervielfältigungen und definiert, was im Unterricht erlaubt ist.
                </p>
                <div className="mb-2 p-2 bg-white rounded border border-indigo-200 print:p-1 print:mb-1">
                  <p className="text-xs font-bold text-indigo-800 mb-1 print:text-[10px]">Was erlaubt ist:</p>
                  <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                    <li>✓ Auszüge und Ausschnitte aus geschützten Werken dürfen im <strong>Schulnetz digital zur Verfügung</strong> gestellt werden (= Vervielfältigung im Eigengebrauch)</li>
                    <li>✓ Da dies eine zulässige Vervielfältigung ist, können diese Auszüge auch in eine <strong>KI hochgeladen</strong> werden, um daraus Aufgaben, Übungen oder Zusammenfassungen zu erstellen</li>
                    <li>✓ Die so erstellten Materialien dürfen in den <strong>eigenen Klassen</strong> der LP eingesetzt werden</li>
                  </ul>
                </div>
                <div className="p-2 bg-white rounded border border-red-200 print:p-1">
                  <p className="text-xs font-bold text-red-700 mb-1 print:text-[10px]">Die Grenze – Lehrmittelherstellung:</p>
                  <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                    <li>✗ Sobald aus den KI-Ergebnissen <strong>Lehrmittel</strong> entstehen (z.B. ein Aufgabenset, ein Arbeitsheft, eine Übungssammlung), dürfen diese <strong>nicht über die eigenen Klassen hinaus</strong> verbreitet werden</li>
                    <li>✗ Weitergabe an andere LP, andere Schulen, auf öffentliche Plattformen oder ins Internet ist <strong>nicht zulässig</strong> – auch nicht innerhalb der gleichen Schule</li>
                    <li>✗ Die «eigene Klasse» ist die <strong>Eigengebrauch-Grenze</strong>: Was ich für meinen Unterricht erstelle, bleibt in meinem Unterricht</li>
                  </ul>
                </div>
                <p className="text-xs text-indigo-600 mt-2 print:text-[9px] print:mt-1">
                  <strong>Faustregel:</strong> Auszüge in KI hochladen und Aufgaben erstellen = erlaubt (eigene Klassen).
                  Daraus ein Lehrmittel machen und weitergeben = nur mit Zustimmung des Rechtsinhabers.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Die drei KI-Modell-Typen */}
          <section className="mb-6 print:mb-3 print:break-before-page">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              4. Die drei KI-Modell-Typen und ihre urheberrechtliche Bewertung
            </h2>

            {/* OKI */}
            <div className="mb-3 p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg print:p-2 print:mb-2 print:rounded-none">
              <h3 className="text-sm font-bold text-red-700 mb-1 print:text-[11px]">
                OKI – Offene KI-Modelle
              </h3>
              <p className="text-xs text-red-600 italic mb-2 print:text-[10px] print:mb-1">
                z.B. ChatGPT Free, Gemini Free – Daten werden für Training/eigene Zwecke des Anbieters genutzt, kein Kontrollverlust ausschliessbar
              </p>
              <ul className="text-sm text-red-700 space-y-1 print:text-[10px] print:space-y-0">
                <li>✗ <strong>Hochladen geschützter Werke nicht zulässig</strong> – Vervielfältigung fällt nicht unter Eigengebrauch, da Daten an Dritte (Anbieter) weitergegeben und potenziell für Training verwendet werden</li>
                <li>✗ <strong>Keine Bearbeitung/Änderung</strong> geschützter Werke möglich</li>
                <li>✗ <strong>Keine freie Benutzung</strong> – schon das Hochladen ist die Hürde</li>
                <li>✗ Vollständige Werkexemplare <strong>unter keinen Umständen</strong></li>
                <li>→ <strong>Strategie:</strong> Nur eigene Inhalte, gemeinfreie Werke oder CC-lizenzierte Materialien verwenden</li>
              </ul>
            </div>

            {/* GKImW */}
            <div className="mb-3 p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg print:p-2 print:mb-2 print:rounded-none">
              <h3 className="text-sm font-bold text-amber-700 mb-1 print:text-[11px]">
                GKImW – Geschlossene KI mit Weitergabe
              </h3>
              <p className="text-xs text-amber-600 italic mb-2 print:text-[10px] print:mb-1">
                z.B. ChatGPT Enterprise/Edu, Azure OpenAI – Daten werden nicht für Training genutzt, aber an externen Anbieter übermittelt
              </p>
              <ul className="text-sm text-amber-700 space-y-1 print:text-[10px] print:space-y-0">
                <li>⚠ <strong>Hochladen (Vervielfältigung)</strong> – im Eigengebrauch grundsätzlich möglich, aber: betriebsinterner Gebrauch erlaubt <strong>keine Bearbeitung</strong></li>
                <li>⚠ <strong>Bearbeitung/Änderung</strong> – nur bei <strong>schulinternem Gebrauch</strong> (alleinige LP-Kontrolle), nicht bei betriebsinternem Gebrauch</li>
                <li>✓ <strong>Freie Benutzung</strong> (z.B. Übungsfragen erstellen) – zulässig, wenn kein erkennbarer Zusammenhang zum Originalwerk</li>
                <li>✗ Vollständige Werkexemplare – <strong>Gegenausnahme greift</strong></li>
                <li>→ <strong>Achtung:</strong> Dritte (= KI-Anbieter) dürfen zwar vervielfältigen, aber <strong>keine Bearbeitungen</strong> vornehmen</li>
              </ul>
            </div>

            {/* GKIoW */}
            <div className="mb-3 p-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg print:p-2 print:mb-2 print:rounded-none">
              <h3 className="text-sm font-bold text-emerald-700 mb-1 print:text-[11px]">
                GKIoW – Geschlossene KI ohne Weitergabe
              </h3>
              <p className="text-xs text-emerald-600 italic mb-2 print:text-[10px] print:mb-1">
                Daten werden nicht an Dritte weitergegeben und nicht für Training verwendet – es gibt zwei Varianten:
              </p>

              {/* Variante 1: Lokal */}
              <div className="ml-2 mb-2 p-2 bg-emerald-100/50 rounded border border-emerald-200 print:p-1 print:mb-1">
                <p className="text-xs font-bold text-emerald-800 mb-1 print:text-[10px]">
                  Variante 1: GKIoW-Lokal – auf eigenem Gerät oder eigener Infrastruktur
                </p>
                <p className="text-xs text-slate-600 print:text-[9px]">
                  z.B. lokal installierte Modelle (LM Studio, Ollama), schulinterne Server, kantonale On-Premise-Lösungen.
                  Daten verlassen das Gerät bzw. das Schulnetz <strong>nie</strong>. Urheberrechtlich die klarste Situation:
                  es gibt keinen «Dritten», die Vervielfältigung bleibt vollständig beim Nutzer.
                </p>
              </div>

              {/* Variante 2: Cloud */}
              <div className="ml-2 mb-2 p-2 bg-emerald-100/50 rounded border border-emerald-200 print:p-1 print:mb-1">
                <p className="text-xs font-bold text-emerald-800 mb-1 print:text-[10px]">
                  Variante 2: GKIoW-Cloud – registrierter Cloud-Dienst ohne Training und ohne dauerhafte Speicherung
                </p>
                <p className="text-xs text-slate-600 print:text-[9px]">
                  z.B. ein KI-Dienst im Internet, bei dem man sich registriert, aber der Anbieter vertraglich zusichert:
                  kein Training mit Eingabedaten, keine dauerhafte Speicherung der Prompts, eingeschränkter Zugriff.
                  Dies funktioniert <strong>wie eine Cloud (z.B. Microsoft 365)</strong>: In einer Cloud werden Dokumente
                  gespeichert, aber nur berechtigte Personen können darauf zugreifen. Bei einer KI-Cloud ist es ähnlich –
                  die Daten können vorübergehend verarbeitet werden, sind aber nicht öffentlich zugänglich und werden
                  nicht weiterverwendet. Entscheidend ist, dass der Zugriff <strong>eingeschränkt</strong> bleibt und die
                  Daten nicht für fremde Zwecke genutzt werden.
                </p>
              </div>

              <ul className="text-sm text-emerald-700 space-y-1 print:text-[10px] print:space-y-0">
                <li>✓ <strong>Hochladen (Vervielfältigung)</strong> – im Eigengebrauch zulässig (schulintern und betriebsintern)</li>
                <li>✓ <strong>Bearbeitung/Änderung</strong> – bei alleiniger LP-Kontrolle (schulinterner Gebrauch) zulässig</li>
                <li>✓ <strong>Freie Benutzung</strong> – zulässig</li>
                <li>✗ Vollständige Werkexemplare – <strong>Gegenausnahme greift auch hier</strong></li>
                <li>→ <strong>Sicherste Option</strong> für urheberrechtlich geschützte Materialien im schulischen Einsatz</li>
              </ul>

              <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-200 print:p-2 print:mt-1.5">
                <h4 className="text-xs font-bold text-emerald-800 mb-1.5 print:text-[10px] print:mb-1">Vergleich mit Cloud-Speicher und die Frage der Speicherung</h4>
                <p className="text-xs text-slate-600 mb-2 print:text-[9px] print:mb-1">
                  In einer <strong>Cloud wie Microsoft 365</strong> werden Dokumente gespeichert – aber der Zugriff ist auf
                  berechtigte Personen beschränkt. Microsoft nutzt die Dokumente nicht für eigene Zwecke. Bei einer
                  <strong> KI-Cloud (GKIoW-Cloud)</strong> ist es vergleichbar: Die Eingabedaten können während der Verarbeitung
                  vorübergehend gespeichert sein, aber der Anbieter nutzt sie nicht für Training und gibt sie nicht weiter.
                  Der Zugriff ist auf den registrierten Nutzer beschränkt – wie bei einer Datei in OneDrive oder SharePoint.
                </p>
                <p className="text-xs text-slate-600 mb-2 print:text-[9px] print:mb-1">
                  <strong>Unterschied zu OKI/GKImW:</strong> Bei offenen Modellen und geschlossenen Modellen mit Weitergabe
                  werden die Daten an externe Anbieter übermittelt, die sie potenziell für eigene Zwecke nutzen.
                  Selbst wenn ein Anbieter verspricht, die Daten «nicht für Training zu verwenden», aber sie dennoch
                  <strong> dauerhaft speichert</strong>, bleibt eine <strong>Vervielfältigung im Sinne von Art. 10 URG</strong> bestehen.
                  Diese fällt nicht unter Art. 24a URG (vorübergehende Vervielfältigung), denn diese Ausnahme verlangt,
                  dass die Kopie <strong>flüchtig oder begleitend</strong> ist und <strong>keine eigenständige wirtschaftliche
                  Bedeutung</strong> hat (vgl. Vischer, 2024). Wer Daten speichert und den Zugriff nicht einschränkt,
                  erfüllt diese Bedingungen nicht.
                </p>
                <p className="text-xs text-emerald-700 font-semibold print:text-[9px]">
                  → GKIoW (beide Varianten) vermeidet dieses Problem: keine Weitergabe an Dritte, kein Training,
                  und bei vorübergehender Speicherung ist der Zugriff strikt eingeschränkt – wie bei einem Cloud-Speicher.
                </p>
              </div>
            </div>
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

          {/* 6. Strategien & Alternativen */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              6. Strategien & Alternativen: Rechtsinhaber anfragen oder CC-Lizenzen nutzen
            </h2>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg mb-3 print:p-2 print:mb-2 print:rounded-none">
              <p className="text-sm text-indigo-700 print:text-[10px]">
                Wenn die Eigengebrauchsschranken <strong>nicht greifen</strong> (z.B. bei OKI, bei Bearbeitungen im betriebsinternen Gebrauch, oder
                bei vollständigen Werkexemplaren), gibt es <strong>zwei zentrale Strategien</strong>, um geschützte Inhalte dennoch rechtssicher mit KI zu nutzen.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 print:gap-2">
              {/* Strategie 1: Rechtsinhaber anfragen */}
              <div className="p-4 border-2 border-violet-300 bg-violet-50 rounded-lg print:p-2 print:rounded-none">
                <div className="flex items-center gap-2 mb-2 print:mb-1">
                  <span className="w-7 h-7 rounded-full bg-violet-500 text-white text-sm font-bold flex items-center justify-center print:w-5 print:h-5 print:text-[10px]">A</span>
                  <span className="text-sm font-bold text-violet-700 print:text-[11px]">Rechtsinhaber anfragen</span>
                </div>
                <p className="text-sm text-slate-600 mb-2 print:text-[10px] print:mb-1">
                  Mit einer <strong>ausdrücklichen Zustimmung</strong> des Rechtsinhabers dürfen Sie jedes Werk in jede KI hochladen und bearbeiten lassen.
                </p>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>• <strong>Verlage</strong> direkt kontaktieren (viele haben KI-Richtlinien)</li>
                  <li>• <strong>ProLitteris</strong> (Texte, Bilder), <strong>SUISA</strong> (Musik), <strong>SSA</strong> (Bühnenstücke)</li>
                  <li>• Schulbuchverlage haben teilweise Lizenzen für digitale Nutzung</li>
                  <li>• Zustimmung <strong>schriftlich</strong> einholen und dokumentieren</li>
                </ul>
                <p className="text-xs text-violet-600 italic mt-2 print:text-[9px] print:mt-1">
                  Tipp: Die Anfrage lohnt sich besonders bei Material, das regelmässig eingesetzt wird.
                </p>
              </div>

              {/* Strategie 2: CC-Lizenzen */}
              <div className="p-4 border-2 border-teal-300 bg-teal-50 rounded-lg print:p-2 print:rounded-none">
                <div className="flex items-center gap-2 mb-2 print:mb-1">
                  <span className="w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center print:w-5 print:h-5 print:text-[10px]">B</span>
                  <span className="text-sm font-bold text-teal-700 print:text-[11px]">CC-lizenzierte Inhalte verwenden</span>
                </div>
                <p className="text-sm text-slate-600 mb-2 print:text-[10px] print:mb-1">
                  <strong>Creative-Commons-Lizenzen</strong> erlauben im Voraus definierte Nutzungen. Materialien unter CC-Lizenzen können oft ohne weitere Anfrage mit KI genutzt werden.
                </p>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>• <strong>CC0</strong> – Gemeinfrei, alles erlaubt</li>
                  <li>• <strong>CC-BY</strong> – Frei nutzbar mit Quellenangabe</li>
                  <li>• <strong>CC-BY-SA</strong> – Nutzbar, Weitergabe unter gleicher Lizenz</li>
                  <li>⚠ <strong>CC-BY-ND</strong> – Keine Bearbeitungen erlaubt (KI-Zusammenfassung = Bearbeitung!)</li>
                  <li>⚠ <strong>CC-BY-NC</strong> – Nur nicht-kommerziell (Schulgebrauch i.d.R. OK)</li>
                </ul>
                <p className="text-xs text-teal-600 italic mt-2 print:text-[9px] print:mt-1">
                  Quellenangabe mit TASL-Formel: Titel – Autor – Source (URL) – Lizenz
                </p>
              </div>
            </div>

            <div className="mt-3 p-3 bg-slate-100 border border-slate-200 rounded-lg print:p-2 print:mt-1.5 print:rounded-none">
              <p className="text-sm text-slate-600 print:text-[10px]">
                <strong>Quellen für CC-Material:</strong> Wikimedia Commons, Pixabay, Unsplash (eigene Lizenz), OER-Plattformen (Open Educational Resources),
                SWISSUbase, ETH-Bibliothek. Prüfen Sie immer die spezifische Lizenz des konkreten Werks.
              </p>
            </div>
          </section>

          {/* 7. Checkliste */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              7. Checkliste vor dem Hochladen in eine KI
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

          {/* 8. KI-generierte Inhalte */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              8. Urheberrecht an KI-generierten Inhalten
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

          {/* 9. Hinweise */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-blue-500 pb-1">
              9. Hinweise
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
