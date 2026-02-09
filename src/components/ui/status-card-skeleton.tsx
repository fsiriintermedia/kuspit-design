import * as React from "react";
import { cn } from "../../lib/cn";
import { Skeleton } from "./skeleton";

interface StatusCardSkeletonProps {
  variant: "warning" | "danger" | "default";
  className?: string;
}

export function StatusCardSkeleton({
  variant,
  className,
}: StatusCardSkeletonProps) {
  const cardClassname = cn(
    "flex h-[120px] w-full flex-col items-start justify-center gap-1 rounded-md px-4 py-[24.5px]",
    {
      "shadow-warning": variant === "warning",
      "shadow-danger": variant === "danger",
      "shadow-default": variant === "default",
    },
    className
  );

  return (
    <div
      data-slot="status-card"
      role="status-card"
      className={cardClassname}
    >
      <div className="relative w-full">
        {["warning", "danger"].includes(variant) && (
          <Skeleton className="absolute top-1/6 left-[-20px] h-[15px] w-[15px] rounded-full" />
        )}
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="mt-1 h-8 w-1/2" />
    </div>
  );
}
