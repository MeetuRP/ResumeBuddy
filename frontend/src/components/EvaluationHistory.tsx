import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../lib/api";
import type { EvaluationSummary } from "../types";

const EvaluationHistory = () => {
    const [evaluations, setEvaluations] = useState<EvaluationSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get("/evaluations/history");
                setEvaluations(res.data);
            } catch (err) {
                console.error("Failed to fetch evaluation history", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-slate-400 text-sm font-medium">Loading history…</span>
            </div>
        );
    }

    if (evaluations.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-slate-400 font-medium">No evaluations yet</p>
                <p className="text-slate-300 text-sm mt-1">Evaluate a resume against a job description to see your history here.</p>
            </div>
        );
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200", glow: "group-hover:shadow-emerald-200/50" };
        if (score >= 60) return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200", glow: "group-hover:shadow-amber-200/50" };
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", glow: "group-hover:shadow-red-200/50" };
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evaluations.map((ev) => {
                const scoreStyle = getScoreColor(ev.ats_score);
                return (
                    <Link
                        key={ev.id}
                        to={`/results?evaluationId=${ev.id}`}
                        className="group block"
                    >
                        <div className={`relative bg-white/60 backdrop-blur-xl rounded-2xl p-5 border border-white/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${scoreStyle.glow} overflow-hidden`}>
                            {/* Decorative gradient orb */}
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 rounded-full blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

                            {/* Header row */}
                            <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-extrabold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                                        {ev.resume_name}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                                        {ev.job_title}
                                    </p>
                                </div>
                                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-black ${scoreStyle.bg} ${scoreStyle.text} ${scoreStyle.border} border`}>
                                    ATS {ev.ats_score}
                                </span>
                            </div>

                            {/* Score bar */}
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                                        ev.ats_score >= 80 ? "bg-emerald-500" :
                                        ev.ats_score >= 60 ? "bg-amber-500" : "bg-red-500"
                                    }`}
                                    style={{ width: `${Math.min(ev.ats_score, 100)}%` }}
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between relative z-10">
                                <span className="text-[11px] text-slate-400 font-medium">
                                    {formatDate(ev.created_at)}
                                </span>
                                <span className="text-[11px] font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 flex items-center gap-1">
                                    Open
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default EvaluationHistory;
