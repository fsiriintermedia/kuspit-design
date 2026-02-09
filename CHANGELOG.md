# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-02-06

### Added

- Todos los componentes UI de Kpt-SITI-Front que no dependen de store ni de librerías que compliquen la exportación:
  - Alert, Avatar, Badge, Breadcrumb, ButtonDropdownMenu, ButtonWithTooltip
  - Calendar, Checkbox, Collapsible, DatePicker
  - DropdownMenu, Form (react-hook-form)
  - InputFile, InputOTP, OTPCodeField
  - Link, Loader, Popover, Progress, RadioGroup
  - ScrollArea, Select, Separator, Sheet
  - Skeleton, Spinner, StatusCard, StatusCardSkeleton
  - Table, Tag, Textarea, Toggle, ToggleGroup, Tooltip
- Dependencias: Radix (avatar, checkbox, collapsible, dropdown-menu, popover, progress, radio-group, scroll-area, select, separator, tooltip, toggle, toggle-group), react-day-picker, date-fns, input-otp, react-hook-form.
- Animación `animate-caret-blink` en globals.css para InputOTP.

### Excluded (app-specific or store)

- Header (NavUser, NavNotifications, DarkLogo)
- Sidebar (cookies, useIsMobile)
- StatusBadge, TypeBadge (features/requirements)
- Message (archivo vacío)

## [0.1.0] - 2025-02-06

### Added

- Initial extraction from Kpt-SITI-Front (Next.js app).
- Tailwind preset with design tokens (colors, radius, shadows, font).
- CSS variables in `globals.css` for light/dark themes.
- Components: Button, Input, Dialog, Label, Card (shadcn-style with CVA).
- Utility `cn` (clsx + tailwind-merge).
- Build with tsup (ESM + CJS + types).
- Export of styles as `@kuspit/design-system/styles.css`.
- README with integration guide for Next.js apps.
