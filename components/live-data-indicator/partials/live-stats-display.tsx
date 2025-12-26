import { memo } from "react";
import { Activity, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedValue } from "@/components/price-update-display";

interface LiveStatsDisplayProps {
  activeTokens: number;
  totalUpdates: number;
  lastUpdate?: number;
  timeSinceUpdate: string;
  className?: string;
}

export const LiveStatsDisplay = memo(function LiveStatsDisplay({
  activeTokens,
  totalUpdates,
  timeSinceUpdate,
  className,
}: LiveStatsDisplayProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-xs text-muted-foreground",
        className
      )}
    >
      <div className="flex items-center gap-1">
        <Activity className="w-3 h-3" />
        <span>
          <AnimatedValue value={activeTokens} animationType="scale" /> tokens
        </span>
      </div>

      <div className="flex items-center gap-1">
        <TrendingUp className="w-3 h-3" />
        <span>
          <AnimatedValue value={totalUpdates} animationType="scale" /> updates
        </span>
      </div>

      <span className="text-muted-foreground/70">{timeSinceUpdate}</span>
    </div>
  );
});
