import { memo } from "react";
import { Globe, LinkIcon, TrendingUp } from "lucide-react";
import { ActionButton } from "./action-button";

interface TokenActionsProps {
  onDetailsClick: () => void;
}

export const TokenActions = memo(function TokenActions({
  onDetailsClick,
}: TokenActionsProps) {
  return (
    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-border/30">
      <div className="flex items-center gap-0.5">
        {[
          { tooltip: "View chart", icon: TrendingUp },
          { tooltip: "Visit website", icon: Globe },
          { tooltip: "Copy contract", icon: LinkIcon },
        ].map(({ tooltip, icon: Icon }, index) => (
          <ActionButton key={index} tooltip={tooltip}>
            <Icon
              size={11}
              className="text-muted-foreground hover:text-foreground"
            />
          </ActionButton>
        ))}
      </div>

      <button
        onClick={onDetailsClick}
        className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 hover:bg-secondary/50 rounded transition-colors font-medium"
      >
        Details
      </button>
    </div>
  );
});
