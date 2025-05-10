import React from "react";

// const NoDayOff = 0;

export default function MyDayOffContainer() {
  //   const { data: response, isLoading } = useSuspenseQuery(myInformationQueries.dayOff());

  //   if (isLoading) {
  // return <div>hihi</div>;
  //   }

  //   const { data: response } = useSuspenseQuery(myInformationQueries.dayOff());

  //   if (response.length === NoDayOff) return;

  return (
    <section className="mt-[1.563rem] w-full">
      <p className="text-headline mb-[0.625rem]">휴무일</p>
      <section className="flex flex-col gap-1">
        {/* {response.map((dayOff) => (
        <div className="bg-background-sub1 text-text-primary flex h-[3.375rem] w-full items-center justify-between rounded-lg px-[0.9375rem]">
          <span>dayOff.dayOffDate</span>
          <Icon name="X" size="lg" className="cursor-pointer" />
        </div>
      ))} */}
      </section>
    </section>
  );
}
