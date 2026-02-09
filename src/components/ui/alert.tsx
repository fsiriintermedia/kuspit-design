import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, AlertCircle } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./button";

const alertVariants = cva(
  "relative flex items-center gap-2 w-full rounded-sm border px-[14px] py-[10px] text-sm [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "text-info-foreground bg-info border-none",
        primaryLight:
          "text-primary-light-foreground bg-primary-light border-none",
        primary: "text-primary-foreground bg-primary border-none",
        secondary: "text-primary-foreground bg-accent border-none",
        success: "text-success-light-foreground bg-success-light border-none",
        destructive:
          "text-destructive bg-destructive-background border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  onClose,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    onClose?: () => void;
  }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {props.children}
      {onClose && (
        <Button
          variant="icon"
          onClick={onClose}
          className="fill-current [&>svg]:fill-current"
        >
          <X className="size-3" />
        </Button>
      )}
    </div>
  );
}

function AlertContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-[2px]",
        className
      )}
      {...props}
    />
  );
}

function AlertTitle({
  className,
  hasDescription,
  ...props
}: React.ComponentProps<"div"> & { hasDescription?: boolean }) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="h-full pt-[2px]">
        <AlertCircle className="size-4" fill="currentColor" />
      </div>
      <div
        data-slot="alert-title"
        className={cn(
          "col-start-2 line-clamp-2 min-h-4 tracking-tight",
          hasDescription && "font-medium",
          className
        )}
        {...props}
      />
    </div>
  );
}

function AlertDescription({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 pl-6 text-sm [&_p]:leading-relaxed",
        variant === "destructive" && "text-destructive",
        variant === "success" && "text-success-light-foreground",
        variant === "primaryLight" && "text-primary-light-foreground",
        variant === "primary" && "text-primary-foreground",
        variant === "secondary" && "text-primary-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertContent, alertVariants };
