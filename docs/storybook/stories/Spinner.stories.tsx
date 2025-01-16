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
    loading: {
      control: "boolean",
      description: "스피너 로딩 여부",
    },
    className: {
      control: "text",
      description: "스피너 클래스",
    },
  },
  args: {
    size: "small",
    loading: true,
    className: "",
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "small",
    loading: true,
  },
};
export const Small: Story = {
  args: {
    size: "small",
    loading: true,
  },
};
export const Middle: Story = {
  args: {
    size: "middle",
    loading: true,
  },
};
