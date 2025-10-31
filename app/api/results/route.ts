import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type ResultPayload = {
  name?: string | null;
  answers?: string[];
  result?: string;
};

export async function POST(request: Request) {
  const { name, answers, result } = (await request.json()) as ResultPayload;

  if (!name || !Array.isArray(answers) || answers.length !== 4 || !result) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.from("mbti_results").insert({
    name,
    answers,
    result,
  });

  if (error) {
    return NextResponse.json(
      { message: "결과 저장에 실패했습니다.", details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "ok" }, { status: 201 });
}
