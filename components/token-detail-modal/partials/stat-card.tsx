import { memo } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  isPositive?: boolean;
  suffix?: string;
}

export const StatCard = memo(function StatCard({
  label,
  value,
  isPositive,
  suffix = "",
}: StatCardProps) {
  const colorClass =
    isPositive !== undefined
      ? isPositive
        ? "text-green-500"
        : "text-red-500"
      : "text-foreground";

  return (
    <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
      <p className="text-xs text-muted-foreground mb-1.5 font-medium">
        {label}
      </p>
      <p className={`text-lg font-bold ${colorClass}`}>
        {isPositive !== undefined && isPositive ? "+" : ""}
        {value}
        {suffix}
      </p>
    </div>
  );
});
