// src/components/Header.tsx
export default function Header() {
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

        <button className="flex items-center space-x-2 hover:underline">
          <span>Login</span>
        </button>
      </div>
    </header>
  );
}
