"use client";

import Header from "@ui/components/Header";
import { Skeleton } from "@ui/components/Skeleton";
import { Menu, Search } from "lucide-react";

import Logo from "@trainer/components/Logo";

import { commonLayoutContents } from "@trainer/constants/styles";

import NotificationItemSkeleton from "./NotificationItemSkeleton";
import { notificationMap } from "../_constants";

const ITEM_SKELETON_COUNT = 5;

type PageFallbackProps = {
  type: keyof typeof notificationMap;
};
function PageFallback({ type }: PageFallbackProps) {
  return (
    <>
      <Header
        logo={<Logo />}
        subHeader={
          <div className="bg-background-primary flex items-center gap-[0.4375rem] pb-2">
            <Skeleton className="h-[2rem] w-[3.25rem]" />
            <Skeleton className="h-[2rem] w-[3.25rem]" />
            <Skeleton className="h-[2rem] w-[3.25rem]" />
          </div>
        }
      >
        <Header.Left className="pointer-events-none">
          <Menu className="text-text-primary" />
        </Header.Left>
        {notificationMap[type].type === "전체" ? (
          <Skeleton className="col-start-2 col-end-3 h-[26px] w-[60px] justify-self-center" />
        ) : (
          <Header.Title content={notificationMap[type].type} />
        )}
        <Header.Right className="pointer-events-none">
          <Search className="text-text-primary" />
        </Header.Right>
      </Header>

      <main className={commonLayoutContents}>
        <div className="flex items-center justify-between pb-2">
          <Skeleton className="h-[0.8125rem] w-[3.125rem]" />
          <span className="text-body-3">최신순</span>
        </div>

        {
          <ul className="flex flex-col gap-4">
            {Array.from({ length: ITEM_SKELETON_COUNT }).map((_, index) => {
              return <NotificationItemSkeleton key={`notificationItem-${index}`} />;
            })}
          </ul>
        }
      </main>
    </>
  );
}

export default PageFallback;
