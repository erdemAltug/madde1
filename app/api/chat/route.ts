import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  TBK_CONTRACT_SYSTEM,
  TBK_CONTRACT_REFACTOR_FOLLOWUP,
  TBK_CONTRACT_SYSTEM_B2C_ANALYSIS,
  TBK_CONTRACT_SYSTEM_B2C_REFACTOR,
  TAHLIYE_CHECK_SYSTEM,
} from "@/lib/prompts";
import { personaPromptFragment, type PersonaId } from "@/lib/personas";
import { resolveLegalModel } from "@/lib/ai/models";

export const maxDuration = 60;

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages as UIMessage[];
  const mode = (body.mode as string) || "contract";
  const b2c = Boolean(body.b2c);
  const persona = (body.persona as PersonaId) || "general";
  const phase = (body.phase as string) || "analysis";

  const model = resolveLegalModel();
  if (!model) {
    return new Response(
      JSON.stringify({
        error:
          "Sunucu yapılandırması eksik: GROQ_API_KEY veya OPENAI_API_KEY tanımlayın.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let system: string;
  if (mode === "tahliye") {
    system = TAHLIYE_CHECK_SYSTEM;
  } else if (b2c) {
    if (phase === "refactor") {
      system = `${TBK_CONTRACT_SYSTEM_B2C_REFACTOR}\n\nPerspektif: ${personaPromptFragment(persona)}`;
    } else {
      system = `${TBK_CONTRACT_SYSTEM_B2C_ANALYSIS}\n\nPerspektif: ${personaPromptFragment(persona)}`;
    }
  } else if (phase === "refactor") {
    system = TBK_CONTRACT_REFACTOR_FOLLOWUP;
  } else {
    system = TBK_CONTRACT_SYSTEM;
  }

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    system,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
