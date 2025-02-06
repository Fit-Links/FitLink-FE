import TimeCellToggleGroup from "@5unwan/ui/components/TimeCellToggleGroup";
import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof TimeCellToggleGroup> = {
  component: TimeCellToggleGroup,
  tags: ["autodocs"],
  args: {
    timeCellInfo: [
      {
        dayOfWeek: "MON",
        time: '08:00',
        disabled: false,
      },
      {
        dayOfWeek: "MON",
        time: '09:00',
        disabled: false,
      },
      {
        dayOfWeek: "MON",
        time: '10:00',
        disabled: false,
      },
      {
        dayOfWeek: "MON",
        time: '11:00',
        disabled: false,
      },
      {
        dayOfWeek: "MON",
        time: '12:00',
        disabled: false,
      },
      {
        dayOfWeek: "MON",
        time: '13:00',
        disabled: true,
      },
    ],
    variant: 'notification',
    toggleLimit: 1
  },
  argTypes: {
    variant: {
      control:'select',
      options: ['default', 'notification']
    }
  },
  decorators: [
    (Story) => <div className="bg-background-primary w-full h-full"><Story/></div>
  ]
};

export default meta;

type Story = StoryObj<typeof TimeCellToggleGroup>;

export const Default: Story = {
  render: function Render({selected, onSelectedChange, ...props}) {
    const [value, setValue] = useState<string[]>([]);
    function handleToggledChange(value: string[]) {
      setValue(value);
    }

    return <TimeCellToggleGroup selected={value} onSelectedChange={handleToggledChange} {...props}/>
  }
}