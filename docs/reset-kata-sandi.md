# Reset kata sandi

Halaman `/reset-kata-sandi` menggunakan tautan dari email pemulihan Supabase. Pada template **Reset password** di Supabase Auth, arahkan tautan ke aplikasi dengan hash token berikut.

```html
<a href="{{ .SiteURL }}/reset-kata-sandi?token_hash={{ .TokenHash }}">Buat kata sandi baru</a>
```

Atur **Site URL** ke URL dasar aplikasi tanpa garis miring penutup. Jika template dipakai bersama beberapa lingkungan, arahkan tautan ke URL aplikasi yang sesuai.

Tambahkan `SUPABASE_RESET_SESSION_SECRET` ke environment server, bersama `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` yang sudah digunakan untuk login. Buat nilai acak 32 byte dalam format heksadesimal dan gunakan nilai yang sama pada semua instans di lingkungan yang sama.

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Supabase memverifikasi token saat formulir dikirim. Sesi pemulihan tersimpan dalam cookie terenkripsi selama maksimal 15 menit agar pengguna bisa mencoba lagi jika Supabase menolak pilihan kata sandi atau terjadi gangguan jaringan. Setelah penyimpanan berhasil, halaman mengakhiri sesi pemulihan dan menyediakan tautan untuk masuk.

Halaman `/lupa-kata-sandi` masih menunggu implementasi pengiriman email. Untuk pengujian tahap ini, gunakan akun uji dan kirim tautan pemulihan dari dasbor Supabase.
