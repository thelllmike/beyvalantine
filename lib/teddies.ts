import type { TeddyOption } from "@/types/valentine";

// Teddy gallery with dicebear avatars (stable remote URLs)
// This is a shared constant that can be used in both client and server components
export const TEDDY_GALLERY: TeddyOption[] = [
    { key: "teddy-1", name: "Cuddle Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy1&backgroundColor=ffdfbf" },
    { key: "teddy-2", name: "Love Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy2&backgroundColor=ffd5d5" },
    { key: "teddy-3", name: "Sweet Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy3&backgroundColor=ffe4e1" },
    { key: "teddy-4", name: "Honey Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy4&backgroundColor=fff0db" },
    { key: "teddy-5", name: "Valentine Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy5&backgroundColor=ffc0cb" },
    { key: "teddy-6", name: "Rose Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy6&backgroundColor=ffb6c1" },
    { key: "teddy-7", name: "Heart Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy7&backgroundColor=ffe4e1" },
    { key: "teddy-8", name: "Snuggle Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy8&backgroundColor=ffe4b5" },
    { key: "teddy-9", name: "Hug Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy9&backgroundColor=ffdab9" },
    { key: "teddy-10", name: "Kiss Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy10&backgroundColor=ffc0cb" },
    { key: "teddy-11", name: "Dream Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy11&backgroundColor=e6e6fa" },
    { key: "teddy-12", name: "Blush Bear", src: "https://api.dicebear.com/9.x/adventurer/svg?seed=teddy12&backgroundColor=ffb7c5" },
];

export function getTeddyByKey(key: string): TeddyOption | undefined {
    return TEDDY_GALLERY.find((t) => t.key === key);
}
