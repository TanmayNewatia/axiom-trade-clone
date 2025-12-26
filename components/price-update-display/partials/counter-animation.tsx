import { memo } from "react";
import { cn } from "@/lib/utils";
import { useCounterAnimation } from "../hooks";

interface CounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  formatter?: (value: number) => string;
  className?: string;
}

/**
 * CounterAnimation provides smooth number transitions
 */
export const CounterAnimation = memo(function CounterAnimation({
  from,
  to,
  duration = 1000,
  formatter,
  className,
}: CounterAnimationProps) {
  const { displayValue } = useCounterAnimation(from, to, duration, formatter);

  return <span className={cn("tabular-nums", className)}>{displayValue}</span>;
});
