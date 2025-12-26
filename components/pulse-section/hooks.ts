import { useState, useCallback, useEffect } from "react";

type SortOption = "trending" | "newest" | "volume" | "holders" | "price";

export interface FilterOptions {
  minHolders: number;
  maxHolders: number;
  minChange: number;
  maxChange: number;
  minPrice: number;
  maxPrice: number;
  sections: ("New Pairs" | "Final Stretch" | "Migrated")[];
  searchQuery: string;
}

const defaultFilters: FilterOptions = {
  minHolders: 0,
  maxHolders: Number.POSITIVE_INFINITY,
  minChange: Number.NEGATIVE_INFINITY,
  maxChange: Number.POSITIVE_INFINITY,
  minPrice: 0,
  maxPrice: Number.POSITIVE_INFINITY,
  sections: ["New Pairs", "Final Stretch", "Migrated"],
  searchQuery: "",
};

export const usePulseSection = () => {
  const [sortBy, setSortBy] = useState<SortOption>("trending");
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "New Pairs" | "Final Stretch" | "Migrated"
  >("New Pairs");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearchModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSort = useCallback((option: SortOption) => {
    setSortBy(option);
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters =
    filters.searchQuery ||
    filters.minHolders > 0 ||
    filters.maxHolders < Number.POSITIVE_INFINITY ||
    filters.minChange > Number.NEGATIVE_INFINITY ||
    filters.maxChange < Number.POSITIVE_INFINITY ||
    filters.minPrice > 0 ||
    filters.maxPrice < Number.POSITIVE_INFINITY ||
    filters.sections.length < 3;

  return {
    sortBy,
    filters,
    showFilterModal,
    showSearchModal,
    isLoading,
    activeTab,
    handleSort,
    handleFilterChange,
    resetFilters,
    hasActiveFilters,
    setShowFilterModal,
    setShowSearchModal,
    setActiveTab,
  };
};
