import Image from "next/image";
import Link from "next/link";

export function TravelCard({ travelcard }) {
  const { tourName, cta, destinationImage, duration, destination } = travelcard;

  // console.warn(cta);
  return (
    <div className="p-6 overflow-hidden text-left bg-white rounded shadow-lg ">
      <Link href={`/detail/${cta?.slug}`} className="no-underline">
        {
          <Image
            className="w-full"
            src={destinationImage.url}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        }
        <div className="px-1 mt-3 text-xl font-bold no-underline">
          {tourName}
        </div>

        <div className="px-1 no-underline">{duration}</div>
        <div className="px-1 no-underline">{destination}</div>
      </Link>
    </div>
  );
}
export default TravelCard;
