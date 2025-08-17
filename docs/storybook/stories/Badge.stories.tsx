import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@5unwan/ui/components/Badge";

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "sub1", "sub2", "brand", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
  args: {
    children: "Badge",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "00/20",
  },
};
export const WithNotification: Story = {
  args: {
    variant: "brand",
    children: "6:00",
    notification: "1",
  },
};
export const Sub1: Story = {
  args: {
    variant: "sub1",
    children: "00/20",
  },
};
export const Sub2: Story = {
  args: {
    variant: "sub2",
    children: "PT완료",
  },
};
export const Brand: Story = {
  args: {
    variant: "brand",
    children: "00/20",
  },
};
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};
