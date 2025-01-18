import type { Meta, StoryObj } from "@storybook/react";

import {
  Card,
  CardContent,
  CardOption,
  CardHeader,
  CardFooter,
  CardSeperate,
  CardDescription,
} from "@5unwan/ui/components/Card";

import { Avatar, AvatarFallback, AvatarImage } from "@5unwan/ui/components/Avatar";
import { Badge } from "@5unwan/ui/components/Badge";

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["hover", "focused"],
      },
    },
  },
  args: {
    variant: "hover",
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: "hover",
  },
  render: (args) => (
    <Card {...args}>
      <CardSeperate>
        <CardHeader>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="text-[17px]">홍길동</div>
            <div className="text-text-sub3 ml-[7px] text-[13px]">20세</div>
          </div>
          <div>
            <div className="text-[13px]">010 1234 5678</div>
          </div>
        </CardContent>
        <CardFooter className="mr-[20px]">
          <Badge variant="brand" size="sm">
            12/20
          </Badge>
        </CardFooter>
      </CardSeperate>

      <CardOption className="text-text-sub3 tracking-[-3px]">∙∙∙</CardOption>
    </Card>
  ),
};

export const Hover: Story = {
  args: {
    variant: "hover",
  },
  render: (args) => (
    <Card {...args}>
      <CardSeperate>
        <CardHeader>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="text-[17px]">홍길동</div>
            <div className="text-text-sub3 ml-[7px] text-[13px]">20세</div>
          </div>
          <div>
            <div className="text-[13px]">010 1234 5678</div>
          </div>
        </CardContent>
        <CardFooter className="mr-[20px]">
          <Badge variant="brand" size="sm">
            12/20
          </Badge>
        </CardFooter>
      </CardSeperate>

      <CardOption className="text-text-sub3 tracking-[-3px]">∙∙∙</CardOption>
    </Card>
  ),
};

export const Focused: Story = {
  args: {
    variant: "focused",
  },
  render: (args) => (
    <Card {...args}>
      <CardSeperate>
        <CardHeader>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="text-[17px]">홍길동</div>
            <div className="text-text-sub3 ml-[7px] text-[13px]">20세</div>
          </div>
          <div>
            <div className="text-[13px]">010 1234 5678</div>
          </div>
        </CardContent>
        <CardFooter className="mr-[20px]">
          <Badge variant="brand" size="sm">
            12/20
          </Badge>
        </CardFooter>
      </CardSeperate>

      <CardOption className="text-text-sub3 tracking-[-3px]">∙∙∙</CardOption>
    </Card>
  ),
};
