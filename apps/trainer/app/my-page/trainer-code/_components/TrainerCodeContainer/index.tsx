import InputWithCopy from "./InputWithCopy";

export default function TrainerCodeContainer() {
  return (
    <section className="flex w-full flex-col items-center">
      <p className="text-text-sub4 text-body-1 mt-[0.625rem]">
        회원에게 코드를 복사해 공유해 주세요
      </p>
      <InputWithCopy value={"12345"} />
    </section>
  );
}
