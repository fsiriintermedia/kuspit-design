import * as React from "react";
import type { buttonVariants } from "./button";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import type { VariantProps } from "class-variance-authority";

interface ButtonWithTooltipProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isDisabledByPermissions?: boolean;
  isLoading?: boolean;
  tooltipMessage?: string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}

export function ButtonWithTooltip({
  children,
  disabled,
  isDisabledByPermissions = false,
  isLoading = false,
  tooltipMessage = "No tienes permisos para realizar esta acción",
  tooltipSide = "top",
  onClick,
  ...props
}: ButtonWithTooltipProps) {
  const isButtonDisabled =
    disabled ?? isLoading ?? isDisabledByPermissions;
  const shouldShowTooltip = isDisabledByPermissions && !isLoading;

  const buttonElement = (
    <Button disabled={isButtonDisabled} onClick={onClick} {...props}>
      {children}
    </Button>
  );

  if (shouldShowTooltip) {
    return (
      <div className="relative inline-block">
        {buttonElement}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="absolute inset-0 z-10 cursor-not-allowed"
              aria-label={tooltipMessage}
            />
          </TooltipTrigger>
          <TooltipContent side={tooltipSide}>
            {tooltipMessage}
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return buttonElement;
}
