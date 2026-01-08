// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AuthGuard from "./components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CookShare",
  description: "Plateforme de recettes inspirée de Pinterest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50`}>
        {/* LAYOUT CONTAINER */}
        <div className="flex">

          {/* SIDEBAR */}


          {/* CONTENU */}
          <main className="flex-1 relative min-h-screen">
            <AuthGuard>
              {children}
            </AuthGuard>
          </main>

        </div>
      </body>
    </html>
  );
}
