export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 px-4 mt-8 border-t border-pink-100 bg-white/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-gray-500 text-sm">
                    © {currentYear} All rights reserved to{" "}
                    <a
                        href="https://cleverproject.lk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
                    >
                        cleverproject.lk
                    </a>
                </p>
                <p className="text-gray-400 text-xs mt-2">
                    Made with 💕 for Valentine&apos;s Day 2026
                </p>
            </div>
        </footer>
    );
}
