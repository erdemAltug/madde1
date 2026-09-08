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
      return "Kullanıcı freelancer / serbest çalışan perspektifinde. Özellikle şu başlıklara odaklan: (1) kaynak kodu ve tasarım fikri mülkiyeti / IP devri, (2) revizyon hakkı sayısı ve süresi, (3) ödeme vadesi ve gecikme faizi / temerrüt, (4) NDA tek taraflılığı, (5) SLA ve orantısız cezai şart, (6) erken fesihte ödeme ve IP durumu. Riskleri bu preset’e göre önceliklendir.";
    default:
      return "Genel kullanıcı perspektifi; sade ve anlaşılır dil kullan.";
  }
}
