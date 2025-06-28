"use client";

import React from "react";

import { getKoreanDate } from "@trainer/utils/date";

function ClientDate() {
  const time = getKoreanDate("2025-05-10T15:00:00");
  const time2 = getKoreanDate("2025-05-10");
  const time3 = getKoreanDate();

  return (
    <>
      <p suppressHydrationWarning>{time.toString()}</p>
      <p suppressHydrationWarning>{time.toLocaleString()}</p>
      <p suppressHydrationWarning>{time2.toString()}</p>
      <p suppressHydrationWarning>{time2.toLocaleString()}</p>
      <p suppressHydrationWarning>{time3.toString()}</p>
      <p suppressHydrationWarning>{time3.toLocaleString()}</p>
    </>
  );
}

export default ClientDate;
