import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./button";

export interface TagProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  closeIcon?: React.ReactNode;
  className?: string;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      showCloseButton = true,
      onClose,
      closeIcon,
      className,
      ...props
    },
    ref
  ) => {
    const handleClose = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClose?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "font-inter inline-flex h-5 items-center gap-1.5 rounded-sm bg-[#F0F0F1] px-2 py-0.5 text-xs font-medium text-[#48166D]",
          "shrink-0 whitespace-nowrap",
          className
        )}
        {...props}
      >
        <span className="text-xs leading-[1.333] font-medium">{children}</span>

        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className={cn("text-primary size-4 !p-0")}
            disabled={!onClose}
            aria-label="Remove tag"
          >
            {closeIcon ?? <X className="size-2.5" />}
          </Button>
        )}
      </div>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };
