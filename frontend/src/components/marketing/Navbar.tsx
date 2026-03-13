import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={twMerge(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6",
                scrolled ? "bg-white/70 backdrop-blur-xl border-b border-white/20 py-4 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/20">
                        A
                    </div>
                    <span className="text-xl font-black tracking-tighter text-slate-900">
                        AntiGhost <span className="text-indigo-600">CV</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <NavLink to="/features">Features</NavLink>
                    <NavLink to="/templates">Templates</NavLink>
                    <NavLink to="/resume-examples">Resume Examples</NavLink>
                    <NavLink to="/pricing">Pricing</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>

                <div className="flex items-center gap-4">
                    <Link 
                        to="/auth" 
                        className="px-6 py-2.5 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-all"
                    >
                        Sign In
                    </Link>
                    <Link 
                        to="/auth" 
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link 
        to={to} 
        className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-600 transition-colors"
    >
        {children}
    </Link>
);

export default Navbar;
