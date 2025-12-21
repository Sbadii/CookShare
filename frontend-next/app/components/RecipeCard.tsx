"use client";

import { useEffect, useState } from "react";

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
  const imageSrc = post.imageUrl || "";

  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!imageSrc);

  // Placeholder color
  const getPlaceholderColor = (title: string) => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
      "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B739", "#52BE80"
    ];
    return colors[title.length % colors.length];
  };

  const placeholderColor = getPlaceholderColor(post.title);
useEffect(() => {
  if (imageSrc) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setImageLoading(false);
    img.onerror = () => {
      setImageError(true);
      setImageLoading(false);
    };
  }
}, [imageSrc]);

  return (
    <div className="break-inside-avoid mb-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">

      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">

        {/* ✅ Loader (disparaît correctement) */}
        {imageLoading && imageSrc && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20 pointer-events-none">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Placeholder */}
        {(imageError || !imageSrc) && (
          <div
            className="w-full h-full flex flex-col items-center justify-center text-white text-center p-4"
            style={{ backgroundColor: placeholderColor }}
          >
            <div className="text-5xl mb-3">🍳</div>
            <div className="text-sm font-semibold leading-tight px-2">
              {post.title.length > 30
                ? post.title.substring(0, 30) + "..."
                : post.title}
            </div>
          </div>
        )}

        {/* Image */}
        {imageSrc && !imageError && (
          <img
            src={imageSrc}
            alt={post.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
        )}

        {/* Like Button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
          <button className="bg-white rounded-full p-2 shadow-lg hover:bg-red-500 hover:text-white transition-colors">
            ❤️
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-green-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {post.description}
        </p>

        <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
          <span className="font-medium">{post.authorName}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            ❤️ {post.likeCount || 0}
            💬 {post.commentCount || 0}
          </div>
          <span className="text-sm">⏱ {post.cookingTime}</span>
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
  );
}
