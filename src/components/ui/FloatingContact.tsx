'use client';

import { useState } from 'react';
import { MessageCircle, X, MapPin, Phone, Mail } from 'lucide-react';
import { clientData } from '@/config/client-data';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

export function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Contact');

    // Construct WhatsApp URL
    const waUrl = `https://wa.me/${clientData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(clientData.contact.waMessage)}`;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">

            {/* The Glassmorphism Modal */}
            <div
                className={clsx(
                    "mb-4 w-80 glass-card rounded-2xl p-6 transition-all duration-500 origin-bottom-right shadow-2xl will-change-transform",
                    isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
                )}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-xl">{t('title')}</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close Contact Modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <p className="font-sans text-sm opacity-80 mb-6 leading-relaxed">
                    {t('description')}
                </p>

                <div className="flex flex-col gap-4">
                    {/* WhatsApp Primary Button */}
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-primary)] text-[var(--color-surface)] rounded-xl hover:scale-[1.02] transition-transform font-medium text-sm"
                    >
                        <MessageCircle size={18} />
                        {t('whatsapp')}
                    </a>

                    {/* Secondary Links */}
                    <div className="flex flex-col gap-3 mt-2 border-t border-black/10 dark:border-white/10 pt-4">
                        <a href="tel:+41 79 000 00 00" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                            <Phone size={16} />
                            +41 79 000 00 00
                        </a>
                        <a href="mailto:office@luxuryestates-zug.ch" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                            <Mail size={16} />
                            office@luxuryestates-zug.ch
                        </a>
                        <a href={clientData.contact.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                            <MapPin size={16} />
                            {t('location')}
                        </a>
                    </div>
                </div>
            </div>

            {/* The Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[var(--color-primary)] text-[var(--color-surface)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 will-change-transform translate-z-0"
                aria-label="Toggle Contact"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

        </div>
    );
}
