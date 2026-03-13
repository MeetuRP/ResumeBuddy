import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';

const FinalCTA = () => {
    return (
        <section className="py-40 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <h2 className="text-7xl lg:text-9xl font-black tracking-tighter text-slate-900 leading-none">
                        Ready to <span className="text-indigo-600 underline decoration-indigo-600/20 underline-offset-8">Fix</span> <br /> 
                        Your Resume?
                    </h2>
                    
                    <p className="text-2xl text-slate-500 font-bold max-w-2xl mx-auto italic leading-relaxed">
                        Join 10,000+ engineers beating the ATS and getting hired at world-class companies today.
                    </p>

                    <div className="flex justify-center flex-wrap gap-8">
                        <Link 
                            to="/auth?mode=signup"
                            className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-4 group"
                        >
                            Try Free Now <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                    
                    <div className="flex justify-center items-center gap-12 mt-20 opacity-30 grayscale contrast-125">
                         {/* Small badges or icons */}
                         <span className="text-[10px] font-black tracking-widest uppercase">ATS Proof</span>
                         <span className="text-[10px] font-black tracking-widest uppercase">Verified Accuracy</span>
                         <span className="text-[10px] font-black tracking-widest uppercase">Privacy Safe</span>
                    </div>
                </motion.div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-xl aspect-square bg-indigo-50/50 rounded-full blur-[150px] -z-10" />
        </section>
    );
};

export default FinalCTA;
