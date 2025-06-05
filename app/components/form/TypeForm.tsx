"use client";

import { FormProvider, useFormContext } from "@/app/lib/hooks/useFormContext";
import { ProgressBar } from "./progress-bar/ProgressBar";
import { WelcomeQuestion } from "./question-types/WelcomeQuestion";
import { TextQuestion } from "./question-types/TextQuestion";
import { EmailQuestion } from "./question-types/EmailQuestion";
import { AnimatePresence } from "framer-motion";
import { FormData } from "@/app/types/form";
import { SubmitQuestion } from "./question-types/SubmitQuestion";
import { SelectQuestion } from "./question-types/SelectQuestion";
import { MultiSelectQuestion } from "./question-types/MultiSelectQuestion";

function TypeFormContent() {
  const { navigation, questions, nextQuestion } = useFormContext();
  const currentQuestion = questions[navigation.currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">No questions available</p>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "welcome":
        return (
          <WelcomeQuestion
            key="welcome"
            title={currentQuestion.title}
            description={currentQuestion.description}
            isActive={true}
            onSubmit={nextQuestion}
          />
        );
      case "text":
        return (
          <TextQuestion
            key={currentQuestion.id}
            id={currentQuestion.id as keyof FormData}
            title={currentQuestion.title}
            description={currentQuestion.description}
            isActive={true}
            onSubmit={nextQuestion}
          />
        );
      case "email":
        return (
          <EmailQuestion
            key={currentQuestion.id}
            id={currentQuestion.id as keyof FormData}
            title={currentQuestion.title}
            description={currentQuestion.description}
            isActive={true}
            onSubmit={nextQuestion}
          />
        );
      case "select":
        return (
          <SelectQuestion
            key={currentQuestion.id}
            id={currentQuestion.id as keyof FormData}
            title={currentQuestion.title}
            description={currentQuestion.description}
            options={currentQuestion.options || []}
            isActive={true}
            onSubmit={nextQuestion}
          />
        );
      case "multiselect":
        return (
          <MultiSelectQuestion
            key={currentQuestion.id}
            id={currentQuestion.id as keyof FormData}
            title={currentQuestion.title}
            description={currentQuestion.description}
            options={currentQuestion.options || []}
            isActive={true}
            onSubmit={nextQuestion}
          />
        );
      case "submit":
        return (
          <SubmitQuestion
            key="submit"
            title={currentQuestion.title}
            description={currentQuestion.description}
            isActive={true}
            onSubmit={nextQuestion}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-gray-500">
              Unknown question type: {currentQuestion.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar progress={navigation.progress} />
      <AnimatePresence mode="wait">{renderQuestion()}</AnimatePresence>
    </div>
  );
}

export function TypeForm() {
  return (
    <FormProvider>
      <TypeFormContent />
    </FormProvider>
  );
}
