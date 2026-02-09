"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

interface ShareActionsProps {
    publicUrl: string;
    slug: string;
}

export default function ShareActions({ publicUrl, slug }: ShareActionsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <Button onClick={handleCopy} className="flex-1" variant="primary">
                    {copied ? "Copied! ✓" : "Copy Link 📋"}
                </Button>
                <a
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                >
                    <Button variant="outline" className="w-full">
                        Open Link 🔗
                    </Button>
                </a>
            </div>

            <div className="flex gap-4">
                <Link href={`/builder?slug=${slug}`} className="flex-1">
                    <Button variant="ghost" className="w-full">
                        Edit Card ✏️
                    </Button>
                </Link>
                <Link href="/builder" className="flex-1">
                    <Button variant="ghost" className="w-full">
                        Create New 💕
                    </Button>
                </Link>
            </div>
        </div>
    );
}
