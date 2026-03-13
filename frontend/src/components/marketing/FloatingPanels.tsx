import { motion } from 'framer-motion';
import { FiTarget, FiZap, FiBarChart2 } from 'react-icons/fi';

const FloatingPanels = ({ scene }: { scene: number }) => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* ATS Score Panel */}
            <motion.div
                initial={{ x: -100, y: -50, opacity: 0 }}
                animate={{ 
                    x: 0, y: 0, opacity: 1,
                    translateY: [0, -10, 0] 
                }}
                transition={{ 
                    duration: 1, 
                    translateY: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className="absolute top-10 left-10 z-20"
            >
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-2xl shadow-indigo-500/10 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">ATS Score</span>
                    <motion.span 
                        className="text-5xl font-black tracking-tighter text-indigo-600"
                        animate={{
                            scale: scene >= 5 ? [1, 1.2, 1] : 1
                        }}
                    >
                        {scene <= 4 && "58"}
                        {scene === 5 && "72"}
                        {scene >= 6 && "88"}
                    </motion.span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                        <motion.div 
                            className="h-full bg-indigo-600"
                            animate={{ 
                                width: scene <= 4 ? "58%" : scene === 5 ? "72%" : "88%" 
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Keyword Match Panel */}
            <motion.div
                initial={{ x: 100, y: 200, opacity: 0 }}
                animate={{ 
                    x: 0, y: 0, opacity: 1,
                    translateY: [0, 15, 0]
                }}
                transition={{ 
                    duration: 1, delay: 0.5,
                    translateY: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                }}
                className="absolute bottom-20 right-0 z-20"
            >
                <div className="bg-indigo-900/90 backdrop-blur-xl p-5 rounded-3xl border border-indigo-700 shadow-2xl flex items-center gap-4">
                    <div className="h-10 w-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 text-xl">
                        <FiTarget />
                    </div>
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300 block">Keyword Match</span>
                        <span className="text-xl font-black text-white">92% Optimized</span>
                    </div>
                </div>
            </motion.div>

            {/* Fix Suggestions Panel */}
            <motion.div
                initial={{ x: 120, y: -20, opacity: 0 }}
                animate={{ 
                    x: 0, y: 0, opacity: 1,
                    translateY: [0, -12, 0]
                }}
                transition={{ 
                    duration: 1, delay: 1,
                    translateY: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                }}
                className="absolute top-20 right-10 z-20"
            >
                <div className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-white shadow-xl flex items-center gap-4">
                    <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-xl">
                        <FiZap />
                    </div>
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">AI Fix Suggestions</span>
                        <span className="text-sm font-black text-slate-900">12 Bullets Refined</span>
                    </div>
                </div>
            </motion.div>

            {/* Impact Score Panel */}
            <motion.div
                initial={{ x: -80, y: 250, opacity: 0 }}
                animate={{ 
                    x: 0, y: 0, opacity: 1,
                    translateY: [0, 10, 0]
                }}
                transition={{ 
                    duration: 1, delay: 1.5,
                    translateY: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
                }}
                className="absolute bottom-10 left-20 z-10"
            >
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                    <FiBarChart2 className="text-indigo-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Impact Score +45%</span>
                </div>
            </motion.div>

            {/* Resume Preview Decor */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl -z-10"
            />
        </div>
    );
};

export default FloatingPanels;
