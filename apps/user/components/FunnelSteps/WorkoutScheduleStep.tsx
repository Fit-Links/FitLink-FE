import { PreferredWorkout } from "@5unwan/core/api/types/common";
import Header from "@ui/components/Header";
import WorkoutForm from "@ui/components/WorkoutForm";

const TIME_CELL_SPAN = 50;

type WorkoutScheduleStepProps = {
  onSubmit: (workoutSchedule: Omit<PreferredWorkout, "workoutScheduleId">[]) => Promise<void>;
  onPrev: () => void;
};
function WorkoutScheduleStep({ onPrev, onSubmit }: WorkoutScheduleStepProps) {
  return (
    <div className="flex h-full flex-col">
      <Header>
        <Header.Back onClick={onPrev} />
        <Header.Title content="PT 희망 시간" />
      </Header>
      <p className="text-text-sub2 text-body-1 mt-2 text-center">PT 시간: {TIME_CELL_SPAN}분</p>
      <p className="text-text-sub2 text-body-1 mb-8 text-center">PT 선택 시간은 시작 시간입니다</p>
      <WorkoutForm onSubmit={onSubmit} />
    </div>
  );
}

export default WorkoutScheduleStep;
