import { Bell, Calendar, ContactRound, UserRound } from "lucide-react";

export default function BottomNavigation() {
  const navigationItems = [
    { icon: Calendar, label: "캘린더" },
    { icon: ContactRound, label: "회원" },
    { icon: Bell, label: "알림" },
    { icon: UserRound, label: "마이페이지" },
  ];

  return (
    <nav className="bg-background-primary flex h-[5.063rem] w-full items-center justify-around border-t border-gray-400">
      {navigationItems.map(({ icon: Icon, label }, index) => (
        <div key={`${label}-${index}`} className="flex flex-1 items-center justify-center">
          <button className="text-background-sub4 hover:text-background-sub5 flex w-12 flex-col items-center justify-center gap-1">
            <Icon />
            <div className="text-body-5">{label}</div>
          </button>
        </div>
      ))}
    </nav>
  );
}
