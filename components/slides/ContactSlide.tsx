"use client";

import { motion } from "framer-motion";

export default function ContactSlide() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 20, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="mb-8"
      >
        <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center">
           <span className="text-black text-4xl font-black">?</span>
        </div>
      </motion.div>

      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-6xl font-bold mb-6"
      >
        ¿Listo para empezar?
      </motion.h2>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xl font-bold shadow-lg shadow-purple-500/30"
      >
        Contáctanos Ahora
      </motion.button>
    </div>
  );
}
