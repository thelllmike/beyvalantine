"use client";

import { useState, useTransition } from "react";
import { valentineFormSchema } from "@/lib/validation";
import { createCardAction, updateCardAction } from "./actions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import TeddyPicker from "@/components/TeddyPicker";
import LivePreviewCard from "@/components/LivePreviewCard";
import type { ValentineCard } from "@/types/valentine";

interface BuilderFormProps {
    existingCard: ValentineCard | null;
}

export default function BuilderForm({ existingCard }: BuilderFormProps) {
    const [isPending, startTransition] = useTransition();
    const [creatorDisplayName, setCreatorDisplayName] = useState(
        existingCard?.creator_name || ""
    );
    const [partnerName, setPartnerName] = useState(
        existingCard?.partner_name || ""
    );
    const [message, setMessage] = useState(existingCard?.message || "");
    const [teddyKey, setTeddyKey] = useState(existingCard?.teddy_key || "");
    const [errors, setErrors] = useState<{
        creatorDisplayName?: string;
        partnerName?: string;
        message?: string;
        teddyKey?: string;
    }>({});
    const [generalError, setGeneralError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");

        // Client-side validation
        const result = valentineFormSchema.safeParse({
            creatorDisplayName,
            partnerName,
            message,
            teddyKey,
        });

        if (!result.success) {
            const fieldErrors: typeof errors = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof typeof errors;
                fieldErrors[path] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        const formData = new FormData();
        formData.append("creatorDisplayName", creatorDisplayName);
        formData.append("partnerName", partnerName);
        formData.append("message", message);
        formData.append("teddyKey", teddyKey);

        startTransition(async () => {
            const action = existingCard
                ? updateCardAction(existingCard.slug, formData)
                : createCardAction(formData);

            const result = await action;

            if (result && !result.success && result.error) {
                setGeneralError(result.error);
            }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {generalError && (
                        <div
                            className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                            role="alert"
                        >
                            {generalError}
                        </div>
                    )}

                    <Input
                        label="Your Name (optional)"
                        value={creatorDisplayName}
                        onChange={(e) => setCreatorDisplayName(e.target.value)}
                        error={errors.creatorDisplayName}
                        placeholder="Your name or nickname"
                    />

                    <Input
                        label="Partner's Name"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        error={errors.partnerName}
                        placeholder="Your valentine's name"
                    />

                    <Textarea
                        label="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        error={errors.message}
                        placeholder="Write your heartfelt message here... 💕"
                        maxLength={300}
                    />

                    <TeddyPicker
                        value={teddyKey}
                        onChange={setTeddyKey}
                        error={errors.teddyKey}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        isLoading={isPending}
                    >
                        {existingCard ? "Update Card 💝" : "Generate Link 💝"}
                    </Button>
                </form>
            </div>

            {/* Live Preview */}
            <div className="lg:sticky lg:top-24 h-fit">
                <LivePreviewCard
                    partnerName={partnerName}
                    creatorName={creatorDisplayName}
                    message={message}
                    teddyKey={teddyKey}
                />
            </div>
        </div>
    );
}
