import Image from "next/image";

export function CafeImage({ src, name, hero = false }: { src: string; name: string; hero?: boolean }) {
  return <div className={`cafe-image ${hero ? "hero-image" : ""}`}>
    <Image src={src} alt={`Ilustrasi placeholder suasana ${name}, bukan foto kafe sungguhan`} fill sizes={hero ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} preload={hero} className="object-cover" />
    <span className="image-caption">Ilustrasi suasana · bukan foto kafe</span>
  </div>;
}
