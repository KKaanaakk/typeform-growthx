"use client";

import { BaseQuestion } from "./BaseQuestion";
import { motion } from "framer-motion";
import { useFormContext } from "@/app/lib/hooks/useFormContext";
import { useEffect, useState } from "react";
import { FormData } from "@/app/types/form";
import { Flag } from "../../ui/Flag";

interface EmailQuestionProps {
  id: keyof FormData;
  title: string;
  description?: string;
  isActive: boolean;
  onSubmit: () => void;
}

// Map of common email domains to country codes
const domainToCountry: Record<string, string> = {
  "gmail.com": "us",
  "yahoo.com": "us",
  "hotmail.com": "us",
  "outlook.com": "us",
  "icloud.com": "us",
  "yahoo.co.uk": "gb",
  "yahoo.co.in": "in",
  "rediffmail.com": "in",
  "yahoo.co.jp": "jp",
  "mail.ru": "ru",
  "qq.com": "cn",
  "163.com": "cn",
};

export function EmailQuestion({
  id,
  title,
  description,
  isActive,
  onSubmit,
}: EmailQuestionProps) {
  const { form } = useFormContext();
  const [showError, setShowError] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    trigger,
    watch,
  } = form;

  const email = watch(id);

  useEffect(() => {
    if (isActive) {
      setShowError(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (email && typeof email === "string") {
      const domain = email.split("@")[1]?.toLowerCase();
      if (domain) {
        setCountryCode(domainToCountry[domain] || null);
      } else {
        setCountryCode(null);
      }
    } else {
      setCountryCode(null);
    }
  }, [email]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative">
            <input
              type="email"
              className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-2 text-xl pr-10"
              placeholder="Type your answer here..."
              {...register(id)}
              onKeyDown={handleKeyDown}
              autoFocus={isActive}
            />
            {countryCode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Flag countryCode={countryCode} size="sm" />
              </motion.div>
            )}
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
          Press Enter ↵ to continue
        </motion.p>
      </div>
    </BaseQuestion>
  );
}
