'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Key, Target, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from './TextReveal';
import { clsx } from 'clsx';

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
    const t = useTranslations('Services');
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.service-bento-item',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            icon: <Key size={32} strokeWidth={1.5} />,
            titleKey: 'service1Title',
            descKey: 'service1Desc',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
            className: 'lg:col-span-2 lg:row-span-2 min-h-[400px] lg:min-h-[600px]'
        },
        {
            icon: <Target size={32} strokeWidth={1.5} />,
            titleKey: 'service2Title',
            descKey: 'service2Desc',
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop',
            className: 'col-span-1 min-h-[300px]'
        },
        {
            icon: <Sparkles size={32} strokeWidth={1.5} />,
            titleKey: 'service3Title',
            descKey: 'service3Desc',
            image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2670&auto=format&fit=crop',
            className: 'col-span-1 min-h-[300px]'
        }
    ];

    return (
        <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-surface)]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20 fade-in-section">
                    <span className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4 block">
                        [ {t('badge')} ]
                    </span>
                    <TextReveal
                        text={t('title')}
                        as="h2"
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-primary)] mb-6"
                    />
                    <p className="font-sans text-lg text-[var(--color-secondary)] max-w-2xl">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Services Bento Grid */}
                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "service-bento-item group relative rounded-[2.5rem] overflow-hidden flex flex-col justify-end cursor-pointer bg-black/5",
                                service.className
                            )}
                        >
                            {/* Background Image */}
                            <Image
                                src={service.image}
                                alt={t(service.titleKey as any)}
                                fill
                                quality={90}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                            />

                            {/* Glassmorphism Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-[var(--color-primary)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]" />

                            {/* Content */}
                            <div className="relative z-10 p-8 md:p-10 flex flex-col gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="text-white/80 group-hover:text-white transition-colors duration-500 mb-2">
                                    {service.icon}
                                </div>
                                <h3 className="font-serif text-3xl md:text-4xl text-white">
                                    {t(service.titleKey as any)}
                                </h3>
                                <p className="font-sans text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-500 max-w-md">
                                    {t(service.descKey as any)}
                                </p>

                                {/* Explore CTA, smoothly fades in and up */}
                                <div className="mt-4 flex items-center gap-3 text-white/0 group-hover:text-white transition-colors duration-500 font-sans tracking-wide uppercase text-xs overflow-hidden h-6">
                                    <span className="translate-y-full group-hover:translate-y-0 transition-transform duration-500 block">Explore Service</span>
                                    <ArrowRight size={16} className="-translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
