import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Footer' });

    return {
        title: `${t('privacy')} | Luxury Estates Zug`,
    };
}

export default async function PrivacyPage() {
    return (
        <main className="min-h-screen pt-40 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="font-serif text-5xl mb-12">Privacy Policy</h1>

                <div className="prose prose-invert max-w-none font-sans text-foreground/80 leading-relaxed flex flex-col gap-8">
                    <section>
                        <h2 className="text-2xl font-serif text-foreground mb-4">1. General Information</h2>
                        <p>
                            We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-foreground mb-4">2. Data Collection</h2>
                        <p>
                            The use of our website is generally possible without providing personal data. As far as on our sides personal data (for example name, address or email addresses) are collected, this takes place, as far as possible, always on a voluntary basis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-foreground mb-4">3. Contact Form and Email</h2>
                        <p>
                            If you send us inquiries via the contact form or email, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in the event of follow-up questions. We do not pass on this data without your consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-foreground mb-4">4. Cookies</h2>
                        <p>
                            Our website uses so-called cookies. Cookies do not damage your computer and do not contain viruses. Cookies serve to make our offer more user-friendly, effective and secure. Cookies are small text files that are stored on your computer and saved by your browser.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-foreground mb-4">5. Your Rights</h2>
                        <p>
                            You have the right at any time to obtain information free of charge about the origin, recipient and purpose of your stored personal data. You also have a right to request the correction, blocking or deletion of this data.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
