import Image from "next/image";

export function CafeImage({ src, name, hero = false }: { src: string; name: string; hero?: boolean }) {
  const isRemote = /^https?:\/\//.test(src);
  return <div className={`cafe-image ${hero ? "hero-image" : ""}`}>
    {isRemote ? <img src={src} alt={`Foto ${name}`} className="h-full w-full object-cover" /> : <Image src={src} alt={`Ilustrasi suasana ${name}`} fill sizes={hero ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} preload={hero} className="object-cover" />}
  </div>;
}
