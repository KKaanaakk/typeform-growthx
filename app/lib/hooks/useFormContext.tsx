"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  FormData,
  FormNavigationState,
  Question,
  INDUSTRIES,
  PROFESSIONAL_GOALS,
} from "@/app/types/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/app/types/form";
import { submitForm } from "@/app/services/api";

interface FormContextType {
  form: UseFormReturn<FormData>;
  navigation: FormNavigationState;
  questions: Question[];
  nextQuestion: () => void;
  previousQuestion: () => void;
  setProgress: (progress: number) => void;
  goToQuestion: (index: number) => void;
  handleSubmit: () => Promise<void>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      industry: "",
      professionalGoals: [],
      careerGoals: [],
    },
  });

  const [navigation, setNavigation] = useState<FormNavigationState>({
    currentQuestionIndex: 0,
    isSubmitting: false,
    isSubmitted: false,
    progress: 0,
  });

  const [questions] = useState<Question[]>([
    {
      id: "welcome",
      type: "welcome",
      title: "Up-skilling requires time commitment",
      description:
        "The GrowthX experience is designed by keeping in mind the working hours founders & full time operators typically work in.",
    },
    {
      id: "name",
      type: "text",
      title: "First, what's your name?*",
      description: "We'd love to know who we're talking to.",
      required: true,
    },
    {
      id: "email",
      type: "email",
      title: "What's your work email?*",
      description:
        "We'll use this to keep in touch and share important updates.",
      required: true,
    },
    {
      id: "industry",
      type: "select",
      title: "What industry is your business in?*",
      description: "This helps us understand your specific market challenges.",
      options: INDUSTRIES,
      required: true,
    },
    {
      id: "professionalGoals",
      type: "multiselect",
      title: "What's your role?*",
      description: "Select the option that best describes your position",
      options: PROFESSIONAL_GOALS,
      required: true,
    },
    {
      id: "careerGoals",
      type: "multiselect",
      title: "What's your professional goal for the next 12 months?*",
      description: "Select up to 3 goals that best align with your aspirations",
      options: [
        "Accelerate revenue growth",
        "Improve sales efficiency",
        "Enhance marketing effectiveness",
        "Build a scalable sales process",
        "Develop go-to-market strategy",
        "Expand into new markets",
        "Increase customer retention",
        "Optimize pricing strategy",
        "Strengthen product-market fit",
        "Other",
      ],
      required: true,
    },
    {
      id: "submit",
      type: "submit",
      title: "Thanks for sharing!",
      description:
        "We'll be in touch soon with next steps. In the meantime, check your email for some resources we think you'll find valuable.",
    },
  ]);

  const nextQuestion = () => {
    if (navigation.currentQuestionIndex < questions.length - 1) {
      setNavigation((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        progress:
          ((prev.currentQuestionIndex + 1) / (questions.length - 1)) * 100,
      }));
    }
  };

  const previousQuestion = () => {
    if (navigation.currentQuestionIndex > 0) {
      setNavigation((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        progress:
          ((prev.currentQuestionIndex - 1) / (questions.length - 1)) * 100,
      }));
    }
  };

  const setProgress = (progress: number) => {
    setNavigation((prev) => ({ ...prev, progress }));
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setNavigation((prev) => ({
        ...prev,
        currentQuestionIndex: index,
        progress: (index / (questions.length - 1)) * 100,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setNavigation((prev) => ({
        ...prev,
        isSubmitting: true,
        submitError: undefined,
      }));
      const formData = form.getValues();
      const result = await submitForm(formData);

      if (result.success) {
        setNavigation((prev) => ({
          ...prev,
          isSubmitting: false,
          isSubmitted: true,
          currentQuestionIndex: questions.length - 1, // Move to thank you screen
        }));
      } else {
        setNavigation((prev) => ({
          ...prev,
          isSubmitting: false,
          submitError: result.error,
        }));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setNavigation((prev) => ({
        ...prev,
        isSubmitting: false,
        submitError: "Failed to submit form. Please try again.",
      }));
    }
  };

  return (
    <FormContext.Provider
      value={{
        form,
        navigation,
        questions,
        nextQuestion,
        previousQuestion,
        setProgress,
        goToQuestion,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
