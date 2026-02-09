"use client";

import Image from "next/image";
import { TEDDY_GALLERY } from "@/lib/teddies";

interface TeddyPickerProps {
    value: string;
    onChange: (key: string) => void;
    error?: string;
}

export default function TeddyPicker({ value, onChange, error }: TeddyPickerProps) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose a Teddy Bear 🧸
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {TEDDY_GALLERY.map((teddy) => (
                    <button
                        key={teddy.key}
                        type="button"
                        onClick={() => onChange(teddy.key)}
                        className={`
              relative p-2 rounded-xl border-2 transition-all duration-200
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300
              ${value === teddy.key
                                ? "border-pink-500 bg-pink-50 shadow-lg ring-2 ring-pink-300"
                                : "border-pink-100 bg-white hover:border-pink-300"
                            }
            `}
                        aria-label={`Select ${teddy.name}`}
                        aria-pressed={value === teddy.key}
                    >
                        <div className="aspect-square relative">
                            <Image
                                src={teddy.src}
                                alt={teddy.name}
                                fill
                                className="object-contain rounded-lg"
                                unoptimized
                            />
                        </div>
                        <p className="mt-1 text-xs text-center text-gray-600 truncate">
                            {teddy.name}
                        </p>
                        {value === teddy.key && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
