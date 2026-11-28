import assert from "node:assert/strict";
import test from "node:test";
import { filterCafeListings } from "../lib/cafe-search-filter.ts";
import { sortCafeListings } from "../lib/cafe-search-sort.ts";
import { demoPlaceFilterOptions, getDemoPlaceListings } from "../lib/demo-place-search.ts";

const cafes = [
  { name: "Kafe Nusa", address: "Jl. Raya Jatinangor", facilities: [{ id: "wifi-master-1", name: "Wi-Fi" }, { id: "plug-master", name: "Stop Kontak" }] },
  { name: "Ruang Teduh", address: "Ciseke, Jatinangor", facilities: [{ id: "wifi-master-2", name: "WiFi" }] },
  { name: "Sudut Sore", address: "Caringin", facilities: [{ id: "plug-master", name: "Colokan" }] },
];

test("mencari nama kafe tanpa membedakan huruf besar kecil", () => {
  assert.deepEqual(filterCafeListings(cafes, "kAfE nUsA", []).map((cafe) => cafe.name), ["Kafe Nusa"]);
});

test("mencari lokasi", () => {
  assert.deepEqual(filterCafeListings(cafes, "Jatinangor", []).map((cafe) => cafe.name), ["Kafe Nusa", "Ruang Teduh"]);
});

test("menggabungkan beberapa fasilitas dengan aturan semua harus tersedia", () => {
  assert.deepEqual(filterCafeListings(cafes, "", ["wifi", "colokan"]).map((cafe) => cafe.name), ["Kafe Nusa"]);
});

test("mencocokkan alias fasilitas walau ID master fasilitas berbeda", () => {
  const cafeWithDifferentIds = [{
    name: "Kopi Setia",
    address: "Sayang, Jatinangor",
    facilities: [
      { id: "wifi-alias", name: "WiFi" },
      { id: "musala-alias", name: "Musala" },
      { id: "outdoor-alias", name: "Tempat Duduk Outdoor" },
    ],
  }];
  assert.deepEqual(
    filterCafeListings(cafeWithDifferentIds, "", ["wifi", "mushola", "outdoor"]).map((cafe) => cafe.name),
    ["Kopi Setia"],
  );
});

test("mengembalikan hasil kosong saat tidak ada kecocokan", () => {
  assert.deepEqual(filterCafeListings(cafes, "tidak ada", []), []);
});

test("mengurutkan nama dan kursi tersedia", () => {
  assert.deepEqual(sortCafeListings(cafes, "name").map((cafe) => cafe.name), ["Kafe Nusa", "Ruang Teduh", "Sudut Sore"]);
  const withCapacity = [
    { name: "Sedikit", address: "A", updatedAt: "2026-11-25T00:00:00Z", facilities: [], capacity: { walkInQuota: 5, walkInOccupied: 4 } },
    { name: "Banyak", address: "B", updatedAt: "2026-11-25T00:00:00Z", facilities: [], capacity: { walkInQuota: 8, walkInOccupied: 1 } },
  ];
  assert.deepEqual(sortCafeListings(withCapacity, "seats").map((cafe) => cafe.name), ["Banyak", "Sedikit"]);
});

test("data simulasi menyediakan seluruh filter dengan status, foto, kursi, dan waktu pembaruan", () => {
  const { cafes: demoCafes, filterOptions } = getDemoPlaceListings();
  assert.equal(demoPlaceFilterOptions.length, 6);
  assert.equal(filterOptions.length, 6);
  assert.equal(demoCafes.length, 6);
  assert.ok(demoCafes.every((cafe) => cafe.photoUrl && cafe.capacity && cafe.updatedAt && typeof cafe.isOpen === "boolean"));
});

test("data kafe tetap muncul untuk dua atau lebih fasilitas yang cocok", () => {
  const { cafes: demoCafes } = getDemoPlaceListings();
  assert.deepEqual(
    filterCafeListings(demoCafes, "", ["wifi", "mushola"]).map((cafe) => cafe.name),
    ["Kopi Halaman", "Titik Temu"],
  );
  assert.deepEqual(
    filterCafeListings(demoCafes, "", ["wifi", "colokan", "indoor"]).map((cafe) => cafe.name),
    ["Kafe Nusa", "Ruang Teduh", "Kopi Halaman", "Titik Temu", "Sela Kopi"],
  );
});
