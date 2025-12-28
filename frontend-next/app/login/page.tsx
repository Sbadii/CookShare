// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Email ou mot de passe incorrect");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      setError("Erreur serveur");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Colonne gauche : image de fond + flèche de retour */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src="/background.jpg"
          alt="CookShare"
          className="object-cover w-full h-full"
        />
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* 🔙 Flèche de retour en gras sur l'image */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 z-10 text-white hover:text-gray-200 font-bold text-lg flex items-center"
          aria-label="Retour à l'accueil"
        >
          ← <span className="ml-1 hidden sm:inline">Accueil</span>
        </button>

        {/* Texte central */}
        <div className="absolute inset-0 flex items-end justify-center pb-16 px-8">
          <div className="text-center">
            <h1 className="text-white font-bold text-4xl md:text-5xl">CookShare</h1>
            <p className="text-white/90 mt-2 text-xl">Bienvenue de retour !</p>
          </div>
        </div>
      </div>

      {/* Colonne droite : formulaire */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 bg-white">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Se connecter</h1>
          <p className="text-gray-600 text-sm text-center mb-6">Connectez-vous à votre compte</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                ✉️
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                🔒
              </div>
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-green-600 font-medium hover:underline"
            >
              Inscrivez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}