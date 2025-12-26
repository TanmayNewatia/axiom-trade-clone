import { memo } from "react";
import type { Token } from "@/lib/token-data";

interface TokenHeaderProps {
  token: Token;
}

export const TokenHeader = memo(function TokenHeader({
  token,
}: TokenHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-linear-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center text-xl font-bold border border-primary/20">
        {token.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-lg font-bold truncate">{token.name}</p>
        <p className="text-sm text-muted-foreground font-normal truncate">
          {token.fullName}
        </p>
      </div>
    </div>
  );
});
