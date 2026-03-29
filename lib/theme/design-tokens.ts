/**
 * Design Tokens - 3 Distinct Visual Directions
 * Choose ONE theme to apply, or use as reference to create custom
 */

export type ThemeName = "navy-mint" | "indigo-cyan" | "charcoal-violet";

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  borderLight: string;
  heading: string;
  text: string;
  textMuted: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  focus: string;
  overlay: string;
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  colors: ThemeColors;
  tailwind: Record<string, string>;
}

// ============================================
// THEME A: Deep Navy + Mint (Premium Legal)
// ============================================
const navyMintTheme: Theme = {
  name: "navy-mint",
  displayName: "Deep Navy + Mint",
  description: "Premium legal / trust / high-value service",
  colors: {
    primary: "#1E3A5F",
    primaryHover: "#0F172A",
    primaryForeground: "#B8F4E0",
    accent: "#10B981",
    accentForeground: "#064E3B",
    background: "#F5F7FA",
    surface: "#FFFFFF",
    surfaceElevated: "#FFFFFF",
    border: "#E2E8F0",
    borderLight: "#F1F5F9",
    heading: "#0F172A",
    text: "#1E293B",
    textMuted: "#64748B",
    success: "#059669",
    successLight: "#D1FAE5",
    warning: "#D97706",
    warningLight: "#FEF3C7",
    danger: "#DC2626",
    dangerLight: "#FEE2E2",
    focus: "#10B981",
    overlay: "rgba(15, 23, 42, 0.6)",
  },
  tailwind: {
    "primary": "bg-[#1E3A5F]",
    "primary-hover": "hover:bg-[#0F172A]",
    "primary-foreground": "text-[#B8F4E0]",
    "accent": "bg-[#10B981]",
    "accent-light": "bg-[#D1FAE5]",
    "surface": "bg-white",
    "heading": "text-[#0F172A]",
    "text": "text-[#1E293B]",
    "muted": "text-[#64748B]",
    "border": "border-[#E2E8F0]",
    "focus-ring": "focus:ring-[#10B981]",
  },
};

// ============================================
// THEME B: Indigo + Cyan (Modern AI/Tech)
// ============================================
const indigoCyanTheme: Theme = {
  name: "indigo-cyan",
  displayName: "Indigo + Cyan",
  description: "Modern AI / tech / developer-friendly",
  colors: {
    primary: "#4F46E5",
    primaryHover: "#4338CA",
    primaryForeground: "#FFFFFF",
    accent: "#06B6D4",
    accentForeground: "#0E7490",
    background: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceElevated: "#FFFFFF",
    border: "#E5E7EB",
    borderLight: "#F3F4F6",
    heading: "#111827",
    text: "#1F2937",
    textMuted: "#6B7280",
    success: "#10B981",
    successLight: "#D1FAE5",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    danger: "#EF4444",
    dangerLight: "#FEE2E2",
    focus: "#4F46E5",
    overlay: "rgba(17, 24, 39, 0.6)",
  },
  tailwind: {
    "primary": "bg-indigo-600",
    "primary-hover": "hover:bg-indigo-700",
    "primary-foreground": "text-white",
    "accent": "bg-cyan-500",
    "accent-light": "bg-cyan-100",
    "surface": "bg-white",
    "heading": "text-gray-900",
    "text": "text-gray-700",
    "muted": "text-gray-500",
    "border": "border-gray-200",
    "focus-ring": "focus:ring-indigo-500",
  },
};

// ============================================
// THEME C: Charcoal + Soft Violet (Minimal SaaS)
// ============================================
const charcoalVioletTheme: Theme = {
  name: "charcoal-violet",
  displayName: "Charcoal + Soft Violet",
  description: "Minimal / productized SaaS / clean",
  colors: {
    primary: "#3F3F46",
    primaryHover: "#27272A",
    primaryForeground: "#FAFAFA",
    accent: "#8B5CF6",
    accentForeground: "#5B21B6",
    background: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceElevated: "#FFFFFF",
    border: "#E4E4E7",
    borderLight: "#F4F4F5",
    heading: "#18181B",
    text: "#3F3F46",
    textMuted: "#71717A",
    success: "#22C55E",
    successLight: "#DCFCE7",
    warning: "#EAB308",
    warningLight: "#FEF9C3",
    danger: "#EF4444",
    dangerLight: "#FEE2E2",
    focus: "#8B5CF6",
    overlay: "rgba(24, 24, 27, 0.6)",
  },
  tailwind: {
    "primary": "bg-zinc-700",
    "primary-hover": "hover:bg-zinc-800",
    "primary-foreground": "text-zinc-100",
    "accent": "bg-violet-500",
    "accent-light": "bg-violet-100",
    "surface": "bg-white",
    "heading": "text-zinc-900",
    "text": "text-zinc-700",
    "muted": "text-zinc-500",
    "border": "border-zinc-200",
    "focus-ring": "focus:ring-violet-500",
  },
};

export const themes = {
  "navy-mint": navyMintTheme,
  "indigo-cyan": indigoCyanTheme,
  "charcoal-violet": charcoalVioletTheme,
} as const;

export const activeTheme = themes["navy-mint"]; // Change this to switch themes

export default themes;
