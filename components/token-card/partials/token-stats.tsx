import { memo } from "react";
import { TooltipWrapper } from "../../common/tooltip-wrapper";
import {
  AnimatedValue,
  ChangeIndicator,
} from "@/components/price-update-display";
import type { Token } from "@/lib/token-data";

interface TokenStatsProps {
  token: Token;
  displayChange: number;
  isPositiveChange: boolean;
  isUpdating: boolean;
  previousValues?: {
    price?: string;
    priceUSD?: string;
    change24h?: string;
    volume24h?: string;
    holders?: string;
  };
}

export const TokenStats = memo(function TokenStats({
  token,
  displayChange,
  isUpdating,
  previousValues,
}: TokenStatsProps) {
  return (
    <div className="flex items-center justify-between text-xs gap-1.5 mt-1">
      <div className="flex items-center gap-1.5">
        <TooltipWrapper content={`${token.holders} holders`}>
          <span className="text-muted-foreground hover:text-foreground transition-colors cursor-help">
            <AnimatedValue
              value={token.holders}
              previousValue={previousValues?.holders}
              animationType="scale"
            />
          </span>
        </TooltipWrapper>

        <span className="text-muted-foreground/30">•</span>

        <TooltipWrapper content="24h volume">
          <span className="text-muted-foreground hover:text-foreground transition-colors cursor-help">
            <AnimatedValue
              value={token.volume24h}
              previousValue={previousValues?.volume24h}
              animationType="scale"
            />
          </span>
        </TooltipWrapper>
      </div>

      <TooltipWrapper content={`24h change: ${displayChange.toFixed(1)}%`}>
        <ChangeIndicator
          change={displayChange}
          previousChange={
            previousValues?.change24h
              ? parseFloat(previousValues.change24h.replace(/[^-0-9.]/g, ""))
              : undefined
          }
          className={`cursor-help ${isUpdating ? "animate-pulse" : ""}`}
        />
      </TooltipWrapper>
    </div>
  );
});
