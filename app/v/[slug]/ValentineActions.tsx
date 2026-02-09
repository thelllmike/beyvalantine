"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CelebrationOverlay from "@/components/CelebrationOverlay";

interface ValentineActionsProps {
    partnerName: string;
    creatorName: string | null;
}

export default function ValentineActions({
    partnerName,
    creatorName,
}: ValentineActionsProps) {
    const [showCelebration, setShowCelebration] = useState(false);

    return (
        <>
            <div className="flex gap-4 justify-center">
                <Button
                    onClick={() => setShowCelebration(true)}
                    variant="primary"
                    size="lg"
                    className="min-w-[120px] bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600"
                >
                    Yes! 💖
                </Button>

                {/* Disabled No button with accessible semantics */}
                <div className="relative group">
                    <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        aria-label="No - This option is not available. Only one correct choice!"
                        className="min-w-[120px] px-6 py-3 text-lg font-semibold bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed opacity-75"
                    >
                        No
                    </button>

                    {/* Tooltip */}
                    <div
                        role="tooltip"
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                    >
                        Only one correct choice 🙂
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                    </div>
                </div>
            </div>

            <p className="text-center text-gray-400 text-sm mt-4">
                ✨ Choose wisely (there&apos;s only one right answer!) ✨
            </p>

            <CelebrationOverlay
                isActive={showCelebration}
                partnerName={partnerName}
                creatorName={creatorName}
                onClose={() => setShowCelebration(false)}
            />
        </>
    );
}
