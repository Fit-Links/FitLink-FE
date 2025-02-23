import { Button } from "@5unwan/ui/components/Button";
import { Meta, StoryObj } from "@storybook/react";
import { WithBottomSheetStepper } from "trainer/hoc/WithBottomSheetStepper";

type WrappedComponentProps = {
  value: number;
  onChangeClose: (isOpen: boolean) => void;
};

function ExampleComponent({ value, onChangeClose }: WrappedComponentProps) {
  const handleClick = () => {
    onChangeClose(false);
  };

  return (
    <Button variant="brand" className="h-[3.375rem] w-full" onClick={handleClick}>
      승인 + 전달받은 value: {value}
    </Button>
  );
}

const BottomSheetWithStepper = WithBottomSheetStepper(ExampleComponent);

const meta: Meta<typeof BottomSheetWithStepper> = {
  component: BottomSheetWithStepper,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
  },
  args: {
    title: "PT 횟수 입력",
    description: "회원의 PT 횟수를 입력하여 연동을 승인해주세요",
    incrementOptions: [5, 10, 20],
    children: <Button className="rounded-full border p-3">임시 바텀시트 트리거</Button>,
  },
};

export default meta;

type BottomSheetWithStepperStory = StoryObj<typeof BottomSheetWithStepper>;

export const WithAllProps: BottomSheetWithStepperStory = {};

export const WithTitleAndDescription: BottomSheetWithStepperStory = {
  args: {
    title: "잔여 PT 횟수 수정",
    incrementOptions: undefined,
  },
};

export const WithTitleAndIncrementOptions: BottomSheetWithStepperStory = {
  args: {
    title: "등록 PT 횟수 수정",
    description: undefined,
  },
};
