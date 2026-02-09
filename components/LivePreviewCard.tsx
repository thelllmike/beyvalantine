"use client";

import Image from "next/image";
import { getTeddyByKey } from "@/lib/teddies";

interface LivePreviewCardProps {
    partnerName: string;
    creatorName: string;
    message: string;
    teddyKey: string;
}

export default function LivePreviewCard({
    partnerName,
    creatorName,
    message,
    teddyKey,
}: LivePreviewCardProps) {
    const teddy = getTeddyByKey(teddyKey);

    return (
        <div className="w-full max-w-md mx-auto">
            <h3 className="text-sm font-medium text-gray-500 mb-3 text-center">
                Live Preview ✨
            </h3>
            <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-3xl p-6 shadow-xl border border-pink-200">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                        <span className="text-white text-sm font-medium">
                            Will you be my Valentine? 💕
                        </span>
                    </div>
                </div>

                {/* Teddy Image */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                    {teddy ? (
                        <Image
                            src={teddy.src}
                            alt={teddy.name}
                            fill
                            className="object-contain drop-shadow-lg"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-4xl">🧸</span>
                        </div>
                    )}
                </div>

                {/* Partner Name */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    {partnerName || (
                        <span className="text-gray-400 italic">Partner&apos;s Name</span>
                    )}
                </h2>

                {/* Message */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4 min-h-[80px]">
                    <p className="text-gray-700 text-center whitespace-pre-wrap break-words">
                        {message || (
                            <span className="text-gray-400 italic">
                                Your lovely message will appear here...
                            </span>
                        )}
                    </p>
                </div>

                {/* Creator Name */}
                {creatorName && (
                    <p className="text-center text-gray-600 text-sm">
                        With love, <span className="font-semibold">{creatorName}</span> 💝
                    </p>
                )}

                {/* Preview Buttons (non-functional) */}
                <div className="flex gap-4 mt-6 justify-center">
                    <div className="px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-semibold shadow-md opacity-75">
                        Yes! 💖
                    </div>
                    <div className="px-6 py-2 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed opacity-50">
                        No
                    </div>
                </div>
            </div>
        </div>
    );
}
