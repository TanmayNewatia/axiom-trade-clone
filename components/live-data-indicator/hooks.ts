import { useState, useEffect, useMemo } from "react";

interface LiveDataStats {
  isConnected: boolean;
  lastUpdate?: number;
  activeTokens: number;
  totalUpdates: number;
  uptime: number;
  avgUpdateInterval: number;
}

export function useLiveDataIndicator(
  isConnected: boolean = true,
  lastUpdate?: number,
  activeTokens: number = 0,
  totalUpdates: number = 0
) {
  const [timeSinceUpdate, setTimeSinceUpdate] = useState<string>("now");
  const [isBlinking, setIsBlinking] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [updateTimes, setUpdateTimes] = useState<number[]>([]);

  // Track update times for calculating average interval
  useEffect(() => {
    if (lastUpdate) {
      setUpdateTimes((prev) => {
        const newTimes = [...prev, lastUpdate].slice(-10); // Keep last 10 updates
        return newTimes;
      });
    }
  }, [lastUpdate]);

  // Calculate average update interval
  const avgUpdateInterval = useMemo(() => {
    if (updateTimes.length < 2) return 0;
    const intervals = updateTimes
      .slice(1)
      .map((time, index) => time - updateTimes[index]);
    return (
      intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
    );
  }, [updateTimes]);

  // Calculate uptime
  const uptime = useMemo(() => {
    return Date.now() - startTime;
  }, [startTime]);

  // Update time since last update
  useEffect(() => {
    if (!lastUpdate) return;

    const updateTimer = setInterval(() => {
      const now = Date.now();
      const diffMs = now - lastUpdate;

      if (diffMs < 1000) {
        setTimeSinceUpdate("now");
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 500);
      } else if (diffMs < 60000) {
        setTimeSinceUpdate(`${Math.floor(diffMs / 1000)}s ago`);
      } else {
        setTimeSinceUpdate(`${Math.floor(diffMs / 60000)}m ago`);
      }
    }, 1000);

    return () => clearInterval(updateTimer);
  }, [lastUpdate]);

  const stats: LiveDataStats = {
    isConnected,
    lastUpdate,
    activeTokens,
    totalUpdates,
    uptime,
    avgUpdateInterval,
  };

  return {
    timeSinceUpdate,
    isBlinking,
    stats,
  };
}

export function useConnectionStatus(isConnected: boolean = true) {
  const [connectionHistory, setConnectionHistory] = useState<
    {
      connected: boolean;
      timestamp: number;
    }[]
  >([]);

  useEffect(() => {
    setConnectionHistory((prev) =>
      [...prev, { connected: isConnected, timestamp: Date.now() }].slice(-50)
    ); // Keep last 50 connection events
  }, [isConnected]);

  const connectionUptime = useMemo(() => {
    const connectedEvents = connectionHistory.filter(
      (event) => event.connected
    );
    const disconnectedEvents = connectionHistory.filter(
      (event) => !event.connected
    );

    if (connectedEvents.length === 0) return 0;

    const totalTime =
      Date.now() - (connectionHistory[0]?.timestamp || Date.now());
    const disconnectedTime = disconnectedEvents.reduce((total, event) => {
      const nextConnected = connectedEvents.find(
        (ce) => ce.timestamp > event.timestamp
      );
      if (nextConnected) {
        return total + (nextConnected.timestamp - event.timestamp);
      }
      return total + (isConnected ? 0 : Date.now() - event.timestamp);
    }, 0);

    return ((totalTime - disconnectedTime) / totalTime) * 100;
  }, [connectionHistory, isConnected]);

  return {
    connectionHistory,
    connectionUptime,
  };
}

export function useLiveDataStats(
  totalTokens: number,
  liveTokens: number,
  totalVolume: string,
  avgChange: number
) {
  const [previousStats, setPreviousStats] = useState({
    totalTokens,
    liveTokens,
    totalVolume,
    avgChange,
  });

  useEffect(() => {
    setPreviousStats({
      totalTokens,
      liveTokens,
      totalVolume,
      avgChange,
    });
  }, [totalTokens, liveTokens, totalVolume, avgChange]);

  const hasChanges =
    previousStats.totalTokens !== totalTokens ||
    previousStats.liveTokens !== liveTokens ||
    previousStats.totalVolume !== totalVolume ||
    previousStats.avgChange !== avgChange;

  return {
    previousStats,
    hasChanges,
  };
}
