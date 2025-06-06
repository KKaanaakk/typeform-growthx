"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BaseQuestionProps {
  title: string;
  description?: string;
  isActive: boolean;
  onSubmit: () => void;
  children: ReactNode;
  isWelcomeScreen?: boolean;
}

export function BaseQuestion({
  title,
  description,
  isActive,
  children,
  isWelcomeScreen = false,
}: BaseQuestionProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`w-full max-w-4xl mx-auto px-4 py-12 min-h-[60vh] flex flex-col ${
        isWelcomeScreen ? " text-white" : ""
      }`}
    >
      {!isWelcomeScreen && (
        <div className="w-full mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-3xl font-bold mb-4 ${
              isWelcomeScreen ? "text-white" : "text-white"
            }`}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-lg ${
                isWelcomeScreen ? "text-gray-400" : "text-white"
              }`}
            >
              {description}
            </motion.p>
          )}
        </div>
      )}

      <div className="w-full flex-grow">{children}</div>

      {/* {!isWelcomeScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p>* indicates required question</p>
        </motion.div>
      )} */}
    </motion.div>
  );
}
