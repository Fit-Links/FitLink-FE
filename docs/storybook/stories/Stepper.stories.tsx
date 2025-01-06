import type { Meta, StoryObj } from "@storybook/react";

import Stepper from "@5unwan/ui/components/Stepper";

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "number",
      description: "제어 컴포넌트 방식으로 사용 시 제공하는 값",
    },
    defaultValue: {
      control: "number",
      description: "비제어 컴포넌트 방식으로 사용 시 초기 값",
    },
    step: {
      control: "number",
      description: "증감 간격",
    },
    onChangeValue: {
      action: "getChangeValue",
      description: "value 값이 변경될 때 호출되는 콜백 함수",
    },
  },
  args: {
    defaultValue: 0,
    step: 1,
    onChangeValue: (value: number) => console.log(`New Value: ${value}`),
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    value: undefined,
    defaultValue: 0,
    step: 1,
    onChangeValue: (value: number) => console.log(`New Value: ${value}`),
  },
};
