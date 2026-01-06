"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1532980469-53b5f9e2170c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1455850931201-9034293f0685?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1544333346-647a3d82c711?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=400",
];

const PHRASES = [
    { text: "une idée de dîner", color: "text-red-700" },
    { text: "une recette gourmande", color: "text-red-600" },
    { text: "un plat sain", color: "text-red-500" },
    { text: "un secret de cuisine", color: "text-red-800" },
];

export default function PinterestHero() {
    const [index, setIndex] = useState(0);
    const { scrollY } = useScroll();

    // Performance: Avoid useSpring if page feels slow, use simple transform
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 1.02]);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % PHRASES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Minimal columns for best performance
    const columns = [
        HERO_IMAGES.slice(0, 4),
        HERO_IMAGES.slice(4, 8),
        HERO_IMAGES.slice(8, 12),
        HERO_IMAGES.slice(12, 16),
        HERO_IMAGES.slice(16, 20)
    ];

    return (
        <div className="relative h-screen w-full overflow-hidden bg-white">
            <style jsx>{`
                @keyframes scroll {
                    from { transform: translateY(0); }
                    to { transform: translateY(-50%); }
                }
                .scroll-column {
                    animation: scroll linear infinite;
                    will-change: transform;
                }
            `}</style>

            {/* Background Grid - CSS Optimized */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0 flex justify-center gap-6 px-4 opacity-40 will-change-transform"
            >
                {columns.map((col, i) => (
                    <div
                        key={i}
                        className="scroll-column flex flex-col gap-6 w-48 md:w-56"
                        style={{
                            animationDuration: `${30 + (i % 3) * 10}s`,
                            animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                        }}
                    >
                        {[...col, ...col].map((img, imgIdx) => (
                            <div
                                key={imgIdx}
                                className="w-full aspect-[4/5] rounded-[2rem] bg-gray-50 overflow-hidden"
                            >
                                <img
                                    src={img}
                                    alt="Food"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/60 to-white"></div>

            {/* Center Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
            >
                <div className="h-20 md:h-28 mb-4 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className={`text-4xl md:text-6xl lg:text-7xl font-black ${PHRASES[index].color} leading-none tracking-tight pb-2`}
                        >
                            {PHRASES[index].text}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                <div className="flex gap-3 mt-4">
                    {PHRASES.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${i === index ? "bg-red-600 scale-125" : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Bottom Scroll Hint */}
            <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-20 animate-bounce"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-600 shadow-lg border border-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
