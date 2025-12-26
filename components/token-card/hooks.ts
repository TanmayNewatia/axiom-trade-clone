import { useState, useCallback } from "react";
import { usePriceUpdate, useTokenUpdate } from "@/hooks/use-price-updates";
import type { Token } from "@/lib/token-data";

export function useTokenCard(token: Token) {
  const [showModal, setShowModal] = useState(false);
  const priceUpdate = usePriceUpdate(token.name);
  const tokenUpdate = useTokenUpdate(token.name);

  const displayChange = priceUpdate?.change ?? token.change24hValue;
  const isPositiveChange = displayChange >= 0;
  const isUpdating = !!(priceUpdate || tokenUpdate);

  const handleDetailsClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback((open: boolean) => {
    setShowModal(open);
  }, []);

  return {
    showModal,
    displayChange,
    isPositiveChange,
    isUpdating,
    handleDetailsClick,
    handleModalClose,
  };
}
