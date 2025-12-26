import { memo } from "react";
import { cn } from "@/lib/utils";
import { useTimeSinceUpdate } from "../hooks";

interface LiveIndicatorProps {
  isConnected: boolean;
  lastUpdate?: number;
  className?: string;
}

/**
 * LiveIndicator shows the connection status of live data
 */
export const LiveIndicator = memo(function LiveIndicator({
  isConnected,
  lastUpdate,
  className,
}: LiveIndicatorProps) {
  const timeSinceUpdate = useTimeSinceUpdate(lastUpdate);

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <div
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-300",
          isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
        )}
      />
      <span
        className={cn(
          "transition-colors duration-300",
          isConnected ? "text-green-600" : "text-red-600"
        )}
      >
        {isConnected ? "LIVE" : "OFFLINE"}
      </span>
      {lastUpdate && (
        <span className="text-muted-foreground">{timeSinceUpdate}</span>
      )}
    </div>
  );
});
