'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const BentoCard = ({ item, index, t }: { item: any, index: number, t: any }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<any>({});

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'none'
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
            transition: 'transform 0.5s ease'
        });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
            className={clsx(
                "group relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
                item.className
            )}
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                quality={100}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
                {item.badge && (
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white uppercase tracking-wider mb-3 inline-block">
                        {t(item.badge)}
                    </span>
                )}
                <h3 className="text-white font-serif text-3xl md:text-4xl mb-2">{item.title}</h3>
                <p className="text-white/80 font-sans flex justify-between items-center">
                    <span>{item.location}</span>
                    <span className="font-medium text-white group-hover:translate-x-2 transition-transform">{t('explore')}</span>
                </p>
            </div>
        </motion.div>
    );
};

export function BentoGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('BentoGrid');

    const items = [
        {
            title: "Villa Panorama",
            location: "Zug, Switzerland",
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
            badge: "badge1",
            className: "md:col-span-2 md:row-span-2"
        },
        {
            title: "Lakefront Penthouse",
            location: "Zürich",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
            className: ""
        }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.bento-item',
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

    return (
        <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-surface)]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-primary)]">
                            {t('title')}
                        </h2>
                        <p className="mt-4 text-[var(--color-secondary)] font-sans max-w-lg">
                            {t('description')}
                        </p>
                    </div>
                    <button className="px-6 py-3 border border-[var(--color-primary)]/20 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)] transition-all duration-300 font-sans cursor-pointer whitespace-nowrap">
                        {t('button')}
                    </button>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {items.map((item, index) => (
                        <BentoCard key={index} item={item} index={index} t={t} />
                    ))}

                    <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer bg-[var(--color-primary)] flex flex-col items-center justify-center text-center p-8 transition-transform duration-500 hover:scale-[1.02]">
                        <h3 className="text-[var(--color-surface)] font-serif text-3xl mb-4">{t('ctaTitle')}</h3>
                        <p className="text-[var(--color-surface)]/80 font-sans mb-8">{t('ctaDesc')}</p>
                        <button className="px-10 py-4 bg-[var(--color-surface)] text-[var(--color-primary)] rounded-full hover:bg-white transition-all duration-300 font-sans font-medium">
                            {t('ctaBtn')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
