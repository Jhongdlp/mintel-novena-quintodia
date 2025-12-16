"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Cpu } from "lucide-react";

const features = [
  { icon: Zap, title: "Velocidad", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { icon: Shield, title: "Seguridad", color: "text-green-400", bg: "bg-green-400/10" },
  { icon: Cpu, title: "Tecnología", color: "text-blue-400", bg: "bg-blue-400/10" },
];

export default function FeaturesSlide() {
  return (
    <div className="flex flex-col items-center">
      <motion.h2 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-16 text-center"
      >
        Características Principales
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((F, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0, rotateX: -20 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: i * 0.2 + 0.5, type: "spring" }}
            whileHover={{ scale: 1.05, y: -10 }}
            className={`p-8 rounded-2xl border border-white/10 ${F.bg} backdrop-blur-md w-64 h-80 flex flex-col items-center justify-center gap-6 cursor-pointer`}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <F.icon className={`w-16 h-16 ${F.color}`} />
            </motion.div>
            <h3 className="text-2xl font-semibold">{F.title}</h3>
            <p className="text-center text-sm text-gray-400">
              Animación fluida e interactiva.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
