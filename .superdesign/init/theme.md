# Theme

## Ringkasan token

- Font sans: Geist melalui `--font-geist-sans`; editorial: Georgia.
- Warna: ink `#3b2314`, cream `#fbf8ec`, gold `#d9ae6f`, paper `#fffdf7`, muted `#756252`, caramel `#926039`, line `#e5ddce`, forest `#406044`.
- Layout: `.shell` maksimum 1200px dengan gutter 40px; mobile gutter 36px.
- Radius umum: 7–18px; tombol 9px; kartu 12–14px; badge pill.
- Fokus: outline 3px caramel dengan offset 4px.
- Breakpoint utama yang dipakai: 639px, 767px, 1023px.
- Bayangan: lembut dan hangat, misalnya `0 10px 28px #3b231412`.

## Raw source: `app/globals.css`

```css
@import "tailwindcss";

@theme inline {
  --color-ink: #3b2314;
  --color-cream: #fbf8ec;
  --color-gold: #d9ae6f;
  --color-paper: #fffdf7;
  --color-muted: #756252;
  --color-caramel: #926039;
  --color-line: #e5ddce;
  --color-forest: #406044;
  --font-sans: var(--font-geist-sans);
  --font-editorial: Georgia, "Times New Roman", serif;
}
@layer components {
:root { color-scheme: light; }
html { scroll-behavior: smooth; scroll-padding-top: 110px; }
body { background: #fbf8ec; color: #3b2314; font-family: var(--font-geist-sans), Arial, sans-serif; }
button, a, input, summary { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
button, summary { cursor: pointer; }
button, input { font: inherit; }
:focus-visible { outline: 3px solid #926039; outline-offset: 4px; }
::selection { background: #d9ae6f; color: #3b2314; }
.shell { width: min(1200px, calc(100% - 40px)); margin-inline: auto; }
.section-pad { padding-block: 88px; }
.section-heading { font-size: clamp(1.9rem, 3.1vw, 2.7rem); line-height: 1.2; font-weight: 600; letter-spacing: -.035em; }
.eyebrow { font-size: 11px; letter-spacing: .18em; font-weight: 700; color: #926039; }
.site-header { position: sticky; top: 0; z-index: 30; border-bottom: 1px solid #e5ddce; background: #fbf8ecf5; backdrop-filter: blur(12px); }
.wordmark { white-space: nowrap; font-size: 26px; line-height: 1; font-weight: 750; letter-spacing: -1.3px; }
.wordmark span { color: #926039; }
.header-brand { display: inline-flex; flex-flow: row nowrap; align-items: center; gap: 9px; flex-shrink: 0; }
.header-logo { display: block; width: auto; height: 34px; flex: 0 0 auto; object-fit: contain; }
.button { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; gap: 12px; padding: 12px 22px; border-radius: 9px; font-size: 14px; font-weight: 600; }
.button-primary { color: #fffdf7; background: #3b2314; border: 1px solid #3b2314; }
.button-outline { border: 1px solid #d3c5b2; background: transparent; }
.icon-button { min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid #e5ddce; border-radius: 50%; background: #fffdf7; }
.badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid #e5ddce; background: #f4eddf; padding: 7px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; }
@media (max-width: 767px) { .header-logo { height: 30px; } .header-brand .wordmark { font-size: 23px; } }
@media (max-width: 639px) { .section-pad { padding-block: 56px; } .shell { width: calc(100% - 36px); } }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { transition: none !important; } }
}
```

## Raw source: `next.config.ts`

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: { agentFeedback: true },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
};
export default nextConfig;
```

