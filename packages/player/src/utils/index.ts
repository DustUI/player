import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
export const twMerge = extendTailwindMerge({
  prefix: "dp-",
});

export * from "./generic-as-prop";
export * from "./getTimeString";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
