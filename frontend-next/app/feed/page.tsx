import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";

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

async function getPosts(query: string = ""): Promise<Post[]> {
    try {
        const url = query
            ? `http://localhost:8080/posts?query=${encodeURIComponent(query)}`
            : "http://localhost:8080/posts";

        const res = await fetch(url, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

export default async function FeedPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) {
    const { query } = await searchParams;
    const posts = await getPosts(query);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="h-20 md:h-20"></div> {/* Spacer for fixed header */}

            <section className="w-full px-4 md:px-6 py-6 font-sans">
                {posts.length === 0 ? (
                    <div className="text-center py-32 text-gray-300">
                        <div className="text-6xl mb-4">🍳</div>
                        <p className="text-xs font-black uppercase tracking-widest">Aucune recette disponible</p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                        {posts.map((post) => (
                            <RecipeCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
