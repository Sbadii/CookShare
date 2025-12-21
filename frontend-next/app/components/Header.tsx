"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostModal from "./CreatePostModal";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if running on client and token exists
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const handlePosterClick = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      router.push("/login");
    }
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.refresh();
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <header className="absolute top-0 w-full flex justify-between items-center px-8 py-6 z-20 text-white backdrop-blur-sm bg-black/10">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🍳 CookShare
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-base font-medium hover:text-yellow-400 transition-colors duration-200">Browse</a>
          <a href="#" className="text-base font-medium hover:text-yellow-400 transition-colors duration-200">About Us</a>
          <a href="#" className="text-base font-medium hover:text-yellow-400 transition-colors duration-200">Help</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-200 backdrop-blur-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden lg:inline">Search</span>
          </button>

          {/* Poster Button - WOW Design */}
          <button
            onClick={handlePosterClick}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-0.5 transition-all duration-300 ring-2 ring-white/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Poster</span>
          </button>

          <button
            onClick={handleLoginClick}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{isLoggedIn ? "Logout" : "Login"}</span>
          </button>
        </div>
      </header>

      {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            router.refresh();
          }}
        />
      )}
    </>
  );
}