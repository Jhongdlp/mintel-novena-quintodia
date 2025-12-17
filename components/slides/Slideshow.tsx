"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Bell, TreePine, Gift, CandyCane } from "lucide-react";
import React, { useState, useEffect } from "react";

interface SlideProps {
  isActive: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const SlideshowContext = React.createContext<{
  setControlTheme: (theme: "default" | "light") => void;
}>({ setControlTheme: () => {} });

export default function Slideshow({ children }: { children: React.ReactNode[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [controlTheme, setControlTheme] = useState<"default" | "light">("default");
  const totalSlides = Array.isArray(children) ? children.length : 1;

  // Reset theme when slide changes
  useEffect(() => {
    setControlTheme("default");
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const controlColors = controlTheme === "light" 
    ? "text-white bg-black/60 hover:bg-black/80 border border-white/50 shadow-xl backdrop-blur-md" 
    : "text-red-900 bg-red-800/10 hover:bg-red-800/20";
    
  const progressActive = controlTheme === "light" ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-red-700";
  const progressInactive = controlTheme === "light" ? "bg-white/50 border border-white/20" : "bg-red-300";

  return (
    <SlideshowContext.Provider value={{ setControlTheme }}>
      <div className="relative w-screen h-screen overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/snow.png')] bg-red-50 text-red-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
            className="absolute inset-0 flex items-center justify-center p-0"
          >
            {Array.isArray(children) 
              ? React.Children.map(children[currentSlide], child => {
                  if (React.isValidElement(child)) {
                     // @ts-expect-error - We are forcefully injecting props
                     return React.cloneElement(child, { isActive: true, onNext: nextSlide });
                  }
                  return child;
                })
              : children}
          </motion.div>
        </AnimatePresence>



        {/* Global Festive Decor - Top Corners */}
        <div className="absolute top-0 left-0 w-32 h-32 z-10 pointer-events-none hidden md:block">
           <div className="absolute top-0 left-8 w-1 h-16 bg-red-800/20" />
           <Bell className="absolute top-16 left-4 w-12 h-12 text-yellow-600 rotate-12 opacity-80" />
           <div className="absolute top-0 left-16 w-1 h-12 bg-green-800/20" />
           <div className="absolute top-12 left-14 w-8 h-8 rounded-full bg-red-600 opacity-60 animate-pulse" />
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 z-10 pointer-events-none hidden md:block">
           <div className="absolute top-0 right-12 w-1 h-20 bg-red-800/20" />
           <CandyCane className="absolute top-20 right-8 w-12 h-12 text-red-600 -rotate-12 opacity-80" />
        </div>

        {/* Global Festive Decor - Bottom Corners */}
        <div className="absolute bottom-0 left-0 p-6 z-10 pointer-events-none hidden md:block opacity-20">
           <div className="flex items-end -space-x-4">
              <TreePine className="w-40 h-40 text-green-900 drop-shadow-md" />
              <Gift className="w-20 h-20 text-red-800 mb-2 rotate-6" />
           </div>
        </div>
        <div className="absolute bottom-20 right-4 md:bottom-8 md:right-8 flex flex-col gap-4 z-50">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-3 md:p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${controlColors}`}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`p-3 md:p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${controlColors}`}
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              className={`w-1 transition-all duration-500 rounded-full ${
                idx === currentSlide ? `h-8 ${progressActive}` : `h-2 ${progressInactive}`
              }`}
            />
          ))}
        </div>
      </div>
    </SlideshowContext.Provider>
  );
}
