"use client";

import { useEffect, useState } from "react";

export function ResultShare({
  type,
  name,
}: {
  type: string;
  name: string;
}) {
  const [shareUrl, setShareUrl] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      if (!navigator.clipboard) {
        throw new Error("clipboard unsupported");
      }

      await navigator.clipboard.writeText(shareUrl);
      setCopyMessage("링크를 복사했어요!");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch (error) {
      console.error(error);
      setCopyMessage("복사에 실패했어요. 직접 복사해주세요.");
    }
  };

  const shareText = encodeURIComponent(
    `${name}님의 MBTI는 ${type}! 간단한 테스트로 확인해보세요.`,
  );
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <button
          onClick={handleCopy}
          className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          링크 복사하기
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-sky-500/80 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
        >
          트위터 공유
        </a>
        <a
          href={`https://story.kakao.com/share?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-yellow-400 px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
        >
          카카오스토리 공유
        </a>
      </div>
      {copyMessage ? (
        <p className="text-sm text-emerald-200">{copyMessage}</p>
      ) : null}
    </div>
  );
}
