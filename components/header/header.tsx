"use client";

import { LeftHeader } from "./partials/left-header";
import { RightHeader } from "./partials/right-header/right-header";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3">
        <LeftHeader />
        <RightHeader />
      </div>
    </header>
  );
}
