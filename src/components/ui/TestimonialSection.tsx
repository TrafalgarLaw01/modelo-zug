'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { clientData } from '@/config/client-data';
import { Star } from 'lucide-react';

export function TestimonialSection() {
    const t = useTranslations('Testimonials');
    const locale = useLocale();

    // Safely get testimonials, defaulting to empty array if undefined
    const testimonials = clientData.content.testimonials || [];

    return (
        <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[var(--color-surface)] border-t border-[var(--color-primary)]/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-primary)] mb-4">
                            {t('title')}
                        </h2>
                        <p className="font-sans text-lg text-[var(--color-secondary)] max-w-xl">
                            {t('subtitle')}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full">
                        <Star size={16} fill="var(--color-primary)" stroke="none" />
                        <span className="font-sans text-sm font-medium">{t('googleReviews')}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="p-8 rounded-3xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex flex-col justify-between gap-8 hover:bg-[var(--color-primary)]/10 transition-colors duration-300"
                        >
                            {/* Stars & Text */}
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} fill="var(--color-primary)" stroke="none" />
                                    ))}
                                </div>
                                <p className="font-sans text-[var(--color-primary)] leading-relaxed italic text-lg">
                                    "{testimonial.text[locale as keyof typeof testimonial.text]}"
                                </p>
                            </div>

                            {/* Author & Date */}
                            <div className="flex justify-between items-center pt-6 border-t border-[var(--color-primary)]/10">
                                <span className="font-serif text-xl text-[var(--color-primary)] font-medium">
                                    {testimonial.author}
                                </span>
                                <span className="font-sans text-sm text-[var(--color-secondary)]">
                                    {new Date(testimonial.date).toLocaleDateString(locale, { year: 'numeric', month: 'short' })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
