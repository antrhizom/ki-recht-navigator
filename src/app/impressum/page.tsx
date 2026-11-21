import type { Metadata } from "next";
import { Seitentitel, LINIE } from "@/components/ui";
import { fragen, ABGEGLICHEN_AM, datumLang } from "@/data/questions";

export const metadata: Metadata = {
  title: "Impressum und Entstehung | KI-Recht Navigator",
  description: "Quelle, Stand und Entstehung des KI-Recht Navigators.",
};

function Abschnitt({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="border-t pb-2 pt-6" style={{ borderColor: LINIE }}>
      <h2 className="mb-2.5 text-[19px] font-bold">{titel}</h2>
      <div className="space-y-3 text-[16px] leading-[1.6]">{children}</div>
    </section>
  );
}

export default function Impressum() {
  const stand = datumLang(ABGEGLICHEN_AM);
  return (
    <>
      <Seitentitel etikett="Impressum" titel="Impressum und Entstehung" />
      <div className="space-y-2">
        <Abschnitt titel="Herausgeber">
          <p>DLH Digital Learning Hub</p>
        </Abschnitt>

        <Abschnitt titel="Stand">
          <p>
            Letzte Aktualisierung: <strong>{stand}</strong>. An diesem Tag wurden alle{" "}
            {fragen.length} Fragen und Antworten neu aus dem Fragekatalog übernommen und
            zeichengenau mit ihm abgeglichen.
          </p>
        </Abschnitt>

        <Abschnitt titel="Quelle der Inhalte">
          <p>
            Die Fragen und Antworten stammen aus dem «Fragekatalog Sek II» (Fassung FINAL,
            Dateibezeichnung 251219). Er umfasst {fragen.length} Fragen aus der Schulpraxis zum
            Einsatz von künstlicher Intelligenz an Schulen im Kanton Zürich.
          </p>
          <p>
            Übernommen sind die Spalten «Praxisnahe Formulierung (LP)», «Juristische
            Formulierung», «Themenkategorie» und «Antwort» sowie die Legende zu
            den Themenkategorien und den KI-Modell-Typen. Der Fragekatalog wurde durch den Rechtsdienst MBA geprüft.
          </p>
          <p>
            Der Wortlaut ist 1:1 übernommen: Es wurde nichts gekürzt, zusammengefasst, umformuliert
            oder korrigiert. Auch Schreibweisen und Tippfehler entsprechen dem Katalog. Die Fragen
            und Antworten auf dieser Seite sind deshalb keine eigene Zusammenfassung.
          </p>
        </Abschnitt>

        <Abschnitt titel="Was diese Seite hinzufügt">
          <p>
            Die Seite gliedert den Katalog in drei Register (Einstieg, Organisation der Usecases, Fragen filtern) und macht ihn durchsuchbar und filterbar. Die Filter verändern keinen
            Text; sie bestimmen nur, welche Fragen angezeigt werden. Die Sprunglinks «In der
            Antwort erwähnte Fragen» führen zu den Fragen, deren Nummer im Antworttext genannt
            ist.
          </p>
          <p>
            <strong>Filter «Umsetzbarkeit»:</strong> Er gilt für die Fragen, deren praxisnahe
            Formulierung mit «Darf», «Dürfen» oder «Kann» beginnt. Ein Programm ordnet sie
            ausschliesslich nach den ersten Worten der Antwort: «Ja», «Zulässig» oder
            «Grundsätzlich ja»; «Möglich unter»; «Nein», «Nicht zulässig» oder «Grundsätzlich
            nein». Unterscheidet die Antwort nach OKI, GKImW und GKIoW, gelten die ersten Worte
            der jeweiligen Zeile. Alles andere steht unter «Differenziert – Wortlaut lesen».
          </p>
          <p>
            Diese Ordnung ist eine Lesehilfe und keine eigene rechtliche Einstufung. Sie zitiert
            Worte aus der Antwort, bewertet aber nicht, was danach steht: Auch ein «Ja» kann an
            Bedingungen geknüpft sein. Massgebend ist immer der ganze Wortlaut.
          </p>
          <p>
            Arbeitsnotizen, die im Katalog neben einzelnen Antworten stehen, sind nicht Teil der
            Antworten und werden hier nicht wiedergegeben.
          </p>
        </Abschnitt>

        <Abschnitt titel="Entstehung">
          <p>
            <strong>Februar 2026:</strong> Eine erste Fassung des Navigators entstand als
            Web-Anwendung auf der Grundlage des Fragekatalogs. Sie zeigte gekürzte und
            umformulierte Antworten und leitete daraus pro KI-Modell-Typ eine Ampel ab.
          </p>
          <p>
            <strong>November 2026:</strong> Nach einem Hinweis wurden alle {fragen.length}{" "}
            Einträge mit dem Katalog verglichen. Der Vergleich zeigte, dass die Kurzfassungen und
            die Ampel nicht dem Wortlaut entsprachen und teilweise Aussagen enthielten, die im
            Katalog nicht stehen.
          </p>
          <p>
            <strong>{stand}:</strong> Kurzfassungen, Ampel und Statistik wurden entfernt. Seither
            werden die Texte nicht mehr von Hand gepflegt, sondern von einem Programm direkt aus
            dem Katalog übernommen. Ein automatischer Abgleich prüft jedes Feld Zeichen für
            Zeichen und meldet jede Abweichung.
          </p>
          <p>
            Die Überarbeitung und der Abgleich erfolgten mit Unterstützung eines KI-Assistenten
            (Claude Code). An den Fragen und Antworten hat die KI nichts formuliert. Die
            erklärenden Texte in den Registern «Einstieg» und «Organisation der Usecases» sind
            mit KI-Unterstützung entstanden; sie beschreiben die Seite und den Aufbau des
            Katalogs, nehmen aber keine rechtliche Einstufung vor.
          </p>
        </Abschnitt>

        <Abschnitt titel="Rechtlicher Hinweis">
          <p>
            Diese Informationen stellen keine Rechtsberatung dar. Massgebend ist der Fragekatalog
            in seiner jeweils gültigen Fassung.
          </p>
        </Abschnitt>
      </div>
    </>
  );
}
