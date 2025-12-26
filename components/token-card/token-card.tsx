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
    displayChange,
    isPositiveChange,
    isUpdating,
    handleDetailsClick,
    handleModalClose,
  } = useTokenCard(token);

  return (
    <>
      <div
        className={`group bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 cursor-pointer relative flex ${
          isUpdating
            ? "border-primary/40 bg-primary/5"
            : "hover:bg-card/80 hover:border-primary/30 hover:shadow-sm"
        }`}
      >
        {/* Full height icon */}
        <TokenIcon token={token} isUpdating={isUpdating} />

        {/* Content area */}
        <div className="flex-1 p-2.5 flex flex-col justify-between min-h-20">
          {/* Header */}
          <TokenHeader token={token} isUpdating={isUpdating} />

          {/* Stats row */}
          <TokenStats
            token={token}
            displayChange={displayChange}
            isPositiveChange={isPositiveChange}
            isUpdating={isUpdating}
          />

          {/* Actions */}
          <TokenActions onDetailsClick={handleDetailsClick} />
        </div>

        {/* Update indicator overlay */}
        {isUpdating && (
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent pointer-events-none" />
        )}
      </div>

      {showModal && (
        <TokenDetailModal
          token={token}
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
