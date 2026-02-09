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
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">
                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-3xl p-8 shadow-2xl border border-pink-200">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                            <span className="text-white font-semibold">
                                Will you be my Valentine? 💕
                            </span>
                        </div>
                    </div>

                    {/* Teddy Image */}
                    <div className="relative w-40 h-40 mx-auto mb-6">
                        {teddy ? (
                            <Image
                                src={teddy.src}
                                alt={teddy.name}
                                fill
                                className="object-contain drop-shadow-xl"
                                priority
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-6xl">🧸</span>
                            </div>
                        )}
                    </div>

                    {/* Partner Name */}
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                        Dear {card.partner_name},
                    </h1>

                    {/* Message */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6">
                        <p className="text-gray-700 text-lg text-center whitespace-pre-wrap leading-relaxed">
                            {card.message}
                        </p>
                    </div>

                    {/* Creator Name */}
                    {card.creator_name && (
                        <p className="text-center text-gray-600 mb-6">
                            With love, <span className="font-bold text-pink-600">{card.creator_name}</span> 💝
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
