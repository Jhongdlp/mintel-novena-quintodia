"use client";

import { motion } from "framer-motion";
import { Music, Star, Mic, ArrowRight, Fish } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { SlideshowContext } from "@/components/slides/Slideshow";

interface SlideProps {
  onNext?: () => void;
}

const lyricsData = [
  { text: "LOS PECES EN EL RÍO", duration: 4, isTitle: true },
  { text: "", duration: 1 },
  { text: "La Virgen se está peinando", duration: 3 },
  { text: "entre cortina y cortina,", duration: 3 },
  { text: "sus cabellos son de oro", duration: 3 },
  { text: "y el peine de plata fina.", duration: 3 },
  { text: "", duration: 0.5 },
  { text: "Pero mira como beben", duration: 2.5, isChorus: true },
  { text: "los peces en el río,", duration: 2.5, isChorus: true },
  { text: "pero mira como beben", duration: 2.5, isChorus: true },
  { text: "por ver al Dios nacido.", duration: 2.5, isChorus: true },
  { text: "Beben y beben", duration: 1.5, isChorus: true },
  { text: "y vuelven a beber,", duration: 1.5, isChorus: true },
  { text: "los peces en el río", duration: 2.5, isChorus: true },
  { text: "por ver al Dios nacer.", duration: 3, isChorus: true },
  { text: "", duration: 0.5 },
  { text: "La Virgen lava pañales", duration: 3 },
  { text: "y los tiende en el romero,", duration: 3 },
  { text: "los angelitos cantando", duration: 3 },
  { text: "y el romero floreciendo.", duration: 3 },
  { text: "", duration: 0.5 },
  { text: "Pero mira como beben", duration: 2.5, isChorus: true },
  { text: "los peces en el río,", duration: 2.5, isChorus: true },
  { text: "pero mira como beben", duration: 2.5, isChorus: true },
  { text: "por ver al Dios nacido.", duration: 2.5, isChorus: true },
  { text: "Beben y beben", duration: 1.5, isChorus: true },
  { text: "y vuelven a beber,", duration: 1.5, isChorus: true },
  { text: "los peces en el río", duration: 2.5, isChorus: true },
  { text: "por ver al Dios nacer.", duration: 3, isChorus: true }
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
      className={`relative inline-block text-xl md:text-4xl tracking-wide my-2 transition-all duration-500 ${
        isTitle ? "font-serif text-3xl md:text-5xl mb-8 font-bold text-yellow-500" : ""
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

export default function CarolSlide({ onNext }: SlideProps) {
  const { setControlTheme } = useContext(SlideshowContext);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Calculate start times
  const lyricsWithTiming = React.useMemo(() => {
    let currentTime = 1; // Start after 1s delay
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
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-900 via-slate-900 to-black bg-[size:400%_400%] animate-gradient-xy pointer-events-none" />
      
      {/* Ambient River & Fish */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none" />
      {[...Array(8)].map((_, i) => (
        <motion.div
           key={i}
           initial={{ x: "-10vw", opacity: 0 }}
           animate={{ 
             x: "110vw", 
             opacity: [0, 0.8, 0],
             y: [0, Math.random() * 20 - 10, 0]
           }}
           transition={{ 
             duration: Math.random() * 10 + 15, 
             repeat: Infinity, 
             delay: Math.random() * 10,
             ease: "linear"
           }}
           className="absolute z-0 text-blue-300/30"
           style={{
             top: Math.random() * 40 + 60 + "%", // Bottom 40% of screen
             scale: Math.random() * 0.5 + 0.5
           }}
        >
           <Fish className="w-12 h-12 md:w-24 md:h-24" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-5xl px-4 flex flex-col items-center h-[85vh]"
      >
        <div className="flex items-center gap-4 mb-2 shrink-0">
           <Star className="w-8 h-8 text-yellow-500 animate-spin-slow" />
           <span className="text-yellow-100 font-serif tracking-widest uppercase text-lg md:text-xl font-bold">LOS PECES EN EL RÍO</span>
           <Star className="w-8 h-8 text-yellow-500 animate-spin-slow" />
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
          
          <div className="absolute top-6 right-6 animate-pulse">
            <Mic className="w-8 h-8 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
          </div>
        </div>

        <motion.button 
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-red-950 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(234,179,8,0.6)] flex items-center gap-3 shrink-0 border border-yellow-300"
        >
          Siguiente Oración <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
