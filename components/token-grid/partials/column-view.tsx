import { memo } from "react";
import { TokenCard } from "../../token-card/token-card";
import { useFilteredTokens } from "../hooks";
import type { FilterOptions } from "../../pulse-section/hooks";

interface ColumnViewProps {
  tokens: ReturnType<typeof useFilteredTokens>["tokens"];
  filters: FilterOptions;
}

export const ColumnView = memo(function ColumnView({
  tokens,
  filters,
}: ColumnViewProps) {
  return (
    <section className="flex-1 overflow-y-auto min-w-80 pr-2">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3 sticky top-0 bg-background/80 backdrop-blur-sm z-10 pb-2">
        <h2 className="text-sm sm:text-base font-semibold">
          {filters.sections[0] || "All Tokens"}
        </h2>
        <span className="text-xs sm:text-sm text-muted-foreground px-2 py-1 bg-secondary/50 rounded">
          {tokens.length}
        </span>
      </div>

      {/* Token list */}
      <div className="space-y-2">
        {tokens.map((token) => (
          <TokenCard key={`${token.section}-${token.name}`} token={token} />
        ))}
      </div>
    </section>
  );
});
