"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { type Token } from "@/lib/token-data";
import { useSearchModal } from "./hooks";
import { NoResult } from "./partials/no-result";
import { SearchResult } from "./partials/search-result";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTokenSelect?: (token: Token) => void;
}

export function SearchModal({
  open,
  onOpenChange,
  onTokenSelect,
}: SearchModalProps) {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    handleTokenSelect,
    formatPrice,
  } = useSearchModal({ onOpenChange, onTokenSelect });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 overflow-scroll">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Search Tokens</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by token name, symbol, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base"
              autoFocus
            />
          </div>
        </div>

        {/* Search Results or Default Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {searchQuery.trim() && searchResults.length > 0 ? (
            /* Search Results */
            <SearchResult
              searchResults={searchResults}
              handleTokenSelect={handleTokenSelect}
              formatPrice={formatPrice}
            />
          ) : (
            /* No Results */
            <NoResult />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
