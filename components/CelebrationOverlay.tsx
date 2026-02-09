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
    const [showShareOptions, setShowShareOptions] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setShowMessage(true), 500);
            return () => clearTimeout(timer);
        } else {
            setShowMessage(false);
            setShowShareOptions(false);
        }
    }, [isActive]);

    // Share to Instagram Story - NGL style
    const handleInstagramShare = async () => {
        const shareText = creatorName
            ? `💕 I said YES to ${creatorName}! Happy Valentine's Day! 🥰`
            : `💕 I said YES! Happy Valentine's Day! 🥰`;

        // Copy the celebration message
        try {
            await navigator.clipboard.writeText(shareText + "\n\n💝 Create yours: " + window.location.origin);
        } catch (e) {
            console.log("Copy failed", e);
        }

        // Try to open Instagram
        const instagramUrl = "instagram://story-camera";
        window.location.href = instagramUrl;

        // Fallback message after attempt
        setTimeout(() => {
            alert(
                "📋 Text copied!\n\n" +
                "Share to Instagram Story:\n" +
                "1. Open Instagram → Create Story\n" +
                "2. Add a background\n" +
                "3. Add Text sticker & paste!\n" +
                "4. Share your YES! 💕"
            );
        }, 500);
    };

    // Native Share
    const handleNativeShare = async () => {
        const shareText = creatorName
            ? `💕 I said YES to ${creatorName}! Happy Valentine's Day! 🥰`
            : `💕 I said YES! Happy Valentine's Day! 🥰`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "💕 I said YES!",
                    text: shareText,
                    url: window.location.origin,
                });
            } catch (err) {
                console.log("Share cancelled", err);
            }
        } else {
            handleInstagramShare();
        }
    };

    // WhatsApp Share
    const handleWhatsAppShare = () => {
        const text = creatorName
            ? `💕 I said YES to ${creatorName}! Happy Valentine's Day! 🥰 Create yours: ${window.location.origin}`
            : `💕 I said YES! Happy Valentine's Day! 🥰 Create yours: ${window.location.origin}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
    };

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
          bg-white rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-[90%] shadow-2xl
          transition-all duration-500 text-center
          ${showMessage ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
            >
                <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-3">
                    Yay! It&apos;s a Yes! 💖
                </h2>
                <p className="text-gray-700 text-base sm:text-lg mb-2">
                    Congratulations, <span className="font-bold text-pink-500">{partnerName}</span>!
                </p>
                {creatorName && (
                    <p className="text-gray-600 text-sm sm:text-base">
                        You and <span className="font-bold text-rose-500">{creatorName}</span> are going to have
                        an amazing Valentine&apos;s Day together! 💕
                    </p>
                )}
                <p className="text-2xl mt-3">🥰💘🌹</p>

                {/* Share Section - NGL Style */}
                {!showShareOptions ? (
                    <div className="mt-6 space-y-3">
                        <button
                            onClick={() => setShowShareOptions(true)}
                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
                        >
                            📸 Share to Story!
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full px-6 py-2 text-pink-500 font-medium hover:text-pink-600 transition-colors"
                        >
                            Celebrate Again! 🎊
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 space-y-3">
                        <p className="text-sm text-gray-500 mb-2">Share your YES! 💕</p>

                        {/* Share Buttons Grid */}
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={handleInstagramShare}
                                className="flex flex-col items-center justify-center gap-1 p-3 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <span className="text-xl">📸</span>
                                <span className="text-xs">Instagram</span>
                            </button>

                            <button
                                onClick={handleWhatsAppShare}
                                className="flex flex-col items-center justify-center gap-1 p-3 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <span className="text-xl">💬</span>
                                <span className="text-xs">WhatsApp</span>
                            </button>

                            <button
                                onClick={handleNativeShare}
                                className="flex flex-col items-center justify-center gap-1 p-3 bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <span className="text-xl">🚀</span>
                                <span className="text-xs">More</span>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowShareOptions(false)}
                            className="w-full px-6 py-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
                        >
                            ← Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
