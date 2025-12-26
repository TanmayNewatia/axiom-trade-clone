import { memo } from "react";
import { cn } from "@/lib/utils";
import { AnimatedValue } from "@/components/price-update-display";

interface LiveDataStatsGridProps {
  totalTokens: number;
  liveTokens: number;
  totalVolume: string;
  avgChange: number;
  previousStats?: {
    totalTokens: number;
    liveTokens: number;
    totalVolume: string;
    avgChange: number;
  };
  className?: string;
}

export const LiveDataStatsGrid = memo(function LiveDataStatsGrid({
  totalTokens,
  liveTokens,
  totalVolume,
  avgChange,
  previousStats,
  className,
}: LiveDataStatsGridProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-3", className)}>
      <div className="flex flex-col items-center gap-1 p-2 bg-secondary/30 rounded-lg">
        <span className="text-xs text-muted-foreground">Total Tokens</span>
        <AnimatedValue
          value={totalTokens}
          previousValue={previousStats?.totalTokens}
          animationType="scale"
          className="text-sm font-semibold"
        />
      </div>

      <div className="flex flex-col items-center gap-1 p-2 bg-secondary/30 rounded-lg">
        <span className="text-xs text-muted-foreground">Live Updates</span>
        <AnimatedValue
          value={liveTokens}
          previousValue={previousStats?.liveTokens}
          animationType="scale"
          className="text-sm font-semibold text-green-600"
        />
      </div>

      <div className="flex flex-col items-center gap-1 p-2 bg-secondary/30 rounded-lg">
        <span className="text-xs text-muted-foreground">Total Volume</span>
        <AnimatedValue
          value={totalVolume}
          previousValue={previousStats?.totalVolume}
          animationType="slide"
          className="text-sm font-semibold"
        />
      </div>

      <div className="flex flex-col items-center gap-1 p-2 bg-secondary/30 rounded-lg">
        <span className="text-xs text-muted-foreground">Avg Change</span>
        <AnimatedValue
          value={`${avgChange >= 0 ? "+" : ""}${avgChange.toFixed(1)}%`}
          previousValue={
            previousStats
              ? `${
                  previousStats.avgChange >= 0 ? "+" : ""
                }${previousStats.avgChange.toFixed(1)}%`
              : undefined
          }
          animationType="glow"
          isPositive={avgChange >= 0}
          className={cn(
            "text-sm font-semibold",
            avgChange >= 0 ? "text-green-600" : "text-red-600"
          )}
        />
      </div>
    </div>
  );
});
