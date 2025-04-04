"use client";

import React from "react";

import Header from "../_components/Header";
import InputOTP from "./_components/InputOTP";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center pb-[5.063rem]">
      <Header title="트레이너 연동" />
      <p className="text-body-1 text-text-sub2"> 트레이너에게 받은 코드를 입력해주세요</p>

      <InputOTP />
    </main>
  );
}
