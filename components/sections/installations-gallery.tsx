import Image from "next/image";
import { Container } from "@/components/ui/container";

type Photo = {
  file: string;
  alt: string;
  /** Which part stays in the frame when the photo is cropped, e.g. "50% 30%". Centred when left out. */
  position?: string;
};

/**
 * The photos of installed MEGA-TEC equipment (picture row 33), in the order the
 * document lists them: LP1_(1) to LP1_(17), then Fuel_Hero and Fuel_hero_2. Every
 * file is already in /images/installations (the originals stay in the intake folder).
 */
const PHOTOS: Photo[] = [
  {
    file: "forecourt-night-yellow-canopy.jpg",
    alt: "A forecourt at night, lit under its canopy, with MEGA-TEC dispensers",
    position: "50% 30%",
  },
  {
    file: "forecourt-white-canopy.jpg",
    alt: "A new forecourt with a white canopy and MEGA-TEC dispensers",
    position: "50% 30%",
  },
  {
    file: "nipco-forecourt.jpg",
    alt: "A NIPCO station with MEGA-TEC dispensers under a red canopy",
    position: "50% 35%",
  },
  { file: "nepal-nkpor-forecourt.jpg", alt: "A Nepal Energies station in Nkpor with MEGA-TEC dispensers" },
  { file: "canico-forecourt.jpg", alt: "A Canico station with MEGA-TEC dispensers under a red domed canopy" },
  { file: "forecourt-green-gold-canopy.jpg", alt: "A station with a green and gold canopy and MEGA-TEC dispensers" },
  { file: "forecourt-red-canopy.jpg", alt: "A forecourt with a red and white canopy and MEGA-TEC dispensers" },
  { file: "forecourt-dispenser-row.jpg", alt: "A row of MEGA-TEC dispensers on a forecourt" },
  { file: "forecourt-busy-panorama.jpg", alt: "A busy forecourt with MEGA-TEC dispensers in service" },
  { file: "forecourt-night-orange-pillars.jpg", alt: "A forecourt at night with orange canopy pillars" },
  { file: "agamebu-forecourt.jpg", alt: "The Agamebu station with MEGA-TEC dispensers" },
  {
    file: "forecourt-night-pms-islands.jpg",
    alt: "MEGA-TEC dispensers on the pump islands of a station at night",
    position: "50% 55%",
  },
  { file: "total-new-yidi-road-dispenser.jpg", alt: "A MEGA-TEC dispenser at a Total station on New Yidi Road" },
  { file: "total-new-yidi-road-forecourt.jpg", alt: "A Total station on New Yidi Road with MEGA-TEC dispensers" },
  {
    file: "nepal-launch-refuelling.jpg",
    alt: "A vehicle refuelling at a MEGA-TEC dispenser on a Nepal Energies station's launch day",
  },
  {
    file: "nepal-launch-dispenser.jpg",
    alt: "Attendants beside a MEGA-TEC dispenser on a station's launch day",
    position: "50% 45%",
  },
  { file: "nepal-umuola-forecourt-3.jpg", alt: "The Nepal Energies station in Umuola, with vehicles at the MEGA-TEC dispensers" },
  { file: "nepal-umuola-forecourt-1.jpg", alt: "The Nepal Energies station in Umuola with MEGA-TEC dispensers" },
  { file: "nepal-umuola-forecourt-2.jpg", alt: "The Nepal Energies station in Umuola, seen from another side" },
];

/**
 * A block of photos on the Projects & Installations page, below the project cards:
 * two to a row on phones, three on a laptop, each in the same 4:3 frame. A photo is
 * cropped to the frame around its subject and never stretched.
 */
export function InstallationsGallery() {
  return (
    <section className="py-6 sm:pt-0 sm:pb-16 lg:pb-20">
      <Container>
        <h2 className="text-ink max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Our installations in pictures
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {PHOTOS.map((photo) => (
            <li key={photo.file} className="bg-surface-soft relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src={`/images/installations/${photo.file}`}
                alt={photo.alt}
                fill
                quality={90}
                sizes="(min-width: 1024px) 33vw, 50vw"
                style={{ objectPosition: photo.position }}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
