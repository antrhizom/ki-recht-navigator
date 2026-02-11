export type KIModelType = "OKI" | "GKImW" | "GKIoW";

export type Status = "erlaubt" | "eingeschraenkt" | "nicht_erlaubt" | "unklar";

export interface KIModelInfo {
  type: KIModelType;
  label: string;
  description: string;
}

export interface Assessment {
  model: KIModelType;
  status: Status;
  details: string;
}

export interface Question {
  id: number;
  practicalQuestion: string;
  legalFormulation: string | null;
  category: string;
  answer: string;
  assessments: Assessment[];
  references: number[];
}

export const KI_MODELS: KIModelInfo[] = [
  {
    type: "OKI",
    label: "Offene KI-Modelle",
    description:
      "Der Hersteller/Betreiber hat Zugriff auf Eingabedaten und nutzt diese für Training bzw. Weiterentwicklung oder für sonstige eigene (kommerzielle) Zwecke. Es liegt eine Bekanntgabe vor, die nur mit gesetzlicher Grundlage oder Einwilligung möglich ist.",
  },
  {
    type: "GKImW",
    label: "Geschlossene KI mit Weitergabe",
    description:
      "Input oder sonstige Daten werden extern gespeichert oder von Dritten bearbeitet. Es liegt eine Auftragsdatenbearbeitung vor, die vertragliche Regelungen (RR IT-AGB) erfordert. Bei grenzüberschreitender Bekanntgabe gelten zusätzliche Voraussetzungen.",
  },
  {
    type: "GKIoW",
    label: "Geschlossene KI ohne Weitergabe",
    description:
      "Sämtliche Daten verbleiben innerhalb der Verwaltung und werden vollständig innerhalb der jeweiligen Verwaltungseinheit bearbeitet und gespeichert.",
  },
];

export const CATEGORIES = [
  {
    name: "Unterrichtsmaterialien & Urheberrecht",
    color: "#3B82F6",
    icon: "BookOpen",
    description: "Fragen zum Hochladen und Bearbeiten von urheberrechtlich geschützten Materialien in KI-Tools",
  },
  {
    name: "Schüler:innendaten & Datenschutz",
    color: "#10B981",
    icon: "Shield",
    description: "Fragen zum Umgang mit personenbezogenen Daten von Schülerinnen und Schülern",
  },
  {
    name: "Leistungsbewertung & Prüfungen",
    color: "#F59E0B",
    icon: "ClipboardCheck",
    description: "Fragen zur automatisierten Bewertung und zum Einsatz von KI bei Prüfungen",
  },
  {
    name: "Kommunikation & Interaktion mit KI",
    color: "#8B5CF6",
    icon: "MessageCircle",
    description: "Fragen zur direkten Nutzung von KI durch Lehrpersonen und Schüler:innen",
  },
  {
    name: "Technische Infrastruktur & Verantwortlichkeiten",
    color: "#EF4444",
    icon: "Settings",
    description: "Fragen zu Haftung, Verantwortung und organisatorischen Rahmenbedingungen",
  },
];

function parseStatus(text: string, model: KIModelType): Status {
  const lower = text.toLowerCase();

  if (model === "OKI") {
    if (lower.includes("nicht zulässig") || lower.includes("nein") || lower.includes("unter keinen")) {
      return "nicht_erlaubt";
    }
    if (lower.includes("zulässig") || lower.includes("ja") || lower.includes("möglich")) {
      return "eingeschraenkt";
    }
    return "nicht_erlaubt";
  }

  if (model === "GKImW") {
    if (lower.includes("nicht zulässig") || lower.includes("nein")) {
      return "nicht_erlaubt";
    }
    if (lower.includes("möglich unter") || lower.includes("wahrung") || lower.includes("dsfa") || lower.includes("vertraglichen vorkehrungen") || lower.includes("einschränkung")) {
      return "eingeschraenkt";
    }
    if (lower.includes("zulässig") || lower.includes("ja")) {
      return "eingeschraenkt";
    }
    return "unklar";
  }

  if (model === "GKIoW") {
    if (lower.includes("nicht zulässig") || lower.includes("nein")) {
      return "nicht_erlaubt";
    }
    if (lower.includes("ja") || lower.includes("zulässig")) {
      if (lower.includes("unter wahrung") || lower.includes("einschränkung")) {
        return "eingeschraenkt";
      }
      return "erlaubt";
    }
    if (lower.includes("möglich")) {
      return "eingeschraenkt";
    }
    return "unklar";
  }

  return "unklar";
}

function extractModelAssessments(answer: string): Assessment[] {
  const assessments: Assessment[] = [];

  // Try to extract OKI section
  const okiMatch = answer.match(/OKI\s*:\s*([\s\S]*?)(?=\nGKImW\s*:|$)/i);
  const gkimwMatch = answer.match(/GKImW\s*:\s*([\s\S]*?)(?=\nGKIoW\s*:|$)/i);
  const gkiowMatch = answer.match(/GKIoW\s*:\s*([\s\S]*?)(?=\n(?:Hinweis|Wichtig|Achtung|Ergänzend|Bei )|$)/i);

  if (okiMatch) {
    const text = okiMatch[1].trim();
    assessments.push({
      model: "OKI",
      status: parseStatus(text, "OKI"),
      details: text,
    });
  }

  if (gkimwMatch) {
    const text = gkimwMatch[1].trim();
    assessments.push({
      model: "GKImW",
      status: parseStatus(text, "GKImW"),
      details: text,
    });
  }

  if (gkiowMatch) {
    const text = gkiowMatch[1].trim();
    assessments.push({
      model: "GKIoW",
      status: parseStatus(text, "GKIoW"),
      details: text,
    });
  }

  return assessments;
}

function extractReferences(answer: string): number[] {
  const refs: number[] = [];
  const matches = answer.matchAll(/(?:Frage|Fragen)\s+([\d,\s]+(?:und\s+\d+)?)/gi);
  for (const match of matches) {
    const nums = match[1].matchAll(/\d+/g);
    for (const num of nums) {
      const n = parseInt(num[0]);
      if (n >= 1 && n <= 71 && !refs.includes(n)) {
        refs.push(n);
      }
    }
  }
  return refs;
}

export const questions: Question[] = [
  {
    id: 1,
    practicalQuestion: "Darf ich ein Schulbuch in eine KI hochladen, um daraus Übungen zu erstellen?",
    legalFormulation: "Ist das Hochladen urheberrechtlich geschützter Werke (z. B. Lehrmittel) in ein KI-System zur Generierung von Übungsaufgaben mit dem Urheberrecht und den Schrankenregelungen im Kanton Zürich vereinbar?",
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Vorbemerkung: Die Erstellung von Übungsfragen durch ein KI-Tool erfolgt auf technischer Ebene durch verschiedene Schritte (Hochladen, Bereinigen, Segmentieren, Tokenisieren etc.), welche aus urheberrechtlicher Sicht als Vervielfältigung oder Bearbeitung zu qualifizieren wären.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig. Dafür wäre die Zustimmung des Rechtsinhabers (Verlag) erforderlich." },
      { model: "GKImW", status: "eingeschraenkt", details: "Das Hochladen (Vervielfältigung) ist zulässig unter der Eigengebrauchsschranke. Die Bearbeitung ist nur möglich, wenn die Kontrolle über die Werke vollständig bei der Lehrperson verbleibt. Es darf keine (weitgehend) vollständige Vervielfältigung des Werkexemplars erfolgen." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Soweit die Kontrolle bei der Lehrperson verbleibt, handelt es sich um schulinternen Gebrauch (zulässig inkl. Bearbeitung). Wenn die Schule involviert ist, bedarf es der Zustimmung des Rechtsinhabers. Keine vollständige Vervielfältigung des Werkexemplars erlaubt." },
    ],
    references: [],
  },
  {
    id: 2,
    practicalQuestion: "Darf ich Arbeitsblätter, die ich von einem Verlag gekauft habe, in eine KI hochladen?",
    legalFormulation: "Ist die Weiterverarbeitung von urheberrechtlich geschützten Arbeitsblättern durch KI-Tools rechtlich zulässig, insbesondere im Hinblick auf Nutzungsrechte und Schrankenbestimmungen?",
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "In diesem Beispiel geht es nur um das Hochladen, welches als Vervielfältigung zu qualifizieren ist.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig, dafür wäre die Zustimmung des Rechtsinhabers (Verlag) erforderlich." },
      { model: "GKImW", status: "eingeschraenkt", details: "Hochladen von der Eigengebrauchsschranke erfasst. Vorsicht bei mehreren Arbeitsblättern einer im Handel erhältlichen Sammlung. Weiterbearbeitung kann Einwilligung des Rechtsinhabers erfordern." },
      { model: "GKIoW", status: "erlaubt", details: "Schulinterner Gebrauch, zulässig. Bezüglich des Umfangs gilt das zu GKImW Gesagte." },
    ],
    references: [1],
  },
  {
    id: 3,
    practicalQuestion: "Darf ich Texte von SuS in eine KI hochladen, um sie sprachlich verbessern zu lassen?",
    legalFormulation: "Ist die Verarbeitung von Schülerarbeiten durch externe KI-Dienste mit den Vorgaben des kantonalen Datenschutzrechts vereinbar?",
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Die Texte von SuS sind als urheberrechtlich geschützte Werke zu qualifizieren, die jeweiligen SuS sind die Urheber.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Aus datenschutzrechtlicher Sicht liegt eine Bekanntgabe vor, die nur sehr eingeschränkt möglich wäre. Aus urheberrechtlicher Sicht wäre die Zustimmung der betroffenen SuS erforderlich." },
      { model: "GKImW", status: "eingeschraenkt", details: "Aus datenschutzrechtlicher Sicht möglich unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA. Die Korrektur bedürfte je nach Umfang als Änderung wohl der Zustimmung der SuS." },
      { model: "GKIoW", status: "erlaubt", details: "Aus daten- und urheberrechtlicher Sicht wohl zulässig (mit den Einschränkungen betreffend Urheberrecht)." },
    ],
    references: [1, 18],
  },
  {
    id: 4,
    practicalQuestion: "Kann ich urheberrechtlich geschützte Zeitungsartikel in eine KI hochladen, um Zusammenfassungen für den Unterricht zu erhalten?",
    legalFormulation: "Ist die Vervielfältigung und Verarbeitung fremder journalistischer Werke durch KI-Systeme ohne Zustimmung der Rechteinhaber zulässig?",
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Das Hochladen ist als Vervielfältigung zu betrachten. Das Erstellen der Zusammenfassung ist eine Bearbeitung.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig, dafür wäre die Zustimmung des Rechtsinhabers (Zeitung) erforderlich." },
      { model: "GKImW", status: "eingeschraenkt", details: "Nur zulässig, wenn die Lehrperson als einzige die Kontrolle über die Inhalte hat. Betriebsinterner Gebrauch erlaubt keine Bearbeitung (Zusammenfassung)." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Schulinterner Gebrauch zulässig, solange die Kontrolle bei der Lehrperson verbleibt. Ansonsten Zustimmung des Rechtsinhabers notwendig." },
    ],
    references: [1],
  },
  {
    id: 5,
    practicalQuestion: "Darf ich ein Theaterstück (z. B. Dürrenmatt) in die KI hochladen, um eine vereinfachte Version für meine Klasse zu erstellen?",
    legalFormulation: "Ist die Bearbeitung literarischer Werke durch KI im schulischen Kontext von Schrankenregelungen gedeckt oder bedarf es einer Lizenz?",
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Zuerst ist zu klären, ob am Theaterstück noch urheberrechtlicher Schutz besteht. Das Urheberrecht erlischt 70 Jahre nach dem Tod des Urhebers.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig, Zustimmung der Rechtsinhaber erforderlich." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Regelmässig wird das gesamte Werk hochgeladen, sodass die Gegenausnahme greift. Zustimmung des Rechtsinhabers (SSA) erforderlich." },
      { model: "GKIoW", status: "nicht_erlaubt", details: "Gleich wie bei GKImW – vollständiges Werkexemplar erfordert Zustimmung des Rechtsinhabers." },
    ],
    references: [1],
  },
  {
    id: 6,
    practicalQuestion: "Darf ich eine KI bitten, Aufgaben zu einem Musikstück (z. B. von Serge Gainsbourg) zu erstellen, wenn ich den Songtext eingebe?",
    legalFormulation: "Ist das Eingeben von urheberrechtlich geschützten Musiktexten in KI-Systeme eine zulässige Nutzung nach Urheberrecht?",
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Das Hochladen ist eine Vervielfältigung. Das Erstellen von Aufgaben dürfte eine freie Benutzung sein.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig, Zustimmung des Rechtsinhabers bzw. der SUISA notwendig." },
      { model: "GKImW", status: "eingeschraenkt", details: "Schranke des schul- oder betriebsinternen Gebrauchs kann einschlägig sein. Der Songtext allein wird regelmässig nicht als Werkexemplar beurteilt." },
      { model: "GKIoW", status: "erlaubt", details: "Zulässig (mit den genannten Einschränkungen)." },
    ],
    references: [1, 5],
  },
  {
    id: 7,
    practicalQuestion: "Kann ich von SuS erstellte Präsentationen in die KI hochladen, um Feedback zu erhalten?",
    legalFormulation: "Ist die Verarbeitung von urheberrechtlich geschützten Schülerarbeiten durch KI vereinbar?",
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Ein Feedback ist keine urheberrechtliche Bearbeitung.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig bei Personendaten in der Präsentation." },
      { model: "GKImW", status: "eingeschraenkt", details: "Aus urheberrechtlicher Sicht zulässig. Datenschutzrechtlich kommt es darauf an, ob die Präsentation Personendaten enthält." },
      { model: "GKIoW", status: "erlaubt", details: "Aus urheberrechtlicher Sicht zulässig. Bei Personendaten gelten die datenschutzrechtlichen Vorgaben." },
    ],
    references: [1, 18],
  },
  {
    id: 8,
    practicalQuestion: "Darf ich eine KI nutzen, um aus gekauften digitalen Lehrmitteln automatisch Multiple-Choice-Tests zu generieren?",
    legalFormulation: "Ist die automatisierte Weiterverarbeitung von digitalen Lehrmitteln durch KI ohne ausdrückliche Nutzungsrechte rechtlich zulässig?",
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Das Hochladen sind Vervielfältigungen, das Erstellen des MC-Tests ist je nach Ursprungsprodukt eine Bearbeitung oder eine freie Benutzung.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig, Zustimmung des Rechtsinhabers erforderlich." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Zustimmung des Rechtsinhabers erforderlich, solange die eingegebenen Werke erkennbar bleiben." },
      { model: "GKIoW", status: "erlaubt", details: "Zulässig, solange die eingegebenen Werke nicht erkennbar bleiben." },
    ],
    references: [1, 2],
  },
  {
    id: 9,
    practicalQuestion: "Wem gehört das Urheberrecht an den neu erstellten Lehrmaterialien, die von einer KI generiert wurden?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Eine geistige Schöpfung kann nur von einem Menschen stammen. Deshalb sind die Outputs eines KI-Tools nicht vom Urheberrecht geschützt, soweit die hochgeladenen Inhalte nicht mehr erkennbar sind.",
    assessments: [
      { model: "OKI", status: "unklar", details: "KI-generierte Inhalte sind grundsätzlich nicht urheberrechtlich geschützt. Vertragliche Schranken des Anbieters sind zu beachten." },
      { model: "GKImW", status: "unklar", details: "KI-generierte Inhalte sind grundsätzlich nicht urheberrechtlich geschützt. Vertragliche Schranken des Anbieters sind zu beachten." },
      { model: "GKIoW", status: "unklar", details: "KI-generierte Inhalte sind grundsätzlich nicht urheberrechtlich geschützt." },
    ],
    references: [1],
  },
  {
    id: 10,
    practicalQuestion: "Macht es einen rechtlichen Unterschied, ob die Materialien nur in der eigenen Klasse oder schulweit geteilt werden?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Wenn kein Urheberrecht an den erstellten Materialien entsteht und keine geschützten Inhalte erkennbar sind, macht es keinen Unterschied.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Kein Unterschied, wenn keine urheberrechtlich geschützten Inhalte erkennbar sind." },
      { model: "GKImW", status: "unklar", details: "Kein Unterschied, wenn keine urheberrechtlich geschützten Inhalte erkennbar sind." },
      { model: "GKIoW", status: "unklar", details: "Kein Unterschied, wenn keine urheberrechtlich geschützten Inhalte erkennbar sind." },
    ],
    references: [1, 9],
  },
  {
    id: 11,
    practicalQuestion: "Dürfen offizielle, kantonal oder national geschützte Dokumente wie Lehrpläne auf die Plattform eines externen KI-Anbieters hochgeladen werden?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Durch Urheberrecht geschützte Dokumente dürfen nur mit Zustimmung der jeweiligen Rechtsinhaber auf die Plattform eines externen Anbieters geladen werden.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nur mit Zustimmung der Rechtsinhaber." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Nur mit Zustimmung der Rechtsinhaber." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Schulinterner Gebrauch möglicherweise zulässig, aber Zustimmung empfohlen." },
    ],
    references: [],
  },
  {
    id: 12,
    practicalQuestion: "Stellt ein von einer Lehrperson konfigurierter KI-Tutor (inkl. Prompts und Referenz-Inhalte) ein schützenswertes Werk dar?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Nein, da der KI-Tutor nicht von einem Menschen erschaffen wurde, stellt er kein Werk im Sinne des Urheberrechts dar.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Kein urheberrechtlicher Schutz des KI-Tutors selbst." },
      { model: "GKImW", status: "unklar", details: "Kein urheberrechtlicher Schutz des KI-Tutors selbst." },
      { model: "GKIoW", status: "unklar", details: "Kein urheberrechtlicher Schutz des KI-Tutors selbst." },
    ],
    references: [9],
  },
  {
    id: 13,
    practicalQuestion: "Wer besitzt die Urheber- und Nutzungsrechte an einem Bild, das von einer Lehrperson mittels einer KI generiert wurde?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Am Bild besteht kein Urheberrecht, soweit die hochgeladenen Inhalte nicht mehr erkennbar sind. Vertragliche Vorgaben des KI-Anbieters sind zu beachten.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Kein Urheberrecht am generierten Bild. Vertragliche Vorgaben des Anbieters beachten (z.B. Kennzeichnungspflichten)." },
      { model: "GKImW", status: "unklar", details: "Kein Urheberrecht am generierten Bild. Vertragliche Vorgaben des Anbieters beachten." },
      { model: "GKIoW", status: "unklar", details: "Kein Urheberrecht am generierten Bild." },
    ],
    references: [9],
  },
  {
    id: 14,
    practicalQuestion: "Wem gehört das Urheberrecht an einem von einem Schüler mittels KI erstellten Bild oder Text?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Es besteht grundsätzlich kein Urheberrecht am Bild; jedoch sind vertragliche Nutzungsbeschränkungen des KI-Anbieters zu beachten.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Kein Urheberrecht. Vertragliche Nutzungsbeschränkungen beachten." },
      { model: "GKImW", status: "unklar", details: "Kein Urheberrecht. Vertragliche Nutzungsbeschränkungen beachten." },
      { model: "GKIoW", status: "unklar", details: "Kein Urheberrecht. Vertragliche Nutzungsbeschränkungen beachten." },
    ],
    references: [9],
  },
  {
    id: 15,
    practicalQuestion: "Darf ein KI-generiertes Bild, das den Stil eines bekannten Künstlers imitiert, im Unterricht verwendet werden?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Enthält ein KI-generiertes Bild erkennbar Teile eines geschützten Werkes, kann dessen Veröffentlichung eine Urheberrechtsverletzung darstellen.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Veröffentlichung kann eine Urheberrechtsverletzung darstellen, wenn geschützte Werke erkennbar sind." },
      { model: "GKImW", status: "eingeschraenkt", details: "Nur zulässig, wenn keine geschützten Werke erkennbar sind." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Nur zulässig, wenn keine geschützten Werke erkennbar sind." },
    ],
    references: [5],
  },
  {
    id: 16,
    practicalQuestion: "Wie kann bei KI-generierten Prüfungsaufgaben sichergestellt werden, dass keine Urheberrechtsverletzung vorliegt?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Es kommt auf das verwendete KI-Tool an. Wenn urheberrechtlich geschützte Werke verwendet werden, gelten die Einschränkungen.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Bei urheberrechtlich geschützten Materialien nicht zulässig." },
      { model: "GKImW", status: "eingeschraenkt", details: "Abhängig vom verwendeten Material und den Eigengebrauchsschranken." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Abhängig vom verwendeten Material und den Eigengebrauchsschranken." },
    ],
    references: [1],
  },
  {
    id: 17,
    practicalQuestion: "Ist die sprachliche Vereinfachung eines urheberrechtlich geschützten Aufgabentexts durch KI erlaubt?",
    legalFormulation: null,
    category: "Unterrichtsmaterialien & Urheberrecht",
    answer: "Grundsätzlich nur bei GKIoW zulässig.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig." },
      { model: "GKImW", status: "nicht_erlaubt", details: "In der Regel nicht zulässig ohne Zustimmung des Rechtsinhabers." },
      { model: "GKIoW", status: "erlaubt", details: "Grundsätzlich zulässig im Rahmen des schulinternen Gebrauchs." },
    ],
    references: [1, 2],
  },
  {
    id: 18,
    practicalQuestion: "Darf ich Namen und Noten von SuS in ein KI-Tool eingeben?",
    legalFormulation: "Ist die Verarbeitung von besonders schützenswerten Personendaten in externen KI-Systemen datenschutzrechtlich zulässig?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Die Zulässigkeit hängt vom KI-Modell-Typ ab. Besondere Anforderungen gelten für den Umgang mit Personendaten.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein. Bekanntgabe nur mit Einwilligung im Einzelfall möglich, was bei kontinuierlichem Einsatz umstritten ist." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA. Gilt auch für besondere Personendaten." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips. Leistungsdaten sind keine besonderen Personendaten." },
    ],
    references: [],
  },
  {
    id: 19,
    practicalQuestion: "Darf ich Schüleraufsätze anonymisiert in eine KI eingeben, um Feedback zu bekommen?",
    legalFormulation: "Genügt eine Anonymisierung von Schülerarbeiten vor Verarbeitung in KI-Systemen den Anforderungen des Datenschutzgesetzes?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Ja, solange es sich tatsächlich um eine rechtsgenügende Anonymisierung handelt, was in der Praxis eine grosse Herausforderung ist.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Ja, bei rechtsgenügender Anonymisierung. Alleine das Entfernen von Namen genügt i.d.R. nicht." },
      { model: "GKImW", status: "eingeschraenkt", details: "Ja, bei rechtsgenügender Anonymisierung. Schüleraufsätze können urheberrechtlich geschützt sein." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, bei rechtsgenügender Anonymisierung." },
    ],
    references: [3],
  },
  {
    id: 20,
    practicalQuestion: "Darf ich Fotos der Klasse in eine KI hochladen, um ein Poster erstellen zu lassen?",
    legalFormulation: "Ist die Verarbeitung von Bilddaten von SuS durch KI-Systeme mit dem kantonalen Datenschutzgesetz vereinbar?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Grundsätzlich nein. Möglicherweise könnte auf eine Einwilligung im Einzelfall abgestützt werden.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Grundsätzlich nein. Möglicherweise Einwilligung im Einzelfall. Voraussetzungen der grenzüberschreitenden Bekanntgabe prüfen." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Grundsätzlich nein (fehlende gesetzliche Grundlage, Verletzung der Verhältnismässigkeit). Einwilligung im Einzelfall möglich." },
      { model: "GKIoW", status: "nicht_erlaubt", details: "Grundsätzlich nein (Verhältnismässigkeit/Zweckbindungsgrundsatz). Einwilligung im Einzelfall möglich." },
    ],
    references: [],
  },
  {
    id: 21,
    practicalQuestion: "Darf ich Sprachaufnahmen von SuS machen, um mit KI die Aussprache analysieren zu lassen?",
    legalFormulation: "Ist die Verarbeitung biometrischer Sprachdaten von SuS durch KI-Tools datenschutzrechtlich zulässig?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Sprachdaten stellen nur besonders schützenswerte biometrische Daten dar, wenn sie die eindeutige Identifizierung erlauben.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein, aber möglicherweise Einwilligung im Einzelfall möglich." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich unter Wahrung der Verhältnismässigkeit mit vertraglichen Vorkehrungen und DSFA." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung der Verhältnismässigkeit." },
    ],
    references: [],
  },
  {
    id: 22,
    practicalQuestion: "Darf ich Schülerlösungen hochladen, damit KI Vorschläge zur Benotung gibt?",
    legalFormulation: "Ist die Verwendung von Schülerlösungen in KI-Systemen zur automatisierten Leistungsbewertung vereinbar?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Wichtig: Die Leistungsbeurteilung ist eine zentrale Aufgabe der Lehrperson. Der Benotungsvorschlag kann nicht unbesehen übernommen werden.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [],
  },
  {
    id: 23,
    practicalQuestion: "Darf ich mit KI die Chatprotokolle einer Klassendiskussion auswerten lassen?",
    legalFormulation: "Ist die Verarbeitung von Kommunikationsdaten von SuS durch KI-Tools datenschutzkonform?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Die Zulässigkeit hängt vom KI-Modell-Typ ab.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [18],
  },
  {
    id: 24,
    practicalQuestion: "Darf ich Schülerprofile (z. B. Interessen, Sprachstand) in eine KI eingeben, um personalisierte Lernmaterialien zu generieren?",
    legalFormulation: "Ist die Profilbildung von SuS durch KI-Systeme mit dem kantonalen Datenschutzgesetz vereinbar?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Bei Schülerprofilen könnte es sich um besondere Personendaten im Sinne eines Profiling handeln.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA. Besondere Schutz- und Sicherheitsvorkehrungen bei Profiling." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [18],
  },
  {
    id: 25,
    practicalQuestion: "Kann ich Schülerdaten in einem KI-Tool speichern, wenn der Anbieter die Server in der EU betreibt?",
    legalFormulation: "Reicht ein Serverstandort in der EU aus, um die Anforderungen des kantonalen Datenschutzrechts zu erfüllen?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Ja. Ein Serverstandort in der EU wird gleich behandelt wie in der Schweiz. Vorsicht bei US-amerikanischen Muttergesellschaften.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "EU-Serverstandort genügt grundsätzlich. Vorsicht bei US-Muttergesellschaften (CLOUD Act)." },
      { model: "GKImW", status: "eingeschraenkt", details: "EU-Serverstandort genügt. Vorsicht bei US-Muttergesellschaften." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, EU-Serverstandort wird gleich behandelt wie Schweiz." },
    ],
    references: [],
  },
  {
    id: 26,
    practicalQuestion: "Darf ich Schülerdaten in ein KI-System hochladen, wenn dieses Server in den USA nutzt?",
    legalFormulation: "Ist die Übermittlung von Personendaten von SuS an KI-Anbieter in den USA zulässig?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Nein, ausser bei Unternehmen unter dem Swiss-U.S. Data Privacy Framework. Besondere Personendaten nur verschlüsselt.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein. Nur bei Swiss-U.S. Data Privacy Framework registrierten Unternehmen. Besondere PD nur verschlüsselt." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Nein. Nur bei registrierten Unternehmen und mit besonderen Massnahmen." },
      { model: "GKIoW", status: "erlaubt", details: "Daten verbleiben intern, kein US-Serverkontakt." },
    ],
    references: [],
  },
  {
    id: 27,
    practicalQuestion: "Darf ich ChatGPT mit einer Schülerliste (Namen + E-Mail) füttern, um Gruppeneinteilungen vorzunehmen?",
    legalFormulation: "Ist die Eingabe von identifizierenden Schülerdaten in ein KI-System zur Organisation von Gruppenarbeiten datenschutzkonform?",
    category: "Schüler:innendaten & Datenschutz",
    answer: "Nein. In ChatGPT (Grundversionen) dürfen keinerlei Personendaten eingegeben werden, da OpenAI keine genügenden datenschutzrechtlichen Zusicherungen abgibt.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein. In ChatGPT (Konsumentenversionen) dürfen keinerlei Personendaten eingegeben werden." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Besondere bezahlte Instanzen (z.B. Enterprise) bedürfen eingehenderer Prüfung." },
      { model: "GKIoW", status: "erlaubt", details: "Bei internen Lösungen grundsätzlich möglich." },
    ],
    references: [],
  },
  {
    id: 28,
    practicalQuestion: "Welche Vorgaben gelten, wenn ich personenbezogene Daten (z.B. Elternname, Probleme von Schülern) in eine KI eingebe, um eine E-Mail zu formulieren?",
    legalFormulation: null,
    category: "Schüler:innendaten & Datenschutz",
    answer: "Das IDG findet vollumfänglich Anwendung. Bei besonderen Personendaten (z.B. Disziplinarmassnahmen, Gesundheitsdaten) sind besondere Massnahmen erforderlich.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig für Personendaten." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich mit DSFA und vertraglichen Vorkehrungen. Besondere Massnahmen bei besonderen Personendaten." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [],
  },
  {
    id: 29,
    practicalQuestion: "Besteht bei der Nutzung von KI für die Kommunikation mit Eltern die Gefahr der Verletzung des Amtsgeheimnisses?",
    legalFormulation: null,
    category: "Schüler:innendaten & Datenschutz",
    answer: "In vielen Fällen dürfte das Amtsgeheimnis durch die Offenbarung von Informationen in eine OKI oder GKImW verletzt werden.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Ja, Amtsgeheimnis wird in vielen Fällen verletzt." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Ja, Amtsgeheimnis wird in vielen Fällen verletzt." },
      { model: "GKIoW", status: "erlaubt", details: "Kein Risiko, da Daten intern verbleiben." },
    ],
    references: [],
  },
  {
    id: 30,
    practicalQuestion: "Wie ist die Datenspeicherung zu regeln, wenn ein Schüler dem KI-Tutor persönliche Lernschwächen offenbart?",
    legalFormulation: null,
    category: "Schüler:innendaten & Datenschutz",
    answer: "Lernschwächen können als besondere Personendaten qualifiziert werden. Besondere Massnahmen zur Speicherung sind erforderlich.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nicht zulässig für besondere Personendaten." },
      { model: "GKImW", status: "eingeschraenkt", details: "Besondere Massnahmen im Rahmen der DSFA erforderlich." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Nach Genehmigung durch DSB ZH sind SuS für eingegebene Daten selbst verantwortlich." },
    ],
    references: [],
  },
  {
    id: 31,
    practicalQuestion: "Unter welchen Bedingungen dürfen Sprach- und Stimmaufnahmen von minderjährigen SuS für Konversationstraining mit KI verarbeitet werden?",
    legalFormulation: null,
    category: "Schüler:innendaten & Datenschutz",
    answer: "Die Zulässigkeit hängt vom KI-Modell-Typ und der Wahrung des Verhältnismässigkeitsprinzips ab.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Unter keinen Umständen. Ausnahme: Einwilligung im Einzelfall unter Kenntnis aller relevanten Informationen." },
      { model: "GKImW", status: "eingeschraenkt", details: "Unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA." },
      { model: "GKIoW", status: "erlaubt", details: "Unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [18],
  },
  {
    id: 32,
    practicalQuestion: "Darf ich Prüfungen mit KI korrigieren lassen?",
    legalFormulation: "Ist die automatisierte Auswertung von Prüfungsleistungen durch KI mit den Vorgaben des Datenschutz- und Bildungsrechts vereinbar?",
    category: "Leistungsbewertung & Prüfungen",
    answer: "Die Lehrperson bleibt für die Bewertung verantwortlich. KI-Ausgaben müssen sorgfältig geprüft werden.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Aus datenschutzrechtlicher Sicht nein (ausser vollständig anonymisiert). Aus urheberrechtlicher Sicht u.U. mit Zustimmung der SuS möglich." },
      { model: "GKImW", status: "eingeschraenkt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips mit DSFA und vertraglichen Vorkehrungen." },
      { model: "GKIoW", status: "erlaubt", details: "Ja. Die Lehrperson bleibt für die Bewertung verantwortlich." },
    ],
    references: [],
  },
  {
    id: 33,
    practicalQuestion: "Darf ich KI nutzen, um Schülerarbeiten auf Plagiate zu prüfen?",
    legalFormulation: "Ist der Einsatz von KI-Plagiatserkennungssystemen datenschutz- und urheberrechtlich zulässig?",
    category: "Leistungsbewertung & Prüfungen",
    answer: "SuS sind über den Einsatz der Software zu informieren.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Aus datenschutzrechtlicher Sicht nein (ausser vollständig anonymisiert)." },
      { model: "GKImW", status: "eingeschraenkt", details: "Ja. SuS sind über den Einsatz zu informieren. Verhältnismässigkeitsprinzip, DSFA und vertragliche Massnahmen erforderlich." },
      { model: "GKIoW", status: "erlaubt", details: "Ja. SuS sind über den Einsatz zu informieren." },
    ],
    references: [55],
  },
  {
    id: 34,
    practicalQuestion: "Darf ich KI einsetzen, um Aufsätze von SuS nach Sprache und Inhalt zu bewerten?",
    legalFormulation: "Ist eine automatisierte Bewertung von Schülerarbeiten durch KI rechtlich zulässig?",
    category: "Leistungsbewertung & Prüfungen",
    answer: "Gleiche Regelung wie bei Frage 32.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Aus datenschutzrechtlicher Sicht nein (ausser vollständig anonymisiert)." },
      { model: "GKImW", status: "eingeschraenkt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips mit DSFA und vertraglichen Vorkehrungen." },
      { model: "GKIoW", status: "erlaubt", details: "Ja. Lehrperson bleibt verantwortlich." },
    ],
    references: [32],
  },
  {
    id: 35,
    practicalQuestion: "Darf ich KI Vorschläge für Zeugnisnoten berechnen lassen?",
    legalFormulation: "Ist der Einsatz von KI zur Generierung von Notenvorschlägen mit Bildungs- und Datenschutzrecht vereinbar?",
    category: "Leistungsbewertung & Prüfungen",
    answer: "Wie Frage 32, aber es ist zweifelhaft, ob eine KI tatsächlich geeignet ist, Notenvorschläge zu generieren.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKImW", status: "eingeschraenkt", details: "Fraglich, ob KI geeignet ist für Notenvorschläge. Verhältnismässigkeit zweifelhaft." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Grundsätzlich möglich, aber Eignung der KI zweifelhaft." },
    ],
    references: [32],
  },
  {
    id: 36,
    practicalQuestion: "Darf ich KI nutzen, um individuelle Lernstände festzustellen?",
    legalFormulation: "Ist eine automatisierte Erhebung von Lernstandsdaten durch KI mit dem Datenschutzrecht konform?",
    category: "Leistungsbewertung & Prüfungen",
    answer: "Gleiche Regelung wie bei Frage 32.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein (ausser vollständig anonymisiert)." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich mit DSFA und vertraglichen Vorkehrungen." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [32],
  },
  {
    id: 37,
    practicalQuestion: "Darf ich mit KI Simulationen für mündliche Prüfungen erstellen lassen (z. B. Rollenspiele)?",
    legalFormulation: "Ist der Einsatz von KI-Systemen zur Prüfungsvorbereitung mit Bildungsrecht und Urheberrecht vereinbar?",
    category: "Leistungsbewertung & Prüfungen",
    answer: "Ja. Bei Verwendung urheberrechtlich geschützter Werke oder Personendaten gelten die jeweiligen Grenzen.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Ja, aber urheberrechtliche und datenschutzrechtliche Grenzen beachten." },
      { model: "GKImW", status: "erlaubt", details: "Ja, unter Beachtung der jeweiligen Grenzen." },
      { model: "GKIoW", status: "erlaubt", details: "Ja. Lehrperson bleibt für Bewertung verantwortlich." },
    ],
    references: [1, 18, 32],
  },
  {
    id: 38,
    practicalQuestion: "Darf ich KI einsetzen, um schriftliche Prüfungen in Fremdsprachen automatisch zu bewerten?",
    legalFormulation: "Ist eine automatisierte Korrektur von Fremdsprachenprüfungen durch KI zulässig?",
    category: "Leistungsbewertung & Prüfungen",
    answer: "Gleiche Regelung wie bei Frage 32.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein (ausser vollständig anonymisiert)." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich mit DSFA und vertraglichen Vorkehrungen." },
      { model: "GKIoW", status: "erlaubt", details: "Ja." },
    ],
    references: [32],
  },
  {
    id: 39,
    practicalQuestion: "Wie ist die «vollständige Anonymisierung» von Prüfungen rechtlich definiert? Reicht das Entfernen von Namen und Klasse?",
    legalFormulation: null,
    category: "Leistungsbewertung & Prüfungen",
    answer: "Vollständige Anonymisierung ist schwer zu bewerkstelligen. Alle identifizierenden Merkmale müssen entfernt werden. Namen und Klasse entfernen genügt allenfalls bei Multiple-Choice-Prüfungen.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Bei vollständiger Anonymisierung zulässig. In der Praxis schwer umsetzbar." },
      { model: "GKImW", status: "eingeschraenkt", details: "Anonymisierung erleichtert die Nutzung, aber hohe Anforderungen." },
      { model: "GKIoW", status: "erlaubt", details: "Anonymisierung empfohlen, aber weniger kritisch bei internen Systemen." },
    ],
    references: [19],
  },
  {
    id: 40,
    practicalQuestion: "Ist eine von KI vorgeschlagene Note rechtlich anfechtbar und wer haftet für Bewertungsfehler?",
    legalFormulation: null,
    category: "Leistungsbewertung & Prüfungen",
    answer: "Die Lehrperson bleibt allein für die Bewertung verantwortlich. Bewertungsfehler der KI werden der Lehrperson bzw. der Schule zugerechnet.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Lehrperson haftet. KI-Anbieter schliessen Haftung für Output aus." },
      { model: "GKImW", status: "unklar", details: "Lehrperson/Schule haftet. Jeder KI-Output muss sorgfältig geprüft werden." },
      { model: "GKIoW", status: "unklar", details: "Lehrperson/Schule haftet." },
    ],
    references: [22],
  },
  {
    id: 41,
    practicalQuestion: "Benötigt die Schule eine explizite Einwilligung der Erziehungsberechtigten für den Einsatz von KI zur Korrektur?",
    legalFormulation: null,
    category: "Leistungsbewertung & Prüfungen",
    answer: "Nein, es gelten die allgemeinen Grenzen des Datenschutz- und Urheberrechts. Urteilsfähige Minderjährige können selbst einwilligen.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Keine zusätzliche Einwilligung nötig, aber allgemeine Grenzen gelten." },
      { model: "GKImW", status: "unklar", details: "Keine zusätzliche Einwilligung nötig, aber allgemeine Grenzen gelten." },
      { model: "GKIoW", status: "unklar", details: "Keine zusätzliche Einwilligung nötig." },
    ],
    references: [32],
  },
  {
    id: 42,
    practicalQuestion: "Unter welchen Bedingungen dürfen «Lerner-Daten» durch eine KI ausgewertet werden?",
    legalFormulation: null,
    category: "Leistungsbewertung & Prüfungen",
    answer: "Gleiche Regelung wie bei Frage 32.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein (ausser vollständig anonymisiert)." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich mit DSFA und vertraglichen Vorkehrungen." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [32],
  },
  {
    id: 43,
    practicalQuestion: "Ist für die KI-basierte Auswertung von Lerner-Daten die Einwilligung der Erziehungsberechtigten erforderlich?",
    legalFormulation: null,
    category: "Leistungsbewertung & Prüfungen",
    answer: "Nein, gleiche Regelung wie bei Frage 41.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Keine zusätzliche Einwilligung nötig." },
      { model: "GKImW", status: "unklar", details: "Keine zusätzliche Einwilligung nötig." },
      { model: "GKIoW", status: "unklar", details: "Keine zusätzliche Einwilligung nötig." },
    ],
    references: [41],
  },
  {
    id: 44,
    practicalQuestion: "Ab wann gilt die Nutzung einer KI zur Textkorrektur als Täuschungsversuch?",
    legalFormulation: null,
    category: "Leistungsbewertung & Prüfungen",
    answer: "Es gibt keine rechtlichen Vorgaben. Es ist Sache der Schulleitung bzw. des Bildungsrates, Regeln zu setzen.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Keine rechtlichen Vorgaben. Schulinterne Regeln massgebend." },
      { model: "GKImW", status: "unklar", details: "Keine rechtlichen Vorgaben. Schulinterne Regeln massgebend." },
      { model: "GKIoW", status: "unklar", details: "Keine rechtlichen Vorgaben. Schulinterne Regeln massgebend." },
    ],
    references: [68],
  },
  {
    id: 45,
    practicalQuestion: "Darf ich meine Schüler direkt mit ChatGPT arbeiten lassen?",
    legalFormulation: "Ist der direkte Zugang von SuS zu externen KI-Diensten rechtlich zulässig?",
    category: "Kommunikation & Interaktion mit KI",
    answer: "Bei OKI/GKImW-Versionen dürfen SuS nicht zur Nutzung verpflichtet werden, wenn Personendaten eingegeben werden müssen.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "SuS dürfen nicht zur Nutzung verpflichtet werden, wenn Personendaten erforderlich. Hinweis auf Urheberrecht nötig." },
      { model: "GKImW", status: "eingeschraenkt", details: "SuS dürfen nicht zur Nutzung verpflichtet werden, wenn Personendaten erforderlich." },
      { model: "GKIoW", status: "erlaubt", details: "Grundsätzlich zulässig im Rahmen des Lehrplans." },
    ],
    references: [],
  },
  {
    id: 46,
    practicalQuestion: "Darf ich eine KI bitten, Elternbriefe aus Schülerdaten zu erstellen?",
    legalFormulation: "Ist die Verarbeitung personenbezogener Daten von SuS und Eltern zur Generierung von Elterninformationen zulässig?",
    category: "Kommunikation & Interaktion mit KI",
    answer: "Die Zulässigkeit hängt vom KI-Modell-Typ ab.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [18],
  },
  {
    id: 47,
    practicalQuestion: "Darf ich mit KI Elternbriefe übersetzen lassen, wenn Namen der Schüler darin stehen?",
    legalFormulation: "Ist die Verarbeitung personenbezogener Daten in Übersetzungs-KI-Tools vereinbar?",
    category: "Kommunikation & Interaktion mit KI",
    answer: "Die Zulässigkeit hängt vom KI-Modell-Typ ab.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [18],
  },
  {
    id: 48,
    practicalQuestion: "Darf ich SuS erlauben, ihre Hausaufgaben mit KI erledigen zu lassen?",
    legalFormulation: "Ist die Nutzung von KI-Systemen zur Erledigung schulischer Leistungsnachweise rechtlich zulässig?",
    category: "Kommunikation & Interaktion mit KI",
    answer: "Erlauben ist grundsätzlich möglich, wenn dies mit den Vorgaben des Lehrplanes im Einklang steht.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Grundsätzlich möglich, wenn im Einklang mit dem Lehrplan." },
      { model: "GKImW", status: "eingeschraenkt", details: "Grundsätzlich möglich, wenn im Einklang mit dem Lehrplan." },
      { model: "GKIoW", status: "erlaubt", details: "Grundsätzlich möglich, wenn im Einklang mit dem Lehrplan." },
    ],
    references: [68],
  },
  {
    id: 49,
    practicalQuestion: "Darf ich KI nutzen, um für jeden Schüler ein Lernjournal zu führen?",
    legalFormulation: "Ist die systematische Dokumentation individueller Lernentwicklungen durch KI datenschutzkonform?",
    category: "Kommunikation & Interaktion mit KI",
    answer: "Die Zulässigkeit hängt vom KI-Modell-Typ ab.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips mit vertraglichen Vorkehrungen und DSFA." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [18],
  },
  {
    id: 50,
    practicalQuestion: "Darf ich KI einsetzen, um Schüler-Feedbacks automatisiert auszuwerten?",
    legalFormulation: "Ist die Verarbeitung von Feedbackdaten von SuS durch KI-Systeme rechtlich zulässig?",
    category: "Kommunikation & Interaktion mit KI",
    answer: "Es kommt darauf an, ob die Feedbacks Personendaten oder urheberrechtlich geschützte Werke darstellen.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Bei anonymen Feedbacks (z.B. Multiple-Choice) möglich. Bei Personendaten nicht zulässig." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich, wenn datenschutz- und urheberrechtliche Grenzen beachtet werden." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, auch bei Personendaten unter Wahrung des Verhältnismässigkeitsprinzips." },
    ],
    references: [1, 18],
  },
  {
    id: 51,
    practicalQuestion: "Darf ich SuS verpflichten, ihre Daten in eine KI einzugeben (z. B. für Sprachübungen)?",
    legalFormulation: "Ist eine verpflichtende Nutzung von KI-Systemen durch SuS datenschutzrechtlich zulässig?",
    category: "Kommunikation & Interaktion mit KI",
    answer: "Bei OKI ist eine Verpflichtung nicht zulässig. Bei GKI ist besonders auf Verhältnismässigkeit zu achten.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Verpflichtung nicht zulässig." },
      { model: "GKImW", status: "eingeschraenkt", details: "Besonders auf Einhaltung des Verhältnismässigkeitsprinzips achten." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Möglich unter Wahrung des Verhältnismässigkeitsprinzips und des Lehrplans." },
    ],
    references: [],
  },
  {
    id: 52,
    practicalQuestion: "Wer haftet, wenn durch ein KI-Tool Daten von SuS in falsche Hände geraten?",
    legalFormulation: "Wie ist die Haftung bei missbräuchlicher Verarbeitung oder Offenlegung von Personendaten geregelt?",
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Die Schule ist für Datensicherheit verantwortlich. Zivilrechtlich greift die Staatshaftung (Gemeinde). Strafrechtlich haftet jede vorsätzlich oder fahrlässig handelnde Person.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Gemeinde haftet (Staatshaftung). Regress auf Angestellte möglich. Hersteller/Betreiber haftet vertraglich und ausservertraglich." },
      { model: "GKImW", status: "unklar", details: "Gemeinde haftet. Vertragliche Ansprüche gegen KI-Anbieter möglich." },
      { model: "GKIoW", status: "unklar", details: "Gemeinde haftet. Risiko geringer bei internen Systemen." },
    ],
    references: [],
  },
  {
    id: 53,
    practicalQuestion: "Darf ich kostenlose KI-Tools nutzen, auch wenn unklar ist, wo die Daten gespeichert werden?",
    legalFormulation: "Ist der Einsatz kostenloser, datenunklarer KI-Dienste im Unterricht vereinbar?",
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Nein, zumindest nicht wenn Personendaten oder urheberrechtlich geschützte Werke bearbeitet werden.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein, nicht bei Personendaten oder urheberrechtlich geschützten Werken." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Nein, Datenspeicherungsort muss bekannt sein." },
      { model: "GKIoW", status: "erlaubt", details: "Nicht relevant, da Daten intern verbleiben." },
    ],
    references: [],
  },
  {
    id: 54,
    practicalQuestion: "Darf ich kommerzielle KI-Lizenzen mit Schulgeld kaufen?",
    legalFormulation: "Ist die Finanzierung kommerzieller KI-Software durch öffentliche Mittel vereinbar?",
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Aus vergaberechtlicher Sicht keine Besonderheiten. Beschaffung erfolgt in der Regel durch das Mittelschul- und Berufsbildungsamt.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Vergaberechtlich keine Besonderheiten. Datenschutz bei Personendaten beachten." },
      { model: "GKImW", status: "eingeschraenkt", details: "Vergaberechtlich keine Besonderheiten. Datenschutz beachten." },
      { model: "GKIoW", status: "erlaubt", details: "Vergaberechtlich keine Besonderheiten." },
    ],
    references: [],
  },
  {
    id: 55,
    practicalQuestion: "Muss ich Eltern oder SuS informieren, wenn ich eine KI im Unterricht verwende?",
    legalFormulation: "Besteht eine Informationspflicht bei der Verarbeitung personenbezogener Daten durch KI?",
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Bei herkömmlicher Verwendung von KI ergibt sich keine Informationspflicht. Es kommt auf den Einzelfall an. Bei Plagiatssoftware sind SuS zu informieren.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Information je nach Einsatzgebiet vorsichtshalber empfohlen. Bei Plagiatssoftware: Information Pflicht." },
      { model: "GKImW", status: "eingeschraenkt", details: "Information je nach Einsatzgebiet empfohlen." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Information je nach Einsatzgebiet empfohlen." },
    ],
    references: [],
  },
  {
    id: 56,
    practicalQuestion: "Darf ich KI-Systeme nutzen, die keine Schweizer oder EU-Datenschutzstandards erfüllen?",
    legalFormulation: "Ist die Nutzung von KI-Tools ohne adäquates Datenschutzniveau zulässig?",
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Nein, zumindest nicht wenn Personendaten oder urheberrechtlich geschützte Werke bearbeitet werden.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKImW", status: "nicht_erlaubt", details: "Nein." },
      { model: "GKIoW", status: "erlaubt", details: "Nicht relevant, da Daten intern verbleiben." },
    ],
    references: [],
  },
  {
    id: 57,
    practicalQuestion: "Muss ich dokumentieren, wenn ich eine KI im Unterricht einsetze?",
    legalFormulation: "Besteht eine Dokumentationspflicht für den Einsatz von KI?",
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Das Datenschutzgesetz sieht keine Dokumentationspflicht vor. Sie kann sich aus Reglementen ergeben. KI-Systeme mit Personendaten sind im Verzeichnis der Informationsbestände aufzunehmen.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Keine gesetzliche Pflicht, aber Aufnahme in Verzeichnis der Informationsbestände bei Personendaten." },
      { model: "GKImW", status: "eingeschraenkt", details: "Aufnahme in Verzeichnis der Informationsbestände erforderlich." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Aufnahme in Verzeichnis der Informationsbestände erforderlich." },
    ],
    references: [],
  },
  {
    id: 58,
    practicalQuestion: "Darf ich als LP eigenmächtig entscheiden, eine KI im Unterricht zu nutzen?",
    legalFormulation: "Ist der Einsatz von KI ohne Genehmigung der Schulbehörden zulässig?",
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Grundsätzlich ja, im Rahmen des Lehrauftrages. Rechtliche Vorgaben zu Datenschutz und Urheberrecht sind zu beachten.",
    assessments: [
      { model: "OKI", status: "eingeschraenkt", details: "Ja, im Rahmen des Lehrauftrages. Datenschutz- und urheberrechtliche Vorgaben beachten." },
      { model: "GKImW", status: "eingeschraenkt", details: "Ja, im Rahmen des Lehrauftrages." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, im Rahmen des Lehrauftrages." },
    ],
    references: [],
  },
  {
    id: 59,
    practicalQuestion: "Muss die Bildungsdirektion eine Liste erlaubter KI-Tools führen?",
    legalFormulation: "Ist eine zentrale Zulassungsliste für KI-Systeme erforderlich?",
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Eine zentrale Liste wäre zweckmässig. Das Verzeichnis der Informationsbestände obliegt dem jeweiligen öffentlichen Organ (Schule).",
    assessments: [
      { model: "OKI", status: "unklar", details: "Zweckmässig, aber Verzeichnisführung obliegt der Schule." },
      { model: "GKImW", status: "unklar", details: "Zweckmässig, aber Verzeichnisführung obliegt der Schule." },
      { model: "GKIoW", status: "unklar", details: "Zweckmässig, aber Verzeichnisführung obliegt der Schule." },
    ],
    references: [],
  },
  {
    id: 60,
    practicalQuestion: "Wer haftet, wenn eine LP fachlich falsche KI-Informationen im Unterricht verwendet?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Die ungeprüfte Übernahme von KI-Informationen ist eine Pflichtverletzung. Staatshaftung der Gemeinde, Regress auf LP möglich.",
    assessments: [
      { model: "OKI", status: "unklar", details: "LP haftet für ungeprüfte Übernahme. Dienstrechtliche Konsequenzen möglich. Staatshaftung der Gemeinde." },
      { model: "GKImW", status: "unklar", details: "LP haftet. Staatshaftung der Gemeinde." },
      { model: "GKIoW", status: "unklar", details: "LP haftet. Staatshaftung der Gemeinde." },
    ],
    references: [],
  },
  {
    id: 61,
    practicalQuestion: "Wer trägt die Verantwortung, wenn KI-gestützte Lektionsplanung die Lernziele des Lehrplans verfehlt?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Gleiche Regelung wie bei Frage 60.",
    assessments: [
      { model: "OKI", status: "unklar", details: "LP trägt Verantwortung." },
      { model: "GKImW", status: "unklar", details: "LP trägt Verantwortung." },
      { model: "GKIoW", status: "unklar", details: "LP trägt Verantwortung." },
    ],
    references: [60],
  },
  {
    id: 62,
    practicalQuestion: "Wer ist verantwortlich, wenn ein KI-Tutor den SuS falsche Informationen gibt oder unangemessen interagiert?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Lehrperson bleibt verantwortlich. Gemeinde haftet, Regress auf LP und/oder KI-Anbieter möglich.",
    assessments: [
      { model: "OKI", status: "unklar", details: "LP verantwortlich. Gemeinde haftet. Regress auf Hersteller/Betreiber möglich." },
      { model: "GKImW", status: "unklar", details: "LP verantwortlich. Gemeinde haftet." },
      { model: "GKIoW", status: "unklar", details: "LP verantwortlich. Gemeinde haftet." },
    ],
    references: [52],
  },
  {
    id: 63,
    practicalQuestion: "Wer haftet, wenn nach sprachlicher Vereinfachung durch KI die fachliche Korrektheit nicht mehr gewährleistet ist?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Lehrperson ist verantwortlich und hat KI-Outputs zu prüfen. Schwerwiegende Konsequenzen sind bei Vereinfachungen unwahrscheinlich.",
    assessments: [
      { model: "OKI", status: "unklar", details: "LP verantwortlich für Prüfung der Outputs." },
      { model: "GKImW", status: "unklar", details: "LP verantwortlich für Prüfung der Outputs." },
      { model: "GKIoW", status: "unklar", details: "LP verantwortlich für Prüfung der Outputs." },
    ],
    references: [52, 62],
  },
  {
    id: 64,
    practicalQuestion: "Wer haftet, wenn ein Schüler durch einen von der Schule bereitgestellten Chatbot auf ungeeignete Inhalte stösst?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Verschiedene Haftungssubjekte: Gemeinde (zivilrechtlich), LP, Hersteller/Betreiber. Bei Prompt Injections durch SuS reduzierte Haftung der Schule.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Gemeinde haftet zivilrechtlich. Regress auf LP/Hersteller möglich. Strafrechtlich: natürliche Person haftet." },
      { model: "GKImW", status: "unklar", details: "Gemeinde haftet. Regress möglich." },
      { model: "GKIoW", status: "unklar", details: "Gemeinde haftet. Geringeres Risiko bei internen Systemen." },
    ],
    references: [],
  },
  {
    id: 65,
    practicalQuestion: "Welche Daten dürfen von einem Chatbot über Interaktionen mit minderjährigen SuS gespeichert werden?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Daten dürfen nur solange aufbewahrt werden, wie sie für die Aufgabe notwendig sind. Bei Chatbot-Interaktionen nur kurze Zeitspanne.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Speicherung grundsätzlich nicht zulässig." },
      { model: "GKImW", status: "eingeschraenkt", details: "Nur für kurze Zeitspanne, nach Interaktion löschen. DSFA erforderlich." },
      { model: "GKIoW", status: "eingeschraenkt", details: "Nur für notwendige Zeitspanne. Verhältnismässigkeitsprinzip beachten." },
    ],
    references: [18, 41],
  },
  {
    id: 66,
    practicalQuestion: "Welche Verantwortung trägt die LP, die einen KI-Tutor «freigegeben» hat, für das Feedback an die SuS?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "LP trägt Verantwortung für die Vermittlung des Lernstoffes und muss sicherstellen, dass Feedback geeignet ist.",
    assessments: [
      { model: "OKI", status: "unklar", details: "LP verantwortlich. Eignung des Tutors muss geprüft werden." },
      { model: "GKImW", status: "unklar", details: "LP verantwortlich. Eignung prüfen und ggf. intervenieren." },
      { model: "GKIoW", status: "unklar", details: "LP verantwortlich." },
    ],
    references: [18, 62],
  },
  {
    id: 67,
    practicalQuestion: "Welche Zugriffs- und Kontrollrechte haben LP und Erziehungsberechtigte auf digitale Lerndaten?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "LP muss über ausreichende Zugriffs- und Kontrollrechte verfügen. Erziehungsberechtigte haben Auskunftsrecht und können über das Öffentlichkeitsprinzip Zugang zu allgemeinen Informationen erhalten.",
    assessments: [
      { model: "OKI", status: "unklar", details: "LP und Erziehungsberechtigte haben Informations- und Auskunftsrechte." },
      { model: "GKImW", status: "unklar", details: "LP und Erziehungsberechtigte haben Informations- und Auskunftsrechte." },
      { model: "GKIoW", status: "unklar", details: "LP und Erziehungsberechtigte haben Informations- und Auskunftsrechte." },
    ],
    references: [],
  },
  {
    id: 68,
    practicalQuestion: "Wie ist die Verwendung von KI-generierten Inhalten in bewerteten Arbeiten zu kennzeichnen?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Aus rechtlicher Sicht gibt es grundsätzlich keine Vorgaben, vorbehalten bleiben schulinterne Richtlinien. KI-generierter Output ist nicht urheberrechtlich geschützt.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Keine rechtlichen Vorgaben. Schulinterne Regelung empfohlen. Zitatpflicht bei erkennbaren geschützten Inhalten." },
      { model: "GKImW", status: "unklar", details: "Keine rechtlichen Vorgaben. Schulinterne Regelung empfohlen." },
      { model: "GKIoW", status: "unklar", details: "Keine rechtlichen Vorgaben. Schulinterne Regelung empfohlen." },
    ],
    references: [],
  },
  {
    id: 69,
    practicalQuestion: "Welche Verantwortung trägt die Schule, wenn SuS urheberrechtlich geschütztes Material in einen KI-Lernraum hochladen?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Der Schüler trägt die Verantwortung für Urheberrechtsverletzungen. Die Schule haftet nur bei eigener Pflichtverletzung.",
    assessments: [
      { model: "OKI", status: "unklar", details: "Schüler verantwortlich. Schule haftet nur bei eigener Pflichtverletzung." },
      { model: "GKImW", status: "unklar", details: "Schüler verantwortlich. Schule haftet nur bei eigener Pflichtverletzung." },
      { model: "GKIoW", status: "unklar", details: "Schüler verantwortlich. Schule haftet nur bei eigener Pflichtverletzung." },
    ],
    references: [],
  },
  {
    id: 70,
    practicalQuestion: "Wie muss der Betreiber des «Lernraums» sicherstellen, dass Inhalte nicht für KI-Training verwendet werden?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "Sicherstellung über Verträge, insbesondere Auftragsdatenbearbeitungsvertrag. AGB des Regierungsrates über Auslagerung von Informatikdienstleistungen sind relevant.",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Bei OKI ist gerade das Problem, dass Daten für Training genutzt werden." },
      { model: "GKImW", status: "eingeschraenkt", details: "Sicherstellung über Auftragsdatenbearbeitungsvertrag und RR AGB." },
      { model: "GKIoW", status: "erlaubt", details: "Daten verbleiben intern. Kein Risiko der Verwendung für Training." },
    ],
    references: [],
  },
  {
    id: 71,
    practicalQuestion: "Darf ein Schüler einen urheberrechtlich geschützten Dokumentarfilm in eine KI hochladen für eine Transkription?",
    legalFormulation: null,
    category: "Technische Infrastruktur & Verantwortlichkeiten",
    answer: "In OKI dürfen keine urheberrechtlich geschützten Inhalte geladen werden. Bei GKI ist es möglich (schulinterner Gebrauch).",
    assessments: [
      { model: "OKI", status: "nicht_erlaubt", details: "Nein, keine urheberrechtlich geschützten Inhalte in OKI." },
      { model: "GKImW", status: "eingeschraenkt", details: "Möglich im Rahmen des schulinternen Gebrauchs." },
      { model: "GKIoW", status: "erlaubt", details: "Ja, schulinterner Gebrauch." },
    ],
    references: [1],
  },
];

export const STATUS_CONFIG = {
  erlaubt: {
    label: "Erlaubt",
    color: "#10B981",
    bgColor: "#D1FAE5",
    icon: "CheckCircle",
    description: "Die Nutzung ist grundsätzlich zulässig.",
  },
  eingeschraenkt: {
    label: "Eingeschränkt",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    icon: "AlertTriangle",
    description: "Die Nutzung ist unter bestimmten Bedingungen möglich.",
  },
  nicht_erlaubt: {
    label: "Nicht erlaubt",
    color: "#EF4444",
    bgColor: "#FEE2E2",
    icon: "XCircle",
    description: "Die Nutzung ist grundsätzlich nicht zulässig.",
  },
  unklar: {
    label: "Kontextabhängig",
    color: "#6B7280",
    bgColor: "#F3F4F6",
    icon: "HelpCircle",
    description: "Die Beurteilung hängt vom konkreten Einzelfall ab.",
  },
};
