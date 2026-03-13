import { motion } from 'framer-motion';
import MarketingLayout from '../../components/marketing/MarketingLayout';
import { FiEye, FiDownload, FiSearch } from 'react-icons/fi';

const templates = [
    { name: "Executive Noir", role: "Leadership / C-Suite", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400" },
    { name: "Tech Minimalist", role: "Software Engineering", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" },
    { name: "Creative Edge", role: "UI/UX & Design", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400" },
    { name: "Data Scientist", role: "ML & Analytics", image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400" },
    { name: "Product Visionary", role: "Product Management", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=400" },
    { name: "Modern Professional", role: "General Tech", image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=400" }
];

const Templates = () => (
    <MarketingLayout>
        <div className="pt-40 pb-40">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                    <div className="max-w-xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4 block">Design Library</span>
                        <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-none mb-8">
                            Engineered for <br />
                            <span className="text-indigo-600 italic">Callbacks.</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-bold italic">Every template is pre-validated against top-tier ATS (Workday, Greenhouse, Lever) to ensure 99.9% readability.</p>
                    </div>
                    
                    <div className="relative group">
                        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Filter by industry..."
                            className="bg-slate-50 border-none rounded-2xl px-6 py-4 pl-14 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all w-full md:w-80"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {templates.map((template, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                                <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                                        <FiEye /> Preview
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                                        <FiDownload /> Use
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 px-4 flex justify-between items-end">
                                <div>
                                    <h3 className="text-xl font-black tracking-tighter text-slate-900 mb-1">{template.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{template.role}</p>
                                </div>
                                <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg uppercase tracking-widest">
                                    ATS Proof
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-40 text-center">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-8 italic">Can't find your ideal layout?</h2>
                    <button className="px-12 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 transition-all">
                        Request Custom Design
                    </button>
                </div>
            </div>
        </div>
    </MarketingLayout>
);

export default Templates;
