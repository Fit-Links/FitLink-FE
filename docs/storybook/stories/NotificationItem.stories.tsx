import type { Meta, StoryObj } from "@storybook/react";

import NotificationItem from "@5unwan/ui/components/NotificationItem/NotificationItem";

const meta: Meta<typeof NotificationItem> = {
  component: ({ createdAt, eventDate, ...args }) => {
    const formattedCreatedAt = createdAt ? new Date(createdAt) : createdAt;
    const formattedEventDate = eventDate ? new Date(eventDate) : eventDate;

    return (
      <NotificationItem {...args} createdAt={formattedCreatedAt} eventDate={formattedEventDate} />
    );
  },
  tags: ["autodocs"],
  argTypes: {
    isCompleted: {
      control: "boolean",
    },
    avatarSrc: {
      control: "text",
    },
    createdAt: {
      control: "date",
    },
    message: {
      control: "text",
    },
    eventDate: {
      control: "date",
    },
    eventDetail: {
      control: "text",
    },
    variant: {
      control: "select",
      options: [
        "preExercise",
        "postExercise",
        "exerciseConfirm",
        "reserve",
        "cancel",
        "edit",
        "connect",
        "disconnect",
        "deny",
        "session",
      ],
    },
    memberName: {
      control: "text",
    },
  },
};
export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Default: Story = {
  args: {
    message: "회원님이 PT 예약을 요청했습니다",
    variant: "reserve",
    createdAt: "2025-01-16T12:25",
    memberName: "홍길동",
    isCompleted: false,
  },
};
export const WithEvent: Story = {
  args: {
    message: "회원님이 PT 예약을 요청했습니다",
    variant: "reserve",
    createdAt: "2025-01-16T14:25",
    avatarSrc: "https://picsum.photos/200",
    eventDetail: "예약 대기중 4명",
    eventDate: "2025-01-24T14:00",
    memberName: "홍길동",
  },
};
