export const fasilitas = [
  { key: "punya_colokan", label: "Colokan", icon: "plug" },
  { key: "punya_mushola", label: "Mushola", icon: "moon" },
  { key: "smoking_area", label: "Smoking Area", icon: "smoke" },
  { key: "indoor", label: "Indoor", icon: "home" },
  { key: "outdoor", label: "Outdoor", icon: "leaf" },
] as const;

export type FasilitasKey = (typeof fasilitas)[number]["key"];
export type Cafe = Record<FasilitasKey, boolean> & {
  id: string;
  nama: string;
  alamat: string;
  deskripsi: string;
  jam_buka: string;
  jam_tutup: string;
  kuota_booking: number;
  kursi_terpakai_manual: number;
  diperbarui_pada: string;
  foto_url: string;
};

// Waktu simulasi tetap: tidak mengikuti jam perangkat atau berubah acak.
export const WAKTU_DEMO = "2026-10-30T07:00:00Z";
export const LABEL_WAKTU_DEMO = "30 Oktober 2026, 14.00 WIB";

export const demoCafes: Cafe[] = [
  { id: "ruang-sela", nama: "Ruang Sela", alamat: "Area Hegarmanah, Jatinangor (alamat demo)", deskripsi: "Sudut tenang dengan meja kayu panjang dan cahaya jendela. Tempat imajiner untuk menyelesaikan tugas, satu halaman demi satu halaman.", jam_buka: "08:00", jam_tutup: "22:00", punya_colokan: true, punya_mushola: true, smoking_area: false, indoor: true, outdoor: true, kuota_booking: 20, kursi_terpakai_manual: 8, diperbarui_pada: "2026-10-30T06:45:00Z", foto_url: "/images/cafe-interior.svg" },
  { id: "teras-aksara", nama: "Teras Aksara", alamat: "Area Cikeruh, Jatinangor (alamat demo)", deskripsi: "Teras terbuka bernuansa hijau untuk bertukar ide bersama teman. Seluruh informasi kafe ini adalah contoh fiktif.", jam_buka: "09:00", jam_tutup: "23:00", punya_colokan: true, punya_mushola: false, smoking_area: true, indoor: false, outdoor: true, kuota_booking: 16, kursi_terpakai_manual: 10, diperbarui_pada: "2026-10-30T05:00:00Z", foto_url: "/images/cafe-garden.svg" },
  { id: "titik-temu", nama: "Titik Temu Kopi", alamat: "Area Sayang, Jatinangor (alamat demo)", deskripsi: "Ruang diskusi imajiner yang hangat untuk tugas kelompok. Contoh kondisi penuh membantu kamu memahami informasi kursi pada demo.", jam_buka: "08:00", jam_tutup: "21:00", punya_colokan: true, punya_mushola: true, smoking_area: false, indoor: true, outdoor: false, kuota_booking: 12, kursi_terpakai_manual: 12, diperbarui_pada: "2026-10-30T06:30:00Z", foto_url: "/images/cafe-interior.svg" },
  { id: "halaman-sore", nama: "Halaman Sore", alamat: "Area Cibeusi, Jatinangor (alamat demo)", deskripsi: "Bayangkan halaman teduh untuk membaca dan mencari inspirasi. Informasi kursi contoh ini sudah lama diperbarui dan mungkin tidak akurat.", jam_buka: "10:00", jam_tutup: "22:00", punya_colokan: false, punya_mushola: true, smoking_area: true, indoor: false, outdoor: true, kuota_booking: 18, kursi_terpakai_manual: 10, diperbarui_pada: "2026-10-28T06:00:00Z", foto_url: "/images/cafe-garden.svg" },
  { id: "meja-kedua", nama: "Meja Kedua", alamat: "Area Cipacing, Jatinangor (alamat demo)", deskripsi: "Kafe fiktif dengan sudut belajar sendiri dan meja bersama. Pilih suasana dalam ruangan atau teras sesuai kebutuhanmu.", jam_buka: "07:00", jam_tutup: "22:00", punya_colokan: true, punya_mushola: false, smoking_area: true, indoor: true, outdoor: true, kuota_booking: 24, kursi_terpakai_manual: 20, diperbarui_pada: "2026-10-30T04:00:00Z", foto_url: "/images/cafe-interior.svg" },
  { id: "pelan-pelan", nama: "Pelan-Pelan", alamat: "Area Cileles, Jatinangor (alamat demo)", deskripsi: "Ruang imajiner yang sederhana untuk membaca dan menyusun ide tanpa terburu-buru. Bukan kafe atau mitra sungguhan.", jam_buka: "09:00", jam_tutup: "20:00", punya_colokan: false, punya_mushola: false, smoking_area: false, indoor: true, outdoor: false, kuota_booking: 10, kursi_terpakai_manual: 3, diperbarui_pada: "2026-10-30T06:00:00Z", foto_url: "/images/cafe-interior.svg" },
];

export function filterCafes(cafes: Cafe[], query: string, selected: FasilitasKey[]) {
  return cafes.filter((cafe) => cafe.nama.toLocaleLowerCase("id-ID").includes(query.trim().toLocaleLowerCase("id-ID")) && selected.every((key) => cafe[key]));
}

export function statusCafe(cafe: Cafe) {
  const minutes = Math.max(0, Math.floor((Date.parse(WAKTU_DEMO) - Date.parse(cafe.diperbarui_pada)) / 60000));
  return {
    // Demo ini tidak memiliki reservasi. Pada integrasi nanti, hitung ulang di server sesuai B2 PRD.
    tersisa: Math.max(0, cafe.kuota_booking - cafe.kursi_terpakai_manual),
    usang: minutes > 24 * 60,
    relatif: minutes < 60 ? `${minutes} menit lalu` : minutes < 1440 ? `${Math.floor(minutes / 60)} jam lalu` : `${Math.floor(minutes / 1440)} hari lalu`,
  };
}
