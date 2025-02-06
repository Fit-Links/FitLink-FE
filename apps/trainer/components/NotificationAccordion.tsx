import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/Accordion";
import { Bell, Calendar, Dumbbell, HeartHandshake } from "lucide-react";

const VISIBILITY_COUNT = 0;

// TODO: 아코디언 클릭 시 이동할 경로의 네이밍이 정해지면 핸들러 붙히기
export default function NotificationAccordion() {
  // TODO: API가 만들어지고 나면 해당 API로 교체
  const DUMMY_NOTIFICATION_ITEMS = [
    {
      title: "회원 연동",
      contents: [
        {
          content: "연동 승인",
          contentCount: 3,
        },
        {
          content: "연동 해제",
          contentCount: 2,
        },
      ],
      icon: <HeartHandshake />,
      titleCount: 5,
    },
    {
      title: "PT 수업",
      contents: [],
      icon: <Dumbbell />,
      titleCount: 0,
    },
    {
      title: "PT 예약",
      contents: [
        {
          content: "예약 요청",
          contentCount: 0,
        },
        {
          content: "예약 변경/취소",
          contentCount: 0,
        },
      ],
      icon: <Calendar />,
      titleCount: 0,
    },
  ];

  return (
    <Accordion type="multiple">
      <AccordionItem value="전체 알림">
        <AccordionTrigger icon={<Bell />} className="border-0">
          <span>전체 알림</span>
        </AccordionTrigger>
      </AccordionItem>
      {DUMMY_NOTIFICATION_ITEMS.map(({ title, contents, titleCount, icon }, index) => (
        <AccordionItem value={String(index)} key={`${index}-${title}`}>
          <AccordionTrigger icon={icon}>
            <span>{title}</span>
            {titleCount > VISIBILITY_COUNT && (
              <span className="bg-background-sub4 w-7 rounded-full text-center">{titleCount}</span>
            )}
          </AccordionTrigger>
          {contents.map(({ content, contentCount }) => (
            <AccordionContent key={`${content}-${contentCount}`}>
              <span>{content}</span>
              {contentCount > VISIBILITY_COUNT && (
                <span className="bg-background-sub4 w-7 rounded-full text-center">
                  {contentCount}
                </span>
              )}
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
