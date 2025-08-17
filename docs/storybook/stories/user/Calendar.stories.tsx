import { Meta, StoryObj } from "@storybook/react";
import Calendar from "user/app/schedule-management/_components/Calendar/index";

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

type CalendarStory = StoryObj<typeof Calendar>;

export const Default: CalendarStory = {};
