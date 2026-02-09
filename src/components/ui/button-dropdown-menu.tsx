import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { Button } from "./button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "./link";

type ButtonDropdownMenuBase = {
  label: string;
  icon?: React.ReactNode;
};

type ButtonDropdownMenuItemWithLink = ButtonDropdownMenuBase & {
  href: string;
  onClick?: never;
};

type ButtonDropdownMenuItemWithOnClick = ButtonDropdownMenuBase & {
  onClick: () => void;
  href?: never;
};

interface ButtonDropdownMenuProps {
  title: string;
  items: (
    | ButtonDropdownMenuItemWithOnClick
    | ButtonDropdownMenuItemWithLink
  )[];
  icon?: React.ReactNode;
}

export function ButtonDropdownMenu({
  title,
  items,
  icon,
}: ButtonDropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className={`cursor-pointer${open ? " bg-primary-dark" : ""}`}
        >
          {icon}
          {title}
          {open ? (
            <ChevronUp className="ml-auto size-4" />
          ) : (
            <ChevronDown className="ml-auto size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        {items.map((item) => {
          if ("href" in item && item.href) {
            return (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            );
          }
          return (
            <DropdownMenuItem
              key={item.label}
              onClick={"onClick" in item ? item.onClick : undefined}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
