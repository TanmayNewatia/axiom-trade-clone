import { memo } from "react";
import { PopoverContent } from "@/components/ui/popover";
import type { Token } from "@/lib/token-data";

interface TokenInfoProps {
  token: Token;
}

export const TokenInfo = memo(function TokenInfo({ token }: TokenInfoProps) {
  return (
    <PopoverContent className="w-52 text-xs p-2.5" align="end">
      <div className="space-y-2">
        <div>
          <p className="font-semibold">{token.name}</p>
          <p className="text-muted-foreground">{token.fullName}</p>
        </div>
        <div className="pt-1.5 border-t border-border/50 space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Holders:</span>
            <span>{token.holders}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Listed:</span>
            <span>{token.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Volume:</span>
            <span>{token.volume24h}</span>
          </div>
        </div>
      </div>
    </PopoverContent>
  );
});
