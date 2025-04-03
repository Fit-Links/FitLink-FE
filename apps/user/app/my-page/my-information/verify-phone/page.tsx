"use client";

import { Button } from "@ui/components/Button";
import React from "react";

import Header from "../../_components/Header";

export default function VerifyPhone() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
      <Header title="휴대폰 인증" />

      <Button className="relative bottom-[2.125rem] h-[3.375rem] w-full">변경</Button>
    </main>
  );
}
