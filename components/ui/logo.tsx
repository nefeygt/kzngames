import { cn } from "@/lib/utils";

/**
 * KZN Games wordmark. Letters use currentColor so the mark can sit on dark or light surfaces;
 * the toggle pills and the mint "g" dot keep their brand colors.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="166 569 1308 533" className={className} role="img" aria-hidden="true">
      <rect x="234" y="577" width="412" height="78" rx="39" fill="#FF88E8" />
      <circle cx="607" cy="616" r="29" fill="#FFFFFF" />
      <rect x="709" y="751" width="757" height="78" rx="39" fill="#FFE066" />
      {/* Yellow switch flips on when the parent .group is hovered */}
      <circle
        cx="748"
        cy="790"
        r="29"
        fill="#FFFFFF"
        className="transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-[679px]"
      />
      <path
        fill="currentColor"
        d="M174 606h44v228h-44zM218 724l58-59h62l-68 69 78 100h-60l-50-64-20 20zM352 665h140v35l-74 90h74v44H352v-35l74-90h-74z"
      />
      <rect fill="currentColor" x="1194" y="909" width="124" height="30" />
      <g fill="none" stroke="currentColor" strokeWidth="44">
        <path d="M522 665V834M522 749a62 62 0 0 1 124 0v85" />
        <circle cx="584" cy="926" r="62" />
        <path d="M646 842v168a62 62 0 0 1-124 0" />
        <circle cx="757" cy="926" r="62" />
        <path d="M819 842v168" />
        <path d="M873 842v168M873 926a62 62 0 0 1 124 0v84M997 926a62 62 0 0 1 124 0v84" />
        <path d="M1296 926A62 62 0 1 0 1281.5 965.9" />
        <path d="M1444 902c0-30-22-42-47-42-27 0-47 12-47 32 0 20 20 28 47 32 29 4 47 14 47 32 0 20-20 32-47 32-27 0-47-12-47-40" />
      </g>
      <circle cx="584" cy="926" r="40" fill="#00F5C8" />
    </svg>
  );
}

export function Logo({ className, href = "#top" }: { className?: string; href?: string }) {
  return (
    <a href={href} className={cn("group inline-flex items-center text-white", className)} aria-label="KZN Games home">
      <LogoMark className="h-10 w-auto" />
    </a>
  );
}
