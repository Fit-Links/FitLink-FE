"use client";

import { useErrorBoundaryFallbackProps } from "@suspensive/react";
import GlobalFallback from "@ui/components/GlobalFallback";
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@user/constants/routes";

type ErrorFallbackProps = {
  onClick: () => void;
};

export default function ErrorFallback({ onClick }: ErrorFallbackProps) {
  const router = useRouter();

  const { error } = useErrorBoundaryFallbackProps();

  const onUnauthorizedRouting = () => {
    router.push(RouteInstance["login"]());
  };

  return (
    <GlobalFallback error={error} onClick={onClick} onUnauthorizedRouting={onUnauthorizedRouting} />
  );
}
