import type { Meta, StoryObj } from "@storybook/react";

import { InputWithIcon, InputField, InputIcon } from "@5unwan/ui/components/InputWithIcon/index";
import { Search } from "lucide-react";

const meta: Meta<typeof InputWithIcon> = {
  component: InputWithIcon,
  tags: ["autodocs"],
  args: {
    id: "tempId",
  },
  argTypes: {
    id: {
      control: "text",
    },
  },
};

export default meta;

type InputWithIconStory = StoryObj<typeof InputWithIcon>;

export const Default: InputWithIconStory = {
  args: {
    id: "tempId",
  },
  render: (args) => (
    <InputWithIcon {...args}>
      <InputIcon>
        <Search size={20} color="gray" />
      </InputIcon>
      <InputField />
    </InputWithIcon>
  ),
};
