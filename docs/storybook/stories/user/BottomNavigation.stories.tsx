import { Meta, StoryObj } from "@storybook/react";
import BottomNavigation from "user/components/BottomNavigation";

const meta: Meta<typeof BottomNavigation> = {
  component: BottomNavigation,
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="h-[5.063rem] w-full">
      <Story />
    </div>
  ),
};

export default meta;

type BottomNavigationStory = StoryObj<typeof BottomNavigation>;

export const Default: BottomNavigationStory = {};
