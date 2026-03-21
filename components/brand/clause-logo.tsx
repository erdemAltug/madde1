import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Kare ikon boyutu (px) */
  size?: number;
  /** Clause + .ai yazısı */
  withWordmark?: boolean;
  wordmarkClassName?: string;
};

/**
 * Clause AI — soyut C + madde çizgisi (kalkan hissi), birincil mavi #005BEA
 */
export function ClauseLogo({
  className,
  size = 32,
  withWordmark = false,
  wordmarkClassName,
}: Props) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      {...(!withWordmark
        ? { role: "img" as const, "aria-label": "Clause logosu" }
        : {})}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden
      >
        <rect width="100" height="100" rx="20" fill="#005BEA" />
        <path
          d="M65 25C65 25 35 25 35 50C35 75 65 75 65 75"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="65" cy="25" r="5" fill="white" />
        <circle cx="65" cy="50" r="5" fill="white" />
        <circle cx="65" cy="75" r="5" fill="white" />
      </svg>
      {withWordmark ? (
        <span className="inline-flex items-baseline gap-0 font-sans leading-none">
          <span
            className={cn(
              "text-lg font-bold tracking-tight text-[#1A202C]",
              wordmarkClassName,
            )}
          >
            Clause
          </span>
          <span className="text-sm font-semibold text-[#005BEA]">.ai</span>
        </span>
      ) : null}
    </span>
  );
}
