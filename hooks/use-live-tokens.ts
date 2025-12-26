"use client";

import { useState, useEffect, useMemo } from "react";
import { tokenData, type Token } from "@/lib/token-data";
import { useTokenUpdates } from "./use-price-updates";

/**
 * Hook that manages live token data by combining static token data with WebSocket updates
 */
export function useLiveTokens() {
  const [liveTokens, setLiveTokens] = useState<Token[]>([...tokenData]);

  // Extract all token names for WebSocket subscription
  const tokenNames = useMemo(() => tokenData.map((token) => token.name), []);

  // Subscribe to WebSocket updates for all tokens
  const tokenUpdates = useTokenUpdates(tokenNames);

  useEffect(() => {
    if (tokenUpdates.size === 0) return;

    setLiveTokens((currentTokens) => {
      return currentTokens.map((token) => {
        const update = tokenUpdates.get(token.name);

        if (!update) return token;

        // Merge the update with the existing token data
        const updatedToken: Token = {
          ...token,
          ...(update.price && { price: update.price }),
          ...(update.priceUSD && { priceUSD: update.priceUSD }),
          ...(update.change24h && { change24h: update.change24h }),
          ...(update.volume24h && { volume24h: update.volume24h }),
          ...(update.holders && { holders: update.holders }),
          ...(update.change24hValue !== undefined && {
            change24hValue: update.change24hValue,
          }),
          ...(update.volume24hValue !== undefined && {
            volume24hValue: update.volume24hValue,
          }),
          ...(update.holdersValue !== undefined && {
            holdersValue: update.holdersValue,
          }),
        };

        return updatedToken;
      });
    });
  }, [tokenUpdates]);

  return liveTokens;
}

/**
 * Hook that provides live token data filtered by section
 */
export function useLiveTokensBySection(
  section?: "New Pairs" | "Final Stretch" | "Migrated"
) {
  const liveTokens = useLiveTokens();

  return useMemo(() => {
    if (!section) return liveTokens;
    return liveTokens.filter((token) => token.section === section);
  }, [liveTokens, section]);
}

/**
 * Hook that provides a specific live token by name
 */
export function useLiveToken(tokenName: string) {
  const liveTokens = useLiveTokens();

  return useMemo(() => {
    return liveTokens.find((token) => token.name === tokenName);
  }, [liveTokens, tokenName]);
}

/**
 * Hook that provides real-time statistics about all tokens
 */
export function useTokenStats() {
  const liveTokens = useLiveTokens();

  return useMemo(() => {
    const totalTokens = liveTokens.length;
    const totalHolders = liveTokens.reduce(
      (sum, token) => sum + token.holdersValue,
      0
    );
    const totalVolume = liveTokens.reduce(
      (sum, token) => sum + token.volume24hValue,
      0
    );
    const averageChange =
      liveTokens.reduce((sum, token) => sum + token.change24hValue, 0) /
      totalTokens;

    const positiveChanges = liveTokens.filter(
      (token) => token.change24hValue > 0
    ).length;
    const negativeChanges = liveTokens.filter(
      (token) => token.change24hValue < 0
    ).length;
    const noChanges = totalTokens - positiveChanges - negativeChanges;

    const sectionStats = {
      "New Pairs": liveTokens.filter((t) => t.section === "New Pairs").length,
      "Final Stretch": liveTokens.filter((t) => t.section === "Final Stretch")
        .length,
      Migrated: liveTokens.filter((t) => t.section === "Migrated").length,
    };

    return {
      totalTokens,
      totalHolders,
      totalVolume,
      averageChange,
      positiveChanges,
      negativeChanges,
      noChanges,
      sectionStats,
    };
  }, [liveTokens]);
}
