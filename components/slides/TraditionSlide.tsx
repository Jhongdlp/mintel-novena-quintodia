"use client";

import { motion } from "framer-motion";
import { Music, Heart, BookOpen } from "lucide-react";

const prayers = [
  { 
    title: "Oración para todos los días", 
    desc: "Benignísimo Dios de infinita caridad...", 
    icon: BookOpen 
  },
  { 
    title: "Villancicos", 
    desc: "Tutaina, Campana sobre Campana...", 
    icon: Music 
  },
  { 
    title: "Oración al Niño Jesús", 
    desc: "Acordaos, ¡oh dulcísimo Niño Jesús!...", 
    icon: Heart 
  },
];

export default function TraditionSlide() {
  return (
    <div className="flex flex-col items-center max-w-6xl w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-16 text-center"
      >
        <h2 className="text-6xl font-serif font-bold text-green-900 mb-4">Nuestras Tradiciones</h2>
        <p className="text-xl text-red-800/70 italic">La esencia de la Novena</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {prayers.map((p, i) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 + 0.3 }}
            whileHover={{ y: -10 }}
            className="bg-white/80 backdrop-blur-sm p-10 rounded-t-full rounded-b-3xl border border-gold/20 shadow-lg flex flex-col items-center text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />
            
            <div className="mb-6 p-4 rounded-full bg-red-50 text-red-700 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <p.icon className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">{p.title}</h3>
            <p className="text-gray-600 leading-relaxed font-light">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>


       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="mt-16 flex justify-center gap-8 text-4xl opacity-50 select-none"
      >
        <span>🎄</span>
        <span>🎅</span>
        <span>🎄</span>
      </motion.div>
    </div>
  );
}
