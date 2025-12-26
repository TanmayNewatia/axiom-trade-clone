"use client";

import { memo } from "react";
import type { Token } from "@/lib/token-data";
import { TokenDetailModal } from "../token-detail-modal/token-detail-modal";
import { useTokenCard } from "./hooks";
import { TokenIcon, TokenHeader, TokenStats, TokenActions } from "./partials";

interface TokenCardProps {
  token: Token;
}

const TokenCardContent = memo(function TokenCardContent({
  token,
}: TokenCardProps) {
  const {
    showModal,
    liveToken,
    displayChange,
    isPositiveChange,
    isUpdating,
    hasRecentUpdate,
    tokenUpdate,
    handleDetailsClick,
    handleModalClose,
  } = useTokenCard(token);

  return (
    <>
      <div
        className={`group bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 cursor-pointer relative flex ${
          hasRecentUpdate
            ? "border-primary/40 bg-primary/5 animate-flash-green"
            : isUpdating
            ? "border-primary/30 bg-primary/3"
            : "hover:bg-card/80 hover:border-primary/30 hover:shadow-sm"
        }`}
        onClick={handleDetailsClick}
      >
        {/* Full height icon */}
        <TokenIcon token={liveToken} isUpdating={isUpdating} />

        {/* Content area */}
        <div className="flex-1 p-2.5 flex flex-col justify-between min-h-20">
          {/* Header */}
          <TokenHeader
            token={liveToken}
            isUpdating={isUpdating}
            previousValues={tokenUpdate?.previousValues}
          />

          {/* Stats row */}
          <TokenStats
            token={liveToken}
            displayChange={displayChange}
            isPositiveChange={isPositiveChange}
            isUpdating={isUpdating}
            previousValues={tokenUpdate?.previousValues}
          />

          {/* Actions */}
          <TokenActions onDetailsClick={handleDetailsClick} />
        </div>

        {/* Update indicator overlay */}
        {hasRecentUpdate && (
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent pointer-events-none animate-slide-up" />
        )}
      </div>

      {showModal && (
        <TokenDetailModal
          token={liveToken}
          open={showModal}
          onOpenChange={handleModalClose}
        />
      )}
    </>
  );
});

export function TokenCard(props: TokenCardProps) {
  return <TokenCardContent {...props} />;
}

TokenCard.displayName = "TokenCard";
