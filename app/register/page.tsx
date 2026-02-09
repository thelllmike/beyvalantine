"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";
import { registerSchema } from "@/lib/validation";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});
    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");

        // Client-side validation
        const result = registerSchema.safeParse({ email, password, confirmPassword });
        if (!result.success) {
            const fieldErrors: {
                email?: string;
                password?: string;
                confirmPassword?: string;
            } = {};
            result.error.issues.forEach((issue) => {
                if (issue.path[0] === "email") fieldErrors.email = issue.message;
                if (issue.path[0] === "password") fieldErrors.password = issue.message;
                if (issue.path[0] === "confirmPassword")
                    fieldErrors.confirmPassword = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setGeneralError(error.message);
                return;
            }

            router.push("/builder");
            router.refresh();
        } catch {
            setGeneralError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100">
                    <div className="text-center mb-8">
                        <div className="text-5xl mb-4">🥰</div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                            Join the Love
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Create an account to start making valentine cards
                        </p>
                    </div>

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
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                            placeholder="••••••••"
                            autoComplete="new-password"
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors.confirmPassword}
                            placeholder="••••••••"
                            autoComplete="new-password"
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={isLoading}
                        >
                            Create Account 💝
                        </Button>
                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-pink-600 font-semibold hover:text-pink-700"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
