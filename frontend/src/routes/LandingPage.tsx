import MarketingLayout from '../components/marketing/MarketingLayout';
import HeroSection from '../components/marketing/HeroSection';
import FeatureGrid from '../components/marketing/FeatureGrid';
import AIDiagnosisDemo from '../components/marketing/AIDiagnosisDemo';
import GuidedTour from '../components/marketing/GuidedTour';
import PricingSection from '../components/marketing/PricingSection';
import SocialProof from '../components/marketing/SocialProof';
import ScoreComparison from '../components/marketing/ScoreComparison';
import FinalCTA from '../components/marketing/FinalCTA';
import ResumeExamplesSection from '../components/marketing/ResumeExamplesSection';

const LandingPage = () => {
    return (
        <MarketingLayout>
            <HeroSection />
            <div className="relative">
                <FeatureGrid />
                <AIDiagnosisDemo />
                <GuidedTour />
                <ScoreComparison />
                <SocialProof />
                <PricingSection />
                <ResumeExamplesSection />
                <FinalCTA />
            </div>
        </MarketingLayout>
    );
};

export default LandingPage;
