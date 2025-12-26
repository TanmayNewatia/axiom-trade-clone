"use client";

import { useEffect, useState, useRef } from "react";

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
  previousValues?: {
    price?: string;
    priceUSD?: string;
    change24h?: string;
    volume24h?: string;
    holders?: string;
  };
}

type TrendType = "bullish" | "bearish" | "sideways";

interface TokenData {
  price: number;
  priceUSD: number;
  change24hValue: number;
  volume24hValue: number;
  holdersValue: number;
  marketCap: number;
  volatility: number;
  trend: TrendType;
  lastUpdate: number;
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
  private tokenData: Map<string, TokenData> = new Map();

  constructor() {
    this.initializeBaselineData();
  }

  private initializeBaselineData() {
    // Initialize realistic baseline data for common tokens
    const baseTokens = [
      "SolanaBot",
      "MoonDoge",
      "EthereumAI",
      "CryptoGem",
      "DeFiKing",
      "MetaToken",
      "SolMoon",
      "DegenCoin",
      "LunaBot",
      "SafeMoon",
    ];

    baseTokens.forEach((tokenName) => {
      this.tokenData.set(tokenName, {
        price: Math.random() * 5000000 + 100000, // Price in satoshis/wei
        priceUSD: Math.random() * 0.1 + 0.001, // USD price
        change24hValue: (Math.random() - 0.5) * 200, // -100% to +100%
        volume24hValue: Math.random() * 50000 + 1000, // Volume
        holdersValue: Math.floor(Math.random() * 1000 + 50), // Holders
        marketCap: Math.random() * 10000000 + 500000, // Market cap
        volatility: Math.random() * 0.5 + 0.1, // 0.1 to 0.6 volatility
        trend: (["bullish", "bearish", "sideways"] as const)[
          Math.floor(Math.random() * 3)
        ],
        lastUpdate: Date.now(),
      });
    });
  }

  private getRealisticPriceChange(tokenName: string): number {
    const data = this.tokenData.get(tokenName);
    if (!data) return 0;

    const timeSinceLastUpdate = Date.now() - data.lastUpdate;
    const timeBasedVolatility = Math.min(timeSinceLastUpdate / 60000, 1); // Max volatility after 1 minute

    let baseChange;
    switch (data.trend) {
      case "bullish":
        baseChange = Math.random() * 0.8 + 0.1; // 0.1% to 0.9% positive bias
        break;
      case "bearish":
        baseChange = -(Math.random() * 0.8 + 0.1); // 0.1% to 0.9% negative bias
        break;
      default:
        baseChange = (Math.random() - 0.5) * 0.6; // -0.3% to +0.3%
    }

    // Apply volatility and time-based scaling
    const finalChange = baseChange * data.volatility * timeBasedVolatility;

    // Randomly change trend occasionally
    if (Math.random() < 0.02) {
      // 2% chance to change trend
      const trends: TrendType[] = ["bullish", "bearish", "sideways"];
      data.trend = trends[Math.floor(Math.random() * 3)];
    }

    return finalChange;
  }

  private formatPrice(value: number, decimals: number = 6): string {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value.toFixed(decimals)}`;
    }
  }

  private formatVolume(value: number): string {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return value.toString();
    }
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
    // Initialize with random data if not exists
    if (!this.tokenData.has(tokenName)) {
      this.tokenData.set(tokenName, {
        price: Math.random() * 1000000 + 100000,
        priceUSD: Math.random() * 0.01 + 0.001,
        change24hValue: (Math.random() - 0.5) * 100,
        volume24hValue: Math.random() * 20000 + 1000,
        holdersValue: Math.floor(Math.random() * 500 + 50),
        marketCap: Math.random() * 5000000 + 500000,
        volatility: Math.random() * 0.3 + 0.1,
        trend: (["bullish", "bearish", "sideways"] as const)[
          Math.floor(Math.random() * 3)
        ],
        lastUpdate: Date.now(),
      });
    }

    const interval = setInterval(() => {
      const data = this.tokenData.get(tokenName)!;
      const changePercent = this.getRealisticPriceChange(tokenName);
      const newPrice = data.price * (1 + changePercent / 100);
      const isIncreasing = newPrice > data.price;

      // Update stored data
      data.price = newPrice;
      data.priceUSD = data.priceUSD * (1 + changePercent / 100);
      data.lastUpdate = Date.now();

      const update: PriceUpdate = {
        name: tokenName,
        price: newPrice,
        change: changePercent,
        timestamp: Date.now(),
        isIncreasing,
      };

      this.subscribers.get(tokenName)?.forEach((callback) => callback(update));
    }, 1000 + Math.random() * 3000);

    this.intervals.set(`price_${tokenName}`, interval);
  }

  private startTokenDataSimulation(tokenName: string) {
    // Initialize baseline data if not exists
    if (!this.tokenData.has(tokenName)) {
      this.tokenData.set(tokenName, {
        price: Math.random() * 5000000 + 100000,
        priceUSD: Math.random() * 0.1 + 0.001,
        change24hValue: (Math.random() - 0.5) * 200,
        volume24hValue: Math.random() * 50000 + 1000,
        holdersValue: Math.floor(Math.random() * 1000 + 50),
        marketCap: Math.random() * 10000000 + 500000,
        volatility: Math.random() * 0.5 + 0.1,
        trend: (["bullish", "bearish", "sideways"] as const)[
          Math.floor(Math.random() * 3)
        ],
        lastUpdate: Date.now(),
      });
    }

    const interval = setInterval(() => {
      const data = this.tokenData.get(tokenName)!;
      const priceChange = this.getRealisticPriceChange(tokenName);

      // Store previous values for transition animations
      const previousValues = {
        price: this.formatPrice(data.price),
        priceUSD: `$${data.priceUSD.toFixed(6)}`,
        change24h: `${
          data.change24hValue >= 0 ? "+" : ""
        }${data.change24hValue.toFixed(2)}%`,
        volume24h: this.formatVolume(data.volume24hValue),
        holders: data.holdersValue.toString(),
      };

      // Update values with realistic market behavior
      const priceMultiplier = 1 + priceChange / 100;
      data.price *= priceMultiplier;
      data.priceUSD *= priceMultiplier;
      data.change24hValue += priceChange;

      // Volume tends to increase with volatility
      const volumeChange =
        Math.abs(priceChange) * 50 + (Math.random() - 0.5) * 10;
      data.volume24hValue = Math.max(
        1000,
        data.volume24hValue * (1 + volumeChange / 100)
      );

      // Holders change occasionally (much slower than price)
      if (Math.random() < 0.1) {
        // 10% chance to change holders
        const holderChange = Math.floor((Math.random() - 0.5) * 5); // ±2 holders
        data.holdersValue = Math.max(1, data.holdersValue + holderChange);
      }

      data.lastUpdate = Date.now();

      // Determine update type based on what changed significantly
      let updateType: TokenUpdate["updateType"] = "all";
      if (Math.abs(priceChange) > 0.5) updateType = "price";
      else if (Math.abs(volumeChange) > 5) updateType = "volume";

      const update: TokenUpdate = {
        name: tokenName,
        symbol: tokenName.substring(0, 4).toUpperCase(),
        price: this.formatPrice(data.price),
        priceUSD: `$${data.priceUSD.toFixed(6)}`,
        change24h: `${
          data.change24hValue >= 0 ? "+" : ""
        }${data.change24hValue.toFixed(2)}%`,
        volume24h: this.formatVolume(data.volume24hValue),
        holders: data.holdersValue.toString(),
        change24hValue: parseFloat(data.change24hValue.toFixed(2)),
        volume24hValue: Math.floor(data.volume24hValue),
        holdersValue: data.holdersValue,
        timestamp: Date.now(),
        updateType,
        previousValues,
      };

      this.tokenSubscribers
        .get(tokenName)
        ?.forEach((callback) => callback(update));
    }, 2000 + Math.random() * 4000); // 2-6 second intervals

    this.intervals.set(`token_${tokenName}`, interval);
  }

  private stopPriceSimulation(tokenName: string) {
    const interval = this.intervals.get(`price_${tokenName}`);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(`price_${tokenName}`);
    }
    this.subscribers.delete(tokenName);
  }

  private stopTokenDataSimulation(tokenName: string) {
    const interval = this.intervals.get(`token_${tokenName}`);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(`token_${tokenName}`);
    }
    this.tokenSubscribers.delete(tokenName);
  }

  // Get current token data (useful for initial state)
  getTokenData(tokenName: string): TokenData | undefined {
    return this.tokenData.get(tokenName);
  }

  // Cleanup all subscriptions
  destroy() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();
    this.subscribers.clear();
    this.tokenSubscribers.clear();
  }
}

// Singleton instance
const mockWebSocket = new MockWebSocketService();

/**
 * Hook for subscribing to real-time price updates for a single token
 */
export function usePriceUpdates(tokenName: string) {
  const [update, setUpdate] = useState<PriceUpdate | null>(null);

  useEffect(() => {
    if (!tokenName) return;

    const unsubscribe = mockWebSocket.subscribe(tokenName, (newUpdate) => {
      setUpdate(newUpdate);
    });

    return unsubscribe;
  }, [tokenName]);

  return update;
}

/**
 * Hook for subscribing to comprehensive token data updates for multiple tokens
 */
export function useTokenUpdates(tokenNames: string[]) {
  const [updates, setUpdates] = useState<Map<string, TokenUpdate>>(new Map());
  const subscriptionsRef = useRef<Map<string, () => void>>(new Map());

  useEffect(() => {
    const currentSubscriptions = subscriptionsRef.current;

    // Clean up existing subscriptions
    currentSubscriptions.forEach((unsubscribe) => unsubscribe());
    currentSubscriptions.clear();

    // Create new subscriptions
    tokenNames.forEach((tokenName) => {
      const unsubscribe = mockWebSocket.subscribeToToken(
        tokenName,
        (update) => {
          setUpdates((prev) => {
            const newUpdates = new Map(prev);
            newUpdates.set(tokenName, update);
            return newUpdates;
          });
        }
      );

      currentSubscriptions.set(tokenName, unsubscribe);
    });

    return () => {
      currentSubscriptions.forEach((unsubscribe) => unsubscribe());
      currentSubscriptions.clear();
    };
  }, [tokenNames]);

  return updates;
}

/**
 * Hook for a single token's comprehensive data updates
 */
export function useSingleTokenUpdates(tokenName: string) {
  const [update, setUpdate] = useState<TokenUpdate | null>(null);

  useEffect(() => {
    if (!tokenName) return;

    const unsubscribe = mockWebSocket.subscribeToToken(
      tokenName,
      (newUpdate) => {
        setUpdate(newUpdate);
      }
    );

    return unsubscribe;
  }, [tokenName]);

  return update;
}

/**
 * Hook to get initial token data
 */
export function useInitialTokenData(tokenName: string) {
  return mockWebSocket.getTokenData(tokenName);
}
