import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { useAnimatedValue } from "../hooks";

interface AnimatedValueProps {
  value: string | number;
  previousValue?: string | number;
  className?: string;
  isPositive?: boolean;
  children?: React.ReactNode;
  animationType?: "flash" | "slide" | "scale" | "glow";
  duration?: number; // in milliseconds
}

/**
 * AnimatedValue component provides smooth transitions when values change
 * Supports multiple animation types and visual feedback
 */
export const AnimatedValue = memo(function AnimatedValue({
  value,
  previousValue,
  className,
  isPositive,
  children,
  animationType = "flash",
  duration = 600,
}: AnimatedValueProps) {
  const { displayValue, isAnimating, animationClass } = useAnimatedValue(
    value,
    previousValue,
    isPositive,
    animationType,
    duration
  );

  return (
    <span
      className={cn(
        "transition-all duration-300 ease-out",
        animationClass,
        isAnimating && "transform",
        className
      )}
    >
      {children || displayValue}
    </span>
  );
});
