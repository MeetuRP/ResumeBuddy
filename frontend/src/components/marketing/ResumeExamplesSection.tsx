import { motion } from 'framer-motion';
import { Link } from 'react-router';

const examples = [
    { title: "AI Engineer", role: "Specializing in RAG & LLMs", color: "indigo" },
    { title: "Backend Dev", role: "Distrubuted Systems Expert", color: "rose" },
    { title: "Data Scientist", role: "Predictive Analytics Lead", color: "emerald" },
    { title: "ML Engineer", role: "Computer Vision focus", color: "amber" }
];

const ResumeExamplesSection = () => {
    return (
        <section id="examples" className="py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">SEO Templates</span>
                    <h2 className="text-5xl font-black tracking-tighter text-slate-900 mb-6">
                        Industry-Standard <span className="text-indigo-600">Blueprints.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-bold italic">Tailored for high-growth tech sectors.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {examples.map((example, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                        >
                            <div className="h-48 bg-slate-100 rounded-3xl mb-8 flex flex-col p-6 space-y-3 overflow-hidden relative">
                                <div className="h-2 w-full bg-slate-200 rounded-full" />
                                <div className="h-2 w-2/3 bg-slate-200 rounded-full" />
                                <div className="h-12 w-12 bg-indigo-600 rounded-xl absolute -bottom-4 -right-4 transition-transform group-hover:-translate-x-6 group-hover:-translate-y-6" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight">{example.title}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">{example.role}</p>
                            
                            <div className="space-y-3">
                                <button 
                                    onClick={() => alert("Previewing " + example.title + "... (Interactive modal coming soon)")}
                                    className="w-full block text-center py-3 bg-slate-50 text-slate-900 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all font-bold"
                                >
                                    Preview
                                </button>
                                <Link 
                                    to="/auth"
                                    className="w-full block text-center py-3 text-indigo-600 border border-indigo-100 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all font-bold"
                                >
                                    Download
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResumeExamplesSection;
