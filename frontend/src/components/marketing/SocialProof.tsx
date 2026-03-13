import { motion } from 'framer-motion';

const SocialProof = () => {
    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Dark Mode Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-rose-600/20 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-7xl font-black text-white tracking-tighter">10k+</h3>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Resumes Optimized</p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-7xl font-black text-indigo-500 tracking-tighter">92%</h3>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">ATS Success Rate</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-7xl font-black text-white tracking-tighter">25+</h3>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Countries Covered</p>
                    </motion.div>
                </div>

                <div className="mt-40 pt-20 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-12">Trusted by seekers from</p>
                    <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale invert brightness-0 transition-all hover:grayscale-0 hover:opacity-80">
                         {/* Imagine Logos Here: Google, Amazon, Meta, etc. */}
                         <span className="text-2xl font-black text-white tracking-tighter">GOOG</span>
                         <span className="text-2xl font-black text-white tracking-tighter">AMZN</span>
                         <span className="text-2xl font-black text-white tracking-tighter">META</span>
                         <span className="text-2xl font-black text-white tracking-tighter">WORK</span>
                         <span className="text-2xl font-black text-white tracking-tighter">STRIPE</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
