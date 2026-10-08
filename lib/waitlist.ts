export const PLATFORM_OPTIONS = [
  { value: "ios", label: "iOS TestFlight" },
  { value: "android", label: "Android Early Access" },
  { value: "investor", label: "Investor / Publisher Inquiry" },
] as const;

export type Platform = (typeof PLATFORM_OPTIONS)[number]["value"];

export function isPlatform(value: unknown): value is Platform {
  return PLATFORM_OPTIONS.some((o) => o.value === value);
}
