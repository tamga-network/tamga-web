import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Sınıf adlarını birleştirir; çakışan Tailwind sınıflarında sonuncusu kazanır (shadcn/ui kalıbı). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
