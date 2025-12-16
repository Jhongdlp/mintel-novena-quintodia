"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    ? "text-white bg-white/10 hover:bg-white/20" 
    : "text-red-900 bg-red-800/10 hover:bg-red-800/20";
    
  const progressActive = controlTheme === "light" ? "bg-white" : "bg-red-700";
  const progressInactive = controlTheme === "light" ? "bg-white/30" : "bg-red-300";

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

        {/* Navigation Controls */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col gap-4 z-50">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${controlColors}`}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${controlColors}`}
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
