import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/config";

export type CafeFacility = {
  id: string;
  name: string;
  iconKey: string;
};

export type CafeOperatingHour = {
  dayOfWeek: number;
  isClosed: boolean;
  openTime: string;
  closeTime: string;
};

export type CafeCapacity = {
  totalSeats: number;
  reservationQuota: number;
  walkInQuota: number;
  walkInOccupied: number;
  updatedAt: string;
  isStale: boolean;
};

export type CafeListing = {
  id: string;
  name: string;
  description: string;
  address: string;
  mapsUrl: string | null;
  photoUrl: string | null;
  updatedAt: string;
  facilities: CafeFacility[];
  operatingHours: CafeOperatingHour[];
  capacity: CafeCapacity | null;
  /** Available for demo listings where opening status is explicitly simulated. */
  isOpen?: boolean;
};

export type CafeFilterOption = {
  id: string;
  key: string;
  label: string;
};

export type CafeQueryResult<T> =
  | { status: "ok"; data: T }
  | { status: "not-configured" | "error" };

type CafeRow = {
  id: string;
  name: string;
  description: string;
  address: string;
  maps_url: string | null;
  photo_url: string | null;
  listing_status: string;
  updated_at: string;
};

type FacilityRow = { id: string; name: string; icon_key: string };
type CafeFacilityRow = { cafe_id: string; facility_id: string };
type OperatingHourRow = {
  cafe_id: string;
  day_of_week: number;
  is_closed: boolean;
  open_time: string;
  close_time: string;
};
type CapacityRow = {
  cafe_id: string;
  total_seats: number;
  reservation_quota: number;
  walk_in_quota: number;
  walk_in_occupied: number;
  updated_at: string;
};

const filterDefinitions = [
  { key: "wifi", label: "Wi-Fi", names: ["wi-fi", "wifi"] },
  { key: "colokan", label: "Colokan", names: ["stop kontak", "colokan"] },
  { key: "mushola", label: "Mushola", names: ["musholla", "mushola", "musala"] },
  { key: "smoking-area", label: "Smoking area", names: ["smoking area", "area merokok"] },
  { key: "indoor", label: "Indoor", names: ["tempat duduk indoor", "indoor"] },
  { key: "outdoor", label: "Outdoor", names: ["tempat duduk outdoor", "outdoor"] },
] as const;

type TableDefinition<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

type PublicDatabase = {
  public: {
    Tables: {
      cafes: TableDefinition<CafeRow>;
      facilities: TableDefinition<FacilityRow & { is_active: boolean }>;
      cafe_facilities: TableDefinition<CafeFacilityRow>;
      cafe_operating_hours: TableDefinition<OperatingHourRow>;
      cafe_capacity: TableDefinition<CapacityRow>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type PublicSupabaseClient = ReturnType<typeof createClient<PublicDatabase, "public">>;

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("id-ID");
}

function createPublicClient(): PublicSupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config) return null;

  return createClient<PublicDatabase, "public">(config.url, config.publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}

function makeFilterOptions(facilities: CafeFacility[]): CafeFilterOption[] {
  return filterDefinitions.flatMap(({ key, label, names }) => {
    const match = facilities.find((facility) => (names as readonly string[]).includes(normalize(facility.name)));
    return match ? [{ id: match.id, key, label }] : [];
  });
}

async function loadRelatedData(client: PublicSupabaseClient, cafes: CafeRow[]) {
  const ids = cafes.map(({ id }) => id);
  if (!ids.length) return { cafes: [], filterOptions: makeFilterOptions([]) };

  const [facilityResult, linkResult, hourResult, capacityResult] = await Promise.all([
    client.from("facilities").select("id,name,icon_key").eq("is_active", true),
    client.from("cafe_facilities").select("cafe_id,facility_id").in("cafe_id", ids),
    client.from("cafe_operating_hours").select("cafe_id,day_of_week,is_closed,open_time,close_time").in("cafe_id", ids),
    client.from("cafe_capacity").select("cafe_id,total_seats,reservation_quota,walk_in_quota,walk_in_occupied,updated_at").in("cafe_id", ids),
  ]);

  if (facilityResult.error || linkResult.error || hourResult.error || capacityResult.error) {
    throw new Error("Gagal mengambil informasi fasilitas, jam operasional, atau kapasitas kafe.");
  }

  const facilities = (facilityResult.data ?? []) as FacilityRow[];
  const links = (linkResult.data ?? []) as CafeFacilityRow[];
  const hours = (hourResult.data ?? []) as OperatingHourRow[];
  const capacities = (capacityResult.data ?? []) as CapacityRow[];
  const facilityById = new Map(facilities.map((facility) => [facility.id, facility]));
  const linksByCafe = new Map<string, CafeFacility[]>();
  for (const link of links) {
    const facility = facilityById.get(link.facility_id);
    if (!facility) continue;
    const entries = linksByCafe.get(link.cafe_id) ?? [];
    entries.push({ id: facility.id, name: facility.name, iconKey: facility.icon_key });
    linksByCafe.set(link.cafe_id, entries);
  }

  const hoursByCafe = new Map<string, CafeOperatingHour[]>();
  for (const hour of hours) {
    const entries = hoursByCafe.get(hour.cafe_id) ?? [];
    entries.push({
      dayOfWeek: Number(hour.day_of_week),
      isClosed: hour.is_closed,
      openTime: hour.open_time,
      closeTime: hour.close_time,
    });
    hoursByCafe.set(hour.cafe_id, entries);
  }

  const capacityByCafe = new Map(capacities.map((capacity) => [capacity.cafe_id, capacity]));
  return {
    cafes: cafes.map((cafe) => {
      const capacity = capacityByCafe.get(cafe.id);
      return {
        id: cafe.id,
        name: cafe.name,
        description: cafe.description,
        address: cafe.address,
        mapsUrl: cafe.maps_url,
        photoUrl: cafe.photo_url?.trim() || null,
        updatedAt: cafe.updated_at,
        facilities: linksByCafe.get(cafe.id) ?? [],
        operatingHours: (hoursByCafe.get(cafe.id) ?? []).sort((a, b) => a.dayOfWeek - b.dayOfWeek),
        capacity: capacity ? {
          totalSeats: capacity.total_seats,
          reservationQuota: capacity.reservation_quota,
          walkInQuota: capacity.walk_in_quota,
          walkInOccupied: capacity.walk_in_occupied,
          updatedAt: capacity.updated_at,
          isStale: Number.isFinite(Date.parse(capacity.updated_at)) &&
            Date.now() - Date.parse(capacity.updated_at) > 24 * 60 * 60 * 1000,
        } : null,
      } satisfies CafeListing;
    }),
    filterOptions: makeFilterOptions(facilities.map((facility) => ({
      id: facility.id,
      name: facility.name,
      iconKey: facility.icon_key,
    }))),
  };
}

export async function getActiveCafeListings(): Promise<CafeQueryResult<{
  cafes: CafeListing[];
  filterOptions: CafeFilterOption[];
}>> {
  try {
    const client = createPublicClient();
    if (!client) return { status: "not-configured" };

    const { data, error } = await client
      .from("cafes")
      .select("id,name,description,address,maps_url,photo_url,updated_at")
      .eq("listing_status", "active")
      .order("name");
    if (error) return { status: "error" };
    return { status: "ok", data: await loadRelatedData(client, (data ?? []) as CafeRow[]) };
  } catch {
    return { status: "error" };
  }
}

export async function getActiveCafeById(id: string): Promise<CafeQueryResult<CafeListing | null>> {
  try {
    const client = createPublicClient();
    if (!client) return { status: "not-configured" };

    const { data, error } = await client
      .from("cafes")
      .select("id,name,description,address,maps_url,photo_url,updated_at")
      .eq("id", id)
      .eq("listing_status", "active")
      .maybeSingle();
    if (error) return { status: "error" };
    if (!data) return { status: "ok", data: null };
    const related = await loadRelatedData(client, [data as CafeRow]);
    return { status: "ok", data: related.cafes[0] ?? null };
  } catch {
    return { status: "error" };
  }
}

export function displayFacilityName(name: string) {
  const normalized = normalize(name);
  if (["wi-fi", "wifi"].includes(normalized)) return "Wi-Fi";
  if (["stop kontak", "colokan"].includes(normalized)) return "Colokan";
  if (["musholla", "mushola", "musala"].includes(normalized)) return "Mushola";
  if (normalized === "tempat duduk indoor") return "Indoor";
  if (normalized === "tempat duduk outdoor") return "Outdoor";
  return name;
}

export function getWalkInAvailability(cafe: CafeListing) {
  if (!cafe.capacity) return null;
  return Math.max(0, cafe.capacity.walkInQuota - cafe.capacity.walkInOccupied);
}

export function formatTime(value: string) {
  return value.slice(0, 5).replace(":", ".");
}
