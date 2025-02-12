import { Meta, StoryObj } from "@storybook/react";
import BottomNavigation from "trainer/components/BottomNavigation";

const meta: Meta<typeof BottomNavigation> = {
  component: BottomNavigation,
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="w-[24.563rem]">
      <Story />
    </div>
  ),
};

export default meta;

type BottomNavigationStory = StoryObj<typeof BottomNavigation>;

export const Default: BottomNavigationStory = {
  render: () => <BottomNavigation />,
};
