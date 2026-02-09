import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { getCardBySlugForOwner } from "@/lib/db";
import BuilderForm from "./BuilderForm";

interface PageProps {
    searchParams: Promise<{ slug?: string }>;
}

export default async function BuilderPage({ searchParams }: PageProps) {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    const params = await searchParams;
    const slug = params.slug;

    let existingCard = null;
    if (slug) {
        existingCard = await getCardBySlugForOwner(slug, user.id);
    }

    return (
        <div className="min-h-[calc(100vh-64px)] py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-2">
                        {existingCard ? "Edit Your Valentine Card" : "Create Your Valentine Card"}
                    </h1>
                    <p className="text-gray-600">
                        {existingCard
                            ? "Update your card and save the changes"
                            : "Design a personalized card for your special someone 💕"}
                    </p>
                </div>

                <BuilderForm existingCard={existingCard} />
            </div>
        </div>
    );
}
