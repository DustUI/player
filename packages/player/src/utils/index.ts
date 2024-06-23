import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./generic-as-prop";
export * from "./getTimeString";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
