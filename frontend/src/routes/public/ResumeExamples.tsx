import MarketingLayout from '../../components/marketing/MarketingLayout';
import ResumeExamplesSection from '../../components/marketing/ResumeExamplesSection';

const ResumeExamples = () => (
    <MarketingLayout>
        <div className="pt-20">
            <ResumeExamplesSection />
            <div className="max-w-7xl mx-auto px-6 pb-40 text-center">
                <h3 className="text-2xl font-black tracking-tighter text-slate-900 mb-8">Need something more specific?</h3>
                <p className="text-slate-500 font-bold italic mb-12">We add 10+ new industry-specific templates every single week.</p>
                <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all">
                    Request a Template
                </button>
            </div>
        </div>
    </MarketingLayout>
);

export default ResumeExamples;
