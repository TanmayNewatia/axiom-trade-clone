"use client";

import {
  Globe,
  Wallet,
  Twitter,
  Search,
  Activity,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NAVIGATION_LINKS = [
  { label: "Wallet", icon: Wallet, href: "/wallet", external: false },
  {
    label: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    external: true,
  },
  { label: "Discover", icon: Search, href: "/discover", external: false },
  { label: "Pulse", icon: Activity, href: "/pulse", external: false },
] as const;

const CONNECTION_STATUS = {
  stable: {
    color: "text-green-500 bg-green-500",
    text: "Connection is stable",
  },
  unstable: {
    color: "text-yellow-500 bg-yellow-500",
    text: "Connection unstable",
  },
  disconnected: { color: "text-red-500 bg-red-500", text: "Disconnected" },
} as const;

export function BottomBar() {
  const connectionStatus = "stable"; // This would come from a hook or context
  const currentBalance = "$122.97";
  const pnl = "0"; // Profit/Loss value

  const handleLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      // Handle internal navigation
      console.log(`Navigate to: ${href}`);
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur-sm px-4 sm:px-6 py-3 text-xs sm:text-sm sticky bottom-0 z-40">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mx-auto">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 font-medium bg-secondary hover:bg-secondary/80"
          >
            PRESET 1
          </Button>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {NAVIGATION_LINKS.map(({ label, icon: Icon, href, external }) => (
              <Button
                key={label}
                variant="ghost"
                size="sm"
                className="h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                onClick={() => handleLinkClick(href, external)}
              >
                <Icon size={14} className="sm:mr-1.5" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
          </div>

          {/* PNL Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/30">
            <DollarSign size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground font-mono text-xs">
              PNL: {pnl}
            </span>
          </div>
        </div>

        {/* Center - Balance (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-secondary/30 rounded-md">
          <DollarSign size={14} className="text-muted-foreground" />
          <span className="font-medium font-mono">{currentBalance}</span>
        </div>

        {/* Right section - Connection Status and Global */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Connection Status */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-secondary/20">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  CONNECTION_STATUS[connectionStatus].color.split(" ")[1]
                }`}
              />
            </div>
            <span className="hidden sm:inline text-xs text-muted-foreground">
              {CONNECTION_STATUS[connectionStatus].text}
            </span>
          </div>

          {/* Global/Region Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Globe size={14} className="sm:mr-1.5" />
                <span className="hidden sm:inline font-medium">GLOBAL</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top">
              <DropdownMenuItem>
                <Globe size={14} className="mr-2" />
                Global
              </DropdownMenuItem>
              <DropdownMenuItem>North America</DropdownMenuItem>
              <DropdownMenuItem>Europe</DropdownMenuItem>
              <DropdownMenuItem>Asia Pacific</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
