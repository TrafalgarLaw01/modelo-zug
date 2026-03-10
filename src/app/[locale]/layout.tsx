import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';
import { clientData } from '@/config/client-data';
import { SmoothScrolling } from '@/components/providers/SmoothScrolling';
import { ClientThemeProvider } from '@/components/providers/ClientThemeProvider';
import { Navbar } from '@/components/ui/Navbar';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { Footer } from '@/components/ui/Footer';
import { Preloader } from '@/components/ui/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Títulos e descrições estratégicas baseadas no novo copy
  const titles = {
    de: "Luxury Estates Zug | Diskrete Immobilien & Off-Market Objekte",
    en: "Luxury Estates Zug | Discreet Real Estate & Off-Market Properties",
    fr: "Luxury Estates Zug | Immobilier de Prestige & Propriétés Hors Marché"
  };

  const descriptions = {
    de: "Ihr vertrauenswürdiger Partner für erstklassige Off-Market Immobilien in Zug. Diskretion trifft auf Exzellenz im Herzen der Schweiz.",
    en: "Your trusted partner for premier off-market real estate in Zug. Where discretion meets excellence in the heart of Switzerland.",
    fr: "Votre partenaire de confiance pour l'immobilier d'exception hors marché à Zoug. Là où la discrétion rencontre l'excellence."
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://luxuryestates-zug.ch',
      siteName: clientData.branding.name,
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": clientData.branding.name,
    "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
    "@id": "https://luxuryestates-zug.ch",
    "url": "https://luxuryestates-zug.ch",
    "telephone": clientData.contact.phone, // Usando o telefone direto conforme pedido
    "email": clientData.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bahnhofstrasse 10",
      "addressLocality": "Zug",
      "postalCode": "6300",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.1662,
      "longitude": 8.5155
    },
    "areaServed": "Zug, Switzerland"
  };

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('awwwards_preloader_done') === 'true') {
                  document.documentElement.classList.add('hide-preloader');
                }
              } catch (e) {}
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-surface text-foreground font-sans selection:bg-primary/30 grain-overlay">
        <NextIntlClientProvider messages={messages}>
          <ClientThemeProvider>
            <SmoothScrolling>
              <Preloader />

              <Navbar />
              <FloatingContact />
              {children}
              <Footer />
            </SmoothScrolling>
          </ClientThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
