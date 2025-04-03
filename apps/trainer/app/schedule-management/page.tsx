import React from "react";

import CalendarHintGroup from "@trainer/components/CalendarHintGroup";

import Calendar from "./_components/Calendar";

function ScheduleManagement() {
  return (
    <main className="flex h-full flex-col">
      {/* <Link href={"http://3.39.49.213/oauth2/authorization/kakao"}>카카오 로그인</Link> */}
      <div className="py-[0.875rem]">
        <CalendarHintGroup />
      </div>
      <Calendar />
    </main>
  );
}

export default ScheduleManagement;
