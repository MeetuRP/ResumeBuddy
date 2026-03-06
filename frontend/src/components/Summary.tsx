import ScoreRing from "./ScoreRing";
import type { UnifiedFeedback } from "../types";

const HorizontalProgress = ({ title, score, icon }: { title: string, score: number, icon: string }) => {
    const getTrackColor = (s: number) => {
        if (s >= 75) return 'bg-emerald-500';
        if (s >= 50) return 'bg-blue-500';
        if (s >= 25) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
                </div>
                <span className="text-sm font-black text-slate-900">{score}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/30">
                <div
                    className={`h-full ${getTrackColor(score)} transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${score}%`, boxShadow: `0 0 10px ${score >= 75 ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)'}` }}
                ></div>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: UnifiedFeedback }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-12 w-full">
            {/* Main Score Ring */}
            <div className="flex-shrink-0 animate-in zoom-in duration-1000">
                <ScoreRing score={feedback.overallScore} size={180} strokeWidth={14} />
            </div>

            {/* Sub-scores Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 w-full bg-white/30 backdrop-blur-sm p-8 rounded-[32px] border border-white/40">
                <HorizontalProgress title="Skills Match" score={feedback.skills.score} icon="🛠️" />
                <HorizontalProgress title="ATS Suitability" score={feedback.ATS.score} icon="🎯" />
                <HorizontalProgress title="Tone & Style" score={feedback.toneAndStyle.score} icon="🖋️" />
                <HorizontalProgress title="Structure" score={feedback.structure.score} icon="🏗️" />
            </div>
        </div>
    );
};

export default Summary;
