import Icon from "@ui/components/Icon";
import React from "react";

export default function ScheduleContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-background-sub1 relative min-h-10 w-full rounded-lg p-[1.25rem]">
      <div className="absolute right-0 top-0 flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center">
        <Icon name="Ellipsis" className="text-background-sub4 h-[1.5625rem] w-[1.5625rem]" />
      </div>
      {children}
    </section>
  );
}
