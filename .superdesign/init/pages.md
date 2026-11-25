# Page dependency trees

## `/` — Landing page

Entry: `app/page.tsx`

Dependencies:
- `app/layout.tsx`
  - `app/globals.css`
- `app/page.tsx`
  - `components/navbar.tsx`
    - `components/icon.tsx`
    - `components/demo-dialog.tsx`
      - `components/icon.tsx`
  - `components/cafe-explorer.tsx`
    - `lib/demo-cafes.ts`
    - `components/cafe-card.tsx`
      - `components/cafe-image.tsx`
      - `components/icon.tsx`
      - `lib/demo-cafes.ts`
    - `components/cafe-image.tsx`
    - `components/demo-dialog.tsx`
    - `components/icon.tsx`

Belum ada halaman `/login`; target login adalah target baru dalam codebase yang sudah ada.

