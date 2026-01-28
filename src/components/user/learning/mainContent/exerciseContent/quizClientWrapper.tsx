'use client';

import { useState } from 'react';
import QuizIntro from './quizIntro';
import QuizSession from './quizSession';
import QuizResult from './quizResult';

interface QuizClientWrapperProps {
  exercise: any;
  nav: any;
  slug: string;
}

export default function QuizClientWrapper({ exercise, nav, slug }: QuizClientWrapperProps) {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    setIsQuizSubmitted(false);
    setQuizResult(null);
  };

  const handleSubmitQuiz = async (answers: any, timeSpent: number) => {
    const totalQuestions = exercise?.quizzes?.length || 0;

    let correctAnswers = 0;
    exercise?.quizzes?.forEach((quiz: any, index: number) => {
      const selectedOptionId = answers[index];
      const selectedOption = quiz.options.find((opt: any) => opt.id === selectedOptionId);
      if (selectedOption?.isCorrect) {
        correctAnswers++;
      }
    });

    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    const result = {
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      answers,
      submittedAt: new Date().toISOString(),
    };

    setQuizResult(result);
    setIsQuizSubmitted(true);
  };

  const handleRestartQuiz = () => {
    setIsQuizStarted(true);
    setIsQuizSubmitted(false);
    setQuizResult(null);
  };

  const handleContinueNext = () => {
    // Chuyển đến nội dung tiếp theo
    window.location.href = `/courses/${slug}/learn/steps/${nav?.nextId}`;
  };

  if (isQuizSubmitted && quizResult) {
    return (
      <QuizResult
        result={quizResult}
        exercise={exercise}
        onRestart={handleRestartQuiz}
        onContinueNext={handleContinueNext}
        hasNext={!!nav?.nextId}
      />
    );
  }

  if (isQuizStarted) {
    return <QuizSession exercise={exercise} onSubmitQuiz={handleSubmitQuiz} />;
  }

  return <QuizIntro exercise={exercise} onStartQuiz={handleStartQuiz} nav={nav} slug={slug} />;
}
