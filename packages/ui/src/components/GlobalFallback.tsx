import { Button } from "@ui/components/Button";

const UNAUTHORIZED_ERROR_CODE = "Unauthorized";
const UNAUTHORIZED_ERROR_MESSAGE = "로그인 세션이 만료되었습니다.";
const UNAUTHORIZED_BUTTON_TEXT = "로그인 페이지로 이동";

const DEFAULT_ERROR_MESSAGE = "오류가 발생했습니다.";
const DEFAULT_RETRY_BUTTON_TEXT = "재시도 하기";

type GlobalFallbackProps = {
  reset: () => void;
  error: Error;
  onUnauthorizedRouting: () => void;
};

export default function GlobalFallback({
  reset,
  error,
  onUnauthorizedRouting,
}: GlobalFallbackProps) {
  const handleClickReset = () => {
    if (error.message === UNAUTHORIZED_ERROR_CODE) {
      onUnauthorizedRouting();
    } else {
      reset();
    }
  };

  const ERROR_MESSAGE =
    error.message === UNAUTHORIZED_ERROR_CODE ? UNAUTHORIZED_ERROR_MESSAGE : DEFAULT_ERROR_MESSAGE;
  const BUTTON_TEXT =
    error.message === UNAUTHORIZED_ERROR_CODE
      ? UNAUTHORIZED_BUTTON_TEXT
      : DEFAULT_RETRY_BUTTON_TEXT;

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-text-primary text-title-2">{ERROR_MESSAGE}</p>
      <p className="text-text-sub3 text-body-1 mt-[0.688rem]">다시 연결을 시도해주세요</p>
      <Button
        variant={"brand"}
        className="text-body-1 mt-[3rem] h-[2rem] w-fit cursor-pointer rounded-2xl"
        onClick={handleClickReset}
      >
        {BUTTON_TEXT}
      </Button>
    </section>
  );
}
