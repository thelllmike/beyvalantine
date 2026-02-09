import Image from "next/image";
import Link from "next/link";
import { TEDDY_GALLERY } from "@/lib/teddies";

export default function ExamplesPage() {
    const examples = [
        {
            partnerName: "Sarah",
            creatorName: "Mike",
            message: "From the moment I met you, my life became a beautiful adventure. Every day with you feels like a dream come true. Will you be my Valentine?",
            teddyKey: "teddy-1",
        },
        {
            partnerName: "Alex",
            creatorName: "Jordan",
            message: "You make my heart skip a beat every time I see you. Your smile lights up my world. Let's celebrate love together! 💕",
            teddyKey: "teddy-5",
        },
        {
            partnerName: "Emily",
            creatorName: null,
            message: "You're the sweetest person I know. Thank you for being you. Happy Valentine's Day!",
            teddyKey: "teddy-7",
        },
    ];

    return (
        <div className="min-h-[calc(100vh-64px)] py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-4">
                        Example Valentine Cards 💕
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Get inspired by these beautiful examples! Create your own personalized
                        Valentine card and share it with your special someone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {examples.map((example, index) => {
                        const teddy = TEDDY_GALLERY.find((t) => t.key === example.teddyKey);

                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-3xl p-6 shadow-xl border border-pink-200 card-hover"
                            >
                                <div className="text-center mb-4">
                                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                                        <span className="text-white text-sm font-medium">
                                            Will you be my Valentine? 💕
                                        </span>
                                    </div>
                                </div>

                                <div className="relative w-24 h-24 mx-auto mb-4">
                                    {teddy && (
                                        <Image
                                            src={teddy.src}
                                            alt={teddy.name}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                                    Dear {example.partnerName},
                                </h3>

                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4">
                                    <p className="text-gray-700 text-sm text-center">
                                        {example.message}
                                    </p>
                                </div>

                                {example.creatorName && (
                                    <p className="text-center text-gray-600 text-sm">
                                        With love, <span className="font-semibold">{example.creatorName}</span> 💝
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Link
                        href="/login"
                        className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                    >
                        Create Your Own Card 💖
                    </Link>
                </div>
            </div>
        </div>
    );
}
