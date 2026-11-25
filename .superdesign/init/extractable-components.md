# Extractable components

## Navbar
- Source: `components/navbar.tsx`
- Category: layout
- Description: Header landing responsif dengan logo, anchor navigasi, dan menu mobile.
- Extractable props: tidak ada; navigasi dan label saat ini hardcoded.
- Hardcoded: logo `/images/tempatin-logo.png`, wordmark, anchor landing, tombol masuk demo.
- Catatan: tidak cocok dipakai langsung pada login karena login membutuhkan header khusus tanpa dialog demo.

## DemoDialog
- Source: `components/demo-dialog.tsx`
- Category: basic
- Description: Dialog modal aksesibel dengan focus trapping dan pengembalian fokus.
- Extractable props: `title`, `onClose`, slot children.
- Hardcoded: ikon tutup dan tombol penutup.

Tidak ada komponen layout existing yang perlu diekstrak untuk target login baru; header login harus dibuat khusus tetapi tetap memakai aset logo dan token brand yang sama.

