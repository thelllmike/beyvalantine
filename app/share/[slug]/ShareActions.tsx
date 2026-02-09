"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

interface ShareActionsProps {
    publicUrl: string;
    slug: string;
    partnerName: string;
}

export default function ShareActions({ publicUrl, slug, partnerName }: ShareActionsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    // Native share (works great on mobile)
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "💕 Someone has a Valentine message for you!",
                    text: `Hey ${partnerName}! Someone special has a Valentine's message for you 💝`,
                    url: publicUrl,
                });
            } catch (err) {
                // User cancelled or error
                console.log("Share cancelled or error:", err);
            }
        } else {
            // Fallback to copy
            handleCopy();
        }
    };

    // Instagram sharing - opens Instagram with link copied
    const handleInstagramShare = async () => {
        // Copy link first
        await navigator.clipboard.writeText(publicUrl);
        setCopied(true);

        // Try to open Instagram app
        const instagramUrl = "instagram://";

        // Create a hidden iframe to try opening the app
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        // Try to open Instagram
        if (iframe.contentWindow) {
            iframe.contentWindow.location.href = instagramUrl;
        }

        // Remove iframe after attempt
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 100);

        // Show instructions
        setTimeout(() => {
            alert(
                "📋 Link copied!\n\n" +
                "Now:\n" +
                "1. Open Instagram\n" +
                "2. Go to your Story\n" +
                "3. Add a Link sticker\n" +
                "4. Paste your link!\n\n" +
                "Or share the link in your DMs 💕"
            );
        }, 200);
    };

    // WhatsApp share
    const handleWhatsAppShare = () => {
        const text = `Hey ${partnerName}! 💕 Someone special has a Valentine's message for you! ${publicUrl}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
    };

    // Twitter/X share
    const handleTwitterShare = () => {
        const text = `💕 Someone has a Valentine's message for you! Check it out:`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(publicUrl)}`;
        window.open(twitterUrl, "_blank");
    };

    return (
        <div className="space-y-4">
            {/* Main share button - Native share on mobile */}
            <Button
                onClick={handleNativeShare}
                className="w-full text-lg py-4"
                variant="primary"
                size="lg"
            >
                Share Now 🚀
            </Button>

            {/* Social media buttons */}
            <div className="grid grid-cols-3 gap-3">
                <button
                    onClick={handleInstagramShare}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                    <span className="text-2xl">📸</span>
                    <span className="text-xs font-medium">Instagram</span>
                </button>

                <button
                    onClick={handleWhatsAppShare}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                    <span className="text-2xl">💬</span>
                    <span className="text-xs font-medium">WhatsApp</span>
                </button>

                <button
                    onClick={handleTwitterShare}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                    <span className="text-2xl">𝕏</span>
                    <span className="text-xs font-medium">Twitter</span>
                </button>
            </div>

            {/* Copy and Open buttons */}
            <div className="flex gap-3">
                <Button onClick={handleCopy} className="flex-1" variant="outline">
                    {copied ? "Copied! ✓" : "Copy Link 📋"}
                </Button>
                <a
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                >
                    <Button variant="outline" className="w-full">
                        Preview 👁️
                    </Button>
                </a>
            </div>

            {/* Edit and Create New */}
            <div className="flex gap-3 pt-2 border-t border-pink-100">
                <Link href={`/builder?slug=${slug}`} className="flex-1">
                    <Button variant="ghost" className="w-full text-sm">
                        Edit Card ✏️
                    </Button>
                </Link>
                <Link href="/builder" className="flex-1">
                    <Button variant="ghost" className="w-full text-sm">
                        Create New 💕
                    </Button>
                </Link>
            </div>

            {/* Instagram Story Instructions */}
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-pink-200">
                <h3 className="font-semibold text-pink-600 text-sm mb-2">📸 Share on Instagram Story:</h3>
                <ol className="text-xs text-gray-600 space-y-1">
                    <li>1. Copy your link above</li>
                    <li>2. Create a new Story on Instagram</li>
                    <li>3. Tap the sticker icon 🔗</li>
                    <li>4. Add "Link" sticker & paste!</li>
                </ol>
            </div>
        </div>
    );
}
