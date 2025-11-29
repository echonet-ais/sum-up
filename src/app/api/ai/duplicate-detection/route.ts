import { NextRequest, NextResponse } from "next/server";
import { callAI, type AIProvider } from "@/lib/ai/client";
import { rateLimiter } from "@/lib/ai/rate-limiter";
import { createDuplicateDetectionPrompt } from "@/lib/ai/prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, existingIssues, userId } = body;

    // 필수 파라미터 검증
    if (!title || !existingIssues || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters: title, existingIssues, userId" },
        { status: 400 }
      );
    }

    // 기존 이슈가 없으면 중복 없음
    if (!Array.isArray(existingIssues) || existingIssues.length === 0) {
      return NextResponse.json({ duplicates: [] });
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

    // 최대 10개 이슈만 비교 (토큰 절약)
    const issuesToCompare = existingIssues.slice(0, 10);

    // 프롬프트 생성
    const prompt = createDuplicateDetectionPrompt(title, description || "", issuesToCompare);

    // AI 호출
    const result = await callAI(
      {
        provider,
        apiKey,
        model: process.env.AI_MODEL,
      },
      {
        prompt,
        maxTokens: 50,
        temperature: 0.3,
      }
    );

    // Rate Limit 기록
    rateLimiter.recordCall(userId);

    // 결과 파싱
    const response = result.content.trim().toLowerCase();
    if (response === "없음" || response === "none" || response === "") {
      return NextResponse.json({ duplicates: [] });
    }

    // 이슈 ID 추출
    const duplicateIds = response
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0)
      .slice(0, 3); // 최대 3개

    // 실제 이슈 ID와 매칭
    const duplicates = existingIssues.filter((issue: { id: string }) =>
      duplicateIds.some((id) => id === issue.id || id === issue.id.toLowerCase())
    );

    return NextResponse.json({
      duplicates: duplicates.slice(0, 3), // 최대 3개
      provider: result.provider,
      model: result.model,
    });
  } catch (error) {
    console.error("AI Duplicate Detection Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

