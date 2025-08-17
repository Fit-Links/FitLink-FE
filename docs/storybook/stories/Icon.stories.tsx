import Icon from "@5unwan/ui/components/Icon";
import { Meta, StoryObj } from "@storybook/react";
import { icons } from "lucide-react";
import { cn } from "../../../packages/ui/src/lib/utils";

const meta: Meta<typeof Icon> = {
  component: ({ className, ...args }) => (
    <Icon className={cn("text-text-primary", className)} {...args} />
  ),
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    name: {
      control: "select",
      options: Object.keys(icons),
    },
    background: {
      control: "select",
      options: ["brand", "sub1", "sub2", "sub3", "sub4", "sub5", "notification"],
    },
  },
  args: {
    name: "AArrowDown",
    size: "md",
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

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};
export const WithBackground: Story = {
  args: {
    background: "brand",
  },
};
