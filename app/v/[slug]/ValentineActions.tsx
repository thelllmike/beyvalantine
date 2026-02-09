"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
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
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        setIsMobile(window.innerWidth < 640);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const noButton = noButtonRef.current;
        if (!noButton) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = noButton.getBoundingClientRect();

            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;

            const distanceX = e.clientX - buttonCenterX;
            const distanceY = e.clientY - buttonCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Larger detection radius on mobile
            const detectionRadius = isMobile ? 100 : 150;

            if (distance < detectionRadius) {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const buttonWidth = rect.width;
                const buttonHeight = rect.height;

                // Calculate escape with randomness
                const escapeAngle = Math.atan2(distanceY, distanceX) + Math.PI + (Math.random() - 0.5) * 0.8;
                const moveDistance = isMobile ? (80 + Math.random() * 60) : (120 + Math.random() * 80);

                let newX = buttonPosition.x + Math.cos(escapeAngle) * moveDistance;
                let newY = buttonPosition.y + Math.sin(escapeAngle) * moveDistance;

                // Mobile-friendly bounds
                const padding = isMobile ? 10 : 20;
                const maxX = viewportWidth / 2 - buttonWidth / 2 - padding;
                const maxY = viewportHeight / 2 - buttonHeight / 2 - padding;

                // Bounce if hitting edges
                if (Math.abs(newX) > maxX) {
                    newX = -newX * 0.6;
                }
                if (Math.abs(newY) > maxY) {
                    newY = -newY * 0.6;
                }

                newX = Math.max(-maxX, Math.min(maxX, newX));
                newY = Math.max(-maxY, Math.min(maxY, newY));

                setButtonPosition({ x: newX, y: newY });

                gsap.to(noButton, {
                    x: newX,
                    y: newY,
                    duration: 0.12,
                    ease: "power3.out",
                });
            }
        };

        // Touch handler for mobile
        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchmove", handleTouchMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, [buttonPosition, isMobile]);

    const handleNoClick = () => {
        const newX = (Math.random() - 0.5) * window.innerWidth * 0.5;
        const newY = (Math.random() - 0.5) * window.innerHeight * 0.4;
        setButtonPosition({ x: newX, y: newY });
        gsap.to(noButtonRef.current, {
            x: newX,
            y: newY,
            duration: 0.1,
            ease: "power3.out",
        });
    };

    return (
        <>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-4">
                <Button
                    onClick={() => setShowCelebration(true)}
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto min-w-[140px] text-lg sm:text-xl bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 z-10 shadow-xl"
                >
                    Yes! 💖
                </Button>

                {/* Runaway No button */}
                <button
                    ref={noButtonRef}
                    type="button"
                    className="fixed min-w-[100px] sm:min-w-[120px] px-5 sm:px-6 py-3 text-base sm:text-lg font-bold bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl shadow-xl hover:from-gray-500 hover:to-gray-600 transition-colors cursor-pointer select-none z-50"
                    style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: isMobile ? "0" : "80px",
                        marginTop: isMobile ? "70px" : "-24px",
                        transform: "translate(-50%, -50%)",
                    }}
                    onClick={handleNoClick}
                >
                    No 😢
                </button>
            </div>

            <p className="text-center text-pink-500 text-xs sm:text-sm mt-4 sm:mt-6 font-medium">
                ✨ Try clicking No... if you can! 😏 ✨
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
