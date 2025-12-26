"use client";

import { Volume2, BarChart3, Eye, Filter } from "lucide-react";
import { TokenGrid } from "../token-grid/token-grid";
import { SortDropdown } from "../sort-dropdown/sort-dropdown";
import { FilterModal } from "../filter-modal/filter-modal";
import { SearchModal } from "../search-modal/search-modal";
import { TokenGridSkeleton } from "../token-card-skeleton";
import { ErrorBoundary } from "../error-boundary";
import { Button } from "../common/button";
import { ConnectionStatusBadge } from "../live-data-indicator";
import { usePulseSection } from "./hooks";

const Icons = [
  { icon: BarChart3, title: "Chart" },
  { icon: Volume2, title: "Volume" },
  { icon: Eye, title: "Eye" },
  { icon: Volume2, title: "Alerts" },
];

export function PulseSection() {
  const {
    sortBy,
    filters,
    showFilterModal,
    showSearchModal,
    isLoading,
    activeTab,
    liveStats,
    handleSort,
    handleFilterChange,
    resetFilters,
    hasActiveFilters,
    setShowFilterModal,
    setShowSearchModal,
    setActiveTab,
  } = usePulseSection();

  return (
    <ErrorBoundary>
      <div className="w-full h-full flex flex-col">
        <div className="border-b border-border px-3 sm:px-6 py-3 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            {/* Left section */}
            <div className="flex items-center gap-3">
              <h1 className="text-lg sm:text-xl font-semibold">Pulse</h1>
              <ConnectionStatusBadge
                isConnected={liveStats.isConnected}
                className="hidden sm:flex"
              />
            </div>

            {/* Right section - Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2">
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

              {Icons.map(({ icon: Icon, title }) => (
                <Button key={title} title={title}>
                  <Icon size={16} className="text-muted-foreground" />
                </Button>
              ))}
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

        {/* Search Modal */}
        <SearchModal
          open={showSearchModal}
          onOpenChange={setShowSearchModal}
          onTokenSelect={(token) => {
            handleFilterChange({
              ...filters,
              searchQuery: token.symbol,
            });
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
