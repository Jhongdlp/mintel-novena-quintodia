"use client";

import { motion } from "framer-motion";
import { Music, Bell, Mic, ArrowRight, Sparkles } from "lucide-react";
import { useContext, useEffect } from "react";
import { SlideshowContext } from "@/components/slides/Slideshow";

interface SlideProps {
  onNext?: () => void;
}

export default function SecondCarolSlide({ onNext }: SlideProps) {
  const { setControlTheme } = useContext(SlideshowContext);

  useEffect(() => {
    setControlTheme("light");
    return () => setControlTheme("default");
  }, [setControlTheme]);

  const lyrics = [
    "Campana sobre campana,",
    "y sobre campana una,",
    "asómate a la ventana,",
    "verás al Niño en la cuna.",
    "",
    "Belén, campanas de Belén,",
    "que los ángeles tocan",
    "¿qué nueva me traéis?",
    "",
    "Recogido tu rebaño",
    "¿a dónde vas pastorcito?",
    "Voy a llevar al portal",
    "requesón, manteca y vino.",
    "",
    "Belén, campanas de Belén...",
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative">
      {/* Fullscreen Fixed Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-tl from-yellow-700 via-red-800 to-yellow-900 bg-[size:400%_400%] animate-gradient-xy pointer-events-none" />
      
      {/* Background Animated Bells */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: Math.random() * 100 + "vw", opacity: 0, rotate: -20 }}
          animate={{ y: "100vh", opacity: [0, 0.4, 0], rotate: 20 }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="fixed z-0 text-yellow-500/20"
        >
          <Bell className={`w-${Math.random() > 0.5 ? 16 : 24} h-${Math.random() > 0.5 ? 16 : 24}`} />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 w-full max-w-4xl px-4 flex flex-col items-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4 md:mb-8">
           <Bell className="w-12 h-12 text-yellow-400 animate-bounce" />
           <h2 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
             Villancico
           </h2>
           <Bell className="w-12 h-12 text-yellow-400 animate-bounce delay-75" />
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative w-full mb-8">
          <Sparkles className="absolute top-4 left-4 text-yellow-300 animate-pulse w-6 h-6" />
          <Sparkles className="absolute bottom-4 right-4 text-yellow-300 animate-pulse w-6 h-6" />
          
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-red-900 px-6 py-1 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider">
            Campana sobre Campana
          </div>

          <div className="space-y-4 max-h-[40vh] md:max-h-[50vh] overflow-y-auto custom-scrollbar mt-4">
            {lyrics.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ margin: "-20px" }}
                className={`text-xl md:text-3xl font-medium tracking-wide ${
                  line === "" ? "h-6" : "text-white/95 drop-shadow-md"
                } ${index >= 5 && index <= 7 ? "text-yellow-300 font-bold scale-105" : ""}`}
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
          className="px-8 py-3 bg-white text-red-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
        >
          Siguiente: Enseñanza <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
