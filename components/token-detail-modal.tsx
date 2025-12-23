"use client";

import type { Token } from "@/lib/token-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Globe, LinkIcon, Search, TrendingUp } from "lucide-react";

interface TokenDetailModalProps {
  token: Token;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TokenDetailModal({
  token,
  open,
  onOpenChange,
}: TokenDetailModalProps) {
  const isPositiveChange = token.change24hValue >= 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center text-lg font-bold">
              {token.icon}
            </div>
            <div>
              <p className="text-lg font-bold">{token.name}</p>
              <p className="text-xs text-muted-foreground font-normal">
                {token.fullName}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Price Information */}
          <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-lg font-bold">{token.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">In USD</span>
              <span className="text-sm">{token.priceUSD}</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Holders</p>
              <p className="text-lg font-bold">{token.holders}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">24h Change</p>
              <p
                className={`text-lg font-bold ${
                  isPositiveChange ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPositiveChange ? "+" : ""}
                {token.change24hValue}%
              </p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Volume 24h</p>
              <p className="text-lg font-bold">{token.volume24h}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Listed</p>
              <p className="text-lg font-bold">{token.time}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {token.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-secondary rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
            <button className="flex items-center justify-center gap-2 py-2 bg-secondary hover:bg-secondary/80 rounded transition-colors text-sm">
              <TrendingUp size={16} />
              <span>Chart</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 bg-secondary hover:bg-secondary/80 rounded transition-colors text-sm">
              <Globe size={16} />
              <span>Website</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 bg-secondary hover:bg-secondary/80 rounded transition-colors text-sm">
              <LinkIcon size={16} />
              <span>Contract</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 bg-secondary hover:bg-secondary/80 rounded transition-colors text-sm">
              <Search size={16} />
              <span>Dextools</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
