import Link from "next/link";

interface RecipeCardProps {
  post: {
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
  };
}

export default function RecipeCard({ post }: RecipeCardProps) {
  const hasImage = post.imageUrl && post.imageUrl.trim() !== "";

  return (
    <Link href={`/post/${post.id}`} className="block break-inside-avoid mb-6">
      <div
        className="
        rounded-xl
        overflow-hidden
        bg-white
        shadow-sm
        hover:shadow-2xl
        transition-all
        duration-300
        group
        cursor-pointer
      "
      >
        {/* IMAGE */}
        <div className="relative w-full overflow-hidden bg-gray-100">
          {hasImage ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            />
          ) : (
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-600 text-white text-5xl">
              🍽️
            </div>
          )}

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>

          {/* Like */}
          <button
            className="
            absolute top-3 right-3
            bg-white/90 backdrop-blur
            rounded-full px-3 py-1 text-sm
            shadow
            opacity-0 group-hover:opacity-100
            transition
          "
          >
            ❤️ {post.likeCount}
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 leading-snug mb-2">
            {post.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{post.authorName}</span>
            <span>⏱ {post.cookingTime}</span>
          </div>

          {(post.theme || post.type || post.diet) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.theme && (
                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                  {post.theme}
                </span>
              )}
              {post.type && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {post.type}
                </span>
              )}
              {post.diet && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  {post.diet}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
