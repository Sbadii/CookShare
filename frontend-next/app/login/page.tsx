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

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
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
      console.log("LOGIN RESPONSE:", data);

      // store token
      localStorage.setItem("token", data.token);

      router.push("/"); // redirect to homepage

    } catch (err) {
      setError("Erreur serveur");
    }
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl">CookShare</h1>
          <p className="text-white mt-1">Welcome back!</p>
        </div>
      </div>

      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white w-80" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Login</h1>

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <div className="border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="outline-none w-full"
            />
          </div>

          <div className="border-2 py-2 px-3 rounded-2xl mb-6">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="outline-none w-full"
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-indigo-600 text-white py-2 rounded-2xl font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
