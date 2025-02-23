import { Button } from "@5unwan/ui/components/Button";
import ProfileHeader from "@5unwan/ui/components/ProfileHeader";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProfileHeader> = {
  component: () => (
    <ProfileHeader>
      <ProfileHeader.Section
        onClick={() => {
          alert("clicked");
        }}
      >
        <ProfileHeader.Avatar name="홍길동" imageSrc="https://picsum.photos/300" />
        <ProfileHeader.Name name="홍길동" />
      </ProfileHeader.Section>
      <ProfileHeader.Section>
        <Button size="sm" className="bg-background-sub2 rounded-full">
          로그아웃
        </Button>
      </ProfileHeader.Section>
    </ProfileHeader>
  ),
};
export default meta;

type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {};
