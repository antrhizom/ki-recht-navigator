import type { Metadata } from "next";
import {
  fragen,
  THEMENKATEGORIEN,
  MODELLE,
  MODELLTYPEN,
  MODELL_ZEILE,
  istUmsetzungsfrage,
  umsetzbarkeit,
} from "@/data/questions";
import {
  Abschnitt,
  EINSTIEG_GRUPPEN,
  MARKE,
  EinstiegChip,
  Etikett,
  FLAECHE,
  GEDAEMPFT,
  LINIE,
  Seitentitel,
  WeiterLink,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Organisation der Usecases | KI-Recht Navigator",
};

const BEISPIEL_NR = 22;

export default function Organisation() {
  const mitJuristisch = fragen.filter((f) => f.juristischeFormulierung).length;
  const mitModellzeilen = fragen.filter((f) =>
    f.antwort.split("\n").some((z) => MODELL_ZEILE.test(z))
  ).length;
  const umsetzung = fragen.filter(istUmsetzungsfrage).length;
  const ohneKategorie = fragen.filter((f) => !f.themenkategorie).map((f) => f.nr);
  const beispiel = fragen.find((f) => f.nr === BEISPIEL_NR)!;
  const beispielU = umsetzbarkeit(beispiel);

  return (
    <>
      <Seitentitel etikett="Register 2" titel="So sind die Usecases organisiert">
        <p>
          Der Fragekatalog ordnet die {fragen.length} Usecases nach Thema und beantwortet sie oft
          getrennt nach dem Typ des KI-Tools. Wer diese Ordnung kennt, findet die passende Antwort
          schneller.
        </p>
      </Seitentitel>

      <Abschnitt titel="Aufbau eines Usecase">
        <p>Jeder der {fragen.length} Einträge besteht aus denselben Teilen:</p>
        <dl className="grid gap-2.5">
          {[
            ["Nummer und Themenkategorie", "Die Nummer aus dem Fragekatalog (1 bis 71) und eine von fünf Kategorien."],
            ["Praxisnahe Formulierung", "Die Frage, wie sie eine Lehrperson stellt – zum Beispiel «Darf ich Prüfungen mit KI korrigieren lassen?»."],
            [
              "Juristische Formulierung",
              `Dieselbe Frage in rechtlicher Sprache. Sie liegt bei ${mitJuristisch} der ${fragen.length} Fragen vor.`,
            ],
            [
              "Antwort",
              "Die rechtliche Abklärung im vollen Wortlaut. Sie verweist teils auf andere Fragen («vgl. Frage 32»); diese Verweise sind auf der Seite anklickbar.",
            ],
          ].map(([titel, text]) => (
            <div key={titel} className="rounded-[10px] border p-3.5" style={{ borderColor: LINIE }}>
              <dt className="font-semibold">{titel}</dt>
              <dd className="mt-0.5 text-[15.5px]" style={{ color: GEDAEMPFT }}>
                {text}
              </dd>
            </div>
          ))}
        </dl>
      </Abschnitt>

      <Abschnitt titel="Fünf Themenkategorien">
        <p>Die Kategorien stammen aus dem Fragekatalog:</p>
        <ul className="grid gap-1.5">
          {THEMENKATEGORIEN.map((k) => (
            <li
              key={k}
              className="flex items-baseline justify-between gap-3 rounded-[8px] px-3.5 py-2"
              style={{ backgroundColor: FLAECHE }}
            >
              <span>{k}</span>
              <span className="text-[14.5px] whitespace-nowrap" style={{ color: GEDAEMPFT }}>
                {fragen.filter((f) => f.themenkategorie === k).length} Fragen
              </span>
            </li>
          ))}
        </ul>
        {ohneKategorie.length > 0 && (
          <p className="text-[15px]" style={{ color: GEDAEMPFT }}>
            Frage {ohneKategorie.join(", ")} hat im Fragekatalog keine Kategorie.
          </p>
        )}
      </Abschnitt>

      <Abschnitt id="typen" titel="Drei Typen von KI-Tools">
        <p>
          Ob ein Usecase erlaubt ist, hängt oft davon ab, was mit den eingegebenen Daten geschieht.
          Die Abklärung unterscheidet deshalb Typen von KI-Tools. {mitModellzeilen} Antworten haben
          eine eigene Zeile für jeden der drei Typen {MODELLTYPEN.join(", ")}. Die Beschreibungen
          stehen hier im Wortlaut der Abklärung:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODELLE.map((m) => {
            const abk = m.abkuerzung.trim();
            return (
              <div
                key={abk}
                className="rounded-[10px] border p-3.5"
                style={{ borderColor: LINIE, backgroundColor: FLAECHE }}
              >
                <p className="text-[16px] font-semibold">
                  {m.abkuerzung}
                  <span className="font-normal" style={{ color: GEDAEMPFT }}>
                    {" "}
                    · {m.bezeichnung}
                  </span>
                </p>
                <p className="mt-1.5 whitespace-pre-line text-[14.5px] leading-[1.55] text-[#3a3e44]">
                  {m.beschreibung}
                </p>
                {!(MODELLTYPEN as string[]).includes(abk) && (
                  <p className="mt-2 text-[13.5px]" style={{ color: GEDAEMPFT }}>
                    Oberbegriff für GKImW und GKIoW.
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-[15.5px]" style={{ color: GEDAEMPFT }}>
          Welchem Typ ein bestimmtes Tool angehört, beantwortet der Fragekatalog nicht. Massgebend
          sind die Beschreibungen oben: was mit den Eingaben und weiteren Daten tatsächlich
          geschieht – wer sie bearbeitet, wo sie gespeichert werden, wer darauf zugreifen kann und
          ob sie für eigene Zwecke genutzt werden. Bei GKIoW müssen sämtliche Daten innerhalb der
          Verwaltung bleiben.
        </p>
      </Abschnitt>

      <Abschnitt titel="Fragen zur Umsetzung und weitere Rechtsfragen">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[10px] border p-3.5" style={{ borderColor: LINIE }}>
            <p className="font-semibold">Fragen zur Umsetzung ({umsetzung})</p>
            <p className="mt-1 text-[15.5px]" style={{ color: GEDAEMPFT }}>
              Die praxisnahe Frage beginnt mit «Darf», «Dürfen» oder «Kann». Sie fragt direkt, ob
              ein Usecase erlaubt ist.
            </p>
          </div>
          <div className="rounded-[10px] border p-3.5" style={{ borderColor: LINIE }}>
            <p className="font-semibold">Weitere Rechtsfragen ({fragen.length - umsetzung})</p>
            <p className="mt-1 text-[15.5px]" style={{ color: GEDAEMPFT }}>
              Zum Beispiel: Wer haftet? Wem gehören die Rechte am Ergebnis? Muss ich informieren
              oder dokumentieren?
            </p>
          </div>
        </div>
      </Abschnitt>

      <Abschnitt id="marken" titel="Marken zum Antwortanfang lesen">
        <p>
          Unter jeder Frage zur Umsetzung zeigt die Seite graue Marken. Sie{" "}
          <strong>zitieren nur die ersten Worte der Antwort</strong> – bei Antworten mit einer
          Zeile pro Typ die ersten Worte jeder Zeile. Sie prüfen keine rechtlichen Voraussetzungen
          und sind weder eine Freigabe noch ein Verbot.
        </p>
        <ul className="grid gap-1.5">
          {EINSTIEG_GRUPPEN.map((g) => {
            return (
              <li key={g.gruppe} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[14px] font-medium"
                  style={{ backgroundColor: MARKE.bg, color: MARKE.fg }}
                >
                  {g.titel}
                </span>
                <span className="text-[15.5px]" style={{ color: GEDAEMPFT }}>
                  Die Antwort beginnt mit {g.beginnt}.
                </span>
              </li>
            );
          })}
        </ul>

        {beispielU?.art === "proModell" && (
          <div className="rounded-[10px] border p-4" style={{ borderColor: LINIE }}>
            <Etikett>Beispiel: Frage {beispiel.nr}</Etikett>
            <p className="mt-1 font-semibold">{beispiel.praxisfrage}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {MODELLTYPEN.map((m) => (
                <EinstiegChip key={m} info={beispielU.proModell[m]} vorsatz={m} />
              ))}
            </div>
            <p className="mt-2.5 text-[15px]" style={{ color: GEDAEMPFT }}>
              Die Antwort hat eine Zeile pro Typ. Die Zeile zu GKImW beginnt mit «Möglich unter»
              und nennt danach die Bedingungen. Die Antwort zu Frage 32 verlangt für GKImW
              vergleichbare Bedingungen, beginnt aber mit «Ja». Gleiche Voraussetzungen können also
              hinter unterschiedlichen Anfängen stehen.
            </p>
          </div>
        )}

        <p className="rounded-[10px] p-3.5 text-[15.5px]" style={{ backgroundColor: FLAECHE }}>
          <strong>Wichtig:</strong> Auch ein «Ja» ist oft an Bedingungen geknüpft, etwa an die
          Verhältnismässigkeit oder an eine vollständige Anonymisierung. Ein «Nein» kann im
          weiteren Text Ausnahmen nennen oder nur für bestimmte Daten gelten. Antworten ohne
          eigene Zeile pro Typ gelten nicht speziell für einen Typ und betreffen teils nur einen
          Teilaspekt, etwa den Serverstandort. Lesen Sie vor dem Einsatz immer die ganze Antwort.
        </p>
      </Abschnitt>

      <div className="mt-8 flex flex-wrap gap-2.5">
        <WeiterLink href="/fragen">Weiter: Fragen filtern →</WeiterLink>
        <WeiterLink href="/" hell>
          Zurück zum Einstieg
        </WeiterLink>
      </div>
    </>
  );
}
