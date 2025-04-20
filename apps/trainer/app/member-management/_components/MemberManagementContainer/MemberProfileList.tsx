/* eslint-disable no-magic-numbers */
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import Icon from "@ui/components/Icon";
import { Sheet, SheetClose, SheetContent } from "@ui/components/Sheet";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

import { WithBottomSheetStepper } from "@trainer/hoc/WithBottomSheetStepper";

import { PtUser, PtUserListApiResponse } from "@trainer/services/types/userManagement.dto";

import ProfileCard, { MenuIcon } from "@trainer/components/ProfileCard";

import RouteInstance from "@trainer/constants/route";

import PtRemainingCountEditSheet from "./PtRemainingCountEditSheet";
import PtTotalCountEditSheet from "./PtTotalCountEditSheet";

type MemberProfileListProps = {
  memberInformations: PtUserListApiResponse["data"]["content"];
};

function MemberProfileList({ memberInformations }: MemberProfileListProps) {
  const router = useRouter();
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
    const selectedMember = memberInformations.find(({ memberId }) => memberId === selectedMemberId);

    setSelectedMemberInformation((prev) => {
      if (!selectedMember) return null;
      if (prev) {
        return prev.memberId === selectedMember.memberId ? null : selectedMember;
      }

      return selectedMember;
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

  const PtTotalCountEditSheetWithStepper = WithBottomSheetStepper(PtTotalCountEditSheet);
  const PtRemainingCountEditSheetWithStepper = WithBottomSheetStepper(PtRemainingCountEditSheet);

  return (
    <>
      <div className="text-body-3 flex justify-between">
        <p>{`회원 ${memberInformations.length}명`}</p>
        <p>최신등록순</p>
      </div>
      <section className="my-[0.625rem] flex h-full w-full flex-col gap-[0.625rem] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {memberInformations.map((memberInformation) => {
          const { memberId, name, birthDate, phoneNumber, profilePictureUrl } = memberInformation;

          return (
            <ProfileCard
              key={`${memberId}-${name}`}
              imgUrl={profilePictureUrl}
              userBirth={new Date(birthDate)}
              userName={name}
              phoneNumber={phoneNumber}
              ellipsIcon
              className={cn("w-full", {
                "border-brand-primary-500 border": selectedMemberInformation?.memberId === memberId,
              })}
              onClick={() => handleClickSelectMember(memberInformation)}
            >
              <Badge variant={"brand"}>00/20</Badge>
              <MenuIcon
                onClick={(event) => handleClickPtCountControllSheetOpen(event, memberInformation)}
              />
            </ProfileCard>
          );
        })}
      </section>
      <Sheet open={ptManagementSheetSheetOpen} onOpenChange={setPtManagementSheetSheetOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
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
      <PtTotalCountEditSheetWithStepper
        open={ptTotalCountEditSheetOpen}
        onChangeOpen={setPtTotalCountEditSheetOpen}
        title="등록 PT 횟수 변경"
        incrementOptions={[5, 10, 20]}
        selectedMemberInformation={selectedMemberInformation}
        initialStep={selectedMemberInformation?.sessionInfo.totalCount}
      />
      <PtRemainingCountEditSheetWithStepper
        open={ptRemainingCountEditSheetOpen}
        onChangeOpen={setPtRemainingCountEditSheetOpen}
        title="잔여 PT 횟수 변경"
        selectedMemberInformation={selectedMemberInformation}
        initialStep={selectedMemberInformation?.sessionInfo.remainingCount}
      />
      <Dialog open={unLinkMemberPopupOpen} onOpenChange={setUnLinkMemberPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="whitespace-pre-line">
              {`${selectedMemberInformation?.name} 회원님과의 연동을\n해제 하시겠습니까?`}
            </DialogTitle>
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
                {/** TODO: 연동 해제 API */}
                <Button variant={"destructive"} className="flex-1 transition-colors">
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
