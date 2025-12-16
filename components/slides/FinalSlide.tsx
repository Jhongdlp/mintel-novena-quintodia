"use client";

import { motion } from "framer-motion";

export default function FinalSlide() {
  return (
    <div className="text-center relative z-10">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="mb-8 mx-auto w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-400"
      >
        <span className="text-6xl filter drop-shadow-md">🙏</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-7xl font-serif font-bold text-red-800 mb-6">Feliz Navidad</h2>
        <p className="text-2xl text-green-900 max-w-xl mx-auto">
          Que la paz y el amor reinen en sus hogares.
        </p>
      </motion.div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-3xl animate-pulse" />
    </div>
  );
}
