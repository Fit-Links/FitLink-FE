import { Skeleton } from "@5unwan/ui/components/Skeleton";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="bg-background-primary w-screen h-screen flex items-center justify-center">
      <Story />
    </div>
  )
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
