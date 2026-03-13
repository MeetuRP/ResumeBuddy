import { motion } from 'framer-motion';
import { FiCheck, FiZap, FiTarget, FiBox, FiSearch, FiFileText } from 'react-icons/fi';

const features = [
    {
        title: "AI Resume Analysis",
        desc: "Deep structural analysis of your resume content, identifying gaps that hold you back.",
        icon: <FiSearch />,
        color: "indigo"
    },
    {
        title: "Fix-It AI Tool",
        desc: "One-click optimization for your experience bullets, making them measurable and impactful.",
        icon: <FiZap />,
        color: "rose"
    },
    {
        title: "ATS Optimization",
        desc: "Engineered specifically to beat Workday, Taleo, and Greenhouse filtration systems.",
        icon: <FiTarget />,
        color: "emerald"
    },
    {
        title: "Resume Templates",
        desc: "Premium, ATS-optimized templates that look stunning to both robots and humans.",
        icon: <FiBox />,
        color: "amber"
    },
    {
        title: "JD Match Scanner",
        desc: "Scan your resume against any job description to see your exact match percentage.",
        icon: <FiFileText />,
        color: "violet"
    },
    {
        title: "Cover Letter Generator",
        desc: "AI-generated cover letters tailored perfectly to the specific company and role.",
        icon: <FiCheck />,
        color: "sky"
    }
];

const FeatureGrid = () => {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4 block">Core Infrastructure</span>
                    <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-6">
                        Everything you need to <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">get hired.</span>
                    </h2>
                    <p className="text-xl text-slate-400 font-bold italic">Next-gen tools for the competitive job market.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="group p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-8 transition-transform group-hover:rotate-12 bg-white shadow-sm border border-slate-50 group-hover:border-indigo-50`}>
                                <div className="text-indigo-600">{feature.icon}</div>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
