"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { BookOpen, ChevronDown, Sparkles, Scroll } from "lucide-react";
import { useState, useEffect } from "react";

interface SlideProps {
  onNext?: () => void;
}

export default function WordOfGodSlide({ onNext }: SlideProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTitleAnimated, setIsTitleAnimated] = useState(false);

  // Trigger the title animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsTitleAnimated(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto scrollbar-hide">
      <LayoutGroup>
        
        {/* Giant Title Animation Container */}
        <motion.div 
          layout
          transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
          className={`flex flex-col items-center justify-center ${
            isTitleAnimated ? "h-auto mb-4 md:mb-8 shrink-0 py-10" : "h-full absolute inset-0 z-50 bg-white/90 backdrop-blur-xl"
          }`}
        >
          <motion.div layout transition={{ duration: 1.2, type: "spring", bounce: 0.15 }} className="flex items-center gap-4">
            <motion.div 
              layout 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
               <BookOpen className={`${isTitleAnimated ? "w-8 h-8 md:w-12 md:h-12" : "w-24 h-24 md:w-32 md:h-32"} text-red-800`} />
            </motion.div>
            
            <motion.h1 
              layout
              transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
              className={`font-serif font-bold text-red-900 leading-tight text-center ${
                isTitleAnimated ? "text-2xl md:text-5xl" : "text-4xl md:text-9xl drop-shadow-2xl z-50"
              }`}
            >
              PALABRA<br/>DE DIOS
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* Content Container - Appears after title moves */}
        <AnimatePresence>
          {isTitleAnimated && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full max-w-4xl flex flex-col items-center pb-8"
            >
               {/* Summary Card */}
              <motion.div 
                layout
                className="bg-white/90 p-6 md:p-8 rounded-3xl shadow-xl w-full text-center relative overflow-hidden border border-yellow-500/30"
              >
                 <Scroll className="absolute top-0 left-0 w-full h-full text-yellow-500/5 rotate-12 pointer-events-none" />
                 
                 <motion.div layout="position" className="relative z-10">
                   <h3 className="text-xl md:text-3xl font-bold text-yellow-700 font-serif mb-2">Magnificat Lc 1, 46 - 55</h3>
                   <p className="text-sm md:text-base text-gray-600 italic mb-6">El canto de María: La alegría del espíritu en Dios Salvador.</p>
                 </motion.div>

                 <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.button
                        key="expand-btn"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsExpanded(true)}
                        className="group bg-red-800 text-white px-8 py-3 rounded-full font-bold text-base md:text-lg flex items-center gap-2 mx-auto hover:bg-red-900 transition-colors shadow-lg animate-pulse"
                      >
                        Leer Evangelio Completo <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="full-text"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-left md:text-justify space-y-4 overflow-hidden relative z-20"
                      >


                        <div className="h-0.5 w-16 bg-red-200 mx-auto rounded-full mb-4" />
                        
                        <div className="space-y-4 text-base md:text-lg text-gray-800 leading-relaxed font-light">
                          <p>
                            <span className="text-red-800 font-bold text-3xl float-left mr-2 font-serif">P</span>
                            roclama mi alma la grandeza del Señor, se alegra mi espíritu en Dios, mi salvador; porque ha mirado la humillación de su esclava.
                          </p>
                          
                          <p>
                            Desde ahora me felicitarán todas las generaciones, porque el Poderoso ha hecho obras grandes por mí: su nombre es santo, y su misericordia llega a sus fieles de generación en generación.
                          </p>

                          <div className="bg-yellow-50 p-3 md:p-4 rounded-xl border-l-4 border-yellow-500 my-2">
                             <p className="text-base md:text-lg text-yellow-900 italic">
                               "Él hace proezas con su brazo: dispersa a los soberbios de corazón, derriba del trono a los poderosos y enaltece a los humildes..."
                             </p>
                          </div>

                          <p>
                            A los hambrientos los colma de bienes y a los ricos los despide vacíos. Auxilia a Israel, su siervo, acordándose de la misericordia como lo había prometido a nuestros padres en favor de Abrahán y su descendencia por siempre.
                          </p>
                        </div>
                        
                        <div className="pt-6 mt-6 border-t border-red-100 flex flex-col items-center gap-1">
                           <p className="font-bold text-red-900 text-lg">Palabra del Señor</p>
                           <p className="font-bold text-yellow-700 text-xl">R/ Gloria a ti, Señor Jesús</p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               setIsExpanded(false);
                             }}
                             className="px-6 py-2 border-2 border-red-800 text-red-800 rounded-full font-bold text-base hover:bg-red-50 transition-colors md:order-first flex items-center gap-2"
                           >
                             <ChevronDown className="w-4 h-4 rotate-180" /> Leer Menos
                           </button>
                           <button 
                             onClick={onNext}
                             className="px-8 py-3 bg-green-700 text-white rounded-full font-bold text-lg hover:bg-green-800 transition-colors shadow-lg flex items-center gap-2"
                           >
                              Continuar a Reflexión
                           </button>
                        </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </LayoutGroup>
    </div>
  );
}
