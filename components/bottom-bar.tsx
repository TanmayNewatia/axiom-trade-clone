"use client";

import { Globe } from "lucide-react";

export function BottomBar() {
  return (
    <div className="border-t border-border bg-background px-4 sm:px-6 py-3 text-xs sm:text-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left section */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary rounded transition-colors">
            <span className="font-medium">PRESET 1</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
            <span>1</span>
            <span>0</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition">
            Wallet
          </button>
          <button className="text-muted-foreground hover:text-foreground transition">
            Twitter
          </button>
          <button className="text-muted-foreground hover:text-foreground transition">
            Discover
          </button>
          <button className="text-muted-foreground hover:text-foreground transition">
            Pulse
          </button>
          <span className="text-muted-foreground/60">PNL</span>
        </div>

        {/* Center - hidden on mobile */}
        <div className="hidden sm:block text-muted-foreground">
          <span>$122.97</span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="hidden sm:inline">Connection is stable</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition flex items-center gap-1">
            <Globe size={16} />
            <span className="hidden sm:inline">GLOBAL</span>
          </button>
        </div>
      </div>
    </div>
  );
}
