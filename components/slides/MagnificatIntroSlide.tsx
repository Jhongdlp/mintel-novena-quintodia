"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContext, useEffect } from "react";
import { SlideshowContext } from "./Slideshow";

interface SlideProps {
  onNext?: () => void;
  isActive?: boolean;
}

export default function MagnificatIntroSlide({ onNext, isActive }: SlideProps) {
  const { setControlTheme } = useContext(SlideshowContext);

  useEffect(() => {
    if (isActive) {
      setControlTheme("light");
    }
  }, [isActive, setControlTheme]);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Image with Animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/virgen_magnificat.png')" }}
      />

      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 z-1 bg-black/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full py-12 md:py-20 px-4 text-center">
        
        {/* Spacer for vertical centering logic */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-xl md:text-2xl font-light tracking-[0.3em] mb-4 uppercase"
          >
            Tema del Día
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            className="text-5xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-white to-yellow-100 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          >
            EL MAGNIFICAT
          </motion.h1>
          
          <motion.button
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-12 px-10 py-4 bg-white text-red-900 font-bold rounded-full hover:bg-yellow-100 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-3 z-50 text-lg"
          >
            Iniciar <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-auto max-w-2xl"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-6" />
          <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed drop-shadow-md">
            Subsecretaría de Fomento de la Sociedad de la Información
            <br />
            y Economía Digital
          </p>
        </motion.div>

      </div>
    </div>
  );
}
