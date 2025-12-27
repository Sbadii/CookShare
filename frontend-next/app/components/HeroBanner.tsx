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
      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">

        {/* Titles */}
        <div className="max-w-4xl mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Bienvenue sur{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              CookShare®
            </span>
          </h1>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
            Communauté de Recettes
          </h2>

          <p className="text-lg md:text-2xl text-gray-200 font-light">
            <span className="font-bold text-yellow-400">32 681</span> recettes partagées par la communauté
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-center mb-10">
          <div className="relative w-full max-w-4xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition"></div>

            <div className="relative bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-stretch p-2 backdrop-blur-md">

              {/* Input */}
              <div className="flex items-center flex-1 px-6 py-4">
                <svg className="w-6 h-6 text-gray-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Rechercher une recette, un ingrédient ou un chef…"
                  className="w-full text-gray-800 text-lg outline-none placeholder-gray-400 bg-transparent"
                />
              </div>

              {/* Button */}
              <button
                onClick={handleSearch}
                className="mt-3 md:mt-0 md:ml-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Rechercher
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
          {["Végétarien", "Desserts", "Rapide", "Healthy", "Traditionnel"].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30
                         hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all text-sm md:text-base font-medium"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 flex flex-col items-center z-10 animate-bounce">
        <div className="h-10 w-6 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
          <div className="h-3 w-1 bg-white rounded-full animate-pulse"></div>
        </div>
        <span className="text-xs text-white/70 mt-2">Scroll</span>
      </div>
    </section>
  );
}
