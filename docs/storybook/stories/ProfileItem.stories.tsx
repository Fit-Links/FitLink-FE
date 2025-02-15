import { Badge } from "@5unwan/ui/components/Badge";
import {
  ProfileItem,
  ProfileItemIcon,
  ProfileItemContent,
  ProfileItemHeader,
} from "@5unwan/ui/components/ProfileItem";
import type { Meta, StoryObj } from "@storybook/react";

import { ChevronRight } from "lucide-react";

const meta: Meta<typeof ProfileItem> = {
  component: ProfileItem,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ProfileItem>;

export const Default: Story = {
  render: () => <ProfileItem variant="name">홍길동</ProfileItem>,
};

export const OneContent: Story = {
  render: () => (
    <ProfileItem variant="code">
      <div className="flex items-center">
        <ChevronRight className="h-[1.563rem] w-[1.563rem]" />
      </div>
    </ProfileItem>
  ),
};

export const OneContent2: Story = {
  render: () => (
    <ProfileItem variant="dumbbell">
      <Badge>00/20</Badge>
    </ProfileItem>
  ),
};

export const TwoContent: Story = {
  render: () => (
    <ProfileItem variant="phone">
      010 1234 5678
      <div className="text-text-sub4 flex text-[0.938rem] leading-[1.375rem]">
        <div className="flex items-center">변경</div>
        <ChevronRight className="h-[1.563rem] w-[1.563rem]" />
      </div>
    </ProfileItem>
  ),
};
