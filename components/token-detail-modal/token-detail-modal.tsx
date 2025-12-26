"use client";

import { memo } from "react";
import type { Token } from "@/lib/token-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTokenDetailModal } from "./hooks";
import {
  TokenHeader,
  PriceInfo,
  StatsGrid,
  TokenTags,
  TokenActions,
} from "./partials";

interface TokenDetailModalProps {
  token: Token;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TokenDetailModalContent = memo(function TokenDetailModalContent({
  token,
  open,
  onOpenChange,
}: TokenDetailModalProps) {
  const {
    isPositiveChange,
    handleChartClick,
    handleWebsiteClick,
    handleContractClick,
    formatPrice,
  } = useTokenDetailModal(token);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <TokenHeader token={token} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Price Information */}
          <PriceInfo token={token} formatPrice={formatPrice} />

          {/* Statistics Grid */}
          <StatsGrid token={token} isPositiveChange={isPositiveChange} />

          {/* Tags */}
          <TokenTags token={token} />

          {/* Action Buttons */}
          <TokenActions
            onChartClick={handleChartClick}
            onWebsiteClick={handleWebsiteClick}
            onContractClick={handleContractClick}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});

export function TokenDetailModal(props: TokenDetailModalProps) {
  return <TokenDetailModalContent {...props} />;
}
