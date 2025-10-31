"use client";

import { QUESTIONS } from "@/lib/questions";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY_NAME = "simple-mbti:name";
const STORAGE_KEY_ANSWERS = "simple-mbti:answers";
const STORAGE_KEY_RESULT = "simple-mbti:result";

export default function QuestionsPage() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedName = window.localStorage.getItem(STORAGE_KEY_NAME);
    if (!storedName) {
      router.replace("/");
      return;
    }

    setName(storedName);

    const storedAnswers = window.localStorage.getItem(STORAGE_KEY_ANSWERS);
    if (storedAnswers) {
      try {
        const parsed = JSON.parse(storedAnswers) as string[];
        setAnswers(parsed);
        setCurrentIndex(parsed.length);
      } catch (parseError) {
        console.error(parseError);
      }
    }
  }, [router]);

  useEffect(() => {
    if (answers.length > 0) {
      window.localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    }
  }, [answers]);

  const totalQuestions = QUESTIONS.length;
  const progress = useMemo(
    () => (answers.length / totalQuestions) * 100,
    [answers, totalQuestions],
  );

  const handleAnswer = async (value: "yes" | "no") => {
    if (isSubmitting) {
      return;
    }

    if (!name) {
      router.replace("/");
      return;
    }

    setError("");

    const question = QUESTIONS[currentIndex];
    if (!question) {
      return;
    }
    const nextLetter = value === "yes" ? question.yes : question.no;
    const nextAnswers = [...answers, nextLetter];

    setAnswers(nextAnswers);
    setCurrentIndex((previous) => previous + 1);

    if (currentIndex < totalQuestions - 1) {
      return;
    }

    const result = nextAnswers.join("");

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          answers: nextAnswers,
          result,
        }),
      });

      if (!response.ok) {
        throw new Error("결과 저장에 실패했습니다.");
      }

      window.localStorage.setItem(
        STORAGE_KEY_RESULT,
        JSON.stringify({
          name,
          answers: nextAnswers,
          result,
        }),
      );

      router.push(`/result/${result}?name=${encodeURIComponent(name ?? "")}`);
    } catch (submissionError) {
      console.error(submissionError);
      setError("결과 저장 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
      setIsSubmitting(false);
      setAnswers(answers);
      setCurrentIndex(totalQuestions - 1);
    }
  };

  const currentQuestion = QUESTIONS[currentIndex];

  if (!name) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
        <header className="flex flex-col items-start gap-2">
          <p className="text-sm text-white/60">{name}님의 진행 상황</p>
          <h1 className="text-3xl font-bold">Simple MBTI 질문</h1>
        </header>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-amber-400 transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <section className="rounded-3xl bg-white/10 p-8 shadow-lg backdrop-blur">
          <p className="text-sm text-white/70">
            질문 {Math.min(currentIndex + 1, totalQuestions)} / {totalQuestions}
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-relaxed">
            {currentQuestion?.text ?? "모든 질문에 답변했어요!"}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => handleAnswer("yes")}
              disabled={isSubmitting}
              className="rounded-2xl bg-emerald-400/90 px-4 py-6 text-lg font-semibold text-slate-900 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              예
            </button>
            <button
              onClick={() => handleAnswer("no")}
              disabled={isSubmitting}
              className="rounded-2xl bg-rose-400/90 px-4 py-6 text-lg font-semibold text-slate-900 transition hover:bg-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              아니오
            </button>
          </div>
          {error ? (
            <p className="mt-6 text-sm text-red-200">{error}</p>
          ) : null}
        </section>
        <p className="text-center text-sm text-white/60">
          총 4개의 질문에 답변하면 결과 페이지로 이동해요.
        </p>
      </div>
    </main>
  );
}
