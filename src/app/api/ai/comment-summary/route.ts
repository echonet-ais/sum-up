import { NextRequest, NextResponse } from "next/server";
import { callAI, type AIProvider } from "@/lib/ai/client";
import { rateLimiter } from "@/lib/ai/rate-limiter";
import { aiCache } from "@/lib/ai/cache";
import { createCommentSummaryPrompt } from "@/lib/ai/prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { issueId, issueTitle, issueDescription, comments, userId } = body;

    // 필수 파라미터 검증
    if (!issueId || !issueTitle || !comments || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters: issueId, issueTitle, comments, userId" },
        { status: 400 }
      );
    }

    // 댓글이 5개 미만인 경우 에러
    if (!Array.isArray(comments) || comments.length < 5) {
      return NextResponse.json(
        { error: "At least 5 comments are required" },
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

    // 캐시 키 생성 (댓글 내용 해시)
    const commentsText = comments
      .map((c: { content: string }) => c.content)
      .join("\n");
    const cached = aiCache.get(issueId, "comment-summary", commentsText);
    if (cached) {
      return NextResponse.json({ content: cached, cached: true });
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
    const prompt = createCommentSummaryPrompt(
      issueTitle,
      issueDescription || "",
      comments.map((c: { author: { name: string }; content: string; createdAt: string }) => ({
        author: c.author?.name || "Unknown",
        content: c.content,
        createdAt: c.createdAt,
      }))
    );

    // AI 호출
    const result = await callAI(
      {
        provider,
        apiKey,
        model: process.env.AI_MODEL,
      },
      {
        prompt,
        maxTokens: 300,
        temperature: 0.7,
      }
    );

    // 캐시에 저장
    aiCache.set(issueId, "comment-summary", commentsText, result.content);

    // Rate Limit 기록
    rateLimiter.recordCall(userId);

    return NextResponse.json({
      content: result.content,
      provider: result.provider,
      model: result.model,
      cached: false,
    });
  } catch (error) {
    console.error("AI Comment Summary Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

