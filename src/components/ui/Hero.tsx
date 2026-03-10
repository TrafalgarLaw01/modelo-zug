'use client';

import React, { useRef, useLayoutEffect } from 'react';

import { gsap as gsapCore } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { clientData } from '@/config/client-data';
import { TextReveal } from './TextReveal';

gsapCore.registerPlugin(ScrollTrigger);

interface HeroProps {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
}

export function Hero({ title, subtitle, cta, ctaSecondary }: HeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsapCore.context(() => {
            // 1. Initial Reveal Animation
            const tl = gsapCore.timeline();

            tl.fromTo(overlayRef.current,
                { autoAlpha: 1 },
                { autoAlpha: 0, duration: 1.5, ease: 'power3.inOut' }
            )
                .fromTo(
                    '.hero-subtitle',
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' },
                    "-=0.4"
                )
                .fromTo(
                    '.hero-cta',
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
                    "-=0.4"
                );

            // 2. Scroll Parallax
            gsapCore.to(imageRef.current, {
                yPercent: 60,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            gsapCore.to(textRef.current, {
                yPercent: 50,
                autoAlpha: 0.2,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100svh] min-h-[800px] overflow-hidden bg-[var(--color-surface)] flex items-center justify-center cursor-default"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop"
                    alt="Luxury Estate"
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    className="w-full h-[150%] object-cover object-center scale-110 will-change-transform translate-z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
            </div>

            <div
                ref={textRef}
                className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-7xl mx-auto w-full mt-24 will-change-transform"
            >
                <div className="glass-card p-10 md:p-16 rounded-3xl flex flex-col items-center gap-6 mix-blend-normal">
                    <div className="overflow-hidden pb-4">
                        <TextReveal
                            text={title}
                            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tighter text-white leading-[0.9] drop-shadow-lg"
                            delay={0.5}
                            duration={1.2}
                            stagger={0.05}
                            as="h1"
                        />
                    </div>

                    <div className="overflow-hidden">
                        <p className="hero-subtitle font-sans text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-2xl text-balance">
                            {subtitle}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 hero-cta">
                        {/* Primary CTA */}
                        <a
                            href={`mailto:${clientData.contact.email}?subject=Inquiry`}
                            className="w-full sm:w-auto px-10 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer group flex items-center justify-center gap-3 font-medium tracking-wide rounded-sm"
                        >
                            <span>{cta}</span>
                        </a>

                        {/* Secondary CTA */}
                        <Link
                            href="/portfolio"
                            className="w-full sm:w-auto px-10 py-4 bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 backdrop-blur-md border border-[var(--color-primary)]/20 text-[var(--color-primary)] transition-all duration-300 ease-in-out cursor-pointer group flex items-center justify-center gap-3 font-medium tracking-wide rounded-sm"
                        >
                            <span>{ctaSecondary}</span>
                            <div className="w-6 h-[1px] bg-[var(--color-primary)] group-hover:w-10 transition-all duration-300" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Initial load overlay for smooth fade transition */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black z-50 pointer-events-none"
            />
        </section>
    );
}
