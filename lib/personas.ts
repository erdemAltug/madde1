import { Briefcase, Home, Laptop, Search } from "lucide-react";

export type PersonaId = "job_seeker" | "tenant" | "freelancer" | "general";

export const PERSONAS: {
  id: PersonaId;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "job_seeker",
    label: "İş arayan / Çalışan",
    hint: "Maaş, tazminat ve iş sözleşmesi riskleri",
    icon: Briefcase,
  },
  {
    id: "tenant",
    label: "Kiracı",
    hint: "Kira, depozito ve tahliye maddeleri",
    icon: Home,
  },
  {
    id: "freelancer",
    label: "Freelancer",
    hint: "Ödeme, fikri mülkiyet ve müşteri sözleşmeleri",
    icon: Laptop,
  },
  {
    id: "general",
    label: "Genel",
    hint: "Genel TBK odaklı ön analiz",
    icon: Search,
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
