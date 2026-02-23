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
  CheckCircle,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Info,
  ArrowRight,
  BarChart3,
  Hash,
  Scale,
  Sparkles,
  FileText,
} from "lucide-react";
import {
  questions,
  CATEGORIES,
  KI_MODELS,
  STATUS_CONFIG,
  type Question,
  type Status,
  type KIModelType,
} from "@/data/questions";

const categoryIcons: Record<string, React.ReactNode> = {
  "Unterrichtsmaterialien & Urheberrecht": <BookOpen className="w-5 h-5" />,
  "Schüler:innendaten & Datenschutz": <Shield className="w-5 h-5" />,
  "Leistungsbewertung & Prüfungen": <ClipboardCheck className="w-5 h-5" />,
  "Kommunikation & Interaktion mit KI": <MessageCircle className="w-5 h-5" />,
  "Technische Infrastruktur & Verantwortlichkeiten": <Settings className="w-5 h-5" />,
};

const statusIcons: Record<Status, React.ReactNode> = {
  erlaubt: <CheckCircle className="w-5 h-5" />,
  eingeschraenkt: <AlertTriangle className="w-5 h-5" />,
  nicht_erlaubt: <XCircle className="w-5 h-5" />,
  unklar: <HelpCircle className="w-5 h-5" />,
};

function StatusBadge({ status, size = "md" }: { status: Status; size?: "sm" | "md" }) {
  const config = STATUS_CONFIG[status];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses}`}
      style={{ backgroundColor: config.bgColor, color: config.color }}
    >
      <span className="flex-shrink-0">{statusIcons[status]}</span>
      {config.label}
    </span>
  );
}

function ModelBadge({ model }: { model: KIModelType }) {
  const colors: Record<KIModelType, string> = {
    OKI: "bg-red-50 text-red-700 border-red-200",
    GKImW: "bg-amber-50 text-amber-700 border-amber-200",
    GKIoW: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const labels: Record<KIModelType, string> = {
    OKI: "Offene KI",
    GKImW: "Geschl. KI m. Weitergabe",
    GKIoW: "Geschl. KI o. Weitergabe",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${colors[model]}`}>
      {labels[model]}
    </span>
  );
}

function QuestionCard({
  question,
  isExpanded,
  onToggle,
  onQuestionClick,
}: {
  question: Question;
  isExpanded: boolean;
  onToggle: () => void;
  onQuestionClick: (id: number) => void;
}) {
  const cat = CATEGORIES.find((c) => c.name === question.category);

  return (
    <div
      className="animate-fade-in-up bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md overflow-hidden"
      style={{ borderLeftWidth: "4px", borderLeftColor: cat?.color || "#94a3b8" }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-slate-50 cursor-pointer"
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5"
          style={{ backgroundColor: cat?.color || "#94a3b8" }}
        >
          {question.id}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-800 leading-snug">
            {question.practicalQuestion}
          </h3>
          {/* Quick status overview */}
          <div className="flex flex-wrap gap-2 mt-3">
            {question.assessments.map((a) => (
              <div key={a.model} className="flex items-center gap-1.5">
                <ModelBadge model={a.model} />
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: STATUS_CONFIG[a.status].color }}
                  title={STATUS_CONFIG[a.status].label}
                />
              </div>
            ))}
          </div>
        </div>
        <span className="flex-shrink-0 text-slate-400 mt-1">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-slate-100">
          {/* Legal formulation */}
          {question.legalFormulation && (
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Scale className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                    Juristische Formulierung
                  </p>
                  <p className="text-sm text-blue-800">{question.legalFormulation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Answer context */}
          {question.answer && (
            <div className="px-5 py-2">
              <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
                <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-600">{question.answer}</p>
              </div>
            </div>
          )}

          {/* Assessments per model */}
          <div className="px-5 py-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Bewertung nach KI-Modell-Typ
            </h4>
            {question.assessments.map((assessment) => (
              <div
                key={assessment.model}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: STATUS_CONFIG[assessment.status].bgColor + "40",
                  borderColor: STATUS_CONFIG[assessment.status].color + "30",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <ModelBadge model={assessment.model} />
                  <StatusBadge status={assessment.status} size="sm" />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{assessment.details}</p>
              </div>
            ))}
          </div>

          {/* References */}
          {question.references.length > 0 && (
            <div className="px-5 pb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                Verwandte Fragen
              </p>
              <div className="flex flex-wrap gap-2">
                {question.references.map((ref) => {
                  const refQ = questions.find((q) => q.id === ref);
                  return (
                    <button
                      key={ref}
                      onClick={() => onQuestionClick(ref)}
                      className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-3 py-1 hover:bg-indigo-100 cursor-pointer"
                    >
                      Frage {ref}
                      {refQ ? `: ${refQ.practicalQuestion.substring(0, 40)}...` : ""}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category tag */}
          <div className="px-5 pb-4">
            <span
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium text-white"
              style={{ backgroundColor: cat?.color || "#94a3b8" }}
            >
              {categoryIcons[question.category]}
              {question.category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsOverview({
  filteredQuestions,
}: {
  filteredQuestions: Question[];
}) {
  const stats = useMemo(() => {
    const modelStats: Record<KIModelType, Record<Status, number>> = {
      OKI: { erlaubt: 0, eingeschraenkt: 0, nicht_erlaubt: 0, unklar: 0 },
      GKImW: { erlaubt: 0, eingeschraenkt: 0, nicht_erlaubt: 0, unklar: 0 },
      GKIoW: { erlaubt: 0, eingeschraenkt: 0, nicht_erlaubt: 0, unklar: 0 },
    };
    filteredQuestions.forEach((q) => {
      q.assessments.forEach((a) => {
        modelStats[a.model][a.status]++;
      });
    });
    return modelStats;
  }, [filteredQuestions]);

  const total = filteredQuestions.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {(["OKI", "GKImW", "GKIoW"] as KIModelType[]).map((model) => {
        const modelInfo = KI_MODELS.find((m) => m.type === model)!;
        return (
          <div key={model} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-700 mb-1">{modelInfo.label}</h3>
            <p className="text-xs text-slate-500 mb-3">{model}</p>
            <div className="space-y-2">
              {(["erlaubt", "eingeschraenkt", "nicht_erlaubt", "unklar"] as Status[]).map(
                (status) => {
                  const count = stats[model][status];
                  const pct = total > 0 ? (count / total) * 100 : 0;
                  const config = STATUS_CONFIG[status];
                  return (
                    <div key={status}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="font-medium" style={{ color: config.color }}>
                          {config.label}
                        </span>
                        <span className="text-slate-500">
                          {count} ({Math.round(pct)}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: config.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ModelInfoPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
      >
        <Info className="w-4 h-4" />
        {open ? "KI-Modell-Typen ausblenden" : "Was bedeuten OKI, GKImW und GKIoW?"}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {KI_MODELS.map((model) => {
            const borderColors: Record<KIModelType, string> = {
              OKI: "#EF4444",
              GKImW: "#F59E0B",
              GKIoW: "#10B981",
            };
            return (
              <div
                key={model.type}
                className="p-4 bg-white rounded-xl border-2 shadow-sm"
                style={{ borderColor: borderColors[model.type] }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: borderColors[model.type] }}
                  >
                    {model.type}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{model.label}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{model.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
  const [selectedModels, setSelectedModels] = useState<KIModelType[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showStats, setShowStats] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const toggleStatus = useCallback((status: Status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  }, []);

  const toggleModel = useCallback((model: KIModelType) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSelectedModels([]);
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Search
      if (searchQuery) {
        const lower = searchQuery.toLowerCase();
        const searchMatch =
          q.practicalQuestion.toLowerCase().includes(lower) ||
          (q.legalFormulation && q.legalFormulation.toLowerCase().includes(lower)) ||
          q.answer.toLowerCase().includes(lower) ||
          q.assessments.some((a) => a.details.toLowerCase().includes(lower)) ||
          q.id.toString() === searchQuery;
        if (!searchMatch) return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(q.category)) {
        return false;
      }

      // Status filter – match if any selected status matches any assessment for selected models (or all models if none selected)
      if (selectedStatuses.length > 0) {
        const relevantAssessments =
          selectedModels.length > 0
            ? q.assessments.filter((a) => selectedModels.includes(a.model))
            : q.assessments;
        const hasMatchingStatus = relevantAssessments.some((a) =>
          selectedStatuses.includes(a.status)
        );
        if (!hasMatchingStatus) return false;
      }

      // Model filter (only show questions that have specific model assessment matching)
      if (selectedModels.length > 0 && selectedStatuses.length === 0) {
        // When only model filter is active, show all questions (they all have all models)
        return true;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedStatuses, selectedModels]);

  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || selectedStatuses.length > 0 || selectedModels.length > 0;

  const handleQuestionClick = useCallback((id: number) => {
    setExpandedId(id);
    // Scroll to question
    setTimeout(() => {
      const el = document.getElementById(`question-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Suche nach Fragen, Stichworten oder Fragennummer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Model Info */}
        <ModelInfoPanel />

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Filter ausblenden" : "Filter einblenden"}
          </button>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Alle Filter zurücksetzen
              </button>
            )}
            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              {showStats ? "Statistik ausblenden" : "Statistik anzeigen"}
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6 shadow-sm space-y-5">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-400" />
                Themenkategorie
              </h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategories.includes(cat.name);
                  const count = questions.filter((q) => q.category === cat.name).length;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => toggleCategory(cat.name)}
                      className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border cursor-pointer ${
                        isActive
                          ? "text-white shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                      style={
                        isActive
                          ? { backgroundColor: cat.color, borderColor: cat.color }
                          : undefined
                      }
                    >
                      {categoryIcons[cat.name]}
                      <span className="hidden sm:inline">{cat.name}</span>
                      <span className="sm:hidden">{cat.name.split(" ")[0]}</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${
                          isActive ? "bg-white/30 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                Bewertungsstatus
              </h3>
              <div className="flex flex-wrap gap-2">
                {(["erlaubt", "eingeschraenkt", "nicht_erlaubt", "unklar"] as Status[]).map(
                  (status) => {
                    const isActive = selectedStatuses.includes(status);
                    const config = STATUS_CONFIG[status];
                    return (
                      <button
                        key={status}
                        onClick={() => toggleStatus(status)}
                        className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border cursor-pointer ${
                          isActive
                            ? "text-white shadow-sm"
                            : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                        style={
                          isActive
                            ? { backgroundColor: config.color, borderColor: config.color, color: "#fff" }
                            : { color: config.color }
                        }
                      >
                        {statusIcons[status]}
                        {config.label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Model Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Hash className="w-4 h-4 text-slate-400" />
                KI-Modell-Typ (kombinierbar mit Status)
              </h3>
              <div className="flex flex-wrap gap-2">
                {(["OKI", "GKImW", "GKIoW"] as KIModelType[]).map((model) => {
                  const isActive = selectedModels.includes(model);
                  const modelInfo = KI_MODELS.find((m) => m.type === model)!;
                  const borderColors: Record<KIModelType, string> = {
                    OKI: "#EF4444",
                    GKImW: "#F59E0B",
                    GKIoW: "#10B981",
                  };
                  return (
                    <button
                      key={model}
                      onClick={() => toggleModel(model)}
                      className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border-2 cursor-pointer ${
                        isActive ? "text-white shadow-sm" : "bg-white text-slate-600"
                      }`}
                      style={{
                        borderColor: borderColors[model],
                        backgroundColor: isActive ? borderColors[model] : undefined,
                        color: isActive ? "#fff" : undefined,
                      }}
                    >
                      <span className="font-bold">{model}</span>
                      <span className="hidden sm:inline text-xs opacity-80">
                        {modelInfo.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedModels.length > 0 && selectedStatuses.length > 0 && (
                <p className="text-xs text-slate-500 mt-2">
                  Zeigt Fragen, bei denen der ausgewählte Status beim ausgewählten KI-Modell-Typ
                  zutrifft.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {showStats && <StatsOverview filteredQuestions={filteredQuestions} />}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">{filteredQuestions.length}</span> von{" "}
            {questions.length} Fragen
            {hasActiveFilters && " (gefiltert)"}
          </p>
          {filteredQuestions.length > 0 && (
            <button
              onClick={() => setExpandedId(expandedId ? null : filteredQuestions[0].id)}
              className="text-xs text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              {expandedId ? "Alle zuklappen" : "Erste Frage aufklappen"}
            </button>
          )}
        </div>

        {/* Questions list */}
        <div className="space-y-3">
          {filteredQuestions.map((q) => (
            <div key={q.id} id={`question-${q.id}`}>
              <QuestionCard
                question={q}
                isExpanded={expandedId === q.id}
                onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
                onQuestionClick={handleQuestionClick}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              Keine Fragen gefunden
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Versuchen Sie andere Suchbegriffe oder passen Sie die Filter an.
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}

        {/* Info Documents Links (visible on all screens) */}
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
              <p className="text-xs text-emerald-600">Ausdruckbarer Leitfaden zum Datenschutz beim KI-Einsatz</p>
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
              <p className="text-xs text-blue-600">Ausdruckbarer Leitfaden zum Urheberrecht beim KI-Einsatz</p>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-8 py-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400">
            Basierend auf dem Fragekatalog Sek II (FINAL) | Rechtliche Fragen zum KI-Einsatz an
            Schulen im Kanton Zürich
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Erstellt von valfor | Diese Informationen stellen keine Rechtsberatung dar.
          </p>
        </footer>
      </main>
    </div>
  );
}
