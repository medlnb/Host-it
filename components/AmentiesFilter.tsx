import { useState } from "react";

function AmentiesFilter({
  amenties,
  setQuerries,
}: {
  amenties: string[];
  setQuerries: React.Dispatch<
    React.SetStateAction<{
      LowPrice: number;
      HighPrice: number;
      amenties: any;
      wilaya: any;
      baladia: any;
      bedrooms: any;
      bathrooms: any;
      beds: any;
    }>
  >;
}) {
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

  return (
    <div>
      <h1 className="text-center text-2xl font-medium my-3">
        {"I'ma need these in my place please"}
      </h1>
      <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
        <div className="flex md:gap-4 gap-2 flex-wrap">
          {amenitiesData.map((amenity) => (
            <div
              key={amenity}
              className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
                amenties?.includes(amenity) ? "border-black" : "border-gray-400"
              }`}
              onClick={() =>
                setQuerries((prev) => ({
                  ...prev,
                  amenties: prev.amenties.includes(amenity)
                    ? prev.amenties.filter((item: any) => item !== amenity)
                    : [...prev.amenties, amenity],
                }))
              }
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AmentiesFilter;
