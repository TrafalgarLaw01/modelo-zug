'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function MagneticCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Configuramos o cursor para ter uma base maior (pixel density) e escalamos para baixo
        // Isso evita que o navegador estique pixels pequenos (pixelation)
        gsap.set(cursor, { scale: 0.3, xPercent: -50, yPercent: -50 });

        const setX = gsap.quickSetter(cursor, 'x', 'px');
        const setY = gsap.quickSetter(cursor, 'y', 'px');

        const mouse = { x: 0, y: 0 };
        const pos = { x: 0, y: 0 };
        const ease = 0.15; // Suavidade do rastro

        let activeTarget: HTMLElement | null = null;
        let targetPos = { x: 0, y: 0 };

        const render = () => {
            // Suaviza a posição do cursor dot
            pos.x += (mouse.x - pos.x) * ease;
            pos.y += (mouse.y - pos.y) * ease;
            setX(pos.x);
            setY(pos.y);

            // Suaviza a atração magnética do elemento alvo (High Performance)
            if (activeTarget) {
                const rect = activeTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distX = mouse.x - centerX;
                const distY = mouse.y - centerY;

                // Interpolação direta no ticker para evitar lag de criação de tweens
                // Reduzido para 0.15 para um magnetismo mais sutil e elegante
                targetPos.x += (distX * 0.15 - targetPos.x) * 0.15;
                targetPos.y += (distY * 0.15 - targetPos.y) * 0.15;

                gsap.set(activeTarget, {
                    x: targetPos.x,
                    y: targetPos.y
                });
            }
        };

        gsap.ticker.add(render);

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a, button, .magnetic-target') as HTMLElement;
            if (target && target !== activeTarget) {
                activeTarget = target;
                targetPos = { x: 0, y: 0 };

                // Transforma o cursor num anel cristalino (Escalando de uma base já nítida)
                gsap.to(cursor, {
                    scale: 1.5,
                    backgroundColor: 'transparent',
                    border: '1.5px solid rgba(255, 255, 255, 0.8)',
                    duration: 0.4,
                    ease: 'power3.out'
                });
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a, button, .magnetic-target') as HTMLElement;
            const related = (e.relatedTarget as HTMLElement)?.closest('a, button, .magnetic-target') as HTMLElement;

            if (activeTarget && target === activeTarget && related !== activeTarget) {
                // Efeito elástico ao soltar o elemento
                gsap.to(activeTarget, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)'
                });

                activeTarget = null;

                // Volta ao estado de ponto sólido
                gsap.to(cursor, {
                    scale: 0.3,
                    backgroundColor: 'white',
                    border: '0px solid transparent',
                    duration: 0.4,
                    ease: 'power3.out'
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
            gsap.ticker.remove(render);
        };
    }, []);

    // z-[9999] garante o cursor no topo da viewport
    // pointer-events-none pra não atrapalhar clicks
    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-10 h-10 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{
                willChange: 'transform, border',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
            }}
        />
    );
}
