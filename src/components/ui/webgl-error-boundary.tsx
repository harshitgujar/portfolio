"use client";

import React, { Component, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface WebGLErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

export interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGLErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export function WebGLFallback({
  className,
  message,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { message?: string }) {
  return (
    <div
      className={cn(
        "relative h-full w-full bg-[#02040b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(19,77,147,0.35),rgba(0,0,0,0))] flex items-center justify-center p-6 text-center text-xs text-white/50",
        className,
      )}
      {...props}
    >
      {message && <p>{message}</p>}
    </div>
  );
}
