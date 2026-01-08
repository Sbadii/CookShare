"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const infoSections = [
    {
        title: "Le goût de la découverte",
        description: "Explorez des milliers de recettes saines et gourmandes. Trouvez l'inspiration pour chaque moment de la journée.",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
        bg: "bg-white",
        textColor: "text-gray-900",
        btnColor: "bg-red-600 shadow-red-100"
    },
    {
        title: "Cuisinez à votre façon",
        description: "Enregistrez vos recettes préférées et organisez vos propres collections thématiques.",
        image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800",
        bg: "bg-gray-50",
        textColor: "text-gray-900",
        btnColor: "bg-gray-900 shadow-gray-100"
    },
    {
        title: "Partagez votre passion",
        description: "Rejoignez une communauté de passionnés. Partagez vos secrets et inspirez les autres avec vos créations.",
        image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&q=80&w=800",
        bg: "bg-white",
        textColor: "text-gray-900",
        btnColor: "bg-red-600 shadow-red-100"
    }
];

export default function LandingInfoSection() {
    return (
        <div className="w-full bg-white overflow-hidden">
            {infoSections.map((section, i) => (
                <section
                    key={i}
                    className={`min-h-[80vh] flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-center px-6 md:px-24 py-24 ${section.bg} relative`}
                >
                    {/* Text Content */}
                    <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 max-w-xl will-change-transform">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-red-600 font-bold tracking-widest uppercase text-xs mb-3"
                        >
                            Étape {i + 1}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`text-4xl md:text-6xl font-black mb-8 ${section.textColor} leading-tight tracking-tight`}
                        >
                            {section.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-md"
                        >
                            {section.description}
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = "/feed"}
                            className={`px-10 py-4 rounded-full text-white font-bold text-lg shadow-xl transition-all ${section.btnColor}`}
                        >
                            Explorer
                        </motion.button>
                    </div>

                    {/* Image Content */}
                    <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center z-10 relative will-change-transform">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full max-w-md aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white"
                        >
                            <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                        <div className="absolute -z-10 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </section>
            ))}

            {/* Newsletter Section - Refined with Image */}
            <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-24 py-24 bg-gray-50 relative overflow-hidden">
                <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 max-w-xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter"
                    >
                        Rejoignez <br /><span className="text-red-600">CookShare</span>
                    </motion.h2>
                    <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed">
                        Inscrivez-vous gratuitement et commencez à cuisiner vos plats préférés dès aujourd'hui.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.dispatchEvent(new CustomEvent("openAuth", { detail: { mode: "register" } }))}
                        className="px-14 py-5 bg-red-600 text-white rounded-full font-black text-2xl hover:bg-red-700 transition-all shadow-2xl shadow-red-200"
                    >
                        Créer un compte
                    </motion.button>
                </div>

                <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-lg aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white rotate-3 hover:rotate-0 transition-transform duration-500"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
                            alt="Join CookShare"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
