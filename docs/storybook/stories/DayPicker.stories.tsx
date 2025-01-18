import type { Meta, StoryObj } from "@storybook/react";

import { DayPicker } from "@5unwan/ui/components/DayPicker";
import { useState } from "react";

const meta: Meta<typeof DayPicker> = {
  component: DayPicker,
  tags: ["autodocs"],
  args: {
    selected: undefined,
    onSelect: undefined,
    onDayClick: undefined,
    fixedWeeks: false,
    mode: "single",
    className: "border",
  },
  argTypes: {
    selected: {
      description: "상위에서 주입 할 Date 타입의 상태",
    },
    onSelect: {
      description: "상위에서 주입 할 Date 타입의 상태를 변경 할 함수",
    },
    onDayClick: {
      description: "특정 날짜를 선택하면 해당 날짜의 데이터를 참조할 수 있는 콜백 함수",
    },
    fixedWeeks: {
      control: "boolean",
      description: "달력의 크기를 6주로 고정할 것인지 결정하는 props",
    },
    mode: {
      control: "select",
      options: ["single"],
    },
  },
};

export default meta;

type DayPickerStory = StoryObj<typeof DayPicker>;

export const Default: DayPickerStory = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="bg-background-primary flex h-[700px] w-full items-center justify-center">
        <DayPicker
          mode="single"
          fixedWeeks={false}
          selected={date}
          onSelect={setDate}
          className="w-[358px]"
        />
      </div>
    );
  },
};

export const FixedWeeks: DayPickerStory = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="bg-background-primary flex h-[700px] w-full items-center justify-center">
        <DayPicker
          mode="single"
          fixedWeeks
          selected={date}
          onSelect={setDate}
          className="w-[358px]"
        />
      </div>
    );
  },
};
