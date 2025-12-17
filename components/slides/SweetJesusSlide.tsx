"use client";

import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Music, Cloud, ArrowRight, Baby } from "lucide-react";
import { SlideshowContext } from "@/components/slides/Slideshow";

// Data for Karaoke
const lyricsData = [
  { text: "DULCE JESÚS MÍO", duration: 4, isTitle: true },
  { text: "", duration: 1 },
  // Verso 1
  { text: "Dulce Jesús mío,", duration: 3, isChorus: true },
  { text: "mi niño adorado", duration: 3, isChorus: true },
  { text: "Dulce Jesús mío,", duration: 3, isChorus: true },
  { text: "mi niño adorado", duration: 3, isChorus: true },
  { text: "", duration: 0.5 },
  // Chorus
  { text: "Ven a nuestras almas niñito", duration: 3.5, isChorus: true },
  { text: "Ven no tardes tanto", duration: 2.5, isChorus: true },
  { text: "Ven a nuestras almas", duration: 2.5, isChorus: true },
  { text: "Ven no tardes tanto", duration: 3, isChorus: true },
  { text: "", duration: 1 },
  // Verso 2
  { text: "Del seno del Padre,", duration: 3 },
  { text: "bajaste humanado", duration: 3 },
  { text: "Del seno del Padre,", duration: 3 },
  { text: "bajaste humanado", duration: 3 },
  { text: "", duration: 0.5 },
  // Chorus variation
  { text: "Deja ya el materno niñito,", duration: 3.5 },
  { text: "porque te veamos", duration: 3 },
  { text: "Deja ya el materno niñito,", duration: 3.5 },
  { text: "porque te veamos", duration: 3 },
  { text: "", duration: 1 },
  // Repetición Inicio
  { text: "Dulce Jesús mío,", duration: 3, isChorus: true },
  { text: "mi niño adorado", duration: 3, isChorus: true },
  { text: "Dulce Jesús mío,", duration: 3, isChorus: true },
  { text: "mi niño adorado", duration: 3, isChorus: true },
  { text: "", duration: 0.5 },
  { text: "Ven a nuestras almas niñito", duration: 3.5, isChorus: true },
  { text: "Ven no tardes tanto", duration: 2.5, isChorus: true },
  { text: "Ven a nuestras almas", duration: 2.5, isChorus: true },
  { text: "Ven no tardes tanto", duration: 3, isChorus: true },
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
        isTitle ? "font-serif text-3xl md:text-5xl mb-8 font-bold text-amber-300" : ""
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
          isChorus ? "text-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.8)]" : "text-white drop-shadow-md pb-1"
        }`}
      >
        {text}
      </motion.span>
    </p>
  );
};

export default function SweetJesusSlide({ onNext }: { onNext?: () => void }) {
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

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overscroll-none overflow-hidden">
      {/* Background: Celestial/Divine Theme (Deep Blue & Gold) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 bg-[size:400%_400%] animate-gradient-xy pointer-events-none" />
      
      {/* Clouds & Stars Ambience */}
      {[...Array(6)].map((_, i) => (
        <motion.div
           key={`cloud-${i}`}
           initial={{ x: "-20vw", opacity: 0 }}
           animate={{ 
             x: "120vw", 
             opacity: [0, 0.4, 0],
           }}
           transition={{ 
             duration: Math.random() * 20 + 20, 
             repeat: Infinity, 
             delay: Math.random() * 20,
             ease: "linear"
           }}
           className="absolute z-0 text-white/10"
           style={{ top: Math.random() * 80 + "%" }}
        >
           <Cloud className="w-24 h-24 md:w-48 md:h-48" />
        </motion.div>
      ))}
      
      {[...Array(20)].map((_, i) => (
        <motion.div
           key={`star-${i}`}
           animate={{ 
             opacity: [0.2, 1, 0.2],
             scale: [0.8, 1.2, 0.8]
           }}
           transition={{ 
             duration: Math.random() * 3 + 2, 
             repeat: Infinity, 
             delay: Math.random() * 5 
           }}
           className="absolute bg-amber-200 rounded-full blur-[1px]"
           style={{
             width: Math.random() * 3 + 2 + "px",
             height: Math.random() * 3 + 2 + "px",
             left: Math.random() * 100 + "%",
             top: Math.random() * 100 + "%",
           }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-5xl px-4 flex flex-col items-center h-[85vh]"
      >
        <div className="flex items-center gap-4 mb-2 shrink-0">
           <Baby className="w-10 h-10 text-amber-400 animate-bounce-slow" />
           <span className="text-amber-100 font-serif tracking-widest uppercase text-lg md:text-xl font-bold">VILLANCICO</span>
           <Star className="w-8 h-8 text-amber-400 animate-spin-slow" />
        </div>

        {/* Karaoke Screen */}
        <div className="flex-1 w-full bg-indigo-950/40 backdrop-blur-xl rounded-[3rem] border-4 border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden relative flex flex-col items-center p-8">
          
          <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-indigo-950/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-indigo-950/90 to-transparent z-20 pointer-events-none" />

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
            <Music className="w-8 h-8 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
          </div>
        </div>

        <motion.button 
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-indigo-950 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-3 shrink-0 border border-amber-400"
        >
          Siguiente Oración <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
