import { FixedReservation } from "@5unwan/core/api/types/common";
import { Ellipsis } from "lucide-react";
import React from "react";

import { AccordionItem, AccordionTrigger, AccordionContent } from "@ui/components/Accordion";
import { Text } from "@ui/components/Text";

import Icon from "./Icon";
import {
  convertFixedReservationsToWeekSchedule,
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
  workoutSchedule?: WorkoutSchedule;
  fixedReservations?: FixedReservation[];
  triggerText?: string;
  hasEllipsis?: boolean;
  onEllipsisClick?: () => void;
};
function PTPreference({
  workoutSchedule,
  fixedReservations,
  triggerText = "PT 희망시간",
  hasEllipsis,
  onEllipsisClick,
}: PTPreferenceProps) {
  const weekSchedule =
    workoutSchedule &&
    (Object.entries(
      makeWeekSchedule({ type: "block", schedule: workoutSchedule }),
    ) as ObjectEntries<Record<DaysOfWeek, string>>);

  const fixWeekSchedule =
    fixedReservations && convertFixedReservationsToWeekSchedule(fixedReservations);

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="flex justify-around">
        <Text.Headline1>{triggerText}</Text.Headline1>
        <Icon name="ChevronDown" size="lg" />
      </AccordionTrigger>
      <AccordionContent className="bg-background-sub1 flex items-start rounded-[10px] p-4 ">
        <div className="flex flex-col items-start">
          {weekSchedule &&
            weekSchedule.map(([dayOfWeek, schedule]: [DaysOfWeek, string | null]) => (
              <Text.Body1
                key={dayOfWeek}
                className="block"
              >{`${DAYS_OF_WEEK[dayOfWeek]}: ${schedule}`}</Text.Body1>
            ))}
          {fixWeekSchedule &&
            fixWeekSchedule.map(({ dayOfWeek, preferenceTimes }) => {
              const preferenceTimesSet = new Set(preferenceTimes);
              const preferenceTimesString = Array.from(preferenceTimesSet).join(", ");

              return (
                <Text.Body1
                  key={dayOfWeek}
                  className="block"
                >{`${DAYS_OF_WEEK[dayOfWeek]}: ${preferenceTimesString}`}</Text.Body1>
              );
            })}
        </div>
        {hasEllipsis && <Ellipsis onClick={onEllipsisClick} className="cursor-pointer" />}
      </AccordionContent>
    </AccordionItem>
  );
}

export default PTPreference;
