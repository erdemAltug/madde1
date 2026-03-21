import { NextResponse } from "next/server";
import { generateText } from "ai";
import {
  contractGeneratorSystem,
  type ContractTemplateId,
} from "@/lib/prompts";
import { resolveLegalModel } from "@/lib/ai/models";

export const maxDuration = 60;

export async function POST(req: Request) {
  const model = resolveLegalModel();
  if (!model) {
    return NextResponse.json(
      { error: "Model yapılandırması eksik" },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const template = body.template as ContractTemplateId;
  if (!template || !["freelance", "rental", "consulting"].includes(template)) {
    return NextResponse.json({ error: "Geçersiz şablon" }, { status: 400 });
  }

  const fields = {
    partyA: String(body.partyA || "").slice(0, 500),
    partyB: String(body.partyB || "").slice(0, 500),
    amount: String(body.amount || "").slice(0, 120),
    currency: String(body.currency || "TRY").slice(0, 16),
    deadline: String(body.deadline || "").slice(0, 200),
    specialClauses: String(body.specialClauses || "").slice(0, 4000),
  };

  const { text } = await generateText({
    model,
    maxOutputTokens: 6000,
    system: contractGeneratorSystem(template),
    prompt: `Form verileri (Türkçe sözleşme taslağı üret):\n${JSON.stringify(fields, null, 2)}`,
  });

  return NextResponse.json({ markdown: text });
}
