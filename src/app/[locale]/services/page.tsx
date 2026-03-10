import { getTranslations } from 'next-intl/server';
import { clientData } from '@/config/client-data';
import { Mail, Phone, Shield, BarChart3, Globe2 } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Navbar' });

    return {
        title: `${t('services')} | Luxury Estates Zug`,
    };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Services' });

    const icons = [<Shield key="1" size={32} />, <BarChart3 key="2" size={32} />, <Globe2 key="3" size={32} />];

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <header className="mb-24 text-center max-w-3xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-7xl mb-8 text-foreground leading-tight">
                        {t('title')}
                    </h1>
                    <p className="font-sans text-xl text-foreground/70 font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[1, 2, 3].map((num, i) => (
                        <div key={num} className="glass-card p-10 rounded-3xl flex flex-col gap-6 hover:translate-y-[-8px] transition-transform duration-500">
                            <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground/80">
                                {icons[i]}
                            </div>
                            <h3 className="font-serif text-2xl text-foreground">
                                {t(`service${num}Title` as any)}
                            </h3>
                            <p className="font-sans text-foreground/70 leading-relaxed">
                                {t(`service${num}Desc` as any)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-32 glass-card p-12 md:p-20 rounded-[3rem] text-center bg-foreground text-surface">
                    <h2 className="font-serif text-4xl md:text-5xl mb-8">
                        Experience individual excellence.
                    </h2>
                    <p className="font-sans text-lg opacity-80 max-w-2xl mx-auto mb-12 font-light">
                        Our discrete approach ensures that your real estate journey is as exclusive as the properties we represent.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href={`mailto:${clientData.contact.email}`}
                            className="px-10 py-4 bg-surface text-foreground rounded-full font-medium hover:scale-105 transition-transform flex items-center gap-3"
                        >
                            <Mail size={18} />
                            Email Us
                        </a>
                        <a
                            href={`tel:${clientData.contact.phone}`}
                            className="px-10 py-4 border border-surface/30 text-surface rounded-full font-medium hover:bg-surface/10 transition-colors flex items-center gap-3"
                        >
                            <Phone size={18} />
                            {clientData.contact.phone}
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
