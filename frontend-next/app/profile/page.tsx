"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "../components/RecipeCard";

import { useRouter } from "next/navigation";
import CreatePostModal from "../components/CreatePostModal";
import { Trash2, Plus } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"infos" | "my-posts" | "reposts" | "liked" | "followers">("infos");
    const [user, setUser] = useState({
        username: "",
        email: "",
        fullName: "",
        initial: ""
    });

    // Individual field editing states
    const [editingField, setEditingField] = useState<string | null>(null);

    const [passwords, setPasswords] = useState({
        old: "",
        new: ""
    });
    const [following, setFollowing] = useState<string[]>([]);
    const [myPosts, setMyPosts] = useState<any[]>([]);
    const [reposts, setReposts] = useState<any[]>([]);
    const [likedPosts, setLikedPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const loadUserData = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/");
                return;
            }

            const storedUsername = localStorage.getItem("username") || "";
            const storedEmail = localStorage.getItem("email") || "";
            const storedFullName = localStorage.getItem("fullName") || "";
            const storedFollowing = JSON.parse(localStorage.getItem("following") || "[]");

            setUser({
                username: storedUsername,
                email: storedEmail,
                fullName: storedFullName,
                initial: storedUsername ? storedUsername.charAt(0).toUpperCase() : "U"
            });
            setFollowing(storedFollowing);
        };

        if (typeof window !== "undefined") {
            loadUserData();

            const token = localStorage.getItem("token");
            const currentUsername = localStorage.getItem("username");
            const repostedIds = JSON.parse(localStorage.getItem("reposted_ids") || "[]");
            const likedIds = JSON.parse(localStorage.getItem("liked_ids") || "[]");

            fetch("http://localhost:8080/posts", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // Mes Posts
                    const filteredMyPosts = data.filter((p: any) => p.authorName === currentUsername);
                    setMyPosts(filteredMyPosts);

                    // Repostes
                    const filteredReposts = data.filter((p: any) => repostedIds.includes(p.id));
                    setReposts(filteredReposts);

                    // Posts aimés
                    const filteredLiked = data.filter((p: any) => likedIds.includes(p.id));
                    setLikedPosts(filteredLiked);

                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }
    }, [router]);

    const handleUpdateField = (field: string) => {
        if (field === "fullName") localStorage.setItem("fullName", user.fullName);
        if (field === "username") localStorage.setItem("username", user.username);
        if (field === "email") localStorage.setItem("email", user.email);

        setEditingField(null);
        alert("Champ mis à jour avec succès !");
    };

    const handleChangePassword = () => {
        if (!passwords.old || !passwords.new) {
            alert("Veuillez remplir les deux champs de mot de passe.");
            return;
        }
        if (passwords.new.length < 8) {
            alert("Le nouveau mot de passe doit contenir au moins 8 caractères.");
            return;
        }
        // Logic for backend password update would go here
        alert("Demande de changement de mot de passe enregistrée (simulation).");
        setPasswords({ old: "", new: "" });
        setEditingField(null);
    };

    const handleUnfollow = (username: string) => {
        const newFollowing = following.filter(u => u !== username);
        setFollowing(newFollowing);
        localStorage.setItem("following", JSON.stringify(newFollowing));
    };

    const handleRemoveRepost = (postId: number) => {
        const repostedIds = JSON.parse(localStorage.getItem("reposted_ids") || "[]");
        const newIds = repostedIds.filter((id: number) => id !== postId);
        localStorage.setItem("reposted_ids", JSON.stringify(newIds));
        setReposts(reposts.filter(p => p.id !== postId));
    };

    const handleDeleteMyPost = async (postId: number) => {
        if (!confirm("Voulez-vous vraiment supprimer cette recette ?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                setMyPosts(myPosts.filter(p => p.id !== postId));
                alert("Recette supprimée avec succès !");
            } else {
                alert("Erreur lors de la suppression.");
            }
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue.");
        }
    };

    const tabs = [
        { id: "infos", label: "Mes infos" },
        { id: "my-posts", label: "Mes posts" },
        { id: "reposts", label: "Repostes" },
        { id: "liked", label: "Posts aimés" },
        { id: "followers", label: "Abonnements" }
    ];



    return (
        <div className="bg-white min-h-screen font-sans">
            <Header />
            <div className="h-20 md:h-24"></div>

            <main className="max-w-[1400px] mx-auto px-4 md:px-12 py-8">
                {/* Profile Header section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                            Vos idées enregistrées
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#FCD9BD] rounded-full flex items-center justify-center text-3xl font-black text-gray-900 shadow-sm border-4 border-white">
                                {user.initial}
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-bold text-gray-900">{user.fullName || user.username}</h2>
                                <p className="text-gray-500 font-medium text-sm">{following.length} abonnement(s)</p>
                            </div>
                        </div>
                        <button className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-full transition-all text-sm active:scale-95">
                            Partager le profil
                        </button>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-col mb-10">
                    <div className="flex items-center justify-center space-x-12 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`relative py-2 text-base font-bold transition-colors ${activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>



                {/* Tab Content Display */}
                <div className="min-h-[500px] w-full flex flex-col items-center pb-20">
                    <AnimatePresence mode="wait">
                        {activeTab === "infos" && (
                            <motion.div
                                key="infos"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="max-w-[850px] w-full px-4"
                            >
                                <div className="bg-white p-8 md:p-14 rounded-[40px] border border-gray-100 shadow-2xl">
                                    <div className="flex justify-between items-center mb-12">
                                        <h3 className="text-4xl font-black text-gray-900 leading-tight">Paramètres du profil</h3>
                                    </div>

                                    <div className="space-y-12">
                                        {/* Avatar Section */}
                                        <div className="flex flex-col gap-6">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Photo de profil</label>
                                            <div className="flex items-center gap-10">
                                                <div className="w-28 h-28 bg-[#FCD9BD] rounded-full flex items-center justify-center text-5xl font-black text-gray-900 shadow-inner">
                                                    {user.initial}
                                                </div>
                                                <button className="px-7 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-black rounded-full transition-all active:scale-95 text-base">
                                                    Changer la photo
                                                </button>
                                            </div>
                                        </div>

                                        {/* Inputs Section */}
                                        <div className="flex flex-col gap-12">
                                            {/* Full Name Field */}
                                            <div className="flex flex-col gap-4">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-base font-bold text-gray-800 ml-1">Nom complet</label>
                                                    {editingField !== "fullName" && (
                                                        <button
                                                            onClick={() => setEditingField("fullName")}
                                                            className="text-sm font-black text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-full transition-all active:scale-95"
                                                        >
                                                            Modifier
                                                        </button>
                                                    )}
                                                </div>
                                                {editingField === "fullName" ? (
                                                    <div className="flex flex-col gap-4">
                                                        <input
                                                            type="text"
                                                            value={user.fullName}
                                                            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                                            className="w-full px-6 py-5 bg-white border-2 border-red-400 rounded-[24px] text-xl font-bold text-gray-900 outline-none shadow-md"
                                                            placeholder="Votre nom complet"
                                                            autoFocus
                                                        />
                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={() => handleUpdateField("fullName")}
                                                                className="px-6 py-3 bg-red-600 text-white font-black rounded-full hover:bg-red-700 transition-all text-sm shadow-lg"
                                                            >
                                                                Confirmer
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingField(null)}
                                                                className="px-6 py-3 bg-gray-100 text-gray-900 font-black rounded-full hover:bg-gray-200 transition-all text-sm"
                                                            >
                                                                Annuler
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="px-6 py-5 bg-gray-50 rounded-[24px] text-xl font-bold text-gray-700 border border-gray-100 shadow-inner">
                                                        {user.fullName || "—"}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Username Field */}
                                            <div className="flex flex-col gap-4">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-base font-bold text-gray-800 ml-1">Nom d'utilisateur</label>
                                                    {editingField !== "username" && (
                                                        <button
                                                            onClick={() => setEditingField("username")}
                                                            className="text-sm font-black text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-full transition-all active:scale-95"
                                                        >
                                                            Modifier
                                                        </button>
                                                    )}
                                                </div>
                                                {editingField === "username" ? (
                                                    <div className="flex flex-col gap-4">
                                                        <div className="relative group">
                                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl z-10">@</span>
                                                            <input
                                                                type="text"
                                                                value={user.username}
                                                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                                                className="w-full pl-12 pr-6 py-5 bg-white border-2 border-red-400 rounded-[24px] text-xl font-bold text-gray-900 outline-none shadow-md"
                                                                placeholder="username"
                                                                autoFocus
                                                            />
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={() => handleUpdateField("username")}
                                                                className="px-6 py-3 bg-red-600 text-white font-black rounded-full hover:bg-red-700 transition-all text-sm shadow-lg"
                                                            >
                                                                Confirmer
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingField(null)}
                                                                className="px-6 py-3 bg-gray-100 text-gray-900 font-black rounded-full hover:bg-gray-200 transition-all text-sm"
                                                            >
                                                                Annuler
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="px-6 py-5 bg-gray-50 rounded-[24px] text-xl font-bold text-gray-700 border border-gray-100 shadow-inner">
                                                        @{user.username}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Email Field */}
                                            <div className="flex flex-col gap-4">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-base font-bold text-gray-800 ml-1">Adresse e-mail</label>
                                                    {editingField !== "email" && (
                                                        <button
                                                            onClick={() => setEditingField("email")}
                                                            className="text-sm font-black text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-full transition-all active:scale-95"
                                                        >
                                                            Modifier
                                                        </button>
                                                    )}
                                                </div>
                                                {editingField === "email" ? (
                                                    <div className="flex flex-col gap-4">
                                                        <input
                                                            type="email"
                                                            value={user.email}
                                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                            className="w-full px-6 py-5 bg-white border-2 border-red-400 rounded-[24px] text-xl font-bold text-gray-900 outline-none shadow-md"
                                                            placeholder="votre@email.com"
                                                            autoFocus
                                                        />
                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={() => handleUpdateField("email")}
                                                                className="px-6 py-3 bg-red-600 text-white font-black rounded-full hover:bg-red-700 transition-all text-sm shadow-lg"
                                                            >
                                                                Confirmer
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingField(null)}
                                                                className="px-6 py-3 bg-gray-100 text-gray-900 font-black rounded-full hover:bg-gray-200 transition-all text-sm"
                                                            >
                                                                Annuler
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="px-6 py-5 bg-gray-50 rounded-[24px] text-xl font-bold text-gray-700 border border-gray-100 shadow-inner">
                                                        {user.email}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Password Section */}
                                            <div className="pt-16 border-t-2 border-dashed border-gray-100">
                                                <div className="flex justify-between items-center mb-8">
                                                    <h4 className="text-2xl font-black text-gray-900">Mot de passe</h4>
                                                    {editingField !== "password" && (
                                                        <button
                                                            onClick={() => setEditingField("password")}
                                                            className="text-sm font-black text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-full transition-all active:scale-95"
                                                        >
                                                            Modifier
                                                        </button>
                                                    )}
                                                </div>

                                                {editingField === "password" ? (
                                                    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                                        <div className="flex flex-col gap-4">
                                                            <label className="text-base font-bold text-gray-600 ml-1">Ancien mot de passe</label>
                                                            <input
                                                                type="password"
                                                                value={passwords.old}
                                                                onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                                                                className="w-full px-6 py-5 bg-white border-2 border-red-400 rounded-[24px] text-xl font-bold text-gray-900 outline-none shadow-md"
                                                                placeholder="••••••••"
                                                                autoFocus
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-4">
                                                            <label className="text-base font-bold text-gray-600 ml-1">Nouveau mot de passe</label>
                                                            <input
                                                                type="password"
                                                                value={passwords.new}
                                                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                                                className="w-full px-6 py-5 bg-white border-2 border-red-400 rounded-[24px] text-xl font-bold text-gray-900 outline-none shadow-md"
                                                                placeholder="••••••••"
                                                            />
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <button
                                                                onClick={handleChangePassword}
                                                                className="px-10 py-5 bg-gray-900 text-white font-black rounded-full hover:bg-black transition-all active:scale-95 text-base shadow-lg"
                                                            >
                                                                Confirmer le changement
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingField(null);
                                                                    setPasswords({ old: "", new: "" });
                                                                }}
                                                                className="px-10 py-5 bg-gray-100 text-gray-900 font-black rounded-full hover:bg-gray-200 transition-all active:scale-95 text-base shadow-lg"
                                                            >
                                                                Annuler
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="px-6 py-5 bg-gray-50 rounded-[24px] text-xl font-bold text-gray-400 border border-gray-100 shadow-inner italic">
                                                        ••••••••••••••••
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "my-posts" && (
                            <motion.div
                                key="my-posts"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <div className="flex justify-center py-20">
                                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                                    </div>
                                ) : myPosts.length > 0 || true ? ( // Show create button always
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                                        {myPosts.map((p) => (
                                            <div key={p.id} className="flex flex-col gap-3 group">
                                                <div className="flex-1">
                                                    <RecipeCard post={p} />
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteMyPost(p.id);
                                                    }}
                                                    className="w-full py-3 px-4 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-gray-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Supprimer le post
                                                </button>
                                            </div>
                                        ))}
                                        <div
                                            onClick={() => setShowCreateModal(true)}
                                            className="group cursor-pointer flex flex-col gap-3"
                                        >
                                            <div className="h-[280px] rounded-[32px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group-hover:bg-gray-100 group-hover:border-red-200 transition-all gap-4">
                                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-red-500 group-hover:scale-110 transition-transform">
                                                    <Plus className="w-8 h-8" strokeWidth={3} />
                                                </div>
                                                <span className="text-gray-400 font-black uppercase tracking-widest text-xs">Créer une recette</span>
                                            </div>
                                            <div className="h-[46px]"></div> {/* Spacer to match trash button */}
                                        </div>
                                    </div>
                                ) : null}
                            </motion.div>
                        )}

                        {activeTab === "reposts" && (
                            <motion.div
                                key="reposts"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <div className="flex justify-center py-20">
                                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                                    </div>
                                ) : reposts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                                        {reposts.map((p) => (
                                            <div key={p.id} className="flex flex-col gap-3 group">
                                                <div className="flex-1 overflow-hidden">
                                                    <RecipeCard post={p} />
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveRepost(p.id);
                                                    }}
                                                    className="w-full py-3 px-4 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-gray-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Supprimer le reposte
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-24 bg-gray-50 rounded-[40px] w-full">
                                        <div className="text-6xl mb-6">📸</div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-2">Vous n'avez pas encore de repostes</h3>
                                        <p className="text-gray-500 font-medium mb-8">Les recettes que vous sauvegardez apparaîtront ici.</p>
                                        <button
                                            onClick={() => router.push("/")}
                                            className="px-10 py-4 bg-red-600 text-white font-black rounded-full hover:bg-red-700 transition-all shadow-xl shadow-red-100"
                                        >
                                            Trouver de l'inspiration
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === "liked" && (
                            <motion.div
                                key="liked"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <div className="flex justify-center py-20">
                                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                                    </div>
                                ) : likedPosts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                                        {likedPosts.map((p) => (
                                            <div key={p.id} className="flex flex-col h-[400px]">
                                                <div className="flex-1 overflow-hidden">
                                                    <RecipeCard post={p} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-24 bg-gray-50 rounded-[40px] w-full">
                                        <div className="text-6xl mb-6">❤️</div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-2">Vous n'avez pas encore aimé de posts</h3>
                                        <p className="text-gray-500 font-medium mb-8">Les recettes que vous aimez apparaîtront ici.</p>
                                        <button
                                            onClick={() => router.push("/")}
                                            className="px-10 py-4 bg-red-600 text-white font-black rounded-full hover:bg-red-700 transition-all shadow-xl shadow-red-100"
                                        >
                                            Découvrir des posts
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === "followers" && (
                            <motion.div
                                key="followers"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full"
                            >
                                {following.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {following.map((username) => (
                                            <div key={username} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-[#FCD9BD] rounded-full flex items-center justify-center text-xl font-black text-gray-900 shadow-inner">
                                                        {username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-gray-900">@{username}</h4>
                                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Abonné</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleUnfollow(username)}
                                                    className="px-6 py-2.5 bg-gray-100 text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95 text-sm"
                                                >
                                                    Abonné
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="max-w-2xl mx-auto text-center py-20">
                                        <div className="w-32 h-32 bg-[#FCD9BD] rounded-full flex items-center justify-center text-5xl mx-auto mb-10 shadow-lg shadow-orange-100">
                                            {user.initial}
                                        </div>
                                        <h3 className="text-4xl font-black text-gray-900 mb-4">Vous n'avez pas encore d'abonnés</h3>
                                        <p className="text-gray-500 text-lg font-medium mb-10 max-w-lg mx-auto leading-relaxed">
                                            Partagez vos meilleures recettes pour attirer des gourmets et des passionnés de cuisine dans votre communauté.
                                        </p>
                                        <div className="flex justify-center gap-4">
                                            <button className="px-8 py-4 bg-[#e60023] text-white font-black rounded-full hover:bg-[#ad081b] transition-all shadow-xl shadow-red-100 active:scale-95">
                                                Partager mon profil
                                            </button>
                                            <button className="px-8 py-4 bg-gray-100 text-gray-900 font-black rounded-full hover:bg-gray-200 transition-all active:scale-95">
                                                Trouver des amis
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Create Post Modal */}
            {showCreateModal && (
                <CreatePostModal
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={() => {
                        setShowCreateModal(false);
                        window.location.reload();
                    }}
                />
            )}

            <Footer />
        </div>
    );
}
