import { Badge } from "@5unwan/ui/components/Badge";
import {
  ProfileItem,
  ProfileItemIcon,
  ProfileItemContent,
  ProfileItemHeader,
} from "@5unwan/ui/components/ProfileItem";
import type { Meta, StoryObj } from "@storybook/react";

import { ChevronRight, User } from "lucide-react";

const meta: Meta<typeof ProfileItem> = {
  component: ProfileItem,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ProfileItem>;

export const Default: Story = {
  render: () => (
    <ProfileItem>
      <ProfileItemHeader>
        <ProfileItemIcon iconName="User" />
        이름
      </ProfileItemHeader>
      <ProfileItemContent>홍길동</ProfileItemContent>
    </ProfileItem>
  ),
};

export const OneContent: Story = {
  render: () => (
    <ProfileItem>
      <ProfileItemHeader>
        <ProfileItemIcon iconName="Code" />
        트레이너 코드
      </ProfileItemHeader>
      <ProfileItemContent>
        <div className="flex items-center">
          <ChevronRight className="h-[1.563rem] w-[1.563rem]" />
        </div>
      </ProfileItemContent>
    </ProfileItem>
  ),
};

export const OneContent2: Story = {
  render: () => (
    <ProfileItem>
      <ProfileItemHeader>
        <ProfileItemIcon iconName="Dumbbell" />
        PT 횟수
      </ProfileItemHeader>
      <ProfileItemContent>
        <Badge>00/20</Badge>
      </ProfileItemContent>
    </ProfileItem>
  ),
};

export const TwoContent: Story = {
  render: () => (
    <ProfileItem>
      <ProfileItemHeader>
        <ProfileItemIcon iconName="Phone" />
        전화번호
      </ProfileItemHeader>
      <ProfileItemContent>
        010 1234 5678
        <div className="text-text-sub4 flex text-[0.938rem] leading-[1.375rem]">
          <div className="flex items-center">변경</div>
          <ChevronRight className="h-[1.563rem] w-[1.563rem]" />
        </div>
      </ProfileItemContent>
    </ProfileItem>
  ),
};
