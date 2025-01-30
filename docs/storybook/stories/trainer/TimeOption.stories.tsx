import type { Meta, StoryObj } from "@storybook/react";
import { CalendarClock, CalendarMinus2, CalendarX2, Dumbbell } from "lucide-react";

import TimeOption from "trainer/components/TimeOption.js";

const meta: Meta<typeof TimeOption> = {
  component: TimeOption,
  tags: ["autodocs"],
  args: {
    optionIcon: <Dumbbell className="text-text-primary" />,
    children: <div>PT 예약</div>,
  },
  argTypes: {
    optionIcon: {
      control: "object",
      description: "TimeOption의 icon으로 사용할 icon components prop",
    },
    children: {
      control: "object",
      description: "TimeOption의 상위에서 주입 받아 텍스트로 활용될 children prop",
    },
  },
};

export default meta;

type TimeOptionStory = StoryObj<typeof TimeOption>;

export const Default: TimeOptionStory = {};
