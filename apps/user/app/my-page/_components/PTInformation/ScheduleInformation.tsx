import { Dropdown, DropdownContent, DropdownTrigger } from "@ui/components/Dropdown";
import { cn } from "@ui/lib/utils";
import React from "react";

interface ScheduleInformationProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export default function ScheduleInformation({
  className,
  title,
  children,
}: ScheduleInformationProps) {
  return (
    <section className={cn("flex h-auto flex-col", className)}>
      <Dropdown className="w-full">
        <DropdownTrigger>
          <div className="text-headline">{title}</div>
        </DropdownTrigger>
        <DropdownContent>{children}</DropdownContent>
      </Dropdown>
    </section>
  );
}
