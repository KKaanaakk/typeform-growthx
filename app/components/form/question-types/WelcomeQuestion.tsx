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
      isWelcomeScreen={true}
    >
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col"
        >
          <h2 className="text-3xl font-semibold mb-4">
            Up-skilling requires time commitment
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            The GrowthX experience is designed by keeping in mind the working
            hours founders & full time operators typically work in.
          </p>

          <div className="space-y-3 mb-8">
            <p className="text-xl">You will spend</p>
            <ul className="space-y-2 text-gray-300">
              <li>- 6 hours/week for the first 5 weeks</li>
              <li>- 15 hours/week for the last 3 weeks</li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={onSubmit}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              I agree
            </motion.button>

            <span className="text-gray-400">press Enter ↵</span>
          </div>
        </motion.div>
      </div>
    </BaseQuestion>
  );
}
