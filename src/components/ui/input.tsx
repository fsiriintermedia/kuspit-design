import * as React from "react";
import { Eye, EyeOff, Search } from "lucide-react";
import { cn } from "../../lib/cn";
import { useMemo, useState } from "react";

export type InputProps = {
  success?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  showSearch?: boolean;
} & Omit<React.ComponentProps<"input">, "size">;

function Input({
  className,
  type,
  showSearch = false,
  success,
  error,
  size = "md",
  ...props
}: InputProps) {
  const hasValue = !!props?.value;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = useMemo(() => {
    if (type === "password") {
      return isPasswordVisible ? "text" : "password";
    }
    return type;
  }, [type, isPasswordVisible]);

  return (
    <div className="relative">
      <input
        type={inputType}
        data-slot="input"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.stopPropagation();
          }
        }}
        className={cn(
          "peer file:text-foreground placeholder:text-disabled selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] !outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary hover:border-primary focus:ring-0 focus:outline-none focus-visible:ring-0",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:text-destructive",
          hasValue && "border-primary",
          success &&
            "border-status-success focus-visible:border-status-success text-status-success",
          size === "sm" && "h-8 !text-sm",
          size === "md" && "h-11 !text-base",
          size === "lg" && "h-12 !text-lg",
          showSearch && "pl-8 !text-sm",
          type === "number" &&
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className
        )}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handlePasswordVisibility}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-primary aria-invalid:text-destructive"
          tabIndex={-1}
          aria-label={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {isPasswordVisible ? (
            <EyeOff className="size-[19px]" />
          ) : (
            <Eye className="size-[19px]" />
          )}
        </button>
      )}
      {showSearch && (
        <Search
          className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-neutral-500"
          aria-hidden
        />
      )}
    </div>
  );
}

export { Input };
