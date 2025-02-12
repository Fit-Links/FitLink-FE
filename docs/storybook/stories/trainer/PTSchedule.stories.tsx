import { Meta, StoryObj } from "@storybook/react";
import PTSchedule from "trainer/components/PTSchedule";

const meta: Meta<typeof PTSchedule> = {
  component: PTSchedule,
  tags: ["autodocs"],
  args: {
    currentSchedules: [
      {
        dayOfWeek: "MON",
        isHoliday: true,
        startTime: "09:00",
        endTime: "19:00",
      },
      {
        dayOfWeek: "TUE",
        isHoliday: false,
        startTime: "09:00",
        endTime: "19:00",
      },
      {
        dayOfWeek: "WED",
        isHoliday: false,
        startTime: "09:00",
        endTime: "19:00",
      },
      {
        dayOfWeek: "THU",
        isHoliday: false,
        startTime: "09:00",
        endTime: "19:00",
      },
      {
        dayOfWeek: "FRI",
        isHoliday: false,
        startTime: "09:00",
        endTime: "19:00",
      },
      {
        dayOfWeek: "SAT",
        isHoliday: false,
        startTime: "09:00",
        endTime: "19:00",
      },
      {
        dayOfWeek: "SUN",
        isHoliday: false,
        startTime: "09:00",
        endTime: "19:00",
      },
    ],
    scheduleChanges: [
      {
        applyAt: "2025-12-12",
        schedules: [
          {
            dayOfWeek: "MON",
            isHoliday: false,
            startTime: "09:00",
            endTime: "19:00",
          },
          {
            dayOfWeek: "TUE",
            isHoliday: false,
            startTime: "09:00",
            endTime: "19:00",
          },
          {
            dayOfWeek: "WED",
            isHoliday: false,
            startTime: "09:00",
            endTime: "19:00",
          },
          {
            dayOfWeek: "THU",
            isHoliday: false,
            startTime: "09:00",
            endTime: "19:00",
          },
          {
            dayOfWeek: "FRI",
            isHoliday: false,
            startTime: "09:00",
            endTime: "19:00",
          },
          {
            dayOfWeek: "SAT",
            isHoliday: false,
            startTime: "09:00",
            endTime: "19:00",
          },
          {
            dayOfWeek: "SUN",
            isHoliday: false,
            startTime: "09:00",
            endTime: "19:00",
          },
        ],
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof PTSchedule>;

export const Default: Story = {};
