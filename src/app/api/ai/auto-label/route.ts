import { NextRequest, NextResponse } from "next/server";
import { callAI, type AIProvider } from "@/lib/ai/client";
import { rateLimiter } from "@/lib/ai/rate-limiter";
import { createAutoLabelPrompt } from "@/lib/ai/prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, availableLabels, userId } = body;

    // 필수 파라미터 검증
    if (!title || !availableLabels || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters: title, availableLabels, userId" },
        { status: 400 }
      );
    }

    // Rate Limit 체크
    const limitCheck = rateLimiter.checkLimit(userId);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          remaining: 0,
          resetAt: limitCheck.resetAt,
        },
        { status: 429 }
      );
    }

    // AI 설정 가져오기
    const provider = (process.env.AI_PROVIDER || "gpt") as AIProvider;
    const apiKey =
      provider === "gpt"
        ? process.env.OPENAI_API_KEY
        : process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: `AI API key not configured for provider: ${provider}` },
        { status: 500 }
      );
    }

    // 프롬프트 생성
    const prompt = createAutoLabelPrompt(title, description || "", availableLabels);

    // AI 호출
    const result = await callAI(
      {
        provider,
        apiKey,
        model: process.env.AI_MODEL,
      },
      {
        prompt,
        maxTokens: 100,
        temperature: 0.5,
      }
    );

    // Rate Limit 기록
    rateLimiter.recordCall(userId);

    // 라벨 이름 파싱 (쉼표로 구분)
    const recommendedLabels = result.content
      .split(",")
      .map((label) => label.trim())
      .filter((label) => label.length > 0)
      .slice(0, 3); // 최대 3개

    // 사용 가능한 라벨 중에서만 필터링
    const validLabels = availableLabels.filter((label: { name: string }) =>
      recommendedLabels.some(
        (rec) => rec.toLowerCase() === label.name.toLowerCase()
      )
    );

    return NextResponse.json({
      labels: validLabels,
      provider: result.provider,
      model: result.model,
    });
  } catch (error) {
    console.error("AI Auto-Label Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

