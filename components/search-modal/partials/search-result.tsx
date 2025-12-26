import { Token } from "@/lib/token-data";
import { Badge } from "@/components/ui/badge";

export const SearchResult = ({
  searchResults,
  handleTokenSelect,
  formatPrice,
}: {
  searchResults: Token[];
  handleTokenSelect: (token: Token) => void;
  formatPrice: (priceUSD: string) => string;
}) => {
  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Search Results ({searchResults.length})
      </h3>
      {searchResults.map((token) => (
        <div
          key={`${token.section}-${token.symbol}`}
          className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors"
          onClick={() => handleTokenSelect(token)}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">{token.icon}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{token.name}</span>
                <Badge variant="outline" className="text-xs">
                  {token.symbol}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    token.change24hValue > 0
                      ? "text-green-600 border-green-200"
                      : "text-red-600 border-red-200"
                  }`}
                >
                  {token.change24h}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {token.fullName} • {token.section}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              ${formatPrice(token.priceUSD)}
            </div>
            <div className="text-xs text-muted-foreground">
              {token.holders} holders
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
