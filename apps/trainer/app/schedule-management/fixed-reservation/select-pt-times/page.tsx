import { PtUser } from "@trainer/services/types/userManagement.dto";

import Header from "./_components/Header";
import SelectPtTimesContainer from "./_components/SelectPtTimesContainer/indext";

type SelectPtTimesProps = {
  searchParams: { memberInformation: string };
};

/** TODO: memberInformation 쿼리 params를 통해 회원 상세 정보 API를 불러와 특정 회원이 고정 예약된 시간이 있다면
 * 해당 시간을 SelectPtTimesContrainer 요일과 시간 블록에 색상을 입혀 나타내기
 */
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
