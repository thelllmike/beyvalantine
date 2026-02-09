"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";
import { registerSchema } from "@/lib/validation";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function RegisterPage() {
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
    const [showConfirmation, setShowConfirmation] = useState(false);

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

            // Show confirmation popup instead of redirecting
            setShowConfirmation(true);
        } catch {
            setGeneralError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Confirmation popup
    if (showConfirmation) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 text-center">
                        <div className="text-6xl mb-6">📧</div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-4">
                            Check Your Email!
                        </h1>
                        <p className="text-gray-600 mb-6">
                            We&apos;ve sent a confirmation link to{" "}
                            <span className="font-semibold text-pink-600">{email}</span>
                        </p>
                        <div className="bg-pink-50 rounded-xl p-4 mb-6 border border-pink-200">
                            <p className="text-sm text-gray-600">
                                📌 Please check your inbox and click the confirmation link to activate your account.
                            </p>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">
                            Didn&apos;t receive the email? Check your spam folder.
                        </p>
                        <div className="space-y-3">
                            <Link href="/login">
                                <Button className="w-full" variant="primary">
                                    Go to Login 💕
                                </Button>
                            </Link>
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="text-pink-500 text-sm hover:text-pink-600"
                            >
                                ← Back to Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
