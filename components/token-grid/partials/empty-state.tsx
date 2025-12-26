import { memo } from "react";

export const EmptyState = memo(function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-muted-foreground mb-2">No tokens found</div>
      <p className="text-xs sm:text-sm text-muted-foreground/60">
        Try adjusting your filters
      </p>
    </div>
  );
});
