import Image from "next/image";

export function CafeImage({ src, name, hero = false, placeholder = true }: { src: string; name: string; hero?: boolean; placeholder?: boolean }) {
  return <div className={`cafe-image ${hero ? "hero-image" : ""}`}>
    <Image src={src} alt={placeholder ? `Ilustrasi placeholder suasana ${name}, bukan foto kafe sungguhan` : `Foto suasana ${name}`} fill sizes={hero ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} preload={hero} unoptimized={src.startsWith("https://") || src.startsWith("http://")} className="object-cover" />
    {placeholder && <span className="image-caption">Ilustrasi suasana · bukan foto kafe</span>}
  </div>;
}
