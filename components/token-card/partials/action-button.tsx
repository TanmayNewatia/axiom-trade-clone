import { memo } from "react";
import { TooltipWrapper } from "../../common/tooltip-wrapper";

interface ActionButtonProps {
  onClick?: () => void;
  tooltip: string;
  children: React.ReactNode;
}

export const ActionButton = memo(function ActionButton({
  onClick,
  tooltip,
  children,
}: ActionButtonProps) {
  return (
    <TooltipWrapper content={tooltip}>
      <button
        onClick={onClick}
        className="p-1 hover:bg-secondary/80 rounded transition-colors"
      >
        {children}
      </button>
    </TooltipWrapper>
  );
});
