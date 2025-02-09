import type { Meta, StoryObj } from "@storybook/react";

import SearchFallback from "@trainer/components/SearchFallback";

const meta: Meta<typeof SearchFallback> = {
  component: SearchFallback,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SearchFallback>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
  render: (args) => (
    <div className="text-text-primary bg-background-primary flex h-screen w-screen flex-col items-center p-3">
      <SearchFallback {...args} />,
    </div>
  ),
};
