import type { UnifiedFeedback } from "../types";

const DetailCard = ({ icon, title, items, variant }: {
    icon: string,
    title: string,
    items: { type: "good" | "improve"; tip: string }[],
    variant: 'success' | 'warning'
}) => {
    if (items.length === 0) return null;

    const isSuccess = variant === 'success';

    return (
        <div className={`glass-card-sm p-6 flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500 overflow-hidden relative`}>
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -mr-12 -mt-12 ${isSuccess ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}></div>

            <div className="flex items-center gap-3 border-b border-slate-200/40 pb-4 relative z-10">
                <span className="text-xl">{icon}</span>
                <h4 className={`text-xs font-black uppercase tracking-widest ${isSuccess ? 'text-emerald-700' : 'text-slate-600'}`}>
                    {title}
                </h4>
                <span className={`ml-auto px-2 py-0.5 rounded-md text-[10px] font-bold ${isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {items.length} Items
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded-xl transition-all hover:translate-x-1 ${isSuccess ? 'bg-emerald-50/40' : 'bg-white/40 border border-white/60'}`}
                    >
                        <span className="mt-0.5 flex-shrink-0">
                            {isSuccess ? '✅' : '⚠️'}
                        </span>
                        <p className={`text-[13px] font-bold leading-relaxed ${isSuccess ? 'text-emerald-900' : 'text-slate-700'}`}>
                            {item.tip.replace('Matches: ', '').replace('Missing: ', '')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: UnifiedFeedback }) => {
    const matchedSkills = feedback.skills.tips.filter(t => t.type === 'good');
    const missingSkills = feedback.skills.tips.filter(t => t.type === 'improve');

    return (
        <div className="flex flex-col gap-10 w-full pb-20">
            {/* Skills Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🛠️</span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Technical Skills</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <DetailCard icon="✨" title="Matches Found" items={matchedSkills} variant="success" />
                    <DetailCard icon="🔍" title="Missing Core Skills" items={missingSkills} variant="warning" />
                </div>
            </div>

            {/* Structure & Formatting - Futuristic Evolution */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🏗️</span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Structure & Formatting</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <DetailCard
                        icon="📐"
                        title="Layout Precision"
                        items={feedback.structure.tips}
                        variant={feedback.structure.score > 70 ? 'success' : 'warning'}
                    />
                </div>
            </div>

            {/* Tone & Content Evolution */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🎭</span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Tone & Content Evolution</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <DetailCard
                        icon="🖋️"
                        title="Tone & Style"
                        items={feedback.toneAndStyle.tips}
                        variant={feedback.toneAndStyle.score > 70 ? 'success' : 'warning'}
                    />
                    <DetailCard
                        icon="📊"
                        title="Content Impact"
                        items={feedback.content.tips}
                        variant={feedback.content.score > 70 ? 'success' : 'warning'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Details;
