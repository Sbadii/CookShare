"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecommendedCarousel from "../../components/RecommendedCarousel";
import CommentSection from "../../components/CommentSection";
import RecipeCard from "../../components/RecipeCard";
import { notFound } from "next/navigation";
import {
    Clock,
    Heart,
    User,
    ChefHat,
    Utensils,
    MessageCircle,
    Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, use } from "react";

interface Post {
    id: number;
    title: string;
    description: string;
    cookingTime: string;
    imageUrl: string;
    createdAt: string;
    authorName: string;
    likeCount: number;
    commentCount: number;
    theme?: string;
    diet?: string;
    tutorial?: string;
    ingredients?: string;
    comments?: {
        id: number;
        content: string;
        authorName: string;
        createdAt: string;
    }[];
}


export default function PostPage({
    params: paramsPromise,
}: {
    params: Promise<{ id: string }>;
}) {
    const params = use(paramsPromise);
    const [post, setPost] = useState<Post | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id;
                const token = localStorage.getItem("token");
                const postRes = await fetch(`http://localhost:8080/posts/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    cache: "no-store",
                });

                let postData: Post | null = null;
                if (postRes.ok) {
                    postData = await postRes.json();
                    setPost(postData);
                }

                const allRes = await fetch("http://localhost:8080/posts", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    cache: "no-store",
                });

                if (allRes.ok) {
                    const allData = await allRes.json();
                    if (postData) {
                        setRelatedPosts(allData.filter((p: Post) => p.id !== postData!.id));
                    } else {
                        setRelatedPosts(allData);
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) notFound();

    return (
        <div className="relative bg-[#e9e9e9] min-h-screen font-sans">
            <Header />

            {/* Pinterest-style Back/Nav spacing */}
            <div className="h-24"></div>

            <main className="flex flex-col items-center w-full px-4 pb-12">

                {/* --- Main Card --- */}
                <div className="bg-white rounded-[32px] shadow-[rgba(0,0,0,0.1)_0px_4px_12px] w-full max-w-[1016px] flex flex-col md:flex-row overflow-hidden mb-12">

                    {/* Left: Image Column */}
                    <div className="w-full md:w-1/2 relative bg-gray-100 min-h-[400px] md:min-h-[600px]">
                        {post.imageUrl ? (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                🍳
                            </div>
                        )}
                    </div>

                    {/* Right: Content Column (Scrollable) */}
                    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col gap-6 max-h-[85vh] overflow-y-auto custom-scrollbar bg-white">

                        {/* Top Actions Hook */}
                        <div className="flex justify-between items-center sticky top-0 bg-white z-20 pb-4">
                            <div className="flex gap-2">
                                <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                                    <Share2 className="w-5 h-5 text-gray-900" />
                                </button>
                                <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                                    </div>
                                </button>
                            </div>
                            {JSON.parse(localStorage.getItem("reposted_ids") || "[]").includes(post.id) ? (
                                <div className="bg-gray-100 text-gray-500 px-8 py-3 rounded-full font-black border border-gray-200 cursor-default">
                                    Déjà reposté
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        const reposted = JSON.parse(localStorage.getItem("reposted_ids") || "[]");
                                        localStorage.setItem("reposted_ids", JSON.stringify([...reposted, post.id]));
                                        // Trigger re-render to show updated state
                                        window.dispatchEvent(new Event('storage'));
                                        setPost({ ...post });
                                        alert("Recette repostée sur votre profil !");
                                    }}
                                    className="bg-[#e60023] text-white px-8 py-3 rounded-full font-black hover:bg-[#ad081b] transition-all active:scale-95 shadow-lg shadow-red-100"
                                >
                                    Reposter
                                </button>
                            )}
                        </div>

                        {/* Title & Meta */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                                {post.description && <p className="font-medium text-gray-600">{post.description}</p>}
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="font-bold text-gray-900">{post.cookingTime}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const liked = JSON.parse(localStorage.getItem("liked_ids") || "[]");
                                            let newLiked;
                                            let newLikeCount = post.likeCount;
                                            if (liked.includes(post.id)) {
                                                newLiked = liked.filter((id: number) => id !== post.id);
                                                newLikeCount--;
                                            } else {
                                                newLiked = [...liked, post.id];
                                                newLikeCount++;
                                            }
                                            localStorage.setItem("liked_ids", JSON.stringify(newLiked));
                                            setPost({ ...post, likeCount: newLikeCount });
                                        }}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all active:scale-90 ${JSON.parse(localStorage.getItem("liked_ids") || "[]").includes(post.id)
                                            ? "bg-red-50 text-red-600 shadow-sm"
                                            : "bg-gray-50 text-gray-400 hover:text-red-400"
                                            }`}
                                    >
                                        <Heart className={`w-4 h-4 ${JSON.parse(localStorage.getItem("liked_ids") || "[]").includes(post.id) ? "fill-red-600" : ""}`} />
                                        <span className="font-bold">{post.likeCount}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Author Section */}
                        <div className="flex items-center gap-3 py-6 border-b border-gray-100">
                            <div className="w-14 h-14 bg-[#FCD9BD] rounded-full flex items-center justify-center text-xl font-bold text-gray-700 shrink-0 shadow-inner overflow-hidden">
                                {typeof window !== "undefined" && post.authorName === localStorage.getItem("username") && localStorage.getItem("profileImage") ? (
                                    <img src={localStorage.getItem("profileImage")!} alt="Author" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-7 h-7" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <p className="font-black text-gray-900 text-base hover:underline cursor-pointer">
                                    {post.authorName}
                                </p>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                    Chef CookShare
                                </p>
                            </div>
                            {/* Follow Button Logic */}
                            {post.authorName !== localStorage.getItem("username") && (
                                <>
                                    {JSON.parse(localStorage.getItem("following") || "[]").includes(post.authorName) ? (
                                        <div className="flex items-center gap-2 bg-gray-100 px-6 py-2.5 rounded-full text-gray-600 font-black text-sm border border-gray-200">
                                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Suivi
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                const storedFollowing = JSON.parse(localStorage.getItem("following") || "[]");
                                                localStorage.setItem("following", JSON.stringify([...storedFollowing, post.authorName]));
                                                setPost({ ...post });
                                            }}
                                            className="px-8 py-2.5 rounded-full font-black text-sm transition-all active:scale-95 bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-100"
                                        >
                                            Suivre
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Ingredients */}
                        <div className="py-2">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Utensils className="w-5 h-5" />
                                Ingrédients
                            </h2>
                            <div className="space-y-3">
                                {post.ingredients?.split('\n').filter(Boolean).map((ing, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                                        <p className="text-gray-900 leading-snug">{ing}</p>
                                    </div>
                                )) || <p className="text-gray-400 text-sm">Aucun ingrédient listé.</p>}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="py-2">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <ChefHat className="w-5 h-5" />
                                Préparation
                            </h2>
                            <div className="prose prose-sm max-w-none text-gray-900 whitespace-pre-line leading-relaxed">
                                {post.tutorial || "Aucune instruction."}
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="pt-6 mt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Commentaires</h2>
                                <span className="text-gray-500 font-semibold">{post.commentCount}</span>
                                <div className="ml-auto cursor-pointer">
                                    <MessageCircle className="w-6 h-6 text-gray-900" />
                                </div>
                            </div>
                            <CommentSection postId={post.id} comments={post.comments || []} />
                        </div>

                    </div>
                </div>

                {/* More Like This */}
                {relatedPosts.length > 0 && (
                    <div className="w-full max-w-[1400px] mt-8">
                        <h3 className="text-center text-xl font-bold text-gray-900 mb-6">Plus de contenus similaires</h3>
                        <RecommendedCarousel posts={relatedPosts} />
                    </div>
                )}

            </main>
        </div>
    );
}
