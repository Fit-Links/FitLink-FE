"use client";

import { useErrorBoundaryFallbackProps } from "@suspensive/react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import GlobalFallback from "@ui/components/GlobalFallback";
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@user/constants/routes";

export default function ErrorFallback() {
  const router = useRouter();
  const { reset } = useQueryErrorResetBoundary();

  const { error } = useErrorBoundaryFallbackProps();

  const onUnauthorizedRouting = () => {
    router.push(RouteInstance["login"]());
  };

  return (
    <GlobalFallback reset={reset} error={error} onUnauthorizedRouting={onUnauthorizedRouting} />
  );
}
