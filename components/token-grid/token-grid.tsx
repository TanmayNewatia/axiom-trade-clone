"use client";

import { memo } from "react";
import { useFilteredTokens } from "@/components/token-grid/hooks";
import type { FilterOptions } from "../pulse-section/hooks";
import { EmptyState, ColumnView, GridView } from "./partials";

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
  const { tokens, tokensBySection, hasResults, sectionCounts } =
    useFilteredTokens({
      sortBy,
      filters,
    });

  // Empty state
  if (!hasResults) {
    return <EmptyState />;
  }

  if (displayMode === "column") {
    return <ColumnView tokens={tokens} filters={filters} />;
  }

  // Default grid layout
  return (
    <GridView tokensBySection={tokensBySection} sectionCounts={sectionCounts} />
  );
});

export function TokenGrid(props: TokenGridProps) {
  return <TokenGridContent {...props} />;
}
