import type { CafeFilterOption, CafeListing } from "@/lib/cafe-search-data";

export const demoPlaceFilterOptions: CafeFilterOption[] = [
  { id: "demo-wifi", key: "wifi", label: "Wi-Fi" },
  { id: "demo-colokan", key: "colokan", label: "Colokan" },
  { id: "demo-mushola", key: "mushola", label: "Musala" },
  { id: "demo-smoking-area", key: "smoking-area", label: "Smoking area" },
  { id: "demo-indoor", key: "indoor", label: "Indoor" },
  { id: "demo-outdoor", key: "outdoor", label: "Outdoor" },
];

const facility = Object.fromEntries(
  demoPlaceFilterOptions.map((option) => [option.key, { id: option.id, name: option.label, iconKey: option.key }]),
) as Record<string, { id: string; name: string; iconKey: string }>;

function makeCafe(
  id: string,
  name: string,
  address: string,
  image: string,
  facilityKeys: string[],
  seats: number,
  isOpen: boolean,
  updatedMinutesAgo: number,
): CafeListing {
  const updatedAt = new Date(Date.now() - updatedMinutesAgo * 60_000).toISOString();
  return {
    id,
    name,
    description: `Informasi simulasi untuk ${name}.`,
    address,
    mapsUrl: null,
    photoUrl: image,
    updatedAt,
    isOpen,
    facilities: facilityKeys.map((key) => facility[key]),
    operatingHours: Array.from({ length: 7 }, (_, index) => ({
      dayOfWeek: index + 1,
      isClosed: false,
      openTime: "08:00",
      closeTime: "22:00",
    })),
    capacity: {
      totalSeats: 30,
      reservationQuota: 16,
      walkInQuota: 14,
      walkInOccupied: 14 - seats,
      updatedAt,
      isStale: false,
    },
  };
}

export function getDemoPlaceListings(): { cafes: CafeListing[]; filterOptions: CafeFilterOption[] } {
  return {
    filterOptions: demoPlaceFilterOptions,
    cafes: [
      makeCafe("demo-kafe-nusa", "Kafe Nusa", "Jl. Raya Jatinangor", "/images/cafe-interior.svg", ["wifi", "colokan", "indoor"], 6, true, 5),
      makeCafe("demo-ruang-teduh", "Ruang Teduh", "Ciseke, Jatinangor", "/images/cafe-garden.svg", ["wifi", "colokan", "indoor", "outdoor"], 4, true, 8),
      makeCafe("demo-sudut-sore", "Sudut Sore", "Caringin, Jatinangor", "/images/cafe-interior.svg", ["wifi", "colokan", "smoking-area", "outdoor"], 2, false, 12),
      makeCafe("demo-kopi-halaman", "Kopi Halaman", "Cikeruh, Jatinangor", "/images/cafe-garden.svg", ["wifi", "colokan", "mushola", "indoor"], 8, true, 3),
      makeCafe("demo-titik-temu", "Titik Temu", "Sayang, Jatinangor", "/images/cafe-interior.svg", ["wifi", "colokan", "mushola", "indoor", "outdoor"], 3, true, 16),
      makeCafe("demo-sela-kopi", "Sela Kopi", "Hegarmanah, Jatinangor", "/images/cafe-garden.svg", ["wifi", "colokan", "smoking-area", "indoor"], 5, false, 22),
    ],
  };
}
