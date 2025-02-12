import PTHistoryItem from "@5unwan/ui/components/PTHistoryItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PTHistoryItem> = {
  component: ({ reservationDate, ...args }) => (
    <PTHistoryItem reservationDate={reservationDate && new Date(reservationDate)} {...args} />
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
    status: "COMPLETED",
    reservationDate: new Date()
  },
};
export default meta;

type Story = StoryObj<typeof PTHistoryItem>;

export const Default: Story = {};
export const Clickable: Story = {
  args: {
    status: 'NONE',
    onClick: () => alert('clicked')
  }
}