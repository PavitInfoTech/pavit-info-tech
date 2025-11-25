# Copilot Instructions — PavitInfoTech

## Project Overview

Next.js 16 (App Router) IoT platform using **pnpm**, **Tailwind CSS v4** (with OKLCH CSS variables), and **shadcn/ui** (new-york style). Dark-first design.

## Key Commands

```bash
pnpm install        # install deps
pnpm dev            # start dev server (localhost:3000)
pnpm build          # production build
pnpm lint           # eslint
```

## Architecture & Layout

| Path                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `app/`                  | Next.js App Router pages (file-based routing)        |
| `components/layout/`    | `MainLayout`, `Navbar`, `Footer` — wrap public pages |
| `components/dashboard/` | `DashboardLayout`, `Sidebar` — wrap `/dashboard/*`   |
| `components/ui/`        | shadcn primitives (`Button`, `Card`, `Input`, etc.)  |
| `lib/`                  | utilities (`cn`, `auth-utils`, `blog-data`)          |

## Component Patterns

- **Layouts**: Wrap page content with `<MainLayout>` for public pages or `<DashboardLayout>` for authenticated dashboard routes.
- **UI components**: Import from `@/components/ui/*`. Use `cn()` from `@/lib/utils` for conditional classes.
- **Tailwind gradients**: Use `bg-linear-to-*` (Tailwind v4 syntax), not `bg-gradient-to-*`.
- **Icons**: Import from `lucide-react`.

### Example — Page with MainLayout

```tsx
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";

export default function ExamplePage() {
  return (
    <MainLayout>
      <section className='max-w-7xl mx-auto px-4 py-16'>
        <Button>Click Me</Button>
      </section>
    </MainLayout>
  );
}
```

## Styling Conventions

- **Dark-first**: CSS variables in `app/globals.css` using OKLCH color space.
- **Responsive breakpoints**: `sm:`, `md:`, `lg:` — mobile-first.
- **Typography**: Use `font-serif` for headings, `font-sans` for body.
- **Spacing**: Prefer `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for consistent page width.

## Lint Rules to Follow

- **Escape JSX text entities**: Use `&#39;` for `'` and `&quot;` for `"` inside JSX text (react/no-unescaped-entities).
- **Unused vars**: Remove or prefix with `_` (e.g., `_unused`).
- **Catch blocks**: Use bare `catch { }` if you don't need the error object.

## File Naming

- Pages: `app/<route>/page.tsx`
- Components: PascalCase (`SignInForm.tsx` or `sign-in-form.tsx` kebab allowed).
- Utilities: camelCase (`authUtils.ts` or `auth-utils.ts`).

## Adding New shadcn Components

```bash
pnpm dlx shadcn@latest add <component>
```

Components land in `components/ui/`. Do not manually create them.
