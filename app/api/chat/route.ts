import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { groq } from "@ai-sdk/groq";
import { openai } from "@ai-sdk/openai";
import { TBK_CONTRACT_SYSTEM, TAHLIYE_CHECK_SYSTEM } from "@/lib/prompts";

export const maxDuration = 60;

function resolveModel() {
  if (process.env.GROQ_API_KEY) {
    return groq("llama-3.3-70b-versatile");
  }
  if (process.env.OPENAI_API_KEY) {
    return openai("gpt-4o-mini");
  }
  return null;
}

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages as UIMessage[];
  const mode = (body.mode as string) || "contract";

  const model = resolveModel();
  if (!model) {
    return new Response(
      JSON.stringify({
        error:
          "Sunucu yapılandırması eksik: GROQ_API_KEY veya OPENAI_API_KEY tanımlayın.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const system =
    mode === "tahliye" ? TAHLIYE_CHECK_SYSTEM : TBK_CONTRACT_SYSTEM;

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    system,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
