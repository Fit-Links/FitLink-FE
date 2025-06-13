import { LoaderCircle } from "lucide-react";

import { cn } from "@ui/lib/utils";

type BrandSpinnerProps = {
  className?: string;
};
function BrandSpinner({ className }: BrandSpinnerProps) {
  return (
    <LoaderCircle
      className={cn(
        "from-brand-primary-500 h-10 w-10 animate-spin rounded-full bg-gradient-to-r to-[#A6E6FF]",
        className,
      )}
    />
  );
}

export default BrandSpinner;
