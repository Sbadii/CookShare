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
    <Link href={`/post/${post.id}`} className="block break-inside-avoid mb-3">
      <div
        className="
        rounded-2xl
        overflow-hidden
        bg-white
        border border-gray-100
        hover:shadow-xl
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
              h-auto
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 text-4xl">
              🍳
            </div>
          )}

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>

          {/* Badges - Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
            {post.type && (
              <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm">
                {post.type}
              </span>
            )}
            {post.theme && (
              <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm">
                {post.theme}
              </span>
            )}
          </div>


        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-3">
          <h3 className="font-extrabold text-gray-900 text-lg leading-snug line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-gray-600 font-medium line-clamp-2 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between pt-2 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200 overflow-hidden shrink-0">
                {typeof window !== "undefined" && post.authorName === localStorage.getItem("username") && localStorage.getItem("profileImage") ? (
                  <img src={localStorage.getItem("profileImage")!} alt="Author" className="w-full h-full object-cover" />
                ) : (
                  <span>{post.authorName ? post.authorName.charAt(0).toUpperCase() : 'U'}</span>
                )}
              </div>
              <span className="text-xs font-bold text-gray-700 truncate max-w-[100px]">{post.authorName}</span>
            </div>
            <div className="bg-gray-50 px-2 py-1 rounded-md">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">⏱ {post.cookingTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
