import type { CafeListing } from "@/lib/cafe-search-data";

export type CafeSortOption = "recommended" | "name" | "seats" | "updated";

export function sortCafeListings(cafes: CafeListing[], option: CafeSortOption): CafeListing[] {
  const sorted = [...cafes];
  const availability = (cafe: CafeListing) => cafe.capacity
    ? Math.max(0, cafe.capacity.walkInQuota - cafe.capacity.walkInOccupied)
    : -1;
  const updatedAt = (cafe: CafeListing) => {
    const parsed = Date.parse(cafe.capacity?.updatedAt ?? cafe.updatedAt);
    return Number.isFinite(parsed) ? parsed : 0;
  };
  switch (option) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "id-ID"));
    case "seats":
      return sorted.sort((a, b) => availability(b) - availability(a));
    case "updated":
      return sorted.sort((a, b) => updatedAt(b) - updatedAt(a));
    default:
      return sorted;
  }
}
