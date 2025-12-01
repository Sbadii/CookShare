"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Erreur lors de l'inscription");
        return;
      }

      const data = await res.json();
      setSuccess("Compte créé avec succès !");
      console.log("REGISTER RESPONSE:", data);

    } catch (err) {
      setError("Erreur serveur");
    }
  };

  return (
    <div className="h-screen md:flex">
      {/* LEFT DESIGN */}
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl">CookShare</h1>
          <p className="text-white mt-1">Join the recipe community</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white w-80" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Register</h1>

          {error && <p className="text-red-600 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}

          <div className="border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              name="fullName"
              type="text"
              placeholder="Full name"
              onChange={handleChange}
              className="outline-none w-full"
            />
          </div>

          <div className="border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              className="outline-none w-full"
            />
          </div>

          <div className="border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="outline-none w-full"
            />
          </div>

          <div className="border-2 py-2 px-3 rounded-2xl mb-4">
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
