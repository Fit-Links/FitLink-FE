import type { Meta, StoryObj } from "@storybook/react";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@5unwan/ui/components/Dropdown";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-background-sub2 p-3">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    open: {
      control: "boolean",
      description: "제어 컴포넌트 방식으로 사용 시 제공하는 값",
    },
    defaultOpen: {
      control: "boolean",
      description: "비제어 컴포넌트 방식으로 사용 시 초기 값",
    },
    onChangeOpen: {
      action: "getChangeIsOpen",
      description: "value 값이 변경될 때 호출되는 콜백 함수",
    },
  },
  args: {
    defaultOpen: false,
    onChangeOpen: (isOpen: boolean) => console.log(`New Value: ${isOpen}`),
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const DUMMY_DATA = [
  { day: "월", hours: "09:00 - 23:00" },
  { day: "화", hours: "12:00 - 12:00" },
  { day: "수", hours: "12:00 - 12:00" },
  { day: "목", hours: "12:00 - 12:00" },
  { day: "금", hours: "12:00 - 12:00" },
  { day: "토", hours: "12:00 - 12:00" },
  { day: "일", hours: "12:00 - 12:00" },
];

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>{`${DUMMY_DATA[0].day} ${DUMMY_DATA[0].hours}`}</DropdownTrigger>
      <DropdownContent>
        {DUMMY_DATA.map((item) => (
          <DropdownItem key={item.day} className="flex gap-2">
            <span className="">{item.day}</span>
            <span>{item.hours}</span>
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>{`${DUMMY_DATA[0].day} ${DUMMY_DATA[0].hours}`}</DropdownTrigger>
      <DropdownSeparator />
      <DropdownContent>
        {DUMMY_DATA.map((item) => (
          <DropdownItem key={item.day} className="flex gap-2">
            <span className="">{item.day}</span>
            <span>{item.hours}</span>
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  ),
};
