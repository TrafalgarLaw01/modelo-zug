import { useTranslations, useLocale } from 'next-intl';
import { Hero } from '@/components/ui/Hero';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { AboutSection } from '@/components/ui/AboutSection';
import { ServicesSection } from '@/components/ui/ServicesSection';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { clientData } from '@/config/client-data';
import { SplineScene } from '@/components/ui/SplineScene';

export default function Home() {
  const t = useTranslations('Index');
  const locale = useLocale();

  return (
    <main className="min-h-[200vh] bg-surface">
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        cta={t('cta')}
        ctaSecondary={t('ctaSecondary')}
      />

      {/* 2. O que oferecemos (Expertise) */}
      <ServicesSection />

      {/* 3. Portfólio de Imóveis (Off-market focus) */}
      <BentoGrid />

      {/* 4. Interatividade 3D - The Keys */}
      <SplineScene />

      {/* 5. Autoridade (Quem somos) */}
      <AboutSection description={clientData.content.about[locale as keyof typeof clientData.content.about]} />

      {/* 6. Prova Social (Google Reviews) */}
      <TestimonialSection />
    </main>
  );
}
