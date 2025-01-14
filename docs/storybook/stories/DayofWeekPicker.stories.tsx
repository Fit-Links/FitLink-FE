import DayOfWeekPicker from "@5unwan/ui/components/DayOfWeekPicker";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const meta: Meta<typeof DayOfWeekPicker> = {
  component: DayOfWeekPicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-background-primary"><Story/></div>
    )
  ],
  argTypes: {
    currentDay: {
      control: 'number'
    },
    defaultDay: {
      control: 'number'
    },
    className: {
      control: 'text'
    }
  },
  args: {
    defaultDay: 0,
  }
};
export default meta;

type Story = StoryObj<typeof DayOfWeekPicker>;

export const Uncontrolled: Story = {}

export const Controlled: Story = {
  render: function Render(args) {
    const [{value}, updateArgs] = useArgs();

    const handleCurrentDayChange = (value: number) => {
      updateArgs({value});
    }
    return (
      <>
        <div className="text-text-primary">{value}</div>
        <DayOfWeekPicker {...args} currentDay={value} onCurrentDayChange={handleCurrentDayChange} completed={[true, true, false,false,false,true,false]} className="w-full"/>
      </>
    )
  }
}
