'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';



export function SplineScene() {
    const t = useTranslations('MapSection');
    const [mounted, setMounted] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setMounted(true);
        }, 0);

        // Load the Spline Viewer script immediately
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js';
        document.head.appendChild(script);

        // Spline raycasting overload protection for 144hz monitors
        const handleScroll = () => {
            if (wrapperRef.current) {
                // Se rodou o scroll, desliga eventos. Um timeout religa depois.
                wrapperRef.current.style.pointerEvents = 'none';
                clearTimeout((wrapperRef.current as any).scrollTimeout);
                (wrapperRef.current as any).scrollTimeout = setTimeout(() => {
                    if (wrapperRef.current) wrapperRef.current.style.pointerEvents = 'auto';
                }, 150);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Logo cleanup sentry
        const removeLogo = () => {
            const viewer = document.querySelector('spline-viewer');
            if (viewer && viewer.shadowRoot) {
                const logo = viewer.shadowRoot.querySelector('#logo');
                if (logo) logo.remove();
            }
        };
        const intervalId = setInterval(removeLogo, 1000);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
            window.removeEventListener('scroll', handleScroll);
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    // Effect for handling Spline load event
    useEffect(() => {
        if (!viewerRef.current) return;

        const viewer = viewerRef.current;
        const handleSplineLoad = (e: any) => {
            console.log("Spline loaded with App instance:", e.detail);
            if (e.detail && e.detail.app) {
                // Remove overhead by setting Pixel Ratio to 1 (crucial for 144hz/4K displays)
                e.detail.app.setPixelRatio(1);
            }
        };

        viewer.addEventListener('load', handleSplineLoad);

        return () => {
            viewer.removeEventListener('load', handleSplineLoad);
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <section className="relative w-full bg-[var(--color-surface)] overflow-hidden flex flex-col lg:block lg:min-h-[90vh]">
            {/* Text Content */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 pt-24 pb-12 lg:py-32 flex flex-col justify-center lg:min-h-[90vh] pointer-events-none">
                <div className="lg:w-5/12 pr-4 lg:pr-8 pointer-events-auto">
                    <span className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-4 block">
                        [ {t('badge')} ]
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[var(--color-primary)] mb-8 leading-tight">
                        {t('title')}
                    </h2>
                    <p className="font-sans text-lg md:text-xl text-[var(--color-primary)]/70 font-light max-w-xl text-balance leading-relaxed mb-10">
                        {t('subtitle')}
                    </p>
                    <div className="w-24 h-px bg-[var(--color-primary)]/20" />
                </div>
            </div>

            {/* 3D Scene Container */}
            <div
                ref={wrapperRef}
                className="relative w-full min-h-[500px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-7/12 lg:h-full z-0"
                style={{ contain: 'paint layout' }}
            >
                {/* Inject Spline Viewer immediately */}
                {mounted && (
                    <>
                        {/* @ts-ignore - Custom Web Component typing */}
                        <spline-viewer
                            ref={viewerRef}
                            loading="eager"
                            url="/scene-clean-v2.splinecode"
                            class="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-1000 opacity-100"
                        />
                    </>
                )}

                {/* Overlays for blending */}
                <div className="absolute inset-y-0 left-0 w-32 lg:w-64 bg-gradient-to-r from-[var(--color-surface)] to-transparent hidden lg:block pointer-events-none z-10" />
                <div className="absolute inset-x-0 top-0 h-24 lg:h-32 bg-gradient-to-b from-[var(--color-surface)] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-24 lg:h-32 bg-gradient-to-t from-[var(--color-surface)] to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
}
