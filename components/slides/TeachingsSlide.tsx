"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronDown, Bird, Send } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { SlideshowContext } from "@/components/slides/Slideshow";

interface SlideProps {
  onNext?: () => void;
}

export default function TeachingsSlide({ onNext }: SlideProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { setControlTheme } = useContext(SlideshowContext);

  // Sequence: Intro -> Content
  useEffect(() => {
    // Start with light theme for red background
    setControlTheme("light");

    const timer = setTimeout(() => {
        setShowContent(true);
        // Switch back to default theme when content (white bg) appears
        setControlTheme("default");
    }, 2800); // Slightly longer to match animation end
    return () => clearTimeout(timer);
  }, [setControlTheme]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto scrollbar-hide bg-white relative">
      <LayoutGroup>
        
        {/* Intro Overlay - Disappears completely */}
        <AnimatePresence>
          {!showContent && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // Reduced scale to avoid performance hit
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-red-900 text-white"
            >
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", delay: 0.5 }}
               >
                 <Bird className="w-32 h-32 mb-8 text-yellow-400" />
               </motion.div>
               <motion.h1 
                 initial={{ y: 50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="text-5xl md:text-7xl font-serif font-bold text-center px-4"
               >
                 ENSEÑANZA
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-4 text-xl md:text-2xl text-yellow-200 tracking-widest uppercase"
               >
                 Documento Preparatorio
               </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* content container */}
        {showContent && (
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="w-full max-w-5xl flex flex-col items-center relative z-10"
           >
              {/* Header */}
              <div className="text-center mb-6 md:mb-8 w-full p-4 border-b border-red-100">
                <span className="text-xs md:text-sm font-bold text-red-600 tracking-widest uppercase block mb-2">
                  Sínodo de los Obispos
                </span>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 leading-tight">
                  En la Escucha de las Escrituras
                </h2>
              </div>

              {/* Main Card */}
              <motion.div 
                layout
                className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full relative overflow-hidden"
              >
                 {/* Decorative Background - pointer-events-none CRITICAL */}
                 <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
                    <Bird className="w-64 h-64 text-red-900 rotate-12" />
                 </div>

                 <div className="relative z-20"> {/* Explicit Z-Index for interactions */}
                   <AnimatePresence mode="wait">
                      {!isExpanded ? (
                        <div className="text-center">
                          <p className="text-lg md:text-2xl text-gray-600 font-light italic mb-8 leading-relaxed">
                            "El Espíritu de Dios es el mismo que actúa en la misión de Jesús, prometido a los Apóstoles y a las generaciones de los discípulos..."
                          </p>
                          <motion.button
                            layout
                            onClick={() => setIsExpanded(true)}
                            className="group bg-red-800 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 mx-auto hover:bg-red-900 transition-colors shadow-lg animate-pulse"
                          >
                            Leer Enseñanza Completa <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                          </motion.button>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-left md:text-justify space-y-6"
                        >
                           <div className="h-1 w-20 bg-yellow-400 mb-6 rounded-full" />
                           
                           <div className="space-y-4 text-base md:text-lg text-gray-800 leading-relaxed">
                             <p>
                               <span className="text-red-800 font-bold text-4xl float-left mr-2 font-serif">E</span>
                               l Espíritu de Dios es el mismo que actúa en la misión de Jesús, prometido a los Apóstoles y a las generaciones de los discípulos que escuchan la Palabra de Dios y la ponen en práctica.
                             </p>
                             <p>
                               Por eso es oportuno que nuestro camino de construcción de una Iglesia sinodal se inspire en dos “imágenes” de la Escritura.
                             </p>
                             
                             <div className="grid md:grid-cols-2 gap-4 my-6">
                                <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                                   <strong className="block text-red-900 mb-1">1. Escena Comunitaria</strong>
                                   <p className="text-sm text-gray-700">Acompaña constantemente el camino de la evangelización.</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
                                   <strong className="block text-yellow-900 mb-1">2. Experiencia del Espíritu</strong>
                                   <p className="text-sm text-gray-700">Pedro y la comunidad reconocen el riesgo de poner límites a la fe.</p>
                                </div>
                             </div>

                             <p>
                               La experiencia sinodal del caminar juntos, siguiendo las huellas del Señor y en la obediencia al Espíritu, podrá recibir una inspiración decisiva de la meditación de estos dos momentos de la Revelación.
                             </p>
                           </div>

                           <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 pt-8 border-t border-gray-100">
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
                                className="px-8 py-3 bg-red-900 text-white rounded-full font-bold text-lg hover:bg-red-800 transition-colors shadow-lg flex items-center gap-2"
                              >
                                Siguiente: Dialoguemos <Send className="w-5 h-5" />
                              </button>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                 </div>
              </motion.div>
           </motion.div>
        )}

      </LayoutGroup>
    </div>
  );
}
