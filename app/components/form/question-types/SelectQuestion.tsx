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
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const {
    formState: { errors },
    trigger,
    setValue,
    clearErrors,
  } = form;

  useEffect(() => {
    if (isActive && selectRef.current) {
      selectRef.current.focus();
      clearErrors(id);
      setShowError(false);
    }
  }, [isActive, clearErrors, id]);

  const handleSelect = async (value: string) => {
    setSelectedValue(value);
    setValue(id, value);
    setIsOpen(false);
    setShowError(false);
    clearErrors(id);

    if (value) {
      const isValid = await trigger(id);
      if (isValid) {
        onSubmit();
      }
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedValue) {
        const isValid = await trigger(id);
        if (isValid) {
          onSubmit();
        } else {
          setShowError(true);
        }
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
      <div className="w-full flex flex-col space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full relative"
        >
          <div
            ref={selectRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-transparent border-b-2 border-gray-700 focus:border-blue-600 outline-none py-2 text-xl transition-colors text-gray-400 cursor-pointer relative flex items-center justify-between"
          >
            <span>{selectedValue || "Type or select an option"}</span>
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              className="w-6 h-6 text-gray-400"
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
            </motion.svg>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 mt-2 bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg z-50 max-h-[300px] overflow-y-auto"
            >
              {options.map((option, index) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-3 text-white hover:bg-[#333333] cursor-pointer transition-colors"
                >
                  {option}
                </motion.div>
              ))}
            </motion.div>
          )}

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
          Press Enter ↵ to continue
        </motion.p>
      </div>
    </BaseQuestion>
  );
}
