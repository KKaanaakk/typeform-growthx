"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BaseQuestionProps {
  title: string;
  description?: string;
  isActive: boolean;
  onSubmit: () => void;
  children: ReactNode;
}

export function BaseQuestion({
  title,
  description,
  isActive,
  onSubmit,
  children,
}: BaseQuestionProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto px-4 py-12 min-h-[60vh] flex flex-col"
    >
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600"
          >
            {description}
          </motion.p>
        )}
      </div>

      <div className="flex-grow">{children}</div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-sm text-gray-500"
      >
        <p>* indicates required question</p>
      </motion.div>
    </motion.div>
  );
}
