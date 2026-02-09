import { customAlphabet } from "nanoid";

// URL-safe alphabet without ambiguous characters
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 10);

export function generateSlug(): string {
    return nanoid();
}
