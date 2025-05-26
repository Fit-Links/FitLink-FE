"use client";

import { PTHistoryLabel } from "./PTHistoryLabel";

export type PTHistoryFilterTypes =
  | "SESSION_ALL"
  | "SESSION_COMPLETED"
  | "SESSION_NO_SHOW"
  | "SESSION_NONE";

interface PTHistoryContainerProps {
  children: React.ReactNode;
}

export default function PTHistoryContainer({ children }: PTHistoryContainerProps) {
  return (
    <>
      <PTHistoryLabel />
      {children}
    </>
  );
}
