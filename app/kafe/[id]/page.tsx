import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { io } from "next/cache";
import { Navbar } from "@/components/navbar";
import { CafeImage } from "@/components/cafe-image";
import { Icon } from "@/components/icon";
import { getActiveCafeById, type CafeListing } from "@/lib/cafe-search-data";
import { formatTime } from "@/lib/cafe-search-data";

const namaHari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

function DetailLoading() {
  return <main className="shell cafe-detail-page"><div className="explore-empty" role="status">Memuat informasi kafe...</div></main>;
}

async function CafeDetailContent({ params }: Pick<PageProps<"/kafe/[id]">, "params">) {
  await io();
  const { id } = await params;
  const result = await getActiveCafeById(id);

  if (result.status !== "ok") {
    return <main className="shell cafe-detail-page"><div className="explore-empty" role="alert"><Icon name="info" width={28} height={28} /><h1>Informasi kafe belum dapat dimuat.</h1><p>Data Supabase tidak dapat diakses saat ini.</p><Link href="/jelajah-tempat" className="button button-primary">Kembali ke Jelajah Tempat</Link></div></main>;
  }
  if (!result.data) notFound();

  return <main className="shell cafe-detail-page">
    <Link href="/jelajah-tempat" className="cafe-back-link"><Icon name="arrow" className="rotate-180" width={17} height={17} />Kembali ke Jelajah Tempat</Link>
    <CafeDetail cafe={result.data} />
  </main>;
}

function CafeDetail({ cafe }: { cafe: CafeListing }) {
  const availability = cafe.capacity
    ? Math.max(0, cafe.capacity.walkInQuota - cafe.capacity.walkInOccupied)
    : null;
  const updatedAt = cafe.capacity?.updatedAt ?? cafe.updatedAt;

  return <article className="cafe-detail-panel">
    <CafeImage src={cafe.photoUrl || "/images/cafe-interior.svg"} name={cafe.name} hero placeholder={!cafe.photoUrl} />
    <div className="cafe-detail-copy">
      <span className="badge">Listing aktif</span>
      <h1>{cafe.name}</h1>
      <p className="cafe-detail-address"><Icon name="pin" />{cafe.address}</p>
      {cafe.mapsUrl && <a className="cafe-map-link" href={cafe.mapsUrl} target="_blank" rel="noreferrer">Buka lokasi di Maps <Icon name="arrow" width={15} height={15} /></a>}
      <p className="cafe-detail-description">{cafe.description}</p>
      <section className="cafe-detail-section"><h2>Fasilitas</h2><CafeFacilityTags cafe={cafe} /></section>
      <section className="cafe-detail-section"><h2>Jam operasional</h2>
        {cafe.operatingHours.length ? <ul className="cafe-hours-list">{cafe.operatingHours.map((hours) => <li key={hours.dayOfWeek}><span>{namaHari[hours.dayOfWeek - 1] ?? "Hari " + hours.dayOfWeek}</span><span>{hours.isClosed ? "Tutup" : formatTime(hours.openTime) + "–" + formatTime(hours.closeTime)}</span></li>)}</ul> : <p>Informasi jam operasional belum tersedia.</p>}
      </section>
      <section className="cafe-detail-capacity"><h2>Kursi walk-in kosong saat ini</h2>
        <p className="cafe-capacity-number">{availability === null ? "Belum diperbarui" : availability + " kursi"}</p>
        <p className="cafe-detail-updated">{availability === null ? "Informasi kapasitas belum tersedia." : "Diperbarui pada " + formatDateTime(updatedAt) + " WIB."}</p>
      </section>
      <p className="notice">Ketersediaan kursi mengikuti pembaruan terakhir dari mitra dan dapat berubah.</p>
    </div>
  </article>;
}

function CafeFacilityTags({ cafe }: { cafe: CafeListing }) {
  return cafe.facilities.length
    ? <ul className="cafe-detail-facilities">{cafe.facilities.map((facility) => <li key={facility.id}>{displayFacilityName(facility.name)}</li>)}</ul>
    : <p>Informasi fasilitas belum tersedia.</p>;
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

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Waktu tidak diketahui";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

export default function CafeDetailPage({ params }: PageProps<"/kafe/[id]">) {
  return <><Navbar /><Suspense fallback={<DetailLoading />}><CafeDetailContent params={params} /></Suspense><footer className="explore-footer"><div className="shell"><span>Tempat.In · Informasi kafe</span><span>Find. Book. Chill.</span></div></footer></>;
}
