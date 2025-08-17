import ScheduleBottomSheet from "trainer/app/schedule-management/_components/ScheduleBottomSheet";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ScheduleBottomSheet> = {
  component: ScheduleBottomSheet,
  tags: ["autodocs"],
  args: {
    selectedDate: new Date(),
    trigger: <button className="rounded-full border p-3">임시 버튼 클릭</button>,
  },
  argTypes: {
    selectedDate: {
      control: "date",
      description: "ScheduleBottomSheet의 헤더에 나타낼 날짜를 주입 받습니다.",
    },
    trigger: {
      description: "ScheduleBottomSheet를 open 상태를 변경하는 트리거 컴포넌트를 주입 받습니다.",
    },
  },
};

export default meta;

type ScheduleBottomSheetStory = StoryObj<typeof ScheduleBottomSheet>;

export const Default: ScheduleBottomSheetStory = {
  render: (args) => <ScheduleBottomSheet {...args} />,
};
