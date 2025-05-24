import { ErrorBoundaryFallbackProps } from "@suspensive/react";
import { Button } from "@ui/components/Button";
import RequestStatus from "@ui/components/RequestStatus";
import { SheetClose, SheetFooter } from "@ui/components/Sheet";

function SheetErrorFallback({ error, reset }: ErrorBoundaryFallbackProps<Error>) {
  return (
    <>
      <RequestStatus
        status="error"
        contentPerStatus={{
          error: {
            title: "네트워크 요청 중 오류가 발생했습니다",
            description: error.message,
          },
          success: {
            title: "성공",
          },
        }}
      />
      <SheetFooter>
        <div className="flex w-full justify-center gap-[0.625rem]">
          <SheetClose asChild>
            <Button size={"xl"} variant={"secondary"} className="w-full">
              닫기
            </Button>
          </SheetClose>
          <Button size={"xl"} className="w-full" onClick={reset}>
            다시 시도하기
          </Button>
        </div>
      </SheetFooter>
    </>
  );
}

export default SheetErrorFallback;
