"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { BookOpen, DoorOpen, ChevronDown } from "lucide-react";
import { useState } from "react";

interface SlideProps {
  onNext?: () => void;
}

export default function Day5WelcomeSlide({ onNext }: SlideProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    show: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 50 } 
    },
  };

  return (
    <div className="h-full flex flex-col justify-center items-center px-4 md:px-20 max-w-6xl mx-auto overflow-y-auto w-full py-10">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="w-full text-center space-y-6"
      >
        {/* Header Section */}
        <motion.div variants={item} className="flex flex-col items-center gap-2">
          <span className="text-yellow-600 font-bold tracking-[0.3em] uppercase text-sm md:text-base border-b-2 border-yellow-400 pb-1">
            Quinto Día
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-red-800 drop-shadow-sm">
            Ambientación y Bienvenida
          </h2>
        </motion.div>

        {/* Main Content Box - Layout Animated */}
        <motion.div 
          layout
          transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 text-left relative overflow-hidden max-w-4xl mx-auto"
        >
          {/* Decorative Background Icon */}
          <BookOpen className="absolute -right-10 -bottom-10 w-64 h-64 text-red-900/5 rotate-12" />

          {/* Initial Visible Content: Summary */}
          <motion.div layout="position" className="relative z-10">
             {/* Always visible summary */}
             <div className="text-center mb-6">
                <p className="text-xl text-gray-800 font-light mb-4">
                  Hoy meditamos <span className="font-bold text-red-800">"en la escucha de las escrituras"</span>.
                </p>
                <div className="inline-block border-l-4 border-green-600 bg-green-50/50 p-4 rounded-r-lg max-w-2xl mx-auto">
                  <p className="text-xl md:text-2xl font-serif text-green-900 italic">
                    “Si alguno escucha mi voz y abre la puerta, entraré, y cenaré con él”.
                  </p>
                </div>
             </div>
          </motion.div>

          {/* Expandable Content: The FULL Text */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden relative z-10 w-full"
              >
                <div className="pt-6 border-t border-gray-200/50 mt-2 space-y-6 text-lg md:text-xl text-gray-800 leading-relaxed font-light text-justify md:text-center">
                  
                  <p>
                    Hermanos y hermanas, en este quinto día de la novena meditaremos “en la escucha de las escrituras”. Todos estamos invitados a escuchar la Palabra de Dios. “Si alguno escucha mi voz y abre la puerta, entraré, y cenaré con él”.
                  </p>

                  <p>
                    Jesucristo está a la puerta y llama, si escuchamos su voz, tendremos la confianza para acercarnos a él, así, como María escucho la voz de Dios, por el anuncio del Ángel, y aclamó un hermoso canto “el poderoso ha hecho obras grandes en mí el que todo lo puede su nombre es Santo. 
                  </p>

                  <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-6 rounded-2xl text-center shadow-lg my-8">
                     <p className="text-xl md:text-2xl font-medium">
                       Abramos nuestro corazón para escuchar la voz de Dios y vivamos esta novena con alegría.
                     </p>
                  </div>
                  
                  <div className="flex flex-col items-center mt-8 space-y-8">
                    <div className="text-center">
                      <p className="font-serif text-2xl md:text-3xl text-red-900 font-bold">
                        En el nombre del Padre, y del Hijo,<br/> y del Espíritu Santo. 
                      </p>
                      <span className="text-4xl font-bold text-green-700 mt-2 block">
                        Amén.
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onNext}
                      className="group relative px-8 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-full font-bold text-xl shadow-lg border-2 border-yellow-400/50 hover:shadow-green-500/50 transition-all flex items-center gap-3 animate-bounce-slow"
                    >
                       <span className="text-2xl">🎵</span>
                       Cantar Villancico
                       <span className="text-2xl transform group-hover:rotate-12 transition-transform">🎵</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <motion.div layout className="mt-8 flex justify-center relative z-20">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`group flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
                isExpanded 
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                  : "bg-gradient-to-r from-red-600 to-red-800 text-white hover:scale-105 hover:shadow-red-500/30 animate-pulse"
              }`}
            >
              {isExpanded ? "Leer Menos" : "Leer Reflexión Completa"}
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
