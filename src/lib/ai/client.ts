/**
 * AI API Client
 * GPT와 Gemini API를 지원하는 통합 클라이언트
 */

export type AIProvider = "gpt" | "gemini";

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

export interface AIRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model: string;
}

/**
 * GPT API 호출
 */
async function callGPT(
  apiKey: string,
  prompt: string,
  options: { maxTokens?: number; temperature?: number; model?: string } = {}
): Promise<string> {
  const model = options.model || "gpt-3.5-turbo";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: options.maxTokens || 500,
      temperature: options.temperature || 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
    throw new Error(`GPT API Error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}

/**
 * Gemini API 호출
 */
async function callGemini(
  apiKey: string,
  prompt: string,
  options: { maxTokens?: number; temperature?: number; model?: string } = {}
): Promise<string> {
  const model = options.model || "gemini-pro";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: options.maxTokens || 500,
        temperature: options.temperature || 0.7,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
    throw new Error(`Gemini API Error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

/**
 * AI API 호출 (통합)
 */
export async function callAI(
  config: AIConfig,
  request: AIRequest
): Promise<AIResponse> {
  const { provider, apiKey, model } = config;
  const { prompt, maxTokens, temperature } = request;

  let content: string;

  if (provider === "gpt") {
    content = await callGPT(apiKey, prompt, { maxTokens, temperature, model });
  } else if (provider === "gemini") {
    content = await callGemini(apiKey, prompt, { maxTokens, temperature, model });
  } else {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }

  return {
    content,
    provider,
    model: model || (provider === "gpt" ? "gpt-3.5-turbo" : "gemini-pro"),
  };
}

