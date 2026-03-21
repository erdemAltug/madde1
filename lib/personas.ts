export type PersonaId = "job_seeker" | "tenant" | "freelancer" | "general";

export const PERSONAS: {
  id: PersonaId;
  label: string;
  hint: string;
}[] = [
  {
    id: "job_seeker",
    label: "İş arayan / Çalışan",
    hint: "Maaş, tazminat ve iş sözleşmesi riskleri",
  },
  {
    id: "tenant",
    label: "Kiracı",
    hint: "Kira, depozito ve tahliye maddeleri",
  },
  {
    id: "freelancer",
    label: "Freelancer",
    hint: "Ödeme, fikri mülkiyet ve müşteri sözleşmeleri",
  },
  {
    id: "general",
    label: "Genel",
    hint: "Genel TBK odaklı ön analiz",
  },
];

export function personaPromptFragment(persona: PersonaId): string {
  switch (persona) {
    case "job_seeker":
      return "Kullanıcı işçi/iş arayan perspektifinde. Maaş kesintisi, fazla mesai, tazminat, rekabet yasağı ve fesih maddelerine özellikle dikkat et.";
    case "tenant":
      return "Kullanıcı kiracı perspektifinde. Kira artışı, depozito, tahliye, tadilat ve aidat maddelerine özellikle dikkat et.";
    case "freelancer":
      return "Kullanıcı freelancer perspektifinde. Ödeme vadesi, gecikme faizi, teslim kabul, fikri mülkiyet ve sorumluluk sınırlarına özellikle dikkat et.";
    default:
      return "Genel kullanıcı perspektifi; sade ve anlaşılır dil kullan.";
  }
}
