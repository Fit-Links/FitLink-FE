import DayOfTwoWeekPicker from "@5unwan/ui/components/DayOfTwoWeekPicker";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DayOfTwoWeekPicker> = {
  component: DayOfTwoWeekPicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-background-primary p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    selectDate: {
      control: "date",
      description:
        "DayOfTwoWeekPicker를 제어 컴포넌트 형식으로 사용할 때 주입되는 선택된 날짜 상태 데이터",
    },
    onSelectDate: {
      description:
        "DayOfTwoWeekPicker를 제어 컴포넌트 형식으로 사용할 때 주입되는 선택된 날짜 상태를 변경하는 함수",
    },
    defaultDate: {
      description:
        "DayOfTwoWeekPicker를 비제어 컴포넌트 형식으로 사용할 때 기본값으로 넣을 선택된 날짜 데이터",
    },
  },
  args: {
    defaultDate: undefined,
  },
};

export default meta;

type DayOfTwoWeekPickerStory = StoryObj<typeof DayOfTwoWeekPicker>;

export const Default: DayOfTwoWeekPickerStory = {};
