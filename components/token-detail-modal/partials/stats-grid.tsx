import { memo } from "react";
import type { Token } from "@/lib/token-data";
import { StatCard } from "./stat-card";

interface StatsGridProps {
  token: Token;
  isPositiveChange: boolean;
}

export const StatsGrid = memo(function StatsGrid({
  token,
  isPositiveChange,
}: StatsGridProps) {
  const stats = [
    { label: "Holders", value: token.holders },
    {
      label: "24h Change",
      value: token.change24hValue,
      isPositive: isPositiveChange,
      suffix: "%",
    },
    { label: "Volume 24h", value: token.volume24h },
    { label: "Listed", value: token.time },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          isPositive={stat.isPositive}
          suffix={stat.suffix}
        />
      ))}
    </div>
  );
});
