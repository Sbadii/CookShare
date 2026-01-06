"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostModal from "./CreatePostModal";
import Link from "next/link";
import AuthModal from "./AuthModal";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check if running on client and token exists
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      const storedEmail = localStorage.getItem("email");
      const storedFullName = localStorage.getItem("fullName");
      setIsLoggedIn(!!token);
      if (storedUsername) setUsername(storedUsername);
      if (storedEmail) setEmail(storedEmail);
      if (storedFullName) setFullName(storedFullName);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Listener for opening auth modal from other components
    const handleOpenAuth = (e: any) => {
      setAuthMode(e.detail?.mode || "login");
      setShowAuthModal(true);
    };
    window.addEventListener("openAuth", handleOpenAuth);

    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("user-dropdown");
      const button = document.getElementById("user-menu-button");
      if (dropdown && !dropdown.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("openAuth", handleOpenAuth);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePosterClick = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      setAuthMode("login");
      setShowAuthModal(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    setIsLoggedIn(false);
    setShowUserDropdown(false);
    router.refresh();
    window.location.reload();
  };

  const usernameInitial = username ? username.charAt(0).toUpperCase() : "";

  return (
    <>
      <header
        className={`fixed top-0 w-full flex items-center justify-between px-6 md:px-10 h-20 z-50 transition-all duration-300 bg-white ${scrolled ? "shadow-md" : "border-b border-gray-100"
          }`}
      >
        {/* Left Section: Logo & Navigation */}
        <div className="flex items-center space-x-6 shrink-0">
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg hover:bg-red-700 transition-colors">
              🍳
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/feed"
              className="px-4 py-2.5 text-gray-900 font-black hover:bg-gray-100 rounded-full transition-colors whitespace-nowrap"
            >
              Explorer
            </Link>
            <Link
              href="#"
              className="px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              À propos
            </Link>
            <Link
              href="#"
              className="px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              Aide
            </Link>
          </nav>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-2xl mx-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 group-focus-within:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full h-12 pl-12 pr-6 bg-[#efefef] border-transparent rounded-full text-base font-normal focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:bg-white border focus:border-red-100 transition-all"
            />
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center space-x-4 shrink-0">
          {isLoggedIn ? (
            <>
              <button
                onClick={handlePosterClick}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-900 transition-colors"
                title="Partager"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>

              <div className="flex items-center space-x-2 relative">
                <div className="w-px h-6 bg-gray-200 mx-2"></div>
                <button
                  id="user-menu-button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded-full transition-colors group"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-[#FCD9BD] text-gray-900 flex items-center justify-center font-black text-lg transition-all"
                  >
                    {usernameInitial}
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center text-gray-500 group-hover:text-gray-900">
                    <svg className={`w-4 h-4 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Pinterest-style Dropdown */}
                {showUserDropdown && (
                  <div
                    id="user-dropdown"
                    className="absolute right-0 top-[120%] w-[300px] bg-white rounded-[24px] shadow-[0_0_24px_rgba(0,0,0,0.15)] border border-gray-100 py-4 z-[100] overflow-hidden"
                  >
                    <div className="px-4 mb-2">
                      <p className="text-[12px] text-gray-700 font-medium px-2 mb-2">Actuellement connecté</p>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-2xl transition-all group"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <div className="w-16 h-16 bg-[#FCD9BD] rounded-full flex items-center justify-center text-2xl font-black text-gray-900 shrink-0">
                          {usernameInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[16px] font-bold text-gray-900 truncate">{fullName || username}</p>
                          <p className="text-[14px] text-gray-500">Personnel</p>
                          <p className="text-[14px] text-gray-500 truncate">{email}</p>
                        </div>
                        <div className="text-gray-900">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </Link>
                    </div>

                    <div className="px-2 mt-4">
                      <p className="text-[12px] text-gray-700 font-medium px-4 mb-1">Vos comptes</p>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-[16px] font-bold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Mon profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-[16px] font-bold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setAuthMode("register"); setShowAuthModal(true); }}
                className="px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-gray-900 rounded-full font-black text-sm transition-all whitespace-nowrap"
              >
                Sign up
              </button>
              <button
                onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-black text-sm transition-all shadow-md whitespace-nowrap"
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation (for smaller screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-40">
        <nav className="flex justify-around items-center">
          <Link href="/feed" className="flex flex-col items-center text-gray-600 hover:text-red-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Accueil</span>
          </Link>

          <button
            onClick={handlePosterClick}
            className="flex flex-col items-center text-gray-600 hover:text-red-600"
          >
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </button>

          <Link href="#" className="flex flex-col items-center text-gray-600 hover:text-red-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </nav>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* CreatePostModal */}
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