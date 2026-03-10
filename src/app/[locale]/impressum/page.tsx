import { getTranslations } from 'next-intl/server';
import { clientData } from '@/config/client-data';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Footer' });

    return {
        title: `${t('impressum')} | Luxury Estates Zug`,
    };
}

export default async function ImpressumPage() {
    return (
        <main className="min-h-screen pt-40 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="font-serif text-5xl mb-12">Impressum</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-sans text-foreground/80 leading-relaxed">
                    <section className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-sm uppercase tracking-widest text-foreground/40 font-semibold">Address</h2>
                            <p className="text-lg text-foreground">
                                {clientData.branding.name}<br />
                                Bahnhofstrasse 10<br />
                                6300 Zug<br />
                                Switzerland
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="text-sm uppercase tracking-widest text-foreground/40 font-semibold">Contact</h2>
                            <p className="text-lg text-foreground">
                                Phone: {clientData.contact.phone}<br />
                                Email: {clientData.contact.email}
                            </p>
                        </div>
                    </section>

                    <section className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-sm uppercase tracking-widest text-foreground/40 font-semibold">Represented By</h2>
                            <p className="text-lg text-foreground">
                                {clientData.content.about.en.split('.')[0]}.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="text-sm uppercase tracking-widest text-foreground/40 font-semibold">Commercial Registry</h2>
                            <p className="text-foreground">
                                Canton of Zug<br />
                                Company ID: CHE-000.000.000 (Placeholder)
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 pt-8 border-t border-foreground/10">
                            <h2 className="text-sm uppercase tracking-widest text-foreground/40 font-semibold italic underline">Legal Disclaimer</h2>
                            <p className="text-sm opacity-60 italic">
                                Information according to § 5 TMG / Art. 3 Abs. 1 lit. s UWG. Luxury Estates Zug assumes no liability for the topicality, correctness, completeness or quality of the information provided.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
