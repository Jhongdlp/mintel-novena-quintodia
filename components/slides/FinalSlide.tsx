"use client";

import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Flower2, Music, ArrowRight, Heart } from "lucide-react";
import { SlideshowContext } from "@/components/slides/Slideshow";

const lyricsData = [
  { text: "CLAVELES Y ROSAS", duration: 4, isTitle: true },
  { text: "", duration: 1 },
  // Chorus
  { text: "Claveles y rosas, la cuna adornad.", duration: 3.5, isChorus: true },
  { text: "En tanto que un ángel meciéndole está.", duration: 3.5, isChorus: true },
  { text: "Claveles y rosas, la cuna adornad.", duration: 3.5, isChorus: true },
  { text: "En tanto que un ángel meciéndole está.", duration: 3.5, isChorus: true },
  { text: "", duration: 1 },
  // Verse 1
  { text: "No llores niñito, no llores mi Dios,", duration: 3 },
  { text: "si te he ofendido, te pido perdón.", duration: 3 },
  { text: "No llores niñito, no llores mi Dios,", duration: 3 },
  { text: "si te he ofendido, te pido perdón.", duration: 3 },
  { text: "", duration: 1 },
  // Chorus
  { text: "Claveles y rosas, la cuna adornad.", duration: 3.5, isChorus: true },
  { text: "En tanto que un ángel meciéndole está.", duration: 3.5, isChorus: true },
  { text: "Claveles y rosas, la cuna adornad.", duration: 3.5, isChorus: true },
  { text: "En tanto que un ángel meciéndole está.", duration: 3.5, isChorus: true },
  { text: "", duration: 1 },
  // Verse 2
  { text: "Al niño, pastores, venid a abrigar,", duration: 3 },
  { text: "que la noche es fría y empieza a llorar.", duration: 3 },
  { text: "Al niño, pastores, venid a abrigar,", duration: 3 },
  { text: "que la noche es fría y empieza a llorar.", duration: 3 },
  { text: "", duration: 1 },
  // Chorus
  { text: "Claveles y rosas, la cuna adornad.", duration: 3.5, isChorus: true },
  { text: "En tanto que un ángel meciéndole está.", duration: 3.5, isChorus: true },
  { text: "Claveles y rosas, la cuna adornad.", duration: 3.5, isChorus: true },
  { text: "En tanto que un ángel meciéndole está.", duration: 3.5, isChorus: true },
  { text: "", duration: 1 },
  // Verse 3
  { text: "De amores su pecho abrazado está,", duration: 3 },
  { text: "quedémonos prestos su sed a apagar.", duration: 3 },
  { text: "De amores su pecho abrazado está,", duration: 3 },
  { text: "quedémonos prestos su sed a apagar.", duration: 3 },
  { text: "", duration: 1 },
  // Final Chorus
  { text: "Claveles y rosas, la cuna adornad.", duration: 3.5, isChorus: true },
  { text: "En tanto que un ángel meciéndole está.", duration: 3.5, isChorus: true },
  { text: "Claveles y rosas, la cuna adornad.", duration: 3.5, isChorus: true },
  { text: "En tanto que un ángel meciéndole está.", duration: 3.5, isChorus: true },
];

const KaraokeLine = ({ 
  text, 
  startTime, 
  duration, 
  isChorus, 
  isTitle,
  containerRef 
}: { 
  text: string; 
  startTime: number; 
  duration: number; 
  isChorus?: boolean; 
  isTitle?: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const lineRef = React.useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
      if (lineRef.current && containerRef.current) {
        const container = containerRef.current;
        const line = lineRef.current;
        const topPos = line.offsetTop - container.offsetTop;
        container.scrollTo({
          top: topPos - container.clientHeight / 2 + line.clientHeight / 2,
          behavior: 'smooth'
        });
      }
    }, startTime * 1000);

    return () => clearTimeout(timer);
  }, [startTime, containerRef]);

  if (!text) return <div className="h-8" />;

  return (
    <p 
      ref={lineRef}
      className={`relative inline-block text-xl md:text-3xl tracking-wide my-2 transition-all duration-500 ${
        isTitle ? "font-serif text-3xl md:text-5xl mb-8 font-bold text-pink-300" : ""
      } ${
        isChorus ? "font-bold" : "font-medium"
      } ${
        isPlaying ? "scale-105" : "scale-100 opacity-60"
      }`}
    >
      <span className="text-white/30 truncate">{text}</span>
      <motion.span
        initial={{ width: "0%" }}
        animate={isPlaying ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: duration, ease: "linear" }}
        className={`absolute top-0 left-0 overflow-hidden whitespace-nowrap ${
          isChorus ? "text-pink-300 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" : "text-white drop-shadow-md pb-1"
        }`}
      >
        {text}
      </motion.span>
    </p>
  );
};

export default function FinalSlide({ onNext }: { onNext?: () => void }) {
  const { setControlTheme } = useContext(SlideshowContext);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const lyricsWithTiming = React.useMemo(() => {
    let currentTime = 1;
    return lyricsData.map(line => {
      const item = { ...line, startTime: currentTime };
      currentTime += line.duration;
      return item;
    });
  }, []);

  const totalDuration = React.useMemo(() => {
    return lyricsWithTiming[lyricsWithTiming.length - 1].startTime + lyricsWithTiming[lyricsWithTiming.length - 1].duration + 2;
  }, [lyricsWithTiming]);

  const [loopKey, setLoopKey] = React.useState(0);

  useEffect(() => {
    setControlTheme("light");
    return () => setControlTheme("default");
  }, [setControlTheme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoopKey(prev => prev + 1);
       if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, totalDuration * 1000);
    return () => clearInterval(timer);
  }, [totalDuration]);

  // Restart presentation
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overscroll-none overflow-hidden">
      {/* Background: Floral Pink/Red */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-pink-900 via-rose-900 to-red-950 bg-[size:400%_400%] animate-gradient-xy pointer-events-none" />
      
      {/* Falling Flowers */}
      {[...Array(10)].map((_, i) => (
        <motion.div
           key={i}
           initial={{ y: -50, x: Math.random() * 100 + "vw", opacity: 0, rotate: 0 }}
           animate={{ 
             y: "110vh", 
             opacity: [0, 1, 0],
             rotate: 360,
             x: `calc(${Math.random() * 100}vw + ${Math.random() * 20 - 10}vw)`
           }}
           transition={{ 
             duration: Math.random() * 15 + 10, 
             repeat: Infinity, 
             delay: Math.random() * 10,
             ease: "linear"
           }}
           className="absolute z-0 text-pink-300/30"
        >
           {i % 2 === 0 ? <Flower2 className="w-12 h-12" /> : <Heart className="w-8 h-8" />}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-5xl px-4 flex flex-col items-center h-[85vh]"
      >
        <div className="flex items-center gap-4 mb-2 shrink-0">
           <Flower2 className="w-8 h-8 text-pink-400 animate-spin-slow" />
           <span className="text-pink-100 font-serif tracking-widest uppercase text-base md:text-xl font-bold">VILLANCICO FINAL</span>
           <Flower2 className="w-8 h-8 text-pink-400 animate-spin-slow" />
        </div>

        {/* Karaoke Screen */}
        <div className="flex-1 w-full bg-black/40 backdrop-blur-xl rounded-[3rem] border-4 border-white/10 shadow-[0_0_50px_rgba(244,63,94,0.3)] overflow-hidden relative flex flex-col items-center p-8">
          
          <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />

          <div 
            ref={containerRef}
            className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth flex flex-col items-center py-[40vh]"
          >
            <div key={loopKey} className="flex flex-col items-center w-full">
              {lyricsWithTiming.map((line, index) => (
                <KaraokeLine 
                  key={index} 
                  {...line} 
                  containerRef={containerRef}
                />
              ))}
            </div>
          </div>
          
          <div className="absolute top-6 right-6 animate-pulse">
            <Music className="w-8 h-8 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
          </div>
        </div>

        <motion.button 
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-3 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center gap-3 shrink-0 border border-pink-400"
        >
          Continuar <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
