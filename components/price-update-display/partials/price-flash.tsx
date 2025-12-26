import { memo } from "react";
import { cn } from "@/lib/utils";
import { usePriceFlash } from "../hooks";
import { AnimatedValue } from "./animated-value";

interface PriceFlashProps {
  price: string | number;
  previousPrice?: string | number;
  isIncreasing?: boolean;
  className?: string;
  showArrow?: boolean;
}

/**
 * PriceFlash component specifically for price updates with directional indicators
 */
export const PriceFlash = memo(function PriceFlash({
  price,
  previousPrice,
  isIncreasing,
  className,
  showArrow = false,
}: PriceFlashProps) {
  const { shouldShowArrow } = usePriceFlash(price, previousPrice, isIncreasing);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <AnimatedValue
        value={price}
        previousValue={previousPrice}
        isPositive={isIncreasing}
        animationType="flash"
        className={cn(
          "font-semibold",
          isIncreasing === true && "text-green-500",
          isIncreasing === false && "text-red-500"
        )}
      />
      {showArrow && shouldShowArrow && (
        <span
          className={cn(
            "text-xs transition-all duration-300",
            isIncreasing ? "text-green-500" : "text-red-500"
          )}
        >
          {isIncreasing ? "↗" : "↘"}
        </span>
      )}
    </div>
  );
});
