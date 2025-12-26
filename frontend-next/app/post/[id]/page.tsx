import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecommendedCarousel from "../../components/RecommendedCarousel";
import CommentSection from "../../components/CommentSection";
import { notFound } from "next/navigation";
import { Clock, Heart, User, Calendar, ChefHat, Utensils } from "lucide-react";

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
    tutorial?: string;
    ingredients?: string;
    comments?: {
        id: number;
        content: string;
        authorName: string;
        createdAt: string;
    }[];
}

async function getPost(id: string): Promise<Post | null> {
    try {
        const res = await fetch(`http://localhost:8080/posts/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch("http://localhost:8080/posts", {
            cache: "no-store",
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const post = await getPost(id);
    const allPosts = await getPosts();

    if (!post) {
        notFound();
    }

    // Filter out current post from related
    const relatedPosts = allPosts.filter((p) => p.id !== post.id);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <Header />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* --- Top Section: Split Layout (Image Left / Info Right) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">

                    {/* Left: Hero Image */}
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 group">
                        {post.imageUrl ? (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-9xl">
                                🍳
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Right: Info Panel */}
                    <div className="flex flex-col space-y-8 py-4 px-2">

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 animate-fade-in">
                            {post.theme && (
                                <span className="px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-bold rounded-full border border-purple-200">
                                    {post.theme}
                                </span>
                            )}
                            {post.type && (
                                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-full border border-blue-200">
                                    {post.type}
                                </span>
                            )}
                            {post.diet && (
                                <span className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full border border-green-200">
                                    {post.diet}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                            {post.title}
                        </h1>

                        {/* Author & Date */}
                        <div className="flex items-center gap-6 text-gray-600 border-b border-gray-200 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm">
                                    <User className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Auteur</p>
                                    <p className="font-bold text-gray-900">{post.authorName}</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Publié le</p>
                                    <p className="font-medium text-gray-900">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl text-orange-600 shadow-sm">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-orange-600/80 font-medium">Temps de préparation</p>
                                    <p className="text-xl font-bold text-gray-900">{post.cookingTime}</p>
                                </div>
                            </div>
                            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl text-rose-600 shadow-sm">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-rose-600/80 font-medium">Appréciations</p>
                                    <p className="text-xl font-bold text-gray-900">{post.likeCount} J'aime</p>
                                </div>
                            </div>
                        </div>

                        {/* Description Snippet */}
                        <div className="prose prose-gray text-gray-600 leading-relaxed text-lg">
                            {post.description}
                        </div>

                    </div>
                </div>

                {/* --- Content Section: Tutorial Stacked on Ingredients --- */}
                <div className="flex flex-col gap-12 mb-24">

                    {/* Top: Steps / Tutorial */}
                    <div className="w-full">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-blue-50/50 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <ChefHat className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Instructions de Préparation
                                </h2>
                            </div>

                            {post.tutorial ? (
                                <article className="prose prose-lg prose-blue max-w-none text-gray-700 whitespace-pre-line leading-8">
                                    {post.tutorial}
                                </article>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                    <ChefHat className="w-16 h-16 text-gray-300 mb-4" />
                                    <p className="text-gray-500 text-lg font-medium">Aucun tutoriel disponible.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom: Ingredients */}
                    <div className="w-full">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Utensils className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Ingrédients</h3>
                            </div>

                            {post.ingredients ? (
                                <div className="flex flex-col gap-3">
                                    <div className="prose prose-orange text-gray-700 whitespace-pre-line leading-loose text-lg font-medium">
                                        {post.ingredients}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Aucun ingrédient listé pour cette recette.</p>
                            )}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="w-full" id="comments">
                        <CommentSection postId={post.id} comments={post.comments || []} />
                    </div>

                </div>

            </main>

            {/* --- Recommendations Section (Netflix Style - Full Width) --- */}
            {relatedPosts.length > 0 && (
                <section className="bg-gray-900 w-full py-16 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black opacity-50 pointer-events-none"></div>

                    <div className="relative pl-8 mb-8">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            Plus de recettes à explorer
                        </h2>
                        <p className="text-gray-400 mt-2">Basé sur vos préférences</p>
                    </div>

                    {/* Horizontal Scroll Component - Full Width Container */}
                    <div className="relative w-full">
                        <RecommendedCarousel posts={relatedPosts} />
                    </div>
                </section>
            )}


        </div>
    );
}

