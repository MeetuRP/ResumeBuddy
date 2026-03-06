
const ATS = ({ score, suggestions }: { score: number; suggestions: string[] }) => {
    const getScoreVariant = (s: number) => {
        if (s >= 75) return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: '✅' };
        if (s >= 50) return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: '🎯' };
        return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', icon: '⚠️' };
    };

    const variant = getScoreVariant(score);

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚡</span>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">ATS Compatibility</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
            </div>

            <div className="glass-card-sm p-8 bg-white/40 border-white/60 relative overflow-hidden">
                {/* Score Indicator */}
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className={`flex flex-col items-center justify-center w-36 h-36 rounded-3xl ${variant.bg} border ${variant.border} shadow-inner`}>
                        <span className={`text-4xl font-black ${variant.color}`}>{score}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">ATS INDEX</span>
                    </div>

                    <div className="flex-1 space-y-4">
                        <h4 className="text-2xl font-black text-slate-900 leading-tight">
                            How well does your resume pass through <span className="text-indigo-600 underline decoration-indigo-200">Applicant Tracking Systems</span>?
                        </h4>
                        <p className="text-slate-500 font-medium">Your resume was analyzed against established ATS parsing algorithms. Here is your compatibility report:</p>
                    </div>
                </div>

                {/* Suggestions Grid */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-5 bg-white/60 rounded-2xl border border-white/80 hover:shadow-md transition-all group"
                        >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                <span className="text-xs">💡</span>
                            </span>
                            <p className="text-[14px] font-bold text-slate-700 leading-relaxed pt-1">{suggestion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ATS;
