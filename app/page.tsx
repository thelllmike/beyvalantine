import Link from "next/link";
import { getUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getUser();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-6xl mb-6 animate-bounce">💕</div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent">
          Create Your Perfect Valentine
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Design a personalized Valentine&apos;s Day card with cute teddy bears,
          heartfelt messages, and share it with your special someone. Will they
          say yes? 💝
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={user ? "/builder" : "/login"}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Create Your Valentine Page ❤️
          </Link>
          <Link
            href="/examples"
            className="px-8 py-4 text-lg font-semibold text-pink-600 border-2 border-pink-300 rounded-2xl hover:bg-pink-50 transition-all duration-200"
          >
            View Examples ✨
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 card-hover">
          <div className="text-4xl mb-4">🧸</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Choose Your Teddy
          </h3>
          <p className="text-gray-600">
            Pick from our adorable collection of 12 cute teddy bears to
            personalize your card.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 card-hover">
          <div className="text-4xl mb-4">💌</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Write Your Message
          </h3>
          <p className="text-gray-600">
            Express your feelings with a heartfelt message up to 300 characters
            long.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 card-hover">
          <div className="text-4xl mb-4">🔗</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Share the Love
          </h3>
          <p className="text-gray-600">
            Get a unique link to share with your valentine and wait for their
            answer!
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto shadow-xl border border-pink-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          How It Works 💫
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              1
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Sign Up</h4>
            <p className="text-sm text-gray-600">Create your free account</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              2
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Design</h4>
            <p className="text-sm text-gray-600">Customize your card</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              3
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Share</h4>
            <p className="text-sm text-gray-600">Send the link</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              4
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Celebrate!</h4>
            <p className="text-sm text-gray-600">Watch the magic happen 🎉</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Made with 💕 for Valentine&apos;s Day 2026</p>
      </footer>
    </div>
  );
}
