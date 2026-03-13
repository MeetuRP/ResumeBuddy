import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router';

const AIDiagnosisDemo = () => {
    const [text, setText] = useState("");
    const [step, setStep] = useState(0); // 0: input, 1: loading, 2: results

    const handleAnalyze = () => {
        if (!text.trim()) return;
        setStep(1);
        
        // Simulated progress
        setTimeout(() => {}, 1500);
    };

    const statusMessages = [
        "Scanning resume content...",
        "Extracting key achievements...",
        "Checking keyword density...",
        "Evaluating ATS compatibility...",
        "Comparing with industry benchmarks..."
    ];

    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        if (step === 1) {
            const timer = setInterval(() => {
                setMsgIdx(prev => {
                    if (prev === statusMessages.length - 1) {
                        clearInterval(timer);
                        setStep(2);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 800);
            return () => clearInterval(timer);
        }
    }, [step]);

    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4 block">Interactive Demo</span>
                        <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-8 leading-tight">
                            Try the AI Diagnosis <span className="text-indigo-600">Instantly.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-bold mb-10 leading-relaxed italic">
                            Paste a snippet of your resume bullet points and watch AntiGhost CV diagnose the structural weaknesses in real-time.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl flex-shrink-0">
                                    <FiCheck />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-900 mb-1 tracking-tight">Zero-Log Analysis</h4>
                                    <p className="text-xs text-slate-400 font-medium">Your data is processed in-memory and never stored during the demo.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-white p-10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div
                                        key="input"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    >
                                        <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Paste your resume bullet points here (e.g. 'Built a chatbot using Python and React')..."
                                            className="w-full h-48 bg-slate-50 border-none rounded-2xl p-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all mb-8 resize-none"
                                        />
                                        <button 
                                            onClick={handleAnalyze}
                                            disabled={!text.trim()}
                                            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                        >
                                            Analyze Resume <FiSearch className="text-lg" />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="h-[320px] flex flex-col items-center justify-center text-center"
                                    >
                                        <motion.div 
                                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="text-6xl mb-8"
                                        >
                                            🧠
                                        </motion.div>
                                        <p className="text-xl font-black text-slate-900 tracking-tight mb-4">{statusMessages[msgIdx]}</p>
                                        <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-indigo-600"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(msgIdx + 1) * 20}%` }}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Analysis Results</h4>
                                            <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black rounded-lg border border-rose-100">Action Required</span>
                                        </div>

                                        <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                            <div className="h-20 w-20 flex-shrink-0 bg-white rounded-full border-4 border-rose-100 flex items-center justify-center">
                                                <span className="text-3xl font-black text-rose-600 tracking-tighter">68</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">ATS Compatibility</p>
                                                <p className="text-xs text-slate-400 font-bold italic">Standard Enterprise Threshold: 85+</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                                                <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest block mb-2">Strengths</span>
                                                <p className="text-[10px] font-bold text-slate-600 italic">✔ Python experience detected</p>
                                            </div>
                                            <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
                                                <span className="text-[9px] font-black uppercase text-rose-600 tracking-widest block mb-2">Weaknesses</span>
                                                <p className="text-[10px] font-bold text-slate-600 italic">⚠ Missing measurable impact</p>
                                            </div>
                                        </div>

                                        <Link 
                                            to="/auth"
                                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                                        >
                                            Sign Up Free to Fix <FiCheck className="text-lg" />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Decor Panels */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600/10 rounded-3xl blur-2xl -z-10" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-600/10 rounded-3xl blur-2xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIDiagnosisDemo;
