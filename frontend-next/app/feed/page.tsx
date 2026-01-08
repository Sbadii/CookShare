"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import { useSearchParams } from "next/navigation";

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
    type?: string;
    diet?: string;
}

import { Suspense } from "react";

function FeedContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const url = query
                    ? `http://localhost:8080/posts?query=${encodeURIComponent(query)}`
                    : "http://localhost:8080/posts";

                const res = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    cache: "no-store",
                });
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [query]);

    return (
        <section className="w-full px-4 md:px-6 py-6 font-sans">
            {loading ? (
                <div className="flex justify-center items-center py-32">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-32 text-gray-300">
                    <div className="text-6xl mb-4">🍳</div>
                    <p className="text-xs font-black uppercase tracking-widest">Aucune recette disponible {query && `pour "${query}"`}</p>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {posts.map((post) => (
                        <RecipeCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default function FeedPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="h-20 md:h-20"></div> {/* Spacer for fixed header */}

            <Suspense fallback={
                <div className="flex justify-center items-center py-32">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }>
                <FeedContent />
            </Suspense>

            <Footer />
        </div>
    );
}
