"use client";

import type React from "react";

import { usePriceUpdate } from "@/hooks/use-price-updates";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PriceUpdateDisplayProps {
  tokenName: string;
  children: (
    isUpdating: boolean,
    isIncreasing: boolean | null
  ) => React.ReactNode;
}

export function PriceUpdateDisplay({
  tokenName,
  children,
}: PriceUpdateDisplayProps) {
  const priceUpdate = usePriceUpdate(tokenName);

  return (
    <div
      className={`transition-all duration-300 ${
        priceUpdate ? "ring-1 ring-primary/30" : ""
      }`}
    >
      {children(!!priceUpdate, priceUpdate?.isIncreasing ?? null)}
    </div>
  );
}

interface PriceBadgeProps {
  value: number;
  isIncreasing: boolean;
  animated?: boolean;
}

export function PriceBadge({
  value,
  isIncreasing,
  animated = true,
}: PriceBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-semibold transition-all duration-300 ${
        isIncreasing
          ? "bg-green-500/20 text-green-500"
          : "bg-red-500/20 text-red-500"
      } ${animated ? "animate-pulse" : ""}`}
    >
      {isIncreasing ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
      <span>{Math.abs(value).toFixed(2)}%</span>
    </div>
  );
}
