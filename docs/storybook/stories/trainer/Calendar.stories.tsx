import type { Meta, StoryObj } from "@storybook/react";

import Calendar from "trainer/components/Calendar/index.tsx";

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="bg-background-primary flex h-full w-full items-center justify-center p-10">
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => <Calendar />,
};
