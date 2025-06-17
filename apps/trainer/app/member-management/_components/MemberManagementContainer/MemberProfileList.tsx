/* eslint-disable no-magic-numbers */
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@ui/components/Sheet";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import { Fragment, MouseEvent, useEffect, useRef, useState } from "react";

import { WithBottomSheetStepper } from "@trainer/hoc/WithBottomSheetStepper";
import { userManagementQueries } from "@trainer/queries/userManagement";

import { PtUser, PtUserListApiResponse } from "@trainer/services/types/userManagement.dto";

import EmptySearchResult from "@trainer/components/EmptySearchResult";
import ProfileCard, { MenuIcon } from "@trainer/components/ProfileCard";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import RouteInstance from "@trainer/constants/route";

import PtRemainingCountEditSheet from "./PtRemainingCountEditSheet";
import PtTotalCountEditSheet from "./PtTotalCountEditSheet";
import useUnlinkMember from "../../_hooks/useUnlinkMember";
import MemberProfileListFallback from "../MemberProfileListFallback";

type MemberProfileListContentProps = {
  searchValue: string;
  selectedMember: PtUser | null;
  handleClickPtCountControllSheetOpen: (
    event: MouseEvent<SVGSVGElement>,
    selectedMemberInformation: PtUser | null,
  ) => void;
  handleClickSelectMember: (selectedMemberInformation: PtUser | null) => void;
};
function MemberProfileListContent({
  searchValue,
  selectedMember,
  handleClickPtCountControllSheetOpen,
  handleClickSelectMember,
}: MemberProfileListContentProps) {
  const intersectionRef = useRef(null);

  const { isLoading, status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(userManagementQueries.list(searchValue));

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect,
  });

  if (isLoading) {
    return <MemberProfileListFallback />;
  }
  if (status === "pending") {
    return <></>;
  }
  if (status === "error") {
    return "error";
  }

  const createMemberCount = (data: InfiniteData<PtUserListApiResponse, unknown>) =>
    data.pages.reduce((acc, cur) => acc + cur.data.content.length, 0);

  const memberCount = createMemberCount(data);

  return (
    <>
      <div className="text-body-3 flex justify-between">
        <p>{`회원 ${memberCount}명`}</p>
        <p>최신등록순</p>
      </div>
      <ul className="my-[0.625rem] flex h-full w-full flex-col gap-[0.625rem] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {data.pages[0].data.totalElements ? (
          data.pages.map((group, index) => (
            <Fragment key={`memberListGroup-${index}`}>
              {group.data.content.map((memberInformation, subIndex) => {
                const {
                  memberId,
                  name,
                  birthDate,
                  phoneNumber,
                  profilePictureUrl,
                  sessionInfo: { totalCount, remainingCount },
                } = memberInformation;

                return (
                  <ProfileCard
                    key={`memberListGroupItem-${subIndex}`}
                    imgUrl={profilePictureUrl}
                    userBirth={new Date(birthDate)}
                    userName={name}
                    phoneNumber={phoneNumber}
                    ellipsIcon
                    className={cn("w-full", {
                      "border-brand-primary-500 border": selectedMember?.memberId === memberId,
                    })}
                    onClick={() => handleClickSelectMember(memberInformation)}
                  >
                    <Badge variant={"brand"}>
                      {String(remainingCount).padStart(2, "0")}/
                      {String(totalCount).padStart(2, "0")}
                    </Badge>
                    <MenuIcon
                      onClick={(event) =>
                        handleClickPtCountControllSheetOpen(event, memberInformation)
                      }
                    />
                  </ProfileCard>
                );
              })}
            </Fragment>
          ))
        ) : (
          <EmptySearchResult />
        )}
        <div ref={intersectionRef} />
      </ul>
    </>
  );
}
type MemberProfileListProps = {
  searchValue: string;
};

function MemberProfileList({ searchValue }: MemberProfileListProps) {
  const router = useRouter();

  const { unlinkMemeber, isSuccess } = useUnlinkMember();

  const [ptManagementSheetSheetOpen, setPtManagementSheetSheetOpen] = useState(false);
  const [selectedMemberInformation, setSelectedMemberInformation] = useState<PtUser | null>(null);
  const [ptTotalCountEditSheetOpen, setPtTotalCountEditSheetOpen] = useState(false);
  const [ptRemainingCountEditSheetOpen, setPtRemainingCountEditSheetOpen] = useState(false);
  const [unLinkMemberPopupOpen, setUnLinkMemberPopupOpen] = useState(false);

  const handleClickPtCountControllSheetOpen = (
    event: MouseEvent<SVGSVGElement>,
    selectedMemberInformation: PtUser | null,
  ) => {
    event.stopPropagation();

    setSelectedMemberInformation(selectedMemberInformation);

    setPtManagementSheetSheetOpen(true);
  };

  const handleClickSelectMember = (selectedMemberInformation: PtUser | null) => {
    const selectedMemberId = selectedMemberInformation?.memberId;

    setSelectedMemberInformation((prev) => {
      if (!selectedMemberInformation) return null;
      if (prev) {
        return prev.memberId === selectedMemberId ? null : selectedMemberInformation;
      }

      return selectedMemberInformation;
    });

    router.push(RouteInstance["member-management"](String(selectedMemberId)));
  };

  const handleClickPtTotalCountEdit = () => {
    setPtTotalCountEditSheetOpen(true);
  };

  const handleClickPtRemainingCountEdit = () => {
    setPtRemainingCountEditSheetOpen(true);
  };

  const handleClickUnLinkMember = () => {
    setUnLinkMemberPopupOpen(true);
  };

  const handleClickUnlinkConfirm = () => {
    if (!selectedMemberInformation) return;
    unlinkMemeber({ memberId: selectedMemberInformation.memberId });
  };

  useEffect(() => {
    if (isSuccess) {
      setUnLinkMemberPopupOpen(false);
    }
  }, [isSuccess]);

  const PtTotalCountEditSheetWithStepper = WithBottomSheetStepper(PtTotalCountEditSheet);
  const PtRemainingCountEditSheetWithStepper = WithBottomSheetStepper(PtRemainingCountEditSheet);

  return (
    <>
      <MemberProfileListContent
        searchValue={searchValue}
        selectedMember={selectedMemberInformation}
        handleClickPtCountControllSheetOpen={handleClickPtCountControllSheetOpen}
        handleClickSelectMember={handleClickSelectMember}
      />
      <Sheet open={ptManagementSheetSheetOpen} onOpenChange={setPtManagementSheetSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <VisuallyHidden>
            <SheetTitle>회원 정보 수정</SheetTitle>
            <SheetDescription>
              이 시트에서 회원 PT 횟수 변경, 회원 연동 해제와 같이 회원에 대한 정보를 수정할 수
              있습니다.
            </SheetDescription>
          </VisuallyHidden>
          <div className="flex h-full w-full flex-col gap-[0.625rem]">
            <SheetClose asChild>
              <div
                className="bg-background-sub1 hover:bg-background-sub3 flex cursor-pointer items-center gap-2 rounded-[0.625rem] px-[0.813rem] py-[0.625rem] transition-colors"
                onClick={handleClickPtTotalCountEdit}
              >
                <Icon name="Pencil" size="lg" />
                <p className="text-headline">등록 PT 횟수 변경</p>
              </div>
            </SheetClose>
            <SheetClose asChild>
              <div
                className="bg-background-sub1 hover:bg-background-sub3 flex cursor-pointer items-center gap-2 rounded-[0.625rem] px-[0.813rem] py-[0.625rem] transition-colors"
                onClick={handleClickPtRemainingCountEdit}
              >
                <Icon name="Pencil" size="lg" />
                <p className="text-headline">잔여 PT 횟수 변경</p>
              </div>
            </SheetClose>
            <SheetClose asChild>
              <div
                className="bg-background-sub1 text-notification hover:bg-background-sub3 flex cursor-pointer items-center gap-2 rounded-[0.625rem] px-[0.813rem] py-[0.625rem] transition-colors"
                onClick={handleClickUnLinkMember}
              >
                <Icon name="UserRoundX" size="lg" />
                <p className="text-headline">연동 해제</p>
              </div>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      {selectedMemberInformation && (
        <PtTotalCountEditSheetWithStepper
          open={ptTotalCountEditSheetOpen}
          onChangeOpen={setPtTotalCountEditSheetOpen}
          title="등록 PT 횟수 변경"
          incrementOptions={[5, 10, 20]}
          selectedMemberInformation={selectedMemberInformation}
          initialStep={selectedMemberInformation?.sessionInfo.totalCount}
        />
      )}
      {selectedMemberInformation && (
        <PtRemainingCountEditSheetWithStepper
          open={ptRemainingCountEditSheetOpen}
          onChangeOpen={setPtRemainingCountEditSheetOpen}
          title="잔여 PT 횟수 변경"
          selectedMemberInformation={selectedMemberInformation}
          initialStep={selectedMemberInformation?.sessionInfo.remainingCount}
        />
      )}
      <Dialog open={unLinkMemberPopupOpen} onOpenChange={setUnLinkMemberPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="whitespace-pre-line">
              {`${selectedMemberInformation?.name} 회원님과의 연동을\n해제 하시겠습니까?`}
            </DialogTitle>
            <VisuallyHidden>
              <DialogDescription>
                이 시트는 회원과의 연동 해제 처리를 진행할지 확인합니다.
              </DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full gap-[0.625rem]">
              <DialogClose asChild>
                <Button
                  variant={"secondary"}
                  className="hover:bg-background-sub3 flex-1 transition-colors"
                >
                  취소
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant={"destructive"}
                  onClick={handleClickUnlinkConfirm}
                  className="flex-1 transition-colors"
                >
                  확인
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MemberProfileList;
