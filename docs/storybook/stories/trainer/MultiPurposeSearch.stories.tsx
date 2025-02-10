import { Avatar, AvatarFallback, AvatarImage } from "@5unwan/ui/components/Avatar";
import type { Meta, StoryObj } from "@storybook/react";
import { AlarmClock, Clock } from "lucide-react";
import { FormEvent, useState } from "react";

import {
  MultiPurposeSearch,
  SearchBar,
  SearchResult,
} from "trainer/components/MultiPurposeSearch";


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

    const [searchValue, setSearchValue] = useState<string | number>("");
    const [count, setCount] = useState<number>(USERS.length);

    const handleChangeValue = (value: string | number) => {
      setSearchValue(value);
      setCount(USERS.filter((user) => user.includes(value as string)).length);
    };


    return (
      <div className="bg-background-primary h-full w-full p-6" {...args}>
        <MultiPurposeSearch>
        <SearchBar
          placeholder="회원 이름 검색"

          value={searchValue}
          onChangeValue={handleChangeValue}
        />
        <SearchResult label={`회원 ${count}명`} sortComponent={<div>최신둥록순</div>}>
        {USERS.filter((user) => user.includes(searchValue as string)).map((user) => (
          <div key={user} className="p-3 bg-background-sub2 h-[5.625rem] rounded-md w-full flex items-center gap-[0.625rem]">
            <Avatar><AvatarImage src="https://github.com/shadcn.png" /><AvatarFallback></AvatarFallback></Avatar>{user}</div>
        ))}
        </SearchResult>

      </MultiPurposeSearch>


      </div>
    );

  },
};
