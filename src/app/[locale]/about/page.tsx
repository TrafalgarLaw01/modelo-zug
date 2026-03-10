import { getTranslations } from 'next-intl/server';
import { AboutSection } from '@/components/ui/AboutSection';
import { clientData } from '@/config/client-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    return {
        title: `About Us | ${t('title')}`,
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <main className="min-h-screen pt-32 pb-24 flex flex-col items-center">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center">
                <h1 className="font-serif text-5xl md:text-7xl mb-6 capitalize text-foreground">Our Story</h1>
                <p className="font-sans text-lg text-foreground/70 max-w-3xl mx-auto">
                    Discover the heritage and values that drive our boutique real estate approach.
                </p>
            </div>

            {/* Reuse the About section component */}
            <AboutSection description={clientData.content.about[locale as keyof typeof clientData.content.about]} />
        </main>
    );
}
