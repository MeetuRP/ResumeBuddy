import MarketingLayout from '../../components/marketing/MarketingLayout';
import PricingSection from '../../components/marketing/PricingSection';

const Pricing = () => (
    <MarketingLayout>
        <div className="pt-10">
            <PricingSection />
            <div className="max-w-3xl mx-auto px-6 pb-40 text-center">
                 <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-8">Frequently Asked Questions</h2>
                 <div className="space-y-8 text-left">
                    <FAQItem 
                        q="Is this a subscription?" 
                        a="No. We believe in job seekers' financial freedom. You pay once for the pass you need, and that's it." 
                    />
                    <FAQItem 
                        q="Will this work for non-tech roles?" 
                        a="While we specialize in tech, our ATS optimization engine works for any corporate role using modern recruitment software." 
                    />
                 </div>
            </div>
        </div>
    </MarketingLayout>
);

const FAQItem = ({ q, a }: { q: string, a: string }) => (
    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
        <h4 className="text-lg font-black text-slate-900 mb-4">{q}</h4>
        <p className="text-slate-500 font-bold italic leading-relaxed">{a}</p>
    </div>
);

export default Pricing;
