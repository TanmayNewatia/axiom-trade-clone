import { memo } from "react";
import { Info } from "lucide-react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TokenInfo } from "./token-info";
import { AnimatedValue } from "@/components/price-update-display";
import type { Token } from "@/lib/token-data";

interface TokenHeaderProps {
  token: Token;
  isUpdating: boolean;
  previousValues?: {
    price?: string;
    priceUSD?: string;
    change24h?: string;
    volume24h?: string;
    holders?: string;
  };
}

export const TokenHeader = memo(function TokenHeader({
  token,
  isUpdating,
}: TokenHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3
            className={`font-semibold text-sm leading-tight transition-colors duration-200 ${
              isUpdating ? "text-primary" : "group-hover:text-primary"
            }`}
          >
            <AnimatedValue
              value={token.name}
              animationType="glow"
              className={isUpdating ? "text-primary" : ""}
            />
          </h3>
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-0.5 hover:bg-secondary/80 rounded transition-colors">
                <Info
                  size={10}
                  className="text-muted-foreground hover:text-foreground"
                />
              </button>
            </PopoverTrigger>
            <TokenInfo token={token} />
          </Popover>
        </div>
        {token.fullName !== token.name && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {token.fullName}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        <div className="text-sm font-semibold">{token.price}</div>
        <div className="text-xs text-muted-foreground">{token.priceUSD}</div>
      </div>
    </div>
  );
});
