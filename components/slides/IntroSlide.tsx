"use client";

import { motion, Variants } from "framer-motion";
import { Star, TreePine } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const item: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10
    }
  },
};

export default function IntroSlide() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl text-center flex flex-col items-center"
    >
      <motion.div 
        variants={item} 
        animate={{ 
          rotate: [0, 10, -10, 0], 
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
        className="mb-8"
      >
        <Star className="w-24 h-24 text-yellow-500 fill-yellow-400 drop-shadow-lg" />
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <span className="px-6 py-2 rounded-full border border-red-200 bg-white/50 text-red-800 text-sm tracking-[0.2em] font-serif uppercase">
          16 al 24 de Diciembre
        </span>
      </motion.div>
      
      <div className="flex items-center justify-center gap-4 md:gap-12 w-full">
        <motion.div
           variants={item}
           animate={{ rotate: [0, 5, -5, 0] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="hidden md:block opacity-80"
        >
           <TreePine className="w-24 h-24 md:w-32 md:h-32 text-green-800 drop-shadow-md" />
        </motion.div>

        <motion.h1 variants={item} className="text-5xl md:text-9xl font-serif font-bold mb-6 text-red-800 drop-shadow-sm">
          Novena de
          <br />
          <span className="text-green-800 italic">Navidad</span>
        </motion.h1>

        <motion.div
           variants={item}
           animate={{ rotate: [0, -5, 5, 0] }}
           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
           className="hidden md:block opacity-80"
        >
           <TreePine className="w-24 h-24 md:w-32 md:h-32 text-green-800 drop-shadow-md" />
        </motion.div>
      </div>
      
      <motion.p variants={item} className="text-xl md:text-2xl text-red-900/80 font-medium max-w-2xl mx-auto leading-relaxed">
        Celebremos juntos la espera del <span className="text-yellow-600 font-bold">Niño Jesús</span>. 
        Un tiempo de unión, oración y familia.
      </motion.p>
      
      <motion.div variants={item} className="mt-12 flex gap-4">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-bounce" style={{ animationDelay: "0.4s" }} />
      </motion.div>
    </motion.div>
  );
}
