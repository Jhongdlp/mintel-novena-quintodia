"use client";

import { motion } from "framer-motion";
import { Music, Star, ArrowRight, Heart } from "lucide-react";
import { useContext, useEffect } from "react";
import { SlideshowContext } from "@/components/slides/Slideshow";

interface SlideProps {
  onNext?: () => void;
}

export default function FinalCarolSlide({ onNext }: SlideProps) {
  const { setControlTheme } = useContext(SlideshowContext);
  
  useEffect(() => {
    setControlTheme("light"); // Ensure controls are visible on dark background
    return () => setControlTheme("default");
  }, [setControlTheme]);

  const lyrics = [
    "Con mi burrito sabanero",
    "voy camino de Belén",
    "Con mi burrito sabanero",
    "voy camino de Belén",
    "",
    "Si me ven, si me ven",
    "voy camino de Belén",
    "Si me ven, si me ven",
    "voy camino de Belén",
    "",
    "El lucerito mañanero",
    "ilumina mi sendero",
    "El lucerito mañanero",
    "ilumina mi sendero",
    "",
    "Si me ven, si me ven...",
    "¡Tuqui Tuqui Tuqui Tuqui!",
    "¡Tuqui Tuqui Tuqui Ta!",
    "Apúrate mi burrito",
    "que ya vamos a llegar."
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fullscreen Fixed Gradient - Energetic Purple/Blue/Pink */}
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-800 animate-gradient-xy pointer-events-none" />
      
      {/* Confetti / Particle Effects */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed z-0 text-yellow-400 opacity-50"
          initial={{ y: "110vh", x: Math.random() * 100 + "vw", rotate: 0 }}
          animate={{ y: "-10vh", rotate: 360 }}
          transition={{ 
            duration: Math.random() * 4 + 3, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 2 
          }}
        >
           {i % 2 === 0 ? <Star className="w-8 h-8" /> : <Music className="w-6 h-6" />}
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="flex items-center gap-4 mb-6 md:mb-10"
        >
          <span className="text-6xl md:text-8xl">🫏</span>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
            ¡Burrito Sabanero!
          </h2>
          <span className="text-6xl md:text-8xl">🎶</span>
        </motion.div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl relative w-full mb-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
           {lyrics.map((line, index) => (
             <motion.p
               key={index}
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: index * 0.05 }}
               className={`text-xl md:text-4xl font-bold tracking-wider mb-2 ${
                 line.includes("Tuqui") ? "text-yellow-300 scale-110 !my-4" : "text-white"
               } ${line === "" ? "h-6" : ""}`}
             >
               {line}
             </motion.p>
           ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="mt-8 px-4"
        >
          <button 
             onClick={onNext}
             className="px-10 py-3 bg-white text-purple-900 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors shadow-xl flex items-center gap-2 transform hover:scale-105 active:scale-95 duration-200"
          >
             Finalizar <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
