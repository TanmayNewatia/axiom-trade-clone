import { useMemo } from "react";
import { useLiveTokens } from "../../hooks/use-live-tokens";
import type { Token } from "@/lib/token-data";
import type { FilterOptions } from "@/components/pulse-section/hooks";

type SortOption = "trending" | "newest" | "volume" | "holders" | "price";

interface UseFilteredTokensProps {
  sortBy: SortOption;
  filters: FilterOptions;
}

const parseNumericValue = (value: string, prefix = ""): number => {
  return Number.parseFloat(value.replace(prefix, "")) || 0;
};

const parseIntegerValue = (value: string): number => {
  return Number.parseInt(value, 10) || 0;
};

const applyFilters = (tokens: Token[], filters: FilterOptions): Token[] => {
  return tokens.filter((token) => {
    // Section filter
    if (!filters.sections.includes(token.section)) return false;

    // Search filter
    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        token.name,
        token.fullName,
        token.symbol,
        ...token.tags,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(query)) return false;
    }

    // Holders filter
    const holders = parseIntegerValue(token.holders);
    if (
      (filters.minHolders !== undefined && holders < filters.minHolders) ||
      (filters.maxHolders !== undefined &&
        filters.maxHolders !== Number.POSITIVE_INFINITY &&
        holders > filters.maxHolders)
    ) {
      return false;
    }

    // Price filter
    const price = parseNumericValue(token.priceUSD, "$");
    if (
      (filters.minPrice !== undefined && price < filters.minPrice) ||
      (filters.maxPrice !== undefined &&
        filters.maxPrice !== Number.POSITIVE_INFINITY &&
        price > filters.maxPrice)
    ) {
      return false;
    }

    // Change filter
    if (
      (filters.minChange !== undefined &&
        filters.minChange !== Number.NEGATIVE_INFINITY &&
        token.change24hValue < filters.minChange) ||
      (filters.maxChange !== undefined &&
        filters.maxChange !== Number.POSITIVE_INFINITY &&
        token.change24hValue > filters.maxChange)
    ) {
      return false;
    }

    return true;
  });
};

const applySorting = (tokens: Token[], sortBy: SortOption): Token[] => {
  const sortedTokens = [...tokens];

  switch (sortBy) {
    case "newest":
      return sortedTokens.sort((a, b) => {
        const aTime = parseIntegerValue(a.time);
        const bTime = parseIntegerValue(b.time);
        return aTime - bTime; // Ascending (newest first based on lower time values)
      });

    case "volume":
      return sortedTokens.sort((a, b) => {
        const aVol = a.volume24hValue || parseNumericValue(a.volume24h);
        const bVol = b.volume24hValue || parseNumericValue(b.volume24h);
        return bVol - aVol; // Descending
      });

    case "holders":
      return sortedTokens.sort((a, b) => {
        const aHolders = a.holdersValue || parseIntegerValue(a.holders);
        const bHolders = b.holdersValue || parseIntegerValue(b.holders);
        return bHolders - aHolders; // Descending
      });

    case "price":
      return sortedTokens.sort((a, b) => {
        const aPrice = parseNumericValue(a.priceUSD, "$");
        const bPrice = parseNumericValue(b.priceUSD, "$");
        return bPrice - aPrice; // Descending
      });

    case "trending":
    default:
      return sortedTokens.sort((a, b) => b.change24hValue - a.change24hValue); // Descending
  }
};

const groupTokensBySection = (tokens: Token[]) => {
  const sections = {
    "New Pairs": tokens.filter((t) => t.section === "New Pairs"),
    "Final Stretch": tokens.filter((t) => t.section === "Final Stretch"),
    Migrated: tokens.filter((t) => t.section === "Migrated"),
  };

  return sections;
};

export function useFilteredTokens({ sortBy, filters }: UseFilteredTokensProps) {
  const liveTokens = useLiveTokens();

  const filteredAndSortedTokens = useMemo(() => {
    const filtered = applyFilters(liveTokens, filters);
    const sorted = applySorting(filtered, sortBy);
    return sorted;
  }, [liveTokens, filters, sortBy]);

  const tokensBySection = useMemo(() => {
    return groupTokensBySection(filteredAndSortedTokens);
  }, [filteredAndSortedTokens]);

  const totalCount = filteredAndSortedTokens.length;
  const hasResults = totalCount > 0;

  const sectionCounts = useMemo(() => {
    return {
      "New Pairs": liveTokens.filter((t) => t.section === "New Pairs").length,
      "Final Stretch": liveTokens.filter((t) => t.section === "Final Stretch")
        .length,
      Migrated: liveTokens.filter((t) => t.section === "Migrated").length,
    };
  }, [liveTokens]);

  return {
    tokens: filteredAndSortedTokens,
    tokensBySection,
    totalCount,
    hasResults,
    sectionCounts,
  };
}
