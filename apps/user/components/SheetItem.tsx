import { cn } from "@ui/lib/utils";
import { icons } from "lucide-react";

interface SheetItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  variant?: "danger" | "default";
}

export default function SheetItem({ icon, label, variant = "default", onClick }: SheetItemProps) {
  const Icon = icons[icon as keyof typeof icons];
  const variants = {
    danger: "text-notification",
    default: "text-text-primary",
  };

  return (
    <button
      className={cn(
        "bg-background-sub1 hover:bg-background-sub3 flex h-[2.813rem] w-full items-center gap-[0.625rem] rounded-md px-[0.625rem]",
        variants[variant],
      )}
      onClick={onClick}
    >
      <Icon size={24} className="h-[1.5rem] w-[1.5rme]" />
      <label>{label}</label>
    </button>
  );
}
