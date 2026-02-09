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
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 text-center">
                    <div className="text-6xl mb-6">🎉</div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-4">
                        Your Valentine Card is Ready!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Share this link with <span className="font-semibold text-pink-600">{card.partner_name}</span> and wait for the magic! 💕
                    </p>

                    <div className="bg-pink-50 rounded-xl p-4 mb-6 border border-pink-200">
                        <p className="text-sm text-gray-500 mb-2">Your shareable link:</p>
                        <p className="text-pink-600 font-mono text-sm break-all">
                            {publicUrl}
                        </p>
                    </div>

                    <ShareActions publicUrl={publicUrl} slug={slug} />
                </div>
            </div>
        </div>
    );
}
