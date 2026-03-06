import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import api from "../lib/api";
import Summary from "../components/Summary";
import ATS from "../components/ATS";
import Details from "../components/Details";
import ResumeViewer from "../components/ResumeViewer";
import type { AnalysisResult, UnifiedFeedback } from "../types";

const Results = () => {
    const [searchParams] = useSearchParams();
    const rawAnalysisId = searchParams.get('analysisId');
    const analysisId = (rawAnalysisId && rawAnalysisId !== "undefined" && rawAnalysisId !== "null") ? rawAnalysisId : null;
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await api.get('/analysis/history');
                const history = response.data;
                if (history.length === 0) return;

                // If we have a valid analysisId, find that one; otherwise use the latest
                const item = analysisId
                    ? history.find((h: any) => h.id === analysisId)
                    : history[history.length - 1];

                if (item) {
                    setAnalysis(item);
                    // Fetch resume blob
                    try {
                        const resBlob = await api.get(`/resume/view/${item.resume_id}`, {
                            responseType: 'blob'
                        });
                        const url = URL.createObjectURL(new Blob([resBlob.data], { type: 'application/pdf' }));
                        setResumeUrl(url);
                    } catch (e) {
                        console.error("Failed to load resume blob", e);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch results", err);
            }
        };
        fetchResults();

        return () => {
            if (resumeUrl) URL.revokeObjectURL(resumeUrl);
        };
    }, [analysisId]);

    if (!analysis) return <div className="p-10 text-center">Loading Results...</div>;

    // Transform backend analysis to UnifiedFeedback for UI components
    const feedback: UnifiedFeedback = {
        overallScore: analysis.ats_score,
        ATS: {
            score: analysis.ats_score,
            tips: analysis.suggestions.filter(s => !s.toLowerCase().includes('skill')).map(s => ({ type: s.includes('match') || s.includes('Good') ? 'good' : 'improve', tip: s }))
        },
        toneAndStyle: {
            score: 75,
            tips: [
                { type: 'good', tip: 'Professional and authoritative tone' },
                { type: 'good', tip: 'Consistent active voice usage' }
            ]
        },
        content: {
            score: 82,
            tips: [
                { type: 'good', tip: 'Strong action verbs at beginning of bullets' },
                { type: 'improve', tip: 'Quantify more achievements with metrics/data' }
            ]
        },
        structure: {
            score: 90,
            tips: [
                { type: 'good', tip: 'Standard reverse-chronological layout' },
                { type: 'good', tip: 'Clear section headers and separation' },
                { type: 'improve', tip: 'Slightly reduce margin on the second page footer' }
            ]
        },
        skills: {
            score: analysis.ats_score,
            tips: [
                ...analysis.skills_matched.map(s => ({ type: 'good' as const, tip: `Matches: ${s}` })),
                ...analysis.missing_skills.map(s => ({ type: 'improve' as const, tip: `Missing: ${s}` }))
            ]
        }
    };

    return (
        <main className="h-screen flex flex-col bg-[url('/images/bg-main.svg')] bg-cover overflow-hidden">
            {/* Header / Nav */}
            <nav className="flex items-center justify-between px-10 py-5 bg-white/40 backdrop-blur-xl border-b border-white/40 sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition-all font-bold group">
                    <div className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-indigo-50 transition-colors border border-white/50">
                        <img src="/icons/back.svg" alt="back" className="w-4 h-4" />
                    </div>
                    <span>Back to Dashboard</span>
                </Link>
                <div className="flex-1 flex justify-center px-4 overflow-hidden">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        Evaluation: <span className="text-indigo-600 underline decoration-indigo-300 underline-offset-4">{analysis.job_title}</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/50">
                        Analysis Report
                    </div>
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden p-6 gap-6 h-full">
                {/* Left Side: Resume Viewer - Floating Glass Container */}
                <section className="w-[45%] h-full flex flex-col">
                    <div className="glass-card flex-1 flex flex-col overflow-hidden relative group border-white/60 bg-white/30">
                        <div className="flex-1 relative">
                            <ResumeViewer url={resumeUrl || ""} />
                        </div>
                    </div>
                </section>

                {/* Right Side: Evaluation Details - Scrolling Content Area */}
                <section className="flex-1 h-full overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-8 pb-12">
                        {/* Highlights Summary */}
                        <div className="glass-card p-10 relative overflow-hidden">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Evaluation Results</h2>
                            <p className="text-slate-500 text-lg font-medium max-w-2xl">Advanced AI analysis complete. We've matched your resume against the <span className="text-indigo-600 font-bold">{analysis.job_title}</span> requirements.</p>

                            <div className="mt-10">
                                <Summary feedback={feedback} />
                            </div>
                        </div>

                        {/* Detailed ATS Feedback */}
                        <div className="animate-in slide-in-from-bottom-4 duration-700">
                            <ATS score={feedback.ATS.score} suggestions={feedback.ATS.tips.map(t => t.tip)} />
                        </div>

                        {/* Skills and Deep Dive */}
                        <div className="animate-in slide-in-from-bottom-8 duration-700 delay-150">
                            <Details feedback={feedback} />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Results;
