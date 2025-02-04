import {
  InputOTP,
  InputOTPGroup,
  InputOTPMessage,
  InputOTPSlot,
} from "@5unwan/ui/components/InputOTP";
import { Meta, StoryObj } from "@storybook/react";

type StoryInputOTPProps = React.ComponentProps<typeof InputOTP> & {
  variant?: "default" | "focused" | "filled" | "error";
  errorMessage?: string | null;
};

const meta: Meta<StoryInputOTPProps> = {
  component: InputOTP,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "focused", "filled", "error"],
    },
    errorMessage: {
      control: "text",
    },
  },
  args: {
    maxLength: 5,
    errorMessage: null,
  },
};
export default meta;

type Story = StoryObj<StoryInputOTPProps>;

const renderInputOTP = (args: StoryInputOTPProps) => (
  <InputOTP maxLength={args.maxLength}>
    <InputOTPGroup>
      {[...Array(args.maxLength)].map((_, index) => (
        <InputOTPSlot key={index} index={index} variant={args.variant} />
      ))}
    </InputOTPGroup>
    <InputOTPMessage variant={args.variant}>{args.errorMessage}</InputOTPMessage>
  </InputOTP>
);

export const Default: Story = {
  args: {
    variant: "default",
    errorMessage: "입력한 코드를 확인해 주세요.",
  },
  render: renderInputOTP,
};

export const Focused: Story = {
  args: {
    variant: "focused",
    errorMessage: "입력한 코드를 확인해 주세요.",
  },
  render: renderInputOTP,
};

export const Filled: Story = {
  args: {
    variant: "filled",
    errorMessage: "입력한 코드를 확인해 주세요.",
  },
  render: renderInputOTP,
};

export const Error: Story = {
  args: {
    variant: "error",
    errorMessage: "입력한 코드를 확인해 주세요.",
  },
  render: renderInputOTP,
};
