"use client";

import { useEffect, useState, useRef } from "react";

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
    const [isGenerating, setIsGenerating] = useState(false);
    const [imageSaved, setImageSaved] = useState(false);
    const storyCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setShowMessage(true), 500);
            return () => clearTimeout(timer);
        } else {
            setShowMessage(false);
            setImageSaved(false);
        }
    }, [isActive]);

    // Generate and save story image, then open Instagram
    const handleShareToStory = async () => {
        setIsGenerating(true);

        try {
            // Dynamically import html2canvas
            const html2canvas = (await import("html2canvas")).default;

            if (storyCardRef.current) {
                const canvas = await html2canvas(storyCardRef.current, {
                    backgroundColor: null,
                    scale: 2,
                    useCORS: true,
                });

                // Convert to blob and download
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        // Create download link
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `valentine-${partnerName.replace(/\s+/g, "-")}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);

                        setImageSaved(true);

                        // Wait a moment then try to open Instagram
                        setTimeout(() => {
                            // Try to open Instagram app
                            window.location.href = "instagram://story-camera";

                            // Fallback - show instructions after a delay
                            setTimeout(() => {
                                alert(
                                    "✅ Image saved to your device!\n\n" +
                                    "Now open Instagram and:\n" +
                                    "1. Create a new Story\n" +
                                    "2. Select the saved image from gallery\n" +
                                    "3. Share it! 💕"
                                );
                            }, 1000);
                        }, 500);
                    }
                }, "image/png");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Could not generate image. Please try again.");
        } finally {
            setIsGenerating(false);
        }
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

            {/* Hidden Story Card for Screenshot - inline styles for html2canvas */}
            <div style={{ position: "fixed", left: "-9999px", top: 0 }}>
                <div
                    ref={storyCardRef}
                    style={{
                        width: "1080px",
                        height: "1920px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "64px",
                        background: "linear-gradient(135deg, #ff6b9d 0%, #ff4757 50%, #ff1493 100%)",
                        position: "relative",
                    }}
                >
                    <div style={{ fontSize: "120px", marginBottom: "32px" }}>💕</div>
                    <div style={{ textAlign: "center", color: "#ffffff" }}>
                        <p style={{ fontSize: "80px", fontWeight: "bold", marginBottom: "32px", margin: 0 }}>I said YES!</p>
                        <p style={{ fontSize: "50px", marginBottom: "48px", margin: "32px 0" }}>
                            {creatorName
                                ? `${partnerName} & ${creatorName}`
                                : partnerName
                            }
                        </p>
                        <p style={{ fontSize: "60px", margin: 0 }}>🥰💘🌹</p>
                    </div>
                    <div style={{
                        position: "absolute",
                        bottom: "80px",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "36px"
                    }}>
                        Happy Valentine&apos;s Day 2025
                    </div>
                </div>
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

                {/* Share to Instagram Story Button */}
                <div className="mt-6 space-y-3">
                    <button
                        onClick={handleShareToStory}
                        disabled={isGenerating}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <span className="animate-spin">⏳</span> Creating Story...
                            </>
                        ) : imageSaved ? (
                            <>
                                ✅ Image Saved! Open Instagram
                            </>
                        ) : (
                            <>
                                📸 Share to Instagram Story
                            </>
                        )}
                    </button>

                    <p className="text-xs text-gray-400">
                        Saves image → Opens Instagram → Share to Story!
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full px-6 py-2 text-pink-500 font-medium hover:text-pink-600 transition-colors"
                    >
                        Celebrate Again! 🎊
                    </button>
                </div>
            </div>
        </div>
    );
}
