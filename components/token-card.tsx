"use client";

import { memo, useState } from "react";
import { Globe, LinkIcon, Search, TrendingUp, Info } from "lucide-react";
import type { Token } from "@/lib/token-data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TokenDetailModal } from "./token-detail-modal";
import { usePriceUpdate } from "@/hooks/use-price-updates";
import { TooltipWrapper } from "./tooltip-wrapper";

interface TokenCardProps {
  token: Token;
}

export const TokenCard = memo(function TokenCard({ token }: TokenCardProps) {
  const [showModal, setShowModal] = useState(false);
  const priceUpdate = usePriceUpdate(token.name);

  const displayChange = priceUpdate ? priceUpdate.change : token.change24hValue;
  const isPositiveChange = displayChange >= 0;
  const isUpdating = !!priceUpdate;

  return (
    <>
      <div
        className={`group bg-card border border-border rounded p-2.5 transition-all duration-300 cursor-pointer relative overflow-hidden ${
          isUpdating
            ? "border-primary/40 bg-primary/5"
            : "hover:bg-card/80 hover:border-primary/40"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${
            isUpdating ? "opacity-100" : "group-hover:opacity-100"
          }`}
        />

        <div className="relative z-10 space-y-1.5">
          <div className="flex items-start gap-2">
            {/* Token image/icon */}
            <div
              className={`w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300 border border-primary/20 ${
                isUpdating
                  ? "ring-1 ring-primary/50 from-primary/30"
                  : "group-hover:from-primary/30"
              }`}
            >
              {token.icon}
            </div>

            {/* Name and symbol */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <h3
                    className={`font-semibold text-xs transition-colors duration-300 ${
                      isUpdating
                        ? "text-primary"
                        : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {token.name}
                  </h3>
                  {token.fullName !== token.name && (
                    <p className="text-xs text-muted-foreground leading-none">
                      {token.fullName}
                    </p>
                  )}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-0.5 hover:bg-secondary rounded transition-colors flex-shrink-0 mt-0.5">
                      <Info
                        size={12}
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 text-xs p-2" align="end">
                    <div className="space-y-1">
                      <p className="font-semibold text-xs">{token.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {token.fullName}
                      </p>
                      <div className="pt-1 border-t border-border/50">
                        <p className="text-xs">
                          <span className="text-muted-foreground">
                            Holders:
                          </span>{" "}
                          {token.holders}
                        </p>
                        <p className="text-xs">
                          <span className="text-muted-foreground">Listed:</span>{" "}
                          {token.time}
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Price on right */}
            <div className="text-right flex-shrink-0">
              <div className="text-xs font-semibold text-foreground">
                {token.price}
              </div>
              <div className="text-xs text-muted-foreground">
                {token.priceUSD}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs gap-1 px-1">
            <TooltipWrapper content={`${token.holders} holders`}>
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-help">
                {token.holders}
              </span>
            </TooltipWrapper>

            <span className="text-muted-foreground/30">|</span>

            <TooltipWrapper content="24h volume">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-help">
                {token.volume24h}
              </span>
            </TooltipWrapper>

            <span className="text-muted-foreground/30">|</span>

            <TooltipWrapper
              content={`Change in 24h: ${displayChange.toFixed(1)}%`}
            >
              <span
                className={`font-medium cursor-help transition-all duration-300 ${
                  isPositiveChange
                    ? "text-green-500 hover:text-green-400"
                    : "text-red-500 hover:text-red-400"
                } ${isUpdating ? "animate-pulse" : ""}`}
              >
                {displayChange.toFixed(1)}%
              </span>
            </TooltipWrapper>

            <span className="text-muted-foreground/30">|</span>

            <TooltipWrapper content={`Market cap: ${token.marketCap}`}>
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-help">
                {token.marketCap}
              </span>
            </TooltipWrapper>
          </div>

          <div className="flex items-center justify-between mt-1 pt-1 border-t border-border/30">
            <div className="flex items-center gap-0.5">
              <TooltipWrapper content="View chart">
                <button className="p-1 hover:bg-secondary rounded transition-colors">
                  <TrendingUp
                    size={12}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              </TooltipWrapper>
              <TooltipWrapper content="Visit website">
                <button className="p-1 hover:bg-secondary rounded transition-colors">
                  <Globe
                    size={12}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              </TooltipWrapper>
              <TooltipWrapper content="Copy contract">
                <button className="p-1 hover:bg-secondary rounded transition-colors">
                  <LinkIcon
                    size={12}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              </TooltipWrapper>
              <TooltipWrapper content="Search on Dextools">
                <button className="p-1 hover:bg-secondary rounded transition-colors">
                  <Search
                    size={12}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              </TooltipWrapper>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 hover:bg-secondary/50 rounded transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <TokenDetailModal
          token={token}
          open={showModal}
          onOpenChange={setShowModal}
        />
      )}
    </>
  );
});

TokenCard.displayName = "TokenCard";
