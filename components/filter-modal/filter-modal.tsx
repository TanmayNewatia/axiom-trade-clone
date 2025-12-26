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
import { FilterOptions } from "../pulse-section/hooks";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const SECTIONS = ["New Pairs", "Final Stretch", "Migrated"] as const;

export function FilterModal({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onReset,
}: FilterModalProps) {
  const handleSectionToggle = (section: string, checked: boolean) => {
    if (checked) {
      onFilterChange({
        ...filters,
        sections: [...filters.sections, section] as (typeof SECTIONS)[number][],
      });
    } else {
      onFilterChange({
        ...filters,
        sections: filters.sections.filter((s: string) => s !== section),
      });
    }
  };

  const formatInfiniteValue = (value: number, isPositive = true) => {
    if (isPositive && value === Number.POSITIVE_INFINITY) return "∞";
    if (!isPositive && value === Number.NEGATIVE_INFINITY) return "-∞";
    return value.toFixed(0);
  };

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
            <div className="space-y-3">
              {SECTIONS.map((section) => (
                <label
                  key={section}
                  className="flex items-center gap-3 cursor-pointer hover:bg-secondary/50 p-2 rounded-md transition-colors"
                >
                  <Checkbox
                    checked={filters.sections.includes(section)}
                    onCheckedChange={(checked) =>
                      handleSectionToggle(section, !!checked)
                    }
                  />
                  <span className="text-sm font-medium">{section}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Holders Range */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Holders: {filters.minHolders} -{" "}
              {formatInfiniteValue(filters.maxHolders)}
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
              Min Price: ${filters.minPrice.toLocaleString()}
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
              24h Change: {formatInfiniteValue(filters.minChange, false)}% -{" "}
              {formatInfiniteValue(filters.maxChange)}%
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
            <Button variant="outline" onClick={onReset} className="flex-1">
              Reset
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
