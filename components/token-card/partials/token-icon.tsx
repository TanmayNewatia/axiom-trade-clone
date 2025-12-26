import { memo } from "react";
import type { Token } from "@/lib/token-data";

interface TokenIconProps {
  token: Token;
  isUpdating: boolean;
}

export const TokenIcon = memo(function TokenIcon({
  token,
  isUpdating,
}: TokenIconProps) {
  return (
    <div
      className={`w-12 flex items-center justify-center bg-linear-to-b from-primary/15 to-primary/5 border-r border-border/50 transition-all duration-200 ${
        isUpdating
          ? "bg-linear-to-b from-primary/25 to-primary/10 border-primary/30"
          : "group-hover:from-primary/20 group-hover:to-primary/8"
      }`}
    >
      <span className="text-lg font-bold">{token.icon}</span>
    </div>
  );
});
