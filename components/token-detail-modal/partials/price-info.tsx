import { memo } from "react";
import type { Token } from "@/lib/token-data";

interface PriceInfoProps {
  token: Token;
  formatPrice: (price: string) => string;
}

export const PriceInfo = memo(function PriceInfo({
  token,
  formatPrice,
}: PriceInfoProps) {
  return (
    <div className="bg-secondary/20 rounded-lg p-4 border border-border/30">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground font-medium">
          Current Price
        </span>
        <span className="text-xl font-bold">{token.price}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">In USD</span>
        <span className="text-sm font-mono">
          ${formatPrice(token.priceUSD)}
        </span>
      </div>
    </div>
  );
});
