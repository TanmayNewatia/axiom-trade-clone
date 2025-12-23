"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Search,
  Settings,
  Volume2,
  BarChart3,
  Eye,
  Filter,
} from "lucide-react";
import { TokenGrid } from "./token-grid";
import { SortDropdown } from "./sort-dropdown";
import { FilterModal } from "./filter-modal";
import { TokenGridSkeleton } from "./token-card-skeleton";
import { ErrorBoundary } from "./error-boundary";

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

export function PulseSection() {
  const [sortBy, setSortBy] = useState<SortOption>("trending");
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "New Pairs" | "Final Stretch" | "Migrated"
  >("New Pairs");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
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

  return (
    <ErrorBoundary>
      <div className="w-full h-full flex flex-col">
        <div className="border-b border-border px-3 sm:px-6 py-3 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            {/* Left section */}
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-semibold">Pulse</h1>
              <button
                className="p-1.5 hover:bg-secondary rounded transition-colors"
                title="List view"
              >
                <Settings size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Right section - Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2">
              {/* Search */}
              <div className="flex-1 sm:flex-none relative min-w-[140px]">
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    handleFilterChange({
                      ...filters,
                      searchQuery: e.target.value,
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-secondary border border-border rounded text-xs placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search
                  size={12}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
              </div>

              {/* Filter button */}
              <button
                onClick={() => setShowFilterModal(true)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs transition-colors flex-shrink-0 ${
                  hasActiveFilters
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
              >
                <Filter size={14} />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* Sort dropdown */}
              <SortDropdown value={sortBy} onChange={handleSort} />

              <button
                className="p-1.5 hover:bg-secondary rounded transition-colors flex-shrink-0"
                title="Chart"
              >
                <BarChart3 size={16} className="text-muted-foreground" />
              </button>

              <button
                className="p-1.5 hover:bg-secondary rounded transition-colors flex-shrink-0"
                title="Volume"
              >
                <Volume2 size={16} className="text-muted-foreground" />
              </button>

              <button
                className="p-1.5 hover:bg-secondary rounded transition-colors flex-shrink-0"
                title="Eye"
              >
                <Eye size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex-1 overflow-auto p-3 sm:p-6">
            <TokenGridSkeleton />
          </div>
        ) : (
          <>
            {/* Desktop: Three-column layout with individual scrollable sections */}
            <div className="hidden lg:flex flex-1 overflow-hidden gap-4 sm:gap-6 p-3 sm:p-6">
              <TokenGrid
                sortBy={sortBy}
                displayMode="column"
                filters={{
                  ...filters,
                  sections: ["New Pairs"],
                }}
              />
              <TokenGrid
                sortBy={sortBy}
                displayMode="column"
                filters={{
                  ...filters,
                  sections: ["Final Stretch"],
                }}
              />
              <TokenGrid
                sortBy={sortBy}
                displayMode="column"
                filters={{
                  ...filters,
                  sections: ["Migrated"],
                }}
              />
            </div>

            {/* Mobile/Tablet: Tab-based layout */}
            <div className="lg:hidden flex flex-1 flex-col overflow-hidden">
              {/* Tab buttons */}
              <div className="flex items-center gap-1 px-3 sm:px-6 py-2 border-b border-border bg-secondary/30">
                {["New Pairs", "Final Stretch", "Migrated"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(
                        tab as "New Pairs" | "Final Stretch" | "Migrated"
                      )
                    }
                    className={`px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content - scrollable */}
              <div className="flex-1 overflow-auto">
                <TokenGrid
                  sortBy={sortBy}
                  displayMode="column"
                  filters={{
                    ...filters,
                    sections: [
                      activeTab as "New Pairs" | "Final Stretch" | "Migrated",
                    ],
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* Filter Modal */}
        <FilterModal
          open={showFilterModal}
          onOpenChange={setShowFilterModal}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
        />
      </div>
    </ErrorBoundary>
  );
}
