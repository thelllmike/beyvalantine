"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    maxLength?: number;
    showCount?: boolean;
    value?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            className = "",
            id,
            maxLength = 300,
            showCount = true,
            value = "",
            ...props
        },
        ref
    ) => {
        const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
        const charCount = typeof value === "string" ? value.length : 0;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <textarea
                        ref={ref}
                        id={textareaId}
                        maxLength={maxLength}
                        value={value}
                        className={`
              w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
              bg-white/80 backdrop-blur-sm resize-none
              focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400
              placeholder:text-gray-400
              ${error ? "border-red-400 focus:border-red-400 focus:ring-red-300" : "border-pink-200 hover:border-pink-300"}
              ${className}
            `}
                        rows={4}
                        {...props}
                    />
                    {showCount && (
                        <div
                            className={`absolute bottom-3 right-3 text-xs ${charCount >= maxLength
                                    ? "text-red-500"
                                    : charCount >= maxLength * 0.8
                                        ? "text-amber-500"
                                        : "text-gray-400"
                                }`}
                        >
                            {charCount}/{maxLength}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export default Textarea;
