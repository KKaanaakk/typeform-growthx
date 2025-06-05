"use client";
import { BaseQuestion } from "./BaseQuestion";
import { motion } from "framer-motion";
import { useFormContext } from "@/app/lib/hooks/useFormContext";
import { useEffect, useRef, useState } from "react";
import { FormData } from "@/app/types/form";

interface SelectQuestionProps {
  id: keyof FormData;
  title: string;
  description?: string;
  options: string[];
  isActive: boolean;
  onSubmit: () => void;
}

export function SelectQuestion({
  id,
  title,
  description,
  options,
  isActive,
  onSubmit,
}: SelectQuestionProps) {
  const { form } = useFormContext();
  const [showError, setShowError] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const {
    formState: { errors },
    trigger,
    setValue,
    clearErrors,
    getValues,
  } = form;

  useEffect(() => {
    if (isActive && selectRef.current) {
      selectRef.current.focus();
      clearErrors(id);
      setShowError(false);
    }
  }, [isActive, clearErrors, id]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue(id, value);
    setShowError(false);
    clearErrors(id);

    if (value && value !== "default") {
      const isValid = await trigger(id);
      if (isValid) {
        onSubmit();
      }
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = getValues(id);
      if (!value || value === "default") {
        setShowError(true);
        return;
      }

      const isValid = await trigger(id);
      if (isValid) {
        onSubmit();
      } else {
        setShowError(true);
      }
    }
  };

  return (
    <BaseQuestion
      title={title}
      description={description}
      isActive={isActive}
      onSubmit={() => {}}
    >
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <select
            ref={selectRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-2 text-xl transition-colors appearance-none cursor-pointer"
            defaultValue="default"
          >
            <option value="default" disabled>
              Choose your industry...
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Select an option or press Enter ↵ to continue
        </motion.p>
      </div>
    </BaseQuestion>
  );
}
