"use client";

import { useEffect, useState } from "react";

interface CelebrationOverlayProps {
    isActive: boolean;
    partnerName: string;
    creatorName: string | null;
    onClose: () => void;
}

export default function CelebrationOverlay({
    isActive,
    partnerName,
    creatorName,
    onClose,
}: CelebrationOverlayProps) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setShowMessage(true), 500);
            return () => clearTimeout(timer);
        } else {
            setShowMessage(false);
        }
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden celebration-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Celebration"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Balloons */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`balloon-${i}`}
                        className="balloon"
                        style={{
                            left: `${5 + i * 6}%`,
                            animationDelay: `${i * 0.2}s`,
                            backgroundColor: [
                                "#ff6b9d",
                                "#ff4757",
                                "#ff69b4",
                                "#ff1493",
                                "#ff85a2",
                            ][i % 5],
                        }}
                    />
                ))}
            </div>

            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={`confetti-${i}`}
                        className="confetti"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            backgroundColor: [
                                "#ff6b9d",
                                "#ffd700",
                                "#ff4757",
                                "#00d2d3",
                                "#ff69b4",
                                "#48dbfb",
                                "#ff9ff3",
                            ][i % 7],
                            width: `${8 + Math.random() * 8}px`,
                            height: `${8 + Math.random() * 8}px`,
                        }}
                    />
                ))}
            </div>

            {/* Hearts */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`heart-${i}`}
                        className="floating-heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            fontSize: `${20 + Math.random() * 20}px`,
                        }}
                    >
                        💕
                    </div>
                ))}
            </div>

            {/* Message Card */}
            <div
                className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-white rounded-3xl p-8 max-w-md w-[90%] shadow-2xl
          transition-all duration-500 text-center
          ${showMessage ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
            >
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-3xl font-bold text-pink-600 mb-4">
                    Yay! It&apos;s a Yes! 💖
                </h2>
                <p className="text-gray-700 text-lg mb-2">
                    Congratulations, <span className="font-bold text-pink-500">{partnerName}</span>!
                </p>
                {creatorName && (
                    <p className="text-gray-600">
                        You and <span className="font-bold text-rose-500">{creatorName}</span> are going to have
                        an amazing Valentine&apos;s Day together! 💕
                    </p>
                )}
                <p className="text-2xl mt-4">🥰💘🌹</p>

                <button
                    onClick={onClose}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg"
                >
                    Celebrate Again! 🎊
                </button>
            </div>
        </div>
    );
}
