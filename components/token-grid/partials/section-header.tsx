import { memo } from "react";

interface SectionHeaderProps {
  title: string;
  count: number;
}

export const SectionHeader = memo(function SectionHeader({
  title,
  count,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm sm:text-base font-semibold">{title}</h2>
      <span className="text-xs sm:text-sm text-muted-foreground">{count}</span>
    </div>
  );
});
