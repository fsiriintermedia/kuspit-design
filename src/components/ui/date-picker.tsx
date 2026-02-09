import * as React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/cn";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Label } from "./label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

export function DatePicker({
  label: labelText,
  disabled,
  className,
  size = "md",
  onChange,
  value,
  error,
}: {
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md";
  onChange?: (date: Date | null | undefined) => void;
  value?: Date | null | undefined;
  error?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  const handleChangeDate = (newDate: Date | null | undefined) => {
    onChange?.(newDate);
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {labelText && (
        <Label
          htmlFor="date"
          className="text-input-text text-sm"
        >
          {labelText}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative flex">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className={cn(
                "border-primary hover:border-primary h-[44px] flex-1 cursor-pointer justify-between text-base font-normal hover:bg-transparent",
                disabled &&
                  "border-border cursor-not-allowed border !bg-transparent",
                (!value || disabled) && "text-disabled border-input",
                error && "border-destructive",
                size === "sm" && "h-8 !px-2 py-1 text-xs"
              )}
              disabled={disabled}
              aria-invalid={error}
            >
              {value ? format(value, "dd/MM/yy") : "Elegir una fecha"}
              <CalendarIcon
                className={cn(
                  "text-primary size-4",
                  (disabled ?? !value) && "text-disabled"
                )}
              />
            </Button>
          </PopoverTrigger>
          {value && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-1/2 right-10 h-6 w-6 -translate-y-1/2 p-0 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                handleChangeDate(null);
              }}
            >
              <X className="text-muted-foreground size-4" />
            </Button>
          )}
        </div>
        <PopoverContent
          className="border-primary max-h-[380px] w-[524px] overflow-hidden rounded-sm p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value ?? undefined}
            captionLayout="dropdown"
            onSelect={handleChangeDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
