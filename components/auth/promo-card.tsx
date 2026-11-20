import { CafeIllustration } from "./cafe-illustration";

export function PromoCard() {
  return (
    <aside className="login-promo-card" aria-label="Tentang Tempat.In">
      <span className="login-badge">Find. Book. Chill.</span>
      <h1>
        Cari tempat nugas,
        <br />
        tanpa muter-muter.
      </h1>
      <p>
        Temukan kafe yang pas, cek kursinya,
        <br />
        dan reservasi sebelum berangkat.
      </p>
      <div className="login-illustration-wrap">
        <CafeIllustration />
      </div>
      <div className="login-reassurance">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 4 4L19 6" />
        </svg>
        <span>Tempat nyaman. Rencana lebih tenang.</span>
      </div>
    </aside>
  );
}

