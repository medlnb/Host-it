import { useState } from "react";

function AmentiesFilter({ amenties }: { amenties: string[] }) {
  const amenitiesData = [
    "Wifi",
    "TV",
    "Kitchen",
    "Washer",
    "Parking",
    "Air conditioning",
    "Heater",
    "Pool",
    "Elevator",
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[] | null>(
    amenties ?? []
  );
  return (
    <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
      <div className="flex md:gap-4 gap-2 flex-wrap">
        {amenitiesData.map((amenity) => (
          <div
            key={amenity}
            className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
              selectedAmenities?.includes(amenity)
                ? "border-black"
                : "border-gray-400"
            }`}
            onClick={() =>
              setSelectedAmenities((prev: any) =>
                prev.includes(amenity)
                  ? prev.filter((item: any) => item !== amenity)
                  : [...prev, amenity]
              )
            }
          >
            {amenity}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AmentiesFilter;
