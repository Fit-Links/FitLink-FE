import TimePicker from "@5unwan/ui/components/TimePicker";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-[240px] w-fit items-center justify-center bg-black">
        <Story />
      </div>
    ),
  ],
  args: {
    startNumber: 0,
    initIdx: 1,
    label: undefined,
    length: 12,
    loop: false,
    viewPerspective: "center",
    setValue: undefined,
    width: 23,
  },
  argTypes: {
    startNumber: {
      control: "number",
      description: "TimePicker의 시작 숫자를 설정합니다.",
    },
    initIdx: {
      control: "number",
      description: "초기 인덱스를 숫자로 설정할 수 있습니다.",
    },
    label: {
      control: "text",
      description: "텍스트 입력을 통해 라벨을 설정할 수 있습니다.",
    },
    length: {
      control: "number",
      description: "TimePicker의 길이를 숫자로 설정할 수 있습니다.",
    },
    loop: {
      control: "boolean",
      description: "루프 기능을 켜거나 끌 수 있습니다.",
    },
    viewPerspective: {
      control: "select",
      options: ["left", "right", "center"],
    },
    setValue: {
      action: "setValue",
      description:
        "sliderState와 함께 동작하여 각 슬라이드의 상대적 위치나 절대적인 값을 계산한 후, 이를 이용해 value를 생성하는 역할의 외부에서 주입되는 콜백 함수입니다.",
    },
    width: {
      control: "number",
      description: "TimePicker의 너비를 설정 할 수 있습니다.",
    },
    ref: {
      action: "getValue",
      description: "ref 주입을 통해 TimePicker에서 선택한 아이템을 참조할 수 있습니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    initIdx: 0,
    length: 60,
    loop: false,
    width: 23,
  },
  render: (args) => {
    return (
      <div className="h-[180px] w-[70px]">
        <TimePicker {...args} />
      </div>
    );
  },
};

export const SetHourAndMinites: Story = {
  render: () => (
    <>
      <div className="h-[180px] w-[70px]">
        <TimePicker initIdx={0} length={24} width={23} loop={false} />
      </div>
      <div className="h-[180px] w-[70px]">
        <TimePicker initIdx={0} length={60} width={23} loop={false} />
      </div>
    </>
  ),
};

export const WithTimePeriods: Story = {
  render: () => {
    const setHalfHours = (relative: number) => {
      return relative ? "30" : "00";
    };
    const setTimePeriods = (relative: number) => {
      return relative ? "오후" : "오전";
    };
    return (
      <>
        <div className="h-[180px] w-[70px]">
          <TimePicker
            initIdx={0}
            length={2}
            width={40}
            loop={false}
            viewPerspective="right"
            setValue={setTimePeriods}
          />
        </div>
        <div className="h-[180px] w-[70px]">
          <TimePicker startNumber={1} initIdx={0} length={12} width={23} loop={false} />
        </div>
        <div className="h-[180px] w-[70px]">
          <TimePicker
            initIdx={0}
            length={2}
            width={23}
            loop={false}
            viewPerspective="left"
            setValue={setHalfHours}
          />
        </div>
      </>
    );
  },
};
