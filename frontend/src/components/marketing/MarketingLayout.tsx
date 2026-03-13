import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MarketingLayoutProps {
    children: React.ReactNode;
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
    return (
        <div className="min-h-screen bg-premium-gradient-bg selection:bg-indigo-100 italic font-sans overflow-x-hidden">
            <Navbar />
            <main className="pt-0">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;
