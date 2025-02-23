import TimeOption from "./TimeOption";

export default function TimeOptionList() {
  // TODO: 추후 각 TimeOption 클릭 시 이동할 페이지의 경로 Name이 정해지면 클릭 이벤트 추가
  return (
    <div className="mb-[1.625rem] ml-[1.063rem] mt-[1.25rem] flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <TimeOption>
        <TimeOption.Icon iconName={"Dumbbell"} />
        <TimeOption.Content>
          <div>PT 예약</div>
        </TimeOption.Content>
      </TimeOption>
      <TimeOption>
        <TimeOption.Icon iconName={"CalendarClock"} />
        <TimeOption.Content>
          <div>PT</div>
          <div>고정 예약</div>
        </TimeOption.Content>
      </TimeOption>
      <TimeOption>
        <TimeOption.Icon iconName={"CalendarX2"} />
        <TimeOption.Content>
          <div>예약 불가</div>
          <div>시간대 등록</div>
        </TimeOption.Content>
      </TimeOption>
      <TimeOption>
        <TimeOption.Icon iconName={"CalendarMinus"} />
        <TimeOption.Content>
          <div>휴무일</div>
          <div>설정</div>
        </TimeOption.Content>
      </TimeOption>
    </div>
  );
}
