import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarImage, AvatarFallback } from "@5unwan/ui/components/Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type AvatarStory = StoryObj<typeof Avatar>;
type AvatarImageStory = StoryObj<typeof AvatarImage>;
type AvatarFallbackStory = StoryObj<typeof AvatarFallback>;

export const Default: AvatarStory = {
  args: {
    disabled: false,
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://picsum.photos/300" alt="유저 프로필" />
      <AvatarFallback />
    </Avatar>
  ),
};

export const Disabled: AvatarStory = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://picsum.photos/300" alt="유저 프로필" />
      <AvatarFallback />
    </Avatar>
  ),
};

export const CustomizableImage: AvatarImageStory = {
  args: {
    src: "https://picsum.photos/300",
    alt: "유저 프로필",
  },
  argTypes: {
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
  },
  render: (args) => {
    return (
      <Avatar>
        <AvatarImage {...args} />
        <AvatarFallback />
      </Avatar>
    );
  },
};

export const CustomizableFallback: AvatarFallbackStory = {
  args: {
    children: undefined,
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
  render: (args) => (
    <Avatar>
      <AvatarFallback>{args.children}</AvatarFallback>
    </Avatar>
  ),
};
