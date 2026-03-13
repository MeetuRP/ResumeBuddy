import { motion } from 'framer-motion';

const ScoreComparison = () => {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-slate-50 rounded-[4rem] p-16 lg:p-24 border border-slate-100 flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative">
                    
                    {/* Content */}
                    <div className="flex-1 space-y-8 z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 block">Performance Lift</span>
                        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                            Stop guessing. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">Start winning.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-md italic">
                            A single optimization session can be the difference between a rejection email and a recruiter phone call.
                        </p>
                    </div>

                    {/* Animation Side */}
                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                         <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center"
                         >
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-6 block">Before AntiGhost</span>
                            <div className="text-6xl font-black text-slate-300 mb-4">58</div>
                            <div className="h-2 w-full bg-slate-100 rounded-full">
                                <div className="h-full w-[58%] bg-slate-300 rounded-full" />
                            </div>
                         </motion.div>

                         <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-indigo-600 p-10 rounded-3xl shadow-2xl shadow-indigo-600/30 text-center relative overflow-hidden"
                         >
                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300 mb-6 block">After Fix-It AI</span>
                            <motion.div 
                                className="text-6xl font-black text-white mb-4"
                                initial={{ scale: 1 }}
                                whileInView={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                88
                            </motion.div>
                            <div className="h-2 w-full bg-indigo-500 rounded-full">
                                <motion.div 
                                    className="h-full bg-white rounded-full" 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "88%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </div>
                            {/* Particle burst placeholder */}
                            <div className="absolute inset-0 bg-white/5" />
                         </motion.div>
                    </div>

                    {/* Decor Blur */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[100px] -z-0" />
                </div>
            </div>
        </section>
    );
};

export default ScoreComparison;
