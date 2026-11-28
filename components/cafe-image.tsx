import Image from "next/image";

export function CafeImage({ src, name, hero = false }: { src: string; name: string; hero?: boolean }) {
  const isRemote = /^https?:\/\//.test(src);
  return <div className={`cafe-image ${hero ? "hero-image" : ""}`}>
<<<<<<< HEAD
    <Image src={src} alt={`Ilustrasi placeholder suasana ${name}, bukan foto kafe sungguhan`} fill sizes={hero ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} preload={hero} className="object-cover" />
=======
    {isRemote ? <img src={src} alt={`Foto ${name}`} className="h-full w-full object-cover" /> : <Image src={src} alt={`Ilustrasi suasana ${name}`} fill sizes={hero ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} preload={hero} className="object-cover" />}
    <span className="image-caption">{isRemote ? "Foto kafe" : "Ilustrasi suasana"}</span>
>>>>>>> 4d2e4be02e336bfb4ff92fb71db965c553dda793
  </div>;
}
