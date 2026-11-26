import { Suspense } from "react";
import { io } from "next/cache";
import { Navbar } from "@/components/navbar";
import { CafeSearchPage } from "@/components/cafe-search-page";
import { getActiveCafeListings } from "@/lib/cafe-search-data";
import { getDemoPlaceListings } from "@/lib/demo-place-search";

export const metadata = {
  title: "Jelajah Tempat | Tempat.In",
  description: "Cari kafe di Jatinangor berdasarkan nama, lokasi, dan fasilitas.",
};

async function CafeSearchResults() {
  await io();
  const defaultVisitDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Jakarta" }).format(new Date());
  const result = await getActiveCafeListings();
  if (result.status === "ok") {
    return <CafeSearchPage cafes={result.data.cafes} filterOptions={result.data.filterOptions} defaultVisitDate={defaultVisitDate} />;
  }
  if (process.env.NODE_ENV === "development") {
    const demo = getDemoPlaceListings();
    return <CafeSearchPage cafes={demo.cafes} filterOptions={demo.filterOptions} defaultVisitDate={defaultVisitDate} isDemo />;
  }
  return <CafeSearchPage cafes={[]} filterOptions={[]} defaultVisitDate={defaultVisitDate} state={result.status} />;
}

export default function JelajahTempat() {
  return <><a className="skip-link" href="#konten">Lewati ke konten utama</a><Navbar /><div id="konten"><Suspense fallback={<CafeSearchPage cafes={[]} filterOptions={[]} state="loading" />}><CafeSearchResults /></Suspense></div></>;
}
