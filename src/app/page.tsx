import Link from "next/link";
import { fragen, ABGEGLICHEN_AM, datumLang, istUmsetzungsfrage } from "@/data/questions";
import { AKZENT, AKZENT_HELL, Box, Etikett, GEDAEMPFT, LINIE, Seitentitel, WeiterLink } from "@/components/ui";

const AKTIVITAETEN = [
  {
    href: "/organisation",
    titel: "Den Aufbau verstehen",
    text: "Wie die Usecases geordnet sind, was die drei Typen von KI-Tools bedeuten und wie die Marken zum Antwortanfang zu lesen sind.",
    register: "Register 2",
  },
  {
    href: "/fragen",
    titel: "Den eigenen Usecase finden",
    text: "Typ des KI-Tools wählen, nach Antwortanfang und Thema filtern oder nach einem Stichwort suchen.",
    register: "Register 3",
  },
  {
    href: "/fragen",
    titel: "Die Antwort im Wortlaut lesen",
    text: "Juristische Formulierung und vollständige Antwort öffnen und die Bedingungen für die eigene Planung festhalten.",
    register: "Register 3",
  },
];

export default function Einstieg() {
  const umsetzung = fragen.filter(istUmsetzungsfrage).length;
  return (
    <>
      <Seitentitel
        etikett="DLH Digital Learning Hub · Sekundarstufe II · Kanton Zürich"
        titel="Welche Usecases darf ich mit KI umsetzen?"
      >
        <p>
          Darf ich ein Schulbuch in eine KI hochladen? Prüfungen mit KI korrigieren lassen? Meine
          Lernenden direkt mit ChatGPT arbeiten lassen? Zu {fragen.length} solchen Fragen aus dem
          Schulalltag liegt eine rechtliche Abklärung vor. Der DLH Digital Learning Hub stellt sie
          hier so einfach wie möglich dar.
        </p>
      </Seitentitel>

      <div className="my-6 grid gap-3.5 sm:grid-cols-2">
        <Box etikett="Inhalt">
          <p>
            {fragen.length} Usecases zum KI-Einsatz an Schulen, jeweils mit praxisnaher Frage,
            juristischer Formulierung und Antwort. {umsetzung} davon fragen direkt, ob etwas
            erlaubt ist («Darf ich …?»); die übrigen klären Haftung, Rechte und Pflichten.
          </p>
        </Box>
        <Box etikett="Ziel">
          <p>
            Sie finden rasch heraus, <strong>ob Sie einen Usecase mit Ihrem KI-Tool umsetzen
            dürfen</strong> und unter welchen Bedingungen – bevor Sie ihn im Unterricht
            einsetzen.
          </p>
        </Box>
      </div>

      <Box etikett="1:1-Fassung der rechtlichen Abklärung" betont>
        <p>
          Alle Fragen und Antworten stehen im <strong>unveränderten Wortlaut</strong> des
          Fragekatalogs Sek II (Fassung FINAL) mit den Antworten der juristischen Abklärung. Es
          wurde nichts gekürzt, zusammengefasst oder umformuliert. Massgebend ist immer der ganze Wortlaut einer Antwort.
        </p>
      </Box>

      <section className="mt-10">
        <Etikett>Aktivität</Etikett>
        <h2 className="mb-2 mt-1.5 text-[clamp(1.25rem,3.4vw,1.55rem)] font-bold leading-tight">
          Was Sie hier tun können
        </h2>
        <p className="mb-4 text-[16.5px] leading-[1.6]">
          Die Register oben führen Schritt für Schritt durch die Seite. Sie können auch direkt zu
          den Fragen springen.
        </p>
        <ol className="grid gap-2.5">
          {AKTIVITAETEN.map((a, i) => (
            <li key={a.titel}>
              <Link
                href={a.href}
                className="grid grid-cols-[auto_1fr] items-baseline gap-3 rounded-[10px] border p-4 hover:border-[#0076bd]"
                style={{ borderColor: LINIE }}
              >
                <span
                  className="inline-grid h-[1.8em] w-[1.8em] place-items-center rounded-full text-[14px] font-semibold"
                  style={{ backgroundColor: AKZENT, color: "#fff" }}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[17px] font-semibold">{a.titel}</span>
                  <span className="mt-0.5 block text-[15.5px] leading-[1.55]" style={{ color: GEDAEMPFT }}>
                    {a.text}
                  </span>
                  <span className="mt-1 block text-[13.5px] font-semibold" style={{ color: AKZENT }}>
                    {a.register} →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8 flex flex-wrap gap-2.5">
        <WeiterLink href="/organisation">Weiter: Organisation der Usecases →</WeiterLink>
        <WeiterLink href="/fragen" hell>
          Direkt zu den Fragen
        </WeiterLink>
      </div>

      <p
        className="mt-10 rounded-[10px] p-3.5 text-[14.5px] leading-[1.55]"
        style={{ backgroundColor: AKZENT_HELL, color: GEDAEMPFT }}
      >
        Stand: {datumLang(ABGEGLICHEN_AM)}. Die Seite ersetzt keine Rechtsberatung. Wie sie
        entstanden ist, steht im{" "}
        <Link href="/impressum" className="underline" style={{ color: AKZENT }}>
          Impressum
        </Link>
        .
      </p>
    </>
  );
}
