import { ResultShare } from "@/components/result-share";
import Link from "next/link";

type ResultPageProps = {
  params: { mbti: string };
  searchParams: { name?: string };
};

const MBTI_DESCRIPTIONS: Record<string, string> = {
  ENFP: "열정적이고 상상력이 풍부한 활동가형", 
  ENTP: "창의적이고 논쟁을 즐기는 발명가형",
  ENFJ: "사람을 이끄는 따뜻한 지도자형",
  ENTJ: "결단력 있고 목표 지향적인 지도자형",
  ESFP: "사교적이고 즉흥적인 연예인형",
  ESTP: "모험을 즐기는 활동가형",
  ESFJ: "사람을 돌보는 사교적인 외교관형",
  ESTJ: "현실적이고 체계적인 지도자형",
  INFP: "이상주의적이고 감성적인 중재자형",
  INTP: "논리적이고 호기심 많은 사색가형",
  INFJ: "통찰력 있고 헌신적인 옹호자형",
  INTJ: "독창적이며 전략적인 사색가형",
  ISFP: "차분하고 예술적인 모험가형",
  ISTP: "대담하고 현실적인 탐험가형",
  ISFJ: "헌신적이고 배려 깊은 수호자형",
  ISTJ: "성실하고 책임감 있는 관리자형",
};

export default function ResultPage({ params, searchParams }: ResultPageProps) {
  const type = params.mbti.toUpperCase();
  const name = decodeURIComponent(searchParams.name ?? "").trim() || "익명의 탐험가";
  const description = MBTI_DESCRIPTIONS[type] ?? "아직 준비되지 않은 유형이에요. 곧 업데이트될 예정입니다.";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
        <header className="flex flex-col gap-2 text-center">
          <span className="text-sm text-white/60">{name}님의 결과</span>
          <h1 className="text-4xl font-bold">당신의 MBTI는 {type}</h1>
        </header>
        <section className="rounded-3xl bg-white/10 p-10 text-center shadow-xl backdrop-blur">
          <p className="text-lg text-white/80">{description}</p>
          <div className="mt-10 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">결과 공유하기</h2>
            <ResultShare type={type} name={name} />
          </div>
        </section>
        <div className="flex flex-col items-center gap-4 text-sm text-white/70">
          <p>다시 테스트하고 싶다면 아래 버튼을 눌러주세요.</p>
          <Link
            href="/"
            className="rounded-xl bg-amber-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            처음으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
