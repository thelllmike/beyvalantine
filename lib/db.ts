import { createClient } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/slug";
import { TEDDY_GALLERY, getTeddyByKey } from "@/lib/teddies";
import type { TeddyOption, ValentineCard } from "@/types/valentine";

// Re-export for backward compatibility
export { TEDDY_GALLERY, getTeddyByKey };
export type { TeddyOption };

const MAX_CARDS_PER_DAY = 20;
const MAX_SLUG_ATTEMPTS = 5;

export async function checkRateLimit(userId: string): Promise<boolean> {
    const supabase = await createClient();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { count, error } = await supabase
        .from("valentine_cards")
        .select("*", { count: "exact", head: true })
        .eq("owner_user_id", userId)
        .gte("created_at", oneDayAgo);

    if (error) {
        console.error("Rate limit check error:", error);
        return false;
    }

    return (count ?? 0) < MAX_CARDS_PER_DAY;
}

export async function generateUniqueSlug(): Promise<string> {
    const supabase = await createClient();

    for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt++) {
        const slug = generateSlug();
        const { data } = await supabase
            .from("valentine_cards")
            .select("slug")
            .eq("slug", slug)
            .single();

        if (!data) {
            return slug;
        }
    }

    throw new Error("Failed to generate unique slug after multiple attempts");
}

export async function createValentineCard(
    userId: string,
    data: {
        partnerName: string;
        creatorName: string | null;
        message: string;
        teddyKey: string;
    }
): Promise<{ slug: string } | { error: string }> {
    const supabase = await createClient();

    // Check rate limit
    const withinLimit = await checkRateLimit(userId);
    if (!withinLimit) {
        return { error: "You've reached the daily limit of 20 cards. Please try again tomorrow." };
    }

    // Generate unique slug
    const slug = await generateUniqueSlug();

    const { error } = await supabase.from("valentine_cards").insert({
        owner_user_id: userId,
        slug,
        partner_name: data.partnerName,
        creator_name: data.creatorName || null,
        message: data.message,
        teddy_key: data.teddyKey,
    });

    if (error) {
        console.error("Error creating card:", error);
        return { error: "Failed to create your valentine card. Please try again." };
    }

    return { slug };
}

export async function updateValentineCard(
    userId: string,
    slug: string,
    data: {
        partnerName: string;
        creatorName: string | null;
        message: string;
        teddyKey: string;
    }
): Promise<{ success: boolean } | { error: string }> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("valentine_cards")
        .update({
            partner_name: data.partnerName,
            creator_name: data.creatorName || null,
            message: data.message,
            teddy_key: data.teddyKey,
        })
        .eq("slug", slug)
        .eq("owner_user_id", userId);

    if (error) {
        console.error("Error updating card:", error);
        return { error: "Failed to update your valentine card. Please try again." };
    }

    return { success: true };
}

export async function getCardBySlug(slug: string): Promise<ValentineCard | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("valentine_cards")
        .select("id, slug, partner_name, creator_name, message, teddy_key, created_at")
        .eq("slug", slug)
        .single();

    if (error || !data) {
        return null;
    }

    // Don't expose owner_user_id in the return
    return {
        ...data,
        owner_user_id: "", // Hidden
    } as ValentineCard;
}

export async function getCardBySlugForOwner(
    slug: string,
    userId: string
): Promise<ValentineCard | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("valentine_cards")
        .select("*")
        .eq("slug", slug)
        .eq("owner_user_id", userId)
        .single();

    if (error || !data) {
        return null;
    }

    return data as ValentineCard;
}

export async function getUserCards(userId: string): Promise<ValentineCard[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("valentine_cards")
        .select("*")
        .eq("owner_user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching user cards:", error);
        return [];
    }

    return data as ValentineCard[];
}
