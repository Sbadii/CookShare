// src/app/components/HeroBanner.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/?query=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url(/background.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-6 flex flex-col items-center text-center">
        {/* Titles */}
        <div className="max-w-3xl mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
            Bienvenue sur{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              CookShare®
            </span>
          </h1>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
            Communauté de Recettes
          </h2>

          <p className="text-base md:text-lg text-gray-200 font-light">
            <span className="font-bold text-yellow-400">32 681</span> recettes partagées par la communauté
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-center mb-6">
          <div className="relative w-full max-w-3xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition"></div>

            <div className="relative bg-white rounded-3xl shadow-xl flex flex-col md:flex-row items-stretch p-1.5 backdrop-blur-md">
              {/* Input */}
              <div className="flex items-center flex-1 px-4 py-3">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Rechercher une recette, un ingrédient ou un chef…"
                  className="w-full text-gray-800 text-base md:text-lg outline-none placeholder-gray-400 bg-transparent"
                />
              </div>

              {/* Button */}
              <button
                onClick={handleSearch}
                className="mt-2 md:mt-0 md:ml-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-2xl font-semibold shadow-md hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-1.5 text-sm md:text-base"
              >
                Rechercher
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
          {["Végétarien", "Desserts", "Rapide", "Healthy", "Traditionnel"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all text-xs md:text-sm font-medium"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center z-10 animate-bounce">
        <div className="h-8 w-5 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
          <div className="h-2.5 w-0.5 bg-white rounded-full animate-pulse"></div>
        </div>
        <span className="text-xs text-white/70 mt-1">Scroll</span>
      </div>
    </section>
  );
}