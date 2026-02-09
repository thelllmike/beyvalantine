"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createValentineCard, updateValentineCard } from "@/lib/db";
import { valentineFormSchema } from "@/lib/validation";

export interface ActionResult {
    success: boolean;
    error?: string;
    slug?: string;
}

export async function createCardAction(formData: FormData): Promise<ActionResult> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "You must be logged in to create a card" };
    }

    const rawData = {
        creatorDisplayName: formData.get("creatorDisplayName") as string || "",
        partnerName: formData.get("partnerName") as string || "",
        message: formData.get("message") as string || "",
        teddyKey: formData.get("teddyKey") as string || "",
    };

    // Server-side validation
    const result = valentineFormSchema.safeParse(rawData);
    if (!result.success) {
        const firstError = result.error.issues[0];
        return { success: false, error: firstError.message };
    }

    const data = result.data;

    const createResult = await createValentineCard(user.id, {
        partnerName: data.partnerName,
        creatorName: data.creatorDisplayName || null,
        message: data.message,
        teddyKey: data.teddyKey,
    });

    if ("error" in createResult) {
        return { success: false, error: createResult.error };
    }

    redirect(`/share/${createResult.slug}`);
}

export async function updateCardAction(
    slug: string,
    formData: FormData
): Promise<ActionResult> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "You must be logged in to update a card" };
    }

    const rawData = {
        creatorDisplayName: formData.get("creatorDisplayName") as string || "",
        partnerName: formData.get("partnerName") as string || "",
        message: formData.get("message") as string || "",
        teddyKey: formData.get("teddyKey") as string || "",
    };

    // Server-side validation
    const result = valentineFormSchema.safeParse(rawData);
    if (!result.success) {
        const firstError = result.error.issues[0];
        return { success: false, error: firstError.message };
    }

    const data = result.data;

    const updateResult = await updateValentineCard(user.id, slug, {
        partnerName: data.partnerName,
        creatorName: data.creatorDisplayName || null,
        message: data.message,
        teddyKey: data.teddyKey,
    });

    if ("error" in updateResult) {
        return { success: false, error: updateResult.error };
    }

    redirect(`/share/${slug}`);
}
