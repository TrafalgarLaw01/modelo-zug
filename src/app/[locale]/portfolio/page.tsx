import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { BentoGrid } from '@/components/ui/BentoGrid';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Portfolio' });

    return {
        title: `${t('title')} | Luxury Estates Zug`,
    };
}

export default function PortfolioPage() {
    const t = useTranslations('Portfolio');

    return (
        <main className="min-h-[100vh] pt-32 pb-24 bg-surface">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center">
                <h1 className="font-serif text-5xl md:text-7xl mb-6 text-primary">
                    {t('title')}
                </h1>
                <p className="font-sans text-lg text-primary/70 max-w-2xl mx-auto">
                    {t('description')}
                </p>
            </div>

            {/* Reuse the Bento Grid component for the listings display */}
            <BentoGrid />
        </main>
    );
}
