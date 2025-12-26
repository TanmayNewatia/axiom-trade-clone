import { memo } from "react";
import { TooltipWrapper } from "../../common/tooltip-wrapper";
import type { Token } from "@/lib/token-data";

interface TokenStatsProps {
  token: Token;
  displayChange: number;
  isPositiveChange: boolean;
  isUpdating: boolean;
}

export const TokenStats = memo(function TokenStats({
  token,
  displayChange,
  isPositiveChange,
  isUpdating,
}: TokenStatsProps) {
  return (
    <div className="flex items-center justify-between text-xs gap-1.5 mt-1">
      <div className="flex items-center gap-1.5">
        <TooltipWrapper content={`${token.holders} holders`}>
          <span className="text-muted-foreground hover:text-foreground transition-colors cursor-help">
            {token.holders}
          </span>
        </TooltipWrapper>

        <span className="text-muted-foreground/30">•</span>

        <TooltipWrapper content="24h volume">
          <span className="text-muted-foreground hover:text-foreground transition-colors cursor-help">
            {token.volume24h}
          </span>
        </TooltipWrapper>
      </div>

      <TooltipWrapper content={`24h change: ${displayChange.toFixed(1)}%`}>
        <span
          className={`font-semibold cursor-help transition-all duration-200 ${
            isPositiveChange
              ? "text-green-500 hover:text-green-400"
              : "text-red-500 hover:text-red-400"
          } ${isUpdating ? "animate-pulse" : ""}`}
        >
          {displayChange.toFixed(1)}%
        </span>
      </TooltipWrapper>
    </div>
  );
});
