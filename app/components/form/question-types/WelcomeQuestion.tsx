"use client";

import { BaseQuestion } from "./BaseQuestion";
import { motion } from "framer-motion";

interface WelcomeQuestionProps {
  title: string;
  description?: string;
  isActive: boolean;
  onSubmit: () => void;
}

export function WelcomeQuestion({
  title,
  description,
  isActive,
  onSubmit,
}: WelcomeQuestionProps) {
  return (
    <BaseQuestion
      title={title}
      description={description}
      isActive={isActive}
      onSubmit={onSubmit}
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="w-48 h-48 mb-6 flex items-center justify-center">
            <div className="text-4xl font-bold text-blue-600 flex items-center">
              <span className="mr-2">Growth</span>
              <span className="text-gray-800">X</span>
            </div>
          </div>

          <motion.button
            onClick={onSubmit}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            Start
          </motion.button>
        </motion.div>

        <motion.p
          className="text-sm text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Press Enter ↵ to start
        </motion.p>
      </div>
    </BaseQuestion>
  );
}
