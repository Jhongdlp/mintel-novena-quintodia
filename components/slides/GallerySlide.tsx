"use client";

import { motion } from "framer-motion";

export default function GallerySlide() {
  return (
    <div className="w-full max-w-6xl">
      <motion.h2
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-4xl font-bold mb-12 text-left border-l-4 border-purple-500 pl-4"
      >
        Galería Interactiva
      </motion.h2>

      <div className="grid grid-cols-4 gap-4 h-[500px]">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item * 0.1 }}
            whileHover={{ 
              scale: 1.15,
              zIndex: 10,
              rotate: Math.random() * 4 - 2
            }}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${
              item % 2 === 0 ? "col-span-2 bg-gradient-to-br from-purple-900 to-indigo-900" : "bg-gradient-to-br from-pink-900 to-rose-900"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold opacity-20">
              0{item}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
