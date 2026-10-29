# Frontend demo Tempat.In

Tahap ini hanya mencakup landing page dan eksplorasi kafe pada `/`.
Kebutuhan utama tetap mengikuti [PRD](../PRD.md).

## Menjalankan

Gunakan npm. Jika dependensi belum terpasang, jalankan `npm ci` terlebih dahulu.

```sh
npm run dev
```

Buka alamat localhost yang tercetak di terminal (biasanya http://localhost:3000).
Untuk menghentikan server, tekan Ctrl+C di terminal tersebut.

Pemeriksaan kode dan versi produksi:

```sh
npx tsc --noEmit
npm run lint
npm run build
npm run start
```

## Bagian utama

- [Halaman utama](../app/page.tsx): hero, manfaat, cara kerja, FAQ berbasis elemen HTML `details`, dan footer.
- [Eksplorasi kafe](../components/cafe-explorer.tsx): pencarian nama, filter fasilitas AND, reset, hasil kosong, dan detail demo.
- [Kartu kafe](../components/cafe-card.tsx): fasilitas, kursi tersisa, dan peringatan data lama.
- [Navigasi](../components/navbar.tsx): menu responsif dan dialog informasi login.
- [Dialog](../components/demo-dialog.tsx): fokus awal, siklus Tab, Escape, penguncian scroll, dan pengembalian fokus.
- [Data demo](../lib/demo-cafes.ts): tipe TypeScript dan enam kafe fiktif.
- [Tema](../app/globals.css): warna brand, layout responsif, dan focus state.
- [Layout](../app/layout.tsx): bahasa Indonesia dan metadata.

## Mengganti data dan gambar

Data demo disimpan lokal; tidak ada koneksi database. Nama kolom fasilitas dan
`diperbarui_pada` mengikuti model PRD. Waktu acuan demo tetap pada 30 Oktober 2026,
14.00 WIB. Label relatif dihitung terhadap waktu ini, bukan jam perangkat.
Kursi contoh dihitung dari kuota dikurangi pemakaian manual, tanpa reservasi.
Integrasi booking nanti wajib mengikuti perhitungan dan validasi server pada PRD.

Referensi UI PNG, foto kafe, dan logo terpisah belum tersedia saat implementasi.
Ilustrasi SVG lokal digunakan sebagai placeholder, dengan label bukan foto kafe.
Untuk menggantinya, tambahkan foto yang boleh digunakan ke [folder gambar](../public/images/),
lalu ubah `foto_url` pada data demo. Untuk hero, ubah sumber gambar di halaman utama.
Sesuaikan teks alternatif dan label pada [komponen gambar](../components/cafe-image.tsx)
ketika foto asli yang berizin sudah tersedia.

## Batas demo

Tidak ada login, database, route detail kafe, form booking, atau dashboard.
Tombol Masuk hanya memberikan informasi. Tombol Lihat Detail membuka dialog.
Semua kafe, alamat, dan angka kursi adalah fiktif, bukan mitra atau data langsung.

## Checklist uji manual

- Pada lebar 375, 768, dan 1440px, pastikan teks terbaca dan tidak ada scroll horizontal.
- Pilih Colokan + Mushola: hanya Ruang Sela dan Titik Temu Kopi yang tampil.
- Dengan filter tersebut, cari Teras: hasil harus kosong. Reset mengembalikan enam kafe.
- Coba semua kombinasi fasilitas dan pencarian nama dengan kapital/spasi.
- Buka detail kafe penuh dan data lama; periksa penjelasan statusnya.
- Buka dialog menggunakan keyboard; Tab tetap di dalam dialog, Escape menutup,
  lalu fokus kembali ke tombol pembuka.
- Pada HP, buka/tutup hamburger, gunakan tautan section, dan coba dialog Masuk.
- Buka/tutup setiap FAQ menggunakan Enter atau Space.
