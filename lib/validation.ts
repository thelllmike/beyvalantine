import { z } from "zod";
import { TEDDY_GALLERY } from "@/lib/teddies";

export const valentineFormSchema = z.object({
    creatorDisplayName: z
        .string()
        .max(60, "Creator name must be 60 characters or less")
        .optional()
        .transform((val) => val?.trim() || ""),
    partnerName: z
        .string()
        .min(1, "Partner name is required")
        .max(80, "Partner name must be 80 characters or less")
        .transform((val) => val.trim()),
    message: z
        .string()
        .min(1, "Message is required")
        .max(300, "Message must be 300 characters or less")
        .transform((val) => val.trim()),
    teddyKey: z
        .string()
        .min(1, "Please select a teddy")
        .refine(
            (key) => TEDDY_GALLERY.some((t) => t.key === key),
            "Please select a valid teddy from the gallery"
        ),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type ValentineFormInput = z.input<typeof valentineFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
