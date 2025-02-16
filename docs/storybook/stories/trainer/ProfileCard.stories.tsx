import { Badge } from "@5unwan/ui/components/Badge";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@5unwan/ui/components/Dropdown/index";
import { Meta, StoryObj } from "@storybook/react";
import ProfileCard from "trainer/components/ProfileCard";

const meta: Meta<typeof ProfileCard> = {
  component: ProfileCard,
  tags: ["autodocs"],
  argTypes: {
    imgUrl: {
      control: "text",
      description: "img url을 입력하여 아바타에 이미지를 삽입합니다.",
    },
    userBirth: {
      control: "date",
      description: "date 타입의 출생일을 입력받아 컴포넌트 내부적으로 나이를 계산합니다.",
    },
    userName: {
      control: "text",
      description: "유저의 이름을 입력 받습니다.",
    },
    phoneNumber: {
      control: "text",
      description: "유저의 휴대폰 번호를 입력 받습니다.",
    },
    PTReservationOtherTime: {
      control: "text",
      description: "유저가 선택한 PT 예약 시간을 입력 받습니다.",
    },
  },
  args: {
    imgUrl: "https://picsum.photos/300",
    userBirth: new Date("1998-07-04"),
    userName: "홍길동",
    phoneNumber: "010 0000 0000",
    PTReservationOtherTime: undefined,
  },
};

export default meta;

const DropdownSchedule = () => {
  const DUMMY_DATA = [
    { day: "월", hours: "09:00 - 23:00" },
    { day: "화", hours: "12:00 - 12:00" },
    { day: "수", hours: "12:00 - 12:00" },
    { day: "목", hours: "12:00 - 12:00" },
    { day: "금", hours: "12:00 - 12:00" },
    { day: "토", hours: "12:00 - 12:00" },
    { day: "일", hours: "12:00 - 12:00" },
  ];

  return (
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
  );
};

type ProfileCardStory = StoryObj<typeof ProfileCard>;

export const Default: ProfileCardStory = {};

export const WithDropdown: ProfileCardStory = {
  render: (args) => (
    <ProfileCard {...args}>
      <DropdownSchedule />
    </ProfileCard>
  ),
};

export const WithPTReservationOtherTime: ProfileCardStory = {
  args: {
    PTReservationOtherTime: "10:00",
  },
  render: (args) => (
    <ProfileCard {...args}>
      <DropdownSchedule />
    </ProfileCard>
  ),
};

export const WithBadge: ProfileCardStory = {
  render: (args) => (
    <ProfileCard {...args}>
      <Badge size="sm" variant={"brand"}>
        00/20
      </Badge>
    </ProfileCard>
  ),
};

export const WithEllipsis: ProfileCardStory = {
  render: (args) => (
    <ProfileCard {...args} ellipsIcon>
      <Badge size="sm" variant={"brand"}>
        00/20
      </Badge>
    </ProfileCard>
  ),
};
