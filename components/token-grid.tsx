"use client";

import { useMemo, memo } from "react";
import { TokenCard } from "./token-card";
import { tokenData } from "@/lib/token-data";
import type { FilterOptions } from "./pulse-section";

type SortOption = "trending" | "newest" | "volume" | "holders" | "price";

interface TokenGridProps {
  sortBy: SortOption;
  displayMode: "grid" | "list" | "column";
  filters: FilterOptions;
}

const TokenGridContent = memo(function TokenGridContent({
  sortBy,
  displayMode,
  filters,
}: TokenGridProps) {
  const filteredAndSortedTokens = useMemo(() => {
    let tokens = [...tokenData];

    // Apply filters
    tokens = tokens.filter((token) => {
      // Section filter
      if (!filters.sections.includes(token.section)) return false;

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (
          !token.name.toLowerCase().includes(query) &&
          !token.fullName.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Holders filter
      const holders = Number.parseInt(token.holders) || 0;
      if (holders < filters.minHolders || holders > filters.maxHolders)
        return false;

      // Price filter
      const price = Number.parseFloat(token.priceUSD.replace("$", "")) || 0;
      if (price < filters.minPrice || price > filters.maxPrice) return false;

      // Change filter
      if (
        token.change24hValue < filters.minChange ||
        token.change24hValue > filters.maxChange
      )
        return false;

      return true;
    });

    // Apply sorting
    switch (sortBy) {
      case "newest":
        return tokens.sort((a, b) => {
          const aTime = Number.parseInt(a.time);
          const bTime = Number.parseInt(b.time);
          return aTime - bTime;
        });
      case "volume":
        return tokens.sort((a, b) => {
          const aVol = Number.parseFloat(a.volume24h) || 0;
          const bVol = Number.parseFloat(b.volume24h) || 0;
          return bVol - aVol;
        });
      case "holders":
        return tokens.sort((a, b) => {
          const aHolders = Number.parseInt(a.holders) || 0;
          const bHolders = Number.parseInt(b.holders) || 0;
          return bHolders - aHolders;
        });
      case "price":
        return tokens.sort((a, b) => {
          const aPrice = Number.parseFloat(a.priceUSD.replace("$", "")) || 0;
          const bPrice = Number.parseFloat(b.priceUSD.replace("$", "")) || 0;
          return bPrice - aPrice;
        });
      case "trending":
      default:
        return tokens;
    }
  }, [sortBy, filters]);

  // Empty state
  if (filteredAndSortedTokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-2">No tokens found</div>
        <p className="text-xs sm:text-sm text-muted-foreground/60">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  if (displayMode === "column") {
    return (
      <section className="flex-1 overflow-y-auto min-w-80 pr-2">
        {/* Column header */}
        <div className="flex items-center justify-between mb-3 sticky top-0 bg-background/80 backdrop-blur-sm z-10 pb-2">
          <h2 className="text-sm sm:text-base font-semibold">
            {filters.sections[0]}
          </h2>
          <span className="text-xs sm:text-sm text-muted-foreground px-2 py-1 bg-secondary/50 rounded">
            {filteredAndSortedTokens.length}
          </span>
        </div>

        {/* Token list */}
        <div className="space-y-2">
          {filteredAndSortedTokens.map((token) => (
            <TokenCard key={`${token.section}-${token.name}`} token={token} />
          ))}
        </div>
      </section>
    );
  }

  // Default grid layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-max">
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-semibold">New Pairs</h2>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {tokenData.filter((t) => t.section === "New Pairs").length}
          </span>
        </div>
        <div className="space-y-2">
          {filteredAndSortedTokens
            .filter((t) => t.section === "New Pairs")
            .map((token) => (
              <TokenCard key={`${token.section}-${token.name}`} token={token} />
            ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-semibold">Final Stretch</h2>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {tokenData.filter((t) => t.section === "Final Stretch").length}
          </span>
        </div>
        <div className="space-y-2">
          {filteredAndSortedTokens
            .filter((t) => t.section === "Final Stretch")
            .map((token) => (
              <TokenCard key={`${token.section}-${token.name}`} token={token} />
            ))}
        </div>
      </section>

      <section className="space-y-3 sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-semibold">Migrated</h2>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {tokenData.filter((t) => t.section === "Migrated").length}
          </span>
        </div>
        <div className="space-y-2">
          {filteredAndSortedTokens
            .filter((t) => t.section === "Migrated")
            .map((token) => (
              <TokenCard key={`${token.section}-${token.name}`} token={token} />
            ))}
        </div>
      </section>
    </div>
  );
});

export function TokenGrid(props: TokenGridProps) {
  return <TokenGridContent {...props} />;
}
