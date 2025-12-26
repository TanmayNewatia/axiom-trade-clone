import { useCallback } from "react";
import type { Token } from "@/lib/token-data";

export function useTokenDetailModal(token: Token) {
  const isPositiveChange = token.change24hValue >= 0;

  const handleChartClick = useCallback(() => {
    console.log("Open chart for", token.name);
  }, [token.name]);

  const handleWebsiteClick = useCallback(() => {
    console.log("Open website for", token.name);
  }, [token.name]);

  const handleContractClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`Contract: ${token.name}`);
      console.log("Contract copied to clipboard");
    } catch (err) {
      console.error("Failed to copy contract:", err);
    }
  }, [token.name]);

  const formatPrice = useCallback((price: string) => {
    const numPrice = parseFloat(price.replace(/[^0-9.-]/g, ""));
    return numPrice < 0.01 ? numPrice.toExponential(2) : numPrice.toFixed(4);
  }, []);

  return {
    isPositiveChange,
    handleChartClick,
    handleWebsiteClick,
    handleContractClick,
    formatPrice,
  };
}
