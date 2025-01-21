import type { Meta, StoryObj } from "@storybook/react";

import Spinner from "@5unwan/ui/components/Spinner";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "middle"],
      description: "스피너 크기",
    },
    className: {
      control: "text",
      description: "스피너 클래스",
    },
  },
  args: {
    size: "small",
    className: "",
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "small",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Middle: Story = {
  args: {
    size: "middle",
  },
};
