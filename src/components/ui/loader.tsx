import * as React from "react";
import { cn } from "../../lib/cn";
import { Spinner } from "./spinner";

function Loader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="loader"
      className={cn(
        "bg-disabled-background absolute top-0 left-0 z-[99] flex h-full w-full items-center justify-center",
        className
      )}
      {...props}
    >
      <Spinner />
    </div>
  );
}

export { Loader };
