import { memo } from "react";
import { cn } from "@/lib/utils";

interface ConnectionDotProps {
  isConnected: boolean;
  isBlinking: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ConnectionDot = memo(function ConnectionDot({
  isConnected,
  isBlinking,
  size = "md",
  className,
}: ConnectionDotProps) {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div
      className={cn(
        "rounded-full transition-all duration-300",
        sizeClasses[size],
        isConnected
          ? isBlinking
            ? "bg-green-400 animate-pulse shadow-sm shadow-green-400/50"
            : "bg-green-500"
          : "bg-red-500",
        className
      )}
    />
  );
});
