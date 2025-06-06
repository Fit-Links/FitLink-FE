"use client";

import { ErrorBoundary } from "@suspensive/react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React from "react";

import ErrorFallback from "./ErrorFallback";

type QueryErrorFallbackProps = {
  children: React.ReactNode;
};

export default function QueryErrorFallback({ children }: QueryErrorFallbackProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={(props) => <ErrorFallback onClick={props.reset} />}
          onReset={reset}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
