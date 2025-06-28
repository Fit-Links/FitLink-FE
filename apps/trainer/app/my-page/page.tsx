import React, { Suspense } from "react";

import { getKoreanDate } from "@trainer/utils/date";

import MyAvailableTimeContainer from "./_components/MyAvailableTimeContainer";
import MyDayOffContainer from "./_components/MyDayOffContainer";
import MyPageContainer from "./_components/MyPageContainer";
import MyPageSkeleton from "./_components/Skeleton";
import MyPTHistorySkeleton from "./_components/Skeleton/MyPTHistorySkeleton";

export default function page() {
  // 디버깅을 위한 다양한 시간 값
  const koreanTime = getKoreanDate();
  const rawDate = new Date();
  const staticText = "TEST TEXT";

  // 서버 콘솔에 로그 출력 (개발환경에서만)
  if (process.env.NODE_ENV === "development") {
    console.log("🖥️ Server render - koreanTime:", koreanTime);
    console.log("🖥️ Server render - rawDate:", rawDate);
  }

  return (
    <main className="bg-background-primary text-text-primary h-screen w-full">
      {/* 🔍 단계별 테스트 */}

      {/* 1. 정적 텍스트 테스트 */}
      <div style={{ backgroundColor: "red", color: "white", padding: "10px", margin: "10px" }}>
        정적 텍스트: {staticText}
      </div>

      {/* 2. 기본 Date 객체 테스트 */}
      <div style={{ backgroundColor: "blue", color: "white", padding: "10px", margin: "10px" }}>
        <div suppressHydrationWarning>Raw Date: {rawDate.toString()}</div>
      </div>

      {/* 3. getKoreanDate 테스트 */}
      <div style={{ backgroundColor: "green", color: "white", padding: "10px", margin: "10px" }}>
        <div suppressHydrationWarning>Korean Date: {koreanTime.toString()}</div>
        <div suppressHydrationWarning>Korean Locale: {koreanTime.toLocaleString()}</div>
      </div>

      {/* 4. 기존 p 태그 */}
      <p
        suppressHydrationWarning
        style={{ backgroundColor: "yellow", color: "black", padding: "5px" }}
      >
        Original P Tag: {koreanTime.toString()}
      </p>

      <Suspense fallback={<MyPageSkeleton />}>
        <MyPageContainer />
      </Suspense>
      <Suspense fallback={<MyPTHistorySkeleton />}>
        <MyAvailableTimeContainer />
      </Suspense>
      <Suspense fallback={<></>}>
        <MyDayOffContainer />
      </Suspense>
    </main>
  );
}
