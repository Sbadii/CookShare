import HeroBanner from "./components/HeroBanner";
import Header from "./components/Header";
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
      cache: "no-store"
    });
    if (!res.ok) {
      console.error("Failed to fetch posts:", res.status);
      return [];
    }
    const data = await res.json();
    console.log("✅ Posts fetched:", data.length, "posts");
    if (data.length > 0) {
      console.log("First post:", data[0]);
    }
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />
      <HeroBanner />

      {/* Transition Section - Séparation dynamique */}
      <div className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
         
        </div>
      </div>

      {/* Section des recettes - Pleine largeur */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* En-tête */}


          {/* Grille de recettes */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🍳</div>
              <p className="text-gray-500 text-xl">Aucune recette disponible pour le moment.</p>
              <p className="text-gray-400 mt-2">Revenez plus tard !</p>
            </div>
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {posts.map(post => (
                  <RecipeCard key={post.id} post={post} />
                ))}
              </div>

              {/* Message de nombre de recettes */}
              <div className="mt-10 text-center">
                <p className="text-gray-500 inline-block bg-white px-4 py-2 rounded-full shadow-sm">
                  {posts.length} recette{posts.length > 1 ? 's' : ''} disponible{posts.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}