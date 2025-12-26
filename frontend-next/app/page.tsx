import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";
import RecipeCard from "./components/RecipeCard";

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

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("http://localhost:8080/posts", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    // ✅ WRAPPER VISUEL OBLIGATOIRE
    <div className="bg-gray-50 min-h-screen">

      <Header />
      <HeroBanner />

      {/* Pinterest-like Masonry */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-32 text-gray-400">
            <div className="text-6xl mb-4">🍳</div>
            <p className="text-xl">Aucune recette disponible</p>
          </div>
        ) : (
          <div
            className="
              columns-1
              sm:columns-2
              md:columns-3
              lg:columns-4
              xl:columns-5
              gap-6
            "
          >
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
