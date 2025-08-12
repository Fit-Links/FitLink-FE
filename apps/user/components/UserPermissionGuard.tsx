"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import Icon from "@ui/components/Icon";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

import { authQueries } from "@user/queries/auth";

import { clearToken } from "@user/services/auth";

import RouteInstance from "@user/constants/routes";

type UserPermissionGuardProps = {
  children: ReactNode;
};

const UserPermissionGuard = ({ children }: UserPermissionGuardProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpenPermissionDialog, setIsOpenPermissionDialog] = useState(true);

  const { data: userRole, isError } = useQuery({
    ...authQueries.status(),
    enabled: pathname !== RouteInstance.login() && pathname !== RouteInstance["sns-verification"](),
  });

  const { mutate: logout } = useMutation({
    mutationFn: clearToken,
    onSuccess: () => {
      setIsOpenPermissionDialog(false);

      router.replace(RouteInstance.login());
    },
  });

  const handleClickLogout = () => {
    logout();
  };

  if (pathname === (RouteInstance.login() || pathname === RouteInstance["sns-verification"]())) {
    return <>{children}</>;
  }

  /** 이미 쿠키를 확인해 user 정보가 없다면 login으로 보내주고있지만 혹시 모를 예외 케이스에 대비하기 위함 */
  if (isError) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <div className="bg-notification flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full">
                <Icon name="UserRoundX" size="lg" color="white" />
              </div>
            </DialogTitle>
            <DialogDescription className="whitespace-pre-line text-center">
              {"본 서비스는 로그인 후 이용 가능합니다"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button>로그인 화면으로 돌아가기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // 권한 체크 (useMemo 제거)
  const hasPermission = userRole?.data.userRole !== "TRAINER";

  /** 에러가 없고, 권한이 있는 경우 서비스 접근 허용 */
  if (hasPermission) {
    return <>{children}</>;
  }

  if (isOpenPermissionDialog) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <div className="bg-notification flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full">
                <Icon name="UserRoundX" size="lg" color="white" />
              </div>
            </DialogTitle>
            <DialogDescription className="whitespace-pre-line text-center">
              {
                "본 서비스는 회원 전용 서비스입니다.\n로그아웃 후 회원 계정으로 다시 로그인을 시도해주세요."
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="w-full" onClick={handleClickLogout}>
              로그아웃
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default UserPermissionGuard;
