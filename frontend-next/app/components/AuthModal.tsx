"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AuthModalProps {
    initialMode?: "login" | "register";
    onClose: () => void;
}

export default function AuthModal({ initialMode = "login", onClose }: AuthModalProps) {
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "register">(initialMode);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState<{
        email: string;
        password: string;
        username: string;
        fullName: string;
    }>({
        email: "",
        password: "",
        username: "",
        fullName: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const endpoint = mode === "login" ? "/auth/login" : "/auth/register";

        try {
            let res;
            if (mode === "login") {
                res = await fetch(`http://localhost:8080${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: form.email, password: form.password }),
                });
            } else {
                res = await fetch(`http://localhost:8080${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: form.email,
                        password: form.password,
                        username: form.username,
                        fullName: form.fullName
                    }),
                });
            }

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.message || (mode === "login" ? "Email ou mot de passe incorrect" : "Erreur lors de l'inscription"));
                setIsLoading(false);
                return;
            }

            if (mode === "login") {
                const data = await res.json();
                const savedLiked = localStorage.getItem(`liked_ids_${data.username}`);
                const savedReposted = localStorage.getItem(`reposted_ids_${data.username}`);
                const savedFollowing = localStorage.getItem(`following_${data.username}`);

                if (savedLiked) localStorage.setItem("liked_ids", savedLiked);
                else localStorage.removeItem("liked_ids");

                if (savedReposted) localStorage.setItem("reposted_ids", savedReposted);
                else localStorage.removeItem("reposted_ids");

                if (savedFollowing) localStorage.setItem("following", savedFollowing);
                else localStorage.removeItem("following");
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);
                localStorage.setItem("fullName", data.fullName || data.username);
                onClose();
                router.refresh();
                window.location.reload();
            } else {
                setMode("login");
                setError("");
                setIsLoading(false);
            }
        } catch {
            setError("Erreur serveur");
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[600px] h-full md:h-auto max-h-[100vh] md:max-h-[85vh] z-10 flex flex-col items-center overflow-y-auto no-scrollbar">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-4 md:right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-30 border border-gray-100"
                >
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="bg-white w-full min-h-full md:min-h-0 rounded-none md:rounded-2xl overflow-hidden pt-12 pb-16 px-8 md:px-14 flex flex-col items-center shadow-[0_20px_70px_-15px_rgba(0,0,0,0.4)]"
                >
                    {/* Brand Logo */}
                    <div className="w-20 h-20 mb-6 flex items-center justify-center">
                        <Image
                            src="/logo8.png"
                            alt="CookShare Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                            priority
                        />
                    </div>

                    <h1 className="text-3xl md:text-[36px] font-bold text-gray-900 leading-tight mb-3 tracking-tight text-center">
                        Welcome to CookShare
                    </h1>

                    <p className="text-gray-500 mb-10 font-medium text-lg">
                        Find new ideas to try
                    </p>

                    {error && (
                        <div className="w-full mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        {mode === "register" ? (
                            <>
                                <div className="space-y-2 text-left">
                                    <label className="text-base font-bold text-gray-900 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        className="w-full h-[56px] px-5 bg-white border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-900 placeholder:text-gray-500 font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-base font-bold text-gray-900 ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full h-[56px] px-5 bg-white border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-900 placeholder:text-gray-500 font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-base font-bold text-gray-900 ml-1">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={form.username}
                                        onChange={handleChange}
                                        className="w-full h-[56px] px-5 bg-white border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-900 placeholder:text-gray-500 font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-base font-bold text-gray-900 ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Create a password"
                                            value={form.password}
                                            onChange={handleChange}
                                            className="w-full h-[56px] px-5 pr-12 bg-white border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-900 placeholder:text-gray-500 font-medium"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                                        >
                                            {showPassword ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.012-3.328M9.75 9.75L12 12m2.25 2.25L15 15m3.125-3.125a9.97 9.97 0 001.01-1.378c1.274-4.057 5.064-7 9.542-7 1.258 0 2.443.23 3.535.642m-1.414 1.414A10.05 10.05 0 0112 5c-1.247 0-2.43.226-3.52.64M3 3l18 18" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-2 text-left">
                                    <label className="text-base font-bold text-gray-900 ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full h-[56px] px-5 bg-white border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-900 placeholder:text-gray-500 font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-base font-bold text-gray-900 ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={form.password}
                                            onChange={handleChange}
                                            className="w-full h-[56px] px-5 pr-12 bg-white border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-gray-900 placeholder:text-gray-500 font-medium"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                                        >
                                            {showPassword ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.012-3.328M9.75 9.75L12 12m2.25 2.25L15 15m3.125-3.125a9.97 9.97 0 001.01-1.378c1.274-4.057 5.064-7 9.542-7 1.258 0 2.443.23 3.535.642m-1.414 1.414A10.05 10.05 0 0112 5c-1.247 0-2.43.226-3.52.64M3 3l18 18" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[56px] bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-lg rounded-full transition-all active:scale-[0.98] disabled:opacity-50 mt-8 shadow-lg shadow-red-100"
                        >
                            {isLoading ? "Loading..." : "Continue"}
                        </button>
                    </form>

                    <div className="text-[14px] font-bold text-gray-900 border-t border-gray-100 pt-8 w-full text-center">
                        {mode === "login" ? (
                            <>Not on CookShare yet? <button onClick={() => setMode("register")} className="text-red-600 hover:underline">Sign up</button></>
                        ) : (
                            <>Already a member? <button onClick={() => setMode("login")} className="text-red-600 hover:underline">Log in</button></>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
