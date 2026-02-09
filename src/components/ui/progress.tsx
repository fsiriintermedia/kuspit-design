import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/cn";

function Progress({
  className,
  value,
  ...rest
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-sm [background:var(--info)]",
        className
      )}
      {...rest}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-accent h-full w-full flex-1 rounded-sm transition-all"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
