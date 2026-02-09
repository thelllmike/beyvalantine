import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { getCardBySlug } from "@/lib/db";
import { getTeddyByKey } from "@/lib/teddies";
import ValentineActions from "./ValentineActions";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const card = await getCardBySlug(slug);

    if (!card) {
        return { title: "Not Found" };
    }

    return {
        title: `${card.partner_name}'s Valentine Message 💕`,
        description: "Someone special has a Valentine's Day message for you!",
    };
}

export default async function PublicViewPage({ params }: PageProps) {
    const { slug } = await params;
    const card = await getCardBySlug(slug);

    if (!card) {
        notFound();
    }

    const teddy = getTeddyByKey(card.teddy_key);

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8 overflow-hidden">
            <div className="w-full max-w-xl sm:max-w-2xl">
                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 shadow-2xl border-2 border-pink-200">
                    {/* Header */}
                    <div className="text-center mb-5 sm:mb-8">
                        <div className="inline-block px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg">
                            <span className="text-white text-base sm:text-xl font-bold">
                                Will you be my Valentine? 💕
                            </span>
                        </div>
                    </div>

                    {/* Teddy Image - Responsive */}
                    <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto mb-5 sm:mb-8">
                        {teddy ? (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={teddy.src}
                                    alt={teddy.name}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </>
                        ) : (
                            <div className="w-full h-full bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-6xl sm:text-8xl">🧸</span>
                            </div>
                        )}
                    </div>

                    {/* Partner Name - Responsive */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
                        Dear {card.partner_name},
                    </h1>

                    {/* Message - Responsive */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-5 sm:mb-8 shadow-inner">
                        <p className="text-gray-700 text-base sm:text-xl md:text-2xl text-center whitespace-pre-wrap leading-relaxed">
                            {card.message}
                        </p>
                    </div>

                    {/* Creator Name */}
                    {card.creator_name && (
                        <p className="text-center text-gray-600 text-sm sm:text-lg mb-5 sm:mb-8">
                            With love, <span className="font-bold text-pink-600 text-base sm:text-xl">{card.creator_name}</span> 💝
                        </p>
                    )}

                    {/* Yes/No Actions */}
                    <ValentineActions
                        partnerName={card.partner_name}
                        creatorName={card.creator_name}
                    />
                </div>
            </div>
        </div>
    );
}
