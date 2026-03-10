'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';
import { clientData } from '@/config/client-data';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = useTranslations('Navbar');
    const router = useRouter();
    const pathname = usePathname();

    const isHomePage = pathname === '/';
    // Use light text only at the top of the Home page (assuming dark hero)
    // In all other cases (scrolled or subpages), use dark text for contrast
    const isLightText = isHomePage && !isScrolled;

    const navTextColor = isLightText ? 'text-white' : 'text-foreground';
    const navTextColorMuted = isLightText ? 'text-white/70' : 'text-foreground/70';

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                "fixed top-6 left-6 right-6 z-50 transition-all duration-700 rounded-full border will-change-transform",
                isScrolled || !isHomePage
                    ? "py-3 bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-white/10"
                    : "py-6 bg-transparent border-transparent",
                isMenuOpen && "bg-black/95 border-white/20"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className={clsx(
                        "w-8 h-8 rounded-sm flex items-center justify-center font-serif font-bold text-xl transition-all duration-500 group-hover:rotate-12",
                        isLightText ? "bg-white text-black" : "bg-primary text-white"
                    )}>
                        {clientData.branding.name.charAt(0)}
                    </div>
                    <span className={clsx("font-serif text-xl tracking-wide hidden sm:block", navTextColor)}>
                        {clientData.branding.name}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {[
                        { label: t('portfolio'), href: '/portfolio' },
                        { label: t('services'), href: '/services' },
                        { label: t('about'), href: '/about' },
                        { label: t('journal'), href: '/journal' }
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "font-sans text-sm tracking-widest uppercase transition-colors duration-300",
                                navTextColorMuted,
                                isLightText ? "hover:text-white" : "hover:text-primary"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Section (Contact & Language) */}
                <div className="flex items-center gap-6">

                    {/* Language Switcher */}
                    <div className="hidden sm:block">
                        <LanguageSwitcher isLightText={isLightText} />
                    </div>

                    <button className={clsx(
                        "px-5 py-2.5 font-sans text-sm font-medium transition-all duration-300 cursor-pointer rounded-sm",
                        isLightText ? "bg-white text-black hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90 shadow-md"
                    )}>
                        {t('contact')}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2 z-[60]"
                        aria-label="Toggle Menu"
                    >
                        <span className={clsx("w-6 h-[1.5px] block transition-all duration-300", navTextColor.replace('text-', 'bg-'), isMenuOpen && "rotate-45 translate-y-[4.5px] !bg-white")} />
                        <span className={clsx("w-6 h-[1.5px] block transition-all duration-300", navTextColor.replace('text-', 'bg-'), isMenuOpen && "-rotate-45 -translate-y-[4.5px] !bg-white")} />
                    </button>
                </div>

            </div>

            {/* Mobile Menu Overlay */}
            <div className={clsx(
                "fixed inset-0 bg-black/95 backdrop-blur-2xl z-[55] flex flex-col items-center justify-center p-6 transition-all duration-500 md:hidden",
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <nav className="flex flex-col items-center gap-8 text-center">
                    {[
                        { label: t('portfolio'), href: '/portfolio' },
                        { label: t('services'), href: '/services' },
                        { label: t('about'), href: '/about' },
                        { label: t('journal'), href: '/journal' }
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white text-3xl font-serif hover:text-white/70 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button
                        className="mt-8 px-10 py-4 bg-white text-black rounded-full font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t('contact')}
                    </button>
                </nav>
            </div>
        </header>
    );
}
