"use client";

import { Bell, Bookmark, Menu, Search, Star, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="hidden sm:inline text-sm font-semibold">
              Pulse
            </span>
          </div>

          {/* Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1 rounded hover:bg-secondary/30"
            >
              Discover
            </a>
            <a
              href="#"
              className="text-xs text-primary hover:text-primary/80 transition px-2 py-1 rounded bg-primary/10"
            >
              Pulse
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1 rounded hover:bg-secondary/30"
            >
              Trackers
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1 rounded hover:bg-secondary/30"
            >
              Perpetuals
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1 rounded hover:bg-secondary/30"
            >
              Yield
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1 rounded hover:bg-secondary/30"
            >
              Vision
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1 rounded hover:bg-secondary/30"
            >
              Portfolio
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1 rounded hover:bg-secondary/30"
            >
              Rewards
            </a>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            className="p-1.5 hover:bg-secondary rounded transition-colors"
            title="Search"
          >
            <Search size={16} className="text-muted-foreground" />
          </button>

          <div className="flex items-center gap-1.5 bg-secondary px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
            <span className="font-medium">SOL</span>
            <ChevronDown size={12} />
          </div>

          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-2.5 sm:px-4 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium transition-colors">
            Deposit
          </button>

          <button
            className="p-1.5 hover:bg-secondary rounded transition-colors hidden sm:block"
            title="Favorites"
          >
            <Star size={16} className="text-muted-foreground" />
          </button>

          <button
            className="p-1.5 hover:bg-secondary rounded transition-colors hidden sm:block"
            title="Notifications"
          >
            <Bell size={16} className="text-muted-foreground" />
          </button>

          <button
            className="p-1.5 hover:bg-secondary rounded transition-colors hidden sm:block"
            title="Bookmarks"
          >
            <Bookmark size={16} className="text-muted-foreground" />
          </button>

          <button
            className="p-1.5 hover:bg-secondary rounded transition-colors sm:hidden"
            title="Menu"
          >
            <Menu size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
