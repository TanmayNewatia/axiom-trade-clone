import { memo } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  isConnected: boolean;
  isBlinking: boolean;
  showIcon?: boolean;
  className?: string;
}

export const ConnectionStatus = memo(function ConnectionStatus({
  isConnected,
  isBlinking,
  showIcon = true,
  className,
}: ConnectionStatusProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon &&
        (isConnected ? (
          <Wifi
            className={cn(
              "w-4 h-4 text-green-500",
              isBlinking && "animate-pulse"
            )}
          />
        ) : (
          <WifiOff className="w-4 h-4 text-red-500" />
        ))}
      <span
        className={cn(
          "text-sm font-medium",
          isConnected ? "text-green-600" : "text-red-600"
        )}
      >
        {isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
});
