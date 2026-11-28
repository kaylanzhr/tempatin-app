# Tempat.In

**"Find. Book. Chill."**

*Solusi Digital untuk Kebutuhan Ruang Belajar Mahasiswa*

**Dosen Pengampu:** Zulhamdi, S.Si., MT

**Kelompok 3**

| Nama | NPM |
|---|---|
| Kayla Nazhirah | 120510240038 |
| Ani Hanifah | 120510240005 |
| Athaya Alaisa M | 120510240009 |
| Zunaira Habiba | 120510240028 |
| Zakiyatul Fikra A | 120510240012 |

---

## KONTROL VERSI DOKUMEN

*Berikut perubahan yang dilakukan pada dokumen ini sejak distribusi awal.*

| Tanggal | Ver. | Penulis | Bagian | Deskripsi Amandemen |
|---|---|---|---|---|
| 6 November 2026 | 1.0 | Kel. 3 Tempat.In | - | - |
| 20 November 2026 | 1.1 | Kel. 3 Tempat.In | - Product Scope & Feature Prioritization<br>- Kebutuhan Bersama dan Kontrol Akses<br>- Functional Requirements | Memperbarui cakupan dan kebutuhan fungsional Tempat.In menjadi satu web app dengan role pengguna dan mitra, memperinci operasional mitra serta administrasi platform, dan menyelaraskan kebutuhan UX antar halaman |

---

## Daftar Isi

- KONTROL VERSI DOKUMEN
- 1. Product Overview & Problem Definition
  - 1.1 Gambaran Umum Tempat.In
  - 1.2 Latar Belakang Pengembangan Produk
  - 1.3 Solusi yang Ditawarkan
- 2. Product Goals & Success Metrics
  - 2.1 Tujuan Produk bagi Pengguna & Mitra Kafe
  - 2.2 Tujuan Bisnis Tempat.In
- 3. Target Users, Roles & User Journey
  - 3.1 Segmentasi Pengguna Utama dan Sekunder
  - 3.2 User Persona dan Pain Points Setiap Persona
  - 3.3 Definisi Role Pengguna, Mitra, dan Admin
  - 3.4 Matriks Hak Akses
- 4. Product Scope & Feature Prioritization
  - 4.1 In Scope
  - 4.2 Out of Scope
  - 4.3 Feature Prioritization
  - 4.4 Batasan dan Aturan Produk
- 4. Functional Requirements
  - 4.1 Kebutuhan Bersama dan Kontrol Akses
  - 4.2 Functional Requirements — Pengguna
  - 4.4 Functional Requirements — Mitra
  - 4.5 Functional Requirements — Admin
  - 4.6 Database Scheme
  - 4.7 Relasi Antar Tabel
- 5. UX Requirements & Screen Inventory
  - 5.1 UX Requirements
  - 5.2 Struktur Navigasi
  - 5.3 Screen Inventory
  - 5.4 Dialog dan Variasi Layar
  - 5.5 Konsistensi Informasi Kapasitas
- 6. Validation Plan & Acceptance Criteria
  - 6.2 Skenario Pengujian Utama
  - 6.3 Acceptance Criteria
- 7. Release Plan
  - 7.1 Tahapan Pengembangan Produk
  - 7.2 Timeline dan Milestone

---

## 1. Product Overview & Problem Definition

### 1.1 Gambaran Umum Tempat.In

Tempat.In adalah satu aplikasi website responsif untuk membantu mahasiswa di Jatinangor menemukan dan mereservasi kafe untuk belajar, bekerja, berdiskusi, atau berkumpul. Tagline **"Find. Book. Chill."** menggambarkan alur menemukan tempat, membuat reservasi, dan berkunjung dengan informasi yang lebih jelas. Mahasiswa merupakan segmen utama; freelancer dan pekerja remote merupakan segmen sekunder.

Aplikasi memiliki tiga role akun: pengguna, mitra kafe, dan admin. Ketiganya menggunakan satu halaman login. Sistem membaca role yang tersimpan pada akun, kemudian mengarahkan pengguna ke dashboard dan menu yang sesuai. Role tidak dipilih secara bebas pada saat login. Pendaftaran mandiri tersedia bagi pengguna dan mitra kafe; akun admin disediakan oleh pengelola.

Pengunjung tanpa login dapat menjelajah, mencari, memfilter, dan membuka informasi kafe. Status tamu bukan role akun keempat. Reservasi dan akses riwayat pesanan memerlukan akun pengguna. Mitra mengelola kafe miliknya, sedangkan admin menjalankan pengelolaan operasional platform dengan hak akses terbatas sesuai tugas.

### 1.2 Latar Belakang Pengembangan Produk

Proposal mengidentifikasi bahwa informasi kafe masih tersebar di media sosial, Google Maps, rekomendasi teman, dan komunikasi langsung dengan kafe. Pengguna perlu memeriksa beberapa sumber untuk mengetahui lokasi, fasilitas, jam buka, serta ketentuan reservasi. Informasi bahwa kafe memiliki Wi-Fi atau colokan belum menjawab apakah tempat tersedia pada jadwal kunjungan.

Masalah pengguna adalah ketidakpastian tempat dan fasilitas sebelum berangkat, waktu pencarian yang panjang, serta kesulitan menemukan alternatif ketika kafe penuh. Di sisi mitra, pencatatan reservasi dan pengunjung langsung yang terpisah berisiko membuat kapasitas di platform berbeda dari kondisi lapangan. Admin membutuhkan listing mitra yang terstruktur agar kelengkapan informasi dan kelayakan publikasinya dapat ditinjau.

Rumusan masalah produk: bagaimana membantu pengguna menemukan kafe yang sesuai dan membuat reservasi dengan status jelas, sekaligus membantu mitra menjaga informasi kapasitas dan pesanan tetap konsisten?

Temuan dalam proposal menjadi dasar hipotesis produk, bukan bukti bahwa solusi sudah berhasil. Waktu pencarian, ketepatan kapasitas, kebutuhan reservasi, dan kesediaan mitra memperbarui data perlu divalidasi melalui pengujian pada Bab 10.

### 1.3 Solusi yang Ditawarkan

Pengguna mendapatkan pencarian berdasarkan nama atau lokasi, filter fasilitas, detail kafe, informasi ketersediaan sesuai jadwal, reservasi, pembayaran jika diperlukan, serta riwayat pesanan. Mitra mendapatkan pengelolaan profil kafe, fasilitas, jam buka, kapasitas, pengunjung langsung, dan reservasi. Admin mendapatkan daftar mitra dan listing terpusat, peninjauan pendaftaran, status publikasi atau penonaktifan listing, serta penanganan laporan dan pemeriksaan reservasi sesuai kebutuhan operasional.

- **Bagi pengguna**
  Informasi tempat dan alur reservasi dalam satu aplikasi, sehingga pemilihan kafe dapat dilakukan berdasarkan fasilitas, jadwal, kapasitas, dan biaya yang terlihat sebelum memesan.
- **Bagi mitra**
  Pengelolaan informasi dan reservasi yang terpusat, dengan pencatatan kapasitas serta pengunjung langsung untuk mengurangi ketidaksesuaian data dan meningkatkan visibilitas kafe.

## 2. Product Goals & Success Metrics

### 2.1 Tujuan Produk bagi Pengguna & Mitra Kafe

Pengguna dapat menemukan kafe sesuai fasilitas dan jadwal, memahami biaya serta ketentuan, lalu menyelesaikan reservasi sampai statusnya jelas tanpa berpindah kanal. Pengguna juga dapat membedakan kursi kosong saat ini dari kapasitas yang bisa dipesan pada waktu tertentu.

Mitra dapat memperbarui informasi kafe dan kapasitas serta mengelola reservasi dari satu dashboard. Admin dapat meninjau pendaftaran mitra, mengelola status listing, dan menindaklanjuti laporan. Pembagian akses harus mencegah akun membuka atau mengubah data yang bukan kewenangannya.

### 2.2 Tujuan Bisnis Tempat.In

Menguji kebutuhan pencarian dan reservasi kafe di Jatinangor, membentuk jaringan mitra yang bersedia memperbarui data, serta menilai potensi penggunaan berulang. Akses pencarian dasar gratis; reservasi dapat gratis, berdeposit, atau berbayar menurut ketentuan mitra yang ditampilkan sebelum konfirmasi

## 3. Target Users, Roles & User Journey

### 3.1 Segmentasi Pengguna Utama dan Sekunder

Aplikasi memiliki tiga role akun, yaitu pengguna, mitra kafe, dan admin, dengan satu halaman login bersama. Setelah login, sistem menampilkan halaman awal dan menu sesuai role akun.

| Segmen | Karakteristik | Kebutuhan utama |
|---|---|---|
| Pengguna utama: mahasiswa | Mencari tempat untuk belajar sendiri, mengerjakan tugas, atau berdiskusi kelompok | Mengetahui fasilitas, lokasi, kapasitas, dan jadwal sebelum datang |
| Pengguna sekunder: freelancer dan pekerja remote | Membutuhkan tempat bekerja di luar rumah pada waktu tertentu | Menemukan tempat dengan fasilitas kerja, area yang sesuai, dan ketentuan biaya yang jelas |
| Mitra kafe | Pemilik atau pengelola kafe yang menyediakan tempat | Mengelola informasi kafe, kapasitas, dan reservasi dalam aplikasi |
| Admin | Pengelola operasional Tempat.In | Mengelola database mitra dan pengguna |

### 3.2 User Persona dan Pain Points Setiap Persona

#### 3.2.1 Persona P01 — Nisa

Nisa adalah mahasiswa berusia 20 tahun yang sering mencari kafe untuk belajar atau mengerjakan tugas bersama teman.

- **Tujuan:** menemukan tempat yang sesuai kebutuhan dan memastikan kapasitas sebelum berangkat.
- **Pain points:** informasi fasilitas tersebar, ketersediaan kursi tidak jelas, dan proses reservasi mengharuskan menghubungi kafe.
- **Kebutuhan aplikasi:** pencarian dan filter fasilitas, informasi kapasitas sesuai jadwal, serta reservasi untuk satu atau beberapa orang.

#### 3.2.2 Persona P02 — Dimas, Pekerja Remote

Dimas adalah pekerja remote berusia 27 tahun yang membutuhkan kafe sebagai tempat bekerja selama beberapa jam.

- **Tujuan:** mendapatkan tempat bekerja pada jadwal yang direncanakan.
- **Pain points:** informasi fasilitas kurang rinci dan kursi kosong saat ini belum tentu tersedia pada waktu kunjungannya.
- **Kebutuhan aplikasi:** detail Wi-Fi, colokan, pilihan area, jam operasional, serta reservasi dengan durasi dan biaya yang jelas.

#### 3.2.3 Persona P04 — Bu Maya, pengelola kafe

Bu Maya adalah pengelola kafe berusia 34 tahun yang menangani pengunjung langsung dan pelanggan reservasi.

- **Tujuan:** menjaga informasi kapasitas tetap akurat dan mengelola reservasi dengan tertib.
- **Pain points:** pencatatan pengunjung terpisah, pembaruan kapasitas mudah terlupa, dan jadwal kedatangan sulit dipantau.
- **Kebutuhan aplikasi:** dashboard mitra, pembaruan kapasitas, pencatatan pengunjung langsung, serta pengelolaan status reservasi.

### 3.3 Definisi Role Pengguna, Mitra, dan Admin

| Role | Tanggung Jawab | Mitra |
|---|---|---|
| Pengunjung tanpa login | Menjelajah listing, mencari, memfilter, dan memeriksa detail tempat | Tidak dapat membuat reservasi atau membuka data pribadi dan pesanan |
| Pengguna terdaftar | Mengelola profil, membuat reservasi, melihat status, dan mengajukan tindakan atas pesanan sendiri | Tidak dapat mengubah data kafe, kapasitas, pesanan orang lain, atau status pembayaran secara manual |
| Mitra | Mengelola informasi kafe sendiri, kapasitas, pengunjung langsung, dan operasional reservasi | Hanya mengakses kafe dan reservasi yang menjadi tanggung jawabnya |
| Admin | Memverifikasi mitra, meninjau listing, menangani laporan, dan memantau catatan aktivitas platform | Akses data sesuai kebutuhan penanganan; tindakan sensitif wajib memiliki alasan dan jejak aktivitas |

> Catatan: header kolom ketiga ("Mitra") ditulis demikian di dokumen asli.

### 3.4 Matriks Hak Akses

| Aktivitas | Tamu | Pengguna | Mitra | Admin |
|---|---|---|---|---|
| Melihat listing dan fasilitas publik | Ya | Ya | Ya | Ya |
| Mencari dan memfilter tempat | Ya | Ya | Ya | Ya |
| Mengubah profil akun | Tidak | Sendiri | Sendiri | Sendiri |
| Membuat reservasi pelanggan | Tidak | Sendiri | Tidak | Tidak |
| Melihat detail reservasi | Tidak | Sendiri | Kafe sendiri | Terbatas |
| Membatalkan reservasi | Tidak | Sendiri, sesuai kebijakan | Kafe sendiri, sesuai kebijakan | Terbatas, penanganan kasus |
| Mengubah profil, foto, fasilitas, dan jam kafe | Tidak | Tidak | Kafe sendiri | Meninjau, bukan menyunting sebagai mitra |
| Mengatur kapasitas dan pengunjung langsung | Tidak | Tidak | Kafe sendiri | Melihat untuk penanganan kasus |
| Mencatat kedatangan dan selesai berkunjung | Tidak | Tidak | Kafe sendiri | Melihat untuk penanganan kasus |
| Mengajukan pendaftaran mitra | Ya, melalui registrasi | Ya, melalui pengajuan | Ya, saat pendaftaran | Tidak |

**Keterangan:** Ya = dapat dilakukan; Sendiri = hanya data milik akun; Kafe sendiri = hanya data terkait kafe yang dikelola; Terbatas = hanya untuk tugas operasional yang sah; Tidak = tidak diberikan.

## 4. Product Scope & Feature Prioritization

Tempat.In merupakan platform berbasis web yang membantu pengguna menemukan dan melakukan reservasi tempat di kafe berdasarkan lokasi, fasilitas, jadwal, dan kapasitas yang tersedia. Fokus awal layanan adalah kafe di wilayah Jatinangor, dengan mahasiswa sebagai pengguna utama. Platform menyediakan tiga area penggunaan dalam satu aplikasi. Pengguna mengakses pencarian dan pemesanan tempat; Mitra mengelola informasi kafe, kapasitas, dan kunjungan; sedangkan Admin mengelola data mitra, akun, laporan, serta aktivitas platform. MVP dikembangkan untuk menguji kelengkapan alur reservasi dan kesiapan operasional mitra. Informasi kapasitas berasal dari reservasi yang tercatat dan pembaruan manual oleh mitra.

### 4.1 In Scope

| Area | Cakupan MVP |
|---|---|
| Akun dan akses | Registrasi pengguna, login, logout, pemulihan kata sandi, pengaturan akun, dan pembatasan akses berdasarkan role. |
| Pencarian tempat | Pencarian berdasarkan nama atau lokasi, filter fasilitas, dan daftar kafe aktif. |
| Informasi kafe | Foto, deskripsi, alamat, tautan lokasi, fasilitas, jam operasional, kapasitas, dan waktu pembaruan. |
| Reservasi | Pemilihan tanggal, waktu, durasi, jumlah orang, preferensi area, dan catatan. |
| Konfirmasi dan pembayaran | Ringkasan reservasi, perhitungan deposit dan biaya platform, serta simulasi pembayaran. |
| Pengelolaan pesanan | Daftar pesanan, detail reservasi, status pembayaran, kode reservasi, dan pembatalan sesuai kebijakan. |
| Operasional mitra | Pengelolaan profil kafe, alokasi kursi reservasi dan walk-in, pencatatan kedatangan, serta penyelesaian kunjungan. |
| gamma | Penggunaan deposit |
| Administrasi | Pembuatan akun mitra oleh admin, pengelolaan listing, akun dan role, laporan ketidaksesuaian, serta log aktivitas. |
| Dashboard | Ringkasan aktivitas dan reservasi sesuai kewenangan setiap role. |

### 4.2 Out of Scope

Fitur berikut tidak termasuk dalam MVP:

- Integrasi payment gateway, pencairan dana ke mitra, dan refund otomatis.
- Pemesanan menu, kasir, inventaris, atau integrasi POS.
- Pemilihan nomor kursi, denah meja, dan jaminan tempat duduk berdampingan.
- Pendaftaran mandiri mitra dan pengelolaan banyak cabang dalam satu akun.
- Ulasan publik, live chat, reward, referral
- Perbandingan kafe secara berdampingan dan rekomendasi berbasis AI.
- Notifikasi operasional melalui WhatsApp atau email, di luar pemulihan akun.
- Sensor okupansi dan pembaruan kapasitas otomatis dari perangkat.
- Aplikasi mobile native.

### 4.3 Feature Prioritization

Prioritas menggunakan pendekatan MoSCoW. Must Have menjadi syarat kelayakan MVP; Should Have melengkapi pengalaman dan operasional; Could Have dikerjakan jika kapasitas tim memungkinkan; Won't Have ditunda.

| Prioritas | Fitur | Alasan |
|---|---|---|
| Must Have | Autentikasi dan pembatasan akses tiga role | Menjadi dasar keamanan akun dan kepemilikan data. |
| Must Have | Pencarian, filter fasilitas, dan detail kafe | Mendukung keputusan pengguna sebelum reservasi. |
| Must Have | Pemeriksaan kapasitas dan pembuatan reservasi | Merupakan fungsi utama produk. |
| Must Have | Ringkasan biaya dan simulasi pembayaran | Menguji pemahaman pengguna terhadap deposit dan biaya platform. |
| Must Have | Pemesanan Saya dan detail pesanan | Memungkinkan pengguna memantau serta menunjukkan bukti reservasi. |
| Must Have | Pengelolaan profil, kapasitas, dan reservasi oleh mitra | Menjaga kesesuaian informasi dengan operasional kafe. |
| Must Have | Pencatatan penggunaan deposit | Mendukung alur deposit yang ditampilkan pada rancangan terbaru. |
| Must Have | Database mitra, akun, dan status listing oleh admin | Memungkinkan tim menyiapkan dan mengoperasikan platform. |
| Must Have | Log tindakan sensitif | Menjaga keterlacakan perubahan akun, listing, dan transaksi deposit. |
| Should Have | Pemulihan kata sandi dan pengaturan akun | Mendukung keberlanjutan akses akun. |
| Should Have | Pelaporan ketidaksesuaian dan tindak lanjut | Membantu memperbaiki informasi kafe. |
| Should Have | Pembatalan reservasi sesuai kebijakan | Mendukung perubahan rencana pengguna secara tertib. |
| Should Have | Grafik reservasi dan filter lanjutan | Membantu pemantauan aktivitas. |
| Could Have | Pengurutan hasil dan penyempurnaan tampilan dashboard | Meningkatkan kenyamanan setelah alur utama stabil. |
| Won't Have | Pembayaran nyata, refund otomatis, POS, reward, dan aplikasi native | Membutuhkan pengembangan serta kesiapan operasional tambahan. |

### 4.4 Batasan dan Aturan Produk

1. Pengunjung dapat menjelajah dan melihat detail kafe tanpa login. Login diperlukan untuk membuat reservasi dan membuka data pribadi.
2. Registrasi publik hanya menghasilkan role Pengguna. Akun Mitra dibuat atau dihubungkan ke kafe oleh Admin.
3. Satu akun Mitra mengelola satu kafe pada MVP.
4. Kapasitas total dibagi menjadi kuota reservasi dan area walk-in. Jumlah keduanya harus sama dengan kapasitas total.
5. Ketersediaan reservasi dihitung berdasarkan jadwal pilihan. Kursi kosong secara fisik saat ini tidak otomatis tersedia untuk reservasi.
6. Deposit dihitung berdasarkan jumlah orang, sedangkan biaya platform dikenakan per pemesanan. Keduanya ditampilkan terpisah.
7. Deposit hanya berlaku pada kafe dan reservasi terkait. Biaya platform tidak menambah saldo deposit.
8. Preferensi area dan catatan merupakan permintaan pengguna yang pemenuhannya mengikuti kondisi di lokasi.
9. Seluruh jadwal ditampilkan dalam WIB.
10. Batas pembayaran, pembatalan, keterlambatan, serta perlakuan sisa deposit harus ditetapkan tim sebelum pengujian. Informasi tersebut harus sama pada antarmuka dan aturan sistem.

## 4. Functional Requirements

### 4.1 Kebutuhan Bersama dan Kontrol Akses

| ID | Kebutuhan fungsional | Perilaku sistem |
|---|---|---|
| FR-S01 | Login | Sistem memvalidasi email, kata sandi, dan status akun sebelum memberikan akses. |
| FR-S02 | Pengalihan berdasarkan role | Pengguna diarahkan ke area pengguna, Mitra ke dashboard mitra, dan Admin ke dashboard admin. Konteks reservasi pengguna dipertahankan setelah login. |
| FR-S03 | Registrasi pengguna | Sistem menerima nama, email, kata sandi, konfirmasi kata sandi, serta persetujuan ketentuan. Role otomatis ditetapkan sebagai Pengguna. |
| FR-S04 | Pemulihan kata sandi | Sistem menyediakan permintaan tautan reset dan penggantian kata sandi melalui tautan yang masih berlaku. |
| FR-S05 | Pengaturan akun | Setiap akun dapat mengelola informasi profil dan kata sandinya sendiri. Perubahan email memerlukan verifikasi sesuai mekanisme autentikasi. |
| FR-S06 | Logout | Sistem mengakhiri sesi dan membatasi kembali akses ke halaman terlindungi. |
| FR-S07 | Otorisasi | Sistem memeriksa role dan kepemilikan data pada setiap akses serta perubahan, termasuk melalui URL langsung atau permintaan data. |

### 4.2 Functional Requirements — Pengguna

| ID | Fitur | Kebutuhan fungsional |
|---|---|---|
| FR-U01 | Jelajah Tempat | Sistem menampilkan kafe dengan listing aktif beserta foto, nama, lokasi, fasilitas, informasi kapasitas, dan waktu pembaruan. |
| FR-U02 | Pencarian dan filter | Pengguna dapat mencari nama atau lokasi serta menggabungkan filter Wi-Fi, colokan, musala, smoking area, indoor, dan outdoor. Hasil harus memenuhi seluruh fasilitas yang dipilih. |
| FR-U03 | Detail kafe | Sistem menampilkan informasi lengkap kafe, jam operasional, tautan Maps, ketentuan reservasi, deposit per orang, dan biaya platform. |
| FR-U04 | Pengaturan kunjungan | Pengguna dapat menentukan tanggal, jam mulai, durasi, jumlah orang, preferensi area, dan catatan sebelum melanjutkan reservasi. |
| FR-U05 | Validasi reservasi | Sistem menolak jadwal di masa lalu, di luar jam operasional, jumlah orang tidak valid, atau permintaan yang melampaui kapasitas. Pemeriksaan kapasitas dilakukan kembali saat reservasi dibuat. |
| FR-U06 | Konfirmasi pembayaran | Sistem menampilkan ringkasan kunjungan, metode pembayaran, deposit, biaya platform, total, dan persetujuan ketentuan sebelum pengguna melanjutkan. |
| FR-U07 | Simulasi pembayaran | Sistem menyediakan hasil simulasi berhasil, gagal, dan kedaluwarsa. Reservasi hanya menjadi Dikonfirmasi setelah hasil berhasil tercatat. |
| FR-U08 | Pemesanan Saya | Pengguna dapat melihat pesanan sendiri berdasarkan kategori Aktif, Selesai, dan Dibatalkan, serta mencari nama kafe atau kode reservasi. Pesanan kedaluwarsa tetap dapat ditemukan dalam riwayat dengan label yang jelas. |
| FR-U09 | Detail pemesanan | Sistem menampilkan kode reservasi, jadwal, jumlah orang, status reservasi, status pembayaran, rincian biaya, petunjuk kedatangan, dan saldo deposit. |
| FR-U10 | Pembatalan | Pengguna dapat membatalkan pesanan sendiri apabila memenuhi kebijakan. Sistem menampilkan konsekuensi sebelum konfirmasi dan memperbarui kapasitas setelah pembatalan berhasil. |
| FR-U11 | Laporan ketidaksesuaian | Pengguna dapat mengirim laporan terkait fasilitas, jam operasional, atau informasi kapasitas melalui dialog pada detail kafe atau pesanan. |
| FR-U12 | Perlindungan data pesanan | Pengguna tidak dapat melihat pesanan akun lain, mengubah status pembayaran sendiri, atau memodifikasi saldo deposit. |

**Perhitungan biaya:**

- Deposit awal = deposit per orang × jumlah orang.
- Total pembayaran = deposit awal + biaya platform.
- Sisa deposit = deposit awal − total penggunaan deposit yang sah.

Contoh pada mockup: dua orang dengan deposit Rp20.000 per orang dan biaya platform Rp1.000 menghasilkan **total pembayaran Rp41.000** dan **deposit untuk menu Rp40.000**.

### 4.4 Functional Requirements — Mitra

| ID | Fitur | Kebutuhan fungsional |
|---|---|---|
| FR-M01 | Dashboard mitra | Sistem menampilkan reservasi hari ini, ketersediaan kuota reservasi, kursi yang digunakan pemesan, jumlah walk-in, dan akses ke tindakan operasional. |
| FR-M02 | Profil kafe | Mitra dapat memperbarui nama, alamat, deskripsi, fasilitas, foto, tautan lokasi, dan jam operasional kafe yang dikelolanya. |
| FR-M03 | Alokasi kapasitas | Mitra dapat mengatur pembagian kuota reservasi dan area walk-in. Sistem menolak nilai negatif, total alokasi yang tidak sesuai, atau perubahan yang tidak dapat menampung reservasi yang sudah diterima. |
| FR-M04 | Pencatatan walk-in | Mitra dapat menambah atau mengurangi jumlah pengunjung langsung dalam batas area walk-in. Pembaruan yang berhasil mencatat waktu dan pelaku perubahan. |
| FR-M05 | Daftar reservasi | Mitra dapat mencari kode atau nama pemesan serta memfilter tanggal dan status reservasi untuk kafenya. |
| FR-M06 | Detail reservasi | Sistem menampilkan jadwal, jumlah orang, preferensi, catatan, status kunjungan, pembayaran, dan deposit yang relevan bagi operasional. |
| FR-M07 | Kedatangan dan kunjungan | Mitra dapat mencatat check-in, menyelesaikan kunjungan, atau menandai tidak hadir sesuai status dan kebijakan yang berlaku. |
| FR-M08 | Penggunaan deposit | Mitra dapat memasukkan nominal dan keterangan pembelian menu pada reservasi yang sah. Sistem mencatat riwayat dan memperbarui saldo setelah penyimpanan berhasil. |
| FR-M09 | Validasi deposit | Sistem menolak nominal nol, negatif, atau melebihi saldo. Pengiriman ulang tindakan yang sama tidak boleh mengurangi saldo dua kali. |
| FR-M10 | Perlindungan data mitra | Mitra hanya dapat mengakses kafe dan reservasi yang terhubung dengan akunnya. Mitra tidak dapat mengubah role, status pembayaran, atau biaya platform. |

### 4.5 Functional Requirements — Admin

| ID | Fitur | Kebutuhan fungsional |
|---|---|---|
| FR-A01 | Dashboard admin | Sistem menampilkan jumlah mitra aktif, akun pengguna, reservasi hari ini, tren reservasi, dan laporan terbuka. |
| FR-A02 | Database mitra | Admin dapat mencari serta memfilter kafe, akun mitra terhubung, kapasitas, dan status listing. |
| FR-A03 | Tambah dan edit mitra | Admin dapat mengisi data kafe, membuat akun Mitra baru atau menghubungkan akun yang sudah ada, serta menentukan status listing. |
| FR-A04 | Publikasi listing | Sistem hanya mengaktifkan listing setelah informasi wajib dan hubungan akun mitra terpenuhi. Listing nonaktif tidak menerima reservasi baru. |
| FR-A05 | Penonaktifan listing | Admin memasukkan alasan dan mengonfirmasi tindakan. Reservasi terdahulu tetap tercatat untuk ditindaklanjuti. |
| FR-A06 | User & Role | Admin dapat membuat, mencari, mengubah status, dan menetapkan role akun. Akun Mitra harus mempunyai hubungan kafe yang valid. |
| FR-A07 | Perlindungan akses admin | Sistem mencegah penghapusan atau penurunan kewenangan admin aktif terakhir. Perubahan role dan status akun dicatat dalam log. |
| FR-A08 | Penanganan laporan | Admin dapat membaca laporan, memeriksa kafe terkait, mencatat tindak lanjut, dan memperbarui status Baru, Ditindaklanjuti, atau Selesai. |
| FR-A09 | Log aktivitas | Admin dapat menelusuri pelaku, waktu, tindakan, objek, dan hasil perubahan. Log tidak dapat diedit atau dihapus melalui antarmuka. |
| FR-A10 | Pembatasan perubahan transaksi | Admin tidak dapat menandai pembayaran lunas atau mengubah saldo deposit melalui pengelolaan akun dan listing. |

### 4.6 Database Scheme

| Tabel | Fungsi | Kolom utama |
|---|---|---|
| profiles | Menyimpan profil dan role akun. | id, full_name, email, role, is_active, created_at, updated_at |
| cafes | Menyimpan informasi kafe dan akun mitra pengelolanya. | id, partner_id, name, description, address, maps_url, photo_url, listing_status, created_at, updated_at |
| cafe_operating_hours | Mengatur jam operasional per hari. | id, cafe_id, day_of_week, is_closed, open_time, close_time |
| facilities | Master fasilitas, seperti Wi-Fi, colokan, dan musala. | id, name, icon_key, is_active |
| cafe_facilities | Menghubungkan kafe dengan fasilitas yang dimilikinya. | cafe_id, facility_id |
| cafe_capacity | Menyimpan kapasitas fisik, pembagian kursi, dan kondisi walk-in terkini. | cafe_id, total_seats, reservation_quota, walk_in_quota, walk_in_occupied, updated_by, updated_at |
| cafe_booking_settings | Menyimpan ketentuan reservasi dan nominal deposit. | cafe_id, deposit_per_person, platform_fee_per_booking, payment_timeout_minutes, cancellation_cutoff_minutes, updated_at |
| reservations | Menyimpan pesanan pengguna dan detail kunjungannya. | id, booking_code, user_id, cafe_id, start_at, end_at, party_size, area_preference, notes, status, hold_expires_at, checked_in_at, completed_at, cancelled_at, created_at |
| payments | Menyimpan percobaan pembayaran reservasi, termasuk simulasi. | id, reservation_id, method, amount, status, is_simulation, reference, expires_at, paid_at, created_at |
| deposit_usages | Mencatat setiap penggunaan deposit untuk pembelian menu. | id, reservation_id, amount, description, recorded_by, idempotency_key, created_at |
| reports | Menyimpan laporan ketidaksesuaian informasi kafe. | id, reporter_id, cafe_id, reservation_id (opsional), category, description, status, assigned_admin_id, created_at, updated_at |
| report_updates | Menyimpan riwayat tindak lanjut laporan. | id, report_id, actor_id, note, new_status, created_at |
| activity_logs | Mencatat perubahan penting untuk penelusuran. | id, actor_id, action, entity_type, entity_id, before_data, after_data, reason, created_at |

### 4.7 Relasi Antar Tabel

| Relasi | Kardinalitas | Penjelasan |
|---|---|---|
| profiles → cafes | 1 : 0..1 | Pada MVP, satu akun Mitra mengelola maksimal satu kafe. |
| profiles → reservations | 1 : N | Satu Pengguna dapat memiliki banyak reservasi. |
| cafes → cafe_operating_hours | 1 : N | Satu kafe mempunyai pengaturan operasional per hari. |
| cafes ↔ facilities | N : N | Dihubungkan melalui cafe_facilities. |
| cafes → cafe_capacity | 1 : 1 | Satu kafe mempunyai satu data kapasitas terkini. |
| cafes → cafe_booking_settings | 1 : 1 | Satu kafe mempunyai satu konfigurasi reservasi aktif. |
| cafes → reservations | 1 : N | Satu kafe menerima banyak reservasi. |
| reservations → payments | 1 : N | Pembayaran dapat dicoba ulang; hanya satu pembayaran berhasil yang diterima untuk satu reservasi. |
| reservations → deposit_usages | 1 : N | Deposit dapat digunakan beberapa kali selama kunjungan. |
| reports → report_updates | 1 : N | Satu laporan dapat mempunyai beberapa tindak lanjut. |

## 5. UX Requirements & Screen Inventory

### 5.1 UX Requirements

| ID | Aspek | Persyaratan |
|---|---|---|
| UX-01 | Konsistensi visual | Mengikuti rancangan terbaru dengan warna cokelat, krem, hijau sebagai penanda, tipografi yang mudah dibaca, serta komponen formulir dan tombol yang konsisten. |
| UX-02 | Responsivitas | Area pengguna nyaman digunakan melalui ponsel dan desktop. Sidebar Mitra dan Admin menyesuaikan menjadi navigasi ringkas pada layar kecil. |
| UX-03 | Navigasi berdasarkan role | Menu dan tujuan setelah login sesuai role. Pengguna dapat mengetahui posisi halaman dan kembali ke daftar asal. |
| UX-04 | Transparansi kapasitas | Label membedakan kursi kosong sekarang dengan kuota yang dapat dipesan untuk jadwal pilihan. Waktu pembaruan selalu tersedia. |
| UX-05 | Transparansi biaya | Deposit, biaya platform, total pembayaran, dan nilai yang dapat digunakan untuk menu ditampilkan sebelum konfirmasi. |
| UX-06 | Status yang jelas | Status reservasi, pembayaran, dan saldo deposit ditampilkan terpisah dengan istilah yang konsisten. |
| UX-07 | Pencegahan kesalahan | Formulir memberikan validasi dekat bidang terkait. Aksi pembatalan, perubahan role, dan penonaktifan listing memerlukan konfirmasi. |
| UX-08 | Pemulihan kesalahan | Isian dipertahankan ketika penyimpanan gagal. Pesan menjelaskan masalah serta tindakan untuk memperbaikinya. |
| UX-09 | Umpan balik sistem | Setiap halaman data mempunyai kondisi loading, berhasil, kosong, dan gagal. Tombol menunjukkan proses serta mencegah pengiriman berulang. |
| UX-10 | Aksesibilitas | Formulir memiliki label, fokus keyboard terlihat, dialog dapat dioperasikan dengan keyboard, dan informasi tidak bergantung pada warna saja. Target kontras teks normal minimal 4,5:1. |
| UX-11 | Bahasa dan format | Bahasa Indonesia dengan nada ramah; nominal menggunakan format rupiah dan jadwal menggunakan WIB. |
| UX-12 | Kejelasan simulasi | Data dummy dan pembayaran simulasi diberi label agar peserta uji memahami konteks demonstrasi. |

### 5.2 Struktur Navigasi

| Area | Navigasi utama |
|---|---|
| Publik | Landing page, Jelajah Tempat, Detail Kafe, Masuk, Daftar. |
| Pengguna | Jelajah Tempat, Pemesanan Saya, Pengaturan Akun, Keluar. |
| Mitra | Dashboard, Profil Kafe, Kapasitas Kafe, Reservasi, Pengaturan Akun, Keluar. |
| Admin | Dashboard, Database Mitra, User & Role, Laporan, Log Aktivitas, Pengaturan Akun, Keluar. |

### 5.3 Screen Inventory

| No. | Halaman | Akses | Isi dan tindakan utama |
|---|---|---|---|
| 01 | Masuk | Publik | Email, kata sandi, Ingat Saya, lupa kata sandi, dan tautan daftar. |
| 02 | Daftar Pengguna | Publik | Nama, email, kata sandi, konfirmasi, dan persetujuan ketentuan. |
| 03 | Lupa Password | Publik | Pengisian email dan permintaan tautan pemulihan. |
| 04 | Reset Password | Pemilik tautan sah | Kata sandi baru, konfirmasi, dan hasil penyimpanan. |
| 05 | Pengaturan Akun | Semua role terautentikasi | Profil akun sendiri dan perubahan kata sandi; navigasi mengikuti role. |
| 06 | Jelajah Tempat | Publik dan Pengguna | Pencarian, tanggal, jumlah orang, filter, jumlah hasil, serta kartu kafe. |
| 07 | Detail Kafe | Publik dan Pengguna | Informasi kafe, fasilitas, lokasi, kapasitas, biaya, dan akses reservasi. |
| 08 | Pemesanan Saya | Pengguna | Daftar pesanan, kategori status, pencarian, dan akses pembayaran atau detail. |
| 09 | Detail Pemesanan | Pengguna pemilik pesanan | Kode, jadwal, status, pembayaran, deposit, petunjuk kedatangan, dan aksi yang berlaku. |
| 10 | Dashboard Mitra | Mitra | Ringkasan reservasi, kapasitas, walk-in, dan kunjungan hari ini. |
| 11 | Profil Kafe | Mitra | Informasi dasar, fasilitas, foto, lokasi, dan jam operasional. |
| 12 | Kapasitas Kafe | Mitra | Alokasi reservasi dan walk-in, jumlah pengunjung langsung, serta waktu pembaruan. |
| 13 | Daftar Reservasi | Mitra | Pencarian, filter tanggal dan status, serta daftar pesanan kafe. |
| 14 | Detail Reservasi Mitra | Mitra | Detail kunjungan, check-in, penyelesaian, dan pencatatan deposit. |
| 15 | Dashboard Admin | Admin | Ringkasan platform, tren reservasi, laporan terbuka, dan akses tambah mitra. |
| 16 | Database Mitra | Admin | Daftar kafe, pencarian, filter listing, dan hubungan akun mitra. |
| 17 | Tambah/Edit Mitra | Admin | Data kafe, fasilitas, foto, akun mitra, dan status publikasi. |
| 18 | User & Role | Admin | Daftar akun, pembuatan akun, perubahan role, dan status akses. |
| 19 | Laporan Ketidaksesuaian | Admin | Daftar dan detail laporan, catatan, serta status penanganan. |
| 20 | Log Aktivitas | Admin | Riwayat perubahan dengan filter pelaku, tindakan, objek, dan waktu. |

### 5.4 Dialog dan Variasi Layar

Komponen berikut melengkapi halaman utama dan tidak dihitung sebagai halaman baru.

| Komponen | Isi dan perilaku |
|---|---|
| Atur Kunjungan | Tanggal, jam, durasi, jumlah orang, preferensi area, catatan, dan hasil pemeriksaan kapasitas. |
| Konfirmasi Pembayaran | Ringkasan kunjungan, deposit, biaya platform, metode pembayaran, persetujuan, dan tombol lanjut. |
| Pembayaran Simulasi | Kondisi diproses, berhasil, gagal, dan kedaluwarsa, disertai batas pembayaran. |
| Pembatalan Reservasi | Ketentuan, konsekuensi terhadap deposit, dan konfirmasi tindakan. |
| Catat Penggunaan Deposit | Saldo tersedia, nominal, keterangan pembelian, dan hasil pencatatan. |
| Laporkan Informasi | Kategori, uraian masalah, dan konfirmasi laporan terkirim. |
| Konfirmasi Tindakan Admin | Perubahan role, status akun, atau listing beserta alasan dan dampaknya. |
| Status Sistem | Akses ditolak, sesi habis, halaman tidak ditemukan, serta gangguan jaringan. |

### 5.5 Konsistensi Informasi Kapasitas

Seluruh halaman menggunakan sumber perhitungan yang sama. Sebagai contoh, jika kapasitas total 30 kursi terdiri atas 20 kursi reservasi dan 10 kursi walk-in, dengan delapan kursi sedang digunakan pemesan dan enam kursi oleh walk-in, maka:

| Informasi | Nilai |
|---|---|
| Total kursi terpakai secara fisik | 14 |
| Kursi kosong secara fisik | 16 |
| Sisa alokasi reservasi sebelum memperhitungkan penahanan lain | 12 |
| Sisa area walk-in | 4 |

Angka tersebut harus konsisten pada dashboard, halaman kapasitas, dan informasi publik yang menggunakan konteks waktu sama. Ketersediaan untuk jadwal mendatang tetap dihitung terpisah berdasarkan reservasi pada jadwal tersebut.

## 6. Validation Plan & Acceptance Criteria

Validasi dilakukan untuk memastikan pengguna dapat menemukan dan memesan tempat, mitra dapat menjalankan operasional kunjungan, serta admin dapat mengelola platform. Pengujian juga menilai pemahaman terhadap kapasitas, deposit, biaya platform, dan status reservasi.

### 6.2 Skenario Pengujian Utama

| ID | Skenario | Hasil yang diharapkan |
|---|---|---|
| VT-01 | Tamu mencari kafe dengan Wi-Fi dan colokan. | Hasil hanya berisi kafe aktif yang memiliki kedua fasilitas. |
| VT-02 | Tamu mengisi rencana kunjungan lalu login. | Pilihan kafe dan isian kunjungan tetap tersedia. |
| VT-03 | Dua pengguna memesan kapasitas terakhir secara bersamaan. | Hanya permintaan yang masih memenuhi kapasitas yang diterima. |
| VT-04 | Pengguna mencoba jadwal tidak valid atau kapasitas tidak cukup. | Sistem menolak dengan alasan dan opsi perbaikan yang jelas. |
| VT-05 | Pengguna menyelesaikan simulasi pembayaran berhasil. | Satu reservasi menjadi Dikonfirmasi dan satu pembayaran tercatat Lunas. |
| VT-06 | Pembayaran gagal atau kedaluwarsa. | Reservasi tidak dianggap terkonfirmasi; penahanan kapasitas dilepas ketika pesanan kedaluwarsa. |
| VT-07 | Pengguna membatalkan pesanan yang memenuhi ketentuan. | Status dan kapasitas diperbarui; konsekuensi deposit ditampilkan sesuai kebijakan. |
| VT-08 | Mitra memperbarui walk-in dan alokasi kapasitas. | Nilai valid tersimpan dan perhitungan terkait konsisten. |
| VT-09 | Mitra mencatat check-in dan menyelesaikan kunjungan. | Status serta waktu tindakan tersimpan tanpa menghitung kursi dua kali. |
| VT-10 | Mitra menggunakan sebagian deposit, lalu mencoba melebihi saldo. | Penggunaan sah tercatat dan penggunaan berlebih ditolak. |
| VT-11 | Admin membuat mitra dan menerbitkan listing. | Akun terhubung ke kafe dan listing tampil setelah persyaratan terpenuhi. |
| VT-12 | Admin menonaktifkan listing yang mempunyai reservasi. | Reservasi baru dihentikan; pesanan terdahulu tetap tersimpan. |
| VT-13 | Pengguna atau mitra mencoba membuka data pihak lain. | Akses ditolak tanpa membocorkan data. |
| VT-14 | Pengiriman transaksi diulang akibat klik atau jaringan. | Reservasi, pembayaran, dan penggunaan deposit tidak tercatat ganda. |
| VT-15 | Admin menindaklanjuti laporan. | Catatan dan status tersimpan serta tindakan dapat ditelusuri di log. |

### 6.3 Acceptance Criteria

| Area | Kriteria penerimaan |
|---|---|
| Cakupan fungsional | Seluruh requirement Must Have dan seluruh skenario kritis lulus pengujian. |
| Autentikasi | Login, logout, registrasi, serta pengalihan role menghasilkan akses yang sesuai. |
| Otorisasi | Seluruh percobaan akses lintas pengguna, lintas mitra, dan peningkatan role tanpa kewenangan ditolak. |
| Pencarian | Hasil sesuai kata pencarian dan seluruh filter fasilitas yang dipilih. |
| Reservasi | Tidak terdapat pemesanan yang menyebabkan kapasitas terlampaui, termasuk pada permintaan bersamaan. |
| Pembayaran | Status Dikonfirmasi hanya diberikan setelah hasil pembayaran berhasil tercatat; simulasi diberi label jelas. |
| Deposit | Saldo selalu sesuai riwayat penggunaan, tidak negatif, dan tidak berkurang ganda. |
| Kapasitas | Total alokasi sesuai kapasitas fisik; walk-in berada dalam batasnya; perubahan tidak mengorbankan reservasi yang sudah diterima. |
| Administrasi | Akun mitra dan listing dapat dikelola; penonaktifan tidak menghapus reservasi terdahulu. |
| Keterlacakan | Perubahan role, status akun, listing, kapasitas, dan penggunaan deposit mempunyai pelaku, waktu, serta objek tindakan. |
| Usability Pengguna | Minimal empat dari lima peserta menyelesaikan pencarian hingga reservasi simulasi tanpa bantuan moderator. |
| Pemahaman biaya | Minimal empat dari lima peserta dapat menjelaskan perbedaan deposit untuk menu dan biaya platform. |
| Usability Mitra | Minimal 80% tugas operasional yang diujikan selesai tanpa kesalahan kritis, dengan hasil dilaporkan per tugas dan peserta. |
| Responsivitas | Alur utama berfungsi pada lebar layar 360, 768, dan 1440 piksel tanpa elemen penting terpotong. |
| Aksesibilitas | Alur utama dapat dioperasikan dengan keyboard; label, fokus, dan kontras memenuhi target UX. |
| Pemulihan kegagalan | Kegagalan jaringan tidak menghasilkan pesan sukses palsu, kehilangan isian penting, atau transaksi ganda. |
| Kelayakan rilis | Tidak ada masalah terbuka yang menyebabkan kebocoran data, reservasi berlebih, salah perhitungan deposit, atau terhentinya alur utama. |

## 7. Release Plan

### 7.1 Tahapan Pengembangan Produk

Pengembangan dimulai dari penyelarasan keputusan produk, penyusunan requirement, integrasi flow tiga role, pembuatan prototype, pengujian, perbaikan, lalu persiapan demo. Pilot operasional hanya dilakukan setelah aplikasi fungsional dan mitra memenuhi syarat kesiapan.

Urutan dependensi utama adalah keputusan scope dan aturan reservasi → requirement modul serta data → navigasi dan komponen bersama → prototype terhubung → pengujian dan iterasi → demo atau keputusan pilot. Pengerjaan modul boleh paralel setelah aturan bersama disepakati.

### 7.2 Timeline dan Milestone

Timeline berikut merupakan usulan delapan minggu kerja relatif, bukan tanggal resmi atau klaim progres aktual. Minggu 1 dimulai saat tim menyepakati baseline; tanggal kalender disesuaikan dengan jadwal kelas dan tenggat UAS.

| Tahap | Hasil / syarat selesai |
|---|---|
| Minggu 1 — Baseline | Masalah, scope, role, keputusan reservasi, batas simulasi, dan target awal disepakati. |
| Minggu 2 — Requirement | Requirement modul, aturan bisnis, acceptance criteria dan skenario alternatif siap review silang. |
| Minggu 3 — Flow & wireframe | Navigasi tiga role dan state utama terhubung; kode layar dipetakan ke requirement. |
| Minggu 4 — Prototype discovery | Login/registrasi, katalog, filter, detail, dan ketersediaan dapat ditelusuri. |
| Minggu 5 — Integrasi alur | Reservasi/pembayaran bersyarat, riwayat, dashboard mitra/admin terhubung. |
| Minggu 6 — Validasi putaran 1 | Tugas pengguna/mitra/admin dijalankan; hasil dan masalah diprioritaskan. |
| Minggu 7 — Perbaikan & retest | P0/P1 ditutup, alur terdampak diuji ulang, tampilan responsif diperiksa. |
| Minggu 8 — Demo & keputusan lanjut | Versi demo dibekukan, bukti uji dan keterbatasan tersedia; kesiapan pilot dinilai terpisah. |