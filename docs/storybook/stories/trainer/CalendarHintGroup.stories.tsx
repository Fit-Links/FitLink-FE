import { Meta, StoryObj } from "@storybook/react";
import CalendarHintGroup from "trainer/components/CalendarHintGroup";

const meta: Meta<typeof CalendarHintGroup> = {
  component: CalendarHintGroup,
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="bg-background-primary flex h-full w-full items-center justify-center p-10">
      <Story />
    </div>
  ),
};
export default meta;

type Story = StoryObj<typeof CalendarHintGroup>;

export const Default: Story = {
  
}