import { Search } from "lucide-react";

export const NoResult = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Search className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No tokens found</h3>
      <p className="text-muted-foreground text-center">
        Try searching with a different token name, symbol, or tag
      </p>
    </div>
  );
};
