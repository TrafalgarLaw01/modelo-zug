'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { clientData } from '@/config/client-data';
import clsx from 'clsx';

export function LanguageSwitcher({ isLightText = true }: { isLightText?: boolean }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-3">
            {clientData.locale.map((loc) => (
                <button
                    key={loc}
                    onClick={() => router.replace(pathname, { locale: loc })}
                    className={clsx(
                        "font-sans text-xs uppercase tracking-widest transition-all duration-300 pointer-events-auto will-change-transform hover:scale-110",
                        locale === loc
                            ? (isLightText ? "text-white font-medium" : "text-foreground font-semibold")
                            : (isLightText ? "text-white/50 hover:text-white/80" : "text-foreground/40 hover:text-foreground/70")
                    )}
                    aria-label={`Change language to ${loc}`}
                    aria-current={locale === loc ? 'true' : 'false'}
                >
                    {loc}
                </button>
            ))}
        </div>
    );
}
