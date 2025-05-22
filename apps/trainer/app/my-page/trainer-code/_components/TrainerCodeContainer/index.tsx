"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import Header from "@trainer/app/my-page/_components/Header";
import { myInformationQueries } from "@trainer/queries/myInformation";

import InputWithCopy from "./InputWithCopy";

export default function TrainerCodeContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.trainerCode());

  const trainerCode = response?.data.trainerCode;

  return (
    <section className="flex w-full flex-col items-center">
      <Header title="트레이너 코드" />
      <p className="text-text-sub4 text-body-1 mt-[0.625rem]">
        회원에게 코드를 복사해 공유해 주세요
      </p>
      <InputWithCopy value={trainerCode} />
    </section>
  );
}
