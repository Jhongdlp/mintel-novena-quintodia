"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Star, Cloud } from "lucide-react";
import { useContext, useEffect } from "react";
import { SlideshowContext } from "@/components/slides/Slideshow";

interface SlideProps {
  onNext?: () => void;
}

export default function PrayersSlide({ onNext }: SlideProps) {
  const { setControlTheme } = useContext(SlideshowContext);
  
  useEffect(() => {
    setControlTheme("light");
    return () => setControlTheme("default");
  }, [setControlTheme]);

  const prayers = [
    { text: "Oraciones a la Virgen María", icon: <Heart className="text-pink-400" /> },
    { text: "A San José", icon: <Cloud className="text-blue-300" /> },
    { text: "Y al Niño Jesús", icon: <Star className="text-yellow-400" /> },
    { text: "Padre Nuestro, Ave María, Gloria", icon: <Sparkles className="text-white" /> }
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fullscreen Animated Background - Blue/Gold for Divinity */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 animate-gradient-xy pointer-events-none" />
      
      {/* Stars Background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed z-0 bg-white rounded-full opacity-70"
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: Math.random() * 100 + "vh", 
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          style={{ width: Math.random() * 4 + "px", height: Math.random() * 4 + "px" }}
        />
      ))}

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center gap-12">
        
        {/* Animated Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-serif font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500 drop-shadow-sm"
        >
          Momento de Oración
        </motion.h2>

        {/* Staggered Prayer List */}
        <div className="space-y-6 w-full max-w-2xl">
          {prayers.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.3, type: "spring", stiffness: 50 }}
              className="group flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-default"
            >
              <div className="p-3 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-xl md:text-3xl text-white font-light tracking-wide">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, type: "spring" }} // Delayed appearance
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-10 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full font-bold text-xl shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all flex items-center gap-3"
        >
          Villancico <ArrowRight className="w-6 h-6" />
        </motion.button>

      </div>
    </div>
  );
}
