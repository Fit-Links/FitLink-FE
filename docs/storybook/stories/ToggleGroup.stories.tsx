import { ToggleGroup, ToggleGroupItem } from "@5unwan/ui/components/ToggleGroup";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";

const meta: Meta<typeof ToggleGroup> = {
  component: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: 'ToggleGroup 디자인 종류를 지정합니다'
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: 'ToggleGroup이 toggle할 수 있는 Item의 개수를 지정합니다'
    },
    disabled: {
      control: "boolean",
      description: 'ToggleGroup의 상호작용 여부를 지정합니다'
    },
    rovingFocus: {
      control: "boolean",
      description: 'false일 경우, 화살표 키를 이용하여 Item 사이를 이동할 수 없습니다'
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: 'focus가 이동하는 방식을 지정합니다. horizontal일 경우 좌우 화살표 키로, vertical일 경우 상하 화살표 키로, undefined일 경우 상하좌우 화살표 키로 이동합니다'
    },
    dir: {
      control: "select",
      options: ["ltr", "rtl"],
      description: 'Item이 나열되는 순서를 지정합니다.'
    },
    loop: {
      control: "boolean",
      description: 'rovingFocus와 loop이 true일 때, 화살표 키로 Item을 이동하면 마지막 Item에서 처음 Item으로 이동합니다.'
    },
  },
  args: {
    type: "single",
    onValueChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary w-full py-8">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};
export const Outline: Story = {
  args: {
    variant: "outline",
  },
};
export const Single: Story = {
  args: {
    type: "single",
  },
};
export const Multiple: Story = {
  args: {
    type: "multiple",
  },
};
export const Controlled: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    function handleToggledChange(value: string | string[]) {
      updateArgs({ value: value });
      console.log(value);
    }

    return (
      <>
        <h1 className="text-text-primary p-2 text-center">console.log를 확인해주세요!</h1>
        <ToggleGroup {...args} value={value} onValueChange={handleToggledChange}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </>
    );
  },
};
