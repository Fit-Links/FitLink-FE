import type { Meta, StoryObj } from "@storybook/react";

import Stepper from "@5unwan/ui/components/Stepper";

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "number",
    },
    step: {
      control: "number",
    },
    getChangeValue: {
      action: "getChangeValue",
      description: "value 값이 변경될 때 호출되는 콜백 함수",
    },
  },
  args: {
    defaultValue: 0,
    step: 1,
    getChangeValue: (value: number) => console.log(`New Value: ${value}`),
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    defaultValue: 0,
    step: 1,
    getChangeValue: (value: number) => console.log(`New Value: ${value}`),
  },
};
