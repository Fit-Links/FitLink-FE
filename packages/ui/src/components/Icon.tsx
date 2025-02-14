import { icons, LucideProps } from "lucide-react";

import { cn } from "@ui/lib/utils";

export type IconNames = keyof typeof icons;

type IconProps = Omit<LucideProps, "size"> & {
  name: IconNames;
  className?: string;
  background?: keyof typeof backgroundValues;
  size?: keyof typeof iconSizes;
};

const iconSizes = {
  sm: 18,
  md: 20,
  lg: 24,
  xl: 28,
} as const;
const backgroundValues = {
  brand: "bg-brand-primary-500",
  sub1: "bg-background-sub1",
  sub2: "bg-background-sub2",
  sub3: "bg-background-sub3",
  sub4: "bg-background-sub4",
  sub5: "bg-background-sub5",
  notification: "bg-notification",
};

function Icon({ name, className, background, size = "md", ...props }: IconProps) {
  const SelectedLucideIcon = icons[name];

  return !background ? (
    <SelectedLucideIcon name={name} className={cn(className)} size={iconSizes[size]} {...props} />
  ) : (
    <div
      className={cn(
        "flex items-center justify-center rounded-full p-2",
        backgroundValues[background],
      )}
    >
      <SelectedLucideIcon name={name} className={cn(className)} size={iconSizes[size]} {...props} />
    </div>
  );
}

export default Icon;
