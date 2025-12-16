"use client";

import { motion, Variants } from "framer-motion";
import { MessageCircle, Users, HeartHandshake, Ear, ArrowRight, HelpCircle } from "lucide-react";

interface SlideProps {
  onNext?: () => void;
}

const questions = [
  {
    id: 1,
    text: "¿Qué significan y su misericordia llega de generación en generación?",
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />,
    color: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    text: "¿Por qué la preferencia a los pobres, los hambrientos en el Magnificat?",
    icon: <HeartHandshake className="w-8 h-8 md:w-10 md:h-10 text-red-600" />,
    color: "from-red-50 to-red-100",
    borderColor: "border-red-200"
  },
  {
    id: 3,
    text: "¿Cómo son escuchados los laicos, los jóvenes y las mujeres?",
    icon: <Ear className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />,
    color: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200"
  },
  {
    id: 4,
    text: "¿Escuchamos la voz de los indígenas y de los pobres, o tenemos prejuicios y estereotipos que nos impiden escuchar?",
    icon: <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />,
    color: "from-green-50 to-green-100",
    borderColor: "border-green-200"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function DialogueSlide({ onNext }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-start md:justify-center p-4 pt-10 md:p-8 bg-gradient-to-b from-white to-gray-50 overflow-y-auto scrollbar-hide">
      
      {/* Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 md:mb-12 shrink-0"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-bounce" />
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
            Sínodo de la Sinodalidad
          </span>
        </div>
        <h2 className="text-3xl md:text-6xl font-serif font-bold text-red-900 drop-shadow-sm">
          Dialoguemos
        </h2>
      </motion.div>

      {/* Grid of Questions */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full max-w-5xl mb-4 md:mb-8"
      >
        {questions.map((q) => (
          <motion.div
            key={q.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`
              relative p-4 md:p-8 rounded-2xl md:rounded-3xl border-2 ${q.borderColor} 
              bg-white shadow-lg hover:shadow-xl transition-all duration-300
              flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 text-center md:text-left
              group overflow-hidden cursor-pointer
            `}
          >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${q.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10 shrink-0 p-2 md:p-3 bg-white rounded-xl md:rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 ring-1 ring-gray-100">
              {q.icon}
            </div>
            
            <p className="relative z-10 text-base md:text-xl font-medium text-gray-700 group-hover:text-gray-900 leading-snug">
              {q.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onNext}
        className="px-8 py-3 bg-red-800 text-white rounded-full font-bold text-lg hover:bg-red-900 transition-colors shadow-lg flex items-center gap-2"
      >
        Siguiente: Compromiso <ArrowRight className="w-5 h-5" />
      </motion.button>

    </div>
  );
}
