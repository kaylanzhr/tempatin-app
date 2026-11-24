import { CafeIllustration } from "./cafe-illustration";

export function PromoCard({ headingLevel = 1 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <aside className="login-promo-card" aria-label="Tentang Tempat.In">
      <span className="login-badge">Find. Book. Chill.</span>
      <Heading>
        Cari tempat nugas,
        <br />
        tanpa muter-muter.
      </Heading>
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

