"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        avatar: File | null;
    }>({
        email: "",
        password: "",
        username: "",
        fullName: "",
        avatar: null
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setForm({ ...form, avatar: file });
            setAvatarPreview(URL.createObjectURL(file));
        }
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
                const formData = new FormData();
                const userBlob = new Blob([JSON.stringify({
                    email: form.email,
                    password: form.password,
                    username: form.username,
                    fullName: form.fullName
                })], { type: 'application/json' });

                formData.append("user", userBlob);
                if (form.avatar) {
                    formData.append("avatar", form.avatar);
                }

                res = await fetch(`http://localhost:8080${endpoint}`, {
                    method: "POST",
                    body: formData,
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

            {/* Modal Container - Flexible height, takes more vertical space */}
            <div className="relative w-full max-w-[484px] h-full md:h-auto max-h-[100vh] md:max-h-[92vh] z-10 flex flex-col items-center overflow-y-auto no-scrollbar">

                {/* Close Button - Responsive positioning */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:-top-2 md:-right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-30 border border-gray-100"
                >
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="bg-white w-full min-h-full md:min-h-0 rounded-none md:rounded-[32px] overflow-hidden pt-12 pb-16 px-8 md:px-14 flex flex-col items-center shadow-[0_20px_70px_-15px_rgba(0,0,0,0.4)]"
                >
                    {/* Brand Logo */}
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-100">
                        <span className="text-white text-2xl font-black">🍳</span>
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
                        {/* Email Field */}
                        <div className="space-y-2 text-left">
                            <label className="text-sm font-semibold text-gray-800 ml-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full h-[52px] px-5 bg-white border border-[#cdcdcd] rounded-[16px] text-lg focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2 text-left">
                            <label className="text-sm font-semibold text-gray-800 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder={mode === "login" ? "Password" : "Create a password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full h-[52px] px-5 pr-12 bg-white border border-[#cdcdcd] rounded-[16px] text-lg focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
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
                            <p className="text-xs text-gray-400 mt-2 ml-1">Use 8 or more letters, numbers and symbols</p>
                        </div>

                        {mode === "register" && (
                            <>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-semibold text-gray-800 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        className="w-full h-[52px] px-5 bg-white border border-[#cdcdcd] rounded-[16px] text-lg focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-semibold text-gray-800 ml-1">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={form.username}
                                        onChange={handleChange}
                                        className="w-full h-[52px] px-5 bg-white border border-[#cdcdcd] rounded-[16px] text-lg focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                <div className="space-y-4 text-center py-4 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                    <label className="text-sm font-bold text-gray-700 block">Avatar Profile</label>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-24 h-24 rounded-full bg-white shadow-inner flex items-center justify-center overflow-hidden border-2 border-white ring-4 ring-gray-100">
                                            {avatarPreview ? (
                                                <img src={avatarPreview} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <span className="text-4xl text-gray-300">👤</span>
                                            )}
                                        </div>
                                        <label className="cursor-pointer bg-white text-gray-700 font-bold py-2 px-6 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-100">
                                            Choose Photo
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
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

                    <div className="w-full flex flex-col items-center mt-8">
                        <div className="text-sm font-bold text-gray-900 mb-8">OR</div>

                        {/* Google Login Button */}
                        <div className="w-full h-[48px] px-5 flex items-center justify-between border border-[#cdcdcd] rounded-full hover:bg-gray-50 cursor-pointer transition-colors mb-6 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-bold">I</div>
                            <div className="text-[14px] font-bold text-gray-900 flex-1 ml-4 truncate">Continue as Imad eddine</div>
                            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.67l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </div>

                        <p className="max-w-[320px] text-center text-[11px] text-gray-500 leading-normal mb-8 px-2">
                            By continuing, you agree to CookShare's <span className="font-bold underline cursor-pointer">Terms of Service</span> and acknowledge you've read our <span className="font-bold underline cursor-pointer">Privacy Policy</span>. <span className="font-bold underline cursor-pointer">Notice at collection</span>.
                        </p>

                        <div className="text-[14px] font-bold text-gray-900 border-t border-gray-100 pt-8 w-full text-center">
                            {mode === "login" ? (
                                <>Not on CookShare yet? <button onClick={() => setMode("register")} className="text-red-600 hover:underline">Sign up</button></>
                            ) : (
                                <>Already a member? <button onClick={() => setMode("login")} className="text-red-600 hover:underline">Log in</button></>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Free Business Account Link */}
                <div className="mt-0 text-[13px] font-bold text-gray-900 bg-gray-100 w-full py-5 rounded-b-[32px] text-center cursor-pointer hover:bg-gray-200 transition-colors z-0 border-t border-gray-200">
                    Create a free business account
                </div>
            </div>
        </div>
    );
}
