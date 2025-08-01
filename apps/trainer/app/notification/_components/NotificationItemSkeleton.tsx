import { Skeleton } from "@ui/components/Skeleton";

function NotificationItemSkeleton() {
  return (
    <li className="bg-background-sub1 flex h-[6.25rem] w-full items-center gap-4 rounded-[10px] px-[15px]">
      <Skeleton className="h-[3.125rem] w-[3.125rem] rounded-full" />
      <div className="flex flex-col items-start gap-2">
        <Skeleton className="h-[0.9375rem] w-[12.5rem] rounded-full" />
        <Skeleton className="h-[0.9375rem] w-[9.375rem]" />
      </div>
    </li>
  );
}

export default NotificationItemSkeleton;
