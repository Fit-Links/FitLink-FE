"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/Accordion";
import { Bell, Calendar, Dumbbell, HeartHandshake } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import RouteInstance from "@trainer/constants/route";

export default function NotificationAccordion() {
  const NOTIFICATION_ACCORDION_ITEMS = useMemo(
    () => [
      {
        title: "회원 연동",
        contents: [
          {
            content: "연동 승인",
            route: "connect",
          },
          {
            content: "연동 해제",
            route: "disconnect",
          },
        ],
        icon: <HeartHandshake />,
      },
      {
        title: "PT 수업",
        contents: [],
        icon: <Dumbbell />,
        route: "session",
      },
      {
        title: "PT 예약",
        contents: [
          {
            content: "예약 요청",
            route: "reservation",
          },
          {
            content: "예약 변경/취소",
            route: "reservation-edit",
          },
        ],
        icon: <Calendar />,
      },
    ],
    [],
  );

  const router = useRouter();

  return (
    <Accordion type="multiple">
      <AccordionItem value="전체 알림">
        <AccordionTrigger icon={<Bell />} className="border-0">
          <span onClick={() => router.push(RouteInstance.notification())}>전체 알림</span>
        </AccordionTrigger>
      </AccordionItem>
      {NOTIFICATION_ACCORDION_ITEMS.map(({ title, contents, icon, route }, index) => (
        <AccordionItem value={String(index)} key={`${index}-${title}`}>
          <AccordionTrigger icon={icon}>
            <span
              onClick={() => {
                if (!route) return;
                router.push(RouteInstance.notification(route));
              }}
            >
              {title}
            </span>
          </AccordionTrigger>
          {contents.map(({ content, route }) => (
            <AccordionContent
              key={`${content}`}
              onClick={() => router.push(RouteInstance.notification(route))}
              className="cursor-pointer"
            >
              <span>{content}</span>
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
