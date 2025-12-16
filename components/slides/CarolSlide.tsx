"use client";

import { motion } from "framer-motion";
import { Music, Star, Mic, ArrowRight } from "lucide-react";
import { useContext, useEffect } from "react";
import { SlideshowContext } from "@/components/slides/Slideshow";

interface SlideProps {
  onNext?: () => void;
}

export default function CarolSlide({ onNext }: SlideProps) {
  const { setControlTheme } = useContext(SlideshowContext);
  
  useEffect(() => {
    setControlTheme("light");
    return () => setControlTheme("default");
  }, [setControlTheme]);

  const lyrics = [
    "Tutaina tuturumá",
    "Tutaina tuturumaina",
    "Tutaina tuturumá, Turumá",
    "Tutaina tuturumaina.",
    "",
    "Los pastores de Belén",
    "Vienen a adorar al Niño",
    "La Virgen y San José",
    "Los reciben con cariño.",
    "",
    "Tutaina tuturumá...",
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-green-900 via-red-900 to-green-900 bg-[size:400%_400%] animate-gradient-xy pointer-events-none" />
      {/* Floating Notes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", x: Math.random() * 100 - 50 + "vw", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: 360 }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="fixed z-0 text-yellow-400"
        >
          <Music className={`w-${Math.random() > 0.5 ? 8 : 12} h-${Math.random() > 0.5 ? 8 : 12}`} />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10 w-full max-w-4xl px-4 flex flex-col items-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4 md:mb-8">
           <Star className="w-12 h-12 text-yellow-500 animate-spin-slow" />
           <h2 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
             Villancico
           </h2>
           <Star className="w-12 h-12 text-yellow-500 animate-spin-slow" />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl relative w-full mb-8">
          <div className="absolute top-4 right-4 animate-pulse">
            <Mic className="w-8 h-8 text-red-400" />
          </div>

          <div className="space-y-4 max-h-[40vh] md:max-h-[50vh] overflow-y-auto custom-scrollbar">
            {lyrics.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`text-xl md:text-3xl font-medium tracking-wide ${
                  line === "" ? "h-6" : "text-white drop-shadow-md"
                } ${index < 4 || index > 9 ? "font-bold text-yellow-300" : ""}`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.button 
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-yellow-500 text-red-900 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg flex items-center gap-2"
        >
          Siguiente: Oración Inicial <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
