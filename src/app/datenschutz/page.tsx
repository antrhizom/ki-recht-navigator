"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export default function DatenschutzPage() {
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
              href="/urheberrecht"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Urheberrecht-Info →
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 cursor-pointer"
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
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0 print:w-8 print:h-8">
                <svg className="w-7 h-7 text-white print:w-5 print:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 print:text-xl">
                  Datenschutz beim KI-Einsatz an Schulen
                </h1>
                <p className="text-sm text-slate-500 mt-1 print:text-xs">
                  Information für Lehrpersonen | Kanton Zürich | Basierend auf dem IDG und dem Fragekatalog Sek II
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 print:p-2 print:rounded-none">
              <p className="text-sm text-emerald-800 print:text-[11px]">
                <strong>Dieses Dokument</strong> fasst die wichtigsten datenschutzrechtlichen Grundsätze zusammen,
                die Lehrpersonen beim Einsatz von KI-Tools beachten müssen. Es basiert auf dem kantonalen
                Gesetz über die Information und den Datenschutz (IDG) des Kantons Zürich und den juristischen
                Bewertungen des Fragekatalogs Sek II. <strong>Es ersetzt keine Rechtsberatung.</strong>
              </p>
            </div>
          </header>

          {/* 1. Rechtlicher Rahmen */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-emerald-500 pb-1">
              1. Rechtlicher Rahmen
            </h2>
            <p className="text-sm text-slate-600 mb-3 print:text-[11px] print:mb-1.5">
              Schulen im Kanton Zürich sind öffentliche Organe und unterstehen dem <strong>Gesetz über die Information
              und den Datenschutz (IDG)</strong>. Dieses regelt, wie Personendaten bearbeitet werden dürfen. Ergänzend kann das
              Bundesgesetz über den Datenschutz (DSG) relevant sein. Lehrpersonen agieren als Teil des
              öffentlichen Organs «Schule».
            </p>
          </section>

          {/* 2. Personendaten im Schulkontext */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-emerald-500 pb-1">
              2. Personendaten im Schulkontext
            </h2>
            <div className="grid grid-cols-2 gap-4 print:gap-2">
              <div className="p-3 border border-slate-200 rounded-lg print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-slate-700 mb-2 print:text-[11px] print:mb-1">Gewöhnliche Personendaten</h3>
                <ul className="text-sm text-slate-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>• Namen, E-Mail-Adressen, Klassenzugehörigkeit</li>
                  <li>• Noten und Prüfungsergebnisse</li>
                  <li>• Schülerarbeiten (Aufsätze, Präsentationen, Lösungen)</li>
                  <li>• Chat- und Kommunikationsprotokolle</li>
                  <li>• Lernstandsdaten, Feedbacks</li>
                </ul>
              </div>
              <div className="p-3 border-2 border-red-300 rounded-lg bg-red-50 print:p-2 print:rounded-none">
                <h3 className="text-sm font-bold text-red-700 mb-2 print:text-[11px] print:mb-1">Besonders schützenswerte Personendaten</h3>
                <ul className="text-sm text-red-600 space-y-1 print:text-[10px] print:space-y-0">
                  <li>• Gesundheitsdaten, Lernschwächen</li>
                  <li>• Disziplinarmassnahmen</li>
                  <li>• Biometrische Daten (Stimmaufnahmen zur Identifikation)</li>
                  <li>• Profile (automatisierte Auswertung: Profiling)</li>
                  <li>• Fotos und Videos von Schüler:innen</li>
                </ul>
                <p className="text-xs text-red-500 mt-2 italic print:text-[9px] print:mt-1">
                  → Erfordern besondere Schutzmassnahmen und DSFA
                </p>
              </div>
            </div>
          </section>

          {/* 3. Die drei KI-Modell-Typen */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-emerald-500 pb-1">
              3. Die drei KI-Modell-Typen und ihre datenschutzrechtliche Bewertung
            </h2>

            {/* OKI */}
            <div className="mb-3 p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg print:p-2 print:mb-2 print:rounded-none">
              <h3 className="text-sm font-bold text-red-700 mb-1 print:text-[11px]">
                OKI – Offene KI-Modelle
              </h3>
              <p className="text-xs text-red-600 italic mb-2 print:text-[10px] print:mb-1">
                z.B. ChatGPT Free, Gemini Free – Daten werden für Training/eigene Zwecke des Anbieters genutzt
              </p>
              <ul className="text-sm text-red-700 space-y-1 print:text-[10px] print:space-y-0">
                <li>✗ <strong>Keine Personendaten</strong> eingeben</li>
                <li>✗ <strong>Keine Verpflichtung</strong> der SuS zur Nutzung (wenn Personendaten erforderlich)</li>
                <li>✗ <strong>Amtsgeheimnis</strong> wird bei vertraulichen Informationen verletzt</li>
                <li>✗ Bekanntgabe nur mit Einwilligung im Einzelfall möglich (umstritten bei kontinuierlichem Einsatz)</li>
                <li>✓ Nutzung <strong>ohne Personendaten</strong> grundsätzlich möglich (Unterrichtsplanung, Ideengenerierung)</li>
              </ul>
            </div>

            {/* GKImW */}
            <div className="mb-3 p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg print:p-2 print:mb-2 print:rounded-none">
              <h3 className="text-sm font-bold text-amber-700 mb-1 print:text-[11px]">
                GKImW – Geschlossene KI mit Weitergabe
              </h3>
              <p className="text-xs text-amber-600 italic mb-2 print:text-[10px] print:mb-1">
                z.B. ChatGPT Enterprise/Edu, Azure OpenAI, schulische KI-Plattformen mit externem Hosting
              </p>
              <ul className="text-sm text-amber-700 space-y-1 print:text-[10px] print:space-y-0">
                <li>⚠ Personendaten nur mit <strong>Auftragsdatenbearbeitungsvertrag</strong> (RR IT-AGB)</li>
                <li>⚠ <strong>DSFA</strong> (Datenschutzfolgenabschätzung) ist Pflicht</li>
                <li>⚠ <strong>Verhältnismässigkeitsprinzip</strong> stets prüfen</li>
                <li>⚠ Besonders schützenswerte PD erfordern <strong>zusätzliche Schutz- und Sicherheitsvorkehrungen</strong></li>
                <li>⚠ Grenzüberschreitende Bekanntgabe: Voraussetzungen prüfen</li>
                <li>✓ Bei Erfüllung aller Voraussetzungen: Personendaten grundsätzlich möglich</li>
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

              {/* GKIoW-Lokal */}
              <div className="ml-2 mb-2 p-2 bg-emerald-100/50 rounded border border-emerald-200 print:p-1 print:mb-1">
                <p className="text-xs font-bold text-emerald-800 mb-1 print:text-[10px]">
                  Variante 1: GKIoW-Lokal – auf eigenem Gerät oder eigener Infrastruktur
                </p>
                <p className="text-xs text-slate-600 print:text-[9px]">
                  z.B. lokal installierte Modelle (LM Studio, Ollama), schulinterne Server, kantonale On-Premise-Lösungen.
                  Daten verlassen das Gerät bzw. das Schulnetz <strong>nie</strong>.
                </p>
              </div>

              {/* GKIoW-Cloud */}
              <div className="ml-2 mb-2 p-2 bg-emerald-100/50 rounded border border-emerald-200 print:p-1 print:mb-1">
                <p className="text-xs font-bold text-emerald-800 mb-1 print:text-[10px]">
                  Variante 2: GKIoW-Cloud – registrierter Cloud-Dienst ohne Training und ohne dauerhafte Speicherung
                </p>
                <p className="text-xs text-slate-600 print:text-[9px]">
                  z.B. ein KI-Dienst im Internet, bei dem man sich registriert, aber der Anbieter vertraglich zusichert:
                  kein Training mit Eingabedaten, keine dauerhafte Speicherung der Prompts, eingeschränkter Zugriff.
                  Vergleichbar mit einer <strong>Cloud wie Microsoft 365</strong>: Dokumente können temporär gespeichert werden,
                  aber der Zugriff ist auf den registrierten Nutzer beschränkt – genau wie in einer Cloud, wo nur berechtigte
                  Personen auf Dateien zugreifen können. Die Daten verbleiben in einer geschützten Umgebung.
                </p>
              </div>

              <ul className="text-sm text-emerald-700 space-y-1 print:text-[10px] print:space-y-0">
                <li>✓ Gewöhnliche Personendaten grundsätzlich <strong>zulässig</strong></li>
                <li>✓ <strong>Sicherste Option</strong> für den schulischen Einsatz</li>
                <li>⚠ Verhältnismässigkeitsprinzip weiterhin beachten</li>
              </ul>
            </div>
          </section>

          {/* 4. Zentrale Grundsätze */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-emerald-500 pb-1">
              4. Zentrale Grundsätze
            </h2>
            <table className="w-full text-sm border-collapse print:text-[10px]">
              <thead>
                <tr className="bg-emerald-100">
                  <th className="text-left p-2 border border-emerald-200 font-bold text-emerald-800 print:p-1">Grundsatz</th>
                  <th className="text-left p-2 border border-emerald-200 font-bold text-emerald-800 print:p-1">Bedeutung für den KI-Einsatz</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Verhältnismässigkeit</td>
                  <td className="p-2 border border-slate-200 print:p-1">Die Datenbearbeitung muss geeignet und erforderlich sein. Nicht erheblich invasiver als bei analoger Bearbeitung.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Zweckbindung</td>
                  <td className="p-2 border border-slate-200 print:p-1">Daten dürfen nur für den vorgesehenen Zweck (Unterricht, Bewertung) verwendet werden.</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Transparenz</td>
                  <td className="p-2 border border-slate-200 print:p-1">Bei bestimmten Einsatzszenarien (z.B. Plagiatsprüfung) müssen SuS informiert werden. Sonst empfohlen.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Datensicherheit</td>
                  <td className="p-2 border border-slate-200 print:p-1">Die Schule ist verantwortlich für angemessene technische und organisatorische Massnahmen.</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Datenminimierung</td>
                  <td className="p-2 border border-slate-200 print:p-1">Nur so viele Daten wie nötig eingeben. Speicherdauer auf das Notwendige beschränken.</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 5. Checkliste */}
          <section className="mb-6 print:mb-3 print:break-before-page">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-emerald-500 pb-1">
              5. Checkliste vor dem KI-Einsatz mit Personendaten
            </h2>
            <div className="space-y-2 print:space-y-1">
              {[
                { nr: 1, text: "Welche Art von Daten gebe ich ein? (Keine PD → alle Modelle möglich)" },
                { nr: 2, text: "Welcher KI-Modell-Typ liegt vor? (OKI / GKImW / GKIoW)" },
                { nr: 3, text: "Ist die Bearbeitung verhältnismässig? (Geeignet und erforderlich?)" },
                { nr: 4, text: "Sind besonders schützenswerte PD betroffen? (→ Besondere Massnahmen, DSFA)" },
                { nr: 5, text: "Wo werden die Daten gespeichert? (CH/EU = OK, USA = nur mit Framework + Verschlüsselung)" },
                { nr: 6, text: "Bestehen vertragliche Vorkehrungen? (Bei GKImW: Auftragsdatenbearbeitungsvertrag)" },
                { nr: 7, text: "Wurde eine DSFA durchgeführt? (Bei GKImW mit PD: Pflicht)" },
                { nr: 8, text: "Müssen SuS/Eltern informiert werden? (Plagiatssoftware: Ja. Sonst: empfohlen)" },
                { nr: 9, text: "Können SuS zur Nutzung verpflichtet werden? (OKI: Nein bei PD-Pflicht)" },
                { nr: 10, text: "Ist die Anonymisierung ausreichend? (Namen entfernen allein genügt i.d.R. nicht)" },
              ].map((item) => (
                <div key={item.nr} className="flex items-start gap-3 p-2 border border-slate-200 rounded print:p-1 print:rounded-none">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 print:w-4 print:h-4 print:text-[9px]">
                    {item.nr}
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-4 h-4 border-2 border-slate-300 rounded print:w-3 print:h-3 flex-shrink-0" />
                    <p className="text-sm text-slate-600 print:text-[10px]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Spezialhinweise */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-emerald-500 pb-1">
              6. Wichtige Spezialhinweise
            </h2>
            <div className="space-y-3 print:space-y-1.5">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg print:p-2 print:rounded-none">
                <p className="text-sm font-bold text-red-700 mb-1 print:text-[11px]">ChatGPT (Grundversionen)</p>
                <p className="text-sm text-red-600 print:text-[10px]">
                  In ChatGPT (Konsumentenversionen) dürfen <strong>keinerlei Personendaten</strong> eingegeben werden,
                  da OpenAI keine genügenden datenschutzrechtlichen Zusicherungen abgibt. Enterprise-/Edu-Versionen
                  bedürfen einer eingehenden Prüfung.
                </p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg print:p-2 print:rounded-none">
                <p className="text-sm font-bold text-red-700 mb-1 print:text-[11px]">Besonders schützenswerte Personendaten gehören nicht in KI-Tools</p>
                <p className="text-sm text-red-600 print:text-[10px]">
                  Besonders schützenswerte Personendaten (Gesundheitsdaten, Lernschwächen, Disziplinarfälle, sensible
                  Elternkorrespondenz) gehören <strong>in keine KI</strong> – auch nicht in GKIoW-Systeme auf dem eigenen Gerät.
                  Solche Daten sind ausschliesslich in <strong>geschützten Verwaltungsumgebungen</strong> (z.B. kantonale
                  Schulverwaltungssysteme, geschützte Fachapplikationen) zu bearbeiten und zu speichern,
                  nicht auf individuellen Geräten von Lehrpersonen.
                </p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg print:p-2 print:rounded-none">
                <p className="text-sm font-bold text-amber-700 mb-1 print:text-[11px]">Amtsgeheimnis</p>
                <p className="text-sm text-amber-600 print:text-[10px]">
                  Die Eingabe vertraulicher Informationen in OKI oder GKImW kann das Amtsgeheimnis verletzen.
                  Vertrauliche Inhalte gehören grundsätzlich nur in geschützte Verwaltungsumgebungen.
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg print:p-2 print:rounded-none">
                <p className="text-sm font-bold text-blue-700 mb-1 print:text-[11px]">Haftung</p>
                <p className="text-sm text-blue-600 print:text-[10px]">
                  Die Schule ist für die Datensicherheit verantwortlich. Bei Datenverlust greift die Staatshaftung
                  der Gemeinde, die unter Umständen Regress auf Angestellte nehmen kann. Lehrpersonen bleiben
                  für Bewertungsentscheide verantwortlich, auch wenn KI-Tools eingesetzt werden.
                </p>
              </div>
              <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg print:p-2 print:rounded-none">
                <p className="text-sm font-bold text-slate-700 mb-1 print:text-[11px]">Einwilligung</p>
                <p className="text-sm text-slate-600 print:text-[10px]">
                  Eine explizite Einwilligung der Erziehungsberechtigten ist für den KI-Einsatz grundsätzlich nicht erforderlich.
                  Es gelten die allgemeinen datenschutzrechtlichen Grenzen. Urteilsfähige Minderjährige
                  können selbst einwilligen.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Grenzüberschreitende Datenübermittlung */}
          <section className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 mb-3 print:text-sm print:mb-1.5 border-b-2 border-emerald-500 pb-1">
              7. Grenzüberschreitende Datenübermittlung
            </h2>
            <table className="w-full text-sm border-collapse print:text-[10px]">
              <thead>
                <tr className="bg-emerald-100">
                  <th className="text-left p-2 border border-emerald-200 font-bold print:p-1">Serverstandort</th>
                  <th className="text-left p-2 border border-emerald-200 font-bold print:p-1">Bewertung</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Schweiz</td>
                  <td className="p-2 border border-slate-200 print:p-1">✓ Kein Problem</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">EU/EWR</td>
                  <td className="p-2 border border-slate-200 print:p-1">✓ Angemessenes Datenschutzniveau. Vorsicht bei US-Muttergesellschaften (CLOUD Act).</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">USA</td>
                  <td className="p-2 border border-slate-200 print:p-1">⚠ Nur bei Unternehmen mit Swiss-U.S. Data Privacy Framework. Besondere PD nur verschlüsselt.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 border border-slate-200 font-semibold print:p-1">Unbekannt</td>
                  <td className="p-2 border border-slate-200 print:p-1">✗ Nicht zulässig für Personendaten.</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Footer */}
          <footer className="mt-8 pt-4 border-t border-slate-300 print:mt-4 print:pt-2">
            <p className="text-xs text-slate-400 print:text-[9px]">
              Basierend auf dem Fragekatalog Sek II (FINAL) | Rechtliche Fragen zum KI-Einsatz an Schulen im
              Kanton Zürich | Erstellt von valfor | <strong>Diese Informationen stellen keine Rechtsberatung dar.</strong>
            </p>
            <p className="text-xs text-slate-400 mt-1 print:text-[9px]">
              Weiterführend: KI-Recht Navigator (ki-recht-navigator.vercel.app) | ECRC42 (EduCopyrightCheck) für Urheberrechts-Checklisten
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
