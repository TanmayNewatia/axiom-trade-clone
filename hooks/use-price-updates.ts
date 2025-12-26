"use client";

import { useEffect, useState, useRef } from "react";
import type { Token } from "@/lib/token-data";

export interface PriceUpdate {
  name: string;
  price: number;
  change: number;
  timestamp: number;
  isIncreasing: boolean;
}

export interface TokenUpdate {
  name: string;
  symbol: string;
  price: string;
  priceUSD: string;
  change24h: string;
  volume24h: string;
  holders: string;
  change24hValue: number;
  volume24hValue: number;
  holdersValue: number;
  timestamp: number;
  updateType: "price" | "volume" | "holders" | "all";
}

/**
 * Enhanced Mock WebSocket service for real-time token data updates
 * Simulates real WebSocket behavior with comprehensive token data changes
 */
class MockWebSocketService {
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private subscribers: Map<string, Set<(update: PriceUpdate) => void>> =
    new Map();
  private tokenSubscribers: Map<string, Set<(update: TokenUpdate) => void>> =
    new Map();
  private prices: Map<string, number> = new Map();
  private tokenData: Map<string, Partial<Token>> = new Map();

  constructor() {
    // Initialize with random baseline data for realistic updates
  }

  // Legacy price update subscription (for backward compatibility)
  subscribe(
    tokenName: string,
    callback: (update: PriceUpdate) => void
  ): () => void {
    if (!this.subscribers.has(tokenName)) {
      this.subscribers.set(tokenName, new Set());
      this.startPriceSimulation(tokenName);
    }

    this.subscribers.get(tokenName)!.add(callback);

    return () => {
      this.subscribers.get(tokenName)?.delete(callback);
      if (this.subscribers.get(tokenName)?.size === 0) {
        this.stopPriceSimulation(tokenName);
      }
    };
  }

  // New comprehensive token data subscription
  subscribeToToken(
    tokenName: string,
    callback: (update: TokenUpdate) => void
  ): () => void {
    if (!this.tokenSubscribers.has(tokenName)) {
      this.tokenSubscribers.set(tokenName, new Set());
      this.startTokenDataSimulation(tokenName);
    }

    this.tokenSubscribers.get(tokenName)!.add(callback);

    return () => {
      this.tokenSubscribers.get(tokenName)?.delete(callback);
      if (this.tokenSubscribers.get(tokenName)?.size === 0) {
        this.stopTokenDataSimulation(tokenName);
      }
    };
  }

  private startPriceSimulation(tokenName: string) {
    const initialPrice = Math.random() * 1000 + 100;
    this.prices.set(tokenName, initialPrice);

    const interval = setInterval(() => {
      const currentPrice = this.prices.get(tokenName) || initialPrice;
      const changePercent = (Math.random() - 0.48) * 2;
      const newPrice = currentPrice * (1 + changePercent / 100);
      const isIncreasing = newPrice > currentPrice;

      this.prices.set(tokenName, newPrice);

      const update: PriceUpdate = {
        name: tokenName,
        price: newPrice,
        change: changePercent,
        timestamp: Date.now(),
        isIncreasing,
      };

      this.subscribers.get(tokenName)?.forEach((callback) => callback(update));
    }, 1000 + Math.random() * 3000);

    this.intervals.set(tokenName, interval);
  }

  private startTokenDataSimulation(tokenName: string) {
    // Initialize baseline data if not exists
    if (!this.tokenData.has(tokenName)) {
      this.tokenData.set(tokenName, {
        name: tokenName,
        change24hValue: Math.random() * 200 - 50, // -50% to +150%
        volume24hValue: Math.random() * 1000000,
        holdersValue: Math.floor(Math.random() * 50000),
      });
    }

    const updateTypes = ["price", "volume", "holders", "all"] as const;

    const interval = setInterval(() => {
      const currentData = this.tokenData.get(tokenName)!;
      const updateType =
        updateTypes[Math.floor(Math.random() * updateTypes.length)];

      let update: Partial<TokenUpdate> = {
        name: tokenName,
        timestamp: Date.now(),
        updateType,
      };

      switch (updateType) {
        case "price": {
          // Price changes more frequently and with higher variance
          const changePercent = (Math.random() - 0.45) * 10; // More volatile
          const newChangeValue = Math.max(
            -99,
            Math.min(500, currentData.change24hValue! + changePercent)
          );
          const priceUSDNum = Math.random() * 100;
          const marketCapNum =
            priceUSDNum *
            (currentData.holdersValue || 1000) *
            (Math.random() * 100);

          update = {
            ...update,
            change24hValue: newChangeValue,
            change24h:
              newChangeValue >= 0
                ? `+${newChangeValue.toFixed(1)}%`
                : `${newChangeValue.toFixed(1)}%`,
            priceUSD: `$${priceUSDNum.toFixed(priceUSDNum < 1 ? 6 : 2)}`,
            price:
              marketCapNum > 1000000
                ? `$${(marketCapNum / 1000000).toFixed(1)}M`
                : `$${(marketCapNum / 1000).toFixed(1)}K`,
          };
          break;
        }
        case "volume": {
          // Volume changes moderately
          const volumeMultiplier = 0.8 + Math.random() * 0.4; // 80% to 120% of current
          const newVolume = Math.max(
            0,
            (currentData.volume24hValue || 1000) * volumeMultiplier
          );

          update = {
            ...update,
            volume24hValue: newVolume,
            volume24h:
              newVolume > 1000000
                ? `${(newVolume / 1000000).toFixed(1)}M`
                : `${(newVolume / 1000).toFixed(1)}K`,
          };
          break;
        }
        case "holders": {
          // Holders change slowly and usually increase
          const holderChange =
            Math.random() > 0.7
              ? -Math.floor(Math.random() * 5)
              : Math.floor(Math.random() * 20);
          const newHolders = Math.max(
            0,
            (currentData.holdersValue || 100) + holderChange
          );

          update = {
            ...update,
            holdersValue: newHolders,
            holders:
              newHolders > 1000
                ? `${(newHolders / 1000).toFixed(1)}K`
                : newHolders.toString(),
          };
          break;
        }
        case "all": {
          // Comprehensive update (less frequent)
          const changePercent = (Math.random() - 0.45) * 15;
          const newChangeValue = Math.max(
            -99,
            Math.min(500, currentData.change24hValue! + changePercent)
          );
          const volumeMultiplier = 0.7 + Math.random() * 0.6;
          const newVolume = Math.max(
            0,
            (currentData.volume24hValue || 1000) * volumeMultiplier
          );
          const holderChange =
            Math.random() > 0.6
              ? -Math.floor(Math.random() * 10)
              : Math.floor(Math.random() * 50);
          const newHolders = Math.max(
            0,
            (currentData.holdersValue || 100) + holderChange
          );
          const priceUSDNum = Math.random() * 100;
          const marketCapNum = priceUSDNum * newHolders * (Math.random() * 100);

          update = {
            ...update,
            change24hValue: newChangeValue,
            change24h:
              newChangeValue >= 0
                ? `+${newChangeValue.toFixed(1)}%`
                : `${newChangeValue.toFixed(1)}%`,
            priceUSD: `$${priceUSDNum.toFixed(priceUSDNum < 1 ? 6 : 2)}`,
            price:
              marketCapNum > 1000000
                ? `$${(marketCapNum / 1000000).toFixed(1)}M`
                : `$${(marketCapNum / 1000).toFixed(1)}K`,
            volume24hValue: newVolume,
            volume24h:
              newVolume > 1000000
                ? `${(newVolume / 1000000).toFixed(1)}M`
                : `${(newVolume / 1000).toFixed(1)}K`,
            holdersValue: newHolders,
            holders:
              newHolders > 1000
                ? `${(newHolders / 1000).toFixed(1)}K`
                : newHolders.toString(),
          };
          break;
        }
      }

      // Update cached data
      this.tokenData.set(tokenName, {
        ...currentData,
        change24hValue: update.change24hValue ?? currentData.change24hValue,
        volume24hValue: update.volume24hValue ?? currentData.volume24hValue,
        holdersValue: update.holdersValue ?? currentData.holdersValue,
      });

      // Notify subscribers
      this.tokenSubscribers
        .get(tokenName)
        ?.forEach((callback) => callback(update as TokenUpdate));
    }, 2000 + Math.random() * 8000); // Updates every 2-10 seconds

    this.intervals.set(`token_${tokenName}`, interval);
  }

  private stopPriceSimulation(tokenName: string) {
    const interval = this.intervals.get(tokenName);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(tokenName);
    }
  }

  private stopTokenDataSimulation(tokenName: string) {
    const interval = this.intervals.get(`token_${tokenName}`);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(`token_${tokenName}`);
    }
  }

  destroy() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();
    this.subscribers.clear();
    this.tokenSubscribers.clear();
  }
}

// Singleton instance
let wsService: MockWebSocketService | null = null;

function getWSService() {
  if (!wsService) {
    wsService = new MockWebSocketService();
  }
  return wsService;
}

/**
 * Hook to subscribe to real-time price updates for a token (legacy)
 */
export function usePriceUpdate(tokenName: string) {
  const [priceUpdate, setPriceUpdate] = useState<PriceUpdate | null>(null);
  const wsServiceRef = useRef(getWSService());

  useEffect(() => {
    const unsubscribe = wsServiceRef.current.subscribe(tokenName, (update) => {
      setPriceUpdate(update);
    });

    return unsubscribe;
  }, [tokenName]);

  return priceUpdate;
}

/**
 * Hook to subscribe to comprehensive token data updates
 */
export function useTokenUpdate(tokenName: string) {
  const [tokenUpdate, setTokenUpdate] = useState<TokenUpdate | null>(null);
  const wsServiceRef = useRef(getWSService());

  useEffect(() => {
    const unsubscribe = wsServiceRef.current.subscribeToToken(
      tokenName,
      (update) => {
        setTokenUpdate(update);
      }
    );

    return unsubscribe;
  }, [tokenName]);

  return tokenUpdate;
}

/**
 * Hook to subscribe to multiple tokens
 */
export function usePriceUpdates(tokenNames: string[]) {
  const [updates, setUpdates] = useState<Map<string, PriceUpdate>>(new Map());
  const wsServiceRef = useRef(getWSService());
  const unsubscribersRef = useRef<Map<string, () => void>>(new Map());

  const tokenNamesKey = tokenNames.join(",");

  useEffect(() => {
    const unsubscribers = unsubscribersRef.current;

    tokenNames.forEach((tokenName) => {
      if (!unsubscribers.has(tokenName)) {
        const unsubscribe = wsServiceRef.current.subscribe(
          tokenName,
          (update) => {
            setUpdates((prev) => {
              const newMap = new Map(prev);
              newMap.set(tokenName, update);
              return newMap;
            });
          }
        );
        unsubscribers.set(tokenName, unsubscribe);
      }
    });

    return () => {
      tokenNames.forEach((tokenName) => {
        const unsubscribe = unsubscribers.get(tokenName);
        if (unsubscribe) {
          unsubscribe();
          unsubscribers.delete(tokenName);
        }
      });
    };
  }, [tokenNamesKey, tokenNames]);

  return updates;
}

/**
 * Hook to subscribe to multiple token data updates
 */
export function useTokenUpdates(tokenNames: string[]) {
  const [updates, setUpdates] = useState<Map<string, TokenUpdate>>(new Map());
  const wsServiceRef = useRef(getWSService());
  const unsubscribersRef = useRef<Map<string, () => void>>(new Map());

  const tokenNamesKey = tokenNames.join(",");

  useEffect(() => {
    const unsubscribers = unsubscribersRef.current;

    tokenNames.forEach((tokenName) => {
      if (!unsubscribers.has(tokenName)) {
        const unsubscribe = wsServiceRef.current.subscribeToToken(
          tokenName,
          (update) => {
            setUpdates((prev) => {
              const newMap = new Map(prev);
              newMap.set(tokenName, update);
              return newMap;
            });
          }
        );
        unsubscribers.set(tokenName, unsubscribe);
      }
    });

    return () => {
      tokenNames.forEach((tokenName) => {
        const unsubscribe = unsubscribers.get(tokenName);
        if (unsubscribe) {
          unsubscribe();
          unsubscribers.delete(tokenName);
        }
      });
    };
  }, [tokenNamesKey, tokenNames]);

  return updates;
}
