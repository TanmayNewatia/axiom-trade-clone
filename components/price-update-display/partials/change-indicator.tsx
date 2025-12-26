import { memo } from "react";
import { cn } from "@/lib/utils";
import { useChangeIndicator } from "../hooks";

interface ChangeIndicatorProps {
  change: number;
  previousChange?: number;
  className?: string;
  showSign?: boolean;
  suffix?: string;
}

/**
 * ChangeIndicator component for percentage changes with smooth transitions
 */
export const ChangeIndicator = memo(function ChangeIndicator({
  change,
  previousChange,
  className,
  showSign = true,
  suffix = "%",
}: ChangeIndicatorProps) {
  const { displayValue, animationClass, isAnimating, isPositive } =
    useChangeIndicator(change, previousChange, showSign, suffix);

  return (
    <span
      className={cn(
        "text-sm font-medium transition-colors duration-300",
        isPositive ? "text-green-500" : "text-red-500",
        animationClass,
        isAnimating && "transform",
        className
      )}
    >
      {displayValue}
    </span>
  );
});
