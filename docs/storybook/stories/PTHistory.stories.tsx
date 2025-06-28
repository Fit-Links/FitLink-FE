import PTHistoryItem from "@5unwan/ui/components/PTHistoryItem";
import { Meta, StoryObj } from "@storybook/react";

import { getKoreanDate } from "../../../apps/trainer/utils/date";

const meta: Meta<typeof PTHistoryItem> = {
  component: ({ reservationDate, ...args }) => (
    <PTHistoryItem reservationDate={reservationDate && getKoreanDate(reservationDate)} {...args} />
  ),
  tags: ["autodocs"],
  argTypes: {
    reservationDate: {
      control: "date",
    },
    status: {
      control: "select",
      options: ["COMPLETED", "NO_SHOW", "NONE"],
    },
  },
  args: {
    status: "NONE",
    reservationDate: getKoreanDate(),
  },
};
export default meta;

type Story = StoryObj<typeof PTHistoryItem>;

export const Default: Story = {};
export const Clickable: Story = {
  args: {
    status: "NONE",
    onClick: () => alert("clicked"),
  },
};
