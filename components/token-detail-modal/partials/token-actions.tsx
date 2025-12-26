import { memo } from "react";
import { Globe, TrendingUp, Copy } from "lucide-react";
import { ActionButton } from "./action-button";

interface TokenActionsProps {
  onChartClick: () => void;
  onWebsiteClick: () => void;
  onContractClick: () => void;
}

export const TokenActions = memo(function TokenActions({
  onChartClick,
  onWebsiteClick,
  onContractClick,
}: TokenActionsProps) {
  const actions = [
    {
      icon: <TrendingUp size={16} />,
      label: "Chart",
      onClick: onChartClick,
      tooltip: "View price chart",
    },
    {
      icon: <Globe size={16} />,
      label: "Website",
      onClick: onWebsiteClick,
      tooltip: "Visit official website",
    },
    {
      icon: <Copy size={16} />,
      label: "Contract",
      onClick: onContractClick,
      tooltip: "Copy contract address",
    },
  ];

  return (
    <div className="space-y-3 pt-2 border-t border-border/50">
      <p className="text-sm text-muted-foreground font-medium">Actions</p>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <ActionButton
            key={action.label}
            icon={action.icon}
            label={action.label}
            onClick={action.onClick}
            tooltip={action.tooltip}
          />
        ))}
      </div>
    </div>
  );
});
