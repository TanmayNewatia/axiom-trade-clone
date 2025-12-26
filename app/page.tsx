"use client";

import { Suspense } from "react";
import { Header } from "@/components/header/header";
import { BottomBar } from "@/components/bottom-bar";
import { PulseSection } from "@/components/pulse-section/pulse-section";
import { ErrorBoundary } from "@/components/error-boundary";

function PageContent() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <ErrorBoundary>
          <PulseSection />
        </ErrorBoundary>
      </main>

      <BottomBar />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}
