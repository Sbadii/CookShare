// src/components/Header.tsx
"use client";

export default function Header() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <header className="absolute top-0 w-full flex justify-between items-center p-6 z-20 text-white">
      <nav className="hidden md:flex space-x-8">
        <a href="#" className="hover:underline">Browse</a>
        <a href="#" className="hover:underline">About Us</a>
        <a href="#" className="hover:underline">Help</a>
      </nav>

      <div className="flex items-center space-x-6">
        <button className="flex items-center space-x-2 hover:underline">
          <span>Search</span>
        </button>

          <a
            href="http://localhost:3000/login"
            className="flex items-center space-x-2 hover:underline text-white hover:text-yellow-400 transition-colors duration-200 px-4 py-2 rounded bg-transparent hover:bg-white/10"
          >
            <span>Login</span>
          </a>
        

      </div>
    </header>
  );
}