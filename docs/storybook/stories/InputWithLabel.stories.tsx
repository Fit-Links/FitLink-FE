import type { Meta, StoryObj } from "@storybook/react";

import {
  InputWithLabel,
  InputField,
  InputLabel,
  ResidentNumberInput,
  InputWithLabelError,
} from "@5unwan/ui/components/InputWithLabel/index";

const meta: Meta<typeof InputWithLabel> = {
  component: InputWithLabel,
  tags: ["autodocs"],
  args: {
    id: "tempId",
    error: false,
  },
  argTypes: {
    id: {
      control: "text",
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;

type InputWithLabelStory = StoryObj<typeof InputWithLabel>;

export const Default: InputWithLabelStory = {
  args: {
    id: "tempID",
    error: false,
  },
  render: (args) => (
    <InputWithLabel {...args}>
      <InputLabel>이름</InputLabel>
      <InputField />
    </InputWithLabel>
  ),
};

export const ResidentNumber: InputWithLabelStory = {
  args: {
    id: "tempID",
    error: false,
  },
  render: (args) => (
    <InputWithLabel {...args}>
      <InputLabel>주민번호</InputLabel>
      <ResidentNumberInput />
    </InputWithLabel>
  ),
};

export const Error: InputWithLabelStory = {
  args: {
    id: "tempID",
    error: true,
  },
  render: (args) => (
    <InputWithLabel {...args}>
      <InputLabel>이름</InputLabel>
      <InputField />
      <InputWithLabelError>잘못된 이름입니다</InputWithLabelError>
    </InputWithLabel>
  ),
};
