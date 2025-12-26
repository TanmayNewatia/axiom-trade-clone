import { memo } from "react";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "../../common/tooltip-wrapper";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  tooltip?: string;
}

export const ActionButton = memo(function ActionButton({
  icon,
  label,
  onClick,
  tooltip,
}: ActionButtonProps) {
  const button = (
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2 h-10 bg-secondary/50 hover:bg-secondary/80 border-border/50"
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );

  return tooltip ? (
    <TooltipWrapper content={tooltip}>{button}</TooltipWrapper>
  ) : (
    button
  );
});
