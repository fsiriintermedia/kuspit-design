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
