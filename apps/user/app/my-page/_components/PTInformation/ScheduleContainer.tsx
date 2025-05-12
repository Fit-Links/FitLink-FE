import React from "react";

type ScheduleContainerProps = {
  children: React.ReactNode;
};

export default function ScheduleContainer({ children }: ScheduleContainerProps) {
  return (
    <section className="bg-background-sub1 relative min-h-10 w-full rounded-lg p-[1.25rem]">
      {children}
    </section>
  );
}
