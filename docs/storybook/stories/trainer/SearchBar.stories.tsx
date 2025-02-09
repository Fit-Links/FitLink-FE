import type { Meta, StoryObj } from "@storybook/react";
import { AlarmClock, Clock } from "lucide-react";
import { FormEvent, useState } from "react";

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
  render: (args) => {
    const USERS = ["김철수", "이영희", "이영수", "김철영", "정영수"];

    const [searchResult, setSearchResult] = useState<string>("");
    const [count, setCount] = useState<number>(0);

    const handleChangeResult = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchResult(event.target.value);
      setCount(USERS.filter((user) => user.includes(event.target.value)).length);
    };

    return (
      <div className="bg-background-primary w-[25.625rem] p-6">
        <SearchBar {...args} value={searchResult} onChange={handleChangeResult}>
          <SearchMode>
            <div>{!searchResult ? "검색 기록" : `회원 ${count}명`}</div>
            <div>최근 검색 순</div>
          </SearchMode>
          <SearchResult>
            {USERS.filter((user) => user.includes(searchResult)).map((user) => (
              <div className="text-text-primary flex items-center" key={user}>
                {!searchResult && <Clock className="mr-2 h-[1.563rem] w-[1.563rem]" />}
                {user}
              </div>
            ))}
          </SearchResult>
        </SearchBar>
      </div>
    );
  },
};
