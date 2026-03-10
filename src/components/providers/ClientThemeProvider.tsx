'use client';

import React, { useEffect } from 'react';
import { clientData } from '@/config/client-data';

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (!clientData.branding.colors.useManual || !clientData.branding.colors.palette) return;

        const [primary, secondary, surface, foreground, overlay] = clientData.branding.colors.palette;

        // We inject these directly into the document root so Tailwind arbitrary values (var(--color-*)) can seamlessly pick them up.
        const root = document.documentElement;

        if (primary) root.style.setProperty('--color-primary', primary);
        if (secondary) root.style.setProperty('--color-secondary', secondary);
        if (surface) root.style.setProperty('--color-surface', surface);
        if (foreground) root.style.setProperty('--color-foreground', foreground);
        if (overlay) root.style.setProperty('--color-overlay', overlay);

        // Dynamic Fonts if needed
        if (clientData.branding.typography.heading) {
            // In a real scenario, we might manipulate Google Fonts imports here
        }

    }, []);

    return <>{children}</>;
}
