"""Erzeugt und prueft die Katalogdaten der Website direkt aus dem Excel.

Die Website darf nur zeigen, was woertlich im Fragekatalog steht. Deshalb
werden die Texte nie von Hand gepflegt, sondern hier unveraendert aus den
Zellen uebernommen (kein Kuerzen, kein Umformulieren, kein Korrigieren von
Tippfehlern).

    python scripts/katalog.py            # src/data/katalog.json neu erzeugen
    python scripts/katalog.py --check    # Abgleich; bricht bei Abweichung ab

Uebernommen werden nur die Spalten A-E (Nr., Praxisnahe Formulierung,
Juristische Formulierung, Themenkategorie, Antwort) sowie die Legende
(Themenkategorien und KI-Modell-Typen). Die Spalten F-I enthalten interne
Notizen und werden bewusst nicht veroeffentlicht.
"""

import argparse
import datetime
import hashlib
import json
import sys
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
EXCEL = ROOT.parent / "Rechtliche Fragen - 251219_FragekatalogSekII_FINAL.xlsx"
OUT = ROOT / "src" / "data" / "katalog.json"

ERWARTETE_KOPFZEILE = {
    "A": "Nr.",
    "B": "Praxisnahe Formulierung (LP)",
    "C": "Juristische Formulierung",
    "D": "Themenkategorie",
    "E": "Antwort valfor",
}
ANZAHL_FRAGEN = 71


def text(cell):
    """Zellinhalt unveraendert als Text; leere Zelle -> None."""
    value = cell.value
    if value is None:
        return None
    if not isinstance(value, str):
        raise SystemExit(f"Zelle {cell.coordinate}: Text erwartet, gefunden {value!r}")
    return value


def lies_excel(pfad: Path) -> dict:
    ws = openpyxl.load_workbook(pfad).active

    kopf = next(
        (r for r in range(1, ws.max_row + 1) if ws.cell(r, 1).value == "Nr."), None
    )
    if kopf is None:
        raise SystemExit("Kopfzeile mit 'Nr.' nicht gefunden")
    for spalte, erwartet in ERWARTETE_KOPFZEILE.items():
        gefunden = ws[f"{spalte}{kopf}"].value
        if gefunden != erwartet:
            raise SystemExit(
                f"Kopfzeile {spalte}{kopf}: erwartet {erwartet!r}, gefunden {gefunden!r}"
            )

    # Legende oberhalb der Kopfzeile
    if (ws["C1"].value, ws["D1"].value, ws["E1"].value) != (
        "Abkürzung",
        "Bezeichnung",
        "Beschreibung",
    ):
        raise SystemExit("Legende der KI-Modell-Typen nicht an erwarteter Stelle (C1:E1)")
    modelle, kategorien = [], []
    for r in range(2, kopf):
        if ws.cell(r, 3).value is not None:
            modelle.append(
                {
                    "abkuerzung": text(ws.cell(r, 3)),
                    "bezeichnung": text(ws.cell(r, 4)),
                    "beschreibung": text(ws.cell(r, 5)),
                }
            )
        if r > 2 and ws.cell(r, 1).value is not None:
            kategorien.append(text(ws.cell(r, 1)))

    fragen = []
    for r in range(kopf + 1, ws.max_row + 1):
        nr = ws.cell(r, 1).value
        if nr is None:
            continue
        frage = {
            "nr": int(nr),
            "zeile": r,
            "praxisfrage": text(ws.cell(r, 2)),
            "juristischeFormulierung": text(ws.cell(r, 3)),
            "themenkategorie": text(ws.cell(r, 4)),
            "antwort": text(ws.cell(r, 5)),
        }
        if frage["praxisfrage"] is None or frage["antwort"] is None:
            raise SystemExit(f"Zeile {r}: Frage oder Antwort fehlt")
        if frage["themenkategorie"] is not None and frage["themenkategorie"] not in kategorien:
            raise SystemExit(f"Zeile {r}: unbekannte Themenkategorie {frage['themenkategorie']!r}")
        fragen.append(frage)

    if [f["nr"] for f in fragen] != list(range(1, ANZAHL_FRAGEN + 1)):
        raise SystemExit(
            f"Erwartet werden die Fragen 1-{ANZAHL_FRAGEN} in Reihenfolge, gefunden: "
            f"{[f['nr'] for f in fragen]}"
        )

    return {
        "quelle": {
            "datei": pfad.name,
            "sha256": hashlib.sha256(pfad.read_bytes()).hexdigest(),
            "spalteAntwort": ERWARTETE_KOPFZEILE["E"],
        },
        "themenkategorien": kategorien,
        "modelle": modelle,
        "fragen": fragen,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--excel", type=Path, default=EXCEL)
    parser.add_argument("--check", action="store_true", help="nur abgleichen, nichts schreiben")
    args = parser.parse_args()

    soll = lies_excel(args.excel)

    if not args.check:
        # Datum der Erzeugung; wird auf der Website als «Stand» angezeigt.
        # Kein Inhalt aus dem Excel, deshalb beim Abgleich nicht verglichen.
        ausgabe = {"abgeglichenAm": datetime.date.today().isoformat(), **soll}
        OUT.write_text(
            json.dumps(ausgabe, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n"
        )
        print(f"{OUT.relative_to(ROOT)} geschrieben: {len(soll['fragen'])} Fragen")
        return 0

    ist = json.loads(OUT.read_text(encoding="utf-8"))
    fehler = []
    for schluessel in ("quelle", "themenkategorien", "modelle"):
        if ist.get(schluessel) != soll[schluessel]:
            fehler.append(f"{schluessel} weicht ab")
    ist_fragen = {f["nr"]: f for f in ist.get("fragen", [])}
    if sorted(ist_fragen) != [f["nr"] for f in soll["fragen"]]:
        fehler.append("Menge der Fragen weicht ab")
    for frage in soll["fragen"]:
        andere = ist_fragen.get(frage["nr"], {})
        for feld, wert in frage.items():
            if andere.get(feld) != wert:
                fehler.append(f"Frage {frage['nr']}: Feld '{feld}' weicht vom Excel ab")
        for feld in andere.keys() - frage.keys():
            fehler.append(f"Frage {frage['nr']}: zusaetzliches Feld '{feld}'")

    if fehler:
        print("ABWEICHUNGEN zwischen Excel und Website-Daten:")
        for zeile in fehler:
            print("  -", zeile)
        return 1
    zeichen = sum(len(f["antwort"]) for f in soll["fragen"])
    print(
        f"OK: {len(soll['fragen'])} Fragen, {zeichen} Zeichen Antworttext, "
        f"alle Felder zeichengenau identisch mit {args.excel.name}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
