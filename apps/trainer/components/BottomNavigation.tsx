import { Bell, Calendar, ContactRound, UserRound } from "lucide-react";
import Link from "next/link";

export default function BottomNavigation() {
  const navigationItems = [
    { icon: Calendar, label: "캘린더" },
    { icon: ContactRound, label: "회원" },
    { icon: Bell, label: "알림" },
    { icon: UserRound, label: "마이페이지" },
  ];

  return (
    <nav className="bg-background-primary border-background-sub2 md:max-w-mobile fixed bottom-0 z-10 flex h-[5.063rem] w-full justify-around border-t">
      {navigationItems.map(({ icon: Icon, label }, index) => (
        <div key={`${label}-${index}`} className="flex flex-1 items-center justify-center">
          <button className="text-background-sub4 hover:text-background-sub5 flex w-12 flex-col items-center justify-center gap-1">
            <Icon />
            {/* TODO: 각 페이지 경로 네이밍이 정해지면 이동할 경로명 href 작성 */}
            <Link href="" className="text-body-5">
              {label}
            </Link>
          </button>
        </div>
      ))}
    </nav>
  );
}
