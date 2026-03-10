import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Journal' });

    return {
        title: `${t('title')} | Luxury Estates Zug`,
    };
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Journal' });

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
                <h1 className="font-serif text-5xl md:text-7xl mb-6">{t('title')}</h1>
                <p className="font-sans text-lg text-foreground/70 max-w-2xl mb-24 mx-auto">
                    {t('description')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder Articles */}
                    {[1, 2, 3].map((item) => (
                        <article key={item} className="flex flex-col gap-4 group cursor-pointer">
                            <div className="aspect-[4/3] w-full bg-surface/5 rounded-sm overflow-hidden border border-foreground/5">
                                <div className="w-full h-full bg-gradient-to-tr from-black/5 to-black/20 group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-sans uppercase tracking-widest text-foreground/50">{t('articleBadge')} • Oct 2026</span>
                                <h3 className="font-serif text-2xl group-hover:text-secondary transition-colors duration-300">
                                    The Rise of Off-Market Transactions in Zug
                                </h3>
                                <div className="h-[1px] w-12 bg-foreground/20 mt-4 group-hover:w-full transition-all duration-500 ease-out" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
