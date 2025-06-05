"use client";
import { BaseQuestion } from "./BaseQuestion";
import { motion } from "framer-motion";
import { useFormContext } from "@/app/lib/hooks/useFormContext";

interface SubmitQuestionProps {
  title: string;
  description?: string;
  isActive: boolean;
  onSubmit: () => void;
}

export function SubmitQuestion({
  title,
  description,
  isActive,
}: SubmitQuestionProps) {
  const { navigation, handleSubmit } = useFormContext();
  const { isSubmitting, isSubmitted, submitError } = navigation;

  return (
    <BaseQuestion
      title={isSubmitted ? title : "Ready to submit?"}
      description={
        isSubmitted ? description : "Click submit to complete the form"
      }
      isActive={isActive}
      onSubmit={() => {}}
    >
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg transition-colors ${
                isSubmitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          )}

          {submitError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mt-2"
            >
              {submitError}
            </motion.p>
          )}

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <svg
                className="w-16 h-16 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-xl font-medium text-gray-900">
                Thank you for your submission!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </BaseQuestion>
  );
}
