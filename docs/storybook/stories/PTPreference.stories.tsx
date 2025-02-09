import { Meta, StoryObj } from "@storybook/react";
import PTPreference from "@5unwan/ui/components/PTPreference";
import { Accordion } from "@5unwan/ui/components/Accordion/index";

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
        dayOfWeek: "MON",
        preferenceTimes: ["10:00", "11:00", "12:00"],
      },
      {
        dayOfWeek: "TUE",
        preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
      },
      {
        dayOfWeek: "WED",
        preferenceTimes: ["10:00", "11:00", "12:00"],
      },
      {
        dayOfWeek: "THU",
        preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
      },
      {
        dayOfWeek: "FRI",
        preferenceTimes: ["10:00", "11:00", "12:00"],
      },
      {
        dayOfWeek: "SAT",
        preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
      },
      {
        dayOfWeek: "SUN",
        preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof PTPreference>;

export const Default: Story = {};
