"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white relative flex flex-col items-center justify-center overflow-hidden">
      {/* Main Footer Section - Sized like other sections */}
      <div className="min-h-[80vh] w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-20 py-24">

        {/* Brand Section */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          <Link href="/" className="group">
            <h3 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent transform group-hover:scale-105 transition-transform duration-300">
              CookShare
            </h3>
          </Link>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-md">
            La plus grande communauté de passionnés de cuisine. Partagez, découvrez et savourez.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 pt-4">
            {[
              { id: 'fb', d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              { id: 'tw', d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
              { id: 'ig', d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 3.259 0 3.668-.014 4.948-.072 3.259 0 3.668-.014 4.948-.072 3.259 0 3.668-.014 4.948-.072 3.259 0 3.668-.014 4.948-.072 3.259 0 3.668-.014 4.948-.072 3.259 0 3.668-.014 4.948-.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }
            ].map((icon) => (
              <a key={icon.id} href="#" className="w-14 h-14 bg-white/5 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={icon.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid Section */}
        <div className="flex-1 grid grid-cols-2 gap-12 text-center md:text-left">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {["Explorer", "Accueil", "À Propos", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-lg transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white uppercase tracking-widest">Légal</h4>
            <ul className="space-y-4">
              {["Confidentialité", "Conditions", "Cookies"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-lg transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CookShare. Créé avec passion pour les gourmets.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span className="flex items-center gap-2 italic">Savourez chaque instant</span>
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
    </footer>
  );
}
