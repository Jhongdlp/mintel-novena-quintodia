"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookHeart, ChevronRight, ChevronLeft, Lightbulb, Music, Scroll, HeartHandshake } from "lucide-react";
import { useState } from "react";

interface SlideProps {
  onNext?: () => void;
}

const cards = [
  {
    id: 1,
    title: "Himno de Alabanza",
    icon: <Music className="w-12 h-12 text-yellow-600" />,
    content: "El Magnificat es un himno de alabanza que tiene mucha relación con el cántico de Ana, que exalta los grandes cambios realizados por Dios en los acontecimientos históricos.",
    color: "bg-red-50"
  },
  {
    id: 2,
    title: "Dos Acciones Divinas",
    icon: <Scroll className="w-12 h-12 text-blue-600" />,
    content: (
      <>
        <p className="mb-4">
          <strong>Primero:</strong> La alabanza personal; “Proclama mi alma la grandeza del Señor, se alegra mi espíritu en Dios, mi Salvador”.
        </p>
        <p>
          <strong>Segundo:</strong> La historia de la salvación; las grandes actuaciones de Yahvé: “Y su misericordia llega a sus fieles de generación en generación”.
        </p>
      </>
    ),
    color: "bg-blue-50"
  },
  {
    id: 3,
    title: "El Júbilo de María",
    icon: <HeartHandshake className="w-12 h-12 text-red-600" />,
    content: "María celebra las maravillas que Dios realizó en ella. Es su respuesta al anuncio del Ángel. Su alegría nace de haber experimentado personalmente la mirada benévola que Dios le dirigió a ella, criatura pobre y sin influjo en la historia.",
    color: "bg-green-50"
  }
];

export default function ReflectionSlide({ onNext }: SlideProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setDirection(1);
      setCurrentCard(prev => prev + 1);
    } else {
      onNext?.();
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      setDirection(-1);
      setCurrentCard(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 20 : -20
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 20 : -20
    })
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-gradient-to-br from-[#fdfbf7] to-[#fff0f0]">
      
      {/* Header */}
      <div className="text-center mb-8 shrink-0">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <Lightbulb className="w-6 h-6 text-yellow-500 animate-pulse" />
          <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">
            Momento de Reflexión
          </span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-red-900">
          Reflexionemos
        </h2>
      </div>

      {/* Interactive Card Stack */}
      <div className="relative w-full max-w-2xl h-[400px] md:h-[450px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentCard}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotate: { duration: 0.4 }
            }}
            className={`absolute w-full h-full ${cards[currentCard].color} rounded-3xl p-8 shadow-2xl border-4 border-white flex flex-col items-center justify-center text-center`}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 bg-white p-4 rounded-full shadow-md"
            >
              {cards[currentCard].icon}
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-serif">
              {cards[currentCard].title}
            </h3>
            
            <div className="text-lg text-gray-700 leading-relaxed overflow-y-auto max-h-[200px] scrollbar-hide">
              {cards[currentCard].content}
            </div>

            <div className="absolute top-4 right-4 text-sm font-bold text-gray-400 bg-white/50 px-3 py-1 rounded-full">
              {currentCard + 1} / {cards.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-8 mt-8 shrink-0">
        <button 
          onClick={handlePrev}
          disabled={currentCard === 0}
          className={`p-3 rounded-full transition-all ${
            currentCard === 0 
              ? "text-gray-300 cursor-not-allowed" 
              : "bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-110"
          }`}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {cards.map((_, idx) => (
            <div 
              key={idx}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentCard ? "w-8 bg-red-600" : "w-3 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className={`px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 ${
            currentCard === cards.length - 1
              ? "bg-green-700 text-white hover:bg-green-800"
              : "bg-red-800 text-white hover:bg-red-900"
          }`}
        >
          {currentCard === cards.length - 1 ? (
             <>Villancico <Music className="w-5 h-5" /></>
          ) : (
             <>Siguiente <ChevronRight className="w-5 h-5" /></>
          )}
        </button>
      </div>

    </div>
  );
}
