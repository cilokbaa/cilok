import React from "react";
import { motion } from "framer-motion";

export const Maintenance = ({ message }: { message: string }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 text-center px-6">

      {/* Animasi Logo Gear */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-6"
      >
        <div className="w-24 h-24 border-8 border-gray-300 border-t-green-500 rounded-full" />
      </motion.div>

      {/* Judul */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Website Under Maintenance
      </h1>

      {/* Pesan custom */}
      <p className="text-gray-600 text-lg max-w-xl">
        {message || "We’re currently improving the system. Please check back soon!"}
      </p>

      {/* Animasi pulsing */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-10 text-gray-500"
      >
        Updating the system...
      </motion.div>
    </div>
  );
};
