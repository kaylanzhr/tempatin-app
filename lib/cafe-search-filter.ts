import type { CafeListing } from "@/lib/cafe-search-data";

export function filterCafeListings(
  cafes: CafeListing[],
  query: string,
  selectedFacilityIds: string[],
) {
  const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
  return cafes.filter((cafe) =>
    (!normalizedQuery ||
      cafe.name.toLocaleLowerCase("id-ID").includes(normalizedQuery) ||
      cafe.address.toLocaleLowerCase("id-ID").includes(normalizedQuery)) &&
    selectedFacilityIds.every((facilityId) =>
      cafe.facilities.some((facility) => facility.id === facilityId),
    ),
  );
}
