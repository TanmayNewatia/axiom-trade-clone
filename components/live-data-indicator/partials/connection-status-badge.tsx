import { memo } from "react";
import { cn } from "@/lib/utils";
import { ConnectionDot } from "./connection-dot";

interface ConnectionStatusBadgeProps {
  isConnected: boolean;
  isBlinking?: boolean;
  className?: string;
}

export const ConnectionStatusBadge = memo(function ConnectionStatusBadge({
  isConnected,
  isBlinking = false,
  className,
}: ConnectionStatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
        isConnected
          ? "bg-green-500/10 text-green-600 border border-green-500/20"
          : "bg-red-500/10 text-red-600 border border-red-500/20",
        className
      )}
    >
      <ConnectionDot
        isConnected={isConnected}
        isBlinking={isBlinking}
        size="sm"
      />
      {isConnected ? "Live" : "Offline"}
    </div>
  );
});
