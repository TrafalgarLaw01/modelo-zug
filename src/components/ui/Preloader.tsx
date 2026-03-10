'use client';

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

export function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem('awwwards_preloader_done') === 'true') {
            const tId = setTimeout(() => setIsVisible(false), 0);
            return () => clearTimeout(tId);
        }

        // Garantir scroll bloqueado durante o pré-carregamento
        document.body.style.overflow = 'hidden';

        const hidePreloader = () => {
            // Animação de saída limpa
            gsap.to('.global-preloader', {
                yPercent: -100,
                duration: 1.2,
                ease: 'power4.inOut',
                onComplete: () => {
                    sessionStorage.setItem('awwwards_preloader_done', 'true');
                    setIsVisible(false);
                    document.body.style.overflow = 'unset';
                }
            });
        };

        let isLoaded = false;

        // Timeout de fallback para não prender o usuário se o 3D falhar ou demorar demais (5 segundos)
        const fallback = setTimeout(() => {
            if (!isLoaded) {
                isLoaded = true;
                hidePreloader();
            }
        }, 5000);

        // Função recursiva para checar se o spline-viewer já existe e aguardar o load
        const checkSpline = () => {
            const viewer = document.querySelector('spline-viewer');
            if (viewer) {
                // Se encontrar, escutar o evento 'load' que o Web Component do Spline dispara
                viewer.addEventListener('load', () => {
                    if (!isLoaded) {
                        isLoaded = true;
                        clearTimeout(fallback);
                        hidePreloader();
                    }
                });
            } else {
                // Tenta novamente na próxima frame até o componente ser montado
                requestAnimationFrame(checkSpline);
            }
        };

        checkSpline();

        return () => clearTimeout(fallback);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="global-preloader fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--color-primary)] text-[var(--color-surface)]">
            <div className="flex flex-col items-center gap-6">
                {/* Animação Minimalista Awwwards-style */}
                <div className="text-xs tracking-[0.4em] uppercase font-sans animate-pulse">Loading Experience</div>
                <div className="w-48 h-[1px] bg-white/20 relative overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-white w-full"
                        style={{
                            animationName: 'slideX',
                            animationDuration: '2.5s',
                            animationTimingFunction: 'ease-in-out',
                            animationIterationCount: 'infinite'
                        }}
                    />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideX {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
                :global(.hide-preloader) .global-preloader, html.hide-preloader .global-preloader { display: none !important; }
            `}} />
        </div>
    );
}
