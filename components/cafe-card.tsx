import { fasilitas, statusCafe, type Cafe } from "@/lib/demo-cafes";
import { CafeImage } from "./cafe-image";
import { Icon } from "./icon";

export function Facilities({ cafe }: { cafe: Cafe }) {
  return <ul className="cafe-facilities flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted" aria-label="Fasilitas">{fasilitas.filter(({ key }) => cafe[key]).map(({ key, label, icon }) => <li key={key} className="flex items-center gap-1.5"><Icon name={icon} width={16} height={16} />{label}</li>)}</ul>;
}

export function SeatStatus({ cafe }: { cafe: Cafe }) {
  const status = statusCafe(cafe);
  return <div className="space-y-2">
    <p className={`flex items-center gap-2 text-sm font-semibold ${status.usang ? "text-amber-900" : status.tersisa ? "text-forest" : "text-red-900"}`}><Icon name="chair" />{status.tersisa ? `${status.tersisa} kursi tersisa` : "Penuh · 0 kursi tersisa"}<span className="font-normal text-muted">· demo</span></p>
    <p className="flex items-center gap-1.5 text-xs text-muted"><Icon name="clock" width={14} height={14} />Terakhir diperbarui <time dateTime={cafe.diperbarui_pada}>{status.relatif}</time></p>
    {status.usang && <p className="stale-note">Lebih dari 24 jam. Informasi mungkin sudah berubah.</p>}
  </div>;
}

export function CafeCard({ cafe, onDetail }: { cafe: Cafe; onDetail: () => void }) {
  return <article className="cafe-card">
    <CafeImage src={cafe.foto_url} name={cafe.nama} />
    <div className="cafe-card-content">
      <div><h3 className="cafe-card-title">{cafe.nama}</h3><p className="cafe-card-location"><Icon name="pin" className="shrink-0" width={14} height={14} />{cafe.alamat}</p></div>
      <Facilities cafe={cafe} />
      <div className="cafe-card-status"><SeatStatus cafe={cafe} /></div>
      <button type="button" className="button cafe-detail-button" aria-label={`Lihat Detail ${cafe.nama}`} onClick={onDetail}>Lihat Detail</button>
    </div>
  </article>;
}
