"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`font-bold flex items-center ${className}`}
    >
      <span className="text-white">Growth</span>
      <span className="text-blue-500">X</span>
    </motion.div>
  );
}
