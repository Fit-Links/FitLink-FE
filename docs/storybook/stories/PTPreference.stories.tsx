import { Accordion } from "@5unwan/ui/components/Accordion/index";
import PTPreference from "@5unwan/ui/components/PTPreference";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PTPreference> = {
  component: (args) => (
    <Accordion type="multiple">
      <PTPreference {...args} />
    </Accordion>
  ),
  decorators: [
    (Story) => (
      <div className="bg-background-primary p-5">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    workoutSchedule: [
      {
        dayOfWeek: "MONDAY",
        preferenceTimes: ["10:00", "11:00", "12:00"],
      },
      {
        dayOfWeek: "TUESDAY",
        preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
      },
      {
        dayOfWeek: "WEDNESDAY",
        preferenceTimes: ["10:00", "11:00", "12:00"],
      },
      {
        dayOfWeek: "THURSDAY",
        preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
      },
      {
        dayOfWeek: "FRIDAY",
        preferenceTimes: ["10:00", "11:00", "12:00"],
      },
      {
        dayOfWeek: "SATURDAY",
        preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
      },
      {
        dayOfWeek: "SUNDAY",
        preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof PTPreference>;

export const Default: Story = {};
