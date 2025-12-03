import React from "react";
import { motion } from "framer-motion";

export const Maintenance = ({ message }: { message: string }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 text-center px-6">

      {/* Gear Animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-6"
      >
        <div className="w-24 h-24 border-8 border-gray-300 border-t-green-500 rounded-full" />
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        🚧 Website Under Maintenance
      </h1>

      <p className="text-gray-600 text-lg max-w-xl">
        {message || "We are currently updating the system. Please check back soon."}
      </p>

      <motion.div
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-10 text-gray-500"
      >
        Updating the system...
      </motion.div>
    </div>
  );
};};
