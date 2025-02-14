import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@5unwan/ui/components/Button";
import { icons } from "lucide-react";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "negative", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    corners: {
      control: "select",
      options: ["rounded", "pill"],
    },
    icon: {
      control: "select",
      options: Object.keys(icons),
    },
    iconRight: {
      control: "select",
      options: Object.keys(icons),
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    children: "Button",
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary flex w-full items-center justify-center p-[10px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const WithIcon: Story = {
  args: {
    icon: "Pencil",
  },
};
export const WithIconRight: Story = {
  args: {
    iconRight: "ChevronRight",
  },
};
export const WithIconOnly: Story = {
  args: {
    children: undefined,
    icon: "Pencil",
  },
};
export const Pill: Story = {
  args: {
    corners: "pill",
  },
};
