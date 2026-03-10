import { clientData } from '@/config/client-data';
import { Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navbar');

    return (
        <footer
            className="relative w-full bg-[var(--color-primary)] text-[var(--color-surface)] pt-24 pb-12 px-6 md:px-12 lg:px-24 rounded-t-[2.5rem] mt-24 will-change-transform"
        >
            <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

                {/* Top Section: CTA & Large Typography */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-white/10 pb-16">
                    <div className="max-w-2xl">
                        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
                            {t('title')}
                        </h2>
                        <p className="font-sans text-lg text-white/70 font-light max-w-md">
                            {t('description')}
                        </p>
                    </div>

                    <a
                        href={`mailto:${clientData.contact.email}`}
                        className="group flex flex-col items-start gap-2 text-xl font-serif text-white/90 hover:text-white transition-colors w-fit"
                    >
                        <span className="text-sm font-sans uppercase tracking-widest text-white/50 mb-2">{t('contact')}</span>
                        <span className="flex items-center gap-4 text-2xl md:text-3xl border-b border-white/20 pb-2 group-hover:border-white transition-colors">
                            {clientData.contact.email}
                            <ArrowUpRight size={28} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </span>
                    </a>
                </div>

                {/* Middle Section: Links & Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-sans text-sm pb-16">
                    <div className="flex flex-col gap-4 items-start">
                        <h3 className="uppercase tracking-widest text-white/50 mb-2 font-semibold">{t('location')}</h3>
                        <p className="text-white/80 leading-relaxed text-left">
                            Bahnhofstrasse 10<br />
                            6300 Zug<br />
                            Switzerland
                        </p>
                        <a href={clientData.contact.googleMaps} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity underline underline-offset-4 decoration-white/30 mt-2">
                            {t('directions')}
                        </a>
                    </div>

                    <div className="flex flex-col gap-4 items-start">
                        <h3 className="uppercase tracking-widest text-white/50 mb-2 font-semibold">{t('navigation')}</h3>
                        <div className="flex flex-col gap-3 items-start">
                            {[
                                { label: tNav('portfolio'), href: '/portfolio' },
                                { label: tNav('services'), href: '/services' },
                                { label: tNav('about'), href: '/about' },
                                { label: tNav('journal'), href: '/journal' }
                            ].map((item, index) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-white/80 hover:text-white transition-colors capitalize will-change-[opacity]"
                                    style={{ transform: 'translateZ(0)' }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="uppercase tracking-widest text-white/50 mb-2 font-semibold">{t('socials')}</h3>
                        <div className="flex gap-4">
                            {clientData.contact.instagram && (
                                <a
                                    href={clientData.contact.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors will-change-transform"
                                    style={{ transform: 'translateZ(0)' }}
                                    aria-label="Instagram"
                                >
                                    <Instagram size={20} />
                                </a>
                            )}
                            {clientData.contact.linkedin && (
                                <a
                                    href={clientData.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors will-change-transform"
                                    style={{ transform: 'translateZ(0)' }}
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {clientData.contact.facebook && (
                                <a
                                    href={clientData.contact.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors will-change-transform"
                                    style={{ transform: 'translateZ(0)' }}
                                    aria-label="Facebook"
                                >
                                    <Facebook size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>                {/* Bottom Section: Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-white/40 pt-8 border-t border-white/10">
                    <p>© {currentYear} {clientData.branding.name}. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white/80 transition-colors">{t('privacy')}</Link>
                        <Link href="/impressum" className="hover:text-white/80 transition-colors">{t('impressum')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
