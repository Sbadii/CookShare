"use client";

import Link from "next/link";
import {
  Home,
  Search,
  Plus,
  Bell,
  MessageCircle
} from "lucide-react";

const items = [
  { label: "Accueil", icon: Home, href: "/" },
  { label: "Recherche", icon: Search, href: "/search" },
  { label: "Créer", icon: Plus, href: "/create" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "Messages", icon: MessageCircle, href: "/messages" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        fixed top-0 left-0
        h-screen w-16
        bg-white
        border-r border-gray-200
        flex flex-col items-center
        py-4
        z-40
      "
    >
      {/* Logo */}
      <div className="mb-6">
        <span className="text-red-600 text-2xl font-bold">🍽️</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {items.map(({ label, icon: Icon, href }) => (
          <div key={label} className="relative group">
            <Link
              href={href}
              className="
                w-12 h-12
                flex items-center justify-center
                rounded-xl
                hover:bg-gray-100
                transition
              "
            >
              <Icon className="w-5 h-5 text-gray-800" />
            </Link>

            {/* Tooltip EXACT Pinterest */}
            <span
              className="
                absolute left-14 top-1/2 -translate-y-1/2
                bg-black text-white
                text-xs font-medium
                px-3 py-1
                rounded-md
                opacity-0 group-hover:opacity-100
                pointer-events-none
                transition
                whitespace-nowrap
                shadow-lg
              "
            >
              {label}
            </span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
