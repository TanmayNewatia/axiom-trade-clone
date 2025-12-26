"use client";

import {
  ChevronDown,
  TrendingUp,
  Clock,
  BarChart3,
  Users,
  DollarSign,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = "trending" | "newest" | "volume" | "holders" | "price";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: {
  value: SortOption;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    value: "trending",
    label: "Trending",
    icon: <TrendingUp size={14} />,
    description: "Most popular tokens",
  },
  {
    value: "newest",
    label: "Newest",
    icon: <Clock size={14} />,
    description: "Recently added",
  },
  {
    value: "volume",
    label: "Volume",
    icon: <BarChart3 size={14} />,
    description: "24h trading volume",
  },
  {
    value: "holders",
    label: "Holders",
    icon: <Users size={14} />,
    description: "Number of holders",
  },
  {
    value: "price",
    label: "Price",
    icon: <DollarSign size={14} />,
    description: "Token price",
  },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const currentOption =
    sortOptions.find((option) => option.value === value) || sortOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 bg-gray-500/30 hover:bg-gray-500/20 cursor-pointer px-2.5 py-1.5 rounded-full text-xs  transition-colors border border-border min-w-22.5">
          {currentOption.icon}
          <span className="hidden sm:inline">{currentOption.label}</span>
          <span className="sm:hidden">Sort</span>
          <ChevronDown
            size={14}
            className="transition-transform duration-200"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className="flex items-center gap-3 px-3 py-2.5"
          >
            <span
              className={`${
                value === option.value
                  ? "text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {option.icon}
            </span>
            <div className="flex-1">
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-muted-foreground">
                {option.description}
              </div>
            </div>
            {value === option.value && (
              <Check size={14} className="text-accent-foreground" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
