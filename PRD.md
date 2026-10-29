# PRD Tempat.In (MVP)

Kelompok 3, Product Development. Tagline: "Find. Book. Chill."&#32;

## 1. Ringkasan dan Tujuan

Tempat.In adalah website yang membantu mahasiswa Jatinangor menemukan dan memesan tempat belajar di kafe, dengan informasi fasilitas (colokan, mushola, smoking area, indoor/outdoor) dan ketersediaan kursi.

**Tujuan MVP:** prototype fungsional yang bisa didemokan dan diuji ke 5-10 kafe dan mahasiswa asli. Bukan produk skala besar.

**Hipotesis yang diuji MVP:**

1. Mahasiswa mau mencari dan memesan kursi kafe lewat web.
2. Kafe mau mengatur kuota kursi booking dan mengoreksinya secara manual.&#32;

## 2. Ruang Lingkup

**Masuk (MVP):**

- Daftar kafe publik dengan filter fasilitas
- Detail kafe dengan kursi tersisa dan label "terakhir diperbarui"
- Registrasi dan login mahasiswa
- Booking kursi (tanpa pembayaran)
- Halaman "Booking Saya" dan pembatalan
- Dashboard kafe: atur kuota, edit info, lihat reservasi, tandai hadir/no-show, koreksi walk-in
- Satu web, dua role, alur setelah login berbeda

**Tidak masuk (ditunda**** ****du****lu****):** pembayaran dan komisi, denda pembatalan, gamifikasi/reward, compare tempat, iklan, subscription, notifikasi email/WA, upload foto oleh kafe, form admin (data kafe diisi manual lewat dashboard Supabase), co-working space, aplikasi mobile native.

## 3. Role dan Aturan Akses

| Role | Cara mendapat akun | Hak akses |
| --- | --- | --- |
| Pengunjung (belum login) | hanya melihat list cafe/co-working space, namun tidak bisa melakukan booking | Lihat daftar dan detail kafe |
| `student` | Daftar sendiri di `/register` (role otomatis `student`) | Booking, lihat dan batalkan booking miliknya |
| `cafe` | **Dibuat manual oleh tim** di Supabase | Kelola satu kafe miliknya saja dan reservasinya |
| Admin | Tim, via dashboard Supabase | Mengisi data kafe, membuat akun `cafe` |

Alasan akun `cafe` dibuat manual: mencegah kafe palsu dan tidak menambah pekerjaan karena data kafe memang diisi manual. \[inferred\]

## 4. Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Database dan Auth:** Supabase (Postgres, Supabase Auth email+password, Row Level Security)
- **Hosting:** Vercel, domain gratis `*.vercel.app`&#32;
- **Versi kode:** GitHub
- **Zona waktu:** semua waktu ditampilkan WIB (Asia/Jakarta), disimpan sebagai timestamptz UTC

Catatan: stack dipilih karena umum sehingga lebih andal dihasilkan AI coding tool.&#32;

## 5. Alur Pengguna

### 5.1 Mahasiswa

1. Buka `/` dan melihat daftar kafe tanpa login.
2. Filter fasilitas (colokan, mushola, smoking area, indoor, outdoor).
3. Buka `/cafe/[id]` dan melihat fasilitas, kursi tersisa, dan "terakhir diperbarui".
4. Pilih tanggal, jam mulai, durasi, dan jumlah kursi, lalu klik **Booking**.
5. Jika belum login, diarahkan ke `/login` dengan parameter `redirect` kembali ke halaman kafe, dan **isian booking tidak hilang**.
6. Setelah login atau daftar, kembali ke langkah 4 dan menyelesaikan booking.
7. Konfirmasi tampil, booking muncul di `/bookings`.

### 5.2 Pemilik kafe

1. Login di `/login` yang sama.
2. Sistem membaca `profiles.role`. Jika `cafe`, diarahkan ke `/cafe/dashboard`.
3. Di dashboard: atur kuota, edit info, lihat reservasi hari ini, tandai kehadiran, koreksi kursi walk-in.

### 5.3 Pengalihan setelah login

- `student`: ke `redirect` jika ada, jika tidak ke `/`
- `cafe`: selalu ke `/cafe/dashboard`
- Student yang membuka `/cafe/dashboard` ditolak (redirect ke `/`). Cafe yang membuka `/bookings` diarahkan ke dashboard.

## 6. Halaman

| Route | Akses | Isi |
| --- | --- | --- |
| `/` | Publik | Daftar kafe, filter fasilitas |
| `/cafe/[id]` | Publik (login saat booking) | Detail, ketersediaan, form booking |
| `/login` | Publik | Login email+password |
| `/register` | Publik | Daftar mahasiswa (nama, email, password) |
| `/bookings` | `student` | Daftar booking sendiri, tombol batal |
| `/cafe/dashboard` | `cafe` | Pengelolaan kafe |

## 7. Model Data

### `profiles`

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid PK | = `auth.users.id` |
| nama | text |  |
| role | text | `student` atau `cafe`, default `student` |
| created\_at | timestamptz |  |

Profil dibuat otomatis lewat trigger saat user baru mendaftar, dengan role `student`.

### `cafes`

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid PK |  |
| owner\_id | uuid FK profiles.id | Akun kafe pemilik, boleh kosong sebelum akun dibuat |
| nama | text |  |
| alamat | text |  |
| deskripsi | text |  |
| jam\_buka, jam\_tutup | time | WIB |
| punya\_colokan | boolean |  |
| punya\_mushola | boolean |  |
| smoking\_area | boolean |  |
| indoor | boolean |  |
| outdoor | boolean |  |
| kuota\_booking | int | Jumlah kursi yang boleh dibooking pada satu waktu |
| kursi\_terpakai\_manual | int | Koreksi walk-in saat ini, default 0 |
| diperbarui\_pada | timestamptz | Diisi saat kafe mengubah kuota atau koreksi |
| foto\_url | text | URL gambar, diisi manual |

### `bookings`

| Kolom | Tipe | Catatan |
| --- | --- | --- |
| id | uuid PK |  |
| cafe\_id | uuid FK cafes.id |  |
| user\_id | uuid FK profiles.id |  |
| mulai | timestamptz |  |
| selesai | timestamptz | mulai + durasi |
| jumlah\_kursi | int | 1 sampai 4 |
| status | text | `confirmed`, `cancelled`, `attended`, `no_show` |
| created\_at | timestamptz |  |

## 8. Aturan Bisnis

**B1. Kursi tersisa untuk slot mendatang** `tersisa = kuota_booking - SUM(jumlah_kursi)` dari booking berstatus `confirmed` pada kafe yang sama dan waktunya beririsan dengan slot (`b.mulai < slot.selesai` DAN `b.selesai > slot.mulai`).

**B2. Kursi tersisa "saat ini"** (ditampilkan di daftar dan detail) `tersisa = kuota_booking - kursi_terpakai_manual - SUM(jumlah_kursi booking confirmed/attended yang berlangsung sekarang)`, minimal 0.

**B3. Validasi booking**

- Slot harus dalam jam buka kafe dan di masa depan
- Jumlah kursi 1 sampai 4
- Durasi 1 sampai 4 jam, jam mulai kelipatan 30 menit
- Ditolak jika `jumlah_kursi > tersisa` pada slot (cek di **server/database**, bukan hanya di tampilan)
- Satu user maksimal 1 booking aktif yang waktunya beririsan \[inferred\]

**B4. Pembatalan** Student boleh membatalkan booking `confirmed` miliknya paling lambat 1 jam sebelum `mulai`. Tanpa denda di MVP. \[inferred: angka 1 jam bisa diubah\]

**B5. Kehadiran** Kafe menandai booking jadi `attended` atau `no_show`. Tidak ada konsekuensi otomatis di MVP, hanya data.

**B6. Race condition** Dua user memesan slot terakhir bersamaan tidak boleh lolos keduanya. Cek dan insert dilakukan dalam satu transaksi (fungsi database/RPC). \[?\] Titik rawan, uji eksplisit.

**B7. Label "terakhir diperbarui"** Menampilkan `cafes.diperbarui_pada` dalam format relatif (mis. "2 jam lalu"). Jika lebih dari 24 jam, tampilkan peringatan bahwa data mungkin tidak akurat.

## 9. Persyaratan Fungsional

### F1. Daftar kafe dan filter

- Menampilkan kartu kafe: nama, alamat, ikon fasilitas, kursi tersisa saat ini, label diperbarui
- Filter fasilitas bisa digabung (logika AND)
- Kondisi kosong: "Tidak ada kafe yang cocok"
- **Selesai jika:** memilih filter colokan+mushola hanya menampilkan kafe yang punya keduanya

### F2. Detail kafe dan booking

- Info lengkap, form booking (tanggal, jam mulai, durasi, jumlah kursi), tampilan kursi tersisa untuk slot yang dipilih
- Tombol Booking nonaktif jika slot penuh
- **Selesai jika:** booking yang melebihi kursi tersisa ditolak dengan pesan jelas

### F3. Auth

- Daftar dan login email+password, logout
- Parameter `redirect` dipertahankan
- Pesan error ramah untuk password salah dan email sudah terdaftar
- **Selesai jika:** user yang login sebagai `cafe` langsung masuk dashboard, `student` tidak bisa membuka dashboard

### F4. Booking Saya

- Daftar booking (mendatang dan riwayat) dengan status
- Tombol batal sesuai aturan B4
- **Selesai jika:** student A tidak bisa melihat booking student B

### F5. Dashboard kafe

- Edit kuota booking dan info dasar kafe (fasilitas, jam buka)
- Tombol +/- untuk `kursi_terpakai_manual`
- Daftar reservasi hari ini dan mendatang, tombol hadir/no-show
- Semua perubahan memperbarui `diperbarui_pada`
- **Selesai jika:** kafe A tidak bisa melihat atau mengubah data kafe B

## 10. Keamanan

Menyembunyikan tombol bukan keamanan. Aturan harus ditegakkan di database dengan **Row Level Security (RLS)** aktif di semua tabel.

| Tabel | Aturan |
| --- | --- |
| `cafes` | Semua orang boleh SELECT. UPDATE hanya jika `owner_id = auth.uid()`. INSERT/DELETE hanya admin |
| `bookings` | Student: SELECT/INSERT/UPDATE (batal) hanya baris dengan `user_id = auth.uid()`. Cafe: SELECT/UPDATE (hadir/no-show) hanya booking di kafe miliknya |
| `profiles` | Pengguna hanya SELECT/UPDATE profil sendiri, dan **tidak boleh mengubah kolom `role`** |

Tambahan:

- Jangan menaruh secret key (service role key) di kode frontend atau repo. Simpan di environment variable.
- File `.env` masuk `.gitignore`.
- Role di-cek di server/middleware, bukan hanya di UI.
- Data pribadi minimal: nama dan email saja.

**Uji keamanan wajib:** login sebagai student lalu coba (a) membuka `/cafe/dashboard`, (b) mengubah role sendiri, (c) membaca booking user lain. Semuanya harus gagal.

## 11. UI dan Brand

- Mobile-first (pengguna utama mahasiswa di ponsel), tetap rapi di desktop
- Palet: coklat hangat dan krem (acuan: coklat tua `#3B2314`, emas `#D9AE6F`, krem `#FBF8EC`) \[inferred dari dokumen\]
- Tampilan minimalis, ikon fasilitas jelas
- Bahasa antarmuka: Indonesia, nada ramah dan santai
- Wajib ada state loading, error, dan kosong di setiap halaman data

## 12. Data Awal

Isi manual 5-10 kafe asli Jatinangor lewat dashboard Supabase (nama, alamat, fasilitas, jam buka, kuota). Buat 1-2 akun `cafe` uji. Jangan memakai data kafe asli untuk demo publik tanpa izin pemiliknya. \[inferred\]

## 13. Urutan Build (satu langkah per prompt)

Setiap langkah selesai jika kriteria "Selesai jika" terpenuhi dan sudah di-commit.

1. **Setup dan deploy:** proyek Next.js, halaman kosong, deploy ke Vercel. *Selesai:* link publik terbuka.
2. **Database:** tabel, trigger profil, RLS, isi 5 kafe manual. *Selesai:* aturan bagian 10 lolos uji.
3. **Auth dan redirect berdasarkan role** (F3).
4. **Halaman publik:** daftar, filter, detail (F1, F2 tanpa booking).
5. **Booking:** fungsi transaksi (B1-B6), form, Booking Saya (F2, F4).
6. **Dashboard kafe** (F5).
7. **Polesan UI:** responsif, state kosong/error, teks Indonesia.
8. **Uji end-to-end** dengan 2 akun student dan 1 akun cafe.

## 14. Cara Memakai PRD dengan Codex

- Simpan dokumen ini sebagai `PRD.md` di root repo (ekspor Markdown dari doc ini).
- Prompt pertama: *"Baca PRD.md. Kerjakan langkah 1 saja (Setup dan deploy). Jelaskan setiap file yang kamu buat dengan bahasa awam. Jangan mengerjakan langkah lain."*
- Setelah tiap langkah: uji manual, commit, lanjut ke langkah berikutnya.
- Jika error: tempel pesan error persis, jangan diparafrase.
- Jika AI menyimpang dari PRD, minta ia mengutip bagian PRD yang dipakai.

## 15. Risiko dan Pertanyaan Terbuka

| # | Risiko / pertanyaan | Dampak |
| --- | --- | --- |
| R1 | Kafe tidak mau atau tidak sempat mengelola kuota dan koreksi walk-in \[?\] | Data basi, nilai produk turun. Validasi ke 3-5 pemilik kafe |
| R2 | Model pendapatan di dokumen sumber belum konsisten (gratis, P2P, marketplace dengan komisi 10%, booking+bayar) | Menentukan apakah pembayaran masuk versi berikutnya. Putuskan sebelum fase 2 |
| R3 | Kuota booking vs kursi fisik: booking dan walk-in berebut kursi yang sama | Perlu aturan dari kafe (mis. sekian kursi khusus booking) |
| R4 | Klaim ">61% populasi Jatinangor adalah mahasiswa" dan angka pasar (15 juta/60 ribu/12 ribu/115) berasal dari dokumen sumber, belum diverifikasi \[?\] | Tidak memengaruhi build MVP, tetapi penting untuk presentasi |
| R5 | Kode hasil AI tidak dipahami tim | Minta penjelasan tiap langkah, simpan versi di GitHub |
| R6 | Race condition booking (B6) | Uji dengan dua tab/akun bersamaan |

&#91;weakest link: R1. Seluruh fitur ketersediaan bergantung pada asumsi bahwa kafe mau memperbarui data; jika tidak, MVP tetap berjalan secara teknis tetapi tidak membuktikan nilai produk\]
