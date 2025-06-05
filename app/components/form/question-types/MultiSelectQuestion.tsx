"use client";
import { BaseQuestion } from "./BaseQuestion";
import { motion } from "framer-motion";
import { useFormContext } from "@/app/lib/hooks/useFormContext";
import { useEffect, useState } from "react";
import { FormData } from "@/app/types/form";

interface MultiSelectQuestionProps {
  id: keyof FormData;
  title: string;
  description?: string;
  options: string[];
  isActive: boolean;
  onSubmit: () => void;
}

export function MultiSelectQuestion({
  id,
  title,
  description,
  options,
  isActive,
  onSubmit,
}: MultiSelectQuestionProps) {
  const { form } = useFormContext();
  const [showError, setShowError] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const {
    formState: { errors },
    trigger,
    setValue,
    clearErrors,
  } = form;

  useEffect(() => {
    if (isActive) {
      clearErrors(id);
      setShowError(false);
    }
  }, [isActive, clearErrors, id]);

  const handleSelect = (option: string) => {
    let newSelected: string[];
    if (selectedOptions.includes(option)) {
      newSelected = selectedOptions.filter((item) => item !== option);
    } else {
      if (selectedOptions.length >= 3) {
        return; // Max 3 selections
      }
      newSelected = [...selectedOptions, option];
    }
    setSelectedOptions(newSelected);
    setValue(id, newSelected);
    setShowError(false);
    clearErrors(id);
  };

  const handleSubmit = async () => {
    const isValid = await trigger(id);
    if (isValid) {
      onSubmit();
    } else {
      setShowError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, option: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(option);
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <BaseQuestion
      title={title}
      description={description}
      isActive={isActive}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          {options.map((option, index) => (
            <motion.button
              key={option}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedOptions.includes(option)
                  ? "bg-blue-100 hover:bg-blue-200"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              tabIndex={0}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 border-2 rounded ${
                    selectedOptions.includes(option)
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedOptions.includes(option) && (
                    <svg
                      className="w-4 h-4 text-white"
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
                  )}
                </div>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
          {showError && errors[id] && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mt-2 text-sm"
            >
              {errors[id]?.message as string}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <p className="text-sm text-gray-500">
            Select up to 3 options and press Continue ↵
          </p>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-lg transition-colors ${
              selectedOptions.length > 0
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedOptions.length === 0}
          >
            Continue
          </button>
        </motion.div>
      </div>
    </BaseQuestion>
  );
}
