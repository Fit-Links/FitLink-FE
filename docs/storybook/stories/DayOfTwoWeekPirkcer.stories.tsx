import DayOfTwoWeekPicker from "@5unwan/ui/components/DayOfTwoWeekPicker";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof DayOfTwoWeekPicker> = {
  component: DayOfTwoWeekPicker,
  decorators: (Story) => (
    <div className="bg-background-primary flex justify-center p-10">
      <Story />
    </div>
  ),
  tags: ["autodocs"],
  args: {
    selectedDate: undefined,
    onChangeSelectedDate: undefined,
    className: "w-[22.375rem] border",
  },
  argTypes: {
    selectedDate: {
      control: "date",
      description: "DayOfTWoWeekPicker의 제어 상태의 날짜 데이터 prop",
    },
    onChangeSelectedDate: {
      description: "DayOfTWoWeekPicker의 날짜 데이터를 핸들링 할 setter 함수 prop",
    },
  },
};

export default meta;

type DayOfTWoWeekPickerStory = StoryObj<typeof DayOfTwoWeekPicker>;

export const Default: DayOfTWoWeekPickerStory = {};

export const ControllState: DayOfTWoWeekPickerStory = {
  render: (args) => {
    const [today, setToday] = useState<Date | undefined>();
    today && alert(`선택된 시간: ${today}`);

    return <DayOfTwoWeekPicker {...args} selectedDate={today} onChangeSelectedDate={setToday} />;
  },
};
