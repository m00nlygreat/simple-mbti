"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const STORAGE_KEY_NAME = "simple-mbti:name";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedName = window.localStorage.getItem(STORAGE_KEY_NAME);
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }

    window.localStorage.setItem(STORAGE_KEY_NAME, name.trim());
    window.localStorage.removeItem("simple-mbti:answers");
    window.localStorage.removeItem("simple-mbti:result");
    setError("");
    router.push("/questions");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-indigo-800 text-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-12 px-6 py-16 text-center">
        <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide">
          Simple MBTI Web Test
        </span>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          4개의 질문으로 알아보는 나의 MBTI
        </h1>
        <p className="text-lg text-white/80 md:text-xl">
          이름을 입력하고 예/아니오로 답변하면 바로 결과를 확인할 수 있어요.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl bg-white/10 p-8 shadow-xl backdrop-blur"
        >
          <label className="flex flex-col gap-3 text-left text-base font-medium">
            <span>이름</span>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="이름을 입력하세요"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none"
            />
          </label>
          {error ? (
            <p className="mt-3 text-left text-sm text-red-200">{error}</p>
          ) : null}
          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-amber-400 px-4 py-3 text-lg font-semibold text-slate-900 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            테스트 시작하기
          </button>
        </form>
        <p className="text-sm text-white/60">
          MBTI 결과는 Supabase DB에 안전하게 저장되며, 언제든지 다시 테스트할 수 있어요.
        </p>
      </div>
    </main>
  );
}
