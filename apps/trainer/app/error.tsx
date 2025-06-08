"use client";

import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import { Text } from "@ui/components/Text";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const handleReset = () => {
    reset();
  };

  console.error("Error:", error);

  return (
    <main className="bg-background-primary flex h-full w-full flex-col items-center justify-between">
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="bg-brand-primary-500 flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full">
          <Icon name="CircleAlert" size={"lg"} />
        </div>

        <Text.Title1 className="mt-7 flex flex-col gap-2 text-center">
          오류가 발생했어요
        </Text.Title1>
        <Text.Subhead1 className="text-text-sub2 mt-2">다시 시도해주세요</Text.Subhead1>
      </section>

      <div className="flex w-full gap-2">
        <Button variant={"brand"} className="mt-10 h-[3.375rem] flex-1" onClick={handleReset}>
          <Text.Headline1>다시 시도</Text.Headline1>
        </Button>
      </div>
    </main>
  );
}
