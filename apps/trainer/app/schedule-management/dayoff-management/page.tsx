import { cn } from "@ui/lib/utils";

import HeaderProvider from "@trainer/components/Providers/BasicHeaderProvider";

import { commonLayoutContents } from "@trainer/constants/styles";

import DayoffCalendarContainer from "./_components/DayoffCalendarContainer";

function DayoffManagement() {
  return (
    <HeaderProvider title="휴무일 설정" back>
      <main className={cn(commonLayoutContents)}>
        <DayoffCalendarContainer />
      </main>
    </HeaderProvider>
  );
}

export default DayoffManagement;
