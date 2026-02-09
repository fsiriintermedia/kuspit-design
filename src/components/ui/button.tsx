import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-all disabled:pointer-events-none disabled:bg-disabled disabled:cursor-not-allowed [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 [&_svg:not([class*='size-'])]:size-4",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 [&_svg:not([class*='size-'])]:size-4",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4",
        secondary:
          "border border-primary text-primary bg-transparent shadow-xs hover:bg-primary/10 hover:text-primary [&_svg:not([class*='size-'])]:size-4 disabled:border-none disabled:text-white",
        ghost:
          "text-primary hover:text-primary dark:hover:bg-accent/50 cursor-pointer !px-0 disabled:text-disabled disabled:bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
        button:
          "hover:bg-accent cursor-pointer [&>svg]:fill-white hover:[&>svg]:fill-accent-foreground",
        icon: "!p-0 cursor-pointer [&>svg]:fill-current border-0 ring-0 shadow-none",
        accent:
          "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 [&_svg:not([class*='size-'])]:size-4",
        text: "text-primary hover:text-primary dark:hover:bg-accent/50 cursor-pointer !px-0 disabled:text-disabled disabled:!bg-transparent",
      },
      size: {
        default: "h-10 text-base px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 text-sm px-4 has-[>svg]:px-4",
        lg: "h-12 text-lg px-6 has-[>svg]:px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
