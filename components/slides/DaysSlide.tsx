"use client";

import { motion } from "framer-motion";

const days = [
  "Día 1", "Día 2", "Día 3", 
  "Día 4", "Día 5", "Día 6", 
  "Día 7", "Día 8", "Día 9"
];

export default function DaysSlide() {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-serif font-bold mb-12 text-red-900 border-b-2 border-green-700 pb-2"
      >
        Los Nueve Días
      </motion.h2>

      <div className="grid grid-cols-3 gap-6 w-full">
        {days.map((day, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "#165b33", 
              color: "#ffffff",
            }}
            className="group relative cursor-pointer bg-white border-2 border-red-100 rounded-xl p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute -top-3 -right-3">
              <span className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full text-xs font-bold">
                {i + 16}
              </span>
            </div>
            <span className="text-3xl font-serif text-red-800 group-hover:text-white transition-colors">
              {day}
            </span>
            <span className="text-xs mt-2 text-gray-500 group-hover:text-green-100 uppercase tracking-widest">
              Diciembre
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
