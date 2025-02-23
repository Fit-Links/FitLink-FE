import { Ellipsis } from "lucide-react";
import React from "react";

import { AccordionItem, AccordionTrigger, AccordionContent } from "@ui/components/Accordion";
import { Text } from "@ui/components/Text";

import {
  DAYS_OF_WEEK,
  DaysOfWeek,
  makeWeekSchedule,
  ObjectEntries,
} from "../utils/makeWeekSchedule";

type WorkoutSchedule = {
  dayOfWeek: DaysOfWeek;
  preferenceTimes: string[];
}[];
type PTPreferenceProps = {
  workoutSchedule: WorkoutSchedule;
};
function PTPreference({ workoutSchedule }: PTPreferenceProps) {
  const weekSchedule = Object.entries(
    makeWeekSchedule({ type: "block", schedule: workoutSchedule }),
  ) as ObjectEntries<Record<DaysOfWeek, string>>;

  const handleEditClick = () => {
    return;

    //TODO: ellipsis 클릭 핸들러 로직 추가
  };

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <Text.Headline1>PT 희망시간</Text.Headline1>
      </AccordionTrigger>
      <AccordionContent className="bg-background-sub1 flex items-start rounded-[10px] p-4 ">
        <div className="flex flex-col items-start">
          {weekSchedule.map(([dayOfWeek, schedule]: [DaysOfWeek, string | null]) => (
            <Text.Body1
              key={dayOfWeek}
              className="block"
            >{`${DAYS_OF_WEEK[dayOfWeek]} ${schedule}`}</Text.Body1>
          ))}
        </div>
        <Ellipsis onClick={handleEditClick} className="cursor-pointer" />
      </AccordionContent>
    </AccordionItem>
  );
}

export default PTPreference;
