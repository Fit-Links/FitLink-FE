import { PtUser } from "@trainer/services/types/userManagement.dto";

import Header from "./_components/Header";
import SelectPtTimesContainer from "./_components/SelectPtTimesContainer/indext";

type SelectPtTimesProps = {
  searchParams: { memberInformation: string };
};

function SelectPtTimes({ searchParams }: SelectPtTimesProps) {
  const userInformation: PtUser = JSON.parse(decodeURIComponent(searchParams.memberInformation));

  return (
    <main className="flex h-full flex-col">
      <Header />
      <SelectPtTimesContainer userInformation={userInformation} />
    </main>
  );
}

export default SelectPtTimes;
