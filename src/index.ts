/**
 * API pública del Design System.
 * Importar desde las apps: import { Button, cn } from "@kuspit/design-system"
 * Estilos: import "@kuspit/design-system/styles.css"
 */

// ─── Utilidades ─────────────────────────────────────────────────────────────
export { cn } from "./lib/cn";

// ─── Botones y acciones ─────────────────────────────────────────────────────
export { Button, buttonVariants } from "./components/ui/button";
export { ButtonDropdownMenu } from "./components/ui/button-dropdown-menu";
export { ButtonWithTooltip } from "./components/ui/button-with-tooltip";
export { Toggle, toggleVariants } from "./components/ui/toggle";
export { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";

// ─── Formularios e inputs ──────────────────────────────────────────────────
export { Checkbox } from "./components/ui/checkbox";
export { DatePicker } from "./components/ui/date-picker";
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./components/ui/form";
export { Input } from "./components/ui/input";
export type { InputProps } from "./components/ui/input";
export { InputFile } from "./components/ui/input-file";
export type { InputFileProps } from "./components/ui/input-file";
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./components/ui/input-otp";
export { Label } from "./components/ui/label";
export { OTPCodeField } from "./components/ui/otp-code-field";
export { RadioGroup, RadioGroupItem, RadioGroupCard } from "./components/ui/radio-group";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
export { Textarea } from "./components/ui/textarea";

// ─── Layout y estructura ────────────────────────────────────────────────────
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./components/ui/card";
export { Separator } from "./components/ui/separator";

// ─── Overlays y superficie ───────────────────────────────────────────────────
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./components/ui/dropdown-menu";
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./components/ui/popover";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetPortal,
  SheetOverlay,
} from "./components/ui/sheet";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip";

// ─── Feedback y estado ──────────────────────────────────────────────────────
export { Alert, AlertTitle, AlertDescription, AlertContent, alertVariants } from "./components/ui/alert";
export { Loader } from "./components/ui/loader";
export { Progress } from "./components/ui/progress";
export { Skeleton } from "./components/ui/skeleton";
export { Spinner } from "./components/ui/spinner";

// ─── Navegación y enlaces ────────────────────────────────────────────────────
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/ui/breadcrumb";
export { Link } from "./components/ui/link";
export type { LinkProps } from "./components/ui/link";

// ─── Datos y listas ─────────────────────────────────────────────────────────
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/ui/table";

// ─── Otros componentes ──────────────────────────────────────────────────────
export { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
export { Badge, badgeVariants } from "./components/ui/badge";
export { Calendar, CalendarDayButton } from "./components/ui/calendar";
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./components/ui/collapsible";
export { StatusCard } from "./components/ui/status-card";
export type { StatusCardProps, StatusCardVariant, StatusColor } from "./components/ui/status-card";
export { StatusCardSkeleton } from "./components/ui/status-card-skeleton";
export { Tag } from "./components/ui/tag";
export type { TagProps } from "./components/ui/tag";
export { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
