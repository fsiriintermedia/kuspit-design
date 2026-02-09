import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/cn";

export interface LinkProps extends React.ComponentProps<"a"> {
  asChild?: boolean;
}

function Link({ className, asChild = false, ...props }: LinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-slot="link"
      className={cn(
        "inline-block text-sm text-[color:var(--primary-dark)]",
        className
      )}
      {...props}
    />
  );
}

export { Link };
