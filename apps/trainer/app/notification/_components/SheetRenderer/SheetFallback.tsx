import { Button } from "@ui/components/Button";
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@ui/components/Sheet";
import { Skeleton } from "@ui/components/Skeleton";

function SheetFallback() {
  return (
    <>
      <SheetHeader className="items-center">
        <SheetTitle className="flex justify-center">연동 승인</SheetTitle>
        <SheetDescription>
          <Skeleton />
        </SheetDescription>
      </SheetHeader>
      <div className="bg-background-sub1 flex h-[5.625rem] items-center gap-[10px] rounded-[0.625rem] px-[20px]">
        <Skeleton className="h-[3.125rem] w-[3.125rem] rounded-full " />
        <div className="flex h-[40px] flex-col justify-between">
          <Skeleton className="h-[17px] w-[50px]" />
          <Skeleton className="h-[13px] w-[100px]" />
        </div>
      </div>
      <SheetFooter>
        <div className="flex w-full justify-center gap-[0.625rem]">
          <Button
            disabled
            size={"xl"}
            className="disabled:bg-background-sub1 w-full"
            variant={"secondary"}
          >
            거절
          </Button>
          <Button
            disabled
            size={"xl"}
            className="disabled:bg-background-sub1 w-full"
            variant={"negative"}
          >
            승인
          </Button>{" "}
        </div>
      </SheetFooter>
    </>
  );
}

export default SheetFallback;
