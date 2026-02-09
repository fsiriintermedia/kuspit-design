import * as React from "react";
import { AlertTriangle, XCircle } from "lucide-react";
import { cn } from "../../lib/cn";
import { Link } from "./link";

export type StatusCardVariant = "default" | "warning" | "danger";

export type StatusColor =
  | "primary"
  | "success"
  | "yellow"
  | "warning"
  | "danger"
  | "blue";

const colorsByStatus: Record<StatusColor, string> = {
  primary: "var(--status-primary)",
  success: "var(--status-success)",
  yellow: "var(--status-yellow)",
  warning: "var(--status-warning)",
  danger: "var(--status-danger)",
  blue: "var(--status-blue)",
};

const gradientsByStatus: Record<StatusCardVariant, string> = {
  default: "white",
  warning: "var(--status-gradient-warning)",
  danger: "var(--status-gradient-danger)",
};

function getStatusCardVariants({
  variant,
  color,
}: {
  variant: StatusCardVariant;
  color: StatusColor;
}): {
  background: string;
  color: string;
  border: string;
} {
  const styles = {
    background: "",
    color: "white !important",
    border: "none",
  };

  switch (variant) {
    case "default":
      styles.background = "white";
      styles.color = colorsByStatus[color];
      styles.border = "1px solid hsla(240, 3%, 94%, 1)";
      break;
    case "warning":
      styles.background = gradientsByStatus[variant];
      styles.color = colorsByStatus["warning"];
      styles.border = `1px solid ${colorsByStatus["warning"]}`;
      break;
    case "danger":
      styles.background = gradientsByStatus[variant];
      styles.color = colorsByStatus["danger"];
      styles.border = `1px solid ${colorsByStatus["danger"]}`;
      break;
  }

  return styles;
}

export interface StatusCardProps {
  className?: string;
  variant: StatusCardVariant;
  color: StatusColor;
  value: string;
  title: string;
  isLoading?: boolean;
  href?: string;
}

function StatusCard({
  className,
  variant,
  color,
  value,
  title,
  href,
}: StatusCardProps) {
  const styles = getStatusCardVariants({ variant, color });
  const content = (
    <>
      <p className="relative">
        {variant === "warning" && (
          <AlertTriangle
            size={15}
            color={colorsByStatus["warning"]}
            className="absolute top-1/6 left-[-20px]"
          />
        )}
        {variant === "danger" && (
          <XCircle
            size={15}
            color={colorsByStatus["danger"]}
            className="absolute top-1/6 left-[-20px]"
          />
        )}
        {title}
      </p>
      <p className="text-2xl font-bold">{value}</p>
    </>
  );

  const sharedClassName = cn(
    "flex h-[120px] w-full flex-col items-start justify-center gap-1 rounded-md px-4 py-[24.5px]",
    variant === "warning" && "shadow-warning pl-10",
    variant === "danger" && "shadow-danger pl-10",
    variant === "default" && "shadow-default",
    href ? "cursor-pointer" : "cursor-default",
    className
  );

  if (href) {
    return (
      <Link
        data-slot="status-card"
        role="status-card"
        href={href}
        className={sharedClassName}
        style={{ ...styles }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      data-slot="status-card"
      role="status-card"
      className={sharedClassName}
      style={{ ...styles }}
    >
      {content}
    </div>
  );
}

export { StatusCard };
