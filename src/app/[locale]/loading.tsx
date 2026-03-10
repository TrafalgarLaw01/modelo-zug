import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-surface)]">
            <div className="flex flex-col items-center gap-6">
                {/* Sleek Pulsing Logo Placeholder */}
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-sm relative overflow-hidden flex items-center justify-center">
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>

                {/* Pulsing Text Plate */}
                <div className="h-4 w-32 bg-white/5 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
            </div>
        </div>
    );
}
