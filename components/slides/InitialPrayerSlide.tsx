"use client";

import { motion, Variants } from "framer-motion";
import { Users, BookHeart, MessageCircleQuestion, Sparkles } from "lucide-react";

interface SlideProps {
  onNext?: () => void;
}

export default function InitialPrayerSlide({ onNext }: SlideProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto scrollbar-hide">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        className="max-w-6xl w-full h-full flex flex-col justify-center gap-4 md:gap-8"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center shrink-0">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-red-600 uppercase mb-1 block animate-pulse">
            Reflexión Comunitaria
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-red-900 border-b-2 border-yellow-400 inline-block pb-1">
            Oración Inicial
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 w-full items-stretch shrink-0">
          
          {/* Section: Signo (Left) */}
          <motion.div 
            variants={item} 
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border-l-8 border-yellow-500 relative overflow-hidden flex flex-col justify-center"
          >
            <Sparkles className="absolute -top-4 -right-4 text-yellow-500/20 w-32 h-32 rotate-12 animate-spin-slow" />
            <div className="flex flex-col items-center text-center gap-4 z-10 relative">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-yellow-100 p-4 rounded-full shrink-0 shadow-inner"
              >
                 <Users className="w-10 h-10 text-yellow-700" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-serif">Signo</h3>
                <p className="text-base md:text-lg text-gray-700 leading-snug italic">
                  “Una pareja. Un Joven que represente a Jesús y de pie con la Biblia en la mano, le habla a la joven que sentado sus pies escucha.”
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section: Dialoguemos (Right) */}
          <motion.div variants={item} className="flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <MessageCircleQuestion className="w-6 h-6 text-red-600" />
              <h3 className="text-2xl font-serif font-bold text-red-800">Dialoguemos</h3>
            </div>

            <div className="flex flex-col gap-3">
              {[
                "¿Qué sentimiento nos rodea al contemplar las dos escenas?",
                "¿Cómo manifiesto mi capacidad de escuchar la palabra en mi familia?",
                "¿El mundo está en la capacidad de escuchar la Palabra de Dios que clama en la creación?"
              ].map((question, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3, type: "spring" }}
                  whileHover={{ scale: 1.03, x: 10, backgroundColor: "#fff5f5" }}
                  className="bg-white/80 p-3 md:p-4 rounded-xl border border-red-100 shadow-sm flex gap-3 items-center cursor-default transition-colors"
                >
                  <div className="bg-red-200 text-red-800 w-6 h-6 text-sm flex items-center justify-center rounded-full font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm md:text-base text-gray-800 font-medium leading-tight text-left">{question}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        
        </div>

        {/* Next Button */}
        <motion.div variants={item} className="flex justify-center shrink-0">
           <motion.button 
             onClick={onNext}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             className="px-8 py-3 bg-gradient-to-r from-red-800 to-red-900 text-white rounded-full font-bold text-lg shadow-lg flex items-center gap-2 border-2 border-yellow-500/50 hover:shadow-red-500/50"
           >
             Continuar a Palabra de Dios <BookHeart className="w-5 h-5 animate-pulse" />
           </motion.button>
        </motion.div>

      </motion.div>
    </div>
  );
}
