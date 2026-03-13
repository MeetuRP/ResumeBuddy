import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const steps = [
    {
        tag: "Step 01",
        title: "Paste your Resume.",
        desc: "Simply paste your current resume text or upload your PDF. Our engine supports complex multi-column layouts used by creative professionals.",
        emoji: "📄",
        color: "indigo"
    },
    {
        tag: "Step 02",
        title: "Deep AI Diagnosis.",
        desc: "Our AI scans your document against 500+ ATS personas, identifying exactly why you're being filtered out by automated systems like Workday.",
        emoji: "🧠",
        color: "rose"
    },
    {
        tag: "Step 03",
        title: "Optimize & Get Hired.",
        desc: "Use the 'Fix-It' tool to transform weak bullets into high-impact, measurable achievements that catch the eye of recruiters instantly.",
        emoji: "🚀",
        color: "emerald"
    }
];

const GuidedTour = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <section className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    
                    {/* Image / Preview Side */}
                    <div className="flex-1 w-full order-2 lg:order-1">
                        <div className="relative aspect-square max-w-[500px] mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, rotateY: 20 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full bg-slate-50 rounded-[3rem] border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex items-center justify-center relative p-12"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                                    
                                    {currentStep === 0 && (
                                        <div className="text-center space-y-6">
                                            <div className="text-8xl">📎</div>
                                            <div className="space-y-3">
                                                <div className="h-2 w-48 bg-slate-200 rounded-full mx-auto" />
                                                <div className="h-2 w-32 bg-slate-100 rounded-full mx-auto" />
                                                <div className="h-2 w-40 bg-slate-100 rounded-full mx-auto" />
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 1 && (
                                        <div className="w-full space-y-6">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="h-6 w-24 bg-indigo-100 rounded-lg animate-pulse" />
                                                <div className="h-6 w-12 bg-rose-100 rounded-lg" />
                                            </div>
                                            <div className="space-y-4">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="flex gap-4">
                                                        <div className="h-4 w-4 rounded-full bg-slate-100" />
                                                        <div className="flex-1 space-y-2">
                                                            <div className="h-2 w-full bg-slate-100 rounded-full" />
                                                            <div className="h-2 w-2/3 bg-slate-50 rounded-full" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="w-full space-y-6">
                                            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                                                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Original</span>
                                                <p className="text-xs font-bold text-slate-400 italic">"Built chatbot using Python"</p>
                                            </div>
                                            <div className="p-6 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-600/20 space-y-4">
                                                <span className="text-[8px] font-black uppercase text-indigo-300 tracking-widest">AI Improved</span>
                                                <p className="text-xs font-black text-white leading-relaxed">
                                                    "Developed RAG chatbot using Python and FastAPI, improving retrieval efficiency by 35%."
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Decor elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-indigo-500/5 rounded-full blur-3xl -z-10" />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 order-1 lg:order-2">
                        <div className="space-y-12">
                            {steps.map((step, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setCurrentStep(idx)}
                                    className={`group cursor-pointer p-8 rounded-[2.5rem] transition-all duration-500 border ${
                                        currentStep === idx 
                                            ? "bg-slate-50 border-slate-100 shadow-sm" 
                                            : "hover:bg-slate-50/50 border-transparent"
                                    }`}
                                >
                                    <div className="flex gap-6">
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 transition-all ${
                                            currentStep === idx 
                                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                                                : "bg-slate-100 text-slate-400"
                                        }`}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block transition-colors ${
                                                currentStep === idx ? "text-indigo-600" : "text-slate-400"
                                            }`}>
                                                {step.tag}
                                            </span>
                                            <h3 className={`text-2xl font-black tracking-tighter mb-4 transition-colors ${
                                                currentStep === idx ? "text-slate-900" : "text-slate-400"
                                            }`}>
                                                {step.title}
                                            </h3>
                                            {currentStep === idx && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="text-slate-500 font-bold leading-relaxed italic"
                                                >
                                                    {step.desc}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex items-center justify-between px-8">
                            <div className="flex gap-2">
                                {steps.map((_, i) => (
                                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentStep === i ? "w-8 bg-indigo-600" : "w-1.5 bg-slate-200"}`} />
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    disabled={currentStep === 0}
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                >
                                    <FiArrowLeft />
                                </button>
                                <button 
                                    disabled={currentStep === steps.length - 1}
                                    onClick={() => setCurrentStep(prev => prev + 1)}
                                    className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 disabled:opacity-30 transition-all"
                                >
                                    <FiArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GuidedTour;
