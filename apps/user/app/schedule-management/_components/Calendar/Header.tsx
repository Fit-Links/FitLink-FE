import { Badge } from "@ui/components/Badge";
import { Caption } from "@ui/components/DayPicker/Caption";
import Icon from "@ui/components/Icon";

type HeaderProps = {
  month: Date;
  onChangeMonth: (date: Date) => void;
};

export default function Header({ month, onChangeMonth }: HeaderProps) {
  //TODO: 뱃지에 PT 잔여 횟수/ 총 PT 횟수 받아와 넣어주는 로직 작성 및 알림 페이지로 이동하는 로직 작성
  return (
    <Caption
      month={month}
      onChangeMonth={onChangeMonth}
      captionLeft={
        <Badge className="flex h-[1.563rem] min-w-[3.563rem] items-center justify-center">
          좌측
        </Badge>
      }
      captionRight={<Icon name="Bell" size="lg" />}
    />
  );
}
