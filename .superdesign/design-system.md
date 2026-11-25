# Tempat.In Login Design System

## Product and scope

Tempat.In adalah web responsif untuk mahasiswa dan pekerja remote di Jatinangor yang mencari serta mereservasi kafe. Target ini hanya halaman login bersama untuk role Pengguna, Mitra, dan Admin. UI harus berbahasa Indonesia dan mengikuti PRD; screenshot pengguna menjadi acuan visual utama.

## Brand foundations

- Library reference consulted: “Nature Inspired Style”. Only its compatible forest/sage/cream palette and organic rounding are adopted. Its Anton typography, oversized editorial scale, noise texture, parallax, and extreme radii are intentionally excluded because they conflict with the supplied login screenshot and the existing Geist brand.
- Nada: ramah, tenang, hangat, jelas, tidak korporat kaku.
- Font: Geist/sans-serif existing; jangan menambah font baru.
- Background halaman: warm off-white `#fbfaf7` atau token cream existing.
- Surface/header/input: putih hangat `#fffdf7`/putih.
- Teks utama: dark charcoal-brown `#332f29`; teks sekunder `#7c746b`.
- Brand brown: `#967143` untuk tombol dan tautan; hover lebih gelap.
- Panel promosi: pale cream `#f5f0e7`.
- Sage: `#a8b7a1`; dark forest: `#315746`; accent tan: `#b69768`.
- Border: warm neutral `#e7dfd4`; tipis dan halus.
- Radius: input/tombol 10–12px; panel 24–28px; badge/strip pill.
- Shadow: minimal; utamakan border dan whitespace.
- Focus: outline jelas warna brown/forest dengan kontras memadai.

## Login layout

- Header putih penuh dengan border bawah; logo asli dan wordmark kiri, “Jelajah Tempat” serta “Butuh bantuan?” kanan.
- Konten desktop terpusat, dua kolom: kartu promosi sedikit di bawah separuh lebar dan form login yang lebih sempit.
- Kartu promosi memiliki badge, heading besar, supporting text, ilustrasi kafe code-native dari bentuk sederhana, serta strip afirmasi putih di bawah.
- Form memiliki judul “Balik nugas lagi, yuk!”, supporting text, dua field besar berikon, baris remember/forgot, tombol brown full-width, dan ajakan daftar.
- Footer memiliki divider dan tiga zona teks pada desktop.
- Mobile memprioritaskan form; kartu promosi disembunyikan atau diringkas tanpa membuat scroll horizontal.

## Interaction and accessibility

- Semua label terhubung dengan input; validasi inline dan `aria-describedby`.
- Error submit diumumkan melalui region live.
- Toggle password adalah `button type="button"` dengan accessible name.
- Tombol submit menunjukkan “Sedang masuk...” dan disabled saat pending.
- Enter mengirim form; fokus keyboard terlihat.
- Elemen ilustrasi dekoratif tidak diumumkan.
- Hormati `prefers-reduced-motion`.

## Fidelity constraint

Use ONLY the fonts, colors, spacing, and component styles defined here and in the existing globals tokens. Do not introduce gradients, serif display fonts, neon colors, glassmorphism, or unrelated stock photography. The exact supplied Tempat.In logo must appear in the header; do not replace it with initials, emoji, a generic mark, invented SVG, or text alone.

