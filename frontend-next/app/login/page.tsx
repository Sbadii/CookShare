// app/login/page.tsx
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Colonne gauche : image de fond */}
      <div className="hidden md:block w-1/2 relative bg-black">
        <img
          src="/background.jpg"
          alt="CookShare"
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

        <button
          onClick={() => router.push("/")}
          className="absolute top-8 left-8 z-10 text-white hover:text-gray-200 font-bold text-lg flex items-center gap-2"
          aria-label="Retour à l'accueil"
        >
          ← <span className="hidden sm:inline">Accueil</span>
        </button>

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center px-6">
          <h1 className="text-white font-bold text-4xl md:text-5xl drop-shadow-md">
            CookShare
          </h1>
          <p className="text-white/90 mt-3 text-xl drop-shadow">
            Bienvenue de retour !
          </p>
        </div>
      </div>

      {/* Colonne droite : formulaire */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-6 sm:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Se connecter</h1>
            <p className="text-gray-600 text-sm mt-2">
              Connectez-vous à votre compte
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                ✉️
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition shadow-sm hover:shadow-md"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                🔒
              </div>
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition shadow-sm hover:shadow-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-green-600 font-medium hover:underline transition-colors"
            >
              Inscrivez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}