import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import BrandSpinner from "@ui/components/BrandSpinner";
import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import React, { Suspense, useState } from "react";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";

import { processMemberConnectionInquiry, sessionCountEdit } from "@trainer/services/userManagement";

import ProfileCard from "@trainer/components/ProfileCard";
import QueryErrorBoundary from "@trainer/components/QueryErrorBoundary";

import SessionSetterSheet from "../SessionSetterSheet";
import SheetErrorFallback from "./SheetErrorFallback";
import SheetFallback from "./SheetFallback";

type ConnectTrainerSheetProps = {
  notificationId: number;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
};

type ConnectTrainerSheetContentProps = {
  notificationId: number;
  onDeclineClick: () => void;
  onAcceptClick: () => void;
};
function ConnectTrainerSheetContent({
  notificationId,
  onDeclineClick,
  onAcceptClick,
}: ConnectTrainerSheetContentProps) {
  const { data } = useSuspenseQuery(notificationQueries.detail(notificationId));
  const {
    userDetail: { name, profilePictureUrl, birthDate, phoneNumber },
  } = data.data;

  const handleAcceptClick = () => {
    onAcceptClick();
  };
  const handleDeclineClick = () => {
    onDeclineClick();
  };

  return (
    <>
      <SheetHeader className="items-center">
        <SheetTitle className="flex justify-center">연동 승인</SheetTitle>
        <SheetDescription>{name} 회원이 연동 승인을 요청했어요</SheetDescription>
      </SheetHeader>
      <ProfileCard
        imgUrl={profilePictureUrl}
        userBirth={new Date(birthDate)}
        userName={name}
        phoneNumber={phoneNumber}
        className="bg-background-sub1 w-full hover:bg-none"
      />
      <SheetFooter>
        <div className="flex w-full justify-center gap-[0.625rem]">
          <SheetClose asChild>
            <Button
              size={"xl"}
              className="w-full"
              variant={"secondary"}
              onClick={handleDeclineClick}
            >
              거절
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button size={"xl"} className="w-full" variant={"negative"} onClick={handleAcceptClick}>
              승인
            </Button>
          </SheetClose>
        </div>
      </SheetFooter>
    </>
  );
}

function ConnectTrainerSheet({ notificationId, open, onChangeOpen }: ConnectTrainerSheetProps) {
  const queryClient = useQueryClient();

  const processConnectionMutation = useMutation({
    mutationFn: (isApproved: boolean) =>
      processMemberConnectionInquiry({
        requestPath: { notificationId },
        requestBody: { isApproved },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() });
    },
  });
  const setSessionMutation = useMutation({
    mutationFn: sessionCountEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() });
    },
  });

  const [isDeclineSheetOpen, setIsDeclineSheetOpen] = useState(false);
  const [isAcceptSheetOpen, setIsAcceptSheetOpen] = useState(false);
  const [isAcceptActionSheetOpen, setIsAcceptActionSheetOpen] = useState(false);

  const handleDeclineClick = () => {
    processConnectionMutation.mutate(false, {
      onSuccess: () => {
        setIsDeclineSheetOpen(true);
      },
    });
  };
  const handleAcceptClick = () => {
    processConnectionMutation.mutate(true, {
      onSuccess: () => {
        setIsAcceptSheetOpen(true);
      },
    });
    // setIsAcceptActionSheetOpen(true);
  };
  const handleSubmit = (totalCount: number, remainingCount: number) => {
    processConnectionMutation.mutate(true, {
      onSuccess: (response) => {
        const { data } = response;
        const { memberId, sessionInfoId } = data;
        setSessionMutation.mutate(
          {
            requestPath: { memberId, sessionInfoId },
            requestBody: {
              totalCount,
              remainingCount,
            },
          },
          {
            onSuccess: () => {
              setIsAcceptActionSheetOpen(false);
              setIsAcceptSheetOpen(true);
            },
          },
        );
      },
    });
  };
  const handleSessionSetterClick = () => {
    setIsAcceptActionSheetOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <QueryErrorBoundary fallback={SheetErrorFallback}>
            <Suspense fallback={<SheetFallback />}>
              <ConnectTrainerSheetContent
                notificationId={notificationId}
                onAcceptClick={handleAcceptClick}
                onDeclineClick={handleDeclineClick}
              />
            </Suspense>
          </QueryErrorBoundary>
        </SheetContent>
      </Sheet>
      <Sheet open={isDeclineSheetOpen} onOpenChange={setIsDeclineSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">연동 요청이 거절되었습니다</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트에서는 연동 요청의 거절 처리가 완료되었음을 알려줍니다.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button size={"xl"} className="w-full">
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isAcceptSheetOpen} onOpenChange={setIsAcceptSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">연동 요청이 승인되었습니다</SheetTitle>
            <SheetDescription>연동된 회원의 세션(PT 횟수)을 설정해주세요</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button size={"xl"} className="w-full" onClick={handleSessionSetterClick}>
              회원 세션 설정하기
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {processConnectionMutation.data?.data.memberId && (
        <SessionSetterSheet
          memberId={processConnectionMutation.data?.data.memberId}
          isOpen={isAcceptActionSheetOpen}
          onOpenChange={setIsAcceptActionSheetOpen}
          onSubmit={handleSubmit}
        />
      )}

      <Sheet open={processConnectionMutation.status === "pending"}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader>
            <SheetTitle>연동 승인 여부를 처리 중입니다</SheetTitle>
            <SheetDescription>잠시만 기다려주세요</SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-center">
            <BrandSpinner />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={processConnectionMutation.status === "success"}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader>
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle>회원의 세션이 설정되었습니다</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="w-full">확인</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ConnectTrainerSheet;
