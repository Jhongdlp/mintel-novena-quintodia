"use client";

import { motion } from "framer-motion";
import { ArrowRight, ScanLine, Smartphone } from "lucide-react";
import React from "react";

interface SlideProps {
  onNext?: () => void;
}

export default function QRConnectSlide({ onNext }: SlideProps) {
  return (
    <div className="h-full w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-white">
      {/* Background Decor - Subtle Tech/Digital feel for the Subsecretariat */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-gray-50 opacity-80" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Left Column: QR Code */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, x: -50 }}
          whileInView={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex flex-col items-center justify-center order-2 md:order-1"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white p-4 md:p-8 rounded-3xl shadow-2xl border border-gray-100">
              <img 
                src="/img/Quinto día de la novena..svg" 
                alt="QR Novena"
                className="w-48 h-48 md:w-[400px] md:h-[400px] object-contain"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 shadow-sm">
                <ScanLine className="w-6 h-6 text-blue-600 animate-pulse" />
              </div>
            </div>
          </div>
          <p className="mt-6 text-gray-500 font-medium flex items-center gap-2 text-sm md:text-base">
            <Smartphone className="w-4 h-4" />
            Escanea para seguir en tu celular
          </p>
        </motion.div>

        {/* Right Column: Text */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left order-1 md:order-2"
        >
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-800 rounded-full font-bold text-sm tracking-widest uppercase mb-6 border border-blue-100">
            Conectividad Digital
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Bienvenido al <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Quinto Día</span> de la Novena
          </h2>
          
          <div className="space-y-4 mb-10">
            <p className="text-lg md:text-2xl text-gray-600 font-light leading-relaxed">
              De parte de la:
            </p>
            <p className="text-xl md:text-3xl text-gray-800 font-bold leading-snug">
              Subsecretaría de Fomento de la Sociedad de la Información y Economía Digital
            </p>
          </div>

          <motion.button 
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto md:mx-0"
          >
            Continuar <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
