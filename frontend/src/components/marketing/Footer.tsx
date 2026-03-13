import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                                A
                            </div>
                            <span className="text-lg font-black tracking-tighter text-slate-900">
                                AntiGhost <span className="text-indigo-600">CV</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-xs mb-8">
                            Stop getting left on 'read' by Workday. The ultimate tool for modern job seekers.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Product</h4>
                        <ul className="space-y-4">
                            <FooterLink to="/features">Features</FooterLink>
                            <FooterLink to="/pricing">Pricing</FooterLink>
                            <FooterLink to="/templates">Templates</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <FooterLink to="/resume-examples">Examples</FooterLink>
                            <FooterLink to="/blog">Blog</FooterLink>
                            <FooterLink to="/about">About Us</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Support</h4>
                        <ul className="space-y-4">
                            <FooterLink to="/contact">Contact</FooterLink>
                            <FooterLink to="/privacy">Privacy</FooterLink>
                            <FooterLink to="/terms">Terms</FooterLink>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        © 2026 AntiGhost CV. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Built with AI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <li>
        <Link to={to} className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors">
            {children}
        </Link>
    </li>
);

export default Footer;
