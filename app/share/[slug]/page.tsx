import { notFound } from "next/navigation";
import { getCardBySlug } from "@/lib/db";
import ShareActions from "./ShareActions";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function SharePage({ params }: PageProps) {
    const { slug } = await params;
    const card = await getCardBySlug(slug);

    if (!card) {
        notFound();
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const publicUrl = `${siteUrl}/v/${slug}`;

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-100 text-center">
                    {/* Success Animation */}
                    <div className="relative mb-6">
                        <div className="text-6xl animate-bounce">🎉</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-pink-100 animate-ping opacity-30"></div>
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-3">
                        Your Valentine Card is Ready!
                    </h1>

                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                        Share this with <span className="font-bold text-pink-600">{card.partner_name}</span> and wait for the magic! 💕
                    </p>

                    {/* Link Preview Box */}
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 mb-6 border border-pink-200">
                        <p className="text-xs text-gray-500 mb-2">Your shareable link:</p>
                        <p className="text-pink-600 font-mono text-xs sm:text-sm break-all font-medium">
                            {publicUrl}
                        </p>
                    </div>

                    <ShareActions
                        publicUrl={publicUrl}
                        slug={slug}
                        partnerName={card.partner_name}
                    />
                </div>
            </div>
        </div>
    );
}
