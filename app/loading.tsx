"use client";

import { motion } from "framer-motion";
import { Logo } from "./components/ui/Logo";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Logo className="text-4xl" />
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        className="h-[2px] bg-blue-500 relative overflow-hidden"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-400 text-sm"
      >
        Loading...
      </motion.p>
    </div>
  );
}
