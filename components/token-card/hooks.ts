import { useState, useCallback, useMemo } from "react";
import { useSingleTokenUpdates } from "@/hooks/use-price-updates";
import type { Token } from "@/lib/token-data";

export function useTokenCard(token: Token) {
  const [showModal, setShowModal] = useState(false);
  const tokenUpdate = useSingleTokenUpdates(token.name);

  // Merge live updates with static token data
  const liveToken = useMemo(() => {
    if (!tokenUpdate) return token;

    return {
      ...token,
      price: tokenUpdate.price,
      priceUSD: tokenUpdate.priceUSD,
      change24h: tokenUpdate.change24h,
      change24hValue: tokenUpdate.change24hValue,
      volume24h: tokenUpdate.volume24h,
      volume24hValue: tokenUpdate.volume24hValue,
      holders: tokenUpdate.holders,
      holdersValue: tokenUpdate.holdersValue,
    };
  }, [token, tokenUpdate]);

  const displayChange = liveToken.change24hValue;
  const isPositiveChange = displayChange >= 0;
  const isUpdating = !!tokenUpdate;
  const hasRecentUpdate =
    tokenUpdate && Date.now() - tokenUpdate.timestamp < 2000;

  const handleDetailsClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback((open: boolean) => {
    setShowModal(open);
  }, []);

  return {
    showModal,
    liveToken,
    displayChange,
    isPositiveChange,
    isUpdating,
    hasRecentUpdate,
    tokenUpdate,
    handleDetailsClick,
    handleModalClose,
  };
}
