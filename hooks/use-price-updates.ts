"use client";

import { useEffect, useState, useRef } from "react";

export interface PriceUpdate {
  name: string;
  price: number;
  change: number;
  timestamp: number;
  isIncreasing: boolean;
}

/**
 * Mock WebSocket service for real-time price updates
 * In production, this would connect to an actual WebSocket server
 */
class MockWebSocketService {
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private subscribers: Map<string, Set<(update: PriceUpdate) => void>> =
    new Map();
  private prices: Map<string, number> = new Map();

  constructor() {
    // Initialize with random prices
  }

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

  private stopPriceSimulation(tokenName: string) {
    const interval = this.intervals.get(tokenName);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(tokenName);
    }
  }

  destroy() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();
    this.subscribers.clear();
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
 * Hook to subscribe to real-time price updates for a token
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
 * Hook to subscribe to multiple tokens
 */
export function usePriceUpdates(tokenNames: string[]) {
  const [updates, setUpdates] = useState<Map<string, PriceUpdate>>(new Map());
  const wsServiceRef = useRef(getWSService());
  const unsubscribersRef = useRef<Map<string, () => void>>(new Map());

  useEffect(() => {
    const newUpdates = new Map(updates);

    tokenNames.forEach((tokenName) => {
      if (!unsubscribersRef.current.has(tokenName)) {
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
        unsubscribersRef.current.set(tokenName, unsubscribe);
      }
    });

    return () => {
      tokenNames.forEach((tokenName) => {
        const unsubscribe = unsubscribersRef.current.get(tokenName);
        if (unsubscribe) {
          unsubscribe();
          unsubscribersRef.current.delete(tokenName);
        }
      });
    };
  }, [tokenNames.join(",")]);

  return updates;
}
