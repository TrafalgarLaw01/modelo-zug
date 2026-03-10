import React from 'react';
import { clientData } from '@/config/client-data';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { TextReveal } from './TextReveal';

interface AboutSectionProps {
    description: string;
}

export function AboutSection({ description }: AboutSectionProps) {
    const t = useTranslations('About');

    return (
        <section
            className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-primary)] text-[var(--color-surface)] flex flex-col items-center justify-center text-center will-change-transform"
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center">

                {/* Subtle decorative element */}
                <div className="w-px h-16 bg-white/20 mb-8" />

                <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/60 mb-8 block">
                    [ {t('badge')} ]
                </span>

                <TextReveal
                    text={t('quote')}
                    as="h2"
                    className="font-serif text-3xl md:text-5xl lg:text-7xl mb-8 leading-tight"
                />

                <div className="w-12 h-px bg-white/30 mb-8" />

                <p className="font-sans text-lg md:text-xl text-white/80 font-light max-w-2xl text-balance leading-relaxed mb-12">
                    {description}
                </p>

                {/* Persona Profile */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/20 mb-2">
                        <Image
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
                            alt={clientData.branding.name}
                            fill
                            sizes="96px"
                            quality={100}
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <span className="font-serif text-xl tracking-wide">{clientData.branding.name} Team</span>
                    <span className="font-sans text-xs uppercase tracking-widest text-white/60">{t('role')}</span>
                </div>

            </div>
        </section>
    );
}
