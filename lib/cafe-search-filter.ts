import type { CafeListing } from "@/lib/cafe-search-data";

export function filterCafeListings(
  cafes: CafeListing[],
  query: string,
  selectedFacilityKeys: string[],
) {
  const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
  return cafes.filter((cafe) =>
    (!normalizedQuery ||
      cafe.name.toLocaleLowerCase("id-ID").includes(normalizedQuery) ||
      cafe.address.toLocaleLowerCase("id-ID").includes(normalizedQuery)) &&
    selectedFacilityKeys.every((facilityKey) =>
      cafe.facilities.some((facility) => getCafeFacilityKey(facility.name) === facilityKey),
    ),
  );
}

export function getCafeFacilityKey(name: string) {
  const normalized = name.trim().toLocaleLowerCase("id-ID")
    .replace(/[‐‑‒–—-]/g, " ")
    .replace(/[_\s]+/g, " ");

  if (["wi fi", "wifi"].includes(normalized)) return "wifi";
  if (["stop kontak", "colokan"].includes(normalized)) return "colokan";
  if (["musholla", "mushola", "musala"].includes(normalized)) return "mushola";
  if (["smoking area", "area merokok"].includes(normalized)) return "smoking-area";
  if (["tempat duduk indoor", "indoor"].includes(normalized)) return "indoor";
  if (["tempat duduk outdoor", "outdoor"].includes(normalized)) return "outdoor";
  return null;
}
