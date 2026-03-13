import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiArrowRight, FiPlay, FiCpu } from 'react-icons/fi';
import { Link } from 'react-router';
import FloatingPanels from './FloatingPanels.tsx';

const HeroSection = () => {
    const [scene, setScene] = useState(1);

    useEffect(() => {
        const timers = [
            setTimeout(() => setScene(2), 3000),
            setTimeout(() => setScene(3), 6000),
            setTimeout(() => setScene(4), 9000),
            setTimeout(() => setScene(5), 12000),
            setTimeout(() => setScene(6), 15000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Left Side: Content */}
                    <div className="relative order-2 lg:order-1">
                        <AnimatePresence mode="wait">
                            {scene === 6 ? (
                                <motion.div
                                    key="scene-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-8">
                                        <FiCpu className="text-sm" /> AI-Powered Career Engine
                                    </span>
                                    <h1 className="text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-8">
                                        AI Resume Optimizer for <span className="text-indigo-600">Modern Seekers.</span>
                                    </h1>
                                    <p className="text-xl lg:text-2xl text-slate-500 font-bold mb-12 max-w-xl leading-relaxed italic">
                                        Beat ATS filters, bypass the "Workday Void," and get more interviews using next-gen AI.
                                    </p>
                                    <div className="flex flex-wrap gap-6">
                                        <Link 
                                            to="/auth?mode=signup"
                                            className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-3"
                                        >
                                            Try Free <FiArrowRight className="text-lg" />
                                        </Link>
                                        <button 
                                            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-slate-50 transition-all flex items-center gap-3"
                                        >
                                            Watch Demo <FiPlay className="text-indigo-600" />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="animation-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-40 flex flex-col justify-center"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                            className="h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full"
                                        />
                                        <span className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600">
                                            {scene === 1 && "Resume Detected"}
                                            {scene === 2 && "Section Analysis"}
                                            {scene === 3 && "Diagnosis in Progress"}
                                            {scene === 4 && "AI Optimization"}
                                            {scene === 5 && "Score Recalculation"}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                                        {scene === 1 && "Analyzing document..."}
                                        {scene === 2 && "Scanning keywords & ATS compatibility..."}
                                        {scene === 3 && "Identifying structural weaknesses..."}
                                        {scene === 4 && "Generating measurable achievements..."}
                                        {scene === 5 && "Increasing recruitment visibility..."}
                                    </h2>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side: The Animation Canvas */}
                    <div className="relative h-[600px] order-1 lg:order-2">
                        <FloatingPanels scene={scene} />
                        
                        {/* Central Resume Card Animation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="relative w-80 h-[450px] bg-white rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 p-8 overflow-hidden"
                            >
                                {/* Resume Content Simulation */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                        <div className="h-12 w-12 bg-slate-100 rounded-xl" />
                                        <div className="space-y-2">
                                            <div className="h-3 w-32 bg-slate-200 rounded-full" />
                                            <div className="h-2 w-20 bg-slate-100 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Scan Lines in Scene 2 */}
                                    {scene === 2 && (
                                        <motion.div 
                                            initial={{ top: 0 }}
                                            animate={{ top: "100%" }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-10"
                                        />
                                    )}

                                    <div className="space-y-4">
                                        <h4 className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Experience</h4>
                                        <div className="space-y-3 relative">
                                            {/* Bullet Item 1 */}
                                            <div className="flex gap-2">
                                                <div className="mt-1.5 h-1 w-1 rounded-full bg-slate-300" />
                                                <div className="space-y-1.5 flex-1">
                                                    <div className="h-2 w-full bg-slate-100 rounded-full" />
                                                    
                                                    {scene >= 4 ? (
                                                        <motion.div 
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="p-3 bg-indigo-50 rounded-xl border border-indigo-100"
                                                        >
                                                            <p className="text-[10px] font-black text-indigo-700 leading-snug">
                                                                Developed RAG-based AI chatbot improving retrieval accuracy by 35%.
                                                            </p>
                                                        </motion.div>
                                                    ) : (
                                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                            <p className="text-[10px] font-bold text-slate-400">
                                                                Built AI chatbot.
                                                            </p>
                                                            {scene === 3 && (
                                                                <motion.div 
                                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                                    className="mt-2 flex items-center gap-1.5 text-rose-500 font-black text-[7px] uppercase"
                                                                >
                                                                    <FiAlertCircle /> No measurable achievements
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Bullet Item 2 */}
                                            <div className="flex gap-2">
                                                <div className="mt-1.5 h-1 w-1 rounded-full bg-slate-300" />
                                                <div className="space-y-1.5 flex-1">
                                                    <div className="h-2 w-4/5 bg-slate-100 rounded-full" />
                                                    <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                                                    {scene === 3 && (
                                                        <motion.div 
                                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                            className="flex items-center gap-1.5 text-rose-500 font-black text-[7px] uppercase"
                                                        >
                                                            <FiAlertCircle /> Missing deployment tools
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ATS Glow Overlay */}
                                <motion.div 
                                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-indigo-500/10 to-transparent"
                                    animate={{ opacity: scene >= 5 ? 1 : 0 }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
