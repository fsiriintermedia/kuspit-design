# @kuspit/design-system

Design system reutilizable: **React + Tailwind CSS + shadcn/ui**. Librería de componentes e tokens para usar en múltiples apps (Next.js u otras React). Cada app que lo use es un **repositorio independiente**; no se asume monorepo.

## Principios

- **No es una app**: no usa Next.js ni routing.
- **Librería React + Tailwind**: componentes exportados y preset de Tailwind.
- **Tokens en CSS variables**: colores, radius, spacing en `globals.css`.
- **Un solo conjunto de componentes** para todos los proyectos.

## Stack

- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix + CVA)
- class-variance-authority, clsx, tailwind-merge
- tsup (build)

## Instalación

En cada proyecto consumidor (repositorio aparte):

```bash
# Desde el registry npm (cuando esté publicado)
pnpm add @kuspit/design-system

# O desde un registro privado (ajustar scope/registry según corresponda)
# pnpm add @kuspit/design-system --registry https://npm.pkg.github.com

# O desde Git (sin publicar aún)
# pnpm add git+https://github.com/tu-org/design-system.git#main
# pnpm add git+https://github.com/tu-org/design-system.git#v0.2.0
```

## Uso en un proyecto consumidor (ej. Next.js)

Las apps que consumen el design system viven en **repositorios separados**. En cada una:

### 1. Instalar el package

Instala el package en el proyecto (React y React-DOM quedan como peer; no se duplican).

### 2. Importar estilos una sola vez

En tu layout o `_app`:

```tsx
import "@kuspit/design-system/styles.css";
```

### 3. Configurar Tailwind en la app

En `tailwind.config.js` o `tailwind.config.ts`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@kuspit/design-system/tailwind.config.cjs")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@kuspit/design-system/dist/**/*.js",
  ],
  theme: { extend: {} },
  plugins: [],
};
```

- **presets**: usa el preset del design system para colores, radius, etc.
- **content**: incluye `node_modules/@kuspit/design-system` para que las clases de los componentes se generen.

### 4. Importar componentes

```tsx
import { Button, Input, Dialog, Card, Label, cn } from "@kuspit/design-system";

export default function Page() {
  return (
    <>
      <Button variant="default">Guardar</Button>
      <Input placeholder="Email" />
      <Card>...</Card>
    </>
  );
}
```

## Integración con Tailwind CSS v4 (Next.js)

Para proyectos que usen **Tailwind 4** (CSS-first, `@import "tailwindcss"` + `@source`), la integración recomendada es:

### 1. Instalar el package

Ejemplo con el scope publicado en GitHub Packages:

```bash
pnpm add @fsiriintermedia/design-system
```

### 2. Configurar `globals.css` (fuente de Tailwind 4)

En `src/app/globals.css` del proyecto consumidor:

```css
/* 1. Tokens del design system */
@import "@fsiriintermedia/design-system/styles.css";

/* 2. Tailwind 4 + base de escaneo */
@import "tailwindcss" source("../.."); /* "../.." = raíz del repo */

/* 3. Registrar el design-system como fuente adicional de clases */
@source "node_modules/@fsiriintermedia/design-system/dist";

/* 4. Otros imports/plugins CSS opcionales */
@import "tw-animate-css";
```

- `source("../..")` fija la raíz de escaneo de Tailwind en la raíz del repo.
- `@source "node_modules/@fsiriintermedia/design-system/dist";` hace que Tailwind 4 también escanee el `dist` del design system, generando las utilidades que usan los componentes internos (Button, Input, DatePicker, etc.).

> Nota (pnpm): si tienes problemas de resolución de `node_modules` con pnpm + Tailwind 4, es recomendable:
>
> ```ini
> # .npmrc del proyecto consumidor
> node-linker=hoisted
> ```

### 3. (Opcional) Configuración JS de Tailwind (preset)

Aunque Tailwind 4 se puede configurar solo desde CSS, también puedes usar el preset JS del design system para compartir parte del tema:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@fsiriintermedia/design-system/tailwind.config.cjs")],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        "primary-light": "var(--primary-light)",
        "primary-lighter": "var(--primary-lighter)",
        disabled: "var(--disabled)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

Para Tailwind 4, lo **crítico** es el CSS (`@import "tailwindcss"` + `@source`). El config JS es un extra opcional.

### 4. Importar el CSS global en Next.js

En el `RootLayout` de Next.js (proyecto consumidor):

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mi app",
  description: "Descripción",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

### 5. Usar componentes del design system

```tsx
import { Button, Input, DatePicker } from "@fsiriintermedia/design-system";

export function Example() {
  return (
    <div className="space-y-4">
      <Input placeholder="Introduce tu nombre" />
      <DatePicker label="Fecha" />
      <Button variant="default">Guardar</Button>
    </div>
  );
}
```

Las clases internas de estos componentes se generan correctamente porque Tailwind 4 está escaneando el `dist` del design system mediante `@source`.

### 6. Resumen rápido (Tailwind 4)

Para un proyecto Next.js + Tailwind 4:

- Instalar el paquete:

  ```bash
  pnpm add @fsiriintermedia/design-system
  ```

- En `globals.css`:

  ```css
  @import "@fsiriintermedia/design-system/styles.css";
  @import "tailwindcss" source("../..");
  @source "node_modules/@fsiriintermedia/design-system/dist";
  ```

- (Opcional) Usar el preset JS:

  ```js
  module.exports = {
    presets: [require("@fsiriintermedia/design-system/tailwind.config.cjs")],
  };
  ```

- Importar `globals.css` en el entry point de la app y usar los componentes normalmente.

## Estructura del repo

```
design-system/
├── src/
│   ├── components/ui/   # Button, Input, Dialog, Card, Label
│   ├── lib/cn.ts
│   ├── styles/globals.css
│   └── index.ts
├── tailwind.config.ts  # Preset para apps
├── tsup.config.ts
├── package.json
├── README.md
└── CHANGELOG.md
```

## Build y publicación

En **este** repositorio (design-system):

```bash
pnpm install
pnpm build
```

Genera `dist/` con ESM, CJS y tipos (`.d.ts`). Los estilos se copian a `dist/styles/globals.css`.

Para que otros proyectos (en otros repos) puedan instalarlo:

- **npm / registro privado**: publicar con `npm publish` (configurar `publishConfig` en `package.json` si usas otro registry).
- **Git**: no hace falta publicar; en el otro proyecto instalan con `pnpm add git+https://...`.

## Versionado

- Semántico (MAJOR.MINOR.PATCH).
- Cambios visuales o breaking → minor o major.
- CHANGELOG obligatorio.

## Antipatrones a evitar

- No usar Next.js en el design system.
- No copiar shadcn en cada app; usar este package.
- No duplicar Tailwind por proyecto; usar el preset.
- No hardcodear tokens en componentes; usar variables CSS.
- No exponer helpers internos por el `index`.
