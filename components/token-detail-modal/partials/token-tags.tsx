import { memo } from "react";
import type { Token } from "@/lib/token-data";

interface TokenTagsProps {
  token: Token;
}

export const TokenTags = memo(function TokenTags({ token }: TokenTagsProps) {
  if (token.tags.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground font-medium">Tags</p>
      <div className="flex flex-wrap gap-2">
        {token.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 bg-secondary/60 hover:bg-secondary/80 rounded-full border border-border/30 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});
