import { Button } from "@ui/components/Button";
import React, { forwardRef } from "react";

type SearchFallbackProps = React.ComponentProps<"button">;

const SearchFallback = forwardRef<HTMLButtonElement, SearchFallbackProps>(({ ...props }, ref) => {
  return (
    <section className="mt-[5.688rem] flex h-full w-full flex-col items-center ">
      <p className="text-text-primary text-[1.063rem] font-semibold leading-[1.875rem]">
        회원 검색에 실패했어요
      </p>
      <p className="text-text-sub3 text-[0.938rem] font-normal leading-[1.875rem]">
        네트워크 연결 상태를 확인해 주세요
      </p>
      <Button
        ref={ref}
        variant={"brand"}
        className="text-body-1 mt-[1rem] h-[2rem] w-[6.313rem] cursor-pointer rounded-2xl"
        {...props}
      >
        재시도 하기
      </Button>
    </section>
  );
});
SearchFallback.displayName = "SearchFallback";

export default SearchFallback;
