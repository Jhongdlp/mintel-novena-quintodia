"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HandHeart, Users, Leaf, Cross, Heart, Gift, ChevronDown, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface SlideProps {
  onNext?: () => void;
}

export default function CommitmentSlide({ onNext }: SlideProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Petition Data
  const petitions = [
    {
      id: 1,
      icon: <Users className="w-6 h-6 text-red-600" />,
      text: "Te pedimos, perdón, Señor, por las veces que causamos sufrimiento a nuestros hermanos y destruimos la naturaleza.",
      borderColor: "border-red-200",
      bg: "bg-red-50"
    },
    {
      id: 2,
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      text: "Te pedimos Señor, poder escuchar tu mensaje y preparan nuestros corazones con la esperanza de tu venida, que todas las familias del mundo puedan llenar sus corazones de fe y amor.",
      borderColor: "border-green-200",
      bg: "bg-green-50"
    },
    {
      id: 3,
      icon: <Cross className="w-6 h-6 text-purple-600" />,
      text: "Te pedimos Señor, por todas las personas que sufren enfermedades o han perdido algún ser querido, en la pandemia del COVID 19, para que recobren la esperanza y la fe siguiendo tu mensaje de amor.",
      borderColor: "border-purple-200",
      bg: "bg-purple-50"
    },
    {
      id: 4,
      icon: <Gift className="w-6 h-6 text-yellow-600" />,
      text: "Te pedimos, Señor, perdón por estar tan enganchados al dinero y a lo material, por nuestra mentalidad consumista, por pensar que todo se puede comprar y por creer que la felicidad la da el dinero y los regalos.",
      borderColor: "border-yellow-200",
      bg: "bg-yellow-50"
    }
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-start md:justify-center p-4 pt-10 md:p-8 bg-white relative overflow-y-auto scrollbar-hide">
      
      {/* 1. Title Animation - Stamp Effect */}
      <motion.div 
        initial={{ scale: 3, opacity: 0, rotate: -15 }}
        animate={{ 
          scale: isExpanded ? 0.6 : 1, 
          opacity: 1, 
          rotate: 0,
          y: isExpanded ? -20 : 0
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-4 md:mb-12 text-center relative z-10 shrink-0 transition-all duration-500"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ 
              textShadow: ["0 0 0px rgba(220,38,38,0)", "0 0 20px rgba(220,38,38,0.5)", "0 0 0px rgba(220,38,38,0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-900 tracking-tighter uppercase"
          >
            Compromiso
          </motion.div>
          
          {/* Decorative Stamp Border */}
          <motion.div 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -inset-4 border-4 border-red-800/20 rounded-xl transform -rotate-2 hidden md:block"
          />
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-gray-500 font-medium tracking-wide"
        >
          AL ESTILO DE MARÍA Y LOS APÓSTOLES
        </motion.p>
      </motion.div>

      {/* 2. Main Interactions */}
      <div className="w-full max-w-4xl relative z-20">
        
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div 
              key="summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="bg-red-50 p-8 rounded-full shadow-inner">
                 <HandHeart className="w-16 h-16 md:w-24 md:h-24 text-red-600 animate-pulse" />
              </div>
              
              <div className="max-w-xl mx-auto space-y-4">
                <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed">
                  "En esta fecha en que nos hemos reunido todas las familias y vecinos, dirijamos nuestra oración al niño Jesús."
                </p>
                <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-bold text-sm">
                  Respuesta: Escucha, Señor, nuestra oración
                </div>
              </div>

              <motion.button
                onClick={() => setIsExpanded(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-red-800 text-white rounded-2xl font-bold text-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Unirnos en Oración <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              key="petitions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                variants={{
                  show: { transition: { staggerChildren: 0.15 } }
                }}
                initial="hidden"
                animate="show"
              >
                {petitions.map((p) => (
                  <motion.div
                    key={p.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className={`flex gap-4 p-3 md:p-4 rounded-2xl border ${p.borderColor} ${p.bg} items-start shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                      {p.icon}
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-snug">
                      {p.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 border-t border-gray-100 pt-8">
                 <button 
                   onClick={() => setIsExpanded(false)}
                   className="px-6 py-2 text-gray-500 hover:text-red-700 text-sm font-medium flex items-center gap-2 transition-colors"
                 >
                   Volver al Resumen
                 </button>
                 <motion.button 
                    onClick={onNext}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-8 py-3 bg-green-700 text-white rounded-full font-bold text-lg hover:bg-green-800 transition-colors shadow-lg flex items-center gap-2"
                 >
                   Gozos <CheckCircle className="w-5 h-5" />
                 </motion.button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
