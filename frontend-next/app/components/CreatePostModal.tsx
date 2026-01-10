"use client";

import { useState, useRef } from "react";

interface CreatePostModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

const themes = [
    'MOROCCAN', 'CHINESE', 'ITALIAN', 'JAPANESE', 'FRENCH', 'INDIAN',
    'MEDITERRANEAN', 'PASTRY', 'HEALTHY', 'AMERICAN', 'OTHER'
];

const types = [
    'BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'DESSERT', 'DRINK',
    'APPETIZER', 'SAUCE', 'OTHER'
];

const diets = [
    'VEGAN', 'VEGETARIAN', 'HIGH_PROTEIN', 'LOW_CARB', 'GLUTEN_FREE',
    'LACTOSE_FREE', 'KETO', 'DIABETIC_FRIENDLY', 'NONE'
];

export default function CreatePostModal({ onClose, onSuccess }: CreatePostModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tutorial: "",
        ingredients: "",
        cookingTime: "",
        theme: "OTHER",
        type: "OTHER",
        diet: "NONE"
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            setError("Please upload an image for your recipe.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to post.");
                setLoading(false);
                return;
            }

            const body = new FormData();
            body.append("post", new Blob([JSON.stringify(formData)], { type: "application/json" }));
            body.append("image", imageFile);

            const res = await fetch("http://localhost:8080/posts", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: body
            });

            if (!res.ok) {
                let errorMsg = "Failed to create post";
                try {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await res.json();
                        errorMsg = errorData.error || errorData.message || errorMsg;
                    } else {
                        const text = await res.text();
                        if (text) errorMsg = text;
                    }
                } catch (e) {
                    console.error("Error parsing error response", e);
                }
                throw new Error(errorMsg);
            }

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-[1020px] max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                {/* Header */}
                <div className="px-8 py-4 flex justify-between items-center border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Create Recipe</h2>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`px-10 py-4 rounded-full font-bold text-white text-lg transition-all ${loading ? 'bg-gray-300' : 'bg-[#E60023] hover:bg-[#ad001a] active:scale-95 shadow-md hover:shadow-lg'
                                }`}
                        >
                            {loading ? "Publishing..." : "Publish"}
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row h-full">
                        {/* Left Column: Image Upload */}
                        <div className="w-full md:w-[45%] p-8 bg-gray-50/50">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative group h-full min-h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${imagePreview ? 'border-transparent' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                    }`}
                            >
                                {imagePreview ? (
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full">Change Photo</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-300 transition-colors">
                                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 font-medium">Click to upload</p>
                                        <p className="text-gray-400 text-sm mt-2">Recommendation: Use high-quality .jpg files less than 20MB</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        {/* Right Column: Form Fields */}
                        <div className="flex-1 p-8 space-y-6">
                            {error && (
                                <div className="bg-red-50 text-[#E60023] p-4 rounded-xl text-sm font-medium border border-red-100 animate-shake">
                                    {error}
                                </div>
                            )}

                            {/* Title */}
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="Add your title"
                                    className="w-full text-3xl font-bold border-b-2 border-gray-300 focus:border-[#E60023] outline-none py-2 transition-colors placeholder:text-gray-400 text-gray-900"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-1">
                                <textarea
                                    name="description"
                                    placeholder="Tell everyone what your recipe is about"
                                    rows={2}
                                    className="w-full text-lg border-b border-gray-300 focus:border-[#E60023] outline-none py-2 transition-colors resize-none placeholder:text-gray-400 text-gray-800"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Meta Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Cooking Time</label>
                                    <input
                                        type="text"
                                        name="cookingTime"
                                        placeholder="e.g. 45 mins"
                                        className="w-full border-b border-gray-300 focus:border-[#E60023] outline-none py-1 transition-colors text-gray-900 placeholder:text-gray-400"
                                        value={formData.cookingTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Theme</label>
                                    <select
                                        name="theme"
                                        value={formData.theme}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 focus:border-[#E60023] outline-none py-1 bg-transparent transition-colors cursor-pointer text-gray-900"
                                    >
                                        {themes.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 focus:border-[#E60023] outline-none py-1 bg-transparent transition-colors cursor-pointer text-gray-900"
                                    >
                                        {types.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Diet</label>
                                    <select
                                        name="diet"
                                        value={formData.diet}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 focus:border-[#E60023] outline-none py-1 bg-transparent transition-colors cursor-pointer text-gray-900"
                                    >
                                        {diets.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Ingredients</label>
                                <textarea
                                    name="ingredients"
                                    placeholder="List your ingredients (one per line)..."
                                    rows={4}
                                    className="w-full p-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-[#E60023] focus:ring-0 outline-none transition-all placeholder:text-gray-500 text-gray-900 font-medium"
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Tutorial */}
                            <div className="space-y-2 pb-8">
                                <label className="text-sm font-semibold text-gray-700">Instructions</label>
                                <textarea
                                    name="tutorial"
                                    placeholder="Explain how to make it step by step..."
                                    rows={6}
                                    className="w-full p-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-[#E60023] focus:ring-0 outline-none transition-all placeholder:text-gray-500 text-gray-900 font-medium"
                                    value={formData.tutorial}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}</style>
        </div>
    );
}
