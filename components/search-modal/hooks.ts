import { useState, useEffect, useCallback } from "react";
import { tokenData, type Token } from "@/lib/token-data";

interface UseSearchModalProps {
  onOpenChange: (open: boolean) => void;
  onTokenSelect?: (token: Token) => void;
}

export const useSearchModal = ({
  onOpenChange,
  onTokenSelect,
}: UseSearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Token[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularTokens] = useState<Token[]>(
    tokenData
      .filter((token) => token.change24hValue > 50)
      .sort((a, b) => b.volume24hValue - a.volume24hValue)
      .slice(0, 6)
  );

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("token-search-recent");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("token-search-recent", JSON.stringify(updated));
    },
    [recentSearches]
  );

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = tokenData
      .filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.fullName.toLowerCase().includes(query) ||
          token.tags.some((tag) => tag.toLowerCase().includes(query))
      )
      .slice(0, 10); // Limit to 10 results

    setSearchResults(results);
  }, [searchQuery]);

  const handleTokenSelect = (token: Token) => {
    saveRecentSearch(token.symbol);
    onTokenSelect?.(token);
    onOpenChange(false);
    setSearchQuery("");
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("token-search-recent");
  };

  const removeRecentSearch = (query: string) => {
    const updated = recentSearches.filter((s) => s !== query);
    setRecentSearches(updated);
    localStorage.setItem("token-search-recent", JSON.stringify(updated));
  };

  // Reset search when modal closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [open]);

  const formatPrice = (priceUSD: string) => {
    const price = parseFloat(priceUSD.replace("$", ""));
    if (price < 0.001) {
      return price.toExponential(2);
    }
    return price.toFixed(6);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    recentSearches,
    popularTokens,
    handleTokenSelect,
    handleRecentSearch,
    clearRecentSearches,
    removeRecentSearch,
    formatPrice,
  };
};
