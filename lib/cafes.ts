import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { demoCafes } from "@/lib/demo-cafes";
import type { Cafe, FasilitasKey } from "@/lib/cafe-data";

type CafeRow = {
  id: string;
  name: string;
  description: string;
  address: string;
  maps_url: string | null;
  photo_url: string | null;
  updated_at: string;
  cafe_capacity: { total_seats: number; walk_in_occupied: number; updated_at: string } | Array<{ total_seats: number; walk_in_occupied: number; updated_at: string }> | null;
  cafe_operating_hours: Array<{ day_of_week: number; is_closed: boolean; open_time: string; close_time: string }>;
  cafe_facilities: Array<{ facilities: { name: string; icon_key: string; is_active: boolean } | null }>;
};

function currentDayOfWeek() {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", weekday: "short" }).format(new Date());
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
}

function facilityKey(name: string, iconKey: string): FasilitasKey | null {
  const value = `${name} ${iconKey}`.toLocaleLowerCase("id-ID");
  if (value.includes("colok") || value.includes("plug")) return "punya_colokan";
  if (value.includes("mush") || value.includes("musala") || value.includes("moon")) return "punya_mushola";
  if (value.includes("smok") || value.includes("rokok")) return "smoking_area";
  if (value.includes("indoor") || value.includes("dalam") || value.includes("home")) return "indoor";
  if (value.includes("outdoor") || value.includes("luar") || value.includes("leaf")) return "outdoor";
  return null;
}

function mapCafe(row: CafeRow): Cafe {
  const hours = row.cafe_operating_hours.find((item) => item.day_of_week === currentDayOfWeek() && !item.is_closed) ?? row.cafe_operating_hours.find((item) => !item.is_closed);
  const keys = new Set<FasilitasKey>();
  const capacity = Array.isArray(row.cafe_capacity) ? row.cafe_capacity[0] : row.cafe_capacity;
  for (const relation of row.cafe_facilities) {
    const facility = relation.facilities;
    if (facility?.is_active) {
      const key = facilityKey(facility.name, facility.icon_key);
      if (key) keys.add(key);
    }
  }
  return {
    id: row.id,
    nama: row.name,
    alamat: row.address,
    deskripsi: row.description,
    jam_buka: hours?.open_time.slice(0, 5) ?? "-",
    jam_tutup: hours?.close_time.slice(0, 5) ?? "-",
    total_kursi: capacity?.total_seats ?? 0,
    kursi_terpakai: capacity?.walk_in_occupied ?? 0,
    diperbarui_pada: capacity?.updated_at ?? row.updated_at,
    foto_url: row.photo_url || "/images/cafe-interior.svg",
    maps_url: row.maps_url,
    punya_colokan: keys.has("punya_colokan"),
    punya_mushola: keys.has("punya_mushola"),
    smoking_area: keys.has("smoking_area"),
    indoor: keys.has("indoor"),
    outdoor: keys.has("outdoor"),
  };
}

function mapDemoCafe(cafe: (typeof demoCafes)[number]): Cafe {
  return {
    ...cafe,
    total_kursi: cafe.kuota_booking,
    kursi_terpakai: cafe.kursi_terpakai_manual,
    maps_url: null,
  };
}

export async function getPublicCafes() {
  const referenceTime = Date.now();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { cafes: demoCafes.map(mapDemoCafe), isDemo: true, error: null, referenceTime };

  const { data, error } = await supabase.from("cafes").select(`
    id, name, description, address, maps_url, photo_url, updated_at,
    cafe_capacity ( total_seats, walk_in_occupied, updated_at ),
    cafe_operating_hours ( day_of_week, is_closed, open_time, close_time ),
    cafe_facilities ( facilities ( name, icon_key, is_active ) )
  `).eq("listing_status", "active").order("name");

  if (error) {
    console.error("Gagal mengambil listing kafe publik:", error.message);
    return { cafes: [], isDemo: false, error: "Data kafe belum dapat dimuat.", referenceTime };
  }
  return { cafes: (data as unknown as CafeRow[]).map(mapCafe), isDemo: false, error: null, referenceTime };
}
