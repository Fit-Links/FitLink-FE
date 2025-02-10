import { Avatar, AvatarFallback, AvatarImage } from "@5unwan/ui/components/Avatar";
import type { Meta, StoryObj } from "@storybook/react";
import { AlarmClock, Clock } from "lucide-react";
import { FormEvent, useState } from "react";

import {
  SearchBar,
  SearchResult,
  SearchResultMode,
  UserSearch,
} from "@trainer/components/UserSearch";



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
  render: () => {
    const USERS = ["김철수", "이영희", "이영수", "김철영", "정영수"];

    const [searchValue, setSearchValue] = useState<string | number>("");
    const [count, setCount] = useState<number>(USERS.length);

    const handleChangeValue = (value: string | number) => {
      setSearchValue(value);
      setCount(USERS.filter((user) => user.includes(value as string)).length);
    };


    return (
      <div className="bg-background-primary h-full w-full p-6">
        <UserSearch>
        <SearchBar
          placeholder="회원 이름 검색"


          value={searchValue}
          onChangeValue={handleChangeValue}
        />
        <SearchResultMode>
          <div>회원 {count}명</div>
          <div>최신등록순</div>
        </SearchResultMode>
        <SearchResult>

        {USERS.filter((user) => user.includes(searchValue as string)).map((user) => (
          <div key={user} className="p-3 bg-background-sub2 h-[5.625rem] rounded-md w-full flex items-center gap-[0.625rem]">
            <Avatar><AvatarImage src="https://github.com/shadcn.png" /><AvatarFallback></AvatarFallback></Avatar>{user}</div>
        ))}
        </SearchResult>

      </UserSearch>



      </div>
    );

  },
};
