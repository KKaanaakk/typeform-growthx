"use client";
import { BaseQuestion } from "./BaseQuestion";
import { motion } from "framer-motion";
import { useFormContext } from "@/app/lib/hooks/useFormContext";
import { useEffect, useRef, useState } from "react";
import { FormData } from "@/app/types/form";

interface TextQuestionProps {
  id: keyof FormData;
  title: string;
  description?: string;
  isActive: boolean;
  onSubmit: () => void;
}

export function TextQuestion({
  id,
  title,
  description,
  isActive,
  onSubmit,
}: TextQuestionProps) {
  const { form } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    clearErrors,
  } = form;

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
      // Clear any existing errors when the question becomes active
      clearErrors(id);
      setShowError(false);
    }
  }, [isActive, clearErrors, id]);

  const handleSubmit = async () => {
    const value = getValues(id);
    // Only validate if there's actually a value
    if (!value || (typeof value === "string" && value.trim() === "")) {
      setShowError(true);
      return;
    }

    const isValid = await trigger(id);
    if (isValid) {
      setShowError(false);
      onSubmit();
    } else {
      setShowError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const { onChange, onBlur, name, ref } = register(id);

  return (
    <BaseQuestion
      title={title}
      description={description}
      isActive={isActive}
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full flex flex-col"
        >
          <div className="w-full">
            <input
              ref={(e) => {
                ref(e);
                if (inputRef.current === null) {
                  inputRef.current = e;
                }
              }}
              name={name}
              onChange={(e) => {
                onChange(e);
                if (showError) {
                  setShowError(false);
                  clearErrors(id);
                }
              }}
              onBlur={onBlur}
              type="text"
              className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-2 text-xl transition-colors text-white"
              placeholder="Type your answer here..."
              onKeyDown={handleKeyDown}
            />
          </div>
          {showError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mt-2 text-sm"
            >
              {errors[id]?.message || "This field is required"}
            </motion.p>
          )}
        </motion.div>

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Press Enter ↵ to continue
        </motion.p>
      </div>
    </BaseQuestion>
  );
}
