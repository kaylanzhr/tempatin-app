import type { IconName } from "@/components/icon";

export const fasilitas = [
  { key: "punya_colokan", label: "Colokan", icon: "plug" },
  { key: "punya_mushola", label: "Mushola", icon: "moon" },
  { key: "smoking_area", label: "Smoking Area", icon: "smoke" },
  { key: "indoor", label: "Indoor", icon: "home" },
  { key: "outdoor", label: "Outdoor", icon: "leaf" },
] as const satisfies ReadonlyArray<{ key: string; label: string; icon: IconName }>;

export type FasilitasKey = (typeof fasilitas)[number]["key"];

export type Cafe = Record<FasilitasKey, boolean> & {
  id: string;
  nama: string;
  alamat: string;
  deskripsi: string;
  jam_buka: string;
  jam_tutup: string;
  total_kursi: number;
  kursi_terpakai: number;
  diperbarui_pada: string;
  foto_url: string;
  maps_url: string | null;
};

export function filterCafes(cafes: Cafe[], query: string, selected: FasilitasKey[]) {
  const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
  return cafes.filter(
    (cafe) =>
      `${cafe.nama} ${cafe.alamat}`.toLocaleLowerCase("id-ID").includes(normalizedQuery) &&
      selected.every((key) => cafe[key]),
  );
}

export function statusCafe(cafe: Cafe, referenceTime: number) {
  const minutes = Math.max(0, Math.floor((referenceTime - Date.parse(cafe.diperbarui_pada)) / 60000));
  return {
    tersisa: Math.max(0, cafe.total_kursi - cafe.kursi_terpakai),
    usang: minutes > 24 * 60,
    relatif: minutes < 1 ? "baru saja" : minutes < 60 ? `${minutes} menit lalu` : minutes < 1440 ? `${Math.floor(minutes / 60)} jam lalu` : `${Math.floor(minutes / 1440)} hari lalu`,
  };
}
