import { Skeleton } from "@ui/components/Skeleton";

import ProfileCardListFallback from "@trainer/app/notification/_components/ProfileCardListFallback";

function MemberProfileListFallback() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-[0.8125rem] w-[48px]" />
        <span className="text-body-3">최신등록순</span>
      </div>
      <ProfileCardListFallback />
    </div>
  );
}

export default MemberProfileListFallback;
