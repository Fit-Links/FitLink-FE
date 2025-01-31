import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@5unwan/ui/components/Button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['brand', 'negative', 'dark', 'destructive']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon']
    }
  },
  decorators: [
    (Story) => (<div className="bg-background-primary p-[10px] w-full flex items-center justify-center"><Story/></div>)
  ]
};
export default meta;

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (args) => (<Button {...args}>Button</Button>)
}