import { Badge } from "@ui/components/Badge";
import { Caption } from "@ui/components/DayPicker/Caption";
import Icon from "@ui/components/Icon";

type HeaderProps = {
  month: Date;
  onChangeMonth: (date: Date) => void;
};

export default function Header({ month, onChangeMonth }: HeaderProps) {
  return (
    <Caption
      month={month}
      onChangeMonth={onChangeMonth}
      captionLeft={<Badge>좌측</Badge>}
      captionRight={<Icon name="Bell" size="lg" />}
    />
  );
}
