import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@5unwan/ui/components/Text";

const meta: Meta<typeof Text> = {
  tags: ["autodocs"],
  component: Text,
  argTypes: {
    children: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Fit-Link",
    className: "text-black",
  },
};

export const Title1: Story = {
  render: (args) => <Text.Title1 {...args} />,
  args: {
    children: "Title1",
    className: "text-black",
  },
};

export const Title2: Story = {
  render: (args) => <Text.Title2 {...args} />,
  args: {
    children: "Title2",
    className: "text-black",
  },
};

export const Headline1: Story = {
  render: (args) => <Text.Headline1 {...args} />,
  args: {
    children: "Headline1",
    className: "text-black",
  },
};

export const Subhead1: Story = {
  render: (args) => <Text.Subhead1 {...args} />,
  args: {
    children: "Subhead1",
    className: "text-black",
  },
};

export const Subhead2: Story = {
  render: (args) => <Text.Subhead2 {...args} />,
  args: {
    children: "Subhead2",
    className: "text-black",
  },
};

export const Body1: Story = {
  render: (args) => <Text.Body1 {...args} />,
  args: {
    children: "Body1",
    className: "text-black",
  },
};

export const Body2: Story = {
  render: (args) => <Text.Body2 {...args} />,
  args: {
    children: "Body2",
    className: "text-black",
  },
};

export const Body3: Story = {
  render: (args) => <Text.Body3 {...args} />,
  args: {
    children: "Body3",
    className: "text-black",
  },
};

export const Body4: Story = {
  render: (args) => <Text.Body4 {...args} />,
  args: {
    children: "Body4",
    className: "text-black",
  },
};
