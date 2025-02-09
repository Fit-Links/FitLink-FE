import type { Meta, StoryObj } from "@storybook/react";

import { SearchBar, SearchMode, SearchResult } from "trainer/components/SearchBar";

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: "회원 이름 검색",
  },
  render: (args) => (
    <div className="bg-background-primary w-[25.625rem] p-6">
      <SearchBar {...args}>
        <SearchMode>
          <div>검색 기록</div>
          <div>최근 검색 순</div>
        </SearchMode>
        <SearchResult>
          <div>김철수</div>
          <div>이영희</div>
          <div>박영수</div>
        </SearchResult>
      </SearchBar>
    </div>
  ),
};
