"use client";

import { useState } from "react";
import { demoCafes, fasilitas, filterCafes, LABEL_WAKTU_DEMO, type Cafe, type FasilitasKey } from "@/lib/demo-cafes";
import { CafeCard, Facilities, SeatStatus } from "./cafe-card";
import { CafeImage } from "./cafe-image";
import { DemoDialog } from "./demo-dialog";
import { Icon } from "./icon";

export function CafeExplorer() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<FasilitasKey[]>([]);
  const [detail, setDetail] = useState<Cafe | null>(null);
  const results = filterCafes(demoCafes, query, selected);
  function reset() { setQuery(""); setSelected([]); }
  return <section id="cari-kafe" className="section-pad bg-paper" aria-labelledby="explore-heading">
    <div className="shell">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><p className="eyebrow">TEMUKAN SUDUT NYAMANMU</p><h2 id="explore-heading" className="section-heading mt-3">Mau nugas di mana hari ini?</h2><p className="mt-3 flex items-center gap-2 text-muted"><Icon name="pin" />Jatinangor</p></div>
        <span className="badge"><span className="h-2 w-2 rounded-full bg-gold" />Data demo</span>
      </div>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">Semua kafe di bawah ini fiktif, bukan mitra sungguhan. Informasi kursi dan waktu pembaruan adalah simulasi dengan acuan {LABEL_WAKTU_DEMO}.</p>
      <div className="filter-panel">
        <label htmlFor="cafe-search" className="mb-2 block text-sm font-semibold">Cari berdasarkan nama kafe</label>
        <div className="relative"><Icon name="search" className="pointer-events-none absolute left-4 top-4 text-muted" /><input id="cafe-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ketik nama kafe yang ingin kamu cari…" className="search-input" /></div>
        <fieldset className="mt-5"><legend className="mb-3 text-sm font-medium">Fasilitas yang kamu butuhkan <span className="font-normal text-muted">· boleh pilih lebih dari satu</span></legend><div className="flex flex-wrap items-center gap-2">
          {fasilitas.map(({ key, label, icon }) => <button key={key} type="button" className={`filter-chip ${selected.includes(key) ? "selected" : ""}`} aria-pressed={selected.includes(key)} onClick={() => setSelected((current) => current.includes(key) ? current.filter((value) => value !== key) : [...current, key])}><Icon name={icon} width={17} height={17} />{label}{selected.includes(key) && <span aria-hidden="true">✓</span>}</button>)}
          <button className="reset-button" type="button" onClick={reset}>Reset Filter</button>
        </div></fieldset>
      </div>
      <p className="my-6 text-sm text-muted" role="status" aria-live="polite"><strong className="text-ink">{results.length} kafe</strong> ditemukan{selected.length > 0 && " dengan semua fasilitas pilihanmu"}</p>
      {results.length ? <div className="cafe-list-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{results.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} onDetail={() => setDetail(cafe)} />)}</div> : <div className="rounded-2xl border border-dashed border-line py-16 text-center"><Icon name="search" className="mx-auto mb-4" width={32} height={32} /><h3 className="px-4 text-lg font-semibold">Belum ada kafe yang cocok. Coba ubah filtermu.</h3><button className="button button-primary mt-6" onClick={reset}>Reset Filter</button></div>}
      {detail && <DemoDialog title={detail.nama} onClose={() => setDetail(null)}><CafeImage src={detail.foto_url} name={detail.nama} /><span className="badge">Data demo · kafe fiktif</span><p>{detail.deskripsi}</p><p className="flex items-start gap-2 text-sm"><Icon name="pin" className="shrink-0" />{detail.alamat}</p><p className="flex items-center gap-2 text-sm"><Icon name="clock" />Jam buka: {detail.jam_buka.replace(":", ".")}–{detail.jam_tutup.replace(":", ".")} WIB</p><Facilities cafe={detail} /><div className="rounded-xl bg-cream p-4"><h3 className="mb-3 font-semibold">Informasi kursi saat ini (simulasi)</h3><SeatStatus cafe={detail} /><p className="mt-3 text-xs text-muted">Acuan demo: {LABEL_WAKTU_DEMO}.</p></div><p className="notice">Reservasi belum aktif pada demo ini. Kamu belum dapat memesan kursi. Informasi kafe dan kursi di atas bukan kondisi sebenarnya.</p></DemoDialog>}
    </div>
  </section>;
}
