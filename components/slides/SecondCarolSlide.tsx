"use client";

import { motion } from "framer-motion";
import { Music, Bell, Mic, ArrowRight, Sparkles } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { SlideshowContext } from "@/components/slides/Slideshow";

interface SlideProps {
  onNext?: () => void;
}

// Data for Karaoke
const lyricsData = [
  { text: "CAMPANAS DE BELÉN", duration: 4, isTitle: true },
  { text: "", duration: 1 },
  // Verse 1
  { text: "Campana sobre campana,", duration: 3 },
  { text: "y sobre campana una,", duration: 3 },
  { text: "asómate a la ventana,", duration: 3 },
  { text: "verás al Niño en la cuna.", duration: 3 },
  { text: "", duration: 0.5 },
  // Chorus
  { text: "Belén, campanas de Belén,", duration: 3, isChorus: true },
  { text: "que los ángeles tocan", duration: 3, isChorus: true },
  { text: "¿qué nuevas nos traes?", duration: 3, isChorus: true },
  { text: "", duration: 1 },
  // Verse 2
  { text: "Recogido tu rebaño", duration: 3 },
  { text: "¿a dónde vas pastorcillo?", duration: 3 },
  { text: "Voy a llevar al portal", duration: 3 },
  { text: "requesón, manteca y vino.", duration: 3 },
  { text: "", duration: 0.5 },
  // Chorus
  { text: "Belén, campanas de Belén,", duration: 3, isChorus: true },
  { text: "que los ángeles tocan", duration: 3, isChorus: true },
  { text: "¿qué nuevas nos traes?", duration: 3, isChorus: true },
  { text: "", duration: 1 },
  // Verse 3
  { text: "Campana sobre campana,", duration: 3 },
  { text: "y sobre campana dos,", duration: 3 },
  { text: "asómate a la ventana,", duration: 3 },
  { text: "verás al Hijo de Dios.", duration: 3 },
  { text: "", duration: 0.5 },
  // Chorus x2
  { text: "Belén, campanas de Belén,", duration: 3, isChorus: true },
  { text: "que los ángeles tocan", duration: 3, isChorus: true },
  { text: "¿qué nuevas nos traes?", duration: 3, isChorus: true },
  { text: "", duration: 0.5 },
  { text: "Belén, campanas de Belén,", duration: 3, isChorus: true },
  { text: "que los ángeles tocan", duration: 3, isChorus: true },
  { text: "¿qué nuevas nos traes?", duration: 3, isChorus: true },
];

// Componente para una linea de karaoke
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
      // Auto-scroll logic
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
        isTitle ? "font-serif text-3xl md:text-5xl mb-8 font-bold text-yellow-400" : ""
      } ${
        isChorus ? "font-bold" : "font-medium"
      } ${
        isPlaying ? "scale-105" : "scale-100 opacity-60"
      }`}
    >
      {/* Capa Base (Texto inactivo) */}
      <span className="text-white/30 truncate">{text}</span>
      
      {/* Capa de Relleno (Texto activo animado) */}
      <motion.span
        initial={{ width: "0%" }}
        animate={isPlaying ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: duration, ease: "linear" }}
        className={`absolute top-0 left-0 overflow-hidden whitespace-nowrap ${
          isChorus ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" : "text-white drop-shadow-md pb-1"
        }`}
      >
        {text}
      </motion.span>
    </p>
  );
};

export default function SecondCarolSlide({ onNext }: SlideProps) {
  const { setControlTheme } = useContext(SlideshowContext);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Calculate start times
  const lyricsWithTiming = React.useMemo(() => {
    let currentTime = 1;
    return lyricsData.map(line => {
      const item = { ...line, startTime: currentTime };
      currentTime += line.duration;
      return item;
    });
  }, []);

  // Calculate total duration for looping
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
       // Reset scroll
       if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, totalDuration * 1000);

    return () => clearInterval(timer);
  }, [totalDuration]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overscroll-none overflow-hidden">
      {/* Fullscreen Fixed Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-tl from-yellow-900 via-red-900 to-yellow-950 bg-[size:400%_400%] animate-gradient-xy pointer-events-none" />
      
      {/* Background Animated Bells */}
      {[...Array(6)].map((_, i) => (
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
          className="absolute z-0 text-yellow-500/10 pointer-events-none"
        >
          <Bell className={`w-${Math.random() > 0.5 ? 16 : 32} h-${Math.random() > 0.5 ? 16 : 32}`} />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-5xl px-4 flex flex-col items-center h-[85vh]"
      >
        <div className="flex items-center gap-4 mb-2 shrink-0">
           <Bell className="w-8 h-8 text-yellow-400 animate-bounce" />
           <span className="text-yellow-100 font-serif tracking-widest uppercase text-lg md:text-xl font-bold">VILLANCICO</span>
           <Bell className="w-8 h-8 text-yellow-400 animate-bounce delay-75" />
        </div>

        {/* Karaoke Screen */}
        <div className="flex-1 w-full bg-black/40 backdrop-blur-xl rounded-[3rem] border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col items-center p-8">
          
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

          <Sparkles className="absolute top-6 right-6 text-yellow-300 animate-pulse w-8 h-8 opacity-50" />
          <Sparkles className="absolute bottom-6 left-6 text-yellow-300 animate-pulse w-8 h-8 opacity-50" />
        </div>

        <motion.button 
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-3 bg-white text-red-950 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 shrink-0 border border-gray-200"
        >
          Siguiente: Enseñanza <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
