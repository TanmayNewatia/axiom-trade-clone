"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { FilterOptions } from "@/components/pulse-section";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export function FilterModal({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onReset,
}: FilterModalProps) {
  const sections: ("New Pairs" | "Final Stretch" | "Migrated")[] = [
    "New Pairs",
    "Final Stretch",
    "Migrated",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Tokens</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Sections Filter */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Sections</Label>
            <div className="space-y-2">
              {sections.map((section) => (
                <label
                  key={section}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.sections.includes(section)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFilterChange({
                          ...filters,
                          sections: [...filters.sections, section],
                        });
                      } else {
                        onFilterChange({
                          ...filters,
                          sections: filters.sections.filter(
                            (s) => s !== section
                          ),
                        });
                      }
                    }}
                  />
                  <span className="text-sm">{section}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Holders Range */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Holders: {filters.minHolders} -{" "}
              {filters.maxHolders === Number.POSITIVE_INFINITY
                ? "∞"
                : filters.maxHolders}
            </Label>
            <Slider
              value={[filters.minHolders]}
              onValueChange={(value) =>
                onFilterChange({ ...filters, minHolders: value[0] })
              }
              min={0}
              max={500}
              step={10}
              className="w-full"
            />
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Min Price: ${filters.minPrice.toFixed(0)}
            </Label>
            <Slider
              value={[filters.minPrice]}
              onValueChange={(value) =>
                onFilterChange({ ...filters, minPrice: value[0] })
              }
              min={0}
              max={1000000}
              step={1000}
              className="w-full"
            />
          </div>

          {/* Change Range */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              24h Change:{" "}
              {filters.minChange === Number.NEGATIVE_INFINITY
                ? "-∞"
                : filters.minChange.toFixed(0)}
              % -{" "}
              {filters.maxChange === Number.POSITIVE_INFINITY
                ? "∞"
                : filters.maxChange.toFixed(0)}
              %
            </Label>
            <Slider
              value={[Math.max(filters.minChange, -100)]}
              onValueChange={(value) =>
                onFilterChange({ ...filters, minChange: value[0] })
              }
              min={-100}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onReset}
              className="flex-1 bg-transparent"
            >
              Reset
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
