import { Switch } from "@5unwan/ui/components/Switch";
import { Meta, StoryObj } from "@storybook/react";
import {fn} from '@storybook/test';
import {useArgs} from '@storybook/preview-api';

const meta: Meta<typeof Switch> = {
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    defaultChecked: {
      control: 'boolean',
      description: '비제어 Switch의 기본 상태를 지정합니다. 제어 컴포넌트일 경우 사용하지 않습니다.'
    },
    checked: {
      control: 'boolean',
      description: '컴포넌트의 제어 상태. onCheckedChange와 함께 사용되어야 합니다'
    },
    onCheckedChange: {
      description: 'Switch 상태가 변경될 때 호출되는 이벤트 핸들러입니다'
    },
    disabled: {
      control: 'boolean',
      description: 'true일 경우 상호작용을 할 수 없게 됩니다.'
    },
    name: {
      control: 'text',
      description: '소속 Form 제출 시 사용되는 name값입니다'
    },
    value: {
      control: 'text',
      description: '소속 Form 제출 시 사용되는 value값입니다'
    }
  },
  args: {
    defaultChecked: false,
    onCheckedChange: fn()
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Uncontrolled: Story = {}
export const Controlled: Story = {
  render: function Render(args) {
    const [{checked}, updateArgs] = useArgs();

    function handleCheckedChange() {
      updateArgs({checked: !checked});
    }

    return (
    <>
      <Switch {...args} onCheckedChange={handleCheckedChange} checked={checked} />
      <div>{`controlled state: ${checked}`}</div>
    </>)
  }
}
export const WithForm: Story = {
  args: {
    name: 'student',
    value: 'Y',
    required: true,
  },
  render: function Render(args) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const fieldValues = Object.fromEntries(formData.entries())

      console.log(`Form Values`, fieldValues);
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col items-start">
        <Switch {...args} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}