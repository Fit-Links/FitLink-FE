import { ProfileItem, ProfileItemIcon, ProfileItemTitle, ProfileItemContent } from "@5unwan/ui/components/ProfileItem";
import type { Meta, StoryObj } from "@storybook/react";

import { User } from "lucide-react";

const meta: Meta<typeof ProfileItem> = {
  component: ProfileItem,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ProfileItem>;

export const Default: Story = {
  render: () => (
    <ProfileItem>
      <ProfileItemIcon>
        <User />
      </ProfileItemIcon>
      <ProfileItemTitle>이름</ProfileItemTitle>
      <ProfileItemContent>홍길동</ProfileItemContent>
    </ProfileItem>
  ),
};
