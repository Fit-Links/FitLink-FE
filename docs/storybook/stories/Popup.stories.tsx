import { Button } from "@5unwan/ui/components/Button";
import { PopupProps } from "@5unwan/ui/components/Popup";
import type { Meta, StoryObj } from "@storybook/react";
import { Popup } from "@ui/components/Popup";

const meta: Meta<typeof Popup> = {
  component: Popup,
  tags: ["autodocs"],

  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    positive: {
      control: "object",
    },
    negative: {
      control: "object",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Popup>;

export const Default: Story = {
  args: {
    title: "트레이너와 연동이 필요합니다",
    description: "연동 요청 시 본 서비스를 이용하실 수 있습니다",
    positive: {
      label: "연동 요청하기",
      callback: () => {
        console.log("연동 요청하기");
      },
    },
  },
  render: (args: PopupProps) => {
    return (
      <Popup {...args}>
        <Button>Open</Button>
      </Popup>
    );
  },
};

export const MultiLine: Story = {
  args: {
    title: "당일 변경은 PT 수업 시간의\\n1시간 전부터 가능합니다",
    positive: {
      label: "확인",
      callback: () => {
        console.log("확인");
      },
    },
  },
  render: (args: PopupProps) => {
    return (
      <Popup {...args}>
        <Button>Open</Button>
      </Popup>
    );
  },
};

export const TwoButton: Story = {
  args: {
    title: "대기중인 예약을 취소하시겠습니까?",
    negative: {
      label: "닫기",
      callback: () => {
        console.log("닫기");
      },
    },
    positive: {
      label: "확인",
      callback: () => {
        console.log("확인");
      },
    },
  },
  render: (args: PopupProps) => {
    return (
      <Popup {...args}>
        <Button>Open</Button>
      </Popup>
    );
  },
};
