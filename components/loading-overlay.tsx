"use client";

import { Loader } from "lucide-react";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({
  visible,
  message = "Loading...",
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 space-y-3 text-center">
        <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
        <p className="text-sm text-foreground">{message}</p>
      </div>
    </div>
  );
}
