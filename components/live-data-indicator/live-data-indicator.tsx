"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { useLiveDataIndicator, useLiveDataStats } from "./hooks";
import {
  ConnectionDot,
  ConnectionStatus,
  LiveStatsDisplay,
  LiveDataStatsGrid,
  ConnectionStatusBadge,
} from "./partials";

interface LiveDataIndicatorProps {
  isConnected?: boolean;
  lastUpdate?: number;
  activeTokens?: number;
  totalUpdates?: number;
  className?: string;
  variant?: "compact" | "detailed" | "minimal";
}

const LiveDataIndicatorComponent = memo(function LiveDataIndicatorComponent({
  isConnected = true,
  lastUpdate,
  activeTokens = 0,
  totalUpdates = 0,
  className,
  variant = "compact",
}: LiveDataIndicatorProps) {
  const { timeSinceUpdate, isBlinking } = useLiveDataIndicator(
    isConnected,
    lastUpdate,
    activeTokens,
    totalUpdates
  );

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <ConnectionDot
          isConnected={isConnected}
          isBlinking={isBlinking}
          size="sm"
        />
        <span className="text-xs text-muted-foreground">
          {isConnected ? "LIVE" : "OFFLINE"}
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1 rounded-md bg-secondary/30 border border-border/50",
          className
        )}
      >
        <div className="flex items-center gap-1.5">
          <ConnectionDot isConnected={isConnected} isBlinking={isBlinking} />
          <span
            className={cn(
              "text-xs font-medium",
              isConnected ? "text-green-600" : "text-red-600"
            )}
          >
            {isConnected ? "LIVE" : "OFFLINE"}
          </span>
        </div>

        {lastUpdate && (
          <span className="text-xs text-muted-foreground">
            {timeSinceUpdate}
          </span>
        )}
      </div>
    );
  }

  // Detailed variant
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/20 border border-border/30",
        className
      )}
    >
      <ConnectionStatus isConnected={isConnected} isBlinking={isBlinking} />

      {/* Separator */}
      <div className="w-px h-4 bg-border/50" />

      <LiveStatsDisplay
        activeTokens={activeTokens}
        totalUpdates={totalUpdates}
        timeSinceUpdate={timeSinceUpdate}
      />
    </div>
  );
});

interface LiveDataStatsProps {
  totalTokens: number;
  liveTokens: number;
  totalVolume: string;
  avgChange: number;
  className?: string;
}

const LiveDataStatsComponent = memo(function LiveDataStatsComponent({
  totalTokens,
  liveTokens,
  totalVolume,
  avgChange,
  className,
}: LiveDataStatsProps) {
  const { previousStats } = useLiveDataStats(
    totalTokens,
    liveTokens,
    totalVolume,
    avgChange
  );

  return (
    <LiveDataStatsGrid
      totalTokens={totalTokens}
      liveTokens={liveTokens}
      totalVolume={totalVolume}
      avgChange={avgChange}
      previousStats={previousStats}
      className={className}
    />
  );
});

export {
  LiveDataIndicatorComponent as LiveDataIndicator,
  ConnectionStatusBadge,
  LiveDataStatsComponent as LiveDataStats,
};
