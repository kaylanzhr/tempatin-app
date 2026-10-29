import { Navbar } from "@/components/navbar";
import { CafeExplorer } from "@/components/cafe-explorer";
import { CafeImage } from "@/components/cafe-image";
import { Icon, type IconName } from "@/components/icon";

const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: "plug", title: "Cari fasilitas yang kamu butuhkan.", text: "Butuh colokan, mushola, atau suasana outdoor? Pilih fasilitas yang mendukung cara belajarmu." },
  { icon: "chair", title: "Lihat informasi kursi sebelum berangkat.", text: "Cek kursi tersisa dan waktu pembaruannya. Jadi, kamu punya gambaran sebelum memilih tempat." },
  { icon: "cup", title: "Temukan tempat belajar dalam satu website.", text: "Jelajahi pilihan kafe di Jatinangor untuk fokus sendiri atau menyelesaikan tugas bareng teman." },
];
const questions = [
  ["Apakah perlu akun untuk mencari kafe?", "Tidak. Kamu bisa mencari kafe, memilih filter fasilitas, dan melihat detail tanpa akun. Pada versi MVP lengkap, akun mahasiswa diperlukan untuk melakukan booking."],
  ["Apakah informasi kursi selalu akurat?", "Informasi kursi bergantung pada pembaruan oleh kafe dan bisa berubah. Perhatikan label terakhir diperbarui; data yang lebih dari 24 jam diberi peringatan. Pada demo ini, semua angka dan waktu adalah simulasi, bukan kondisi kafe sebenarnya."],
  ["Apakah booking sudah dapat digunakan?", "Belum. Demo tahap pertama ini hanya untuk eksplorasi kafe fiktif. Login dan reservasi kursi akan dikerjakan pada tahap berikutnya. Tidak ada pemesanan yang dibuat melalui demo ini."],
  ["Apakah pemesanan mencakup makanan dan minuman?", "Tidak. Pada versi MVP lengkap, booking hanya untuk kursi, tanpa pembayaran melalui website. Pemesanan makanan dan minuman tidak termasuk dalam fitur Tempat.In."],
];

export default function Home() {
  return <>
    <a className="skip-link" href="#konten">Lewati ke konten utama</a>
    <Navbar />
    <main id="konten">
      <section id="beranda" className="shell hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <span className="badge"><Icon name="pin" width={16} height={16} />Teman nugasmu di Jatinangor</span>
          <h1 id="hero-heading" className="mt-6 text-[2.7rem] leading-[1.12] font-semibold tracking-[-0.05em] sm:text-6xl xl:text-[4.4rem]">Cari tempat nugas,<br /><span className="font-editorial font-normal italic text-caramel">tanpa muter-muter.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">Temukan kafe dengan fasilitas yang kamu butuhkan. Cek informasi kursi dan pilih tempat yang pas buat belajar sendiri atau bareng teman.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#cari-kafe" className="button button-primary">Cari Kafe <Icon name="arrow" /></a><a href="#cara-kerja" className="button button-outline">Lihat Cara Kerja</a></div>
          <div className="mt-10 flex items-center gap-4"><span className="h-px w-10 bg-gold" /><p className="font-editorial text-xl italic">Find. Book. Chill.</p></div>
        </div>
        <div className="hero-visual">
          <CafeImage src="/images/cafe-interior.svg" name="kafe dengan meja belajar dan jendela besar" hero />
          <div className="hero-note"><span className="feature-icon"><Icon name="cup" width={25} height={25} /></span><div><p className="font-semibold">Sudut nyaman, ide mengalir.</p><p className="mt-1 text-xs text-muted">Mulai dari tempat yang pas buatmu.</p></div></div>
          <span className="hero-stamp" aria-hidden="true">duduk nyaman,<br /><em>belajar tenang.</em></span>
        </div>
      </section>
      <div className="border-y border-line"><div className="shell flex flex-wrap items-center justify-between gap-4 py-5 text-sm text-muted"><p>Tempat yang pas untuk setiap cara belajar.</p><div className="flex flex-wrap gap-x-7 gap-y-3"><span className="flex items-center gap-2"><Icon name="plug" />Fasilitas pilihanmu</span><span className="flex items-center gap-2"><Icon name="chair" />Informasi kursi</span><span className="flex items-center gap-2"><Icon name="pin" />Seputar Jatinangor</span></div></div></div>
      <CafeExplorer />
      <section className="section-pad shell" aria-labelledby="benefits-heading">
        <div className="mb-12 grid gap-5 md:grid-cols-2 md:items-end"><div><p className="eyebrow">BIAR NUGAS LEBIH NYAMAN</p><h2 id="benefits-heading" className="section-heading mt-3">Energinya buat tugas,<br /><span className="font-editorial font-normal italic">bukan cari tempat.</span></h2></div><p className="max-w-md leading-7 text-muted md:justify-self-end">Dari fokus sendiri sampai diskusi bareng, temukan ruang yang mendukung rencanamu hari ini.</p></div>
        <div className="grid gap-9 md:grid-cols-3">{benefits.map((benefit) => <article key={benefit.title} className="border-t border-line pt-7"><div className="feature-icon mb-5"><Icon name={benefit.icon} width={26} height={26} /></div><h3 className="max-w-xs text-xl leading-7 font-semibold">{benefit.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{benefit.text}</p></article>)}</div>
      </section>
      <section id="cara-kerja" className="workflow section-pad" aria-labelledby="steps-heading"><div className="shell">
        <div className="max-w-xl"><p className="eyebrow text-gold">DARI CARI SAMPAI NYAMAN</p><h2 id="steps-heading" className="section-heading mt-3">Tempat belajarmu,<br /><span className="font-editorial font-normal italic text-gold">dalam tiga langkah.</span></h2></div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">{[
          ["Temukan kafe.", "Cari nama kafe dan pilih fasilitas yang kamu butuhkan di Jatinangor."],
          ["Periksa fasilitas dan informasi kursi.", "Buka detail kafe. Lihat jam buka, kursi tersisa, dan kapan informasinya diperbarui."],
          ["Login dan lakukan booking.", "Pada versi MVP lengkap, masuk ke akunmu lalu pesan kursi sesuai kebutuhan."],
        ].map(([title, text], index) => <li key={title} className="border-t border-white/20 pt-6"><span className="font-editorial text-4xl text-gold">0{index + 1}</span><h3 className="mt-5 text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-7 text-[#e2d4c5]">{text}</p>{index === 2 && <span className="mt-4 inline-block rounded-full border border-gold/50 px-3 py-1 text-xs text-gold">Tahap berikutnya</span>}</li>)}</ol>
        <p className="mt-10 flex items-start gap-3 rounded-xl bg-white/8 p-4 text-sm leading-6 text-[#eee3d4]"><Icon name="info" className="mt-0.5 shrink-0" />Booking belum aktif pada demo tahap pertama ini. Saat ini, kamu bisa mencoba pencarian, filter, dan detail kafe demo.</p>
      </div></section>
      <section id="faq" className="section-pad shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]" aria-labelledby="faq-heading"><div><p className="eyebrow">SEBELUM MULAI MENCARI</p><h2 id="faq-heading" className="section-heading mt-3">Masih penasaran?</h2><p className="mt-5 max-w-sm leading-7 text-muted">Beberapa hal yang perlu kamu tahu tentang Tempat.In dan demo ini.</p><a className="mt-6 inline-flex min-h-11 items-center gap-3 font-semibold underline underline-offset-4" href="#cari-kafe">Yuk, cari tempatmu <Icon name="arrow" /></a></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<Icon name="plus" className="shrink-0" /></summary><p>{answer}</p></details>)}</div></section>
    </main>
    <footer className="border-t border-line bg-paper"><div className="shell flex flex-col justify-between gap-8 py-10 sm:flex-row sm:items-center"><div><a href="#beranda" className="wordmark">Tempat<span>.In</span></a><p className="mt-2 font-editorial italic text-muted">Find. Book. Chill.</p></div><nav aria-label="Navigasi footer" className="flex flex-wrap gap-6 text-sm"><a href="#cari-kafe">Cari Kafe</a><a href="#cara-kerja">Cara Kerja</a><a href="#faq">FAQ</a></nav><p className="text-xs text-muted">Prototype MVP — Jatinangor</p></div></footer>
  </>;
}
