"use client";

import { useState } from "react";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to post.");
                setLoading(false);
                return;
            }

            console.log("📤 Sending post creation request...");
            console.log("Form data:", formData);
            console.log("Image file:", imageFile?.name);

            const body = new FormData();
            // Add the JSON part as a Blob
            body.append("post", new Blob([JSON.stringify(formData)], { type: "application/json" }));

            // Add the file if it exists
            if (imageFile) {
                body.append("image", imageFile);
            }

            const res = await fetch("http://localhost:8080/posts", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                    // Do NOT set Content-Type header manually for FormData, browser does it with boundary
                },
                body: body
            });

            console.log("📥 Response status:", res.status);

            if (!res.ok) {
                let errorMsg = "Failed to create post";
                try {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await res.json();
                        console.error("❌ Error response:", errorData);
                        errorMsg = errorData.error || errorData.message || errorMsg;
                    } else {
                        const text = await res.text();
                        console.error("❌ Error text:", text);
                        if (text) errorMsg = text;
                    }
                } catch (e) {
                    console.error("❌ Error parsing error response:", e);
                }
                throw new Error(`Error ${res.status}: ${errorMsg}`);
            }

            const responseData = await res.json();
            console.log("✅ Post created successfully:", responseData);

            onSuccess();
            onClose();
        } catch (err: any) {
            console.error("❌ Submission error details:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50">
                    <h2 className="text-2xl font-bold text-emerald-800">Create New Recipe</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="e.g. Grandma's Apple Pie"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                    <p className="text-xs text-gray-500">{imageFile ? imageFile.name : "SVG, PNG, JPG or GIF"}</p>
                                </div>
                                <input type="file" required className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Cooking Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time</label>
                            <input
                                type="text"
                                name="cookingTime"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-all"
                                placeholder="e.g. 45 mins"
                                value={formData.cookingTime}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                name="description"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-all"
                                placeholder="Short tasty description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                            <select name="theme" value={formData.theme} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                                {themes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                                {types.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Diet</label>
                            <select name="diet" value={formData.diet} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                                {diets.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                        <textarea
                            name="ingredients"
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-all"
                            placeholder="List your ingredients..."
                            value={formData.ingredients}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Tutorial */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Tutorial / Instructions</label>
                        <textarea
                            name="tutorial"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-all"
                            placeholder="Step by step guide..."
                            value={formData.tutorial}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/30"
                        >
                            {loading ? "Posting..." : "Share Recipe"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
