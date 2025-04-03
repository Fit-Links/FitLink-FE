"use client";

import React from "react";

import Header from "../_components/Header";
import PreferenceTimePicker from "./_components/PreferenceTimePicker";

export default function EditWorkoutSchedules() {
  return (
    <main className="flex h-screen w-full flex-col">
      <Header title="PT 희망 시간" />

      <section className="mt-[0.625rem] text-center">
        <p className="text-body-1 text-text-sub2">PT 시간 : 50분</p>
        <p className="text-body-1 text-text-sub2">PT 선택 시간은 시작 시간입니다.</p>
      </section>

      <PreferenceTimePicker />
    </main>
  );
}
