'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrolling({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05, // Adjusted to 0.05 for more physical weight
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 2,
        });

        // Sync GSAP and Lenis for High Refresh Rate monitors (144hz+)
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0); // Prevent GSAP from trying to catch up on dropped frames, causing jumps

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
