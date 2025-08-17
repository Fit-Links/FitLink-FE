import { Meta, StoryObj } from "@storybook/react";
import NotificationSideBar from "trainer/components/NotificationSideBar";

const meta: Meta<typeof NotificationSideBar> = {
  component: NotificationSideBar,
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="bg-background-primary flex h-full w-full items-center justify-center p-10">
      <Story />
    </div>
  ),
};

export default meta;

type NotificationSideBarStory = StoryObj<typeof NotificationSideBar>;

export const Default: NotificationSideBarStory = {};
