'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Heart } from 'lucide-react';
import Link from 'next/link';

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

export default function RecommendedCarousel({ posts }: { posts: Post[] }) {
    const scrollContainer = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const { current } = scrollContainer;
            const scrollAmount = 320; // Match item width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="relative group w-full">
            {/* Scroll Left Button */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-2xl -ml-6 border border-white/10"
                aria-label="Scroll left"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Carousel Container */}
            <div
                ref={scrollContainer}
                className="flex overflow-x-auto gap-5 py-4 px-2 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/post/${post.id}`}
                        className="min-w-[280px] max-w-[280px] h-[380px] flex-shrink-0 snap-center relative rounded-2xl overflow-hidden group/card hover:scale-[1.03] transition-transform duration-300 ease-out bg-gray-800 border border-white/10 shadow-lg"
                    >
                        {/* Image Layer */}
                        <div className="absolute inset-0 h-full w-full">
                            {post.imageUrl ? (
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl">
                                    🍳
                                </div>
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                        </div>

                        {/* Content Layer */}
                        <div className="absolute bottom-0 left-0 w-full p-5 text-white flex flex-col justify-end h-full">

                            <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                                <div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-100">
                                    {post.theme && <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md">{post.theme}</span>}
                                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-green-500/80 backdrop-blur-sm rounded-md flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {post.cookingTime}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold leading-tight mb-2 text-white/95 line-clamp-2 shadow-black drop-shadow-md">
                                    {post.title}
                                </h3>

                                <div className="flex items-center justify-between text-xs text-gray-300 mt-2">
                                    <span>{post.authorName}</span>
                                    <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> {post.likeCount}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Scroll Right Button */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-2xl -mr-6 border border-white/10"
                aria-label="Scroll right"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}
