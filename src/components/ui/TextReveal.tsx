'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    stagger?: number;
    as?: React.ElementType;
}

export function TextReveal({
    text,
    className = "",
    delay = 0,
    duration = 1.2,
    stagger = 0.05,
    as: Component = 'div'
}: TextRevealProps) {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.word-inner',
                { y: '120%', rotateX: 20, autoAlpha: 0 },
                {
                    y: '0%',
                    rotateX: 0,
                    autoAlpha: 1,
                    duration: duration,
                    stagger: stagger,
                    ease: 'power4.out',
                    delay: delay,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 90%', // Fires when top of element hits 90% of viewport
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [delay, duration, stagger]);

    // Split text into words for masking
    const words = text.split(' ');

    return (
        <Component ref={containerRef} className={className} aria-label={text}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="word-outer inline-block overflow-hidden align-top"
                    aria-hidden="true"
                    style={{ paddingRight: '0.25em' }}
                >
                    <span className="word-inner inline-block translate-y-[120%] opacity-0 will-change-transform transform-gpu">
                        {word}
                    </span>
                </span>
            ))}
        </Component>
    );
}
