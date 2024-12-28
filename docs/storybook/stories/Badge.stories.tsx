import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@5unwan/ui/badge";

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'sub1', 'sub2', 'brand', 'destructive']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    }
  },
  args: {
    children: "Badge",
    size: 'medium'
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: '00/20'
  },
};
export const Sub1: Story = {
  args: {
    variant: 'sub1',
    children: '00/20'
  }
}
export const Sub2: Story = {
  args: {
    variant: 'sub2',
    children: 'PT완료'
  }
}
export const Brand: Story = {
  args: {
    variant: 'brand',
    children: '00/20'
  }
}
export const Destructive: Story = {
  args: {
    variant: 'destructive'
  }
}