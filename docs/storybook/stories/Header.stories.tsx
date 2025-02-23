import Header from "@5unwan/ui/components/Header";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  component: () => (
    <Header>
      <Header.Left>LEFT</Header.Left>
      <Header.Title content="TITLE" />
      <Header.Right>RIGHT</Header.Right>
    </Header>
  ),
};
export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
export const WithBack: Story = {
  render: () => (
    <Header>
      <Header.Back onClick={() => alert("clicked")} />
      <Header.Title content="TITLE" />
      <Header.Right>RIGHT</Header.Right>
    </Header>
  ),
};
