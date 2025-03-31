import TimeCellToggleGroup from "@5unwan/ui/components/TimeCellToggleGroup";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof TimeCellToggleGroup> = {
  component: TimeCellToggleGroup,
  render: function Render({ selected, onSelectedChange, ...props }) {
    const [value, setValue] = useState<string[]>([]);
    function handleToggledChange(value: string[]) {
      setValue(value);
    }

    return (
      <TimeCellToggleGroup selected={value} onSelectedChange={handleToggledChange} {...props} />
    );
  },
  tags: ["autodocs"],
  args: {
    timeCellInfo: [
      {
        dayOfWeek: "MONDAY",
        time: "08:00",
        disabled: false,
      },
      {
        dayOfWeek: "MONDAY",
        time: "09:00",
        disabled: false,
      },
      {
        dayOfWeek: "MONDAY",
        time: "10:00",
        disabled: false,
      },
      {
        dayOfWeek: "MONDAY",
        time: "11:00",
        disabled: false,
      },
      {
        dayOfWeek: "MONDAY",
        time: "12:00",
        disabled: false,
      },
      {
        dayOfWeek: "MONDAY",
        time: "13:00",
        disabled: true,
      },
    ],
    variant: "notification",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "notification"],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary h-full w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TimeCellToggleGroup>;

export const Default: Story = {
  args: {
    variant: 'default'
  }
};
export const WithToggleLimit: Story = {
  args: {
    toggleLimit: 2,
  },
};
export const WithExceedHandler: Story = {
  args: {
    toggleLimit: 1,
    onExceedToggleLimit: () => {
      alert("exceeded limit");
    },
  },
};
