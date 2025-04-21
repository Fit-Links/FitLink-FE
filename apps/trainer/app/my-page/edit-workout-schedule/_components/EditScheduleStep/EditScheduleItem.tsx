import React from "react";

type EditScheduleItemProps = {
  label: string;
  children: React.ReactNode;
};

export default function EditScheduleItem({ label, children }: EditScheduleItemProps) {
  return (
    <div className="relative mt-[1.25rem] flex w-full items-center justify-between">
      <span className="text-headline">{label}</span>
      {children}
    </div>
  );
}
