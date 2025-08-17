import TimeOption from "trainer/app/schedule-management/_components/TimeOption";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TimeOption> = {
  component: TimeOption,
  tags: ["autodocs"],
};

export default meta;

type TimeOptionStory = StoryObj<typeof TimeOption>;

export const PtReservation: TimeOptionStory = {
  render: () => (
    <TimeOption>
      <TimeOption.Icon iconName={"Dumbbell"} />
      <TimeOption.Content>
        <div>PT 예약</div>
      </TimeOption.Content>
    </TimeOption>
  ),
};

export const PtFixedReservation: TimeOptionStory = {
  render: () => (
    <TimeOption>
      <TimeOption.Icon iconName={"CalendarClock"} />
      <TimeOption.Content>
        <div>PT</div>
        <div>고정 예약</div>
      </TimeOption.Content>
    </TimeOption>
  ),
};

export const PtReservationNotPossible: TimeOptionStory = {
  render: () => (
    <TimeOption>
      <TimeOption.Icon iconName={"CalendarX2"} />
      <TimeOption.Content>
        <div>예약 불가</div>
        <div>시간대 등록</div>
      </TimeOption.Content>
    </TimeOption>
  ),
};

export const HolidaySettings: TimeOptionStory = {
  render: () => (
    <TimeOption>
      <TimeOption.Icon iconName={"CalendarMinus"} />
      <TimeOption.Content>
        <div>휴무일</div>
        <div>설정</div>
      </TimeOption.Content>
    </TimeOption>
  ),
};
