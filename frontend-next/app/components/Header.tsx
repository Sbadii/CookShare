"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostModal from "./CreatePostModal";
import Link from "next/link";
import AuthModal from "./AuthModal";
import Image from "next/image";

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
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    // Check if running on client and token exists
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      const storedEmail = localStorage.getItem("email");
      const storedFullName = localStorage.getItem("fullName");
      const storedImage = localStorage.getItem("profileImage");
      setIsLoggedIn(!!token);
      if (storedUsername) setUsername(storedUsername);
      if (storedEmail) setEmail(storedEmail);
      if (storedFullName) setFullName(storedFullName);
      if (storedImage) setProfileImage(storedImage);
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
    const currentUsername = localStorage.getItem("username");
    if (currentUsername) {
      // Backup user data
      const liked = localStorage.getItem("liked_ids");
      const reposted = localStorage.getItem("reposted_ids");
      const following = localStorage.getItem("following");
      if (liked) localStorage.setItem(`liked_ids_${currentUsername}`, liked);
      if (reposted) localStorage.setItem(`reposted_ids_${currentUsername}`, reposted);
      if (following) localStorage.setItem(`following_${currentUsername}`, following);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    localStorage.removeItem("profileImage"); // Also clear profile image on logout
    localStorage.removeItem("liked_ids");
    localStorage.removeItem("reposted_ids");
    localStorage.removeItem("following");
    setIsLoggedIn(false);
    setShowUserDropdown(false);
    router.refresh();
    window.location.reload();
  };

  const usernameInitial = username ? username.charAt(0).toUpperCase() : "";

  return (
    <>
      <header
        className={`fixed top-0 w-full flex items-center justify-between px-6 md:px-10 h-16 z-50 transition-all duration-300 bg-white ${scrolled ? "shadow-md" : "border-b border-gray-100"
          }`}
      >
        {/* Left Section: Logo & Navigation */}
        <div className="flex items-center gap-16 shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo8.png"
              alt="CookShare Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain hover:scale-110 transition-transform"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/feed"
              className="px-4 py-2.5 text-gray-900 font-semibold hover:bg-gray-100 rounded-full transition-colors whitespace-nowrap text-lg"
            >
              Explorer
            </Link>
            <Link
              href="#"
              className="px-4 py-2.5 text-lg font-semibold text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              À propos
            </Link>
            <Link
              href="#"
              className="px-4 py-2.5 text-lg font-semibold text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              Aide
            </Link>
          </nav>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-2xl mx-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const query = formData.get("search") as string;
              router.push(`/feed?query=${encodeURIComponent(query)}`);
            }}
            className="relative group w-full"
          >

            <input
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Chercher une recette, un ingrédient ou un auteur..."
              className="w-full h-12 pl-16 pr-6 bg-[#f0f0f0] border-2 border-transparent rounded-full text-gray-900 text-lg font-bold placeholder:text-gray-500 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:bg-white focus:border-red-100 transition-all shadow-sm group-hover:bg-[#e8e8e8]"
            />
            {/* Hidden submit button to allow Enter key without messy UI button */}
            <button type="submit" className="hidden">Search</button>
          </form>
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
                    className="w-12 h-12 rounded-full bg-[#FCD9BD] text-gray-900 flex items-center justify-center font-black text-lg transition-all overflow-hidden"
                  >
                    {profileImage ? (
                      <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      usernameInitial
                    )}
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
                    className="absolute right-0 top-[120%] w-[360px] bg-white rounded-2xl shadow-[0_0_24px_rgba(0,0,0,0.15)] border border-gray-100 py-6 z-[100] overflow-hidden"
                  >
                    <div className="px-4 mb-2">
                      <p className="text-[12px] text-gray-700 font-medium px-2 mb-2">Actuellement connecté</p>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-2xl transition-all group"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <div className="w-16 h-16 bg-[#FCD9BD] rounded-full flex items-center justify-center text-2xl font-black text-gray-900 shrink-0 overflow-hidden">
                          {profileImage ? (
                            <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            usernameInitial
                          )}
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
            <div className="flex items-center gap-6">
              <button
                onClick={() => { setAuthMode("register"); setShowAuthModal(true); }}
                className="text-gray-600 hover:text-gray-900 font-semibold text-lg transition-all whitespace-nowrap active:scale-95"
              >
                Sign up
              </button>
              <button
                onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
                className="text-red-600 hover:text-red-700 font-semibold text-lg transition-all whitespace-nowrap active:scale-95"
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