"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CafeImage } from "@/components/cafe-image";
import { Icon } from "@/components/icon";
import { filterCafeListings } from "@/lib/cafe-search-filter";
import { sortCafeListings, type CafeSortOption } from "@/lib/cafe-search-sort";
import {
  type CafeFilterOption,
  type CafeListing,
} from "@/lib/cafe-search-data";

type PageState = "loading" | "ready" | "not-configured" | "error";

export function CafeSearchPage({
  cafes,
  filterOptions,
  state = "ready",
  isDemo = false,
  defaultVisitDate = "",
}: {
  cafes: CafeListing[];
  filterOptions: CafeFilterOption[];
  state?: PageState;
  isDemo?: boolean;
  defaultVisitDate?: string;
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<CafeSortOption>("recommended");
  const [visitDate, setVisitDate] = useState(defaultVisitDate);
  const [partySize, setPartySize] = useState("2");
  const results = useMemo(() => sortCafeListings(filterCafeListings(cafes, submittedQuery, selected), sortBy), [cafes, submittedQuery, selected, sortBy]);

  function toggleFacility(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function reset() { setQuery(""); setSubmittedQuery(""); setSelected([]); setSortBy("recommended"); }

  return <>
    <main className="explore-page">
      <div className="shell">
        <header className="explore-intro">
          <h1>Cari tempat nugas, tanpa muter-muter.</h1>
          <p>Pilih kafe yang pas buat fokus, diskusi, atau sekadar santai.</p>
        </header>

        <form className="explore-search" role="search" onSubmit={(event) => { event.preventDefault(); setSubmittedQuery(query); }}>
          <Icon name="cup" className="explore-search-icon" />
          <div className="explore-search-field explore-query-field"><label htmlFor="explore-query">Cari nama kafe atau lokasi</label><input id="explore-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Misalnya, Jatinangor" /></div>
          <div className="explore-search-field"><label htmlFor="explore-date">Tanggal kunjungan</label><input id="explore-date" type="date" min={visitDate || undefined} value={visitDate} onChange={(event) => setVisitDate(event.target.value)} /></div>
          <div className="explore-search-field"><label htmlFor="explore-party">Jumlah orang</label><select id="explore-party" value={partySize} onChange={(event) => setPartySize(event.target.value)}>{Array.from({ length: 8 }, (_, index) => <option key={index + 1} value={String(index + 1)}>{index + 1} orang</option>)}</select></div>
          <button className="button explore-submit" type="submit" disabled={state !== "ready"}><Icon name="search" width={17} height={17} />Cari Tempat</button>
        </form>
        <p className="explore-demo-note"><Icon name="info" width={15} height={15} />{isDemo ? "Data simulasi untuk pengembangan dan uji tampilan; bukan listing aktual." : "Menampilkan informasi listing aktif dari Tempat.In."}</p>

        <div className="explore-layout">
          <aside className="explore-filters" aria-label="Filter tempat">
            <div className="explore-filter-heading"><h2>Filter tempat</h2><button type="button" onClick={reset}>Reset</button></div>
            <fieldset disabled={state !== "ready"}>
              <legend>Fasilitas</legend>
              {filterOptions.map(({ id, key, label }) => <label className="explore-check" key={key}>
                <input type="checkbox" checked={selected.includes(id)} onChange={() => toggleFacility(id)} />
                <span>{label}</span>
              </label>)}
            </fieldset>
            <div className="explore-filter-tip"><strong>Yang kamu cari</strong><p>Semua fasilitas terpilih harus tersedia di kafe.</p><div><b>Biar nggak salah ekspektasi</b><span>Ketersediaan kursi mengikuti pembaruan mitra.</span></div></div>
          </aside>

          <section className="explore-results" aria-labelledby="explore-results-title">
            <div className="explore-results-heading"><div><h2 id="explore-results-title">{state === "ready" ? results.length + " tempat buat rencanamu" : state === "loading" ? "Memuat tempat..." : "Tempat belum dapat ditampilkan"}</h2><p>{isDemo ? "Data kafe simulasi di Jatinangor." : "Hasil pencarian di Jatinangor."}</p></div><label className="explore-sort">Urutkan: <select aria-label="Urutkan tempat" value={sortBy} onChange={(event) => setSortBy(event.target.value as CafeSortOption)} disabled={state !== "ready"}><option value="recommended">Rekomendasi</option><option value="name">Nama A–Z</option><option value="seats">Kursi tersedia terbanyak</option><option value="updated">Pembaruan terbaru</option></select></label></div>
            {state === "loading" ? <div className="explore-empty" role="status">Memuat daftar kafe...</div>
              : state === "not-configured" ? <div className="explore-empty" role="status"><Icon name="info" width={28} height={28} /><h3>Koneksi data belum disiapkan.</h3><p>Data kafe Supabase belum dapat dimuat saat ini.</p></div>
                : state === "error" ? <div className="explore-empty" role="alert"><Icon name="info" width={28} height={28} /><h3>Daftar kafe belum dapat dimuat.</h3><p>Coba muat ulang halaman beberapa saat lagi.</p><button type="button" className="button button-primary" onClick={() => window.location.reload()}>Muat ulang</button></div>
                  : results.length ? <div className="explore-cards" aria-live="polite">{results.map((cafe) => <CafeSearchCard key={cafe.id} cafe={cafe} isDemo={isDemo} />)}</div>
                    : <div className="explore-empty"><Icon name="search" width={30} height={30} /><h3>{cafes.length ? "Belum ada kafe yang cocok." : "Belum ada listing kafe aktif."}</h3><p>{cafes.length ? "Coba kata kunci atau fasilitas lain." : "Kafe aktif akan tampil di sini."}</p>{(submittedQuery || selected.length > 0) && <button type="button" className="button button-primary" onClick={reset}>Reset pencarian</button>}</div>}
          </section>
        </div>
      </div>
    </main>
    <footer className="explore-footer"><div className="shell"><span>Tempat.In · Informasi kafe</span><Link href="/">Find. Book. Chill.</Link></div></footer>
  </>;
}

function CafeSearchCard({ cafe, isDemo }: { cafe: CafeListing; isDemo: boolean }) {
  const availability = cafe.capacity ? Math.max(0, cafe.capacity.walkInQuota - cafe.capacity.walkInOccupied) : null;
  const updatedAt = cafe.capacity?.updatedAt ?? cafe.updatedAt;
  const updateIsStale = cafe.capacity?.isStale ?? false;
  const visibleFacilities = [...cafe.facilities]
    .sort((a, b) => {
      const rank = ["Wi-Fi", "Colokan", "Mushola", "Smoking area", "Indoor", "Outdoor"];
      const aRank = rank.indexOf(displayFacilityName(a.name));
      const bRank = rank.indexOf(displayFacilityName(b.name));
      return (aRank < 0 ? rank.length : aRank) - (bRank < 0 ? rank.length : bRank);
    })
    .slice(0, 3);

  return <article className="cafe-card">
    <div className="cafe-card-image-wrap"><CafeImage src={cafe.photoUrl || "/images/cafe-interior.svg"} name={cafe.name} placeholder={isDemo || !cafe.photoUrl} />{cafe.isOpen !== undefined && <span className={`cafe-open-badge ${cafe.isOpen ? "is-open" : "is-closed"}`}>{cafe.isOpen ? "Buka" : "Tutup"}</span>}</div>
    <div className="cafe-card-content">
      <div><h3 className="cafe-card-title">{cafe.name}</h3><p className="cafe-card-location"><Icon name="pin" className="shrink-0" width={14} height={14} />{cafe.address}</p></div>
      <ul className="cafe-facilities flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted" aria-label="Fasilitas">
        {visibleFacilities.map((facility) => <li className="flex items-center gap-1.5" key={facility.id}>{displayFacilityName(facility.name)}</li>)}
      </ul>
      <div className="cafe-card-status">
        <p className="flex items-center gap-2 text-sm font-semibold text-forest"><Icon name="chair" />{availability === null ? "Informasi kursi belum tersedia" : availability + " kursi walk-in kosong"}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted"><Icon name="clock" width={14} height={14} />Diperbarui <time dateTime={updatedAt}>{formatRelativeUpdate(updatedAt)}</time></p>
        {updateIsStale && <p className="stale-note">Lebih dari 24 jam. Informasi kursi mungkin berubah.</p>}
      </div>
      <Link href={"/kafe/" + encodeURIComponent(cafe.id)} className="button cafe-detail-button" aria-label={"Lihat detail " + cafe.name}>Lihat detail <Icon name="arrow" width={16} height={16} /></Link>
    </div>
  </article>;
}

function formatRelativeUpdate(value: string) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return "waktu tidak tersedia";
  const minutes = Math.floor((Date.now() - timestamp) / 60_000);
  const formatter = new Intl.RelativeTimeFormat("id-ID", { numeric: "auto" });
  if (Math.abs(minutes) < 60) return formatter.format(-minutes, "minute");
  const hours = Math.floor(minutes / 60);
  if (Math.abs(hours) < 24) return formatter.format(-hours, "hour");
  return formatter.format(-Math.floor(hours / 24), "day");
}

function displayFacilityName(name: string) {
  const normalized = name.trim().toLocaleLowerCase("id-ID");
  if (["wi-fi", "wifi"].includes(normalized)) return "Wi-Fi";
  if (["stop kontak", "colokan"].includes(normalized)) return "Colokan";
  if (["musholla", "mushola", "musala"].includes(normalized)) return "Mushola";
  if (normalized === "tempat duduk indoor") return "Indoor";
  if (normalized === "tempat duduk outdoor") return "Outdoor";
  return name;
}
