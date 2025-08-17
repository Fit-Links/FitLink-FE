import RequestStatus from "@5unwan/ui/components/RequestStatus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RequestStatus> = {
  component: RequestStatus,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full h-[300px] flex items-center justify-center bg-background-primary"><Story/></div>
    )
  ],
  args: {
    status: 'success',
    contentPerStatus: {
      success: {
        title: '회원가입이 완료되었습니다',
      },
      error: {
        title: '회원가입에 실패했습니다',
        description: '네트워크 연결 상태를 확인하고 다시 시도해주세요'
      }
    }
  },
  argTypes: {
    status: {
      options: ['pending', 'success', 'error'],
      control: 'select',
    },
    contentPerStatus: {
      control: 'object'
    }
  },
};

export default meta;

type Story = StoryObj<typeof RequestStatus>;

export const Default: Story = {}