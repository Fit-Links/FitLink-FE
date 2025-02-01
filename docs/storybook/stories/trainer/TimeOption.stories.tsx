import type { Meta, StoryObj } from "@storybook/react";
import { CalendarClock, CalendarMinus2, CalendarX2, Dumbbell } from "lucide-react";

import { TimeOption, TimeOptionContent, TimeOptionIcon } from "trainer/components/TimeOption";

const meta: Meta<typeof TimeOption> = {
  component: TimeOption,
  tags: ["autodocs"],
};

export default meta;

type TimeOptionStory = StoryObj<typeof TimeOption>;

export const PtReservation: TimeOptionStory = {
  render: () => (
    <TimeOption>
      <TimeOptionIcon>
        <Dumbbell className="text-text-primary" />
      </TimeOptionIcon>
      <TimeOptionContent>
        <div>PT 예약</div>
      </TimeOptionContent>
    </TimeOption>
  ),
};

export const PtFixedReservation: TimeOptionStory = {
  render: () => (
    <TimeOption>
      <TimeOptionIcon>
        <CalendarClock className="text-text-primary" />
      </TimeOptionIcon>
      <TimeOptionContent>
        <div>PT</div>
        <div>고정 예약</div>
      </TimeOptionContent>
    </TimeOption>
  ),
};

export const PtReservationNotPossible: TimeOptionStory = {
  render: () => (
    <TimeOption>
      <TimeOptionIcon>
        <CalendarX2 className="text-text-primary" />
      </TimeOptionIcon>
      <TimeOptionContent>
        <div>예약 불가</div>
        <div>시간대 등록</div>
      </TimeOptionContent>
    </TimeOption>
  ),
};

export const HolidaySettings: TimeOptionStory = {
  render: () => (
    <TimeOption>
      <TimeOptionIcon>
        <CalendarMinus2 className="text-text-primary" />
      </TimeOptionIcon>
      <TimeOptionContent>
        <div>휴무일</div>
        <div>설정</div>
      </TimeOptionContent>
    </TimeOption>
  ),
};
