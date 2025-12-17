"use client";

import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, ArrowRight, BookOpen, Star, Sun } from "lucide-react";
import { SlideshowContext } from "@/components/slides/Slideshow";

// Data for Karaoke
const lyricsData = [
  { text: "PADRE NUESTRO", duration: 4, isTitle: true },
  { text: "", duration: 1 },
  // Verse 1 (Sung)
  { text: "Padre nuestro tu que estás", duration: 3 },
  { text: "en los que aman la verdad", duration: 3 },
  { text: "Haz que el reino que por ti se dio", duration: 3.5 },
  { text: "llegue pronto a nuestro corazón,", duration: 3.5 },
  { text: "el amor, que tu hijo,", duration: 3 },
  { text: "nos dejó, el amor...", duration: 2.5 },
  { text: "reine ya en nosotros.", duration: 3 },
  { text: "", duration: 1 },
  // Spoken Prayer (Recited) - Highlighted differently
  { text: "Padre nuestro, que estás en el cielo;", duration: 3, isSpoken: true },
  { text: "santificado sea tu nombre;", duration: 3, isSpoken: true },
  { text: "venga a nosotros tu reino;", duration: 3, isSpoken: true },
  { text: "hágase tu voluntad,", duration: 2.5, isSpoken: true },
  { text: "así en la tierra como en el cielo;", duration: 3, isSpoken: true },
  { text: "danos hoy nuestro pan de cada día;", duration: 3, isSpoken: true },
  { text: "perdona nuestras ofensas,", duration: 3, isSpoken: true },
  { text: "como también nosotros perdonamos", duration: 3, isSpoken: true },
  { text: "a los que nos ofenden;", duration: 2.5, isSpoken: true },
  { text: "y no nos dejes caer en tentación;", duration: 3, isSpoken: true },
  { text: "y líbranos del mal, Amén.", duration: 3, isSpoken: true },
  { text: "", duration: 1 },
  // Verse 2 (Sung)
  { text: "Y en el pan de la unidad,", duration: 3 },
  { text: "Señor danos tú la paz", duration: 3 },
  { text: "y olvídate de nuestro mal,", duration: 3 },
  { text: "si olvidamos el de los demás,", duration: 3 },
  { text: "no permitas, que caigamos", duration: 3 },
  { text: "en tentación...", duration: 2 },
  { text: "oh Señor...", duration: 2 },
  { text: "y ten piedad...", duration: 2 },
  { text: "del mundo.", duration: 3 },
];

const KaraokeLine = ({ 
  text, 
  startTime, 
  duration, 
  isChorus, 
  isTitle,
  isSpoken,
  containerRef 
}: { 
  text: string; 
  startTime: number; 
  duration: number; 
  isChorus?: boolean; 
  isTitle?: boolean;
  isSpoken?: boolean;
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
        isTitle ? "font-serif text-3xl md:text-5xl mb-8 font-bold text-sky-400" : ""
      } ${
        isSpoken ? "font-serif italic text-sky-200/80 text-lg md:text-2xl" : "font-medium"
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
          isTitle ? "text-sky-400" :
          isSpoken ? "text-sky-100 drop-shadow-sm" : 
          "text-white drop-shadow-md pb-1"
        }`}
      >
        {text}
      </motion.span>
    </p>
  );
};

export default function PrayersSlide({ onNext }: { onNext?: () => void }) {
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
      {/* Background: Spiritual Blue/Sky */}
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-sky-900 via-blue-900 to-indigo-950 bg-[size:400%_400%] animate-gradient-xy pointer-events-none" />
      
      {/* Light Rays / Divine Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-b from-sky-500/20 to-transparent pointer-events-none" />
      
      {[...Array(8)].map((_, i) => (
        <motion.div
           key={i}
           animate={{ 
             opacity: [0.1, 0.4, 0.1],
             scale: [1, 1.2, 1]
           }}
           transition={{ 
             duration: Math.random() * 4 + 4, 
             repeat: Infinity, 
             delay: Math.random() * 5 
           }}
           className="absolute top-0 w-24 h-[60vh] bg-gradient-to-b from-white/10 to-transparent -skew-x-12 blur-xl"
           style={{ left: `${Math.random() * 100}%` }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-5xl px-4 flex flex-col items-center h-[85vh]"
      >
        <div className="flex items-center gap-4 mb-2 shrink-0">
           <BookOpen className="w-8 h-8 text-sky-400" />
           <span className="text-sky-100 font-serif tracking-widest uppercase text-lg md:text-xl font-bold">ORACIÓN CANTADA</span>
           <Sun className="w-8 h-8 text-yellow-400 animate-spin-slow" />
        </div>

        {/* Karaoke Screen */}
        <div className="flex-1 w-full bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border-4 border-sky-400/20 shadow-[0_0_60px_rgba(56,189,248,0.15)] overflow-hidden relative flex flex-col items-center p-8">
          
          <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-slate-900/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-slate-900/90 to-transparent z-20 pointer-events-none" />

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
            <Music className="w-8 h-8 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
          </div>
        </div>

        <motion.button 
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center gap-3 shrink-0 border border-sky-400"
        >
          Continuar <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
