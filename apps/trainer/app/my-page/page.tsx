import React from "react";

import MyAvailableTimeContainer from "./_components/MyAvailableTimeContainer";
import MyDayOffContainer from "./_components/MyDayOffContainer";
import MyPageContainer from "./_components/MyPageContainer";

export default function page() {

  return (
    <main className="bg-background-primary text-text-primary h-screen w-full">
      <MyPageContainer />
      <MyAvailableTimeContainer />
      <MyDayOffContainer />
    </main>
  );
}
