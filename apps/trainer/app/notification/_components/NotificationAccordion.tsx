"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/Accordion";
import { Bell, Calendar, Dumbbell, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { notificationMap } from "@trainer/app/notification/_constants";

import RouteInstance from "@trainer/constants/route";

export default function NotificationAccordion() {
  const NOTIFICATION_ACCORDION_ITEMS = useMemo(
    () => [
      {
        title: "연동",
        contents: [
          {
            content: notificationMap.connect.type,
            route: "connect",
          },
          {
            content: notificationMap.disconnect.type,
            route: "disconnect",
          },
        ],
        icon: <HeartHandshake />,
      },
      {
        title: notificationMap.session.type,
        contents: [],
        icon: <Dumbbell />,
        route: "session",
      },
      {
        title: "PT 예약",
        contents: [
          {
            content: notificationMap.reservation.type,
            route: "reservation",
          },
          {
            content: notificationMap["reservation-change"].type,
            route: "reservation-change",
          },
          {
            content: notificationMap["reservation-cancel"].type,
            route: "reservation-cancel",
          },
        ],
        icon: <Calendar />,
      },
    ],
    [],
  );

  return (
    <Accordion type="multiple">
      <AccordionItem value="전체 알림">
        <Link href={RouteInstance.notification()} replace>
          <AccordionTrigger icon={<Bell />} className="border-0">
            <span>전체 알림</span>
          </AccordionTrigger>
        </Link>
      </AccordionItem>
      {NOTIFICATION_ACCORDION_ITEMS.map(({ title, contents, icon, route }, index) => (
        <AccordionItem value={String(index)} key={`${index}-${title}`}>
          {route ? (
            <Link href={RouteInstance.notification(route)} replace>
              <AccordionTrigger icon={icon}>
                <span>{title}</span>
              </AccordionTrigger>
            </Link>
          ) : (
            <AccordionTrigger icon={icon}>
              <span>{title}</span>
            </AccordionTrigger>
          )}

          {contents.map(({ content, route }) => (
            <Link href={RouteInstance.notification(route)} replace key={`${content}`}>
              <AccordionContent className="cursor-pointer">
                <span>{content}</span>
              </AccordionContent>
            </Link>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
