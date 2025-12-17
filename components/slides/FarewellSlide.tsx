"use client";

import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { SlideshowContext } from "@/components/slides/Slideshow";

export default function FarewellSlide() {
  const { setControlTheme } = useContext(SlideshowContext);

  useEffect(() => {
    setControlTheme("light"); // Ensure controls are visible
    return () => setControlTheme("default");
  }, [setControlTheme]);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-white">
      {/* Background - Elegant and Clean for Official Message */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-gray-100 z-0" />
      
      {/* Subtle Confetti */}
      {[...Array(20)].map((_, i) => (
        <motion.div
           key={i}
           initial={{ y: -50, x: Math.random() * 100 + "vw", rotate: 0 }}
           animate={{ y: "100vh", rotate: 360 }}
           transition={{ 
             duration: Math.random() * 5 + 5, 
             repeat: Infinity, 
             ease: "linear"
           }}
           className="absolute z-0 w-2 h-2 md:w-3 md:h-3 rounded-full"
           style={{
             backgroundColor: ["#FFD700", "#1E3A8A", "#DC2626"][i % 3], // Ecuador Flag Colors (Yellow, Blue, Red)
             left: Math.random() * 100 + "%"
           }}
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center text-center px-6 max-w-4xl"
      >
        
        {/* Main Greeting */}
        <motion.h1 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 mb-8 drop-shadow-sm"
        >
          ¡Feliz Navidad!
        </motion.h1>

        <motion.div
           initial={{ width: 0 }}
           animate={{ width: "100px" }}
           className="h-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 mb-8 rounded-full" 
        />

        {/* Official Entity Name */}
        <p className="text-gray-700 text-lg md:text-2xl font-medium mb-12 leading-relaxed max-w-2xl">
          De parte de la
          <br />
          <strong className="text-gray-900 text-xl md:text-3xl mt-2 block">
            Subsecretaría de Fomento de la Sociedad de la Información y Economía Digital
          </strong>
        </p>

        {/* Logo Replacement */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 shadow-xl mb-10"
        >
          {/* Using img tag since Next.js Image requires configuration for local files sometimes or simpler for direct public access */}
          <img 
            src="/img/el-nuevo-ecuador-logo.svg" 
            alt="El Nuevo Ecuador" 
            className="h-24 md:h-32 w-auto object-contain"
          />
        </motion.div>

        {/* Restart Button */}
        <motion.button 
          onClick={reloadPage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3 shadow-lg"
        >
          <RefreshCw className="w-5 h-5 animate-spin-slow" />
          Reiniciar Presentación
        </motion.button>

      </motion.div>
    </div>
  );
}
