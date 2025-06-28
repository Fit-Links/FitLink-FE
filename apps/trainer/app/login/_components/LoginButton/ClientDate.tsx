"use client";

import React from "react";

import { getKoreanDate } from "@trainer/utils/date";

function ClientDate() {
  const time = getKoreanDate("2025-05-10T15:00:00");

  return (
    <>
      <p suppressHydrationWarning>{time.toString()}</p>
      <p suppressHydrationWarning>{time.toLocaleString()}</p>
    </>
  );
}

export default ClientDate;
